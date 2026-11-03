/**
 * D-AminGrow Calculator Share & Brooding Chart Export Utilities
 */

import { env } from '@/lib/env';

export interface BrooderExportData {
  flockSize: number;
  birdType: 'broiler' | 'layer';
  gasBrooders: number;
  feedingTrays: number;
  drinkers: number;
  floorAreaSqM: string;
  floorAreaSqFt: string;
  starterFeedKg: number;
  starterBags25kg: number;
}

export interface BroodingDaySchedule {
  dayRange: string;
  targetTempCenter: string;
  targetTempPerimeter: string;
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
      lightingHours: '23 Hours (1 Hour Darkness)',
      nutritionAndWater: 'Glucose + Anti-Stress Vitamin C (Ascorbic Acid). Feed on shallow paper trays.',
      managementNotes: 'Pre-heat pen 2 hours before arrival. Floor litter must be warm (32°C) to foot touch.',
    },
    {
      dayRange: 'Days 4–7',
      targetTempCenter: '32°C – 33°C',
      targetTempPerimeter: '30°C',
      lightingHours: '22 Hours (2 Hours Darkness)',
      nutritionAndWater: 'Multivitamins + essential amino acids in water. 100% Starter Crumble.',
      managementNotes: 'Expand brooder guard rings by 30%. Day 7: Administer Newcastle Hitchner B1 / LaSota prime vaccine.',
    },
    {
      dayRange: 'Days 8–14',
      targetTempCenter: '29°C – 31°C',
      targetTempPerimeter: '28°C',
      lightingHours: '20 Hours',
      nutritionAndWater: 'Clean unmedicated borehole water. Day 10–12: Gumboro (IBD) Intermediate Plus vaccine.',
      managementNotes: 'Transition from starter trays to conical feeders. Introduce bell or nipple drinkers.',
    },
    {
      dayRange: 'Days 15–21',
      targetTempCenter: '26°C – 28°C',
      targetTempPerimeter: '25°C',
      lightingHours: '18 Hours',
      nutritionAndWater: 'Starter Crumble. Day 18–20: Gumboro booster in skimmed milk water.',
      managementNotes: 'Remove circular brooder rings. Birds now occupy open floor or entire brooding pen.',
    },
    {
      dayRange: 'Days 22–28',
      targetTempCenter: '23°C – 25°C',
      targetTempPerimeter: '22°C',
      lightingHours: 'Natural daylight + 2h evening light',
      nutritionAndWater: 'Transition from Starter to Grower feed. Day 24: Newcastle LaSota booster vaccine.',
      managementNotes: 'Turn off gas brooder during warm daytime hours. Monitor ventilation to expel ammonia.',
    },
    {
      dayRange: 'Days 29+',
      targetTempCenter: '21°C – 23°C (Ambient)',
      targetTempPerimeter: 'Ambient',
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
  const phone = env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\+/g, '');
  const text = `*D-AMINGROW POULTRY BROODER PLAN* 🐣
--------------------------------------
*Flock Size:* ${data.flockSize.toLocaleString()} ${data.birdType === 'broiler' ? 'Broilers' : 'Layers'}
*Required Floor Space:* ${data.floorAreaSqM} m² (${data.floorAreaSqFt} sq. ft)
*Infrared Gas Brooders:* ${data.gasBrooders} Unit(s)
*Chick Feeding Trays:* ${data.feedingTrays} Trays
*Drinkers Required:* ${data.drinkers} Units
*First 14-Day Starter Feed:* ~${data.starterFeedKg} kg (~${data.starterBags25kg} bags of 25kg)

*Target Temperature:* 32°C - 35°C (First 3 days)
Generated via D-AminGrow Farm Engineering Utility.
https://damingrow.com/calculators/brooder`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Formats FCR calculation into structured WhatsApp message URL.
 */
export function formatFcrForWhatsApp(
  flockSize: number,
  totalFeedKg: number,
  totalWeightKg: number,
  fcr: number,
  status: string
): string {
  const phone = env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\+/g, '');
  const text = `*D-AMINGROW BROILER FCR PERFORMANCE REPORT* 📊
--------------------------------------
*Flock Size:* ${flockSize.toLocaleString()} Birds
*Total Feed Consumed:* ${totalFeedKg.toLocaleString()} kg
*Total Live Weight Produced:* ${totalWeightKg.toLocaleString()} kg
*Calculated FCR:* ${fcr.toFixed(2)}
*Performance Rating:* ${status.toUpperCase()}

Generated via D-AminGrow Poultry Economics Desk.
https://damingrow.com/calculators/fcr`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
