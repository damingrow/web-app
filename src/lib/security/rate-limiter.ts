/**
 * D-AminGrow Anti-Abuse Rate Limiter
 * Implements an edge-compatible sliding window rate limiter to protect
 * public inquiry and booking mutation endpoints from spam flooding.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of memoryStore.entries()) {
      record.timestamps = record.timestamps.filter((t) => now - t < 300000);
      if (record.timestamps.length === 0) {
        memoryStore.delete(key);
      }
    }
  }, 300000);
}

export interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds (default: 60,000ms = 1 min)
  maxRequests?: number; // Max requests allowed per window (default: 10)
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Check and record a request against the sliding window rate limit.
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const windowMs = options.windowMs || 60000;
  const maxRequests = options.maxRequests || 10;
  const now = Date.now();

  const record = memoryStore.get(identifier) || { timestamps: [] };

  // Remove timestamps outside the sliding window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldestTimestamp = record.timestamps[0] || now;
    const resetInSeconds = Math.ceil((oldestTimestamp + windowMs - now) / 1000);

    return {
      allowed: false,
      limit: maxRequests,
      remaining: 0,
      resetInSeconds: Math.max(1, resetInSeconds),
    };
  }

  // Record this request
  record.timestamps.push(now);
  memoryStore.set(identifier, record);

  const oldestTimestamp = record.timestamps[0] || now;
  const resetInSeconds = Math.ceil((oldestTimestamp + windowMs - now) / 1000);

  return {
    allowed: true,
    limit: maxRequests,
    remaining: Math.max(0, maxRequests - record.timestamps.length),
    resetInSeconds: Math.max(1, resetInSeconds),
  };
}

/**
 * Extract client IP from incoming Next.js Request headers.
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  return '127.0.0.1';
}
