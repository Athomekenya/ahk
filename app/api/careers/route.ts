import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  getEmailTransporter,
  getAdminMailTargets,
  sendJobApplicationApplicantConfirmation,
  forwardMetricsToGoogleSheet,
} from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limiter";
import { verifyRecaptcha } from "@/lib/recaptcha";

// Robust email regex (RFC 5322 simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Allowed file MIME types for attachments
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
]);

// Max total upload size: 10 MB
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;

/** Strip characters that could be used for email header injection */
function sanitiseHeader(value: string): string {
  return value.replace(/[\r\n\t]/g, " ").trim().slice(0, 200);
}

export async function POST(req: NextRequest) {
  try {
    // ── Layer 1: Rate Limiting ─────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const rateLimit = checkRateLimit(`${ip}:careers`, 3, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) },
        }
      );
    }

    const data = await req.formData();
    const get = (key: string) => (data.get(key) as string) ?? "";

    // ── Layer 4: Honeypot ──────────────────────────────────────────────
    const honeypot = get("website");
    if (honeypot) {
      // Silently succeed to avoid revealing detection to bots
      return NextResponse.json(
        { success: true, message: "Your application has been received successfully! Our team will review and get in touch." },
        { status: 200 }
      );
    }

    // ── Layer 2: reCAPTCHA v3 ──────────────────────────────────────────
    const recaptchaToken = get("recaptchaToken");
    const captcha = await verifyRecaptcha(recaptchaToken);
    console.log(`[reCAPTCHA] careers_application — score: ${captcha.score}, ok: ${captcha.ok}, reason: ${captcha.reason ?? "none"}`);
    if (!captcha.ok) {
      return NextResponse.json(
        { error: "Bot check failed. Please refresh and try again." },
        { status: 400 }
      );
    }

    // ── Layer 3: Input Validation ──────────────────────────────────────
    const fullName = get("fullName").trim();
    const email = get("email").trim().toLowerCase();
    const phone = get("phone").trim();
    const position = get("position").trim();
    const coverNote = get("whyAtHome") || get("relevantExperience");

    if (!fullName || !email || !phone || !position) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Full Name, Email, Phone, Position)." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (email.length > 254) {
      return NextResponse.json({ error: "Email address is too long." }, { status: 400 });
    }

    if (fullName.length > 100) {
      return NextResponse.json({ error: "Full name is too long." }, { status: 400 });
    }

    if (position.length > 100) {
      return NextResponse.json({ error: "Position field is too long." }, { status: 400 });
    }

    if (coverNote.length > 5000) {
      return NextResponse.json({ error: "Cover note exceeds the maximum length." }, { status: 400 });
    }

    // 1. Try to record application in Database
    try {
      await prisma.jobApplication.create({
        data: {
          name: fullName,
          email,
          phone,
          roleAppliedFor: position,
          coverNote,
        },
      });
    } catch (dbError) {
      console.warn("Database storage warning (JobApplication):", dbError);
    }

    // 2. Build internal admin readable email body
    const body = `
=== CAREERS APPLICATION — AT HOME KENYA ===

--- PERSONAL INFORMATION ---
Full Name:          ${fullName}
Phone:              ${phone}
Email:              ${email}
Residence:          ${get("residence")}
National ID:        ${get("nationalId")}

--- POSITION ---
Position Applied:   ${position}

--- PROFESSIONAL INFORMATION ---
Education:          ${get("education")}
License Number:     ${get("licenseNumber")}
Experience:         ${get("experience")}
Current Employer:   ${get("currentEmployer")}
Availability:       ${get("availability")}

--- SCREENING QUESTIONS ---
Why AtHome Kenya?
${get("whyAtHome")}

Most Relevant Experience:
${get("relevantExperience")}

Willing to travel for home visits: ${get("willingToTravel")}
Has reliable transport: ${get("hasTransport")}

--- REFERENCES ---
Reference 1: ${get("ref1Name")} | ${get("ref1Position")} | ${get("ref1Company")} | ${get("ref1Phone")}
Reference 2: ${get("ref2Name")} | ${get("ref2Position")} | ${get("ref2Company")} | ${get("ref2Phone")}

--- DECLARATION ---
Applicant confirmed declaration: ${get("declaration") === "true" ? "Yes" : "No"}
`;

    // 3. Collect file attachments — validate type & total size
    const fileFields = ["cv", "coverLetter", "certificates", "license", "nationalIdCopy", "otherDocs"];
    const attachments: { filename: string; content: Buffer }[] = [];
    let totalBytes = 0;

    for (const field of fileFields) {
      const file = data.get(field) as File | null;
      if (file && file.size > 0) {
        // Block disallowed file types
        if (!ALLOWED_MIME_TYPES.has(file.type)) {
          return NextResponse.json(
            { error: `File "${file.name}" has an unsupported type. Only PDF, Word documents, JPG, and PNG are accepted.` },
            { status: 400 }
          );
        }

        totalBytes += file.size;
        if (totalBytes > MAX_TOTAL_BYTES) {
          return NextResponse.json(
            { error: "Total attachment size exceeds 10 MB. Please reduce file sizes and try again." },
            { status: 400 }
          );
        }

        try {
          const buffer = Buffer.from(await file.arrayBuffer());
          attachments.push({ filename: file.name, content: buffer });
        } catch (fileErr) {
          console.warn(`Could not process attachment for field ${field}:`, fileErr);
        }
      }
    }

    // 4. Attempt email dispatch via SMTP (Admin Notification + Applicant Confirmation)
    const transporter = getEmailTransporter();
    const fromEmail = (process.env.SMTP_FROM || process.env.SMTP_USER || "info@athomekenya.com").trim();

    const emailTasks: Promise<unknown>[] = [];

    if (transporter) {
      const { to, bcc } = getAdminMailTargets("CAREERS_NOTIFICATION_EMAIL");

      // Sanitise user-supplied values used in email headers to prevent injection
      const safeReplyTo = sanitiseHeader(email);
      const safeName = sanitiseHeader(fullName);
      const safePosition = sanitiseHeader(position);

      // 4a. Send application alert with attachments to internal HR team
      emailTasks.push(
        transporter.sendMail({
          from: `"AtHome Kenya Careers" <${fromEmail}>`,
          to,
          bcc,
          replyTo: safeReplyTo,
          subject: `New Job Application — ${safeName} for ${safePosition}`,
          text: body,
          attachments,
          headers: {
            "X-Mailer": "AtHome Kenya Careers Portal",
            "X-Application-Source": "website-careers-form",
          },
        }).catch((mailError) => {
          console.error(
            "Nodemailer error sending application email to team:",
            mailError instanceof Error ? mailError.message : "unknown error"
          );
        })
      );
    } else {
      console.log(`[JOB APPLICATION RECEIVED SERVERSIDE] ${fullName} - ${position} (${email}, ${phone})`);
    }

    // 4b. Send confirmation email to applicant
    emailTasks.push(sendJobApplicationApplicantConfirmation(email, fullName, position));

    // 4c. Forward metrics to Google Sheet Webhook if configured
    emailTasks.push(
      forwardMetricsToGoogleSheet({
        formType: "careers",
        name: fullName,
        email,
        phone,
        position,
        experience: get("experience"),
        coverNote,
      })
    );

    await Promise.allSettled(emailTasks);

    return NextResponse.json(
      { success: true, message: "Your application has been received successfully! Our team will review and get in touch." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Careers application error:", error);
    return NextResponse.json(
      { error: "Could not process application. Please email info@athomekenya.com directly." },
      { status: 500 }
    );
  }
}
