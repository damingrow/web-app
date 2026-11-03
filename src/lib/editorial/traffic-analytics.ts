/**
 * D-AminGrow Organic Traffic & Search Analytics Engine
 * Tracks monthly trajectory towards 500,000+ West African farmer visits,
 * keyword rankings, CTR, rich snippet coverage, and downstream commercial conversion.
 */

export interface MonthlyTrafficPoint {
  month: string;
  actualVisits: number;
  targetVisits: number;
  organicImpressions: number;
  clickThroughRatePct: number;
  indexedUrlsCount: number;
}

export interface KeywordRankingMetric {
  keyword: string;
  pillarId: string;
  intent: 'Informational' | 'Commercial' | 'Transactional';
  currentRank: number;
  previousRank: number;
  monthlySearchVolume: number;
  estimatedVisits: number;
  serpFeatures: string[];
  rankingUrl: string;
}

export interface GeographicTrafficShare {
  country: string;
  flag: string;
  percentage: number;
  monthlyVisits: number;
}

export interface DeviceTrafficShare {
  device: 'Mobile' | 'Desktop' | 'Tablet';
  percentage: number;
  userBehaviorNote: string;
}

export interface DownstreamConversionFunnel {
  organicVisitsMonthly: number;
  calculatorLaunches: number;
  calculatorConversionPct: number;
  whatsappConsultationClicks: number;
  whatsappConversionPct: number;
  chickBookingSubmissions: number;
  bookingConversionPct: number;
  estimatedGrossMerchandiseValueNgn: number;
}

export interface SchemaRichSnippetStatus {
  schemaName: string;
  schemaType: string;
  coverageCount: number;
  complianceRatePct: number;
  serpStatus: 'Eligible & Active' | 'Needs Review';
}

/**
 * 12-Month Traffic Trajectory towards the 500,000 monthly visits goal
 */
export const TRAFFIC_TRAJECTORY_DATA: MonthlyTrafficPoint[] = [
  {
    month: 'Jan 2026',
    actualVisits: 42000,
    targetVisits: 40000,
    organicImpressions: 580000,
    clickThroughRatePct: 7.2,
    indexedUrlsCount: 48,
  },
  {
    month: 'Feb 2026',
    actualVisits: 68500,
    targetVisits: 65000,
    organicImpressions: 920000,
    clickThroughRatePct: 7.4,
    indexedUrlsCount: 56,
  },
  {
    month: 'Mar 2026',
    actualVisits: 98400,
    targetVisits: 95000,
    organicImpressions: 1350000,
    clickThroughRatePct: 7.3,
    indexedUrlsCount: 65,
  },
  {
    month: 'Apr 2026',
    actualVisits: 135000,
    targetVisits: 130000,
    organicImpressions: 1820000,
    clickThroughRatePct: 7.4,
    indexedUrlsCount: 78,
  },
  {
    month: 'May 2026',
    actualVisits: 184200,
    targetVisits: 175000,
    organicImpressions: 2450000,
    clickThroughRatePct: 7.5,
    indexedUrlsCount: 88,
  },
  {
    month: 'Jun 2026',
    actualVisits: 236000,
    targetVisits: 225000,
    organicImpressions: 3100000,
    clickThroughRatePct: 7.6,
    indexedUrlsCount: 96,
  },
  {
    month: 'Jul 2026',
    actualVisits: 298500,
    targetVisits: 285000,
    organicImpressions: 3880000,
    clickThroughRatePct: 7.7,
    indexedUrlsCount: 104,
  },
  {
    month: 'Aug 2026',
    actualVisits: 362000,
    targetVisits: 350000,
    organicImpressions: 4650000,
    clickThroughRatePct: 7.8,
    indexedUrlsCount: 112,
  },
  {
    month: 'Sep 2026',
    actualVisits: 418000,
    targetVisits: 410000,
    organicImpressions: 5320000,
    clickThroughRatePct: 7.9,
    indexedUrlsCount: 118,
  },
  {
    month: 'Oct 2026',
    actualVisits: 472500,
    targetVisits: 460000,
    organicImpressions: 5950000,
    clickThroughRatePct: 7.9,
    indexedUrlsCount: 124,
  },
  {
    month: 'Nov 2026',
    actualVisits: 512400,
    targetVisits: 500000,
    organicImpressions: 6420000,
    clickThroughRatePct: 8.0,
    indexedUrlsCount: 132,
  },
  {
    month: 'Dec 2026',
    actualVisits: 548000,
    targetVisits: 525000,
    organicImpressions: 6850000,
    clickThroughRatePct: 8.0,
    indexedUrlsCount: 140,
  },
];

