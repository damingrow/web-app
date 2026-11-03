/**
 * D-AminGrow NAFDAC Veterinary Regulatory Compliance Engine
 * 
 * Implements strict compliance rules based on:
 * - NAFDAC Veterinary Drugs and Vaccines Directorate Guidelines
 * - Veterinary Council of Nigeria (VCN) Prescription Stewardship Rules
 * - WHO / WOAH Antimicrobial Resistance (AMR) Action Plan for Food-Producing Animals
 * - National Cold-Chain Storage Protocols for Live and Inactivated Avian Vaccines
 */

import { ProductItem, RegulatoryVerificationState, RegulatedVeterinaryCategory } from '@/types/catalog';

// ============================================================================
// 1. REGULATORY PROHIBITED & RESTRICTED SUBSTANCES
// ============================================================================

/**
 * Substances strictly prohibited or banned by NAFDAC in food-producing livestock
 * (poultry, cattle, swine) due to carcinogenicity, aplastic anaemia, or cross-resistance.
 */
export const BANNED_VETERINARY_SUBSTANCES: { name: string; aliases: string[]; reason: string }[] = [
  {
    name: 'Chloramphenicol',
    aliases: ['chloramphenicol', 'chloromycetin'],
    reason: 'Strictly banned in food animals due to risk of fatal aplastic anaemia in humans (NAFDAC / WHO).',
  },
  {
    name: 'Nitrofurans',
    aliases: ['furazolidone', 'nitrofurazone', 'furaltadone', 'nitrofurantoin', 'nitrofuran'],
    reason: 'Prohibited in food-producing animals due to proven carcinogenicity and mutagenic tissue residues.',
  },
  {
    name: 'Nitroimidazoles (Metronidazole / Dimetridazole)',
    aliases: ['dimetridazole', 'ronidazole', 'ipronidazole', 'metronidazole'],
    reason: 'Banned in poultry and food animals due to suspected genotoxic carcinogenicity.',
  },
  {
    name: 'Stilbenes (DES)',
    aliases: ['diethylstilbestrol', 'des', 'dienestrol', 'hexestrol'],
    reason: 'Prohibited hormonal growth promoter banned under international and NAFDAC livestock regulations.',
  },
  {
    name: 'Carbadox & Olaquindox',
    aliases: ['carbadox', 'olaquindox'],
    reason: 'Quinoxaline-N,N-dioxides banned in food-producing livestock due to mutagenic potential.',
  },
  {
    name: 'Colistin as Growth Promoter',
    aliases: ['colistin sulfate growth promoter', 'preventive colistin'],
    reason: 'Reserve antibiotic of critical importance; banned for prophylactic/growth promotion purposes.',
  },
  {
    name: 'Gentian Violet',
    aliases: ['gentian violet', 'crystal violet'],
    reason: 'Banned as feed additive or oral antimycotic in food animals due to carcinogenicity.',
  },
];

/**
 * Prohibited claims for antibiotics under Antimicrobial Stewardship (AMR).
 */
export const PROHIBITED_AMR_MARKETING_CLAIMS = [
  'growth promoter',
  'growth promotion',
  'weight booster',
  'weight promoter',
  'fattening',
  'fattening booster',
  'meat booster',
  'feed intake stimulant antibiotic',
];

// ============================================================================
// 2. NAFDAC FORMAT REGEX & VALIDATORS
// ============================================================================

/**
 * NAFDAC Veterinary Registration Number standard format matcher.
 * Matches:
 * - 04-XXXX (Standard veterinary drug number)
 * - B4-XXXX, A4-XXXX (Veterinary biologic / vaccine classification)
 * - NRN-XXXX or NRN-VET-XXXX (National Registration Number)
 * - Standard alphanumeric format: 2-3 letters/numbers + hyphen + 4-6 digits
 */
export const NAFDAC_REG_REGEX = /^(04|A4|B4|NRN|VET)-?(\d{4,6}|[A-Z0-9]{4,6})$/i;

/**
 * Validates a NAFDAC registration number format.
 */
