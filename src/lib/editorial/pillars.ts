/**
 * D-AminGrow 6-Pillar Editorial Publishing Engine & Content Architecture
 *
 * Implements the programmatic topic cluster strategy designed to capture
 * 500,000+ monthly organic visits across Nigerian and West African poultry farming.
 *
 * Core Pillars:
 * 1. Immunology, Cold Chain & Vaccination Schedules
 * 2. Clinical Disease Triage & Antimicrobial Stewardship
 * 3. Brooding Engineering & Tropical Housing Design
 * 4. Commercial Layers & Point-of-Lay Optimization
 * 5. Poultry Economics, Feed Formulation & FCR
 * 6. Hatchery Genetics & Day-Old Chick Sourcing
 */

import { ArticleItem, ARTICLES } from '@/data/articles';

export type PillarId =
  | 'immunology-vaccines'
  | 'disease-triage'
  | 'brooding-housing'
  | 'commercial-layers'
  | 'poultry-economics'
  | 'chick-sourcing';

export interface PillarKeywordIntent {
  query: string;
  intent: 'Informational' | 'Commercial' | 'Transactional';
  estimatedMonthlySearches: number;
  competition: 'Low' | 'Medium' | 'High';
  targetSlug?: string;
}

export interface EditorialPillar {
  id: PillarId;
  slug: string;
  name: string;
  shortTitle: string;
  badge: string;
  badgeColor: string;
  iconName: string;
  description: string;
  targetAudience: string;
  monthlyTrafficTarget: number;
  clinicalReviewStandard: string;
  featuredTopics: string[];
  associatedCalculators: {
    title: string;
    href: string;
    badge: string;
  }[];
  primaryKeywords: PillarKeywordIntent[];
}

