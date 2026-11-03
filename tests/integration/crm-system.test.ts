import { describe, it, expect } from 'vitest';
import {
  normalizeNigerianPhone,
  calculateCustomerTier,
  getTierBadgeConfig,
} from '@/lib/crm/customer-utils';

describe('Phase 5: Deduplicated Farmer CRM & Multi-Tier Customer Management', () => {
  describe('Nigerian E.164 Phone Normalization Engine', () => {
    it('normalizes standard 11-digit Nigerian mobile numbers starting with 0', () => {
      expect(normalizeNigerianPhone('08031234567')).toBe('+2348031234567');
      expect(normalizeNigerianPhone('07012345678')).toBe('+2347012345678');
      expect(normalizeNigerianPhone('09098765432')).toBe('+2349098765432');
      expect(normalizeNigerianPhone('08123456789')).toBe('+2348123456789');
    });

    it('handles numbers already with +234 international prefix', () => {
      expect(normalizeNigerianPhone('+2348031234567')).toBe('+2348031234567');
    });

    it('handles numbers with 234 prefix missing the plus sign', () => {
      expect(normalizeNigerianPhone('2348031234567')).toBe('+2348031234567');
    });

    it('strips spaces, dashes, brackets, and periods from phone numbers', () => {
      expect(normalizeNigerianPhone('0803-123-4567')).toBe('+2348031234567');
      expect(normalizeNigerianPhone('(0803) 123 4567')).toBe('+2348031234567');
      expect(normalizeNigerianPhone('0803 123 4567')).toBe('+2348031234567');
      expect(normalizeNigerianPhone(' +234 803 123 4567 ')).toBe('+2348031234567');
      expect(normalizeNigerianPhone('0803.123.4567')).toBe('+2348031234567');
    });

    it('handles 10-digit number without leading zero', () => {
      expect(normalizeNigerianPhone('8031234567')).toBe('+2348031234567');
    });
  });

  describe('Customer Loyalty Tier Progression', () => {
    it('classifies accounts as Bronze by default', () => {
      expect(calculateCustomerTier(0, 1)).toBe('bronze');
      expect(calculateCustomerTier(250000, 2)).toBe('bronze');
    });

    it('promotes accounts to Silver when crossing ₦500k or 3 orders', () => {
      expect(calculateCustomerTier(500000, 1)).toBe('silver');
      expect(calculateCustomerTier(300000, 3)).toBe('silver');
      expect(calculateCustomerTier(1200000, 2)).toBe('silver');
    });

    it('promotes accounts to Gold when crossing ₦2M or 8 orders', () => {
      expect(calculateCustomerTier(2000000, 2)).toBe('gold');
      expect(calculateCustomerTier(1500000, 8)).toBe('gold');
      expect(calculateCustomerTier(5000000, 7)).toBe('gold');
    });

    it('promotes commercial accounts to VIP Commercial when crossing ₦10M or 20 orders', () => {
      expect(calculateCustomerTier(10000000, 5)).toBe('vip_commercial');
      expect(calculateCustomerTier(4000000, 20)).toBe('vip_commercial');
      expect(calculateCustomerTier(25000000, 35)).toBe('vip_commercial');
    });
  });

  describe('Tier Badge Presentation Configurations', () => {
    it('returns valid CSS and labels for each tier', () => {
      const vip = getTierBadgeConfig('vip_commercial');
      expect(vip.label).toBe('VIP Commercial');
      expect(vip.badgeClass).toContain('purple');

      const gold = getTierBadgeConfig('gold');
      expect(gold.label).toBe('Gold Producer');
      expect(gold.badgeClass).toContain('amber');

      const silver = getTierBadgeConfig('silver');
      expect(silver.label).toBe('Silver Grower');
      expect(silver.badgeClass).toContain('cyan');

      const bronze = getTierBadgeConfig('bronze');
      expect(bronze.label).toBe('Bronze Farmer');
      expect(bronze.badgeClass).toContain('slate');
    });
  });

  describe('Deduplication & Lifetime Account Aggregation Simulation', () => {
    it('deduplicates multiple orders across different phone formats into one customer record', () => {
      // Simulate raw order inputs submitted by the same farmer with formatting variations
      const orders = [
        { phone: '08031234567', name: 'Alhaji Musa Garba', value: 450000 },
        { phone: '0803-123-4567', name: 'Alhaji Musa Garba', value: 350000 },
        { phone: '+234 803 123 4567', name: 'Alhaji Musa Garba', value: 500000 },
      ];

      const customerMap = new Map<string, { phone: string; name: string; totalOrders: number; lifetimeValue: number }>();

      for (const order of orders) {
        const normalized = normalizeNigerianPhone(order.phone);
        const existing = customerMap.get(normalized);
        if (existing) {
          existing.totalOrders += 1;
          existing.lifetimeValue += order.value;
        } else {
          customerMap.set(normalized, {
            phone: normalized,
            name: order.name,
            totalOrders: 1,
            lifetimeValue: order.value,
          });
        }
      }

      // Assert that all 3 orders collapse into exactly 1 unique customer
      expect(customerMap.size).toBe(1);

      const customer = customerMap.get('+2348031234567');
      expect(customer).toBeDefined();
      expect(customer?.totalOrders).toBe(3);
      expect(customer?.lifetimeValue).toBe(1300000); // 450k + 350k + 500k

      // Assert tier upgraded from bronze to silver
      const tier = calculateCustomerTier(customer!.lifetimeValue, customer!.totalOrders);
      expect(tier).toBe('silver');
    });
  });
});
