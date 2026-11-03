import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limiter';
import {
  getStandardBroodingSchedule,
  formatBrooderForWhatsApp,
  formatFcrForWhatsApp,
} from '@/lib/calculators/export-utils';
import { POST as enquiriesPost } from '@/app/api/enquiries/route';
import { POST as bookingsPost } from '@/app/api/bookings/route';

describe('Phase 7: Anti-Abuse Rate Limiter & Calculator Exports', () => {
  describe('Anti-Abuse Rate Limiter', () => {
    it('allows requests within the configured threshold and tracks remaining count', () => {
      const testId = `test-ip-${Date.now()}-1`;
      const res1 = checkRateLimit(testId, { maxRequests: 3, windowMs: 10000 });
      expect(res1.allowed).toBe(true);
      expect(res1.remaining).toBe(2);

      const res2 = checkRateLimit(testId, { maxRequests: 3, windowMs: 10000 });
      expect(res2.allowed).toBe(true);
      expect(res2.remaining).toBe(1);

      const res3 = checkRateLimit(testId, { maxRequests: 3, windowMs: 10000 });
      expect(res3.allowed).toBe(true);
      expect(res3.remaining).toBe(0);
    });

    it('blocks subsequent requests once maxRequests limit is breached', () => {
      const testId = `test-ip-${Date.now()}-2`;
      for (let i = 0; i < 5; i++) {
        checkRateLimit(testId, { maxRequests: 5, windowMs: 10000 });
      }

      const blockedRes = checkRateLimit(testId, { maxRequests: 5, windowMs: 10000 });
      expect(blockedRes.allowed).toBe(false);
      expect(blockedRes.remaining).toBe(0);
      expect(blockedRes.resetInSeconds).toBeGreaterThan(0);
    });

    it('isolates different client identifiers independently', () => {
      const ipA = `ip-a-${Date.now()}`;
      const ipB = `ip-b-${Date.now()}`;

      for (let i = 0; i < 3; i++) {
        checkRateLimit(ipA, { maxRequests: 3, windowMs: 10000 });
      }

      const blockedA = checkRateLimit(ipA, { maxRequests: 3, windowMs: 10000 });
      expect(blockedA.allowed).toBe(false);

      const freshB = checkRateLimit(ipB, { maxRequests: 3, windowMs: 10000 });
      expect(freshB.allowed).toBe(true);
      expect(freshB.remaining).toBe(2);
    });

    it('extracts client IP accurately across Cloudflare, proxy, and direct headers', () => {
      const req1 = new Request('http://localhost', {
        headers: { 'x-forwarded-for': '197.210.55.12, 10.0.0.1' },
      });
      expect(getClientIp(req1)).toBe('197.210.55.12');

      const req2 = new Request('http://localhost', {
        headers: { 'cf-connecting-ip': '102.89.22.4' },
      });
      expect(getClientIp(req2)).toBe('102.89.22.4');

      const req3 = new Request('http://localhost', {
        headers: { 'x-real-ip': '41.203.71.90' },
      });
      expect(getClientIp(req3)).toBe('41.203.71.90');

      const reqFallback = new Request('http://localhost');
      expect(getClientIp(reqFallback)).toBe('127.0.0.1');
    });
  });

  describe('Calculator Export & WhatsApp Routing', () => {
    it('returns a verified 6-week brooding protocol according to veterinary standards', () => {
      const schedule = getStandardBroodingSchedule();
      expect(schedule).toHaveLength(6);

      // Week 1 should begin at 34-35C center
      expect(schedule[0]!.targetTempCenter).toContain('34°C');
      expect(schedule[0]!.lightingHours).toContain('23 Hours');

      // Week 6 should end at ambient ~21-23C
      expect(schedule[5]!.targetTempCenter).toContain('21°C');
    });

    it('formats brooder setup calculations into direct WhatsApp links to official hotline', () => {
      const link = formatBrooderForWhatsApp({
        flockSize: 500,
        birdType: 'broiler',
        floorAreaSqM: '25',
        floorAreaSqFt: '269',
        gasBrooders: 1,
        feedingTrays: 10,
        drinkers: 10,
        starterFeedKg: 175,
        starterBags25kg: 7,
      });

      expect(link).toContain('https://wa.me/2348139169402?text=');
      expect(link).toContain('500');
      expect(link).toContain('Broiler');
      expect(link).toContain('D-AminGrow');
    });

    it('formats FCR feed calculations into direct WhatsApp links to official hotline', () => {
      const link = formatFcrForWhatsApp(
        1000,
        1875,
        1250,
        1.5,
        'Excellent (Top Tier Performance)'
      );

      expect(link).toContain('https://wa.me/2348139169402?text=');
      expect(link).toContain('1.5');
      expect(link).toContain('1000');
      expect(link).toContain('TOP%20TIER%20PERFORMANCE');
    });
  });

  describe('API Endpoint Rate Limiting Enforcement', () => {
    it('returns 429 when /api/enquiries request threshold is exceeded', async () => {
      const floodIp = `flood-enquiries-${Date.now()}`;
      const payload = {
        fullName: 'Flood Test User',
        phone: '08139169402',
        state: 'Oyo',
        enquiryType: 'general',
      };

      // Send 10 allowed requests
      for (let i = 0; i < 10; i++) {
        const req = new Request('http://localhost/api/enquiries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': floodIp,
          },
          body: JSON.stringify(payload),
        });
        const res = await enquiriesPost(req);
        // It could be 200 (success) or 500/200 depending on Supabase mock, but definitely not 429
        expect(res.status).not.toBe(429);
      }

      // 11th request MUST be 429
      const overflowReq = new Request('http://localhost/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': floodIp,
        },
        body: JSON.stringify(payload),
      });
      const overflowRes = await enquiriesPost(overflowReq);
      expect(overflowRes.status).toBe(429);
      expect(overflowRes.headers.get('Retry-After')).toBeTruthy();
      const data = await overflowRes.json();
      expect(data.success).toBe(false);
      expect(data.message).toContain('Too many requests');
    });

    it('returns 429 when /api/bookings reservation threshold is exceeded', async () => {
      const floodIp = `flood-bookings-${Date.now()}`;
      const payload = {
        customerName: 'Booking Flooder',
        customerPhone: '08139169402',
        deliveryState: 'Lagos',
        destinationHub: 'Ikeja',
        breedType: 'broiler',
        hatcheryCode: 'CHI',
        cartonsCount: 2,
      };

      // Send 10 requests
      for (let i = 0; i < 10; i++) {
        const req = new Request('http://localhost/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': floodIp,
          },
          body: JSON.stringify(payload),
        });
        const res = await bookingsPost(req);
        expect(res.status).not.toBe(429);
      }

      // 11th request MUST be 429
      const overflowReq = new Request('http://localhost/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': floodIp,
        },
        body: JSON.stringify(payload),
      });
      const overflowRes = await bookingsPost(overflowReq);
      expect(overflowRes.status).toBe(429);
      expect(overflowRes.headers.get('Retry-After')).toBeTruthy();
      const data = await overflowRes.json();
      expect(data.success).toBe(false);
      expect(data.message).toContain('Too many booking reservation requests');
    });
  });
});
