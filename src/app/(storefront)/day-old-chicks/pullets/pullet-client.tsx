'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  MessageCircle,
  Feather,
  ChevronRight,
  Clock,
  Sparkles,
  Layers,
  Thermometer,
  XCircle,
  Copy,
  Check,
  TrendingUp,
  Scale,
  Award,
  AlertTriangle,
  Egg,
  Calculator,
  HelpCircle,
} from 'lucide-react';

interface StrainDetail {
  id: string;
  name: string;
  breeder: string;
  badge: string;
  peakLayRate: string;
  eggPotential: string;
  firstEggAge: string;
  feedAtPeak: string;
  eggShellQuality: string;
  cartonPriceEstimate: string;
  perBirdEstimate: string;
  bestFor: string;
  description: string;
  strengths: string[];
}

const LAYER_STRAINS: StrainDetail[] = [
  {
    id: 'isa-brown',
    name: 'ISA Brown Commercial Layer',
    breeder: 'Zartech / Amo Certified Primary Stock',
    badge: 'Global #1 Brown Egg Lineage',
    peakLayRate: '94% – 96%',
    eggPotential: '315 – 325 Eggs / Hen (to 72 wks)',
    firstEggAge: 'Week 18 – Week 19',
    feedAtPeak: '110g – 114g / hen / day',
    eggShellQuality: 'Rich Dark Brown with Thick Shell Membrane',
    cartonPriceEstimate: '₦125,000 – ₦145,000',
    perBirdEstimate: '₦2,500 – ₦2,900',
    bestFor: 'High-density commercial battery cages and deep-litter layer operations targeting maximum marketable crates.',
    description:
      'The benchmark brown egg layer worldwide. Renowned for fast sexual maturation, early peak attainment at week 26, docile temperament in cages, and extraordinary persistence above 85% lay through 65+ weeks.',
    strengths: [
      'Documented capability of 320+ marketable table eggs per hen housed',
      'Exceptional eggshell thickness, dramatically reducing transport cracking',
      'Calm pen temperament reducing feather-pecking and social stress',
      'Proven tropical climate adaptation under standard Nigerian pen ventilation',
    ],
  },
  {
    id: 'hy-line-brown',
    name: 'Hy-Line Brown Commercial Layer',
    breeder: 'Chi Farms / Hybrid Primary Allotment',
    badge: 'Maximum Feed-to-Egg Efficiency',
    peakLayRate: '93% – 95%',
    eggPotential: '310 – 320 Eggs / Hen (to 72 wks)',
    firstEggAge: 'Week 18 – Week 20',
    feedAtPeak: '106g – 112g / hen / day',
    eggShellQuality: 'Uniform Medium-Dark Brown Shell',
    cartonPriceEstimate: '₦120,000 – ₦140,000',
    perBirdEstimate: '₦2,400 – ₦2,800',
    bestFor: 'Operations prioritizing lowest feed consumption per crate of eggs and resilience during hot dry seasons.',
    description:
      'Recognized for exceptional feed efficiency, eating 4g–8g less feed per day than competitors while sustaining heavy egg production. Highly resilient appetite in high heat conditions common in Northern and Western Nigeria.',
    strengths: [
      'Lowest daily feed consumption per dozen eggs produced',
      'Superb livability during peak summer heat waves in tropical pens',
      'Strong internal egg quality with high Haugh unit ratings',
      'Excellent feather cover retention past 60 weeks of continuous lay',
    ],
  },
  {
    id: 'zartech-brown',
    name: 'Zartech Commercial Brown Layer',
    breeder: 'Zartech Hatchery Direct Allocation',
    badge: 'Nigerian Field-Tested Longevity',
    peakLayRate: '92% – 95%',
    eggPotential: '305 – 318 Eggs / Hen (to 72 wks)',
    firstEggAge: 'Week 19 – Week 20',
    feedAtPeak: '112g – 116g / hen / day',
    eggShellQuality: 'Firm Brown Shell with High Crushing Strength',
    cartonPriceEstimate: '₦120,000 – ₦140,000',
    perBirdEstimate: '₦2,400 – ₦2,800',
    bestFor: 'Commercial egg producers seeking dependable parent genetics acclimated to local feed raw materials and water conditions.',
    description:
      'A long-standing favorite of Nigerian commercial poultry farmers. Reared for rugged bone frame strength, low prolapse rates at point of lay, and dependable recovery following routine disease challenges.',
    strengths: [
      'Sturdy skeletal development minimizing cage-layer fatigue',
      'Consistent large-grade egg sizing from week 28 onward',
      'High tolerance to local grain-based feed formulations',
      'Guaranteed direct Zartech primary hatchery booking logs',
    ],
  },
  {
    id: 'black-shaver',
    name: 'Black Shaver / Bovan Brown',
    breeder: 'Amo / Independent Certified Hatchery',
    badge: 'Dual-Hardiness & Rustic Vigor',
    peakLayRate: '90% – 93%',
    eggPotential: '295 – 310 Eggs / Hen (to 72 wks)',
    firstEggAge: 'Week 19 – Week 21',
    feedAtPeak: '115g – 120g / hen / day',
    eggShellQuality: 'Speckled & Deep Brown Shell',
    cartonPriceEstimate: '₦110,000 – ₦135,000',
    perBirdEstimate: '₦2,200 – ₦2,700',
    bestFor: 'Semi-intensive pens, open-sided deep litter systems, and farmers planning premium spent-hen meat salvage at lay end.',
    description:
      'Bred with slightly heavier body conformation. Delivers reliable daily egg output while retaining higher final body weight (2.1kg–2.4kg), commanding significantly higher live-bird salvage prices when culled at 75 weeks.',
    strengths: [
      'Superior spent-hen meat salvage value at end of laying cycle',
      'Rugged immune vigor and high tolerance to rustic management',
      'Deep brown shell pigment favored in local open markets',
      'Reduced susceptibility to draft stress in simple poultry houses',
    ],
  },
];

