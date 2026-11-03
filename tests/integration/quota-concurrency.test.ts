/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import {
  calculatePackaging,
  getUpcomingDispatchDates,
  reserveChickBooking,
  verifyBookingDeposit,
} from '@/lib/booking/booking-service';

describe('Phase 1: Transactional Booking Engine & Concurrency Control', () => {
  describe('1. Packaging Calculations', () => {
    it('correctly applies 50+1 packaging bonus for broilers, pullets, and ducklings', () => {
      const broiler = calculatePackaging(10, 'broiler');
      expect(broiler.birdsPerCarton).toBe(51);
      expect(broiler.totalBirds).toBe(510);
      expect(broiler.bonusChicksPerBox).toBe(1);

      const pullet = calculatePackaging(5, 'pullet');
      expect(pullet.birdsPerCarton).toBe(51);
      expect(pullet.totalBirds).toBe(255);

      const duckling = calculatePackaging(4, 'duckling');
      expect(duckling.birdsPerCarton).toBe(51);
      expect(duckling.totalBirds).toBe(204);
    });

    it('correctly applies 25-poult packaging for commercial turkeys', () => {
      const turkey = calculatePackaging(10, 'turkey');
      expect(turkey.birdsPerCarton).toBe(25);
      expect(turkey.totalBirds).toBe(250);
      expect(turkey.bonusChicksPerBox).toBe(0);
      expect(turkey.packagingUnit).toBe('box');
    });

    it('correctly applies 10-bird crate packaging for Point-of-Lay pullets', () => {
      const pol = calculatePackaging(15, 'pol');
      expect(pol.birdsPerCarton).toBe(10);
      expect(pol.totalBirds).toBe(150);
      expect(pol.packagingUnit).toBe('crate');
    });
  });

  describe('2. Dispatch Dates & 48-Hour Cutoff Logic', () => {
    it('generates upcoming dispatch dates exclusively on Tuesdays and Thursdays', () => {
      const dates = getUpcomingDispatchDates(4);
      expect(dates.length).toBeGreaterThanOrEqual(8);

      dates.forEach((d) => {
        expect(['Tuesday', 'Thursday']).toContain(d.dayOfWeek);
        expect(d.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(d.bookingClosesAt).toBeDefined();
      });
    });
  });

  describe('3. Transactional Reservation & Concurrency Guard', () => {
    it('successfully issues a 2-hour reservation hold with reference, 50% deposit, and Zenith Bank details', async () => {
      const res = await reserveChickBooking({
        customerName: 'Alhaji Ganiyu Oladipo',
        customerPhone: '+2348031234567',
        farmName: 'Oladipo Agro Ventures',
        deliveryState: 'Oyo',
        destinationHub: 'Bodija Market Depot',
        breedType: 'broiler',
        hatcheryCode: 'CHI',
        cartonsCount: 20,
      });

      expect(res.success).toBe(true);
      expect(res.bookingRef).toMatch(/^DOC-\d{8}-CHI-\w+$/);
      expect(res.cartonsCount).toBe(20);
      expect(res.totalBirdsCount).toBe(1020); // 20 * 51
      expect(res.requiredDepositNgn).toBe(Math.round((res.estimatedTotalNgn || 0) * 0.5));
      expect(res.heldUntil).toBeDefined();
      expect(res.bankDetails?.bankName).toBe('Zenith Bank Plc');
      expect(res.bankDetails?.accountNumber).toBe('1017894562');
    });

    it('simulates transactional concurrency row lock preventing overbooking', () => {
      // Setup quota batch of 100 cartons
      const quotaPool = {
        totalQuota: 100,
        reservedCartons: 0,
        confirmedCartons: 0,
      };

      function executeAtomicReservation(cartons: number): { success: boolean; error?: string } {
        const available = quotaPool.totalQuota - (quotaPool.reservedCartons + quotaPool.confirmedCartons);
        if (cartons > available) {
          return {
            success: false,
            error: `Insufficient quota: only ${available} cartons available, requested ${cartons}`,
          };
        }
        quotaPool.reservedCartons += cartons;
        return { success: true };
      }

      // Customer 1: requests 60 cartons
      const c1 = executeAtomicReservation(60);
      expect(c1.success).toBe(true);
      expect(quotaPool.reservedCartons).toBe(60);

      // Customer 2: attempts to reserve 60 cartons concurrently (exceeds 40 available)
      const c2 = executeAtomicReservation(60);
      expect(c2.success).toBe(false);
      expect(c2.error).toContain('only 40 cartons available');
      expect(quotaPool.reservedCartons).toBe(60); // Must remain locked at 60

      // Customer 3: reserves remaining 40 cartons
      const c3 = executeAtomicReservation(40);
      expect(c3.success).toBe(true);
      expect(quotaPool.reservedCartons).toBe(100);

      // Customer 4: attempts 1 carton when 0 remaining
      const c4 = executeAtomicReservation(1);
      expect(c4.success).toBe(false);
      expect(c4.error).toContain('only 0 cartons available');
    });
  });

  describe('4. Deposit Reconciliation State Machine', () => {
    it('successfully processes deposit verification and marks booking confirmed', async () => {
      const verifyRes = await verifyBookingDeposit({
        bookingRef: 'DOC-20261103-CHI-7890',
        bankName: 'Zenith Bank Plc',
        paymentReference: 'NIP/ZENITH/20261103/998124',
        depositorName: 'Ganiyu Oladipo',
        amountPaidNgn: 480000,
      });

      expect(verifyRes.success).toBe(true);
      expect(verifyRes.bookingRef).toBe('DOC-20261103-CHI-7890');
      expect(verifyRes.bookingStatus).toBe('confirmed');
      expect(verifyRes.depositStatus).toBe('verified');
    });

    it('rejects deposit verification submission with non-positive amount or missing references', async () => {
      const invalidRes = await verifyBookingDeposit({
        bookingRef: '',
        bankName: 'Zenith Bank Plc',
        paymentReference: '',
        depositorName: 'Anonymous',
        amountPaidNgn: -5000,
      });

      expect(invalidRes.success).toBe(false);
      expect(invalidRes.error).toContain('Invalid deposit verification input');
    });
  });
});
