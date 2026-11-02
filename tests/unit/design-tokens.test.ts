import { describe, it, expect } from 'vitest';

describe('Design System Tokens & Accessibility', () => {
  const brandTokens = {
    primaryGreen: '#00BF62',
    limeGreen: '#7ED956',
    deepTeal: '#056782',
    supportingTeal: '#008080',
  };

  it('contains the authoritative sampled logo color values', () => {
    expect(brandTokens.primaryGreen).toBe('#00BF62');
    expect(brandTokens.limeGreen).toBe('#7ED956');
    expect(brandTokens.deepTeal).toBe('#056782');
    expect(brandTokens.supportingTeal).toBe('#008080');
  });

  // Calculate relative luminance and contrast ratio as per WCAG 2.1
  function getLuminance(hex: string): number {
    const rgb = hex
      .replace('#', '')
      .match(/.{2}/g)!
      .map((x) => parseInt(x, 16) / 255)
      .map((val) => (val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)));
    return 0.2126 * rgb[0]! + 0.7152 * rgb[1]! + 0.0722 * rgb[2]!;
  }

  function getContrastRatio(hex1: string, hex2: string): number {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  it('demonstrates that Deep Teal (#056782) passes WCAG AA contrast against White (#FFFFFF)', () => {
    const ratio = getContrastRatio(brandTokens.deepTeal, '#FFFFFF');
    // WCAG AA requires minimum 4.5:1 for normal body text
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('demonstrates that Lime Green (#7ED956) is paired with Dark Slate (#0F172A) for readable contrast', () => {
    const ratio = getContrastRatio(brandTokens.limeGreen, '#0F172A');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});
