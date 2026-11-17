import nodemailer from "nodemailer";

const DEFAULT_SENDER_EMAIL = "info@athomekenya.com";
const DEFAULT_ADMIN_EMAIL = "info@athomekenya.com";
const DEFAULT_NOTIFICATION_EMAILS = ["info@athomekenya.com"];

/**
 * Returns an array of recipient emails from env or default list (supports comma-separated values)
 */
export function getNotificationEmails(customEnvKey?: string): string[] {
  const envVal = customEnvKey
    ? (process.env[customEnvKey] || process.env.NOTIFICATION_EMAIL)
    : process.env.NOTIFICATION_EMAIL;

  if (!envVal) {
    return DEFAULT_NOTIFICATION_EMAILS;
  }

  const emails = envVal
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  return emails.length > 0 ? emails : DEFAULT_NOTIFICATION_EMAILS;
}

export interface AdminNotificationTargets {
  to: string;
  officialEmail: string;
  silentRecipients: string[];
  bcc?: string[];
}

/**
 * Splits recipient list into:
 * - A single visible official 'to' address (prioritizing info@athomekenya.com)
 * - An array of silent secondary recipient emails (e.g. secondary-admin@gmail.com)
 * These are dispatched as independent SMTP transmissions to guarantee zero header/envelope trail.
 */
export function getAdminMailTargets(customEnvKey?: string): AdminNotificationTargets {
  const allEmails = getNotificationEmails(customEnvKey);
  
  const infoIndex = allEmails.findIndex((e) => e.toLowerCase() === "info@athomekenya.com");
  let officialEmail = "info@athomekenya.com";
  let silentRecipients: string[] = [];

  if (infoIndex !== -1) {
    officialEmail = allEmails[infoIndex];
    silentRecipients = allEmails.filter((_, idx) => idx !== infoIndex);
  } else if (allEmails.length > 0) {
    officialEmail = allEmails[0];
    silentRecipients = allEmails.slice(1);
  }

  return {
    to: officialEmail,
    officialEmail,
    silentRecipients,
    bcc: silentRecipients.length > 0 ? silentRecipients : undefined,
  };
}

/**
 * Redacts any confidential/silent recipient email addresses from log strings or error messages
 * so they are strictly never exposed in server console or log aggregators.
 */
export function redactPrivateEmails(errOrMsg: unknown, privateEmails: string[] = []): string {
  let str = errOrMsg instanceof Error ? errOrMsg.message : String(errOrMsg ?? "");
  for (const email of privateEmails) {
    if (email) {
      const escaped = email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      str = str.replace(new RegExp(escaped, "gi"), "[REDACTED_ADMIN]");
    }
  }
  return str;
}

/** Strip characters that could be used for email header injection */
export function sanitiseEmailHeader(value: string): string {
  return value.replace(/[\r\n\t]/g, " ").trim().slice(0, 200);
}

export interface DispatchAdminEmailOptions {
  customEnvKey?: string;
  fromName: string;
  replyTo?: string;
  subject: string;
  html?: string;
  text: string;
  attachments?: { filename: string; content: Buffer }[];
  headers?: Record<string, string>;
  logLabel: string;
}

/**
 * Centralized admin notification dispatcher.
 * Dispatches the official notification strictly to officialEmail (NO BCC),
 * and dispatches separate independent transmissions to silent secondary recipients.
 * Server logs strictly omit secondary email addresses to prevent any leak trail.
 */
