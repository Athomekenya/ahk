"use client";

import React, { useState } from "react";

// Extend Window to include grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

async function getRecaptchaToken(action: string): Promise<string> {
  return new Promise((resolve) => {
    if (!SITE_KEY || typeof window === "undefined" || !window.grecaptcha) {
      resolve("");
      return;
    }
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(SITE_KEY, { action });
        resolve(token);
      } catch {
        resolve("");
      }
    });
  });
}

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const recaptchaToken = await getRecaptchaToken("newsletter_signup");

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "homepage_newsletter",
          recaptchaToken,
          website: "", // honeypot — must always be empty for real users
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setEmail("");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Could not submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-sage-light py-16 px-4 sm:px-6 lg:px-8"
      aria-labelledby="newsletter-heading"
    >
      {/* Load reCAPTCHA v3 script */}
      {SITE_KEY && (
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
          async
          defer
        />
      )}

      <div className="max-w-xl mx-auto text-center">
        <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-terracotta mb-4">
          Stay connected
        </span>
        <h2
          id="newsletter-heading"
          className="font-display text-near-black mb-4"
          style={{ fontSize: "var(--text-h2)" }}
        >
          Monthly care tips &amp; updates
        </h2>
        <p className="text-muted font-sans mb-8" style={{ fontSize: "var(--text-body)" }}>
          Join 1,000+ families who receive our monthly caregiving guides,
          health tips, and service updates.
        </p>

        {submitted ? (
          <div
            role="status"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-success/10 border border-success/30 text-success rounded-card font-sans font-semibold text-sm sm:text-base"
          >
            ✓ You&apos;re subscribed! Please check your inbox for your welcome email.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col sm:flex-row gap-3"
            aria-label="Newsletter signup form"
          >
            <div className="flex-grow">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3.5 rounded-btn border border-border bg-card-white font-sans text-near-black placeholder-muted focus:outline-none focus:ring-2 focus:ring-sage"
                aria-describedby={error ? "newsletter-error" : undefined}
              />
              {error && (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="mt-2 text-left text-sm text-terracotta font-sans flex items-center gap-1"
                >
                  ⚠ {error}
                </p>
              )}
            </div>

            {/* Honeypot — hidden from real users, filled by bots */}
            <input
              type="text"
              name="website"
              aria-hidden="true"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
              readOnly
              value=""
            />

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-sage hover:bg-[#2e4338] disabled:opacity-60 text-white font-sans font-semibold rounded-btn transition-colors tap-target shrink-0 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Subscribing…
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-muted font-sans">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
