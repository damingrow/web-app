/**
 * D-AminGrow Calibrated Poultry Vaccination Programs
 * Direct digitized clinical schedules from D-AminGrow Technical Veterinary Desk:
 * - "BROILER VACCINATION CHAT"
 * - "SUGGESTED VACCINATION PROGRAM FOR LAYERS (DAY ONE - 1ST PHASE IN LAYING)"
 */

export interface VaccinationScheduleEvent {
  id: string;
  dayAge: number;
  timeLabel: string;
  item: string;
  category: 'vaccine' | 'vitamin_support' | 'subcutaneous_injection' | 'wing_web';
  dosage: string;
  routeOfAdministration: string;
  clinicalInstructions: string;
  productLink?: string;
  requiresColdChain: boolean;
  importance: 'critical' | 'essential' | 'supportive';
}

export const BROILER_VACCINATION_PROGRAM: VaccinationScheduleEvent[] = [
  {
    id: 'broiler-day-1',
    dayAge: 1,
    timeLabel: 'DAY 1',
    item: 'Anti-Stress Multivitamin + Electrolytes',
    category: 'vitamin_support',
    dosage: '1g per 2L of water (or product label)',
    routeOfAdministration: 'Oral (Drinking Water)',
    clinicalInstructions:
      'Chicks arrive dehydrated from transit. Provide lukewarm water with Glucose and Vitamin C (Ascorbic Acid) 1 hour before feeding to rehydrate and replenish glycogen reserves.',
    productLink: '/drugs/ascorbic-acid-vitamin-c-anti-stress-powder',
    requiresColdChain: false,
    importance: 'essential',
  },
  {
    id: 'broiler-day-2',
    dayAge: 2,
    timeLabel: 'DAY 2',
    item: 'IB Multi + LaSota (1st Prime)',
    category: 'vaccine',
    dosage: '1 dose per chick',
    routeOfAdministration: 'Oral (Via Clean Water) / Eye Drop',
    clinicalInstructions:
      'Prime immunization against Infectious Bronchitis (IB) and Newcastle Disease (ND). Use 2g skimmed milk powder per litre to neutralize chlorine. Administer before 8:00 AM.',
    productLink: '/vaccines/newcastle-disease-vaccine-lasota-strain',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'broiler-day-3-6',
    dayAge: 3,
    timeLabel: 'DAY 3 – 6',
    item: 'Multivitamin & Trace Mineral Support',
    category: 'vitamin_support',
    dosage: 'Standard label dilution in clean water',
    routeOfAdministration: 'Oral (Drinking Water)',
    clinicalInstructions:
      'Supports early immune response after vaccine priming, promotes bone mineralization, and drives early feed conversion efficiency.',
    requiresColdChain: false,
    importance: 'supportive',
  },
  {
    id: 'broiler-day-9',
    dayAge: 9,
    timeLabel: 'DAY 9',
    item: 'IBD+ (Infectious Bursal Disease / Gumboro 1st Dose)',
    category: 'vaccine',
    dosage: '1 dose per bird',
    routeOfAdministration: 'Oral (Via Unchlorinated Water)',
    clinicalInstructions:
      'Intermediate Plus (IBD+) live vaccine to break through residual maternal antibodies common in Nigerian poultry corridors. Withhold drinking water for 1.5–2 hours prior.',
    productLink: '/vaccines/infectious-bursal-disease-gumboro-vaccine',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'broiler-day-10-11',
    dayAge: 10,
    timeLabel: 'DAY 10 – 11',
    item: 'Post-IBD Anti-Stress Vitamin Support',
    category: 'vitamin_support',
    dosage: 'Per label specification in clean water',
    routeOfAdministration: 'Oral (Drinking Water)',
    clinicalInstructions:
      'Gumboro live vaccines target the Bursa of Fabricius and induce mild febrile reaction. Supplement with Vitamin C to prevent drop in feed intake.',
    productLink: '/drugs/ascorbic-acid-vitamin-c-anti-stress-powder',
    requiresColdChain: false,
    importance: 'essential',
  },
  {
    id: 'broiler-day-13',
    dayAge: 13,
    timeLabel: 'DAY 13',
    item: 'IB Multi + LaSota (Booster)',
    category: 'vaccine',
    dosage: '1 dose per bird',
    routeOfAdministration: 'Oral (Via Drinking Water)',
    clinicalInstructions:
      'Newcastle and Infectious Bronchitis booster to elevate circulating antibody titers during the rapid growth phase. Ensure consumed within 90 minutes.',
    productLink: '/vaccines/newcastle-disease-vaccine-lasota-strain',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'broiler-day-14-15',
    dayAge: 14,
    timeLabel: 'DAY 14 – 15',
    item: 'Multivitamin Recovery Therapy',
    category: 'vitamin_support',
    dosage: 'Per label recommendation',
    routeOfAdministration: 'Oral (Drinking Water)',
    clinicalInstructions:
      'Stabilizes metabolic rate and supports feed absorption as birds transition into heavier grower feed formulation.',
    requiresColdChain: false,
    importance: 'supportive',
  },
  {
    id: 'broiler-day-16',
    dayAge: 16,
    timeLabel: 'DAY 16',
    item: 'IBD+ (Gumboro 2nd Booster Dose)',
    category: 'vaccine',
    dosage: '1 dose per bird',
    routeOfAdministration: 'Oral (Via Clean Water)',
    clinicalInstructions:
      'Critical 2nd dose to guarantee 100% humoral seroconversion against virulent field strains of Gumboro before birds reach maximum flock density.',
    productLink: '/vaccines/infectious-bursal-disease-gumboro-vaccine',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'broiler-day-17-19',
    dayAge: 17,
    timeLabel: 'DAY 17 – 19',
    item: 'Post-Vaccination Vitamins & Electrolytes',
    category: 'vitamin_support',
    dosage: 'Daily morning administration',
    routeOfAdministration: 'Oral (Drinking Water)',
    clinicalInstructions:
      'Consolidates immune defense and concludes the intense brooding vaccination phase. Prepare for Finisher feed management.',
    requiresColdChain: false,
    importance: 'essential',
  },
];

