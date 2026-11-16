/**
 * Simple in-memory rate limiter using a sliding window per IP.
 * Suitable for single-server Next.js deployments.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

/**
 * Check and increment the rate limit for a given key (e.g. "ip:route").
 *
 * @param key        Unique identifier — typically `${ip}:${route}`
 * @param limit      Maximum number of requests allowed in the window
 * @param windowMs   Window duration in milliseconds
 * @returns `{ allowed: boolean; remaining: number; resetAt: number }`
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();

  // Purge expired entries occasionally to prevent unbounded memory growth
  if (Math.random() < 0.05) {
    store.forEach((v, k) => {
      if (v.resetAt < now) store.delete(k);
    });
  }

  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    // First request in this window
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}
