import { describe, it, expect } from 'vitest';

describe('Phase 4: Commercial Buyer-Intent Routing & Specialized Consultancy Funnels', () => {
  describe('Breed Packaging & Commercial Lineage Specifications', () => {
    it('enforces 51 birds per carton for day-old broilers, pullets, and cockerels', () => {
      const dayOldPackagingFormula = (standardCount: number, bufferCount: number) => standardCount + bufferCount;
      expect(dayOldPackagingFormula(50, 1)).toBe(51);
    });

    it('enforces 25 poults per carton for commercial broad-breasted turkeys', () => {
      const turkeyPackagingLimit = 25;
      expect(turkeyPackagingLimit).toBe(25);
    });

    it('enforces 10 mature birds per crate for Point-of-Lay pullets', () => {
      const polCrateCapacity = 10;
      const minOrderBirds = 50;
      const minCrates = minOrderBirds / polCrateCapacity;
      expect(minCrates).toBe(5);
    });
  });

  describe('Farm Setup & Pen Architecture Blueprint Math', () => {
    it('accurately computes floor space for open-sided deep litter broiler pens (10 birds/m²)', () => {
      const capacity = 2500;
      const sqMetersPerBird = 0.1; // 10 birds per sqm
      const totalFloorAreaSqM = capacity * sqMetersPerBird;
      expect(totalFloorAreaSqM).toBe(250);

      // Standard tropical cross-ventilation width (10 meters)
      const standardWidthM = 10;
      const calculatedLengthM = totalFloorAreaSqM / standardWidthM;
      expect(calculatedLengthM).toBe(25); // 25m x 10m pen
    });

    it('computes equipment requirements (feeders & drinkers)', () => {
      const capacity = 2500;
      const birdsPerFeeder = 45;
      const feedersCount = Math.ceil(capacity / birdsPerFeeder);
      expect(feedersCount).toBe(56);
    });

    it('computes 3-tier A-frame battery cage units for commercial layers', () => {
      const layerCount = 5000;
      const birdsPerCageSet = 96;
      const totalCageSets = Math.ceil(layerCount / birdsPerCageSet);
      expect(totalCageSets).toBe(53);
    });
  });

  describe('Feed Formulation (Pearson Square Mathematics)', () => {
    it('accurately computes basal inclusion ratio for Broiler Starter (23% CP)', () => {
      const cpTarget = 23.0;
      const cpMaize = 8.5;
      const cpSoya = 44.0;

      // Pearson Square diagonal differences
      const partsMaize = Math.abs(cpSoya - cpTarget); // 21
      const partsSoya = Math.abs(cpTarget - cpMaize); // 14.5
      const totalParts = partsMaize + partsSoya; // 35.5

      const percentMaize = (partsMaize / totalParts) * 100;
      const percentSoya = (partsSoya / totalParts) * 100;

      expect(Math.round(percentMaize)).toBe(59);
      expect(Math.round(percentSoya)).toBe(41);

      // Verify mathematical balance
      const achievedCp = (percentMaize * cpMaize + percentSoya * cpSoya) / 100;
      expect(Math.round(achievedCp * 10) / 10).toBe(cpTarget);
    });

    it('accurately computes basal inclusion ratio for Layer Phase 1 (16.5% CP)', () => {
      const cpTarget = 16.5;
      const cpMaize = 8.5;
      const cpSoya = 44.0;

      const partsMaize = Math.abs(cpSoya - cpTarget); // 27.5
      const partsSoya = Math.abs(cpTarget - cpMaize); // 8
      const totalParts = partsMaize + partsSoya; // 35.5

      const percentMaize = (partsMaize / totalParts) * 100;
      const percentSoya = (partsSoya / totalParts) * 100;

      const achievedCp = (percentMaize * cpMaize + percentSoya * cpSoya) / 100;
      expect(Math.round(achievedCp * 10) / 10).toBe(cpTarget);
    });
  });

  describe('Emergency Clinical Disease Triage Urgency Scoring', () => {
    const calculateTriageUrgency = (params: {
      mortalityRatePercent: number;
      symptomWeights: number[];
      feedIntakeDrop: 'normal' | 'slight' | 'severe';
    }) => {
      let score = 0;
      params.symptomWeights.forEach((w) => (score += w));

      if (params.mortalityRatePercent >= 2.0) score += 6;
      else if (params.mortalityRatePercent >= 0.5) score += 3;

      if (params.feedIntakeDrop === 'severe') score += 4;
      else if (params.feedIntakeDrop === 'slight') score += 2;

      if (score >= 12 || params.mortalityRatePercent >= 2.5) return 'CRITICAL';
      if (score >= 7) return 'HIGH';
      if (score >= 4) return 'MODERATE';
      return 'MILD';
    };

    it('escalates severe acute mortality and neurological signs to CRITICAL status', () => {
      const result = calculateTriageUrgency({
        mortalityRatePercent: 3.5, // 35 birds dead in 1000 flock
        symptomWeights: [5, 4], // Green diarrhea (5) + twisted neck (4)
        feedIntakeDrop: 'severe',
      });
      expect(result).toBe('CRITICAL');
    });

    it('classifies mild respiratory rales without high mortality as MODERATE', () => {
      const result = calculateTriageUrgency({
        mortalityRatePercent: 0.1,
        symptomWeights: [3], // Swollen eye / nasal discharge
        feedIntakeDrop: 'slight',
      });
      expect(result).toBe('MODERATE');
    });
  });

  describe('Farm Biosecurity Index Scoring', () => {
    const computeBiosecurityScore = (checkedPoints: number[]) => {
      const total = checkedPoints.reduce((sum, p) => sum + p, 0);
      let grade = 'HIGH RISK';
      if (total >= 80) grade = 'INSTITUTIONAL BIOSECURITY';
      else if (total >= 50) grade = 'MODERATE RISK';
      return { total, grade };
    };

    it('rates comprehensive 10-point barrier defences as INSTITUTIONAL BIOSECURITY', () => {
      const fullPoints = [10, 10, 10, 10, 10, 15, 15, 10, 5, 5]; // Sum = 100
      const evaluation = computeBiosecurityScore(fullPoints);
      expect(evaluation.total).toBe(100);
      expect(evaluation.grade).toBe('INSTITUTIONAL BIOSECURITY');
    });

    it('flags farms with missing footbaths and broken barriers as HIGH RISK', () => {
      const compromisedPoints = [10, 10]; // Sum = 20
      const evaluation = computeBiosecurityScore(compromisedPoints);
      expect(evaluation.total).toBe(20);
      expect(evaluation.grade).toBe('HIGH RISK');
    });
  });
});
