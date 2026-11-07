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
  Truck,
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
  Zap,
  Scale,
  Award,
  AlertTriangle,
  Calculator,
  HelpCircle,
  DollarSign,
  Flame,
} from 'lucide-react';

interface StrainDetail {
  id: string;
  name: string;
  breeder: string;
  badge: string;
  targetWeight42Days: string;
  fcrRange: string;
  dailyGain: string;
  carcassYield: string;
  cartonPriceEstimate: string;
  perBirdEstimate: string;
  bestFor: string;
  description: string;
  strengths: string[];
}

const BROILER_STRAINS: StrainDetail[] = [
  {
    id: 'cobb-500',
    name: 'Cobb 500 Commercial Broiler',
    breeder: 'Chi Farms / Certified Grandparent Stock',
    badge: 'High Breast Yield & Heat Efficiency',
    targetWeight42Days: '2.35kg – 2.65kg (at 42 days)',
    fcrRange: '1.60 – 1.72',
    dailyGain: '56g – 62g / bird / day',
    carcassYield: '73.5% (High Breast Fillet Ratio)',
    cartonPriceEstimate: '₦85,000 – ₦105,000',
    perBirdEstimate: '₦1,700 – ₦2,100',
    bestFor: 'Commercial processors, hotel carcass supply, and farmers seeking lowest cost of feed per kg of meat gained in hot tropical pens.',
    description:
      'A leading global breed for meat yield and heat tolerance. Cobb 500 converts lower-density and economic grain rations with remarkable efficiency. Known for uniform body conformation, rapid early feathering, and strong cardiovascular health under tropical pen heat.',
    strengths: [
      'Exceptional breast meat deposition commanding top prices from cold-room processors',
      'Superior feed conversion on cost-effective, lower-density tropical diets',
      'High growth uniformity minimizing sorting labor at slaughter',
      'Robust heat tolerance reducing panting and mortality during hot dry seasons',
    ],
  },
  {
    id: 'ross-308',
    name: 'Ross 308 Commercial Broiler',
    breeder: 'Zartech / Amo Certified Primary Stock',
    badge: 'Rapid Early Frame & Daily Weight Gain',
    targetWeight42Days: '2.45kg – 2.80kg (at 42 days)',
    fcrRange: '1.62 – 1.74',
    dailyGain: '58g – 65g / bird / day',
    carcassYield: '72.8% (Heavy Leg & Thigh Conformation)',
    cartonPriceEstimate: '₦88,000 – ₦110,000',
    perBirdEstimate: '₦1,760 – ₦2,200',
    bestFor: 'Farmers targeting fast 38-to-42 day batch turnarounds and live-bird market sales where massive body frame commands premium prices.',
    description:
      'A world-renowned heavy-weight commercial lineage bred for hearty appetite and vigorous daily weight gain. When managed with quality high-protein starter rations (22%–23% CP), Ross 308 develops a robust skeletal frame and achieves rapid growth in Nigerian open-sided pens.',
    strengths: [
      'Consistent, high average daily gain (ADG) achieving target harvest in 38 to 42 days',
      'Heavy leg quarter and drumstick development favored in Nigerian live-bird markets',
      'High digestive efficiency on standard commercial broiler starter and finisher rations',
      'Strong vigor and rapid feeding reflex right out of the delivery carton',
    ],
  },
  {
    id: 'arbor-acres',
    name: 'Arbor Acres Plus (AA+)',
    breeder: 'Supreme / Amo Primary Hatchery Allotment',
    badge: 'Exceptional Leg Strength & Livability',
    targetWeight42Days: '2.30kg – 2.60kg (at 42 days)',
    fcrRange: '1.64 – 1.76',
    dailyGain: '55g – 60g / bird / day',
    carcassYield: '72.0% (Well-Proportioned Muscle)',
    cartonPriceEstimate: '₦82,000 – ₦100,000',
    perBirdEstimate: '₦1,640 – ₦2,000',
    bestFor: 'Open-sided pens, deep litter systems with basic ventilation, and farmers prioritizing low brooding mortality and zero leg weakness.',
    description:
      'Engineered for rugged tropical resilience. Arbor Acres Plus features heavy bone density that virtually eliminates leg paralysis, hock burns, and ascites (water belly). An incredibly forgiving bird for both smallholder and commercial operations.',
    strengths: [
      'Outstanding skeletal bone density preventing lameness and leg cullings',
      'High natural resistance to metabolic ascites under hot or humid pen conditions',
      'Steady, predictable growth curve with consistent livability above 98%',
      'Excellent skin texture and clean dressing appearance for frozen chicken packaging',
    ],
  },
  {
    id: 'marshall-heavy',
    name: 'Marshall Heavy Commercial Broiler',
    breeder: 'Certified Hatchery Partner Lineage',
    badge: 'Rustic Conformation & Large Live Weight',
    targetWeight42Days: '2.50kg – 3.00kg (at 45–49 days)',
    fcrRange: '1.70 – 1.82',
    dailyGain: '54g – 60g / bird / day',
    carcassYield: '71.5% (Large Robust Frame)',
    cartonPriceEstimate: '₦85,000 – ₦105,000',
    perBirdEstimate: '₦1,700 – ₦2,100',
    bestFor: 'Festive season fattening (Christmas, Easter, Eid), catering orders, and live-bird retail where extra large 3kg+ birds fetch top retail naira.',
    description:
      'Bred with taller body conformation and large skeletal frames. Highly capable of carrying weight beyond 49 days without metabolic collapse, making it the preferred breed for farmers fattening birds to 3.0kg+ for major festive holidays.',
    strengths: [
      'Ability to sustain heavy feeding past 7 weeks without sudden death syndrome',
      'Large framed live birds that stand out in competitive live-chicken markets',
      'Hardy digestive system tolerant of farm-compounded mash rations',
      'High salvage carcass weight for commercial restaurants and barbecue caterers',
    ],
  },
];