export function validateNafdacNumber(regNum?: string): { valid: boolean; normalized?: string; reason?: string } {
  if (!regNum || typeof regNum !== 'string' || !regNum.trim()) {
    return { valid: false, reason: 'NAFDAC Registration Number is missing.' };
  }

  const clean = regNum.trim().toUpperCase();

  // Primary check: standard NAFDAC format (e.g. 04-8921 or B4-1234)
  if (NAFDAC_REG_REGEX.test(clean)) {
    return { valid: true, normalized: clean };
  }

  // Permissive check for standard alphanumeric format with hyphens (e.g. "04-9412")
  const genericMatch = /^([A-Z0-9]{2,4})-([0-9]{3,6})$/i.test(clean);
  if (genericMatch) {
    return { valid: true, normalized: clean };
  }

  return {
    valid: false,
    reason: `Invalid NAFDAC number format "${regNum}". Expected official Nigerian format like "04-8921" or "B4-1234".`,
  };
}

// ============================================================================
// 3. SCREENING ENGINES
// ============================================================================

/**
 * Screens text against all banned veterinary substances.
 */
export function screenBannedVeterinarySubstances(text: string): {
  flagged: boolean;
  matchedSubstances: { name: string; reason: string }[];
} {
  if (!text) return { flagged: false, matchedSubstances: [] };
  const lower = text.toLowerCase();
  const matched: { name: string; reason: string }[] = [];

  for (const banned of BANNED_VETERINARY_SUBSTANCES) {
    for (const alias of banned.aliases) {
      // Use word boundary check
      const regex = new RegExp(`\\b${alias}\\b`, 'i');
      if (regex.test(lower)) {
        matched.push({ name: banned.name, reason: banned.reason });
        break;
      }
    }
  }

  return {
    flagged: matched.length > 0,
    matchedSubstances: matched,
  };
}

/**
 * Screens product descriptions for illicit AMR growth promotion claims.
 */
export function screenAmrGrowthPromoterClaims(description: string, isAntimicrobial: boolean): {
  flagged: boolean;
  matchedClaims: string[];
} {
  if (!isAntimicrobial || !description) return { flagged: false, matchedClaims: [] };
  const lower = description.toLowerCase();
  const matched: string[] = [];

  for (const claim of PROHIBITED_AMR_MARKETING_CLAIMS) {
    if (lower.includes(claim)) {
      matched.push(claim);
    }
  }

  return {
    flagged: matched.length > 0,
    matchedClaims: matched,
  };
}

// ============================================================================
// 4. COMPREHENSIVE COMPLIANCE AUDIT
// ============================================================================

export interface RegulatoryAuditChecklist {
  bannedSubstancesClean: boolean;
  nafdacRegistered: boolean;
  nafdacFormatValid: boolean;
  coldChainCompliant: boolean;
  withdrawalPeriodCompliant: boolean;
  amrCompliant: boolean;
}

export interface RegulatoryAuditResult {
  verificationState: RegulatoryVerificationState;
  regulatedCategory: RegulatedVeterinaryCategory;
  isPublishable: boolean;
  checklist: RegulatoryAuditChecklist;
  issues: string[];
  warnings: string[];
  requiresColdChain: boolean;
  requiresPrescription: boolean;
  auditTimestamp: string;
}

/**
 * Fully evaluates a product against all NAFDAC, VCN, and cold-chain compliance rules.
 */
