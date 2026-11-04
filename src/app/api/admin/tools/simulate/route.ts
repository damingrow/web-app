import { NextResponse } from 'next/server';
import { z } from 'zod';

const simulateSchema = z.discriminatedUnion('toolType', [
  // 1. Brooder Pen Simulator
  z.object({
    toolType: z.literal('brooder'),
    flockSize: z.number().int().min(10).max(500000),
    birdType: z.enum(['broiler', 'layer', 'turkey', 'cockerel']).default('broiler'),
    ambientTempC: z.number().min(15).max(45).default(28),
  }),

  // 2. Feed Conversion Ratio (FCR) Simulator
  z.object({
    toolType: z.literal('fcr'),
    flockSize: z.number().int().min(10).max(500000),
    totalFeedBags: z.number().positive(),
    bagWeightKg: z.number().positive().default(25),
    feedBagPriceNgn: z.number().positive(),
    avgBirdWeightKg: z.number().positive(),
    liveBirdSalePriceNgn: z.number().positive().optional(),
    mortalityPercent: z.number().min(0).max(50).default(3),
  }),

  // 3. Hen-Day Egg Production (HDP) Simulator
  z.object({
    toolType: z.literal('hdp'),
    housedLayers: z.number().int().min(10).max(500000),
    dailyEggsCount: z.number().int().min(0),
    cratePriceNgn: z.number().positive(),
    dailyFeedBags: z.number().positive(),
    bagPriceNgn: z.number().positive(),
  }),

  // 4. Clinical Symptom Triager
  z.object({
    toolType: z.literal('triage'),
    flockSize: z.number().int().min(10).max(500000),
    birdAgeWeeks: z.number().min(0).max(100),
    dailyMortalityCount: z.number().int().min(0),
    symptoms: z.array(z.string()).min(1),
  }),
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = simulateSchema.parse(body);

    const timestamp = new Date().toISOString();

    if (validated.toolType === 'brooder') {
      const { flockSize, birdType, ambientTempC } = validated;

      // Density multipliers calibrated for Nigerian tropical housing
      const densityMap = {
        broiler: { sqMPerBird: 0.05, birdsPerHeater: 500, starterKgPerBird: 1.2 },
        layer: { sqMPerBird: 0.045, birdsPerHeater: 550, starterKgPerBird: 0.9 },
        turkey: { sqMPerBird: 0.09, birdsPerHeater: 300, starterKgPerBird: 2.5 },
        cockerel: { sqMPerBird: 0.04, birdsPerHeater: 600, starterKgPerBird: 0.8 },
      };

      const params = densityMap[birdType];
      const floorAreaSqM = +(flockSize * params.sqMPerBird).toFixed(2);
      const floorAreaSqFt = +(floorAreaSqM * 10.7639).toFixed(1);
      const gasBrooders = Math.ceil(flockSize / params.birdsPerHeater);
      const feedingTrays = Math.ceil(flockSize / 50);
      const drinkers = Math.ceil(flockSize / 50);
      const starterFeedKg = Math.round(flockSize * params.starterKgPerBird);
      const starterBags25kg = Math.ceil(starterFeedKg / 25);
      const guardRingsCount = Math.ceil(flockSize / 500);

      // Heating recommendation based on ambient temperature
      let heatingAdvisory = 'Normal heating required. Maintain 34°C brooding center temp.';
      if (ambientTempC < 24) {
        heatingAdvisory = 'Cool weather warning: Pre-heat pen 3 hours before arrival; curtains must be sealed.';
      } else if (ambientTempC > 33) {
        heatingAdvisory = 'High ambient temp: Ensure continuous air ventilation; avoid heat prostration.';
      }

      return NextResponse.json({
        success: true,
        toolType: 'brooder',
        timestamp,
        results: {
          flockSize,
          birdType,
          ambientTempC,
          floorAreaSqM,
          floorAreaSqFt,
          gasBrooders,
          feedingTrays,
          drinkers,
          guardRingsCount,
          starterFeedKg,
          starterBags25kg,
          heatingAdvisory,
          recommendedDiameterM: (Math.sqrt((floorAreaSqM * 4) / Math.PI)).toFixed(1),
        },
      });
    }

    if (validated.toolType === 'fcr') {
      const {
        flockSize,
        totalFeedBags,
        bagWeightKg,
        feedBagPriceNgn,
        avgBirdWeightKg,
        liveBirdSalePriceNgn,
        mortalityPercent,
      } = validated;

      const survivingBirds = Math.round(flockSize * (1 - mortalityPercent / 100));
      const totalFeedKg = totalFeedBags * bagWeightKg;
      const totalMeatKg = +(survivingBirds * avgBirdWeightKg).toFixed(1);
      const fcr = +(totalFeedKg / totalMeatKg).toFixed(2);

      const totalFeedCostNgn = totalFeedBags * feedBagPriceNgn;
      const feedCostPerKgMeatNgn = Math.round(totalFeedCostNgn / totalMeatKg);

      let epefScore: number | null = null;
      let profitabilityAnalysis: Record<string, unknown> | null = null;

      // European Production Efficiency Factor (EPEF)
      // EPEF = (Survival % * Avg Weight (kg) / (Age in days * FCR)) * 100
      const assumedAgeDays = 42;
      const survivalRate = 100 - mortalityPercent;
      epefScore = Math.round(
        (survivalRate * avgBirdWeightKg * 10000) / (assumedAgeDays * fcr * 100)
      );

      if (liveBirdSalePriceNgn && liveBirdSalePriceNgn > 0) {
        const estimatedRevenueNgn = survivingBirds * liveBirdSalePriceNgn;
        const grossMarginOverFeedNgn = estimatedRevenueNgn - totalFeedCostNgn;
        const grossMarginPercent = +(
          (grossMarginOverFeedNgn / estimatedRevenueNgn) *
          100
        ).toFixed(1);

        profitabilityAnalysis = {
          estimatedRevenueNgn,
          grossMarginOverFeedNgn,
          grossMarginPercent,
          marginPerBirdNgn: Math.round(grossMarginOverFeedNgn / survivingBirds),
        };
      }

      let performanceRating = 'Average Commercial Grade';
      let performanceColor = 'text-amber-600';
      if (fcr <= 1.55) {
        performanceRating = 'Exceptional / Elite Conversion (Top 5% National Performance)';
        performanceColor = 'text-emerald-600';
      } else if (fcr <= 1.70) {
        performanceRating = 'Good Standard Commercial Efficiency';
        performanceColor = 'text-emerald-700';
      } else if (fcr > 1.90) {
        performanceRating = 'Sub-optimal FCR / Feed Wastage Alert';
        performanceColor = 'text-rose-600';
      }

      return NextResponse.json({
        success: true,
        toolType: 'fcr',
        timestamp,
        results: {
          flockSize,
          survivingBirds,
          totalFeedKg,
          totalMeatKg,
          fcr,
          feedCostPerKgMeatNgn,
          totalFeedCostNgn,
          epefScore,
          performanceRating,
          performanceColor,
          profitabilityAnalysis,
        },
      });
    }

    if (validated.toolType === 'hdp') {
      const { housedLayers, dailyEggsCount, cratePriceNgn, dailyFeedBags, bagPriceNgn } =
        validated;

      const eggsPerCrate = 30;
      const hdpPercent = +((dailyEggsCount / housedLayers) * 100).toFixed(1);
      const cratesProduced = +(dailyEggsCount / eggsPerCrate).toFixed(1);
      const dailyRevenueNgn = Math.round(cratesProduced * cratePriceNgn);
      const dailyFeedCostNgn = Math.round(dailyFeedBags * bagPriceNgn);
      const dailyNetMarginNgn = dailyRevenueNgn - dailyFeedCostNgn;
      const marginPerCrateNgn = Math.round(dailyNetMarginNgn / (cratesProduced || 1));

      let stageAssessment = 'Normal Production Stage';
      if (hdpPercent >= 90) {
        stageAssessment = 'Peak Production Tier (Weeks 28–36)';
      } else if (hdpPercent >= 75) {
        stageAssessment = 'Sustained Mid-Lay Production (Weeks 37–55)';
      } else if (hdpPercent < 60) {
        stageAssessment = 'Drop in Lay / Clinical Check Recommended';
      }

      return NextResponse.json({
        success: true,
        toolType: 'hdp',
        timestamp,
        results: {
          housedLayers,
          dailyEggsCount,
          cratesProduced,
          hdpPercent,
          dailyRevenueNgn,
          dailyFeedCostNgn,
          dailyNetMarginNgn,
          marginPerCrateNgn,
          stageAssessment,
        },
      });
    }

    if (validated.toolType === 'triage') {
      const { flockSize, birdAgeWeeks, dailyMortalityCount, symptoms } = validated;

      const dailyMortalityPercent = +(
        (dailyMortalityCount / flockSize) *
        100
      ).toFixed(2);

      let urgencyLevel: 'CRITICAL EMERGENCY' | 'HIGH RISK' | 'ROUTINE ADVISORY' =
        'ROUTINE ADVISORY';
      let urgencyColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';

      if (dailyMortalityPercent >= 1.0 || symptoms.includes('sudden_death_high_mortality')) {
        urgencyLevel = 'CRITICAL EMERGENCY';
        urgencyColor = 'bg-rose-100 text-rose-800 border-rose-300';
      } else if (dailyMortalityPercent >= 0.3 || symptoms.length >= 3) {
        urgencyLevel = 'HIGH RISK';
        urgencyColor = 'bg-amber-100 text-amber-800 border-amber-300';
      }

      // Compute differential matches based on selected clinical markers
      const differentials: Array<{
        disease: string;
        matchPercent: number;
        treatmentSummary: string;
        nafdacRequirement: string;
      }> = [];

      if (
        symptoms.includes('bloody_droppings') ||
        symptoms.includes('ruffled_feathers_huddling')
      ) {
        differentials.push({
          disease: 'Coccidiosis (Eimeria tenella / necatrix)',
          matchPercent: 92,
          treatmentSummary:
            'Immediate administration of Toltrazuril 2.5% (2 days) or Amprolium soluble powder in water.',
          nafdacRequirement: 'Adhere to 3-day meat withdrawal period before bird harvesting.',
        });
      }

      if (
        symptoms.includes('gasps_coughing_rales') ||
        symptoms.includes('facial_swelling')
      ) {
        differentials.push({
          disease: 'Chronic Respiratory Disease (CRD / Mycoplasma gallisepticum)',
          matchPercent: 88,
          treatmentSummary:
            'Tylosin tartrate or Doxycycline + Colistin combination powder in drinking water for 5 consecutive days.',
          nafdacRequirement: '7-day withdrawal period for broiler slaughter.',
        });
      }

      if (
        symptoms.includes('greenish_white_diarrhea') ||
        symptoms.includes('twisted_neck_tremors')
      ) {
        differentials.push({
          disease: 'Newcastle Disease (Velogenic / Neurotropic NDV)',
          matchPercent: 95,
          treatmentSummary:
            'Viral origin — no antibiotic curative. Isolate pen, administer broad-spectrum multivitamin + electrolytes, and evaluate emergency LaSota booster.',
          nafdacRequirement: 'Immediate notification to state VCN veterinary officer.',
        });
      }

      if (differentials.length === 0) {
        differentials.push({
          disease: 'Non-Specific Environmental / Nutritional Stress',
          matchPercent: 70,
          treatmentSummary:
            'Administer Anti-stress Vitamin C and balanced electrolyte hydration. Check brooding ventilation.',
          nafdacRequirement: 'Standard veterinary biosecurity adherence.',
        });
      }

      return NextResponse.json({
        success: true,
        toolType: 'triage',
        timestamp,
        results: {
          flockSize,
          birdAgeWeeks,
          dailyMortalityCount,
          dailyMortalityPercent,
          urgencyLevel,
          urgencyColor,
          differentials,
          quarantineAdvised: dailyMortalityPercent >= 0.5,
        },
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid tool type specified' },
      { status: 400 }
    );
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: err.flatten().fieldErrors },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Server calculation failure' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return baseline calibrated constants
  return NextResponse.json({
    success: true,
    calibratedAt: '2026-11-04T00:00:00Z',
    standards: {
      brooder: {
        broilerSqMPerBird: 0.05,
        layerSqMPerBird: 0.045,
        turkeySqMPerBird: 0.09,
        birdsPerGasBrooder: 500,
        birdsPerFeederTray: 50,
        birdsPerDrinker: 50,
      },
      fcr: {
        benchmarkBroilerFCR: 1.58,
        standardBagWeightKg: 25,
        averageFeedPriceNgn: 16800,
        targetLiveWeightKg: 2.2,
      },
      hdp: {
        peakHdpMin: 92,
        peakHdpMax: 96,
        standardEggsPerCrate: 30,
        averageCratePriceNgn: 4200,
      },
    },
  });
}