interface ManagementPhase {
  phase: string;
  days: string;
  targetWeight: string;
  feedType: string;
  dailyIntake: string;
  keyActions: string;
  vaccines: string;
}

const BROILER_PHASES: ManagementPhase[] = [
  {
    phase: 'Phase 1: Brooding & Gut Architecture',
    days: 'Days 1 – 10',
    targetWeight: '180g – 200g at Day 7 · 320g at Day 10',
    feedType: 'Broiler Pre-Starter / Starter Crumble (22% – 23% CP)',
    dailyIntake: '15g ramping to 38g / bird / day',
    keyActions: '33°C–35°C brooding temperature. Provide cool water with oral glucose and stress electrolytes on arrival. Verify 100% crop fill within 24 hours.',
    vaccines: 'Day 1: Marek’s (Hatchery vaccinated) · Day 7: Newcastle Disease (Hitchner B1 / Lasota intraocular) · Day 10: Gumboro (IBD Intermediate)',
  },
  {
    phase: 'Phase 2: Skeletal Growth & Rapid Framing',
    days: 'Days 11 – 21',
    targetWeight: '850g – 950g at Day 21 (3 Weeks)',
    feedType: 'Broiler Starter Mash / Pellet (21% – 22% CP)',
    dailyIntake: '45g ramping to 85g / bird / day',
    keyActions: 'Gradually step down temperature to 27°C–28°C. Expand floor space to avoid overcrowding. Check litter dryness to prevent early coccidiosis.',
    vaccines: 'Day 16: Gumboro Booster (IBD Intermediate Plus) · Day 21: Newcastle Disease (Lasota via drinking water with skimmed milk stabilizer)',
  },
  {
    phase: 'Phase 3: Accelerated Muscle Deposition',
    days: 'Days 22 – 35',
    targetWeight: '1,750g – 1,950g at Day 35 (5 Weeks)',
    feedType: 'Broiler Finisher Pellets / Mash (19% – 20% CP)',
    dailyIntake: '110g ramping to 160g / bird / day',
    keyActions: 'Ensure maximum cross-ventilation in pens to evacuate ammonia and heat. Add liver tonics and organic acids in water to optimize nutrient absorption.',
    vaccines: 'No live viral vaccines · Regular biosecurity footbaths · Water sanitization with chlorine dioxide',
  },
  {
    phase: 'Phase 4: Harvest Finishing & Meat Density',
    days: 'Days 36 – 42+',
    targetWeight: '2.20kg – 2.80kg at 42–49 Days',
    feedType: 'Broiler Finisher (Clean, antibiotic-free withdrawal ration)',
    dailyIntake: '165g – 185g / bird / day',
    keyActions: 'Enforce strict 5-to-7 day drug withdrawal period before slaughter. Fast birds from feed for 8–10 hours prior to processing while maintaining fresh water.',
    vaccines: 'Zero medications (withdrawal compliance) · Vitamin C in water to mitigate catching and transport stress',
  },
];

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'What is the current day-old broiler chicks price in Nigeria today?',
    a: 'Day-old broiler chick prices in Nigeria fluctuate weekly based on parent-stock hatching volumes, feed ingredient costs (maize and soya), and market demand. Current clearing prices range between ₦1,700 and ₦2,200 per chick, which translates to ₦85,000 to ₦110,000 per carton of 50 chicks (+1 bonus chick). Because hatcheries adjust quotes every Monday and Thursday, message the D-AminGrow booking desk on WhatsApp for today’s confirmed clearing rate before transferring deposits.',
  },
  {
    q: 'Which broiler breed is the best for fast weight gain in Nigeria?',
    a: 'Every certified commercial broiler breed has specific production strengths engineered for different management setups. Ross 308 excels in early skeletal frame development and high daily weight gain (reaching 2.5kg in 40–42 days under balanced feeding). Cobb 500 provides high breast meat conformation and outstanding feed efficiency in tropical heat. Arbor Acres Plus offers exceptional leg strength and low ascites mortality in open-sided pens, while Marshall is ideal for farmers holding birds to 7+ weeks for large 3kg+ festive live sales. D-AminGrow supplies all certified commercial parent-stock lineages from Nigeria’s accredited primary hatcheries.',
  },
  {
    q: 'How many bags of feed will 100 broilers eat from day one to 6 weeks?',
    a: 'To raise 100 commercial broilers to an average market weight of 2.3kg–2.6kg at 6 weeks (42 days), you will need approximately 16 to 17 bags (25kg each) of commercial feed. This breaks down into roughly 5 bags of Broiler Starter (22%–23% CP for Days 1–21) and 11 to 12 bags of Broiler Finisher (19%–20% CP for Days 22–42), based on an efficient Feed Conversion Ratio (FCR) of 1.65 to 1.75.',
  },
  {
    q: 'Why do so many broilers stall at 1.4kg at 7 weeks in Nigeria?',
    a: 'Broiler stunting is caused by two main factors: uncertified backyard multiplier chicks and Day-7 brooding failure. Backyard multipliers hatch spent-layer eggs that lack the genetic capacity to build heavy muscle tissue. Furthermore, if broilers fail to reach 4.5× to 5× their hatch weight by Day 7 (target: 180g–200g) due to cold brooding or poor water intake, their digestive tracts remain permanently stunted, and they will never convert feed efficiently.',
  },
  {
    q: 'What is the 50+1 packaging rule for day-old broilers in Nigeria?',
    a: 'All certified hatcheries in Nigeria package commercial broilers in four-quadrant ventilated cartons containing 50 chicks plus 1 free bonus chick (total of 51 chicks per carton). This 50+1 packaging standard serves as a transport livability buffer, ensuring your stocked pen starts with 100% of your paid bird allotment even if a transit drop-off occurs.',
  },
  {
    q: 'What are the official booking cutoff times and nationwide dispatch days?',
    a: 'D-AminGrow dispatches day-old broiler chicks nationwide every Monday and Thursday morning. For Monday dispatches, confirmed 50% deposits must clear into our official Zenith Bank account by Saturday 12:00 PM. For Thursday dispatches, deposits must clear by Tuesday 5:00 PM. Waybill receipts and driver tracking details are sent immediately upon dispatch.',
  },
];