export const EDITORIAL_PILLARS: EditorialPillar[] = [
  {
    id: 'immunology-vaccines',
    slug: 'immunology-vaccines',
    name: 'Immunology, Cold Chain & Vaccination Schedules',
    shortTitle: 'Vaccines & Cold-Chain',
    badge: 'Clinical Immunization',
    badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
    iconName: 'Syringe',
    description:
      'Calibrated immunization timetables, maternal antibody decay timelines, and 2°C–8°C cold-chain preservation protocols for Newcastle, Gumboro (IBD), Marek’s, and EDS in tropical environments.',
    targetAudience: 'Commercial broiler rearers, layer pullet managers, veterinary technicians & hatcheries.',
    monthlyTrafficTarget: 120000,
    clinicalReviewStandard: 'Mandatory VCN Surgeon audit for serological timing and water sanitizer neutralisation.',
    featuredTopics: [
      'Gumboro (IBD) Georgia & 228E strain timing',
      'Lasota vs Hitchner B1 Newcastle protocols',
      'Vaccine stabilizer and skimmed milk dosage in well water',
      'Cold-chain transport in styrofoam insulated ice-packs',
    ],
    associatedCalculators: [
      {
        title: 'Vaccination Timetable Generator',
        href: '/calculators/vaccination',
        badge: 'Immunization Sync',
      },
    ],
    primaryKeywords: [
      {
        query: 'poultry vaccination schedule nigeria',
        intent: 'Informational',
        estimatedMonthlySearches: 24500,
        competition: 'Medium',
        targetSlug: 'poultry-vaccination-schedule-nigeria',
      },
      {
        query: 'gumboro vaccine timing day old broilers',
        intent: 'Informational',
        estimatedMonthlySearches: 18200,
        competition: 'Low',
        targetSlug: 'gumboro-disease-symptoms-prevention',
      },
      {
        query: 'lasota vaccine price in nigeria',
        intent: 'Commercial',
        estimatedMonthlySearches: 9800,
        competition: 'Low',
      },
      {
        query: 'vaccine cold chain failure symptoms poultry',
        intent: 'Informational',
        estimatedMonthlySearches: 6400,
        competition: 'Low',
      },
    ],
  },
  {
    id: 'disease-triage',
    slug: 'disease-triage',
    name: 'Clinical Disease Triage & Antimicrobial Stewardship',
    shortTitle: 'Disease Triage & AMR',
    badge: 'Veterinary Clinical SOS',
    badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-500/20',
    iconName: 'Stethoscope',
    description:
      'Symptom matching for acute mortality, post-mortem differential diagnosis, and strict NAFDAC withdrawal period adherence to halt antimicrobial resistance (AMR) on Nigerian farms.',
    targetAudience: 'Farm owners dealing with sudden mortality, wet droppings, respiratory sounds, or nervous signs.',
    monthlyTrafficTarget: 145000,
    clinicalReviewStandard: 'Mandatory VCN clinical review with explicit NAFDAC withdrawal periods and AMR warnings.',
    featuredTopics: [
      'Coccidiosis bloody droppings triage with Amprolium & Toltrazuril',
      'Chronic Respiratory Disease (CRD / Mycoplasma gallisepticum)',
      'Fowl Cholera & Colibacillosis acute septicemia differentiation',
      'Banned nitrofurans and chloramphenicol zero-tolerance alerts',
    ],
    associatedCalculators: [
      {
        title: 'Disease Symptom Triaging Assistant',
        href: '/calculators/symptom-checker',
        badge: 'Clinical Emergency',
      },
      {
        title: 'Water Medication & Withdrawal Calculator',
        href: '/calculators/water-medication',
        badge: 'Dosage Precision',
      },
    ],
    primaryKeywords: [
      {
        query: 'how to treat coccidiosis in broilers nigeria',
        intent: 'Informational',
        estimatedMonthlySearches: 32000,
        competition: 'Medium',
        targetSlug: 'how-to-treat-coccidiosis-poultry',
      },
      {
        query: 'crd symptoms in chicken snoring sound',
        intent: 'Informational',
        estimatedMonthlySearches: 21500,
        competition: 'Low',
        targetSlug: 'chronic-respiratory-disease-crd-poultry',
      },
      {
        query: 'amprolium dosage per litre drinking water',
        intent: 'Informational',
        estimatedMonthlySearches: 14200,
        competition: 'Low',
      },
      {
        query: 'antibiotic withdrawal period broiler meat',
        intent: 'Informational',
        estimatedMonthlySearches: 8900,
        competition: 'Low',
      },
    ],
  },
  {
    id: 'brooding-housing',
    slug: 'brooding-housing',
    name: 'Brooding Engineering & Tropical Housing Design',
    shortTitle: 'Brooding & Housing',
    badge: 'Farm Infrastructure',
    badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    iconName: 'Flame',
    description:
      'Precision thermal brooding (32°C–35°C), radiant gas canopy calibration, natural open-sided pen cross-ventilation, and litter moisture management for hot-humid Nigerian conditions.',
    targetAudience: 'Broiler and pullet brooding attendants, farm builders, and new poultry startup entrepreneurs.',
    monthlyTrafficTarget: 85000,
    clinicalReviewStandard: 'Agricultural engineering and microclimate audit for tropical thermal stress abatement.',
    featuredTopics: [
      'Gas brooder vs charcoal pot carbon monoxide poisoning prevention',
      'First-week chick paper feed spreading & crop fill scoring (95% at 24h)',
      'Wood shavings vs sawdust wet litter prevention',
      'High-velocity fan placement and roof thatch overhang cooling',
    ],
    associatedCalculators: [
      {
        title: 'Brooder Floor Space & Gas Heating Calculator',
        href: '/calculators/brooder',
        badge: 'Equipment Sizing',
      },
      {
        title: 'Stocking Density & Pen Capacity Calculator',
        href: '/calculators/stocking-density',
        badge: 'Bio-Space Safety',
      },
    ],
    primaryKeywords: [
      {
        query: 'day old chicks brooding temperature nigeria',
        intent: 'Informational',
        estimatedMonthlySearches: 19800,
        competition: 'Low',
        targetSlug: 'day-old-chick-brooding-guide',
      },
      {
        query: 'gas brooder heater price in nigeria',
        intent: 'Commercial',
        estimatedMonthlySearches: 11200,
        competition: 'Low',
        targetSlug: 'gas-brooder-vs-electric-brooder-nigeria',
      },
      {
        query: 'broiler heat stress management tropical climate',
        intent: 'Informational',
        estimatedMonthlySearches: 8700,
        competition: 'Low',
        targetSlug: 'broiler-heat-stress-management-tropical-climate-nigeria',
      },
      {
        query: 'automatic nipple drinker setup guide poultry',
        intent: 'Commercial',
        estimatedMonthlySearches: 7400,
        competition: 'Low',
        targetSlug: 'automatic-nipple-drinker-setup-guide',
      },
    ],
  },
  {
    id: 'commercial-layers',
    slug: 'commercial-layers',
    name: 'Commercial Layers & Point-of-Lay Optimization',
    shortTitle: 'Layers & Point-of-Lay',
    badge: 'Egg Production Scale',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
    iconName: 'Egg',
    description:
      'Laying curve management, Hen-Day Production (HDP) benchmarks (90%+ peak), step-up lighting photoperiod programs, coarse limestone calcium feeding, and battery cage vs deep litter economics.',
    targetAudience: 'Commercial layer farmers, Point-of-Lay pullet buyers, egg aggregators, and cage farm operators.',
    monthlyTrafficTarget: 95000,
    clinicalReviewStandard: 'Reproductive physiology, pre-lay booster immunization, and metabolic calcium balance review.',
    featuredTopics: [
      '16–18 weeks Point-of-Lay pullet transfer and stress vaccination',
      'Hen-Day (HDP) dips: nutritional vs disease vs lighting root causes',
      'Oyster shell vs limestone grit inclusion for thick eggshells',
      'Battery cage galvanization tiers: hot-dip vs electroplated lifespans',
    ],
    associatedCalculators: [
      {
        title: 'Hen-Day Production (HDP) & Layer Profitability',
        href: '/calculators/egg-production',
        badge: 'Egg Margin Optimizer',
      },
    ],
    primaryKeywords: [
      {
        query: 'point of lay birds price in nigeria',
        intent: 'Transactional',
        estimatedMonthlySearches: 28400,
        competition: 'Medium',
        targetSlug: 'point-of-lay-pullet-management-egg-production-nigeria',
      },
      {
        query: '16 weeks pullets for sale ibadan lagos',
        intent: 'Transactional',
        estimatedMonthlySearches: 15600,
        competition: 'Low',
      },
      {
        query: 'how to increase egg production in layers',
        intent: 'Informational',
        estimatedMonthlySearches: 18900,
        competition: 'Medium',
      },
      {
        query: 'layer battery cage price nigeria 120 birds',
        intent: 'Commercial',
        estimatedMonthlySearches: 14100,
        competition: 'Low',
      },
    ],
  },
  {
    id: 'poultry-economics',
    slug: 'poultry-economics',
    name: 'Poultry Economics, Feed Formulation & FCR',
    shortTitle: 'Feed & FCR Economics',
    badge: 'Margin Engineering',
    badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    iconName: 'Scale',
    description:
      'Feed Conversion Ratio (FCR 1.5–1.7 targets), Pearson Square feed formulation with maize, soya bean meal, wheat offal, bone meal, premixes, and net margin cost per kg live weight calculations.',
    targetAudience: 'Farm financial controllers, commercial feed millers, independent on-farm mixers, and scale broiler producers.',
    monthlyTrafficTarget: 110000,
    clinicalReviewStandard: 'Avian nutrition review for amino acid (lysine, methionine) and metabolizable energy density balance.',
    featuredTopics: [
      'Calculating FCR and cost of feed per kg live weight in Nigerian Naira',
      'Alternative feedstuffs: cassava chips, palm kernel cake (PKC) inclusion limits',
      'Mycotoxin binders and feed mold inhibition during rainy season storage',
      'Enzyme supplementation to unlock non-starch polysaccharides (NSPs)',
    ],
    associatedCalculators: [
      {
        title: 'Feed Conversion Ratio (FCR) & Margin Calculator',
        href: '/calculators/fcr',
        badge: 'Feed Profitability',
      },
      {
        title: 'Commercial Chick Batch Profitability Calculator',
        href: '/calculators/chick-profitability',
        badge: 'Batch ROI & Breakeven',
      },
    ],
    primaryKeywords: [
      {
        query: 'how to calculate fcr in poultry farming nigeria',
        intent: 'Informational',
        estimatedMonthlySearches: 26300,
        competition: 'Low',
        targetSlug: 'how-to-calculate-fcr-broiler-poultry-feed-costs-nigeria',
      },
      {
        query: 'feed formulation for broilers reducing feed cost',
        intent: 'Informational',
        estimatedMonthlySearches: 22100,
        competition: 'Medium',
      },
      {
        query: 'cost of raising 1000 broilers in nigeria 2026',
        intent: 'Commercial',
        estimatedMonthlySearches: 19500,
        competition: 'Low',
      },
      {
        query: 'poultry feed ingredients price list today',
        intent: 'Commercial',
        estimatedMonthlySearches: 16700,
        competition: 'Medium',
      },
    ],
  },
  {
    id: 'chick-sourcing',
    slug: 'chick-sourcing',
    name: 'Hatchery Genetics & Day-Old Chick Sourcing',
    shortTitle: 'Hatcheries & Genetics',
    badge: 'Breeder Genetics',
    badgeColor: 'bg-teal-500/10 text-teal-700 border-teal-500/20',
    iconName: 'Building2',
    description:
      'Verified performance benchmarks across Zartech, Amo, Chi, and Supreme parent stocks. Monday & Thursday dispatch logistics, boxing counts (50+1), and transit stress recovery.',
    targetAudience: 'Broiler growers, layer farmers, turkey rearers, and commercial livestock cooperative procurement officers.',
    monthlyTrafficTarget: 135000,
    clinicalReviewStandard: 'Biosecurity inspection and maternal immunity verification for parent breeding flocks.',
    featuredTopics: [
      'Zartech vs Amo vs Chi broiler growth curve comparison',
      '50+1 boxing convention and Dead-On-Arrival (DOA) replacement protocols',
      'Electrolyte & dextrose 20% rehydration administration at intake',
      'Motor park dispatch hubs: Iwo Road Ibadan, Ojoo, Berger Lagos waybills',
    ],
    associatedCalculators: [
      {
        title: 'Commercial Brooder Equipment Calculator',
        href: '/calculators/brooder',
        badge: 'Chick Placement Sync',
      },
    ],
    primaryKeywords: [
      {
        query: 'day old chicks price today in nigeria',
        intent: 'Commercial',
        estimatedMonthlySearches: 45000,
        competition: 'Medium',
        targetSlug: 'day-old-chick-hatchery-booking-guide-nigeria',
      },
      {
        query: 'zartech day old broilers booking ibadan',
        intent: 'Transactional',
        estimatedMonthlySearches: 21000,
        competition: 'Low',
      },
      {
        query: 'amo chicks price list this week',
        intent: 'Commercial',
        estimatedMonthlySearches: 17800,
        competition: 'Low',
      },
      {
        query: 'buy day old turkey poults in lagos',
        intent: 'Transactional',
        estimatedMonthlySearches: 12400,
        competition: 'Low',
      },
    ],
  },
];