interface TimetablePhase {
  phase: string;
  weeks: string;
  targetWeight: string;
  lightingHours: string;
  feedType: string;
  focus: string;
  vaccines: string;
}

const TIMETABLE_PHASES: TimetablePhase[] = [
  {
    phase: 'Phase 1: Brooding & Early Skeletal Framing',
    weeks: 'Weeks 0 – 5',
    targetWeight: '380g – 420g by Week 5',
    lightingHours: '24 hrs (Day 1-3) tapering to 12 hrs',
    feedType: 'Chick Starter Mash / Crumble (20% – 21% CP)',
    focus: 'Shank length and gut development. 80% of skeletal bone framework is established by Week 5.',
    vaccines: 'Day 1: Marek’s (Hatchery) · Day 7: ND Hitchner/Lasota · Day 12: Gumboro (IBD) · Day 21: Gumboro 2 · Day 28: Lasota 2',
  },
  {
    phase: 'Phase 2: Skeletal Growth & Uniformity',
    weeks: 'Weeks 6 – 12',
    targetWeight: '950g – 1,050g by Week 12',
    lightingHours: 'Natural light only (11 – 12 hrs, constant)',
    feedType: 'Grower Mash (15% – 16% CP, High Fiber)',
    focus: 'Uniformity control (aim for >85% flock uniformity). Prevent early obesity and avoid premature lighting stimulation.',
    vaccines: 'Week 6: Fowl Pox (Wing Web) · Week 8: Fowl Typhoid · Week 9: Newcastle Komarov · Week 10: Deworming',
  },
  {
    phase: 'Phase 3: Pre-Lay Sexual Maturation',
    weeks: 'Weeks 13 – 17',
    targetWeight: '1,350g – 1,450g by Week 17',
    lightingHours: 'Increase by 30 mins weekly starting Week 16 toward 15-16 hrs',
    feedType: 'Developer Mash → Pre-Lay Mash (2.5% Calcium at Wk 16)',
    focus: 'Medullary bone calcium storage. Transfer to cages or laying pens at Week 14 to allow adjustment before first egg.',
    vaccines: 'Week 14: ND Oil Inactivated (Injectable Subcutaneous) · Week 16: Infectious Bronchitis booster',
  },
  {
    phase: 'Phase 4: Point-of-Lay & Peak Production',
    weeks: 'Weeks 18 – 72+',
    targetWeight: '1,750g – 1,900g at Peak Lay',
    lightingHours: '16 hours constant light (natural + artificial)',
    feedType: 'Layer Phase 1 Mash (17.5% CP, 3.8% – 4.2% Calcium)',
    focus: 'Reach 94%–96% peak between Week 26 and Week 30. Maintain fresh water, adequate calcium grit, and strict biosecurity.',
    vaccines: 'ND Lasota booster via drinking water every 6–8 weeks throughout laying cycle · Periodic stress electrolytes',
  },
];

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'What is the current day-old pullets price in Nigeria today?',
    a: 'Day-old pullet prices in Nigeria fluctuate weekly based on parent-stock availability, commercial grain prices, and seasonal booking cycles. Currently, commercial layer pullets (ISA Brown, Zartech Brown, and Hy-Line Brown) trade between ₦2,200 and ₦3,000 per chick, which works out to ₦110,000 to ₦150,000 per carton of 50 pullets (+1 bonus chick). Because hatcheries adjust quotes every Monday and Thursday, message the D-AminGrow booking desk on WhatsApp for today’s confirmed clearing rate before transferring deposits.',
  },
  {
    q: 'What is the guaranteed sexing accuracy for commercial day-old pullets?',
    a: 'All commercial day-old pullets supplied by D-AminGrow are professionally vent-sexed or feather-sexed by trained hatchery specialists at Zartech, Amo, Chi, and Supreme primary breeding centers. We guarantee a minimum of 98% female sexing accuracy per carton of 50 pullets. This protects your farm from wasting costly layer mash rearing unwanted cockerels.',
  },
  {
    q: 'Why should I never buy uncertified day-old pullets from open-market aggregators?',
    a: 'Unlike broilers that finish in 6 weeks, pullets represent a 72-week capital investment. Open-market aggregators frequently sell culled cockerels disguised as pullets, or chicks from spent parent-stock that look healthy on Day 1 but plateau at only 65%–70% peak lay instead of 94%+. Feeding a low-producing hen for 18 months generates a compounding loss of over ₦15,000 per bird in missed egg revenue.',
  },
  {
    q: 'At what age will these pullets drop their first egg and hit peak production?',
    a: 'When managed according to standard target weights and lighting schedules, commercial brown pullets drop their first table eggs (point of lay) between Week 18 and Week 20. Peak lay production of 94%–96% is typically attained between Week 26 and Week 30, persisting above 85% lay for 45 to 55 weeks under proper nutritional and biosecurity management.',
  },
  {
    q: 'How does the 50+1 packaging standard protect my farm capital?',
    a: 'All certified hatcheries in Nigeria package commercial layer pullets in well-ventilated partitioned cardboard cartons containing 50 chicks plus 1 free bonus chick (total of 51 chicks per carton). This 50+1 packaging rule acts as a transport mortality buffer, ensuring your stocked pen starts with 100% of your paid bird allotment even if a transit drop-off occurs.',
  },
  {
    q: 'What are the official booking cutoff days and nationwide dispatch schedules?',
    a: 'D-AminGrow operates synchronized nationwide dispatches every Monday and Thursday morning. For Monday dispatches, confirmed 50% deposits must clear by Saturday 12:00 PM. For Thursday dispatches, deposits must clear by Tuesday 5:00 PM. Chicks depart directly from primary hatchery loading bays via registered climate-monitored interstate transit to designated collection depots in all 36 states and the FCT.',
  },
];

