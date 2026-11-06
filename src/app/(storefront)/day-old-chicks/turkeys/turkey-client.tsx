'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  Truck,
  Phone,
  ChevronRight,
  Sparkles,
  Layers,
  Thermometer,
  XCircle,
  Users,
  Copy,
  Check,
  Zap,
  Scale,
  Award,
  AlertTriangle,
  Calculator,
  Info,
  Flame,
} from 'lucide-react';

interface StrainDetail {
  id: string;
  name: string;
  breeder: string;
  badge: string;
  cartonCount: number;
  cartonPriceEstimate: string;
  cartonPriceNumber: number;
  perBirdEstimate: string;
  targetHarvestWeight: string;
  targetWeightKg: number;
  maturityWeeks: string;
  starterProtein: string;
  livability: string;
  bestFor: string;
  description: string;
  strengths: string[];
}

const TURKEY_STRAINS: StrainDetail[] = [
  {
    id: 'foreign-nicholas',
    name: 'Foreign Nicholas White / Hybrid Converter',
    breeder: 'Nicholas Turkey Breeding Farms / Aviagen Turkeys (Direct Hatchery Quota)',
    badge: 'Heavy Commercial Exotic Lineage',
    cartonCount: 30,
    cartonPriceEstimate: '₦165,000 – ₦275,000',
    cartonPriceNumber: 210000,
    perBirdEstimate: '₦5,500 – ₦9,100',
    targetHarvestWeight: '10.5kg – 14.0kg (Toms) / 7.0kg – 9.0kg (Hens)',
    targetWeightKg: 11.8,
    maturityWeeks: '18 – 22 Weeks',
    starterProtein: '28% Crude Protein (Pre-Starter Crumble)',
    livability: '95.2% Commercial Livability',
    bestFor: 'Festive commercial fattening, hotel whole-carcass delivery, high-margin retail cuts, corporate festive gifts',
    description:
      'The gold standard heavy white turkey genetics globally. Broad-breasted conformational build with exceptional pectoral meat deposition. Packed strictly 30 poults per carton to maintain adequate respiratory airflow during interstate transit.',
    strengths: [
      'Massive 10.5kg to 14.0kg toms at 20–22 weeks',
      'Broad breast meat deposition with superior carcass dressing percentage (>78%)',
      'Rapid early bone elongation when started on 28% crude protein crumble',
      'High premium festive farmgate valuation (₦85,000 to ₦120,000 per mature tom)',
    ],
  },
  {
    id: 'local-bronze',
    name: 'Local & Hybrid Bronze Turkey',
    breeder: 'Certified Domestic Multiplication Centers (Acclimatized Tropics Line)',
    badge: 'Rugged Tropical Lineage',
    cartonCount: 40,
    cartonPriceEstimate: '₦120,000 – ₦175,000',
    cartonPriceNumber: 145000,
    perBirdEstimate: '₦3,000 – ₦4,375',
    targetHarvestWeight: '5.5kg – 7.5kg (Toms) / 4.0kg – 5.0kg (Hens)',
    targetWeightKg: 6.5,
    maturityWeeks: '22 – 26 Weeks',
    starterProtein: '24% – 26% Crude Protein',
    livability: '96.8% Tropical Livability',
    bestFor: 'Semi-intensive poultry setups, traditional live bird open markets, village and rural rearing, lower feed budgets',
    description:
      'Hardy, heat-adapted colored turkey lineage bred for resilience under harsh West African tropical conditions. Highly resistant to ambient heat stress and capable of foraging on supplementary greens alongside commercial mash rations.',
    strengths: [
      'Exceptional disease resistance and tolerance to tropical humidity',
      'Packed 40 poults per carton for economical logistics',
      'Flexible nutrition requirements (thrives on 24%–26% protein starter)',
      'Highly demanded in traditional Nigerian open-air live bird markets',
    ],
  },
];

interface ManagementPhase {
  phase: string;
  period: string;
  temperature: string;
  feedType: string;
  proteinPct: string;
  targetWeight: string;
  keyPractices: string;
  healthProtocols: string;
}

