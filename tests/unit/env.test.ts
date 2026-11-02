import { describe, it, expect } from 'vitest';
import { env } from '@/lib/env';

describe('Environment Configuration', () => {
  it('supplies valid default public site URL and WhatsApp contact', () => {
    expect(env.NEXT_PUBLIC_SITE_URL).toBeDefined();
    expect(env.NEXT_PUBLIC_WHATSAPP_NUMBER).toBe('+2348139169402');
  });

  it('verifies that service role key is not mistakenly exposed publicly', () => {
    // Critical security check: NEXT_PUBLIC_ must never contain service role key
    const envKeys = Object.keys(process.env);
    const leakedServiceKey = envKeys.find(
      (k) => k.startsWith('NEXT_PUBLIC_') && k.toLowerCase().includes('service_role')
    );
    expect(leakedServiceKey).toBeUndefined();
  });
});
