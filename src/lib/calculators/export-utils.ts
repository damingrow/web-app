/**
 * D-AminGrow Calculator Share & Brooding Chart Export Utilities
 */

import { env } from '@/lib/env';

export interface BrooderExportData {
  flockSize: number;
  birdType?: 'broiler' | 'layer';
  breedType?: string;
  gasBrooders?: number;
  feedingTrays?: number;
  drinkers?: number;
  floorAreaSqM: string | number;
  floorAreaSqFt: string | number;
  starterFeedKg?: number;
  starterBags25kg?: number;
  recommendedDrinkers?: number;
  recommendedFeeders?: number;
  brooderDiameterM?: number;
}

export interface BroodingDaySchedule {
  dayRange: string;
  targetTempCenter: string;
  targetTempPerimeter: string;
  targetTempC?: string;
  lightingHours: string;
  nutritionAndWater: string;
  managementNotes: string;
}

/**
 * Generates official day-by-day brooding protocol chart data for printing / PDF export.
 */
export function getStandardBroodingSchedule(): BroodingDaySchedule[] {
  return [
    {
      dayRange: 'Days 1–3',
      targetTempCenter: '34°C – 35°C',
      targetTempPerimeter: '32°C',
      targetTempC: '32 - 35°C',
      lightingHours: '23 Hours (1 Hour Darkness)',
      nutritionAndWater: 'Glucose + Anti-Stress Vitamin C (Ascorbic Acid). Feed on shallow paper trays.',
      managementNotes: 'Pre-heat pen 2 hours before arrival. Floor litter must be warm (32°C) to foot touch.',
    },
    {
      dayRange: 'Days 4–7',
      targetTempCenter: '32°C – 33°C',
      targetTempPerimeter: '30°C',
      targetTempC: '30 - 33°C',
      lightingHours: '22 Hours (2 Hours Darkness)',
      nutritionAndWater: 'Multivitamins + essential amino acids in water. 100% Starter Crumble.',
      managementNotes: 'Expand brooder guard rings by 30%. Day 7: Administer Newcastle Hitchner B1 / LaSota prime vaccine.',
    },
    {
      dayRange: 'Days 8–14',
      targetTempCenter: '29°C – 31°C',
      targetTempPerimeter: '28°C',
      targetTempC: '28 - 31°C',
      lightingHours: '20 Hours',
      nutritionAndWater: 'Clean unmedicated borehole water. Day 10–12: Gumboro (IBD) Intermediate Plus vaccine.',
      managementNotes: 'Transition from starter trays to conical feeders. Introduce bell or nipple drinkers.',
    },
    {
      dayRange: 'Days 15–21',
      targetTempCenter: '26°C – 28°C',
      targetTempPerimeter: '25°C',
      targetTempC: '25 - 28°C',
      lightingHours: '18 Hours',
      nutritionAndWater: 'Starter Crumble. Day 18–20: Gumboro booster in skimmed milk water.',
      managementNotes: 'Remove circular brooder rings. Birds now occupy open floor or entire brooding pen.',
    },
    {
      dayRange: 'Days 22–28',
      targetTempCenter: '23°C – 25°C',
      targetTempPerimeter: '22°C',
      targetTempC: '22 - 25°C',
      lightingHours: 'Natural daylight + 2h evening light',
      nutritionAndWater: 'Transition from Starter to Grower feed. Day 24: Newcastle LaSota booster vaccine.',
      managementNotes: 'Turn off gas brooder during warm daytime hours. Monitor ventilation to expel ammonia.',
    },
    {
      dayRange: 'Days 29+',
      targetTempCenter: '21°C – 23°C (Ambient)',
      targetTempPerimeter: 'Ambient',
      targetTempC: '21 - 24°C',
      lightingHours: 'Natural photoperiod',
      nutritionAndWater: 'Grower / Finisher feed. Ad libitum cool water.',
      managementNotes: 'Heaters fully removed. Ensure cross-ventilation and maintain dry litter (<25% moisture).',
    },
  ];
}

/**
 * Formats brooder calculation into structured WhatsApp message URL.
 */
export function formatBrooderForWhatsApp(data: BrooderExportData): string {
  const phone = (env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348139169402').replace(/\+/g, '');
  const breed = data.breedType || (data.birdType === 'broiler' ? 'Broilers' : 'Layers');
  const drinkers = data.recommendedDrinkers ?? data.drinkers ?? 0;
  const feeders = data.recommendedFeeders ?? data.feedingTrays ?? 0;

  const text = `*D-AMINGROW POULTRY BROODER PLAN* 🐣
--------------------------------------
*Flock Size:* ${data.flockSize} ${breed}
*Required Floor Space:* ${data.floorAreaSqM} m² (${data.floorAreaSqFt} sq. ft)
${data.gasBrooders ? `*Infrared Gas Brooders:* ${data.gasBrooders} Unit(s)\n` : ''}*Chick Feeding Trays:* ${feeders} Trays
*Drinkers Required:* ${drinkers} Units
${data.starterFeedKg ? `*First 14-Day Starter Feed:* ~${data.starterFeedKg} kg (~${data.starterBags25kg ?? Math.ceil(data.starterFeedKg / 25)} bags of 25kg)\n` : ''}
*Target Temperature:* 32°C - 35°C (First 3 days)
Generated via D-AminGrow Farm Engineering Utility.
https://damingrow.com/calculators/brooder`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export interface FcrExportData {
  flockSize: number;
  feedConsumedBags?: number;
  feedConsumedKg?: number;
  totalLiveWeightKg?: number;
  calculatedFcr?: number;
  performanceRating?: string;
}

/**
 * Formats FCR calculation into structured WhatsApp message URL.
 * Supports both an options object and positional arguments.
 */
export function formatFcrForWhatsApp(
  flockSizeOrData: number | FcrExportData,
  totalFeedKgArg?: number,
  totalWeightKgArg?: number,
  fcrArg?: number,
  statusArg?: string
): string {
  const phone = (env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348139169402').replace(/\+/g, '');

  let flockSize: number;
  let totalFeedKg: number;
  let totalWeightKg: number;
  let fcr: number;
  let status: string;

  if (typeof flockSizeOrData === 'object') {
    flockSize = flockSizeOrData.flockSize;
    totalFeedKg = flockSizeOrData.feedConsumedKg ?? (flockSizeOrData.feedConsumedBags ? flockSizeOrData.feedConsumedBags * 25 : 0);
    totalWeightKg = flockSizeOrData.totalLiveWeightKg ?? 0;
    fcr = flockSizeOrData.calculatedFcr ?? (totalWeightKg > 0 ? totalFeedKg / totalWeightKg : 0);
    status = flockSizeOrData.performanceRating ?? 'STANDARD';
  } else {
    flockSize = flockSizeOrData;
    totalFeedKg = totalFeedKgArg ?? 0;
    totalWeightKg = totalWeightKgArg ?? 0;
    fcr = fcrArg ?? 0;
    status = statusArg ?? 'STANDARD';
  }

  const text = `*D-AMINGROW BROILER FCR PERFORMANCE REPORT* 📊
--------------------------------------
*Flock Size:* ${flockSize} Birds
*Total Feed Consumed:* ${totalFeedKg.toLocaleString()} kg
*Total Live Weight Produced:* ${totalWeightKg.toLocaleString()} kg
*Calculated FCR:* ${fcr.toFixed(2)}
*Performance Rating:* ${status.toUpperCase()}

Generated via D-AminGrow Poultry Economics Desk.
https://damingrow.com/calculators/fcr`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