const TURKEY_PHASES: ManagementPhase[] = [
  {
    phase: 'Phase 1: Pre-Starter & Skeletal Foundation',
    period: 'Weeks 0 – 4 (Days 1–28)',
    temperature: '35°C – 37°C in Week 1, reduced by 2.5°C weekly',
    feedType: 'Turkey Pre-Starter Crumble',
    proteinPct: '28% Crude Protein (Mandatory)',
    targetWeight: '850g – 1,150g at 4 Weeks',
    keyPractices:
      'Maintain 35°C–37°C brooding heat without fail. Brood only on rough burlap sacks, coarse cardboard, or dry wood shavings to prevent spraddle legs. Provide 24-hour bright illumination for the first 3 days to assist poor poult vision.',
    healthProtocols:
      'Day 1–5: Oral glucose + anti-stress electrolytes + broad-spectrum water-soluble antibiotic. Day 7: Newcastle Disease (Hitchner B1). Day 14: Gumboro (IBD). Week 3: Coccidiosis prevention.',
  },
  {
    phase: 'Phase 2: Turkey Grower & Frame Expansion',
    period: 'Weeks 5 – 12 (Days 29–84)',
    temperature: 'Ambient Tropical (24°C – 28°C) with active cross-ventilation',
    feedType: 'Turkey Grower Mash or Pellets',
    proteinPct: '22% – 24% Crude Protein',
    targetWeight: '4.50kg – 6.20kg at 12 Weeks',
    keyPractices:
      'Transition poults into spacious, deep-litter grow-out pens with low perches. Turkeys drink 2.5× their feed intake; ensure uninterrupted cool, clean water. Maintain dry litter to prevent breast blisters and footpad dermatitis.',
    healthProtocols:
      'Week 6: Fowl Pox wing-web puncture vaccination. Week 8: Deworming with Piperazine/Levamisole. Week 10: Newcastle Komorov (booster) intramuscularly. Biosecurity against Blackhead (Histomoniasis).',
  },
  {
    phase: 'Phase 3: High-Energy Fattening & Festive Finishing',
    period: 'Weeks 13 – 22+ (Days 85–154)',
    temperature: 'Ambient pen temperature with sun-shading and roof sprinklers',
    feedType: 'Turkey Finisher Rations (High Energy)',
    proteinPct: '18% – 20% Crude Protein',
    targetWeight: '10.50kg – 14.00kg (Toms) at 20–22 Weeks',
    keyPractices:
      'Separate toms from hens to eliminate aggressive treading and injuries. Feed energy-dense rations rich in maize and oil cake to deposit juicy breast meat and yellow skin finish. Direct live weighing for festive buyers.',
    healthProtocols:
      'Enforce 14-day zero-antibiotic withdrawal period before festive slaughter. Supplement with vitamin C during hot afternoons. Deworm once more at Week 16.',
  },
];

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'What is the current day-old turkey poults price in Nigeria today?',
    a: 'Day-old turkey poult prices in Nigeria fluctuate depending on weekly parent-stock allocations from primary hatcheries and foreign exchange clearing. Foreign Nicholas White / Hybrid Converter poults (packed in cartons of 30) currently trade between ₦165,000 and ₦275,000 per carton (₦5,500 to ₦9,100 per poult). Local and hybrid bronze turkeys (packed in cartons of 40) range between ₦120,000 and ₦175,000 per carton (₦3,000 to ₦4,375 per poult). Because quotes update every Monday and Thursday, always message our booking desk for the confirmed day price before transferring funds.',
  },
  {
    q: 'Why are Foreign Turkey poults packed in 30s while Local Turkeys are packed in 40s?',
    a: 'Foreign broad-breasted Nicholas White poults have significantly larger bone frames and much higher metabolic oxygen consumption than chickens or local turkeys. International welfare and breeder transit protocols restrict ventilated cartons to 30 poults (quadrant-partitioned into 7–8 poults) to prevent overheating, suffocation, and transport mortality during long interstate journeys. Local bronze poults are smaller at hatch and can safely travel in 40-poult cartons.',
  },
  {
    q: 'What brooding temperature is mandatory for day-old turkey poults?',
    a: 'Turkey poults require a brooding temperature of 35°C to 37°C during Week 1 — approximately 3°C to 4°C warmer than day-old broiler chicks. Young poults have underdeveloped thermoregulation and will quickly chill, pile up into corners, and suffocate if the temperature drops below 33°C. Gradually reduce temperature by 2.5°C each week until birds are fully feathered by Week 5.',
  },
  {
    q: 'Why must turkey poults be fed 28% Crude Protein starter instead of broiler feed?',
    a: 'Turkeys develop massive pectoral muscle mass and heavy skeletal bone frames twice as rapidly as broilers relative to body frame. Standard broiler starter feed contains only 20% to 22% Crude Protein, which causes severe nutritional starvation, stunted growth, rickets, and slipped tendon syndrome (perosis) in turkeys. A specialized 28% CP Pre-Starter crumble is non-negotiable for the first 4 weeks.',
  },
  {
    q: 'What causes spraddle or splayed legs in young poults and how do I prevent it?',
    a: 'Spraddle leg occurs when day-old poults are brooded on smooth, slippery surfaces such as newspapers, slick plastic tarpaulins, or smooth cardboard. The poults cannot get traction, their delicate hip joints slip outward, and their leg tendons freeze permanently out of joint. Always brood poults on rough burlap sacks, coarse corrugated anti-skid carton paper, or deep dry wood shavings.',
  },
  {
    q: 'When should I stock turkey poults to target Christmas market sales?',
    a: 'Foreign Nicholas White toms take 18 to 22 weeks to achieve premium 11kg to 14kg live weights. To hit the peak December 15–25 Christmas market, you must stock your poults between late June and mid-July. Booking in September or October is too late for heavy toms and results in small 4kg to 5kg birds that must be sold at steep discounts.',
  },
  {
    q: 'What days are turkey poults dispatched nationwide?',
    a: 'Shipments depart verified partner hatcheries in Ibadan, Oyo, and Ogun State every Monday and Thursday morning. To secure your batch from the hatchery pull, orders and 50% reservation deposits must clear 48 hours prior to dispatch day.',
  },
  {
    q: 'How do I pay securely for my turkey reservation?',
    a: 'All official clearing payments are accepted strictly into our corporate bank account: Zenith Bank Plc, Account Number: 1017894562, Account Name: D-AminGrow Agric Ltd. We never accept payments into personal or individual agent accounts.',
  },
];