interface PulletClientProps {
  nextMonday: string;
  nextThursday: string;
}

export default function PulletLandingClient({ nextMonday, nextThursday }: PulletClientProps) {
  const [selectedStrain, setSelectedStrain] = useState<string>('isa-brown');
  const [activeTab, setActiveTab] = useState<'strains' | 'calculator' | 'timetable' | 'framework'>('strains');

  // Calculator State
  const [flockSize, setFlockSize] = useState<number>(1000);
  const [cratePrice, setCratePrice] = useState<number>(3800);
  const [chickPrice, setChickPrice] = useState<number>(2600);

  // Calculations
  const peakProductionPercent = 0.94; // 94% peak lay
  const dailyEggsAtPeak = Math.round(flockSize * peakProductionPercent);
  const dailyCratesAtPeak = (dailyEggsAtPeak / 30).toFixed(1);
  const dailyRevenue = Math.round(parseFloat(dailyCratesAtPeak) * cratePrice);
  const monthlyRevenue = dailyRevenue * 30;
  const cartonsNeeded = Math.ceil(flockSize / 50);
  const totalChickInvestment = cartonsNeeded * (chickPrice * 50);
  const dailyFeedKgAtPeak = Math.round((flockSize * 0.112)); // 112g per bird
  const dailyFeedBags = (dailyFeedKgAtPeak / 25).toFixed(1); // 25kg layer mash bag

  const [copiedBank, setCopiedBank] = useState<boolean>(false);
  const handleCopyBank = () => {
    navigator.clipboard.writeText('1017894562');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const currentStrain: StrainDetail = LAYER_STRAINS.find((s) => s.id === selectedStrain) ?? LAYER_STRAINS[0]!;

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
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <Link href="/day-old-chicks" className="hover:text-emerald-400 transition-colors">Day-Old Chicks</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-emerald-400 font-semibold">Commercial Pullets (Layers)</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left Column (7 cols): Directives, H1, Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-7 text-left">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Leading Agro-Allied Company in Nigeria · Certified Layer Genetics
                </div>
              </div>

              {/* Exact H1 Directive */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                  Day-Old Pullets Price in Nigeria:{' '}
                  <span className="text-gradient-green">Commercial Layer Chicks (ISA &amp; Hy-Line)</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                  Direct parent-stock bookings from Zartech, Amo, Chi &amp; Supreme hatcheries. Documented 310–325 eggs per hen potential, 94%–96% peak lay efficiency, and 98%+ guaranteed female vent-sexing accuracy dispatched nationwide every Monday &amp; Thursday.
                </p>
              </div>

              {/* Brand Operating Slogan */}
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
                  href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20confirm%20today's%20Day-Old%20Pullets%20price%20and%20book%20a%20commercial%20layer%20allotment.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Book Verified Day-Old Pullets On WhatsApp
                </a>
                <a
                  href="#calculator"
                  onClick={() => setActiveTab('calculator')}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
                >
                  <Calculator className="h-5 w-5" />
                  Calculate Egg Revenue &amp; Feed Cost
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
                  <span>50+1 Carton Standard</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>98% Vent-Sexing Rate</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Marek&apos;s HVT Vaccinated</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>36 States Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Visual Showcase Card with Telemetry Badges */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-b from-emerald-950/70 via-slate-950/80 to-black p-3 shadow-2xl backdrop-blur-md">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
                  <Image
                    src="/products/Chicks/Pullet day old.jpeg"
                    alt="Day-Old Pullets Price in Nigeria — Commercial Layer Chicks (ISA Brown & Hy-Line)"
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
                      Certified Primary Parent Stock
                    </span>
                  </div>

                  {/* Float Capsule 2 */}
                  <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2ee571]">
                        Commercial Layer Potential
                      </span>
                      <span className="text-[10px] text-emerald-300 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                        72 Weeks Lay
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px]">Peak Hen-Day Lay:</span>
                        <p className="font-black text-white text-sm">94% – 96%</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px]">Marketable Egg Output:</span>
                        <p className="font-black text-white text-sm">310 – 325 Eggs</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom mini-metrics */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-1 text-center">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <div className="text-lg font-black text-white font-heading">50+1</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Standard Carton Rule</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <div className="text-lg font-black text-white font-heading">98%+</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Sexing Accuracy</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <div className="text-lg font-black text-white font-heading">Week 18</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Point of Lay Target</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Operational Benchmarks Strip */}
          <div className="mt-14 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: '36 States', label: 'Nationwide Delivery Routes', sub: 'Synchronized Monday & Thursday dispatches' },
              { value: '4 Primary', label: 'Certified Partner Hatcheries', sub: 'Zartech, Amo, Chi & Supreme allocations' },
              { value: '98%+ Female', label: 'Guaranteed Sexing Ratio', sub: 'Eliminates wasted feed on unwanted males' },
              { value: 'VCN Advisory', label: 'Brooding & Vaccination Support', sub: 'Preventable 20-week mortality control' },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center hover:border-emerald-500/40 transition-colors"
              >
                <div className="text-3xl font-extrabold text-white font-heading mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-emerald-400 mb-0.5">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ====================================================================
          2. EMOTIONALLY COMPELLING HOOK & EGG FARM ECONOMICS
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
            <AlertTriangle className="h-4 w-4 text-emerald-700" />
            The High Stakes of Commercial Layer Farming
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            A Broiler Mistake Costs 6 Weeks. A Pullet Mistake Punishes Your Farm for 72 Weeks.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            If you buy bad broilers, you take your loss in 42 days and reset. But when you stock compromised day-old pullets, you feed them for 18 to 20 expensive weeks before discovering their genetic defect. If those birds plateau at only 68% peak lay instead of 95%, you are locked into 12 straight months of daily feed deficits.
          </p>

          {/* Practical Opinion Quote */}
          <div className="bg-emerald-50/90 border-l-4 border-emerald-600 rounded-r-2xl p-6 text-left max-w-3xl mx-auto space-y-2 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
              Our Practical Opinion as an Agro-Allied Livestock Enterprise
            </p>
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed italic">
              &ldquo;Saving ₦200 on a day-old pullet is the single most expensive shortcut an egg producer can take in Nigeria. A sub-standard layer that peaks at 70% instead of 95% costs over ₦16,000 per bird in lost table egg revenue while consuming the exact same high-cost commercial layer mash. Proven parent genetics are your farm&apos;s strongest insurance policy.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. PROBLEM EXPLANATION: 4 Fatal Cracks in Pullet Sourcing
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100/80 border border-red-200 px-4 py-1.5 rounded-full">
              <XCircle className="h-4 w-4 text-red-600" />
              Industry Realities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why 4 Out of 10 New Commercial Layer Farms Close Down in Nigeria
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              When farmers evaluate day-old pullets price in Nigeria, they often focus solely on the carton sticker price. These four operational sourcing failures cause over 80% of layer business insolvencies:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Backyard Multiplier Pullets',
                problem: 'Low peak lay stalling at 65%–72%',
                description: 'Uncertified hatcheries mix spent layer eggs with commercial lines. The chicks look normal at hatch, but their reproductive tracts lack the genetic capacity to produce beyond 220 eggs over their lifetime.',
                impact: 'Up to 35% lifetime revenue loss',
                icon: AlertTriangle,
                border: 'border-red-200',
              },
              {
                title: 'False Sexing Ratios',
                problem: '5% to 15% hidden cockerels in the carton',
                description: 'Poorly trained sexers miss male chicks. Farmers unknowingly feed these cockerels expensive developer and layer mash for 18 weeks before realizing they cannot lay a single egg.',
                impact: '₦12,000+ wasted feed per male bird',
                icon: XCircle,
                border: 'border-amber-200',
              },
              {
                title: 'Dead Marek’s Vaccine Cold-Chain',
                problem: 'Late paralysis & tumors at 14–20 weeks',
                description: 'Marek’s disease vaccine (HVT) must be administered at hatch under strict cold-chain. If improperly handled, birds develop neural tumors and drop dead right when you expect your first egg.',
                impact: '10%–40% devastating pre-lay mortality',
                icon: Thermometer,
                border: 'border-orange-200',
              },
              {
                title: 'Uneven Week-5 Skeletal Framing',
                problem: 'Permanent flock weight variation',
                description: 'Transport stress and poor brooding create wide body weight variation. Birds below 380g at Week 5 never develop sufficient pelvic width or shank length, leading to severe prolapse at lay.',
                impact: 'High mortality at point of lay',
                icon: Scale,
                border: 'border-rose-200',
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className={`rounded-3xl bg-white border ${card.border} p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow`}
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center font-bold">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold font-heading text-slate-900">{card.title}</h3>
                  <div className="text-xs font-semibold text-red-600 bg-red-50/70 px-2.5 py-1 rounded-lg">
                    {card.problem}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.description}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Economic Drag:</span>
                  <span className="text-red-700">{card.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. INTERACTIVE HUB: Strains, Calculator & Timetable Tabs
          ==================================================================== */}
      <section id="calculator" className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Layers className="h-4 w-4 text-emerald-700" />
              Commercial Planning Desk
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Compare Strains, Forecast Revenue &amp; Review Management Timetable
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Use our interactive layer operations tools to pick the ideal breed, forecast your daily crate returns, and review recommended 20-week weight gates:
            </p>

            {/* Pill Tabs */}
            <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 flex-wrap justify-center gap-1.5">
              {[
                { id: 'strains', label: 'Commercial Strains' },
                { id: 'calculator', label: 'Egg Revenue Calculator' },
                { id: 'timetable', label: 'Brooding & Laying Timetable' },
                { id: 'framework', label: 'The D-AminGrow Quality Standard' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: Commercial Strains Breakdown */}
          {activeTab === 'strains' && (
            <div className="space-y-8">
              {/* Strain Selector Buttons */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {LAYER_STRAINS.map((strain) => (
                  <button
                    key={strain.id}
                    onClick={() => setSelectedStrain(strain.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedStrain === strain.id
                        ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 mb-1">
                      {strain.badge}
                    </div>
                    <div className="text-sm font-bold font-heading text-slate-900 mb-0.5">{strain.name}</div>
                    <div className="text-xs text-slate-500">Peak Lay: <strong className="text-slate-800">{strain.peakLayRate}</strong></div>
                  </button>
                ))}
              </div>

              {/* Selected Strain Detailed Card */}
              <div className="rounded-3xl bg-slate-900 text-white p-8 lg:p-10 border border-emerald-950 shadow-xl space-y-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                  <div className="space-y-2">
                    <span className="inline-block text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full uppercase tracking-wider">
                      {currentStrain.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                      {currentStrain.name}
                    </h3>
                    <p className="text-sm text-slate-400 flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-emerald-400" />
                      <span>{currentStrain.breeder}</span>
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-right lg:min-w-[260px]">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly Clearing Estimate</div>
                    <div className="text-2xl font-black text-white font-heading mt-0.5">{currentStrain.cartonPriceEstimate}</div>
                    <div className="text-xs text-emerald-400 font-semibold mt-0.5">Carton of 50 (+1 free bonus chick)</div>
                    <div className="text-[11px] text-slate-400 mt-1">Approx. {currentStrain.perBirdEstimate} / pullet</div>
                  </div>
                </div>

                <p className="text-base text-slate-300 leading-relaxed max-w-4xl">
                  {currentStrain.description}
                </p>

                {/* Performance Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { label: 'Peak Lay Efficiency', value: currentStrain.peakLayRate, icon: TrendingUp },
                    { label: 'Egg Potential', value: currentStrain.eggPotential, icon: Egg },
                    { label: 'Point of Lay Age', value: currentStrain.firstEggAge, icon: Clock },
                    { label: 'Feed at Peak', value: currentStrain.feedAtPeak, icon: Feather },
                    { label: 'Shell Character', value: 'Rich Thick Brown', icon: ShieldCheck },
                    { label: 'Sexing Guarantee', value: '98%+ Female', icon: Award },
                  ].map((spec, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
                        <spec.icon className="h-3.5 w-3.5" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{spec.label}</span>
                      </div>
                      <div className="text-sm font-bold text-white font-heading leading-tight">{spec.value}</div>
                    </div>
                  ))}
                </div>

                {/* Key Strengths & CTA */}
                <div className="pt-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-t border-white/10">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Breeder Strengths</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {currentStrain.strengths.map((str, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>{str}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20am%20interested%20in%20booking%20the%20${encodeURIComponent(currentStrain.name)}%20commercial%20pullet%20allotment.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 text-sm whitespace-nowrap shadow-lg shadow-[#25D366]/20"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Book {currentStrain.name} On WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Egg Revenue & Pullet Feasibility Calculator */}
          {activeTab === 'calculator' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Inputs Column */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-7 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 mb-1">
                    Layer Batch Economics Modeler
                  </h3>
                  <p className="text-xs text-slate-600">
                    Adjust flock size and egg market crate rates to forecast peak weekly returns and feed overhead:
                  </p>
                </div>

                {/* Slider 1: Flock Size */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700 uppercase tracking-wider">Number of Pullets Stocked</label>
                    <span className="font-black text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg text-sm font-heading">
                      {flockSize.toLocaleString()} Birds
                    </span>
                  </div>
                  <input
                    type="range"
                    min={200}
                    max={10000}
                    step={100}
                    value={flockSize}
                    onChange={(e) => setFlockSize(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600">
                    <span>200 birds (4 cartons)</span>
                    <span>1,000 birds</span>
                    <span>10,000 birds (200 cartons)</span>
                  </div>
                </div>

                {/* Slider 2: Current Crate Price */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700 uppercase tracking-wider">Egg Market Price (Per Crate of 30)</label>
                    <span className="font-black text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg text-sm font-heading">
                      ₦{cratePrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2800}
                    max={5500}
                    step={100}
                    value={cratePrice}
                    onChange={(e) => setCratePrice(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600">
                    <span>₦2,800 (Farm gate low)</span>
                    <span>₦3,800 (Avg)</span>
                    <span>₦5,500 (Festive peak)</span>
                  </div>
                </div>

                {/* Pullet Chick Estimate */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700 uppercase tracking-wider">Estimated Day-Old Pullet Rate</label>
                    <span className="font-black text-slate-800 bg-slate-200 px-2.5 py-1 rounded-lg text-sm font-heading">
                      ₦{chickPrice.toLocaleString()} / chick
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2200}
                    max={3200}
                    step={50}
                    value={chickPrice}
                    onChange={(e) => setChickPrice(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
                  />
                </div>

                <div className="text-[11px] text-slate-600 bg-white border border-slate-200 rounded-xl p-3 space-y-1">
                  <p className="font-semibold text-slate-800">Assumptions Used:</p>
                  <p>• 94% Hen-Day peak lay efficiency between weeks 26 and 35.</p>
                  <p>• 112 grams of commercial layer mash per hen per day.</p>
                  <p>• 50+1 packaging standard (you receive {cartonsNeeded} cartons with {cartonsNeeded} bonus chicks).</p>
                </div>
              </div>

              {/* Output Dashboard Column */}
              <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-7 lg:p-9 border border-emerald-950 shadow-xl space-y-6">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
                    Projected Commercial Output
                  </span>
                  <h3 className="text-2xl font-extrabold font-heading text-white mt-1">
                    Peak Production &amp; Monthly Revenue Forecast
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Daily Egg Output</div>
                    <div className="text-3xl font-black text-white font-heading mt-1">{dailyEggsAtPeak.toLocaleString()}</div>
                    <div className="text-xs text-emerald-400 font-bold mt-1">~{dailyCratesAtPeak} Crates Daily</div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Gross Monthly Revenue</div>
                    <div className="text-3xl font-black text-[#2ee571] font-heading mt-1">
                      ₦{monthlyRevenue.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-300 font-medium mt-1">At ₦{cratePrice.toLocaleString()} / crate</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Daily Feed Intake (Peak)</div>
                    <div className="text-2xl font-black text-white font-heading mt-1">{dailyFeedBags} Bags</div>
                    <div className="text-xs text-slate-400 mt-1">{dailyFeedKgAtPeak} kg / day (25kg bags)</div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Day-Old Chick Capital</div>
                    <div className="text-2xl font-black text-amber-300 font-heading mt-1">
                      ₦{totalChickInvestment.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{cartonsNeeded} cartons @ 50 chicks each</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-300">
                    Want to lock in current week allocation for {flockSize.toLocaleString()} pullets?
                  </p>
                  <a
                    href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20used%20your%20layer%20calculator%20and%20want%20to%20book%20an%20allotment%20for%20${flockSize}%20day-old%20pullets.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-xs font-heading whitespace-nowrap shadow-md"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Secure Booking On WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Brooding, Vaccination & Lighting Timetable */}
          {activeTab === 'timetable' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm text-slate-700 leading-relaxed max-w-4xl">
                <p>
                  <strong>The Layer Management Golden Rule:</strong> Commercial layers must never be rushed into egg production before their skeletal frame is complete. Follow these 4 standard management phases from hatch to 72 weeks:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TIMETABLE_PHASES.map((phase, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl bg-white border border-slate-200 p-7 space-y-4 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                          {phase.weeks}
                        </span>
                        <Clock className="h-4 w-4 text-slate-400" />
                      </div>
                      <h4 className="text-lg font-bold font-heading text-slate-900">{phase.phase}</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-slate-600 text-[10px] uppercase font-bold block">Target Body Weight:</span>
                          <strong className="text-emerald-700">{phase.targetWeight}</strong>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-slate-600 text-[10px] uppercase font-bold block">Lighting Duration:</span>
                          <strong className="text-slate-800">{phase.lightingHours}</strong>
                        </div>
                      </div>
                      <div className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-800">Recommended Ration:</strong> {phase.feedType}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-800">Key Management Focus:</strong> {phase.focus}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/60">
                      <strong className="text-emerald-800 block mb-0.5">Vaccination &amp; Biosecurity Gates:</strong>
                      {phase.vaccines}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: The D-AminGrow Quality Standard */}
          {activeTab === 'framework' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  pillar: 'Standard 01',
                  title: 'Certified Parent-Stock Hatcheries Only',
                  description: 'All commercial layer pullets are booked directly from licensed primary hatcheries (Zartech, Amo, Chi, Supreme). No open-market aggregation, zero spent-layer eggs.',
                  badge: 'Verified Pedigree',
                  icon: Feather,
                },
                {
                  pillar: 'Standard 02',
                  title: '50+1 Packaging Livability Buffer',
                  description: 'Every carton contains 50 chicks plus 1 free bonus chick (51 total). This buffer guarantees your stocked house starts at 100% of your paid count even after long transit.',
                  badge: '100% Stocking Guard',
                  icon: ShieldCheck,
                },
                {
                  pillar: 'Standard 03',
                  title: 'Marek’s Disease (HVT) Hatchery Vaccination',
                  description: 'Pre-vaccinated at the hatchery on Day 1 with biosecure HVT subcutaneous or intraocular biologicals, protecting your pullets from incurable neural and organ tumors.',
                  badge: 'Pre-Immunized at Hatch',
                  icon: Thermometer,
                },
                {
                  pillar: 'Standard 04',
                  title: '98%+ Guaranteed Female Vent-Sexing',
                  description: 'Conducted by certified Japanese-trained vent and feather sexing technicians, ensuring you never waste expensive commercial feed raising unwanted cockerels.',
                  badge: '98% Female Guarantee',
                  icon: Award,
                },
              ].map((std, i) => (
                <div key={i} className="rounded-3xl bg-slate-50 border border-slate-200 p-6 space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-3 py-1 rounded-full">
                      {std.pillar}
                    </span>
                    <std.icon className="h-5 w-5 text-emerald-700" />
                  </div>
                  <h4 className="text-base font-bold font-heading text-slate-900">{std.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{std.description}</p>
                  <div className="pt-2 text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" />
                    <span>{std.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ====================================================================
          5. UNIQUE INFORMATION GAIN: 3 Advanced Insights
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Sparkles className="h-4 w-4 text-emerald-700" />
              Information Gain · Practical Layer Science
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              3 Layer Management Insights Most Competitors Never Explain
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Commercial layer success is governed by physiological milestones established during the brooding phase:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 'Insight 01',
                title: 'The 5-Week Skeletal Frame Weight Gate',
                importance: 'Why you can never catch up on bone growth after Week 5',
                body: 'By 35 days of age, commercial pullets have formed over 80% of their total adult skeletal bone frame. If a pullet is underweight at Week 5 (target: 380g–420g), you cannot fix it by feeding extra protein at Week 12. Heavy feeding later only deposits abdominal fat without expanding the pelvic cavity, resulting in severe egg-binding and cloacal prolapse at point of lay.',
                data: 'Target: 380g–420g at 35 days · Shank length: 58mm–62mm',
                icon: Scale,
              },
              {
                step: 'Insight 02',
                title: 'Hen-Day vs. Hen-Housed Egg Production',
                importance: 'The mathematical metric that separates real profits from illusions',
                body: 'Hen-Day percentage calculates eggs laid divided by living birds on that specific day. Hen-Housed percentage divides daily eggs by the original number of pullets placed in the pen on Day 1. If you stocked 1,000 pullets, lost 150 birds to poor brooding, and the remaining 850 birds lay 800 eggs, your Hen-Day lay is a glorious 94.1%, but your real Hen-Housed yield is only 80.0%. Your feed bills are paid on Hen-Housed reality.',
                data: 'D-AminGrow target: Hen-Housed production >310 eggs to 72 weeks',
                icon: Egg,
              },
              {
                step: 'Insight 03',
                title: 'The 50+1 Standard Carton Rule & Arrival Sexing Audit',
                importance: 'How to audit your day-old pullet delivery at the farm gate',
                body: 'Certified hatcheries in Nigeria package pullets in standard 50-bird cartons with 1 free buffer chick (total: 51). Upon delivery, count each quadrant (approx. 12–13 chicks). Check for dry, completely sealed navels, bright prominent eyes, and uniform weight (36g–42g). Any batch with unhealed yolk scars or active leg paralysis should be flagged immediately on your waybill receipt before driver departure.',
                data: 'Inspection tolerance: <1.0% Day-1 transit fatigue',
                icon: ShieldCheck,
              },
            ].map((insight, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white border border-slate-200 p-7 space-y-4 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                      {insight.step}
                    </span>
                    <insight.icon className="h-5 w-5 text-emerald-700" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 leading-snug">
                    {insight.title}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    {insight.importance}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {insight.body}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{insight.data}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. REAL FARM CASE STUDY: Folahan Agro-Venture Results
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#050E08] via-emerald-950/70 to-slate-950 p-8 sm:p-12 text-white border border-emerald-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-1.5 rounded-full">
                  <Award className="h-4 w-4 text-emerald-400" />
                  Verified Commercial Farm Results
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                  Folahan Agro-Venture: 5,000 ISA Brown Pullets Hitting 95.4% Peak Lay
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Located in the Ogun State commercial poultry belt, Folahan Agro-Venture previously suffered a 72% peak lay disaster caused by unverified open-market pullet bookings. In February 2026, the farm transitioned to D-AminGrow verified parent-stock allocations:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-black text-white font-heading">1.1%</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Week-1 Mortality</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-black text-white font-heading">Week 19</div>
                    <div className="text-[10px] text-emerald-400 font-bold">5% First Egg Drop</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-black text-white font-heading">95.4%</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Peak Hen-Day Lay</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-black text-white font-heading">156 Crates</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Daily Peak Yield</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic border-l-2 border-emerald-500 pl-3">
                  &ldquo;With D-AminGrow, our crates spoke for themselves. 156 crates every morning at 95.4% peak gave us steady cash flow that wiped out our previous debts. The weekly dispatch updates and verified hatchery waybills gave our staff complete peace of mind.&rdquo;
                  <span className="block text-emerald-400 font-bold mt-1">— Mr. T. Folahan, Managing Director</span>
                </p>
              </div>

              <div className="lg:col-span-5 bg-black/50 border border-white/10 rounded-2xl p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <Egg className="h-7 w-7" />
                </div>
                <div className="text-lg font-bold font-heading text-white">Book Your Layer Placement Batch</div>
                <p className="text-xs text-slate-300">
                  Join hundreds of commercial egg producers across Nigeria who rely on D-AminGrow for guaranteed parent-stock pullet allocations.
                </p>
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20read%20the%20Folahan%20Agro-Venture%20case%20study%20and%20want%20to%20book%20day-old%20pullets."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-xs font-heading shadow-lg"
                >
                  <MessageCircle className="h-4 w-4" />
                  Connect With Technical Booking Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. "WE MAY NOT BE RIGHT FOR YOU IF…" SECTION
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-600">
              Honest Farm Alignment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              We May Not Be The Right Pullet Partner For You If…
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              We operate an uncompromising quality model. We are intentionally not the cheapest supplier on the open market:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                <XCircle className="h-5 w-5" />
                <span>We are NOT the right fit if:</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-black">•</span>
                  <span>You are shopping strictly for the cheapest sticker price in the country without regard for parent-stock accreditation or maternal antibodies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-black">•</span>
                  <span>You expect random same-day doorstep dispatch without advance booking into certified Monday and Thursday hatchery schedules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-black">•</span>
                  <span>You plan to cut corners on Marek’s disease vaccination or skip standard 20-week layer brooding protocols.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-black">•</span>
                  <span>You want to purchase single-digit loose chicks out of broken cartons from unknown local aggregators.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-emerald-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5" />
                <span>We ARE your dependable partner if:</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-black">•</span>
                  <span>You run a commercial egg enterprise and cannot afford to lose millions of Naira feeding sub-standard layers for 72 weeks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-black">•</span>
                  <span>You insist on verified 50+1 packaging standards and certified 98%+ female vent-sexing guarantees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-black">•</span>
                  <span>You want authenticated hatchery receipts from Zartech, Amo, Chi, or Supreme with official batch tracking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-black">•</span>
                  <span>You value practical clinical veterinary advisory from brooding through peak lay and production persistence.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. FAQ SECTION (Schema-Backed)
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
              <HelpCircle className="h-4 w-4 text-emerald-700" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Common Questions About Day-Old Pullets Price in Nigeria
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Clear, practical answers about commercial layer bookings, pricing fluctuations, and dispatch rules:
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50 border border-slate-200 p-6 space-y-2 hover:border-emerald-300 transition-colors"
              >
                <h3 className="text-base font-bold font-heading text-slate-900 flex items-start gap-3">
                  <span className="text-emerald-600 font-black">Q{idx + 1}.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-slate-500 mb-3">Have a specific question about your layer farm location or pen setup?</p>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20have%20a%20question%20about%20booking%20commercial%20day-old%20pullets."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-bold text-sm underline decoration-emerald-500 underline-offset-4"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Ask Our Livestock Technical Desk Directly On WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. SOFT CONVERSION CTA SECTION
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-[#050E08] text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Your Satisfaction Is Our Priority
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Protect Your Layer Capital With Certified Primary Parent Stock
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stop risking 72 weeks of expensive feed on uncertain genetics. Lock in genuine Zartech, ISA Brown, and Hy-Line Brown commercial pullets for next Monday or Thursday dispatch.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20am%20ready%20to%20book%20commercial%20day-old%20pullets%20for%20the%20upcoming%20dispatch."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Book Verified Pullets On WhatsApp
            </a>
            <Link
              href="/day-old-chicks"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
            >
              Explore All Day-Old Chicks
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Zenith Bank Deposit Verified Box */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Official Deposit Account: <strong>Zenith Bank 1017894562</strong> (D-AminGrow Agric Ltd)</span>
            </span>
            <button
              onClick={handleCopyBank}
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 transition-colors"
            >
              {copiedBank ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedBank ? 'Copied Account!' : 'Copy 1017894562'}</span>
            </button>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Mon &amp; Thu Nationwide Dispatch
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 50+1 Packaging Rule
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 98%+ Sexing Guarantee
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