/**
 * Maps an article category or slug to one of the 6 canonical editorial pillars
 */
export function getPillarForArticle(article: ArticleItem): EditorialPillar {
  const cat = article.category;
  if (cat === 'Immunology & Vaccines') {
    return EDITORIAL_PILLARS.find((p) => p.id === 'immunology-vaccines')!;
  }
  if (cat === 'Disease Management' || cat === 'Biosecurity & Disease Prevention') {
    return EDITORIAL_PILLARS.find((p) => p.id === 'disease-triage')!;
  }
  if (cat === 'Brooding & Housing' || cat === 'Flock Health & Climate Adaptation') {
    return EDITORIAL_PILLARS.find((p) => p.id === 'brooding-housing')!;
  }
  if (cat === 'Commercial Layers & Eggs') {
    return EDITORIAL_PILLARS.find((p) => p.id === 'commercial-layers')!;
  }
  if (cat === 'Poultry Economics & Nutrition') {
    return EDITORIAL_PILLARS.find((p) => p.id === 'poultry-economics')!;
  }
  if (cat === 'Day-Old Chick Sourcing') {
    return EDITORIAL_PILLARS.find((p) => p.id === 'chick-sourcing')!;
  }
  // Default to disease triage as the broadest clinical pillar
  return EDITORIAL_PILLARS[1]!;
}