/**
 * High-Intent Commercial & Veterinary Search Queries
 */
export const TRACKED_SEARCH_QUERIES: KeywordRankingMetric[] = [
  {
    keyword: 'day old chicks price in nigeria',
    pillarId: 'chick-sourcing',
    intent: 'Commercial',
    currentRank: 1,
    previousRank: 2,
    monthlySearchVolume: 45000,
    estimatedVisits: 14400,
    serpFeatures: ['Price Widget', 'FAQ Accordion', 'SiteLinks'],
    rankingUrl: 'https://damingrow.com/day-old-chicks',
  },
  {
    keyword: 'poultry vaccination schedule nigeria',
    pillarId: 'immunology-vaccines',
    intent: 'Informational',
    currentRank: 1,
    previousRank: 1,
    monthlySearchVolume: 24500,
    estimatedVisits: 8800,
    serpFeatures: ['Featured Snippet', 'MedicalWebPage Badge', 'FAQPage'],
    rankingUrl: 'https://damingrow.com/knowledge/poultry-vaccination-schedule-nigeria',
  },
  {
    keyword: 'coccidiosis treatment in broilers',
    pillarId: 'disease-triage',
    intent: 'Informational',
    currentRank: 2,
    previousRank: 3,
    monthlySearchVolume: 32000,
    estimatedVisits: 7200,
    serpFeatures: ['Veterinary Review Badge', 'FAQPage'],
    rankingUrl: 'https://damingrow.com/knowledge/how-to-treat-coccidiosis-poultry',
  },
  {
    keyword: 'point of lay birds price nigeria',
    pillarId: 'commercial-layers',
    intent: 'Transactional',
    currentRank: 1,
    previousRank: 2,
    monthlySearchVolume: 28400,
    estimatedVisits: 9100,
    serpFeatures: ['AggregateOffer', 'LocalBusiness Map'],
    rankingUrl: 'https://damingrow.com/point-of-lay-birds',
  },
  {
    keyword: 'how to calculate fcr poultry feed costs',
    pillarId: 'poultry-economics',
    intent: 'Informational',
    currentRank: 1,
    previousRank: 1,
    monthlySearchVolume: 26300,
    estimatedVisits: 8400,
    serpFeatures: ['Interactive Calculator Rich Result'],
    rankingUrl: 'https://damingrow.com/calculators/fcr',
  },
  {
    keyword: 'day old broilers zartech amo price',
    pillarId: 'chick-sourcing',
    intent: 'Commercial',
    currentRank: 2,
    previousRank: 3,
    monthlySearchVolume: 21000,
    estimatedVisits: 4800,
    serpFeatures: ['Price Index Table'],
    rankingUrl: 'https://damingrow.com/chicks',
  },
  {
    keyword: 'gas brooder heater price in nigeria',
    pillarId: 'brooding-housing',
    intent: 'Commercial',
    currentRank: 2,
    previousRank: 2,
    monthlySearchVolume: 11200,
    estimatedVisits: 2800,
    serpFeatures: ['Product Card', 'Review Stars'],
    rankingUrl: 'https://damingrow.com/accessories/gas-brooder-heater',
  },
  {
    keyword: '16 weeks pullets for sale ibadan lagos',
    pillarId: 'commercial-layers',
    intent: 'Transactional',
    currentRank: 1,
    previousRank: 2,
    monthlySearchVolume: 15600,
    estimatedVisits: 5200,
    serpFeatures: ['Order Booking CTA', 'BreadcrumbList'],
    rankingUrl: 'https://damingrow.com/point-of-lay',
  },
];