interface BroilerClientProps {
  nextMonday: string;
  nextThursday: string;
}

export default function BroilerLandingClient({ nextMonday, nextThursday }: BroilerClientProps) {
  const [selectedStrain, setSelectedStrain] = useState<string>('cobb-500');
  const [activeTab, setActiveTab] = useState<'strains' | 'calculator' | 'timetable' | 'framework'>('strains');

  // Calculator State
  const [flockSize, setFlockSize] = useState<number>(500);
  const [harvestAgeDays, setHarvestAgeDays] = useState<number>(42); // 38, 42, 49
  const [livePricePerKg, setLivePricePerKg] = useState<number>(3200);
  const [chickPrice, setChickPrice] = useState<number>(1900);

  // Calculations
  const targetWeightKg = harvestAgeDays === 38 ? 2.15 : harvestAgeDays === 42 ? 2.45 : 2.85;
  const targetFcr = harvestAgeDays === 38 ? 1.62 : harvestAgeDays === 42 ? 1.68 : 1.76;
  const livabilityRate = 0.98; // 98% target livability with D-AminGrow chicks
  const survivingBirds = Math.round(flockSize * livabilityRate);
  const totalMeatKg = Math.round(survivingBirds * targetWeightKg);
  const grossRevenue = totalMeatKg * livePricePerKg;

  const totalFeedKgPerBird = targetWeightKg * targetFcr;
  const totalBatchFeedKg = Math.round(flockSize * totalFeedKgPerBird);
  const totalFeedBags = Math.ceil(totalBatchFeedKg / 25); // 25kg feed bags

  const cartonsNeeded = Math.ceil(flockSize / 50);
  const totalChickInvestment = cartonsNeeded * (chickPrice * 50);

  const [copiedBank, setCopiedBank] = useState<boolean>(false);
  const handleCopyBank = () => {
    navigator.clipboard.writeText('1017894562');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const currentStrain: StrainDetail =
    BROILER_STRAINS.find((s) => s.id === selectedStrain) ?? BROILER_STRAINS[0]!;

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
            <span className="text-emerald-400 font-semibold">Commercial Broilers</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left Column (7 cols): Directives, Exact H1, Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-5 text-left">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Leading Agro-Allied Company in Nigeria
                </div>
              </div>

              {/* Exact H1 Directive */}
              <div className="space-y-4 !mt-2.5">
                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                  Day-Old Broiler Chicks Price in Nigeria:{' '}
                  <span className="text-gradient-green">Ross 308, Cobb 500 &amp; Arbor Acres</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                  Direct primary hatchery allocations from Chi, Amo, Zartech &amp; Supreme. Rapid 2.2kg–2.8kg harvest weight at 42 days, proven 1.60–1.75 FCR, and 50+1 carton packaging guarantee dispatched nationwide every Monday &amp; Thursday.
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
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20confirm%20today's%20Day-Old%20Broiler%20Chicks%20price%20and%20book%20an%20allotment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Book Verified Broiler Chicks On WhatsApp
                </a>
                <a
                  href="#calculator"
                  onClick={() => setActiveTab('calculator')}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
                >
                  <Calculator className="h-5 w-5" />
                  Calculate Feed Cost &amp; Profitability
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
                  <span>50+1 Carton Rule</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>1.60 – 1.75 Target FCR</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Marek’s HVT Vaccinated</span>
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
                    src="/products/Chicks/day old broiler.jpeg"
                    alt="Day-Old Broiler Chicks Price in Nigeria — Ross 308, Cobb 500 & Arbor Acres"
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
                      Certified Primary Parent Lineage
                    </span>
                  </div>

                  {/* Float Capsule 2 */}
                  <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2ee571]">
                        Commercial Meat Benchmark
                      </span>
                      <span className="text-[10px] text-emerald-300 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                        42 Days Cycle
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px]">6-Week Target Weight:</span>
                        <p className="font-black text-white text-sm">2.40kg – 2.80kg</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px]">Feed Conversion Ratio:</span>
                        <p className="font-black text-white text-sm">1.60 – 1.75 FCR</p>
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
                    <div className="text-lg font-black text-white font-heading">98.6%</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Brooding Livability</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <div className="text-lg font-black text-white font-heading">42 Days</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Target Harvest</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Operational Benchmarks Strip */}
          <div className="mt-14 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: '36 States', label: 'Nationwide Delivery Routes', sub: 'Synchronized Monday & Thursday dispatches' },
              { value: '4 Primary', label: 'Certified Partner Hatcheries', sub: 'Chi, Amo, Zartech & Supreme allocations' },
              { value: '1.65 Avg', label: 'Target Feed Conversion', sub: 'Transforms feed directly into marketable meat' },
              { value: 'VCN Advisory', label: 'Clinical Veterinary Guidance', sub: 'Proven brooding and anti-coccidial protocols' },
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
          2. EMOTIONALLY COMPELLING HOOK & BROILER FEED ECONOMICS
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
            <Flame className="h-4 w-4 text-emerald-700" />
            The High Stakes of Modern Broiler Farming
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Feed Represents Over 75% of Your Broiler Costs. Your Chicks Must Convert Every Gram.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            In commercial broiler production, there is zero room for slow growth. Commercial feed prices in Nigeria mean that every 0.1 point of FCR slippage costs hundreds of thousands of Naira per thousand birds. If your chicks lack certified genetics, they eat expensive 22% crude protein feed and turn it into manure instead of breast meat.
          </p>

          {/* Practical Opinion Quote */}
          <div className="bg-emerald-50/90 border-l-4 border-emerald-600 rounded-r-2xl p-6 text-left max-w-3xl mx-auto space-y-2 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
              Our Practical Opinion as an Agro-Allied Livestock Enterprise
            </p>
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed italic">
              &ldquo;Saving ₦150 on an uncertified day-old broiler chick from a backyard multiplier is the easiest way to lose ₦1,200 in high-cost commercial feeds per bird. Broilers with broken genetics or unhealed navels convert expensive 22% protein starter into wasted manure without ever hitting 2.2kg. Genuine parent-stock genetics are not a luxury—they are the only math that works in Nigerian poultry.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. PROBLEM EXPLANATION: 4 Fatal Cracks in Broiler Sourcing
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100/80 border border-red-200 px-4 py-1.5 rounded-full">
              <XCircle className="h-4 w-4 text-red-600" />
              Industry Realities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why So Many Commercial Broiler Batches Fail to Return Profit
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              When farmers evaluate day-old broiler chicks price in Nigeria, they often overlook how unstandardized informal chick middlemen remain. These four operational failures destroy broiler profit margins:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Backyard Multiplier Stunting',
                problem: 'Broilers stalling at 1.4kg at 7 weeks',
                description: 'Uncertified hatcheries mix spent parent-stock with commercial eggs. The chicks appear normal on Day 1, but lack genetic appetite and muscle capacity, causing feed conversion ratios to blow past 2.2.',
                impact: 'Up to ₦1,500 extra feed cost per bird',
                icon: AlertTriangle,
                border: 'border-red-200',
              },
              {
                title: 'Unhealed Navels & Omphalitis',
                problem: 'Massive Week-1 drop-off and yolk rot',
                description: 'Sub-standard incubation causes chicks to hatch with wet, unhealed navel scars. Bacteria enter the unabsorbed yolk sac, causing severe belly swelling and 10%–25% mortality within 7 days.',
                impact: 'Severe early batch mortality',
                icon: XCircle,
                border: 'border-amber-200',
              },
              {
                title: 'Vehicle Boot Heat Exhaustion',
                problem: 'Transit dehydration killing gut villi',
                description: 'Intermediaries haul chicks inside unventilated car trunks for hours under hot sun. Chicks arrive panting with dried shanks, damaged gut linings, and permanent digestive stunting.',
                impact: 'Permanent FCR impairment',
                icon: Thermometer,
                border: 'border-orange-200',
              },
              {
                title: 'Ghost Allocations & Cancellations',
                problem: 'Disrupted marketing dates and dead weeks',
                description: 'Middlemen collect booking deposits without confirmed hatchery quota slots. When clearing day arrives, they cancel orders or supply unauthorized breed substitutions, disrupting your planned harvest timeline.',
                impact: 'Missed festive market windows',
                icon: Clock,
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
          4. INTERACTIVE COMMERCIAL PLANNING HUB: Strains, Calculator & Timetable
          ==================================================================== */}
      <section id="calculator" className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Layers className="h-4 w-4 text-emerald-700" />
              Broiler Operations Command Desk
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Compare Breeds, Forecast Feed Budget &amp; Review Management Timetable
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Use our interactive tools to select the best commercial broiler lineage, model your 42-day feed consumption in 25kg bags, and review critical weekly weight gain gates:
            </p>

            {/* Multi-Strain Allocation Policy Notice */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 sm:p-5 max-w-3xl mx-auto my-6 text-left flex items-start gap-3.5">
              <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-bold block mb-0.5">Our Multi-Strain Allocation Policy:</strong>
                D-AminGrow supplies all certified commercial broiler lineages in Nigeria—including Ross 308, Cobb 500, Arbor Acres Plus, and Marshall. We do not have our own proprietary strain, nor do we favor one over another. Every strain has proven, distinct production strengths engineered by primary breeders; our role is to objectively guide you toward the optimal breed matching your pen climate, feed plan, and market destination.
              </div>
            </div>

            {/* Pill Tabs */}
            <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 flex-wrap justify-center gap-1.5">
              {[
                { id: 'strains', label: 'Commercial Breeds' },
                { id: 'calculator', label: 'Feed & Profitability Calculator' },
                { id: 'timetable', label: '42-Day Broiler Timetable' },
                { id: 'framework', label: 'The D-AminGrow Quality Framework' },
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

          {/* TAB 1: Commercial Breeds Breakdown */}
          {activeTab === 'strains' && (
            <div className="space-y-8">
              {/* Strain Selector Buttons */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {BROILER_STRAINS.map((strain) => (
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
                    <div className="text-xs text-slate-500">6-Wk Target: <strong className="text-slate-800">{strain.targetWeight42Days.split(' ')[0]}</strong></div>
                  </button>
                ))}
              </div>

              {/* Selected Breed Detailed Card */}
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
                    <div className="text-[11px] text-slate-400 mt-1">Approx. {currentStrain.perBirdEstimate} / chick</div>
                  </div>
                </div>

                <p className="text-base text-slate-300 leading-relaxed max-w-4xl">
                  {currentStrain.description}
                </p>

                {/* Performance Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { label: '42-Day Target Weight', value: currentStrain.targetWeight42Days, icon: Scale },
                    { label: 'Feed Conversion (FCR)', value: currentStrain.fcrRange, icon: TrendingUp },
                    { label: 'Average Daily Gain', value: currentStrain.dailyGain, icon: Zap },
                    { label: 'Carcass Meat Yield', value: currentStrain.carcassYield, icon: Award },
                    { label: 'Packaging Buffer', value: '50+1 Carton Rule', icon: ShieldCheck },
                    { label: 'Dispatch Days', value: 'Mon & Thu Routes', icon: Truck },
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
                    href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20am%20interested%20in%20booking%20the%20${encodeURIComponent(currentStrain.name)}%20broiler%20allotment.`}
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

          {/* TAB 2: Feed & Profitability Calculator */}
          {activeTab === 'calculator' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Inputs Column */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-7 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 mb-1">
                    Broiler Batch Feed &amp; Revenue Modeler
                  </h3>
                  <p className="text-xs text-slate-600">
                    Adjust flock size, target harvest age, and live bird market prices to forecast feed requirements and gross turnover:
                  </p>
                </div>

                {/* Slider 1: Flock Size */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700 uppercase tracking-wider">Number of Broilers Stocked</label>
                    <span className="font-black text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg text-sm font-heading">
                      {flockSize.toLocaleString()} Birds
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={10000}
                    step={50}
                    value={flockSize}
                    onChange={(e) => setFlockSize(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600">
                    <span>100 birds (2 cartons)</span>
                    <span>1,000 birds</span>
                    <span>10,000 birds (200 cartons)</span>
                  </div>
                </div>

                {/* Selector 2: Harvest Age */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Target Harvest Age &amp; Weight Goal
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { days: 38, label: '38 Days', weight: '2.15 kg' },
                      { days: 42, label: '42 Days', weight: '2.45 kg' },
                      { days: 49, label: '49 Days', weight: '2.85 kg' },
                    ].map((opt) => (
                      <button
                        key={opt.days}
                        type="button"
                        onClick={() => setHarvestAgeDays(opt.days)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          harvestAgeDays === opt.days
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold font-heading">{opt.label}</div>
                        <div className={`text-[10px] ${harvestAgeDays === opt.days ? 'text-emerald-100' : 'text-slate-600'}`}>
                          ~{opt.weight}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider 3: Live Bird Price per kg */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700 uppercase tracking-wider">Live Bird Market Price (Per KG)</label>
                    <span className="font-black text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg text-sm font-heading">
                      ₦{livePricePerKg.toLocaleString()} / kg
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2500}
                    max={4500}
                    step={100}
                    value={livePricePerKg}
                    onChange={(e) => setLivePricePerKg(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600">
                    <span>₦2,500/kg (Regular wholesale)</span>
                    <span>₦3,200/kg (Avg)</span>
                    <span>₦4,500/kg (Festive retail)</span>
                  </div>
                </div>

                {/* Chick Price Estimate */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700 uppercase tracking-wider">Estimated Day-Old Chick Price</label>
                    <span className="font-black text-slate-800 bg-slate-200 px-2.5 py-1 rounded-lg text-sm font-heading">
                      ₦{chickPrice.toLocaleString()} / chick
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1600}
                    max={2500}
                    step={50}
                    value={chickPrice}
                    onChange={(e) => setChickPrice(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
                  />
                </div>

                <div className="text-[11px] text-slate-600 bg-white border border-slate-200 rounded-xl p-3 space-y-1">
                  <p className="font-semibold text-slate-800">Assumptions Used:</p>
                  <p>• 98.0% livability rate from brooding to harvest with verified chicks.</p>
                  <p>• Standard 1.68 FCR benchmark at 42 days (3.8kg–4.1kg feed per bird).</p>
                  <p>• 50+1 packaging rule ({cartonsNeeded} cartons with {cartonsNeeded} free bonus chicks).</p>
                </div>
              </div>

              {/* Output Dashboard Column */}
              <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-7 lg:p-9 border border-emerald-950 shadow-xl space-y-6">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
                    Projected Harvest &amp; Revenue
                  </span>
                  <h3 className="text-2xl font-extrabold font-heading text-white mt-1">
                    {flockSize.toLocaleString()} Broilers at {harvestAgeDays} Days Output
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Live Weight Harvest</div>
                    <div className="text-3xl font-black text-white font-heading mt-1">{totalMeatKg.toLocaleString()} kg</div>
                    <div className="text-xs text-emerald-400 font-bold mt-1">~{targetWeightKg} kg / bird ({survivingBirds} birds)</div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Gross Batch Turnover</div>
                    <div className="text-3xl font-black text-[#2ee571] font-heading mt-1">
                      ₦{grossRevenue.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-300 font-medium mt-1">At ₦{livePricePerKg.toLocaleString()} / kg</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Feed Requirement</div>
                    <div className="text-2xl font-black text-white font-heading mt-1">{totalFeedBags} Bags</div>
                    <div className="text-xs text-slate-400 mt-1">{totalBatchFeedKg.toLocaleString()} kg (in 25kg bags)</div>
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
                    Ready to book your {flockSize.toLocaleString()} broiler allocation for the upcoming dispatch?
                  </p>
                  <a
                    href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20used%20your%20broiler%20calculator%20and%20want%20to%20book%20an%20allotment%20for%20${flockSize}%20day-old%20broilers.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-xs font-heading whitespace-nowrap shadow-md"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Lock Booking On WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 42-Day Broiler Feeding, Weight Gain & Vaccination Timetable */}
          {activeTab === 'timetable' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm text-slate-700 leading-relaxed max-w-4xl">
                <p>
                  <strong>The 42-Day Broiler Speed Mandate:</strong> Commercial broilers grow faster than any other domestic animal. Missing target temperature by 2°C on Day 3 or delaying Gumboro vaccination by 48 hours can permanently ruin feed conversion. Follow these 4 standard phases:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BROILER_PHASES.map((phase, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl bg-white border border-slate-200 p-7 space-y-4 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                          {phase.days}
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
                          <span className="text-slate-600 text-[10px] uppercase font-bold block">Daily Feed / Bird:</span>
                          <strong className="text-slate-800">{phase.dailyIntake}</strong>
                        </div>
                      </div>
                      <div className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-800">Dietary Formulation:</strong> {phase.feedType}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-800">Management Action:</strong> {phase.keyActions}
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

          {/* TAB 4: The D-AminGrow Quality Framework */}
          {activeTab === 'framework' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  pillar: 'Pillar 01',
                  title: 'Verified Primary Sourcing Only',
                  description: 'All broiler chicks come directly from certified parent-stock hatcheries (Chi, Amo, Zartech, Supreme). Zero unverified multiplier eggs, zero low-weight rejects.',
                  badge: 'Direct Parent Pedigree',
                  icon: Feather,
                },
                {
                  pillar: 'Pillar 02',
                  title: '50+1 Packaging Livability Buffer',
                  description: 'Every carton contains 50 chicks plus 1 free bonus chick (51 total). This buffer guarantees your pen starts with 100% of your paid count after interstate transit.',
                  badge: '100% Stocking Guard',
                  icon: ShieldCheck,
                },
                {
                  pillar: 'Pillar 03',
                  title: 'Marek’s Disease (HVT) Hatchery Vaccination',
                  description: 'Vaccinated at hatch with certified HVT subcutaneous biologicals, shielding your commercial broilers from immunosuppression and early mortality.',
                  badge: 'Hatchery Pre-Immunized',
                  icon: Thermometer,
                },
                {
                  pillar: 'Pillar 04',
                  title: 'Synchronized Early-Morning Route Clearing',
                  description: 'Dispatched exclusively on cool Monday and Thursday mornings in climate-monitored vehicles to prevent road heat stress, dehydration, and panting.',
                  badge: 'Zero Road Heat Exhaustion',
                  icon: Truck,
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
          5. UNIQUE INFORMATION GAIN: 3 Advanced Broiler Insights
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Sparkles className="h-4 w-4 text-emerald-700" />
              Information Gain · Practical Broiler Science
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              3 Broiler Management Realities Competitors Never Explain
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Broiler profitability in Nigeria is won in the margins. These three practical frameworks separate profitable farmers from those losing capital:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 'Insight 01',
                title: 'The 7-Day Weight Multiplier Rule',
                importance: 'Why Day-7 body weight determines your 42-day slaughter weight',
                body: 'Commercial broiler science proves that a chick must multiply its day-old weight (approx. 40g) by 4.5× to 5.0× by Day 7 (target: 180g–200g). Every 1 gram of body weight lost at Day 7 translates to a 7g to 10g weight deficit at slaughter (Day 42). If your brooding fails in the first week, your broilers permanently forfeit 350g to 500g of market weight, no matter how much finisher feed you give them later.',
                data: 'Target: 180g–200g at Day 7 · Minimum 4.5× hatch weight',
                icon: Scale,
              },
              {
                step: 'Insight 02',
                title: 'FCR vs. Feed Price: The Expensive Cheap Feed Trap',
                importance: 'Why a ₦15,000 feed bag often bankrupts farmers faster than an ₦18,500 bag',
                body: 'Consider 1,000 broilers raised to 2.4kg. On a premium feed with an FCR of 1.65, the flock eats 3,960kg of feed (158.4 bags @ ₦18,500 = ₦2,930,400). On a low-density "cheap" feed with an FCR of 2.10, the flock must eat 5,040kg of feed (201.6 bags @ ₦15,500 = ₦3,124,800). The "cheap" feed cost ₦194,400 more while adding 7 days of risk, labor, and water costs.',
                data: 'Math reality: 0.1 FCR improvement = ~₦150 saved per bird',
                icon: DollarSign,
              },
              {
                step: 'Insight 03',
                title: 'The 50+1 Standard Carton Rule & Farm Gate Navel Audit',
                importance: 'Physical quality checklist before signing driver waybill receipts',
                body: 'Certified hatcheries package broilers in 50-bird cartons with 1 free buffer chick (51 total). Upon delivery, inspect 10 random chicks per carton: the navel button must be completely dry and closed without dark scabs; shanks must be smooth and waxy (not dry or chalky from heat exhaustion); hocks must show zero red bruising; and chicks placed on their backs must right themselves within 3 seconds.',
                data: 'Audit threshold: 100% dry navels · <1.0% transit fatigue',
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
          6. REAL COMMERCIAL FARM RESULTS: Taghini Farm Case Study
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
                  Taghini Farm: 4,500 Broilers Hitting 2.45kg Average Live Weight at 42 Days
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Located in the Western commercial agro-zone, Taghini Farm previously suffered from erratic week-6 broiler weights and high brooding losses due to unverified middleman supply. In October 2026, the farm switched exclusively to D-AminGrow direct certified parent-stock allocations:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-black text-white font-heading">98.8%</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Week-1 Livability</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-black text-white font-heading">2.45 kg</div>
                    <div className="text-[10px] text-emerald-400 font-bold">42-Day Live Weight</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-black text-white font-heading">1.68</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Batch Average FCR</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl sm:text-2xl font-black text-white font-heading">10,900 kg</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Marketable Meat Sold</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic border-l-2 border-emerald-500 pl-3">
                  &ldquo;The delivery arrived at our farm gate early morning in well-ventilated cartons with full bonus chicks. Brooding mortality at Day 7 was under 1.2%. At week 6, our average live weight reached 2.45kg. Their booking transparency and market rate updates are the most dependable in the region.&rdquo;
                  <span className="block text-emerald-400 font-bold mt-1">— Operations Director, Taghini Farm</span>
                </p>
              </div>

              <div className="lg:col-span-5 bg-black/50 border border-white/10 rounded-2xl p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <Scale className="h-7 w-7" />
                </div>
                <div className="text-lg font-bold font-heading text-white">Secure Your Broiler Batch Quota</div>
                <p className="text-xs text-slate-300">
                  Join hundreds of commercial broiler producers across Nigeria who rely on D-AminGrow for guaranteed Monday and Thursday parent-stock allotments.
                </p>
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20read%20the%20Taghini%20Farm%20case%20study%20and%20want%20to%20book%20day-old%20broilers."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-xs font-heading shadow-lg"
                >
                  <MessageCircle className="h-4 w-4" />
                  Connect With Broiler Booking Desk
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
              We May Not Be The Right Broiler Partner For You If…
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              We operate an uncompromising primary parent-stock model. We are intentionally not the cheapest source on the open market:
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
                  <span>You are shopping strictly for the lowest sticker price in town without regard for primary breeder accreditation, navel healing, or parent-stock age.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-black">•</span>
                  <span>You expect random same-day doorstep dispatch without advance booking into certified Monday and Thursday hatchery clearing runs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-black">•</span>
                  <span>You plan to cut corners on brooding heat or feed sub-standard low-protein mash and blame the chicks for poor 6-week weight.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-black">•</span>
                  <span>You want to purchase single-digit loose chicks out of broken cartons from informal roadside aggregators.</span>
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
                  <span>You operate a commercial meat enterprise and need broilers that reliably hit 2.4kg+ at 42 days with consistent 1.65–1.75 FCR.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-black">•</span>
                  <span>You insist on the 50+1 packaging rule and certified Marek’s HVT hatchery immunization on Day 1.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-black">•</span>
                  <span>You want verifiable hatchery waybill receipts from Chi, Amo, Zartech, or Supreme with official batch tracking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-black">•</span>
                  <span>You value practical clinical veterinary advisory from early brooding temperature control through final market harvest.</span>
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
              Common Questions About Day-Old Broiler Chicks Price in Nigeria
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Clear, practical answers about commercial broiler bookings, weekly price fluctuations, and dispatch rules:
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
            <p className="text-xs text-slate-500 mb-3">Have a question about your farm location, pen ventilation, or feed brand?</p>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20have%20a%20question%20about%20booking%20commercial%20day-old%20broilers."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-bold text-sm underline decoration-emerald-500 underline-offset-4"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Ask Our Broiler Technical Desk Directly On WhatsApp</span>
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

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Stop Gambling With Stunted Chicks. Stock Certified Broiler Genetics.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Feed is too expensive to waste on uncertified genetics. Lock in verified Ross 308, Cobb 500, or Arbor Acres Plus day-old broilers for next Monday or Thursday nationwide dispatch.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20am%20ready%20to%20book%20commercial%20day-old%20broilers%20for%20the%20upcoming%20dispatch."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Book Verified Broilers On WhatsApp
            </a>
            <Link
              href="/day-old-chicks"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
            >
              Explore All Day-Old Chicks
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Zenith Bank Deposit Box */}
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
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 50+1 Packaging Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Direct Hatchery Allotments Only
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
