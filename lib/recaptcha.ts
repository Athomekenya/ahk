/**
 * Verifies a Google reCAPTCHA v3 token server-side.
 */

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY ?? "";

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  "error-codes"?: string[];
}

/**
 * Verify a reCAPTCHA v3 token.
 *
 * @param token    The token sent from the client
 * @param minScore Minimum acceptable score (default 0.5)
 * @returns `{ ok: boolean; score: number; reason?: string }`
 */
export async function verifyRecaptcha(
  token: string | null | undefined,
  minScore = 0.5
): Promise<{ ok: boolean; score: number; reason?: string }> {
  if (!RECAPTCHA_SECRET) {
    // If secret key is not configured, skip verification gracefully in dev
    console.warn("[reCAPTCHA] RECAPTCHA_SECRET_KEY not set — skipping verification.");
    return { ok: true, score: 1.0, reason: "skipped" };
  }

  if (!token) {
    return { ok: false, score: 0, reason: "missing_token" };
  }

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(RECAPTCHA_SECRET)}&response=${encodeURIComponent(token)}`,
    });

    const data: RecaptchaResponse = await res.json();

    if (!data.success) {
      return { ok: false, score: 0, reason: (data["error-codes"] ?? []).join(",") };
    }

    if (data.score < minScore) {
      return { ok: false, score: data.score, reason: "low_score" };
    }

    return { ok: true, score: data.score };
  } catch (err) {
    console.error("[reCAPTCHA] Verification request failed:", err);
    // Fail open — don't block real users if Google is unreachable
    return { ok: true, score: 0.5, reason: "network_error" };
  }
}