/**
 * Returns all articles that belong to a specific pillar
 */
export function getArticlesForPillar(pillarId: PillarId): ArticleItem[] {
  return ARTICLES.filter((article) => getPillarForArticle(article).id === pillarId);
}

/**
 * Looks up a pillar by its slug or ID
 */
export function getPillarBySlug(slug: string): EditorialPillar | undefined {
  return EDITORIAL_PILLARS.find((p) => p.slug === slug || p.id === slug);
}

/**
 * Calculates aggregate stats across all 6 pillars
 */
export function getEditorialPillarStats() {
  const totalTarget = EDITORIAL_PILLARS.reduce((sum, p) => sum + p.monthlyTrafficTarget, 0);
  const totalTrackedKeywords = EDITORIAL_PILLARS.reduce(
    (sum, p) => sum + p.primaryKeywords.length,
    0
  );
  const totalTrackedSearchVolume = EDITORIAL_PILLARS.reduce(
    (sum, p) =>
      sum + p.primaryKeywords.reduce((ksum, k) => ksum + k.estimatedMonthlySearches, 0),
    0
  );

  const pillarBreakdowns = EDITORIAL_PILLARS.map((p) => {
    const articles = getArticlesForPillar(p.id);
    const vcnReviews = articles.filter((a) => a.clinicalReview?.vcnRegistration).length;
    return {
      pillar: p,
      articleCount: articles.length,
      vcnReviews,
      totalSearchDemand: p.primaryKeywords.reduce(
        (sum, k) => sum + k.estimatedMonthlySearches,
        0
      ),
    };
  });

  return {
    pillarCount: EDITORIAL_PILLARS.length,
    totalTargetMonthlyVisits: totalTarget,
    totalTrackedKeywords,
    totalTrackedSearchVolume,
    pillarBreakdowns,
  };
}

