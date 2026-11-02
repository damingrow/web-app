import { describe, it, expect } from 'vitest';
import { metadata as privacyMeta } from '@/app/policies/privacy/page';
import { metadata as termsMeta } from '@/app/policies/terms/page';
import { metadata as shippingMeta } from '@/app/policies/shipping/page';
import nextConfig from '../../next.config';

describe('Regulatory & Compliance Policy Pages', () => {
  it('defines valid SEO metadata for Privacy Policy (NDPA 2023)', () => {
    expect(privacyMeta.title).toContain('NDPA');
    expect(privacyMeta.description).toContain('Nigeria Data Protection Act');
  });

  it('defines valid SEO metadata for Terms of Service', () => {
    expect(termsMeta.title).toContain('Terms of Service');
    expect(termsMeta.description).toContain('mortality');
  });

  it('defines valid SEO metadata for Cold-Chain Shipping Policy', () => {
    expect(shippingMeta.title).toContain('Shipping & Cold-Chain');
    expect(shippingMeta.description).toContain('2°C–8°C');
  });
});

describe('HTTP Security Headers Configuration', () => {
  it('includes mandatory enterprise security headers in Next.js config', async () => {
    expect(typeof nextConfig.headers).toBe('function');

    if (nextConfig.headers) {
      const headerRules = await nextConfig.headers();
      expect(headerRules.length).toBeGreaterThan(0);

      const rootHeaders = headerRules.find((r) => r.source === '/(.*)')?.headers || [];
      const headerKeys = rootHeaders.map((h) => h.key);

      expect(headerKeys).toContain('X-Content-Type-Options');
      expect(headerKeys).toContain('X-Frame-Options');
      expect(headerKeys).toContain('Referrer-Policy');
      expect(headerKeys).toContain('Permissions-Policy');
      expect(headerKeys).toContain('Strict-Transport-Security');

      const nosniff = rootHeaders.find((h) => h.key === 'X-Content-Type-Options');
      expect(nosniff?.value).toBe('nosniff');

      const sameorigin = rootHeaders.find((h) => h.key === 'X-Frame-Options');
      expect(sameorigin?.value).toBe('SAMEORIGIN');

      const hsts = rootHeaders.find((h) => h.key === 'Strict-Transport-Security');
      expect(hsts?.value).toContain('max-age=31536000');
    }
  });
});
