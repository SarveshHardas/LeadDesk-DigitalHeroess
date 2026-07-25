// Simple in-memory rate limiter for form submissions
const submissionTracker = new Map<string, number>();

/**
 * Checks whether an identifier (IP address or email) has exceeded rate limits.
 * Default limit: 5 submissions per 5-minute window.
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 5 * 60 * 1000
): { allowed: boolean; remainingMs?: number } {
  const now = Date.now();
  const lastSubmission = submissionTracker.get(identifier);

  if (lastSubmission && now - lastSubmission < windowMs / limit) {
    // Prevent submissions faster than 10 seconds apart from the same email/IP
    return {
      allowed: false,
      remainingMs: 10000 - (now - lastSubmission),
    };
  }

  submissionTracker.set(identifier, now);

  // Clean up old entries periodically
  if (submissionTracker.size > 1000) {
    for (const [key, timestamp] of submissionTracker.entries()) {
      if (now - timestamp > windowMs) {
        submissionTracker.delete(key);
      }
    }
  }

  return { allowed: true };
}