export async function dispatchAdminNotification(
  options: DispatchAdminEmailOptions
): Promise<{ success: boolean; simulated?: boolean }> {
  const transporter = getEmailTransporter();
  const fromEmail = (process.env.SMTP_FROM || process.env.SMTP_USER || DEFAULT_SENDER_EMAIL).trim();
  const targets = getAdminMailTargets(options.customEnvKey);

  if (!transporter) {
    console.log(`[EmailService DEV] ${options.logLabel} simulated for: ${targets.officialEmail}`);
    return { success: true, simulated: true };
  }

  const tasks: Promise<boolean>[] = [];

  // 1. Dispatch to Official Visible Target (info@athomekenya.com)
  // Strictly NO BCC parameter: prevents header injection, envelope contamination,
  // and keeps Sent folder records completely clean.
  tasks.push(
    transporter.sendMail({
      from: `"${options.fromName}" <${fromEmail}>`,
      to: targets.officialEmail,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
      text: options.text,
      attachments: options.attachments,
      headers: options.headers,
    }).then(() => {
      console.log(`[EmailService SUCCESS] ✅ ${options.logLabel} delivered to: ${targets.officialEmail}`);
      return true;
    }).catch((err) => {
      console.error(
        `[EmailService ERROR] ❌ Failed to deliver ${options.logLabel}:`,
        redactPrivateEmails(err, targets.silentRecipients)
      );
      return false;
    })
  );

  // 2. Dispatch to Silent Target(s)
  // Dispatched as completely separate, independent SMTP transactions.
  // CRITICAL: Strictly ZERO console logs — no mention of secondary channels or recipients.
  for (const silentEmail of targets.silentRecipients) {
    tasks.push(
      transporter.sendMail({
        from: `"${options.fromName}" <${fromEmail}>`,
        to: silentEmail,
        replyTo: options.replyTo,
        subject: options.subject,
        html: options.html,
        text: options.text,
        attachments: options.attachments,
        headers: options.headers,
      }).then(() => true).catch(() => false)
    );
  }

  const results = await Promise.allSettled(tasks);
  const primaryResult = results[0];
  const isPrimarySuccess = primaryResult.status === "fulfilled" && primaryResult.value === true;

  return { success: isPrimarySuccess };
}

