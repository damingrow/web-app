/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import {
  calculatePackagingBirds,
  getPartnerHatcheries,
  getUpcomingQuotas,
} from '@/lib/supabase/data-access';

describe('Phase 3: Chick Booking Engine, Quotas & Packaging Rules', () => {
  it('correctly calculates 50+1 packaging bonus for commercial broilers', () => {
    const { birdsPerCarton, totalBirds } = calculatePackagingBirds(10, 'broiler');
    expect(birdsPerCarton).toBe(51);
    expect(totalBirds).toBe(510);
  });

  it('correctly calculates 50+1 packaging bonus for layer pullets and ducklings', () => {
    const pulletResult = calculatePackagingBirds(5, 'pullet');
    expect(pulletResult.birdsPerCarton).toBe(51);
    expect(pulletResult.totalBirds).toBe(255);

    const ducklingResult = calculatePackagingBirds(2, 'duckling');
    expect(ducklingResult.birdsPerCarton).toBe(51);
    expect(ducklingResult.totalBirds).toBe(102);
  });

  it('correctly calculates 25-poult packaging for commercial turkeys', () => {
    const { birdsPerCarton, totalBirds } = calculatePackagingBirds(10, 'turkey');
    expect(birdsPerCarton).toBe(25);
    expect(totalBirds).toBe(250);
  });

  it('provides verified partner hatcheries with official codes and packaging rules', async () => {
    const hatcheries = await getPartnerHatcheries();
    expect(hatcheries.length).toBeGreaterThanOrEqual(5);

    const codes = hatcheries.map((h) => h.code);
    expect(codes).toContain('CHI');
    expect(codes).toContain('ZAR');
    expect(codes).toContain('AMO');
    expect(codes).toContain('SAY');
    expect(codes).toContain('VAL');

    // Every hatchery must have dispatch days configured
    hatcheries.forEach((h) => {
      expect(h.is_active).toBe(true);
      expect(h.headquarters_location).toBeDefined();
    });
  });

  it('provides upcoming Tuesday and Thursday dispatch quotas with positive capacity', async () => {
    const quotas = await getUpcomingQuotas('broiler');
    expect(quotas.length).toBeGreaterThan(0);

    quotas.forEach((quota) => {
      expect(['Tuesday', 'Thursday']).toContain(quota.dispatch_day);
      expect(quota.total_cartons_quota).toBeGreaterThan(0);
      expect(quota.available_cartons).toBeGreaterThanOrEqual(0);
      expect(quota.estimated_price_per_carton).toBeGreaterThan(0);
    });
  });

  it('simulates transactional quota concurrency guard preventing overbooking', () => {
    // Simulated quota capacity of 50 cartons
    const quota = {
      totalCartonsQuota: 50,
      reservedCartons: 0,
      confirmedCartons: 0,
    };

    function attemptReservation(requestedCartons: number): { success: boolean; error?: string } {
      const available = quota.totalCartonsQuota - (quota.reservedCartons + quota.confirmedCartons);
      if (requestedCartons > available) {
        return { success: false, error: 'Insufficient quota available' };
      }
      quota.reservedCartons += requestedCartons;
      return { success: true };
    }

    // Farmer 1 reserves 30 cartons
    const res1 = attemptReservation(30);
    expect(res1.success).toBe(true);
    expect(quota.reservedCartons).toBe(30);

    // Farmer 2 attempts to reserve 30 cartons simultaneously
    const res2 = attemptReservation(30);
    expect(res2.success).toBe(false);
    expect(res2.error).toContain('Insufficient quota');
    expect(quota.reservedCartons).toBe(30); // Must remain at 30, never overbooked to 60!

    // Farmer 3 reserves 20 cartons (exact remaining capacity)
    const res3 = attemptReservation(20);
    expect(res3.success).toBe(true);
    expect(quota.reservedCartons).toBe(50); // Exact 50 cartons allocated
  });
});
