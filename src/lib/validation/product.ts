import { z } from 'zod';

export const productComplianceSchema = z
  .object({
    name: z.string().min(3).max(255),
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
    categorySlug: z.enum(['accessories', 'drugs', 'vaccines', 'day_old_chicks']),
    description: z.string().min(10),
    priceNgn: z.number().positive().nullable(),
    isPriceVariable: z.boolean().default(false),
    minOrderQuantity: z.number().int().positive().default(1),
    packagingUnit: z.string().min(1).default('item'),
    stockStatus: z.enum(['in_stock', 'low_stock', 'out_of_stock', 'pre_order_only', 'discontinued']),

    // Compliance Fields
    regulatoryStatus: z.enum(['nafdac_registered', 'pending_registration', 'exempt_accessory', 'not_applicable']),
    nafdacRegNumber: z.string().optional(),
    isPrescriptionRequired: z.boolean().default(false),
    isAntimicrobial: z.boolean().default(false),
    isColdChainRequired: z.boolean().default(false),
    storageTempMinCelsius: z.number().optional(),
    storageTempMaxCelsius: z.number().optional(),
    meatWithdrawalPeriodDays: z.number().int().nonnegative().default(0),
    eggWithdrawalPeriodDays: z.number().int().nonnegative().default(0),
  })
  .superRefine((data, ctx) => {
    // 1. Pharmaceutical NAFDAC registration rule
    if (['drugs', 'vaccines'].includes(data.categorySlug) && data.regulatoryStatus === 'nafdac_registered' && !data.nafdacRegNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['nafdacRegNumber'],
        message: 'NAFDAC Registration Number is required when regulatory status is marked as registered.',
      });
    }

    // 2. Vaccine Cold-Chain Rule
    if (data.categorySlug === 'vaccines') {
      if (!data.isColdChainRequired) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['isColdChainRequired'],
          message: 'Vaccines must enforce cold-chain requirement (+2°C to +8°C).',
        });
      }
      if (data.storageTempMinCelsius === undefined || data.storageTempMaxCelsius === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['storageTempMinCelsius'],
          message: 'Storage minimum and maximum temperatures must be specified for vaccines.',
        });
      }
    }

    // 3. Antimicrobial Growth Promoter (AMR) Stewardship Rule
    if (data.isAntimicrobial) {
      const lowerDesc = data.description.toLowerCase();
      const bannedTerms = ['growth promoter', 'weight booster', 'fattening', 'growth promotion'];
      for (const term of bannedTerms) {
        if (lowerDesc.includes(term)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['description'],
            message: `AMR Compliance Violation: Antibiotics cannot be advertised as "${term}".`,
          });
        }
      }
    }
  });

export type ProductComplianceInput = z.infer<typeof productComplianceSchema>;