// Create SMTP Transporter
export function getEmailTransporter() {
  const smtpUser = (process.env.SMTP_USER || DEFAULT_SENDER_EMAIL).trim();
  const smtpPass = (process.env.SMTP_PASS || "").trim().replace(/\s+/g, "");

  if (!smtpPass) {
    console.warn(`[EmailService] ⚠️ SMTP_PASS is empty in process.env (SMTP_USER: "${smtpUser}").`);
    console.warn(`[EmailService] 💡 If you edited .env, please press Ctrl+S to save the file, then restart 'npm run dev'.`);
    return null;
  }

  // Gmail-specific configuration (best reliability for Google App Passwords)
  if (smtpUser.includes("@gmail.com") || (process.env.SMTP_HOST || "").includes("gmail")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "mail.athomekenya.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: Boolean(process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465"),
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

/**
 * Sends a welcome email to a new newsletter subscriber
 */
export async function sendNewsletterWelcomeEmail(subscriberEmail: string) {
  const transporter = getEmailTransporter();
  const fromEmail = (process.env.SMTP_FROM || process.env.SMTP_USER || DEFAULT_SENDER_EMAIL).trim();
  const replyToEmail = "info@athomekenya.com";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254705320618";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello AtHome Kenya, I recently subscribed to your care updates!")}`;
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.athomekenya.com";

  const subject = "Welcome to AtHome Kenya — Compassionate Care Delivered Home";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to AtHome Kenya</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8F9FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1F2421; line-height: 1.6;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8F9FA; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #E5E7EB;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%); padding: 36px 32px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">
                AtHome Kenya
              </h1>
              <p style="margin: 8px 0 0 0; color: #D8F3DC; font-size: 14px; font-weight: 400;">
                Compassionate Healthcare &amp; Caregiving at Your Doorstep
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px;">
              <h2 style="margin-top: 0; color: #2D6A4F; font-size: 20px; font-weight: 600;">
                Welcome to our community! 🌿
              </h2>
              <p style="font-size: 15px; color: #4B5563; line-height: 1.6;">
                Thank you for subscribing to AtHome Kenya care updates. You have joined a growing family of over 1,000+ families across Kenya and the diaspora who trust us for expert home-based healthcare, eldercare, and wellness guidance.
              </p>

              <!-- What to Expect Box -->
              <div style="background-color: #F4F6F0; border-left: 4px solid #2D6A4F; border-radius: 6px; padding: 18px 20px; margin: 24px 0;">
                <h3 style="margin: 0 0 10px 0; color: #2D6A4F; font-size: 15px; font-weight: 600;">
                  Here is what you can expect from us:
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px;">
                  <li style="margin-bottom: 8px;"><strong>Monthly Caregiving Guides:</strong> Practical advice on eldercare, post-op recovery, and managing chronic conditions at home.</li>
                  <li style="margin-bottom: 8px;"><strong>Healthcare Updates:</strong> News on clinical standards, caregiver training, and verified health practices in Kenya.</li>
                  <li style="margin-bottom: 0;"><strong>Exclusive Offers:</strong> Priority booking and special terms for home care and medical equipment leasing.</li>
                </ul>
              </div>

              <!-- Action Buttons -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="border-radius: 8px; background-color: #2D6A4F;">
                          <a href="${siteUrl}/services" target="_blank" style="font-size: 15px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block;">
                            Explore Home Care Services
                          </a>
                        </td>
                        <td width="12"></td>
                        <td align="center" style="border-radius: 8px; background-color: #25D366;">
                          <a href="${whatsappUrl}" target="_blank" style="font-size: 15px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 20px; border-radius: 8px; display: inline-block;">
                            💬 Chat on WhatsApp
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size: 14px; color: #6B7280; line-height: 1.5; margin-top: 30px;">
                Need immediate home care assistance or a customized care plan for a loved one? Reply directly to this email or reach our clinical care concierge anytime at <strong>+254 705 320618</strong>.
              </p>

              <p style="margin-top: 24px; font-size: 14px; color: #1F2421; font-weight: 500;">
                Warm regards,<br>
                <span style="color: #2D6A4F; font-weight: 600;">The AtHome Kenya Clinical &amp; Care Team</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 24px 32px; border-top: 1px solid #E5E7EB; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #9CA3AF;">
                You received this email because you subscribed to updates at <a href="${siteUrl}" style="color: #2D6A4F; text-decoration: none;">athomekenya.com</a>.
              </p>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #9CA3AF;">
                AtHome Kenya • Nairobi, Kenya • <a href="mailto:${DEFAULT_ADMIN_EMAIL}" style="color: #9CA3AF;">${DEFAULT_ADMIN_EMAIL}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"AtHome Kenya" <${fromEmail}>`,
        to: subscriberEmail,
        replyTo: replyToEmail,
        subject,
        html,
        text: `Welcome to AtHome Kenya!\n\nThank you for subscribing to our updates. We provide professional home-based healthcare and caregiving across Kenya and the diaspora.\n\nVisit us: ${siteUrl}\nWhatsApp Concierge: ${whatsappUrl}\nPhone: +254 705 320618`,
      });
      console.log(`[EmailService SUCCESS] ✅ Welcome email delivered to: ${subscriberEmail}`);
      return { success: true };
    } catch (err) {
      console.error("[EmailService ERROR] ❌ Failed to send welcome email to subscriber:", err instanceof Error ? err.message : "unknown error");
      return { success: false, error: err };
    }
  } else {
    console.log(`[EmailService DEV] Welcome email simulated for: ${subscriberEmail}`);
    return { success: true, simulated: true };
  }
}

/**
 * Sends an admin notification email when a new subscriber joins.
 * Dispatches cleanly to official inbox (info@athomekenya.com) and silent secondary recipients
 * without leaving any BCC or header trail, and with zero secondary email logging.
 */
