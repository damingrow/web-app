/**
 * D-AminGrow Farmer CRM: Phone Normalization & Tier Progression Engine
 */

export type CustomerTier = 'bronze' | 'silver' | 'gold' | 'vip_commercial';

/**
 * Normalizes phone numbers to standard E.164 international format (+234...).
 * Strips all formatting characters (spaces, dashes, brackets).
 * Handles Nigerian national format (080..., 070..., 090..., 081...).
 */
export function normalizeNigerianPhone(phone: string): string {
  if (!phone) return '';
  // Strip non-digits except leading '+'
  const cleaned = phone.trim().replace(/[^\+0-9]/g, '');

  if (cleaned.startsWith('0') && cleaned.length >= 10) {
    return `+234${cleaned.slice(1)}`;
  }
  if (cleaned.startsWith('234') && cleaned.length >= 12) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('+234')) {
    return cleaned;
  }
  if (!cleaned.startsWith('+') && cleaned.length === 10) {
    // 10 digits without leading 0 (e.g. 8031234567)
    return `+234${cleaned}`;
  }

  // Fallback to cleaned number
  return cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
}

/**
 * Calculates customer loyalty tier based on total confirmed business volume and lifetime value.
 */
export function calculateCustomerTier(
  lifetimeValueNgn: number,
  totalOrders: number
): CustomerTier {
  if (lifetimeValueNgn >= 10000000 || totalOrders >= 20) {
    return 'vip_commercial';
  }
  if (lifetimeValueNgn >= 2000000 || totalOrders >= 8) {
    return 'gold';
  }
  if (lifetimeValueNgn >= 500000 || totalOrders >= 3) {
    return 'silver';
  }
  return 'bronze';
}

/**
 * Presentation configuration for Customer Tier badges
 */
export function getTierBadgeConfig(tier: string): {
  label: string;
  badgeClass: string;
  dotClass: string;
} {
  switch (tier.toLowerCase()) {
    case 'vip_commercial':
      return {
        label: 'VIP Commercial',
        badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
        dotClass: 'bg-purple-500',
      };
    case 'gold':
      return {
        label: 'Gold Producer',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        dotClass: 'bg-amber-500',
      };
    case 'silver':
      return {
        label: 'Silver Grower',
        badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-300',
        dotClass: 'bg-cyan-500',
      };
    case 'bronze':
    default:
      return {
        label: 'Bronze Farmer',
        badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
        dotClass: 'bg-slate-400',
      };
  }
}