/**
 * Editorial Publishing Workflow State Definition
 */
export type EditorialWorkflowStatus =
  | 'draft'
  | 'editorial_review'
  | 'veterinary_review'
  | 'published'
  | 'archived';

export interface VcnValidationInput {
  reviewerName: string;
  credentials: string;
  vcnRegistration: string;
  declaration: string;
  amrComplianceVerified: boolean;
  dosageVerified: boolean;
  withdrawalPeriodNoted?: boolean;
}

export interface VcnValidationResult {
  isValid: boolean;
  errors: string[];
  normalizedVcnReg?: string;
}

/**
 * Validates Veterinary Council of Nigeria (VCN) sign-off credentials
 * Required for any article giving medical advice, dosages, or vaccine timetables.
 */
export function validateVcnClinicalSignOff(input: VcnValidationInput): VcnValidationResult {
  const errors: string[] = [];

  if (!input.reviewerName || input.reviewerName.trim().length < 3) {
    errors.push('Reviewer full name is required and must match Veterinary Register.');
  }

  if (!input.credentials || !input.credentials.includes('DVM')) {
    errors.push('Reviewer must hold a Doctor of Veterinary Medicine (DVM) degree.');
  }

  const vcnPattern = /^VCN\s*Reg\s*#?\s*(\d{4,6})$/i;
  const match = input.vcnRegistration?.trim().match(vcnPattern);
  if (!match) {
    errors.push(
      `Invalid VCN Registration number format ("${input.vcnRegistration}"). Format must be "VCN Reg #08492".`
    );
  }

  if (
    !input.declaration ||
    !input.declaration.toLowerCase().includes('veterinary council of nigeria')
  ) {
    errors.push('Clinical declaration must explicitly cite the Veterinary Council of Nigeria (VCN).');
  }

  if (!input.amrComplianceVerified) {
    errors.push('Antimicrobial Stewardship (AMR) audit checkbox must be verified.');
  }

  if (!input.dosageVerified) {
    errors.push('Dosage calculations and administration route verification must be confirmed.');
  }

  const normalized = match ? `VCN Reg #${match[1]}` : undefined;

  return {
    isValid: errors.length === 0,
    errors,
    normalizedVcnReg: normalized,
  };
}

/**
 * 90-Day Programmatic Seasonal Editorial Publishing Schedule
 * Aligns content releases with Nigerian commercial poultry seasonal cycles.
 */
