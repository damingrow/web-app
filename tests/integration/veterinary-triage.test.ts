import { describe, it, expect } from 'vitest';
import { calculatePackagingBirds } from '@/lib/supabase/data-access';
import { z } from 'zod';

// Replicate Zod schema from /api/enquiries
const enquiryInputSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z.string().min(10).max(25),
  state: z.string().min(2).max(50),
  city: z.string().max(100).optional(),
  farmName: z.string().max(100).optional(),
  enquiryType: z
    .enum(['whatsapp_order', 'bulk_quote', 'veterinary_consultation', 'farm_setup_inquiry', 'general'])
    .default('whatsapp_order'),
  notes: z.string().max(4000).optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  consentMarketing: z.boolean().default(true),
});

describe('Phase 4: Point-of-Lay Birds & Veterinary Clinical Triage', () => {
  describe('Point-of-Lay Packaging Calculations', () => {
    it('calculates 10 birds per crate for Point-of-Lay pullets', () => {
      const result5 = calculatePackagingBirds(5, 'pol');
      expect(result5.birdsPerCarton).toBe(10);
      expect(result5.totalBirds).toBe(50);

      const result10 = calculatePackagingBirds(10, 'pol');
      expect(result10.birdsPerCarton).toBe(10);
      expect(result10.totalBirds).toBe(100);
    });

    it('distinguishes POL crates (10) from Turkey boxes (25) and Broiler boxes (51)', () => {
      expect(calculatePackagingBirds(2, 'pol').birdsPerCarton).toBe(10);
      expect(calculatePackagingBirds(2, 'turkey').birdsPerCarton).toBe(25);
      expect(calculatePackagingBirds(2, 'broiler').birdsPerCarton).toBe(51);
    });
  });

  describe('Veterinary Clinical Intake Schema & Priority Routing', () => {
    it('accepts valid clinical triage inquiry with urgent priority', () => {
      const payload = {
        fullName: 'Dr. Sunday Adeleke',
        phone: '08031234567',
        state: 'Oyo',
        city: 'Ibadan',
        farmName: 'Apex Broilers Ltd',
        enquiryType: 'veterinary_consultation',
        priority: 'urgent',
        notes: '[VETERINARY CLINICAL TRIAGE INTAKE]\nUrgency: CRITICAL\nMortality: 50+ birds\nSigns: Bloody droppings, gasping',
        consentMarketing: true,
      };

      const parsed = enquiryInputSchema.safeParse(payload);
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.priority).toBe('urgent');
        expect(parsed.data.enquiryType).toBe('veterinary_consultation');
      }
    });

    it('defaults priority correctly based on enquiry type when omitted', () => {
      const vetPayload = {
        fullName: 'Mrs. Fatima Danjuma',
        phone: '+2348123456789',
        state: 'Kaduna',
        enquiryType: 'veterinary_consultation' as const,
      };

      const parsedVet = enquiryInputSchema.parse(vetPayload);
      const computedPriorityVet = parsedVet.priority || (parsedVet.enquiryType === 'veterinary_consultation' ? 'high' : 'normal');
      expect(computedPriorityVet).toBe('high');

      const generalPayload = {
        fullName: 'Mr. Chukwuma Obi',
        phone: '08149876543',
        state: 'Enugu',
        enquiryType: 'general' as const,
      };

      const parsedGen = enquiryInputSchema.parse(generalPayload);
      const computedPriorityGen = parsedGen.priority || (parsedGen.enquiryType === 'veterinary_consultation' ? 'high' : 'normal');
      expect(computedPriorityGen).toBe('normal');
    });

    it('rejects clinical inquiry with invalid or empty phone or missing name', () => {
      const invalidPayload = {
        fullName: 'A', // too short (<2)
        phone: '123', // too short (<10)
        state: 'Lagos',
        enquiryType: 'veterinary_consultation',
      };

      const parsed = enquiryInputSchema.safeParse(invalidPayload);
      expect(parsed.success).toBe(false);
    });
  });

  describe('Clinical Diagnostic Triage Scoring Algorithm', () => {
    interface TriageInputs {
      mortalityRate: string;
      hasAcuteSymptom: boolean;
      feedDrop: string;
    }

    const evaluateTriage = (input: TriageInputs) => {
      const isHighMortality = input.mortalityRate === '21-50' || input.mortalityRate === '50+';
      const isMediumMortality = input.mortalityRate === '6-20';
      const isFeedCrash = input.feedDrop === 'severe_drop' || input.feedDrop === 'off_feed';

      if (isHighMortality || (isMediumMortality && input.hasAcuteSymptom) || (isFeedCrash && input.hasAcuteSymptom)) {
        return 'critical';
      }
      if (isMediumMortality || isFeedCrash || input.hasAcuteSymptom) {
        return 'high';
      }
      return 'normal';
    };

    it('flags mass mortality (>20 birds) as critical emergency', () => {
      expect(evaluateTriage({ mortalityRate: '50+', hasAcuteSymptom: false, feedDrop: 'normal' })).toBe('critical');
      expect(evaluateTriage({ mortalityRate: '21-50', hasAcuteSymptom: false, feedDrop: 'mild_drop' })).toBe('critical');
    });

    it('flags active mortality with acute symptoms (e.g. bloody droppings) as critical', () => {
      expect(evaluateTriage({ mortalityRate: '6-20', hasAcuteSymptom: true, feedDrop: 'mild_drop' })).toBe('critical');
    });

    it('flags acute symptoms without mass mortality as high priority', () => {
      expect(evaluateTriage({ mortalityRate: '1-5', hasAcuteSymptom: true, feedDrop: 'normal' })).toBe('high');
      expect(evaluateTriage({ mortalityRate: '0', hasAcuteSymptom: true, feedDrop: 'normal' })).toBe('high');
    });

    it('flags low mortality and normal feed without acute signs as routine normal', () => {
      expect(evaluateTriage({ mortalityRate: '1-5', hasAcuteSymptom: false, feedDrop: 'normal' })).toBe('normal');
      expect(evaluateTriage({ mortalityRate: '0', hasAcuteSymptom: false, feedDrop: 'mild_drop' })).toBe('normal');
    });
  });

  describe('Emergency WhatsApp Handover Link Verification', () => {
    it('creates a compliant WhatsApp handover URL with official business number', () => {
      const officialPhone = '2348139169402';
      const ref = 'DAG-CASE-202611-998';
      const handoverText = `Hello D-AminGrow Veterinary Desk,\nUrgent Clinical Handover Ref: ${ref}`;
      const url = `https://wa.me/${officialPhone}?text=${encodeURIComponent(handoverText)}`;

      expect(url).toContain('https://wa.me/2348139169402');
      expect(url).toContain(encodeURIComponent(ref));
    });
  });
});
