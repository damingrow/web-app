import { describe, it, expect } from 'vitest';
import { createEnquirySchema } from '@/lib/validation/enquiry';
import { productComplianceSchema } from '@/lib/validation/product';

describe('Enquiry Form Validation', () => {
  it('accepts valid Nigerian phone numbers and complete order inputs', () => {
    const validData = {
      enquiryType: 'whatsapp_order' as const,
      customerName: 'Alhaji Musa',
      customerPhone: '08139169402',
      deliveryCity: 'Ibadan',
      deliveryState: 'Oyo',
      items: [
        {
          name: 'Day-Old Broiler Chicks',
          quantity: 2,
          unitPriceNgn: 45000,
        },
      ],
      consentGiven: true as const,
    };

    const parsed = createEnquirySchema.safeParse(validData);
    expect(parsed.success).toBe(true);
  });

  it('rejects invalid phone numbers or missing consent', () => {
    const invalidPhone = {
      customerName: 'Test Farmer',
      customerPhone: '12345', // invalid
      deliveryCity: 'Lagos',
      deliveryState: 'Lagos',
      items: [{ name: 'Feeder', quantity: 1 }],
      consentGiven: true as const,
    };

    const result = createEnquirySchema.safeParse(invalidPhone);
    expect(result.success).toBe(false);

    const noConsent = {
      ...invalidPhone,
      customerPhone: '08139169402',
      consentGiven: false,
    };
    const result2 = createEnquirySchema.safeParse(noConsent);
    expect(result2.success).toBe(false);
  });
});

describe('Product Regulatory & Compliance Validation', () => {
  it('enforces NAFDAC registration number when product is registered', () => {
    const missingNafdac = {
      name: 'Oxytetracycline 20%',
      slug: 'oxytet-20',
      categorySlug: 'drugs' as const,
      description: 'Broad spectrum veterinary antibiotic powder.',
      priceNgn: 4500,
      stockStatus: 'in_stock' as const,
      regulatoryStatus: 'nafdac_registered' as const,
      // nafdacRegNumber omitted!
    };

    const result = productComplianceSchema.safeParse(missingNafdac);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toContain('nafdacRegNumber');
    }
  });

  it('strictly blocks antibiotics advertising as growth promoters (AMR Rule)', () => {
    const amrViolation = {
      name: 'Oxytetracycline 20%',
      slug: 'oxytet-20',
      categorySlug: 'drugs' as const,
      description: 'Excellent antibiotic and powerful growth promoter for broilers.',
      priceNgn: 4500,
      stockStatus: 'in_stock' as const,
      regulatoryStatus: 'nafdac_registered' as const,
      nafdacRegNumber: '04-9876',
      isAntimicrobial: true,
    };

    const result = productComplianceSchema.safeParse(amrViolation);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain('AMR Compliance Violation');
    }
  });

  it('enforces cold-chain requirements on vaccines', () => {
    const badVaccine = {
      name: 'Newcastle LaSota Vaccine',
      slug: 'newcastle-lasota',
      categorySlug: 'vaccines' as const,
      description: 'Live freeze-dried viral vaccine for Newcastle disease.',
      priceNgn: 3000,
      stockStatus: 'in_stock' as const,
      regulatoryStatus: 'nafdac_registered' as const,
      nafdacRegNumber: '04-1234',
      isColdChainRequired: false, // Must be true!
    };

    const result = productComplianceSchema.safeParse(badVaccine);
    expect(result.success).toBe(false);
  });
});