export const LAYER_VACCINATION_PROGRAM: VaccinationScheduleEvent[] = [
  {
    id: 'layer-day-1-marek',
    dayAge: 1,
    timeLabel: 'DAY 1 (Hatchery)',
    item: "Marek's Disease Vaccine (HVT)",
    category: 'subcutaneous_injection',
    dosage: '0.2ml per chick',
    routeOfAdministration: 'Subcutaneous injection at hatchery',
    clinicalInstructions:
      'Administered at the certified hatchery (subcutaneous neck injection) immediately upon hatch. Confirmed by D-AminGrow upon dispatch.',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'layer-day-1-ib',
    dayAge: 1,
    timeLabel: 'DAY 1 (Arrival)',
    item: 'IB Multi (Infectious Bronchitis)',
    category: 'vaccine',
    dosage: '1 dose per chick',
    routeOfAdministration: 'Oral (Via Drinking Water) or Coarse Spray',
    clinicalInstructions:
      'Priming respiratory mucosal immunity upon arrival in pen. Add skimmed milk powder (2g/L) to prevent disinfectant viral kill.',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'layer-day-2',
    dayAge: 2,
    timeLabel: 'DAY 2',
    item: 'ND LaSota (Newcastle Disease Prime)',
    category: 'vaccine',
    dosage: '1 dose per chick',
    routeOfAdministration: 'Oral (Via Water) or Eye Drop',
    clinicalInstructions:
      'Newcastle prime immunization. Eye-drop is ideal for small flocks; drinking water with skimmed milk powder for commercial scale.',
    productLink: '/vaccines/newcastle-disease-vaccine-lasota-strain',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'layer-day-3',
    dayAge: 3,
    timeLabel: 'DAY 3',
    item: 'Multivitamin & Amino Acid Complex',
    category: 'vitamin_support',
    dosage: 'Per label dilution in clean water',
    routeOfAdministration: 'Oral (Via Water)',
    clinicalInstructions:
      'Provides physiological support to chick liver and kidneys following initial vaccine processing.',
    requiresColdChain: false,
    importance: 'supportive',
  },
  {
    id: 'layer-day-9',
    dayAge: 9,
    timeLabel: 'DAY 9',
    item: 'IBD+ 1st Dose (Gumboro Intermediate Plus)',
    category: 'vaccine',
    dosage: '1 dose per chick',
    routeOfAdministration: 'Oral (Via Water)',
    clinicalInstructions:
      'Primary Gumboro immunization. Withhold water for 1.5 to 2 hours before administration so birds drink eagerly.',
    productLink: '/vaccines/infectious-bursal-disease-gumboro-vaccine',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'layer-day-10-11',
    dayAge: 10,
    timeLabel: 'DAY 10 – 11',
    item: 'Multivitamin Anti-Stress Therapy',
    category: 'vitamin_support',
    dosage: '2 consecutive days in fresh water',
    routeOfAdministration: 'Oral (Via Water)',
    clinicalInstructions:
      'Mitigates febrile stress from Intermediate Plus live viral replication in the bursa.',
    productLink: '/drugs/ascorbic-acid-vitamin-c-anti-stress-powder',
    requiresColdChain: false,
    importance: 'essential',
  },
  {
    id: 'layer-day-14',
    dayAge: 14,
    timeLabel: 'DAY 14',
    item: 'ND LaSota (Newcastle Booster)',
    category: 'vaccine',
    dosage: '1 dose per bird',
    routeOfAdministration: 'Oral (Via Water)',
    clinicalInstructions:
      'Booster to maintain active humoral titers against velogenic Newcastle strains endemic in tropical regions.',
    productLink: '/vaccines/newcastle-disease-vaccine-lasota-strain',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'layer-day-15-16',
    dayAge: 15,
    timeLabel: 'DAY 15 – 16',
    item: 'Multivitamin Support',
    category: 'vitamin_support',
    dosage: 'Standard label rate',
    routeOfAdministration: 'Oral (Via Water)',
    clinicalInstructions:
      'Replenishes micronutrients and maintains optimal gut villi health for upcoming feed changes.',
    requiresColdChain: false,
    importance: 'supportive',
  },
  {
    id: 'layer-day-17',
    dayAge: 17,
    timeLabel: 'DAY 17',
    item: 'IBD+ 2nd Dose (Gumboro Booster)',
    category: 'vaccine',
    dosage: '1 dose per bird',
    routeOfAdministration: 'Oral (Via Water)',
    clinicalInstructions:
      'Reinforces bursal protection to establish solid lifetime flock immunity before cage or open pen transfer.',
    productLink: '/vaccines/infectious-bursal-disease-gumboro-vaccine',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'layer-day-28',
    dayAge: 28,
    timeLabel: 'DAY 28 (Week 4)',
    item: 'Salmonella Vaccine (1st Dose)',
    category: 'subcutaneous_injection',
    dosage: '0.5ml per bird',
    routeOfAdministration: 'Subcutaneous (injection at back of the neck)',
    clinicalInstructions:
      'Crucial bacterial defense against Salmonella Gallinarum (Fowl Typhoid) and Salmonella Enteritidis. Administer using sterile 18G/20G needles.',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'layer-day-35',
    dayAge: 35,
    timeLabel: 'DAY 35 (Week 5)',
    item: 'ND LaSota (Newcastle 3rd Round)',
    category: 'vaccine',
    dosage: '1 dose per bird',
    routeOfAdministration: 'Oral (Via Water)',
    clinicalInstructions:
      'Sustains protective antibody levels as pullet body mass doubles during grower phase.',
    productLink: '/vaccines/newcastle-disease-vaccine-lasota-strain',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'layer-week-6',
    dayAge: 42,
    timeLabel: 'WEEK 6',
    item: 'Fowl Pox Vaccine (Live)',
    category: 'wing_web',
    dosage: '1 stab per bird',
    routeOfAdministration: 'Wing-web puncture with double-grooved needle',
    clinicalInstructions:
      'Wing-web stab avoiding blood vessels, bones, and feathers. Check 50 birds 7–10 days post-vaccination for small nodular "takes" confirming successful uptake.',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'layer-week-7',
    dayAge: 49,
    timeLabel: 'WEEK 7',
    item: 'IB Multi (Infectious Bronchitis Grower Booster)',
    category: 'vaccine',
    dosage: '1 dose per bird',
    routeOfAdministration: 'Oral (Via Water)',
    clinicalInstructions:
      'Protects the developing reproductive oviduct from early IB variant strains that cause deformed eggs and watery whites in adult life.',
    requiresColdChain: true,
    importance: 'essential',
  },
  {
    id: 'layer-week-9',
    dayAge: 63,
    timeLabel: 'WEEK 9',
    item: 'Salmonella Vaccine (2nd Dose)',
    category: 'subcutaneous_injection',
    dosage: '0.5ml per bird',
    routeOfAdministration: 'Subcutaneous (injection at back of the neck)',
    clinicalInstructions:
      'Booster injection providing long-term cellular and humoral immunity against Fowl Typhoid through peak production.',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'layer-week-12',
    dayAge: 84,
    timeLabel: 'WEEK 12',
    item: 'ND LaSota (Pre-Lay Maintenance)',
    category: 'vaccine',
    dosage: '1 dose per bird',
    routeOfAdministration: 'Oral (Via Water)',
    clinicalInstructions:
      'Maintains baseline ND immunity during late grower phase prior to battery cage transfer.',
    productLink: '/vaccines/newcastle-disease-vaccine-lasota-strain',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'layer-week-14',
    dayAge: 98,
    timeLabel: 'WEEK 14',
    item: 'IB Multi (Pre-Lay Reproductive Protection)',
    category: 'vaccine',
    dosage: '1 dose per bird',
    routeOfAdministration: 'Oral (Via Water)',
    clinicalInstructions:
      'Ensures respiratory and oviductal epithelial protection as pullets begin ovarian development.',
    requiresColdChain: true,
    importance: 'essential',
  },
  {
    id: 'layer-week-15',
    dayAge: 105,
    timeLabel: 'WEEK 15 (Point-of-Lay)',
    item: 'ND + IB + EDS (Inactivated 3-in-1 Oil Vaccine)',
    category: 'subcutaneous_injection',
    dosage: '0.5ml per bird',
    routeOfAdministration: 'Subcutaneous or Intramuscular (Breast Muscle)',
    clinicalInstructions:
      'Cornerstone inactivated vaccine protecting commercial layers against Newcastle, Infectious Bronchitis, and Egg Drop Syndrome 76 (EDS) throughout 52+ weeks of lay.',
    requiresColdChain: true,
    importance: 'critical',
  },
  {
    id: 'layer-week-22',
    dayAge: 154,
    timeLabel: 'WEEK 22 (In-Lay)',
    item: 'IB Multi (Peak Lay Reinforcement)',
    category: 'vaccine',
    dosage: '1 dose per bird',
    routeOfAdministration: 'Oral (Via Water)',
    clinicalInstructions:
      'Administered at peak lay (90%+ egg production). Clinical NB: IB Multi can be repeated every 7 weeks in lay, and LaSota every 6 weeks throughout the laying cycle.',
    requiresColdChain: true,
    importance: 'essential',
  },
];

export interface CalculatedVaccineEntry extends VaccinationScheduleEvent {
  calendarDate: string;
  weekday: string;
  isPast: boolean;
  isToday: boolean;
}

/**
 * Calculates calendar dates for every step in the vaccination program based on arrival date.
 */
export function calculateVaccinationCalendar(
  flockType: 'broiler' | 'layer',
  placementDateString: string
): CalculatedVaccineEntry[] {
  const baseDate = new Date(placementDateString);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const schedule =
    flockType === 'broiler' ? BROILER_VACCINATION_PROGRAM : LAYER_VACCINATION_PROGRAM;

  return schedule.map((ev) => {
    const entryDate = new Date(baseDate);
    entryDate.setDate(baseDate.getDate() + (ev.dayAge - 1));
    entryDate.setHours(0, 0, 0, 0);

    const isToday = entryDate.getTime() === now.getTime();
    const isPast = entryDate.getTime() < now.getTime();

    const weekday = entryDate.toLocaleDateString('en-GB', { weekday: 'short' });
    const calendarDate = entryDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return {
      ...ev,
      calendarDate,
      weekday,
      isPast,
      isToday,
    };
  });
}
