import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  sendNewsletterAdminNotification,
  sendNewsletterWelcomeEmail,
  forwardMetricsToGoogleSheet,
} from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limiter";
import { verifyRecaptcha } from "@/lib/recaptcha";

// Robust email regex (RFC 5322 simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Known disposable/throwaway email domains to block
const BLOCKED_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "10minutemail.com",
  "trashmail.com", "yopmail.com", "throwam.com", "dispostable.com",
  "fakeinbox.com", "sharklasers.com", "guerrillamailblock.com",
]);

export async function POST(req: NextRequest) {
  try {
    // ── Layer 1: Rate Limiting ─────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const rateLimit = checkRateLimit(`${ip}:newsletter`, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) },
        }
      );
    }

    const body = await req.json();
    const { email, source = "website", recaptchaToken, website } = body;

    // ── Layer 4: Honeypot ──────────────────────────────────────────────
    // `website` is a hidden field — only bots fill it
    if (website) {
      // Silently succeed to avoid letting bots know they were caught
      return NextResponse.json(
        { success: true, message: "Thank you for subscribing! A welcome email has been sent to your inbox." },
        { status: 200 }
      );
    }

    // ── Layer 2: reCAPTCHA v3 ──────────────────────────────────────────
    const captcha = await verifyRecaptcha(recaptchaToken);
    console.log(`[reCAPTCHA] newsletter_signup — score: ${captcha.score}, ok: ${captcha.ok}, reason: ${captcha.reason ?? "none"}`);
    if (!captcha.ok) {
      return NextResponse.json(
        { error: "Bot check failed. Please refresh and try again." },
        { status: 400 }
      );
    }

    // ── Layer 3: Input Validation ──────────────────────────────────────
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (cleanEmail.length > 254) {
      return NextResponse.json({ error: "Email address is too long." }, { status: 400 });
    }

    const domain = cleanEmail.split("@")[1];
    if (BLOCKED_DOMAINS.has(domain)) {
      return NextResponse.json(
        { error: "Please use a permanent email address to subscribe." },
        { status: 400 }
      );
    }

    // 1. Record / Upsert in PostgreSQL Database via Prisma
    try {
      await prisma.newsletterSubscriber.upsert({
        where: { email: cleanEmail },
        update: {},
        create: { email: cleanEmail },
      });
    } catch (dbError) {
      console.warn("Database storage warning (newsletter):", dbError);
    }

    // 2. Dispatch Emails (Admin Notification + Subscriber Welcome Email)
    const emailPromises = [
      sendNewsletterAdminNotification(cleanEmail, source),
      sendNewsletterWelcomeEmail(cleanEmail),
    ];

    // 3. Asynchronously Forward Metrics to Google Sheet Webhook if configured
    const metricsPromise = forwardMetricsToGoogleSheet({
      formType: "newsletter",
      email: cleanEmail,
      source,
    });

    // Execute in parallel without blocking response if any fails
    await Promise.allSettled([...emailPromises, metricsPromise]);

    console.log(`[NEWSLETTER] Subscriber processed: ${cleanEmail} (Source: ${source})`);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing! A welcome email has been sent to your inbox.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Unable to process subscription right now." },
      { status: 500 }
    );
  }
}
