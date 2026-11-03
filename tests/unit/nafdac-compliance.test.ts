import { describe, it, expect } from 'vitest';
import {
  validateNafdacNumber,
  screenBannedVeterinarySubstances,
  screenAmrGrowthPromoterClaims,
  evaluateProductCompliance,
  canPublishProduct,
} from '@/lib/compliance/nafdac-audit';
import { ProductItem } from '@/types/catalog';

describe('NAFDAC Veterinary Regulatory & Compliance Controls (Phase 3)', () => {
  describe('NAFDAC Registration Number Validator', () => {
    it('accepts valid Nigerian veterinary registration formats', () => {
      expect(validateNafdacNumber('04-8921').valid).toBe(true);
      expect(validateNafdacNumber('04-9412').valid).toBe(true);
      expect(validateNafdacNumber('B4-1234').valid).toBe(true);
      expect(validateNafdacNumber('A4-5678').valid).toBe(true);
      expect(validateNafdacNumber('NRN-9876').valid).toBe(true);
    });

    it('rejects invalid or non-standard registration numbers', () => {
      expect(validateNafdacNumber('').valid).toBe(false);
      expect(validateNafdacNumber(undefined).valid).toBe(false);
      expect(validateNafdacNumber('ABC-XYZ-TOO-LONG').valid).toBe(false);
      expect(validateNafdacNumber('NOT_NAFDAC').valid).toBe(false);
    });
  });

  describe('Prohibited & Banned Substances Screening Engine', () => {
    it('detects banned Chloramphenicol and flags the product', () => {
      const text = 'Veterinary oral suspension containing Chloramphenicol 100mg for poultry.';
      const result = screenBannedVeterinarySubstances(text);
      expect(result.flagged).toBe(true);
      expect(result.matchedSubstances[0]?.name).toBe('Chloramphenicol');
    });

    it('detects banned Nitrofurans (Furazolidone)', () => {
      const text = 'Water-soluble powder containing Furazolidone 20% for salmonella treatment.';
      const result = screenBannedVeterinarySubstances(text);
      expect(result.flagged).toBe(true);
      expect(result.matchedSubstances[0]?.name).toBe('Nitrofurans');
    });

    it('detects banned Nitroimidazoles (Metronidazole / Dimetridazole)', () => {
      const text = 'Dimetridazole treatment for blackhead and histomoniasis in turkeys.';
      const result = screenBannedVeterinarySubstances(text);
      expect(result.flagged).toBe(true);
      expect(result.matchedSubstances[0]?.name).toContain('Nitroimidazoles');
    });

    it('passes approved veterinary pharmaceuticals without false positives', () => {
      const cleanText = 'Oxytetracycline Hydrochloride 200mg/g water soluble powder for colibacillosis.';
      const result = screenBannedVeterinarySubstances(cleanText);
      expect(result.flagged).toBe(false);
      expect(result.matchedSubstances.length).toBe(0);
    });
  });

  describe('AMR Growth Promoter Claim Screening', () => {
    it('blocks antibiotics advertised as growth promoters or weight boosters', () => {
      const description = 'Powerful antibiotic and rapid growth promoter to increase bird weight.';
      const result = screenAmrGrowthPromoterClaims(description, true);
      expect(result.flagged).toBe(true);
      expect(result.matchedClaims).toContain('growth promoter');
    });

    it('allows proper therapeutic antibiotic indications', () => {
      const description = 'Indicated for the clinical treatment of CRD and Colisepticemia in broilers.';
      const result = screenAmrGrowthPromoterClaims(description, true);
      expect(result.flagged).toBe(false);
    });
  });

  describe('Comprehensive Product Regulatory Evaluation & Gatekeeping', () => {
    const mockCompliantDrug: ProductItem = {
      id: 'test-drug-01',
      sku: 'VET-TST-01',
      name: 'Amoxicillin 20% Soluble Powder',
      slug: 'amoxicillin-20-soluble-powder',
      category: 'drugs',
      categoryName: 'Veterinary Drugs',
      shortDescription: 'Broad spectrum therapeutic antibiotic.',
      description: 'Treatment of bacterial respiratory and digestive infections in poultry.',
      unit: '100g Sachet',
      minOrderQty: 1,
      stockStatus: 'in_stock',
      primaryImage: '/products/Drugs/test.jpeg',
      galleryImages: [],
      compliance: {
        regulatoryStatus: 'nafdac_registered',
        nafdacNumber: '04-1122',
        withdrawalPeriod: 'Meat: 3 days | Eggs: 1 day',
        coldChainRequired: false,
        storageTemp: 'Store below 25°C in a dry place.',
        prescriptionRequired: true,
        activeIngredients: 'Amoxicillin Trihydrate 200mg/g',
        amrWarning: true,
      },
      specifications: {},
      features: [],
    };

    it('verifies fully compliant veterinary drug for sale', () => {
      const audit = evaluateProductCompliance(mockCompliantDrug);
      expect(audit.verificationState).toBe('verified_for_sale');
      expect(audit.isPublishable).toBe(true);
      expect(audit.checklist.bannedSubstancesClean).toBe(true);
      expect(audit.checklist.nafdacRegistered).toBe(true);
      expect(audit.checklist.withdrawalPeriodCompliant).toBe(true);
    });

    it('strictly restricts product containing banned nitrofurans from publication', () => {
      const illegalDrug: ProductItem = {
        ...mockCompliantDrug,
        name: 'Furazolidone 20% Powder',
        description: 'Contains furazolidone for rapid enteric bacterial cure.',
      };

      const audit = evaluateProductCompliance(illegalDrug);
      expect(audit.verificationState).toBe('restricted_from_publication');
      expect(audit.isPublishable).toBe(false);

      const publishCheck = canPublishProduct(illegalDrug);
      expect(publishCheck.allowed).toBe(false);
      expect(publishCheck.reasons.some((r) => r.includes('RESTRICTED SUBSTANCE'))).toBe(true);
    });

    it('flags vaccine missing cold-chain protocol as documentation incomplete', () => {
      const badVaccine: ProductItem = {
        ...mockCompliantDrug,
        category: 'vaccines',
        categoryName: 'Veterinary Vaccines',
        name: 'Gumboro IBD Live Vaccine',
        compliance: {
          ...mockCompliantDrug.compliance,
          coldChainRequired: false, // VIOLATION!
        },
      };

      const audit = evaluateProductCompliance(badVaccine);
      expect(audit.checklist.coldChainCompliant).toBe(false);
      expect(audit.isPublishable).toBe(false);
      expect(audit.verificationState).toBe('documentation_incomplete');
    });

    it('flags antibiotic missing withdrawal period as documentation incomplete', () => {
      const missingWithdrawalDrug: ProductItem = {
        ...mockCompliantDrug,
        compliance: {
          ...mockCompliantDrug.compliance,
          withdrawalPeriod: undefined, // VIOLATION!
        },
      };

      const audit = evaluateProductCompliance(missingWithdrawalDrug);
      expect(audit.checklist.withdrawalPeriodCompliant).toBe(false);
      expect(audit.isPublishable).toBe(false);
    });
  });
});