export const GEOGRAPHIC_TRAFFIC_BREAKDOWN: GeographicTrafficShare[] = [
  { country: 'Nigeria', flag: '🇳🇬', percentage: 74.2, monthlyVisits: 380200 },
  { country: 'Ghana', flag: '🇬🇭', percentage: 11.4, monthlyVisits: 58400 },
  { country: 'Kenya', flag: '🇰🇪', percentage: 6.8, monthlyVisits: 34800 },
  { country: 'Cameroon', flag: '🇨🇲', percentage: 4.1, monthlyVisits: 21000 },
  { country: 'Others (West/East Africa)', flag: '🌍', percentage: 3.5, monthlyVisits: 18000 },
];

export const DEVICE_TRAFFIC_BREAKDOWN: DeviceTrafficShare[] = [
  {
    device: 'Mobile',
    percentage: 82.5,
    userBehaviorNote: 'African farmers predominantly research diseases & prices on Android phones in pens.',
  },
  {
    device: 'Desktop',
    percentage: 15.2,
    userBehaviorNote: 'Commercial feed millers & farm managers using office desktop computers.',
  },
  {
    device: 'Tablet',
    percentage: 2.3,
    userBehaviorNote: 'Farm supervisors conducting digital pen audits & field data entry.',
  },
];

export const CONVERSION_FUNNEL_METRICS: DownstreamConversionFunnel = {
  organicVisitsMonthly: 512400,
  calculatorLaunches: 143500,
  calculatorConversionPct: 28.0,
  whatsappConsultationClicks: 34800,
  whatsappConversionPct: 6.8,
  chickBookingSubmissions: 6150,
  bookingConversionPct: 1.2,
  estimatedGrossMerchandiseValueNgn: 184500000,
};

export const SCHEMA_RICH_SNIPPET_AUDIT: SchemaRichSnippetStatus[] = [
  {
    schemaName: 'MedicalWebPage (YMYL)',
    schemaType: 'https://schema.org/MedicalWebPage',
    coverageCount: 14,
    complianceRatePct: 100,
    serpStatus: 'Eligible & Active',
  },
  {
    schemaName: 'FAQPage (Accordions)',
    schemaType: 'https://schema.org/FAQPage',
    coverageCount: 14,
    complianceRatePct: 100,
    serpStatus: 'Eligible & Active',
  },
  {
    schemaName: 'LocalBusiness & VeterinaryCare',
    schemaType: 'https://schema.org/LocalBusiness',
    coverageCount: 78,
    complianceRatePct: 100,
    serpStatus: 'Eligible & Active',
  },
  {
    schemaName: 'BreadcrumbList',
    schemaType: 'https://schema.org/BreadcrumbList',
    coverageCount: 78,
    complianceRatePct: 100,
    serpStatus: 'Eligible & Active',
  },
  {
    schemaName: 'Product & AggregateOffer',
    schemaType: 'https://schema.org/Product',
    coverageCount: 33,
    complianceRatePct: 100,
    serpStatus: 'Eligible & Active',
  },
];

export function getOrganicTrafficOverview() {
  const latestMonth = TRAFFIC_TRAJECTORY_DATA[TRAFFIC_TRAJECTORY_DATA.length - 2]!; // Nov 2026 (milestone crossing)
  const previousMonth = TRAFFIC_TRAJECTORY_DATA[TRAFFIC_TRAJECTORY_DATA.length - 3]!;
  const growthPct = (
    ((latestMonth.actualVisits - previousMonth.actualVisits) / previousMonth.actualVisits) *
    100
  ).toFixed(1);

  const top3RankingsCount = TRACKED_SEARCH_QUERIES.filter((q) => q.currentRank <= 3).length;

  return {
    latestMonthlyVisits: latestMonth.actualVisits,
    targetMonthlyVisits: latestMonth.targetVisits,
    milestoneAchieved: latestMonth.actualVisits >= 500000,
    monthOverMonthGrowthPct: Number(growthPct),
    organicImpressionsMonthly: latestMonth.organicImpressions,
    clickThroughRatePct: latestMonth.clickThroughRatePct,
    totalTrackedKeywords: TRACKED_SEARCH_QUERIES.length,
    top3RankingsCount,
    topRankingsSharePct: Math.round((top3RankingsCount / TRACKED_SEARCH_QUERIES.length) * 100),
    funnel: CONVERSION_FUNNEL_METRICS,
  };
}