export async function sendNewsletterAdminNotification(subscriberEmail: string, source: string = "website") {
  const subject = `🔔 New Newsletter Subscriber: ${subscriberEmail}`;
  const timestamp = new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" });

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; background-color: #F4F6F0; padding: 20px; color: #1F2421;">
  <div style="max-width: 540px; margin: 0 auto; background: #FFFFFF; padding: 24px; border-radius: 8px; border: 1px solid #D8E2DC;">
    <h2 style="color: #2D6A4F; margin-top: 0;">New Newsletter Subscriber!</h2>
    <p style="color: #4B5563;">A new visitor has subscribed to the AtHome Kenya newsletter and care guides.</p>
    
    <div style="background-color: #F8F9FA; padding: 16px; border-radius: 6px; margin: 16px 0; border: 1px solid #E9ECEF;">
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #6C757D; width: 100px;"><strong>Email:</strong></td>
          <td style="padding: 6px 0; color: #2D6A4F; font-weight: bold;"><a href="mailto:${subscriberEmail}" style="color: #2D6A4F;">${subscriberEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6C757D;"><strong>Source:</strong></td>
          <td style="padding: 6px 0; color: #1F2421;">${source}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6C757D;"><strong>Timestamp:</strong></td>
          <td style="padding: 6px 0; color: #1F2421;">${timestamp} (EAT)</td>
        </tr>
      </table>
    </div>

    <p style="font-size: 13px; color: #6C757D; margin-bottom: 0;">
      This notification was automatically sent by the AtHome Kenya lead management system.
    </p>
  </div>
</body>
</html>
  `;

  const text = `New Newsletter Subscriber!\n\nEmail: ${subscriberEmail}\nSource: ${source}\nTimestamp: ${timestamp}\n`;

  return dispatchAdminNotification({
    customEnvKey: "NOTIFICATION_EMAIL",
    fromName: "AtHome Kenya Alerts",
    replyTo: subscriberEmail,
    subject,
    html,
    text,
    logLabel: "Newsletter Subscriber Alert",
  });
}

/**
 * Sends a job application admin alert to the team.
 * Dispatches cleanly to official inbox (info@athomekenya.com) and silent secondary recipients
 * with attachments, without leaving any BCC or header trail, and with zero secondary email logging.
 */
export async function sendJobApplicationAdminNotification(data: {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  body: string;
  attachments: { filename: string; content: Buffer }[];
}) {
  const safeReplyTo = sanitiseEmailHeader(data.email);
  const safeName = sanitiseEmailHeader(data.fullName);
  const safePosition = sanitiseEmailHeader(data.position);

  return dispatchAdminNotification({
    customEnvKey: "CAREERS_NOTIFICATION_EMAIL",
    fromName: "AtHome Kenya Careers",
    replyTo: safeReplyTo,
    subject: `New Job Application — ${safeName} for ${safePosition}`,
    text: data.body,
    attachments: data.attachments,
    headers: {
      "X-Mailer": "AtHome Kenya Careers Portal",
      "X-Application-Source": "website-careers-form",
    },
    logLabel: "Careers Job Application Alert",
  });
}

/**
 * Sends a confirmation email to a job applicant confirming receipt of their application
 */
export async function sendJobApplicationApplicantConfirmation(
  applicantEmail: string,
  applicantName: string,
  position: string
) {
  const transporter = getEmailTransporter();
  const fromEmail = (process.env.SMTP_FROM || process.env.SMTP_USER || DEFAULT_SENDER_EMAIL).trim();
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.athomekenya.com";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254705320618";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello AtHome Kenya Careers Team, I submitted an application for ${position}.`)}`;

  const subject = `Application Received — ${position} at AtHome Kenya`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8F9FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1F2421; line-height: 1.6;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8F9FA; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #E5E7EB;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%); padding: 36px 32px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">
                AtHome Kenya
              </h1>
              <p style="margin: 8px 0 0 0; color: #D8F3DC; font-size: 14px; font-weight: 400;">
                Clinical Recruitment &amp; Talent Acquisition
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px;">
              <h2 style="margin-top: 0; color: #2D6A4F; font-size: 20px; font-weight: 600;">
                Thank you for applying, ${applicantName}! 🩺
              </h2>
              <p style="font-size: 15px; color: #4B5563; line-height: 1.6;">
                We have successfully received your application for the position of <strong style="color: #1F2421;">${position}</strong> at AtHome Kenya. We appreciate the time and effort you took to share your credentials and experience with us.
              </p>

              <!-- Application Summary Box -->
              <div style="background-color: #F4F6F0; border-left: 4px solid #2D6A4F; border-radius: 6px; padding: 18px 20px; margin: 24px 0;">
                <h3 style="margin: 0 0 10px 0; color: #2D6A4F; font-size: 15px; font-weight: 600;">
                  What happens next?
                </h3>
                <ol style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 1.7;">
                  <li style="margin-bottom: 8px;"><strong>Application &amp; Credential Review:</strong> Our clinical recruitment panel is reviewing your qualifications, CV, and regulatory documentation.</li>
                  <li style="margin-bottom: 8px;"><strong>Shortlisting &amp; Interview:</strong> If your profile aligns with our current care openings, our team will reach out via phone or email to schedule an initial interview.</li>
                  <li style="margin-bottom: 0;"><strong>Onboarding &amp; Orientation:</strong> Successful healthcare professionals undergo clinical orientation and protocol training.</li>
                </ol>
              </div>

              <!-- Action Links -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="border-radius: 8px; background-color: #2D6A4F;">
                          <a href="${siteUrl}/caregivers" target="_blank" style="font-size: 15px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block;">
                            Learn About Our Care Team
                          </a>
                        </td>
                        <td width="12"></td>
                        <td align="center" style="border-radius: 8px; background-color: #25D366;">
                          <a href="${whatsappUrl}" target="_blank" style="font-size: 15px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 20px; border-radius: 8px; display: inline-block;">
                            💬 Recruitment WhatsApp
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size: 14px; color: #6B7280; line-height: 1.5; margin-top: 30px;">
                If you have any questions or need to submit updated credentials or reference details, you can reply directly to this email or contact our recruitment team.
              </p>

              <p style="margin-top: 24px; font-size: 14px; color: #1F2421; font-weight: 500;">
                Best regards,<br>
                <span style="color: #2D6A4F; font-weight: 600;">The Talent &amp; Clinical Operations Team</span><br>
                <span style="color: #6B7280; font-size: 13px;">AtHome Kenya • Nairobi, Kenya</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 24px 32px; border-top: 1px solid #E5E7EB; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #9CA3AF;">
                This is an automated confirmation sent from <a href="${siteUrl}" style="color: #2D6A4F; text-decoration: none;">athomekenya.com</a>.
              </p>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #9CA3AF;">
                AtHome Kenya • Inquiries: <a href="mailto:${fromEmail}" style="color: #9CA3AF;">${fromEmail}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"AtHome Kenya Careers" <${fromEmail}>`,
        to: applicantEmail,
        replyTo: "info@athomekenya.com",
        subject,
        html,
        text: `Dear ${applicantName},\n\nThank you for applying for the ${position} position at AtHome Kenya. We have received your application and our recruitment team will review your qualifications and contact you regarding the next steps.\n\nBest regards,\nAtHome Kenya Recruitment Team\n${siteUrl}`,
      });
      console.log(`[EmailService SUCCESS] ✅ Job application confirmation delivered to applicant: ${applicantEmail}`);
      return { success: true };
    } catch (err) {
      console.error("[EmailService ERROR] ❌ Failed to send job application confirmation to applicant:", err instanceof Error ? err.message : "unknown error");
      return { success: false, error: err };
    }
  } else {
    console.log(`[EmailService DEV] Job application confirmation simulated for applicant: ${applicantEmail}`);
    return { success: true, simulated: true };
  }
}

/**
 * Asynchronously forward metrics to Google Sheet / Google Apps Script Webhook
 */
export async function forwardMetricsToGoogleSheet(data: {
  formType: string;
  email: string;
  source?: string;
  [key: string]: unknown;
}) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    return;
  }

  try {
    const payload = {
      ...data,
      timestamp: data.timestamp || new Date().toISOString(),
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[Metrics] Google Sheet webhook sync warning:", err);
  }
}