interface TurkeyLandingClientProps {
  nextMonday: string;
  nextThursday: string;
}

export default function TurkeyLandingClient({
  nextMonday,
  nextThursday,
}: TurkeyLandingClientProps) {
  const [selectedStrainId, setSelectedStrainId] = useState<string>('foreign-nicholas');
  const [activeTab, setActiveTab] = useState<'strains' | 'calculator' | 'timetable' | 'calendar'>('strains');

  // Calculator State
  const [cartonCount, setCartonCount] = useState<number>(3);
  const [targetSeason, setTargetSeason] = useState<'christmas' | 'easter' | 'bbq'>('christmas');
  const [customPricePerBird, setCustomPricePerBird] = useState<number>(90000);
  const [copiedBank, setCopiedBank] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeStrain: StrainDetail =
    TURKEY_STRAINS.find((s) => s.id === selectedStrainId) ?? TURKEY_STRAINS[0]!;

  // Calculator Calculations
  const totalPoultsStocked = cartonCount * activeStrain.cartonCount;
  const poultLivability = activeStrain.id === 'foreign-nicholas' ? 0.95 : 0.97;
  const survivingMatureBirds = Math.round(totalPoultsStocked * poultLivability);

  // Total Feed Requirement: ~38kg per foreign bird to 22 weeks, ~26kg per local bird
  const feedKgPerBird = activeStrain.id === 'foreign-nicholas' ? 38 : 26;
  const totalBatchFeedKg = survivingMatureBirds * feedKgPerBird;
  const totalFeedBags25kg = Math.ceil(totalBatchFeedKg / 25);
  const avgFeedBagCost = 21500; // estimated per 25kg quality feed
  const totalFeedExpense = totalFeedBags25kg * avgFeedBagCost;

  // Chick Investment
  const totalPoultCost = cartonCount * activeStrain.cartonPriceNumber;

  // Medication, Brooding & Overhead allowance (₦4,000 per bird)
  const overheadExpense = survivingMatureBirds * 4000;

  // Revenue & Profit
  const effectiveSellingPrice =
    activeStrain.id === 'foreign-nicholas' ? customPricePerBird : Math.round(customPricePerBird * 0.58);
  const grossRevenue = survivingMatureBirds * effectiveSellingPrice;
  const totalProductionCost = totalPoultCost + totalFeedExpense + overheadExpense;
  const netEstimatedProfit = grossRevenue - totalProductionCost;
  const profitMarginPercent = grossRevenue > 0 ? Math.round((netEstimatedProfit / grossRevenue) * 100) : 0;

  const copyBankDetails = () => {
    navigator.clipboard.writeText('1017894562');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello D-AminGrow Booking Desk, I would like to reserve ${cartonCount} carton(s) of ${activeStrain.name} (${totalPoultsStocked} poults) for the upcoming dispatch (${nextMonday} / ${nextThursday}). Please provide today's confirmed hatchery allocation rate and booking invoice.`
  );

  return (
    <div className="font-body text-slate-800 bg-white">
      {/* ====================================================================
          1. HERO SECTION — 2-Grid Columns matching Homepage Standards
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden min-h-[85vh] flex items-center bg-[#050E08] text-white">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <Link
              href="/day-old-chicks"
              className="hover:text-emerald-400 transition-colors"
            >
              Day-Old Chicks
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-emerald-400 font-semibold">Turkey Poults</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column (7 cols): Directives, Exact H1, Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-7 text-left">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Leading Agro-Allied Company in Nigeria · Certified Primary Turkey Lineages
                </div>
              </div>

              {/* Exact H1 Directive */}
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
                  Turkey Poults Price in Nigeria:{' '}
                  <span className="text-gradient-green">Foreign &amp; Local Day-Old Turkeys</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                  Protect your commercial turkey capital before dispatch. Certified Nicholas White foreign genetics capable of reaching 10.5kg to 14kg carcass weights, alongside hardy acclimatized local bronze poults. Direct parent-stock allocations, 35°C brooding protocols, and climate-buffered transit to every state.
                </p>
              </div>

              {/* Operating Slogan Pill */}
              <div>
                <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs">
                  <span className="text-slate-400 font-medium uppercase tracking-wider">Operating Creed</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 font-bold italic">&ldquo;Your satisfaction is our priority&rdquo;</span>
                </div>
              </div>

              {/* Action Zone matching homepage button style and 1st letter capitalized */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href={`https://wa.me/2348139169402?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Book Verified Turkey Poults On WhatsApp
                </a>
                <a
                  href="#pricing-calculator"
                  onClick={() => setActiveTab('calculator')}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
                >
                  <Calculator className="h-5 w-5" />
                  Simulate Festive Turkey Revenue &amp; Feed
                </a>
              </div>

              {/* Upcoming Dispatch Countdown Capsules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Next Monday Dispatch</div>
                    <div className="text-sm font-extrabold text-white font-heading">{nextMonday}</div>
                    <div className="text-[10px] text-emerald-400">Lock deposits by Saturday 12 PM</div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Next Thursday Dispatch</div>
                    <div className="text-sm font-extrabold text-white font-heading">{nextThursday}</div>
                    <div className="text-[10px] text-cyan-300">Lock deposits by Tuesday 5 PM</div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs text-slate-400 border-t border-white/10">
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>30 / 40 Carton Rule</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>35°C–37°C Brooding Heat</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>28% CP Pre-Starter Rule</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>36 States Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Visual Showcase Card with Live Telemetry Badges */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-b from-emerald-950/70 via-slate-950/80 to-black p-3 shadow-2xl backdrop-blur-md">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
                  <Image
                    src="/products/Chicks/Day old Turkey.jpeg"
                    alt="Turkey Poults Price in Nigeria — Foreign Nicholas White & Local Bronze"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Float Capsule 1 */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-emerald-500/30 rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#2ee571] animate-pulse" />
                    <span className="text-xs font-bold text-white tracking-wide">
                      Certified Primary Turkey Lineage
                    </span>
                  </div>

                  {/* Float Capsule 2 */}
                  <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2ee571]">
                        Commercial Meat Benchmark
                      </span>
                      <span className="text-[10px] text-emerald-300 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                        20–22 Wks Cycle
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px]">Harvest Tom Weight:</span>
                        <p className="font-black text-white text-sm">10.5kg – 14.0kg</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px]">Pre-Starter Protein:</span>
                        <p className="font-black text-white text-sm">28% Crude Protein</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom mini-metrics */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-1 text-center">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <div className="text-lg font-black text-white font-heading">30 / 40</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Standard Carton Rule</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <div className="text-lg font-black text-white font-heading">35°C–37°C</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Brooding Heat Standard</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <div className="text-lg font-black text-white font-heading">14kg Max</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Mature Tom Harvest</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Benchmarks Strip */}
          <div className="mt-14 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: '36 States', label: 'Nationwide Delivery Routes', sub: 'Synchronized Monday & Thursday dispatches' },
              { value: '35°C–37°C', label: 'Week 1 Brooding Standard', sub: 'Temperature guide included with every carton' },
              { value: '28% CP', label: 'Pre-Starter Nutrition Rule', sub: 'Builds dense skeletal frame & prevents perosis' },
              { value: 'VCN Advisory', label: 'Clinical Veterinary Guidance', sub: 'Biosecurity & disease prevention blueprints' },
            ].map((benchmark, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-200"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-1">
                  {benchmark.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-emerald-400 mb-0.5">
                  {benchmark.label}
                </div>
                <div className="text-[11px] text-slate-400">{benchmark.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. CAPITAL RISK PREVENTION: WHY NOVICE TURKEY FARMS FAIL IN WEEKS 1–4
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
              Capital Risk &amp; Mortality Prevention
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why Most Commercial Turkey Projects Fail in Weeks 1 to 4
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Turkeys are biologically distinct from chickens. When farmers treat day-old poults like standard broilers, mortality frequently exceeds 30% within 14 days. Understanding these 3 fatal early errors protects your entire capital investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Mistake 1 */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-5 group-hover:scale-105 transition-transform">
                <Thermometer className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-3">
                1. Brooding Heat Deficit (&lt;35°C) &amp; Smothering
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Broilers tolerate 32°C brooding, but day-old turkey poults have virtually no natural thermoregulation and require <strong className="text-slate-900">35°C to 37°C</strong> during Week 1. When temperatures dip below 33°C, poults stop eating, shiver, and frantically pile into pen corners, resulting in 20% to 35% suffocation mortality overnight.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Pre-heat brooding house 24 hrs before poult arrival.</span>
              </div>
            </div>

            {/* Mistake 2 */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-5 group-hover:scale-105 transition-transform">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-3">
                2. Feeding Low-Protein Broiler Feed (Bone Starvation)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Broiler starter contains 20%–22% Crude Protein. Turkeys grow massive bone frames twice as quickly and mandate <strong className="text-slate-900">28% Crude Protein</strong> for the first 4 weeks. Under-feeding protein starves bone mineralization, inducing rickets, dwarfism, and perosis (irreversible slipped Achilles tendon).
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Feed specialized 28% CP pre-starter crumble exclusively.</span>
              </div>
            </div>

            {/* Mistake 3 */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-5 group-hover:scale-105 transition-transform">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-3">
                3. Slippery Bedding &amp; Permanent Spraddle Legs
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Novice farmers brood poults on glossy printed newspapers, plastic sheets, or slick carton boards. Turkey poults have delicate foot joints; slick surfaces cause their legs to slip sideways permanently (spraddle leg syndrome). Splayed birds cannot reach feed trays and must be culled.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Brood strictly on coarse burlap or rough anti-skid paper.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. INTERACTIVE COMMERCIAL HUB (TABBED COMMAND CENTER)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200" id="pricing-calculator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              The Commercial Turkey Command Center
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Compare Turkey Genetics, Simulate ROI &amp; Access Rearing Blueprints
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Plan your entire festive or year-round production cycle with precision. Switch between our strain comparison matrix, interactive festive revenue calculator, 3-phase fattening protocol, and 20-week market timing calendar.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 max-w-full overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('strains')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'strains'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Scale className="h-4 w-4" />
                <span>Strains &amp; Harvest Matrix</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'calculator'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Calculator className="h-4 w-4" />
                <span>Festive ROI &amp; Feed Calculator</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('timetable')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'timetable'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>3-Phase Fattening Blueprint</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'calendar'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>20-Week Festive Calendar</span>
              </button>
            </div>
          </div>

          {/* TAB 1: STRAINS & HARVEST MATRIX */}
          {activeTab === 'strains' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {TURKEY_STRAINS.map((strain) => {
                  const isSelected = selectedStrainId === strain.id;
                  return (
                    <div
                      key={strain.id}
                      onClick={() => setSelectedStrainId(strain.id)}
                      className={`cursor-pointer rounded-3xl p-7 border-2 transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/20 shadow-xl'
                          : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span
                            className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {strain.badge}
                          </span>
                          <span className="text-xs font-bold text-slate-500">
                            {strain.cartonCount} Poults / Carton
                          </span>
                        </div>

                        <h3 className="text-2xl font-extrabold font-heading text-slate-900 mb-1">
                          {strain.name}
                        </h3>
                        <p className="text-xs text-slate-500 mb-4">{strain.breeder}</p>
                        <p className="text-sm text-slate-600 leading-relaxed mb-6">
                          {strain.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                          <div>
                            <span className="text-slate-500 text-[11px] block">Target Harvest Weight:</span>
                            <span className="font-bold text-slate-900 text-sm">{strain.targetHarvestWeight}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[11px] block">Maturity Window:</span>
                            <span className="font-bold text-slate-900 text-sm">{strain.maturityWeeks}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[11px] block">Starter Protein:</span>
                            <span className="font-bold text-emerald-700 text-sm">{strain.starterProtein}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[11px] block">Target Livability:</span>
                            <span className="font-bold text-emerald-700 text-sm">{strain.livability}</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                            Key Commercial Strengths:
                          </span>
                          {strain.strengths.map((str, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{str}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-slate-500 block">Estimated Carton Rate:</span>
                          <span className="text-base font-extrabold text-slate-900 font-heading">
                            {strain.cartonPriceEstimate}
                          </span>
                        </div>
                        <a
                          href={`https://wa.me/2348139169402?text=${encodeURIComponent(
                            `Hello D-AminGrow, I want to book ${strain.name} for the upcoming Monday/Thursday dispatch.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs shadow-sm transition-all"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Reserve Strain</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Practical Opinion Box */}
              <div className="rounded-3xl p-6 sm:p-7 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-bold font-heading text-white">
                    Our Practical Opinion on Turkey Strain Selection:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    If your farm targets corporate hampers, high-end festive buyers, or hotel carcass supply, <strong className="text-emerald-400">Foreign Nicholas White is mandatory</strong>. Nothing else produces 11kg–14kg toms at 20–22 weeks. However, if your brooding facility lacks automated gas heating or your local feeds lack 28% crude protein, choose <strong className="text-amber-300">Local Bronze turkeys</strong> to prevent leg collapse.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FESTIVE ROI & FEED CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="rounded-3xl bg-slate-900 text-white border border-slate-800 p-6 sm:p-10 shadow-2xl animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Controller (6 cols) */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 block mb-1">
                      Interactive Financial Modeler
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                      Commercial Turkey ROI &amp; Feed Forecaster
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      Estimate feed tonnage, brooding overheads, farmgate gross turnover, and net cash margins based on current Nigerian grain and festive livestock dynamics.
                    </p>
                  </div>

                  {/* Strain Select */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                      1. Select Turkey Genetic Strain:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {TURKEY_STRAINS.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedStrainId(s.id)}
                          className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-left border ${
                            selectedStrainId === s.id
                              ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-extrabold">{s.id === 'foreign-nicholas' ? 'Foreign Nicholas White' : 'Local / Bronze Hybrid'}</div>
                          <div className="text-[10px] opacity-80">{s.cartonCount} poults / carton</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Carton Quantity Stepper */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="font-semibold text-slate-300 uppercase tracking-wider">
                        2. Carton Stocking Volume:
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {totalPoultsStocked} Day-Old Poults
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-950 rounded-2xl border border-slate-800 p-2">
                      <button
                        type="button"
                        onClick={() => setCartonCount(Math.max(1, cartonCount - 1))}
                        className="w-12 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xl text-white transition-colors"
                        disabled={cartonCount <= 1}
                      >
                        -
                      </button>
                      <div className="text-center">
                        <span className="text-2xl font-black text-white font-heading">
                          {cartonCount} {cartonCount === 1 ? 'Carton' : 'Cartons'}
                        </span>
                        <p className="text-[11px] text-slate-400">
                          ({totalPoultsStocked} Chicks + Breeder Buffer)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCartonCount(cartonCount + 1)}
                        className="w-12 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xl text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Target Market Season */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                      3. Target Sales Festive Market:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'christmas' as const, label: 'Christmas Peak', price: 95000 },
                        { id: 'easter' as const, label: 'Easter Festival', price: 85000 },
                        { id: 'bbq' as const, label: 'Hotel / BBQ Routine', price: 75000 },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setTargetSeason(item.id);
                            setCustomPricePerBird(item.price);
                          }}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold text-center border transition-all ${
                            targetSeason === item.id
                              ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Per Bird Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="font-semibold text-slate-300 uppercase tracking-wider">
                        4. Projected Farmgate Sale Price / Mature Tom:
                      </span>
                      <span className="text-emerald-400 font-bold text-sm">
                        ₦{effectiveSellingPrice.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={activeStrain.id === 'foreign-nicholas' ? 70000 : 35000}
                      max={activeStrain.id === 'foreign-nicholas' ? 130000 : 70000}
                      step={2500}
                      value={effectiveSellingPrice}
                      onChange={(e) => setCustomPricePerBird(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>₦{activeStrain.id === 'foreign-nicholas' ? '70,000' : '35,000'} (Floor)</span>
                      <span>₦{activeStrain.id === 'foreign-nicholas' ? '130,000' : '70,000'} (Peak Festive)</span>
                    </div>
                  </div>
                </div>

                {/* Right Output Dashboard (6 cols) */}
                <div className="lg:col-span-6 rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-7 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                      Live Financial Forecast
                    </span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold">
                      {profitMarginPercent}% Net Margin
                    </span>
                  </div>

                  {/* Summary Big Numbers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                      <span className="text-[11px] text-slate-400 block mb-1">Gross Harvest Revenue:</span>
                      <span className="text-2xl sm:text-3xl font-black text-white font-heading">
                        ₦{grossRevenue.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-emerald-400 block mt-1">
                        From {survivingMatureBirds} mature harvested birds
                      </span>
                    </div>

                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                      <span className="text-[11px] text-slate-400 block mb-1">Estimated Net Profit:</span>
                      <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-heading">
                        ₦{netEstimatedProfit.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        After feeds, poults &amp; brooding
                      </span>
                    </div>
                  </div>

                  {/* Cost Breakdown Details */}
                  <div className="space-y-3 text-xs border-t border-slate-800 pt-4">
                    <div className="flex justify-between items-center py-1 border-b border-slate-900">
                      <span className="text-slate-400">Total Day-Old Poult Cost:</span>
                      <span className="font-bold text-white">₦{totalPoultCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-900">
                      <span className="text-slate-400">Commercial Feed Required:</span>
                      <span className="font-bold text-amber-400">
                        {totalFeedBags25kg} Bags (25kg) ~ {(totalBatchFeedKg / 1000).toFixed(2)} Tons
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-900">
                      <span className="text-slate-400">Estimated Total Feed Budget:</span>
                      <span className="font-bold text-white">₦{totalFeedExpense.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">Brooding, Charcoal, Meds &amp; Overhead:</span>
                      <span className="font-bold text-white">₦{overheadExpense.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* CTA button */}
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/2348139169402?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#25D366]/20 transition-all hover:scale-[1.01]"
                    >
                      <MessageCircle className="h-5 w-5 fill-current" />
                      <span>Lock Hatchery Quota on WhatsApp</span>
                    </a>
                    <p className="text-[11px] text-center text-slate-400 mt-3">
                      Dispatched nationwide every Monday &amp; Thursday directly from certified breeding lines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 3-PHASE FATTENING BLUEPRINT */}
          {activeTab === 'timetable' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TURKEY_PHASES.map((phase, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          {phase.period}
                        </span>
                        <span className="text-xs font-extrabold text-slate-400 font-heading">
                          Step 0{idx + 1}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">
                        {phase.phase}
                      </h3>

                      <div className="space-y-3 mb-5 text-xs">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-slate-500 block text-[11px]">Required Pen Temperature:</span>
                          <span className="font-bold text-slate-900">{phase.temperature}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-slate-500 block text-[11px]">Feed Formulation &amp; Protein:</span>
                          <span className="font-bold text-emerald-700">{phase.feedType} ({phase.proteinPct})</span>
                        </div>
                      </div>

                      <div className="space-y-3 text-xs text-slate-600 leading-relaxed mb-5">
                        <p>
                          <strong className="text-slate-900 block mb-1">Key Management Practice:</strong>
                          {phase.keyPractices}
                        </p>
                        <p>
                          <strong className="text-slate-900 block mb-1">Clinical Protocol &amp; Vaccines:</strong>
                          {phase.healthProtocols}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Target Live Weight:</span>
                      <span className="font-extrabold text-emerald-700 font-heading">{phase.targetWeight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: 20-WEEK FESTIVE CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Christmas Window */}
                <div className="rounded-3xl bg-slate-900 text-white border border-emerald-500/30 p-7 relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                    Highest Volume Peak
                  </div>
                  <h3 className="text-2xl font-extrabold font-heading text-white mb-2">
                    Christmas &amp; New Year Market
                  </h3>
                  <p className="text-xs text-emerald-400 font-semibold mb-5">
                    Target Sales Window: December 15 – December 31
                  </p>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs">Stocking Cutoff:</span>
                      <span className="font-bold text-white text-xs">Late June – Mid-July</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs">Rearing Duration:</span>
                      <span className="font-bold text-white text-xs">20 – 24 Weeks</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs">Target Live Weight:</span>
                      <span className="font-bold text-emerald-400 text-xs">11.0kg – 14.0kg Toms</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-6 leading-relaxed">
                    Corporate hampers, luxury catering, and family feasts push farmgate prices up to ₦90,000–₦120,000 per bird. Late August bookings will only produce small 5kg birds.
                  </p>
                </div>

                {/* Easter Window */}
                <div className="rounded-3xl bg-slate-900 text-white border border-slate-800 p-7 relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                    High Margin Window
                  </div>
                  <h3 className="text-2xl font-extrabold font-heading text-white mb-2">
                    Easter Festival Market
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold mb-5">
                    Target Sales Window: March – April (Varies Annually)
                  </p>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs">Stocking Cutoff:</span>
                      <span className="font-bold text-white text-xs">Late October – Early November</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs">Rearing Duration:</span>
                      <span className="font-bold text-white text-xs">18 – 20 Weeks</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs">Target Live Weight:</span>
                      <span className="font-bold text-amber-400 text-xs">9.5kg – 12.0kg Toms</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-6 leading-relaxed">
                    Conclusion of Lenten season drives intense demand for whole dressed turkeys across urban centers like Lagos, Abuja, and Port Harcourt.
                  </p>
                </div>

                {/* Year-Round Window */}
                <div className="rounded-3xl bg-slate-900 text-white border border-slate-800 p-7 relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-cyan-500/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30">
                    Stable Monthly Cashflow
                  </div>
                  <h3 className="text-2xl font-extrabold font-heading text-white mb-2">
                    Hotel &amp; Barbecue Supply
                  </h3>
                  <p className="text-xs text-cyan-400 font-semibold mb-5">
                    Target Sales Window: Continuous Monthly Contract Harvest
                  </p>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs">Stocking Cadence:</span>
                      <span className="font-bold text-white text-xs">Every 4 to 6 Weeks</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs">Harvest Weight:</span>
                      <span className="font-bold text-white text-xs">8.5kg – 10.5kg (16–18 Wks)</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs">Target Buyer:</span>
                      <span className="font-bold text-cyan-400 text-xs">Clubs, Hotels &amp; Smoked Meat Brands</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-6 leading-relaxed">
                    Staggering batches eliminates festive seasonality, providing your livestock enterprise with reliable month-on-month operational liquidity.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================
          4. UNIQUE INFORMATION GAIN (3 DEEP COMMERCIAL INSIGHTS)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="h-4 w-4 text-emerald-400" />
              Unique Information Gain
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              3 Critical Realities Behind Commercial Turkey Production in Nigeria
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Standard hatchery resellers omit the mechanical and biological differences between chickens and turkeys. Here are the three operational realities that determine your profitability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Information Gain 1 */}
            <div className="rounded-3xl bg-slate-950 border border-slate-800 p-8 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white">
                1. Why Foreign Poults Are Packed 30 Per Carton (Not 40 or 50)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Chickens and local turkeys ship in 40-to-50 bird cartons, but foreign Nicholas White poults have broad skulls, elongated leg spans, and massive metabolic heat production. Boxing more than 30 poults in tropical heat causes localized asphyxiation inside standard cartons. Certified hatcheries partition boxes into 4 separate quadrants of 7–8 birds to ensure unobstructed airflow during interstate haulage.
              </p>
            </div>

            {/* Information Gain 2 */}
            <div className="rounded-3xl bg-slate-950 border border-slate-800 p-8 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white">
                2. The 28% Crude Protein Pre-Starter Rule
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Many Nigerian farmers attempt to save feed costs by giving turkey poults standard 21% broiler starter. This is the single biggest cause of farm failure. Turkeys grow at an exponential biological velocity and will cannibalize their own bone mineral reserves without 28% CP. Feeding 28% pre-starter for the first 4 weeks guarantees sturdy hock joints that can support 12kg toms without collapsing.
              </p>
            </div>

            {/* Information Gain 3 */}
            <div className="rounded-3xl bg-slate-950 border border-slate-800 p-8 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white">
                3. The 20-Week Counting Rule (Timing Is 70% of Margin)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Broilers finish in 6 weeks, but commercial turkey toms require a disciplined 20 to 22 weeks of sustained feeding. Farmers who wait until August or September to brood turkeys for Christmas end up with 4.5kg–6.0kg birds that cannot command premium festive rates. To capture maximum ₦90,000+ corporate buyers, orders must be placed in June or early July.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. TRANSPARENT QUALIFICATION ("WE MAY NOT BE RIGHT FOR YOU IF...")
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm relative overflow-hidden">
            <div className="space-y-3 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block">
                Transparent Qualification
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                We May Not Be the Right Turkey Supplier for Your Farm If...
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We protect poultry capital by being completely transparent about commercial operating realities. Please read this before placing your reservation.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-slate-900 block mb-1">
                    You cannot pre-heat your brooding house to 35°C before delivery:
                  </strong>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    If you do not have charcoal pots, gas brooders, or infrared lamps ready to achieve 35°C–37°C prior to poult arrival, foreign turkeys will freeze, pile up, and smother. Defer booking until your heating equipment is fully installed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-slate-900 block mb-1">
                    You intend to feed standard 20% broiler starter feed:
                  </strong>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Foreign turkey genetics develop irreversible bone weakness and slipped tendon paralysis on low-protein broiler diets. If you cannot source 28% CP pre-starter, consider local bronze turkeys or commercial broilers instead.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-slate-900 block mb-1">
                    You expect walk-in stock without a 48-hour advance booking:
                  </strong>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Commercial day-old turkeys are hatched strictly to verified reservation quotas from primary breeding lines. We do not hold old or unsold live birds in depots. All dispatches clear strictly on Monday and Thursday mornings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-slate-900 block mb-1">
                    You require credit allocations or post-harvest payment:
                  </strong>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    All partner hatchery allocations clear directly through our official Zenith Bank corporate account prior to hatchery gate dispatch. We do not provide credit allotments under any circumstances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. VERIFIED COMMERCIAL FARMER RESULTS & REVIEWS
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Users className="h-4 w-4 text-emerald-600" />
              Verified Commercial Track Records
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Verified Commercial Turkey Farm Results Across Nigeria
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Read how serious livestock enterprise managers across Nigeria scaled their turkey fattening ventures with D-AminGrow certified hatchery allocations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Review 1 */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-7 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;I booked 4 cartons (120 foreign poults) in early July for our Christmas sales. D-AminGrow supplied the 35°C brooding chart and pre-starter feed formulation. We lost only 3 birds throughout the 21 weeks. The toms averaged 12.4kg live weight, and we sold out at ₦95,000 each before December 20th.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-slate-900 font-bold text-sm">Pastor David Okonkwo</p>
                <p className="text-xs text-slate-500">Grace Haven Agro-Ventures, Asaba, Delta State</p>
                <span className="inline-block mt-2 text-[11px] text-emerald-700 bg-emerald-100/70 font-semibold px-2.5 py-0.5 rounded-full">
                  Verified Nicholas White Producer · 4 Cartons
                </span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-7 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;Most hatcheries in Ibadan sell mixed local turkeys and claim they are foreign. D-AminGrow is honest. I ordered 3 cartons of Local Bronze turkeys for my semi-intensive farm. True to their word, zero spraddle legs, zero transit mortality. They grew vigorously on local grain mash.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-slate-900 font-bold text-sm">Alhaja Kudirat Adeleke</p>
                <p className="text-xs text-slate-500">Adeleke Poultry Enterprise, Iwo Road, Ibadan</p>
                <span className="inline-block mt-2 text-[11px] text-emerald-700 bg-emerald-100/70 font-semibold px-2.5 py-0.5 rounded-full">
                  Verified Local Bronze Farmer · 3 Cartons
                </span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-7 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;We supply barbecue grills and hotel kitchens in Abuja. D-AminGrow handles our rolling monthly allocations of 60 poults. The transit box packaging is proper ventilated standard, and the dispatch arrives early Thursday mornings without stress.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-slate-900 font-bold text-sm">Engr. Kenneth Uba</p>
                <p className="text-xs text-slate-500">Apex Livestock Farms, Karu, Nasarawa / Abuja</p>
                <span className="inline-block mt-2 text-[11px] text-emerald-700 bg-emerald-100/70 font-semibold px-2.5 py-0.5 rounded-full">
                  Verified Monthly Supplier · Abuja Route
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. SCHEMA-BACKED FAQ ACCORDION
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Info className="h-4 w-4 text-emerald-600" />
              Everything You Need to Know
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions About Day-Old Turkeys in Nigeria
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Clear answers on pricing, brooding heat management, feeding requirements, and nationwide logistics.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg hover:text-emerald-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-90 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. CLOSING SOFT CTA & OFFICIAL BANK PAYMENT VERIFICATION
          ==================================================================== */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-[#050E08] text-white">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-12 shadow-2xl space-y-8 backdrop-blur-md">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Authorized Hatchery Allocation Desk
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                Secure Your Monday or Thursday Hatchery Turkey Allocation
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Hatchery quotas fill rapidly 48 hours prior to pull days. Message our booking desk directly to lock your batch, verify current rates, and receive your official D-AminGrow allocation voucher.
              </p>
            </div>

            {/* Official Bank Account Verification Box */}
            <div className="max-w-xl mx-auto rounded-2xl bg-slate-950/90 border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Official Clearing Account (Nigeria)
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-semibold">
                  Zenith Bank Plc
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Account Name:</span>
                  <span className="font-bold text-white">D-AminGrow Agric Ltd</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-lg text-emerald-400">
                      1017894562
                    </span>
                    <button
                      type="button"
                      onClick={copyBankDetails}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
                      title="Copy account number"
                    >
                      {copiedBank ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Bank:</span>
                  <span className="text-slate-200">Zenith Bank Plc</span>
                </div>
              </div>

              <p className="text-[11px] text-amber-300/80 bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/20 leading-relaxed">
                Caution: D-AminGrow never requests payments to personal accounts. Verify all transactions against account number 1017894562 before payment confirmation.
              </p>
            </div>

            {/* Operating Slogan Pill */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs">
                <span className="text-slate-400 font-medium uppercase tracking-wider">Operating Creed</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-bold italic">&ldquo;Your satisfaction is our priority&rdquo;</span>
              </div>
            </div>

            {/* Bottom CTA Actions matching Homepage Button Style & 1st letter capitalized */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={`https://wa.me/2348139169402?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-base shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
                <span>Chat With Turkey Dispatcher</span>
              </a>

              <a
                href="tel:+2348139169402"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/15 hover:-translate-y-0.5 transition-all"
              >
                <Phone className="h-4 w-4 text-emerald-400" />
                <span>Call Hotline (+234 813 916 9402)</span>
              </a>
            </div>

            <p className="text-center text-xs text-slate-500 pt-2">
              D-AminGrow Agro-Allied Solution Center · Authorized Hatchery Allocation Distributor · Strictly Monday &amp; Thursday Dispatch.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