export interface ScheduledEditorialRelease {
  week: number;
  season: 'Easter Prep' | 'Rainy / Wet Season' | 'Mid-Year Scaling' | 'Harmattan & Xmas Prep';
  pillarId: PillarId;
  targetTitle: string;
  targetKeyword: string;
  primaryIntent: 'Informational' | 'Commercial' | 'Transactional';
  leadReviewer: string;
}

export const SEASONAL_PUBLISHING_CALENDAR: ScheduledEditorialRelease[] = [
  {
    week: 1,
    season: 'Rainy / Wet Season',
    pillarId: 'disease-triage',
    targetTitle: 'Rainy Season Coccidiosis Outbreak Protocol: Wet Litter Management & Toltrazuril',
    targetKeyword: 'coccidiosis rainy season poultry nigeria',
    primaryIntent: 'Informational',
    leadReviewer: 'Dr. A. O. Bello, DVM, FCVSN (VCN Reg #08492)',
  },
  {
    week: 2,
    season: 'Rainy / Wet Season',
    pillarId: 'brooding-housing',
    targetTitle: 'Preventing Wet Droppings & High Humidity in Tropical Open-Sided Pens',
    targetKeyword: 'open sided poultry pen ventilation humidity',
    primaryIntent: 'Informational',
    leadReviewer: 'Dr. K. A. Adeleke, DVM (VCN Reg #06114)',
  },
  {
    week: 3,
    season: 'Mid-Year Scaling',
    pillarId: 'poultry-economics',
    targetTitle: 'Mid-Year Maize Price Surge: Safe Inclusion of Cassava Chips & PKC in Broiler Mash',
    targetKeyword: 'reducing poultry feed costs alternative maize nigeria',
    primaryIntent: 'Commercial',
    leadReviewer: 'Dr. C. E. Okonkwo, DVM (VCN Reg #09231)',
  },
  {
    week: 4,
    season: 'Mid-Year Scaling',
    pillarId: 'chick-sourcing',
    targetTitle: 'Zartech vs Amo vs Chi Broiler Growth Benchmarks at Week 6 (2.5kg Target)',
    targetKeyword: 'zartech vs amo broiler weight comparison',
    primaryIntent: 'Commercial',
    leadReviewer: 'Dr. A. O. Bello, DVM, FCVSN (VCN Reg #08492)',
  },
  {
    week: 5,
    season: 'Mid-Year Scaling',
    pillarId: 'commercial-layers',
    targetTitle: 'Overcoming the 35-Week Laying Dip: Calcium-Phosphorus Ratio & Lighting Calibration',
    targetKeyword: 'layer hen production drop 35 weeks causes',
    primaryIntent: 'Informational',
    leadReviewer: 'Dr. K. A. Adeleke, DVM (VCN Reg #06114)',
  },
  {
    week: 6,
    season: 'Mid-Year Scaling',
    pillarId: 'immunology-vaccines',
    targetTitle: 'Egg Drop Syndrome (EDS-76) Pre-Lay Booster Vaccination Protocol at Week 16',
    targetKeyword: 'egg drop syndrome vaccination schedule nigeria',
    primaryIntent: 'Informational',
    leadReviewer: 'Dr. C. E. Okonkwo, DVM (VCN Reg #09231)',
  },
  {
    week: 7,
    season: 'Harmattan & Xmas Prep',
    pillarId: 'chick-sourcing',
    targetTitle: 'Booking Day-Old Chicks for December Festive Market: Hatchery Cut-off Timetable',
    targetKeyword: 'day old chicks booking christmas market nigeria',
    primaryIntent: 'Transactional',
    leadReviewer: 'Dr. A. O. Bello, DVM, FCVSN (VCN Reg #08492)',
  },
  {
    week: 8,
    season: 'Harmattan & Xmas Prep',
    pillarId: 'brooding-housing',
    targetTitle: 'Harmattan Dust & Cold Night Brooding: Infrared Canopy Setup & Curtaining',
    targetKeyword: 'harmattan brooding chicks temperature nigeria',
    primaryIntent: 'Informational',
    leadReviewer: 'Dr. K. A. Adeleke, DVM (VCN Reg #06114)',
  },
];