export function evaluateProductCompliance(product: ProductItem): RegulatoryAuditResult {
  const issues: string[] = [];
  const warnings: string[] = [];

  // Determine regulated category
  let regulatedCategory: RegulatedVeterinaryCategory = 'exempt_livestock_equipment';
  if (product.category === 'vaccines') {
    regulatedCategory = 'biological_vaccine';
  } else if (product.category === 'drugs') {
    if (product.compliance.prescriptionRequired || product.compliance.amrWarning) {
      regulatedCategory = 'veterinary_prescription';
    } else {
      regulatedCategory = 'nutritional_supplement';
    }
  } else if (product.category === 'accessories') {
    regulatedCategory = 'exempt_livestock_equipment';
  } else {
    // chicks or point-of-lay
    regulatedCategory = 'exempt_livestock_equipment';
  }

  // 1. Prohibited substances check
  const textToScan = `${product.name} ${product.description} ${product.shortDescription} ${product.compliance.activeIngredients || ''}`;
  const bannedScan = screenBannedVeterinarySubstances(textToScan);
  const bannedSubstancesClean = !bannedScan.flagged;

  if (bannedScan.flagged) {
    bannedScan.matchedSubstances.forEach((sub) => {
      issues.push(`RESTRICTED SUBSTANCE DETECTED: Contains ${sub.name} (${sub.reason})`);
    });
  }

  // 2. AMR Growth Promoter check
  const amrScan = screenAmrGrowthPromoterClaims(product.description, !!product.compliance.amrWarning);
  const amrCompliant = !amrScan.flagged;
  if (amrScan.flagged) {
    issues.push(`AMR STEWARDSHIP VIOLATION: Cannot advertise antimicrobial products with claims like "${amrScan.matchedClaims.join(', ')}".`);
  }

  // 3. NAFDAC Registration verification
  let nafdacRegistered = false;
  let nafdacFormatValid = false;

  if (['drugs', 'vaccines'].includes(product.category)) {
    if (!product.compliance.nafdacNumber) {
      issues.push('NAFDAC Registration Number is missing for regulated veterinary pharmaceutical.');
    } else {
      const nafdacCheck = validateNafdacNumber(product.compliance.nafdacNumber);
      if (!nafdacCheck.valid) {
        issues.push(`NAFDAC Registration format error: ${nafdacCheck.reason}`);
      } else {
        nafdacRegistered = true;
        nafdacFormatValid = true;
      }
    }
  } else {
    // Exempt items (equipment, day-old chicks)
    nafdacRegistered = true;
    nafdacFormatValid = true;
  }

  // 4. Vaccine Cold Chain verification (+2°C to +8°C)
  let coldChainCompliant = true;
  if (product.category === 'vaccines') {
    if (!product.compliance.coldChainRequired) {
      issues.push('COLD-CHAIN VIOLATION: Avian vaccines must enforce cold-chain (+2°C to +8°C) protocol.');
      coldChainCompliant = false;
    }
    const storageDesc = (product.compliance.storageTemp || '').toLowerCase();
    if (!storageDesc.includes('2°c') && !storageDesc.includes('8°c') && !storageDesc.includes('cold')) {
      warnings.push('Storage specifications should explicitly mention +2°C to +8°C refrigeration.');
    }
  }

  // 5. Withdrawal Period verification (Drugs / Antibiotics)
  let withdrawalPeriodCompliant = true;
  if (product.category === 'drugs' && product.compliance.amrWarning) {
    if (!product.compliance.withdrawalPeriod) {
      issues.push('WITHDRAWAL PERIOD MISSING: Antimicrobial drugs must specify meat and/or egg withdrawal days.');
      withdrawalPeriodCompliant = false;
    }
  }

  // Derive final verification state
  let verificationState: RegulatoryVerificationState = 'verified_for_sale';

  if (!bannedSubstancesClean) {
    verificationState = 'restricted_from_publication';
  } else if (!amrCompliant || issues.length > 0) {
    // Check if issues are missing documentation vs invalid
    const hasMissingDocs = issues.some(
      (i) => i.includes('missing') || i.includes('format error') || i.includes('WITHDRAWAL PERIOD MISSING')
    );
    verificationState = hasMissingDocs ? 'documentation_incomplete' : 'awaiting_verification';
  } else if (product.compliance.regulatoryStatus === 'pending_registration') {
    verificationState = 'awaiting_verification';
  } else {
    verificationState = 'verified_for_sale';
  }

  const isPublishable = verificationState === 'verified_for_sale';

  return {
    verificationState,
    regulatedCategory,
    isPublishable,
    checklist: {
      bannedSubstancesClean,
      nafdacRegistered,
      nafdacFormatValid,
      coldChainCompliant,
      withdrawalPeriodCompliant,
      amrCompliant,
    },
    issues,
    warnings,
    requiresColdChain: !!product.compliance.coldChainRequired,
    requiresPrescription: !!product.compliance.prescriptionRequired,
    auditTimestamp: new Date().toISOString(),
  };
}

/**
 * Gatekeeper function: ensures an admin cannot publish an unverified or illegal product.
 */
export function canPublishProduct(product: ProductItem): { allowed: boolean; reasons: string[] } {
  const audit = evaluateProductCompliance(product);
  return {
    allowed: audit.isPublishable,
    reasons: audit.issues,
  };
}
