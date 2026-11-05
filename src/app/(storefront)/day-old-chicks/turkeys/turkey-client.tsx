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
  Phone,
  Feather,
  ChevronRight,
  Clock,
  Sparkles,
  Layers,
  Thermometer,
  XCircle,
  Users,
  Copy,
  Check,
  TrendingUp,
  Zap,
  Scale,
  Award,
  AlertTriangle,
  Flame,
  Info,
} from 'lucide-react';

interface StrainInfo {
  id: string;
  name: string;
  badge: string;
  cartonCount: number;
  cartonPriceEstimate: string;
  cartonPriceNumber: number;
  perBirdEstimate: string;
  targetHarvest: string;
  targetWeightKg: number;
  maturityWeeks: string;
  starterProtein: string;
  livability: string;
  bestFor: string;
  description: string;
}

const TURKEY_STRAINS: StrainInfo[] = [
  {
    id: 'foreign',
    name: 'Foreign Nicholas White / Hybrid Converter',
    badge: 'Heavy Exotic Parentage',
    cartonCount: 30,
    cartonPriceEstimate: '₦165,000 – ₦275,000',
    cartonPriceNumber: 210000,
    perBirdEstimate: '₦5,500 – ₦9,100',
    targetHarvest: '10.5kg – 14.0kg (Toms) / 7.0kg – 9.0kg (Hens)',
    targetWeightKg: 11.5,
    maturityWeeks: '18 – 22 Weeks',
    starterProtein: '28% Crude Protein (Pre-Starter)',
    livability: '95.2% Target Livability',
    bestFor: 'Commercial festive fattening, hotel/restaurant carcass dressing, high-revenue meat sales',
    description:
      'Premier broad-breasted white genetic line imported from certified breeding parent stock. Unmatched feed-to-meat conversion and heavy carcass deposition when brooded under high initial temperatures (35°C–37°C) and 28% protein starter rations.',
  },
  {
    id: 'local',
    name: 'Local & Hybrid Bronze Turkey',
    badge: 'Hardy Acclimatized Lineage',
    cartonCount: 40,
    cartonPriceEstimate: '₦120,000 – ₦175,000',
    cartonPriceNumber: 145000,
    perBirdEstimate: '₦3,000 – ₦4,375',
    targetHarvest: '5.5kg – 7.5kg (Toms) / 4.0kg – 5.0kg (Hens)',
    targetWeightKg: 6.2,
    maturityWeeks: '22 – 26 Weeks',
    starterProtein: '24% – 26% Crude Protein',
    livability: '96.8% Target Livability',
    bestFor: 'Semi-intensive farm setups, backyard rearing, lower startup capital, traditional festive markets',
    description:
      'Acclimatized bronze and colored turkey lineage bred for high climate resilience in tropical conditions. Superior resistance to environmental stressors, flexible foraging capability, and robust demand in traditional Nigerian open-air live bird markets.',
  },
];

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'What is the current day-old turkey poults price in Nigeria today?',
    a: 'Day-old turkey poult prices in Nigeria vary depending on genetic lineage and weekly parent-stock availability. Foreign Nicholas White / Hybrid Converter poults are packaged in 30-poult cartons and typically trade between ₦165,000 and ₦275,000 per carton (₦5,500 – ₦9,100 per poult). Local and hybrid bronze turkeys are packaged in 40-poult cartons and trade between ₦120,000 and ₦175,000 per carton (₦3,000 – ₦4,375 per poult). All bookings follow official Monday and Thursday dispatch clearing.',
  },
  {
    q: 'Why are Foreign Turkey poults packed in 30s while Local Turkeys are packed in 40s?',
    a: 'Foreign broad-breasted poults have significantly larger skeletal frames and higher metabolic oxygen demands. International breeder welfare standards mandate maximum 30 poults per ventilated carton (often partitioned into 4 quadrants of 7–8 poults) to avoid transit smothering and heat exhaustion. Local strains are slightly smaller at hatch and safely ship in 40-poult cartons.',
  },
  {
    q: 'What brooding temperature is mandatory for day-old turkey poults?',
    a: 'Turkey poults require 35°C to 37°C during Week 1 — approximately 3°C to 4°C hotter than broiler chicks. Inadequate brooding heat is the number one cause of early mortality, huddled pile-ups, and weak navels. Reduce temperature by 2.5°C each week until birds are fully feathered at week 5 to 6.',
  },
  {
    q: 'Why must turkey poults be fed 28% Crude Protein starter instead of broiler feed?',
    a: 'Turkeys grow skeletal bone and pectoral muscle mass twice as fast as broilers relative to their body weight. Feeding standard 20%–22% broiler starter leads to severe protein starvation, rickets, spraddle legs, and slipped tendon syndrome (perosis). Poults must receive a specialized 28% CP Turkey Pre-Starter crumble for the first 4 weeks.',
  },
  {
    q: 'What causes spraddle or splayed legs in young poults and how do I prevent it?',
    a: 'Spraddle leg happens when poults are placed on smooth, slippery bedding (such as printed newspapers, smooth nylon, or glossy cardboard boxes). Their tender hip joints slip outward and freeze permanently. Always brood poults on rough burlap sacks, coarse corrugated carton paper, or dry wood shavings to give their footpads firm grip.',
  },
  {
    q: 'When should I stock turkey poults to target Christmas market sales?',
    a: 'Foreign Nicholas White toms take 18 to 22 weeks to attain prime 11kg–14kg carcass weights. To hit the peak December 15–25 festive market, you must brood your poults between late June and mid-July. Booking in October is too late for commercial toms and results in undersized 4kg birds sold at heavy discounts.',
  },
  {
    q: 'What days are turkey poults dispatched nationwide?',
    a: 'Shipments depart verified partner hatcheries in Ibadan, Oyo, and Ogun State every Monday and Thursday morning. Orders and bank clearing must be confirmed 48 hours prior to secure quota allotment from the hatching pull.',
  },
  {
    q: 'How do I pay securely for my turkey reservation?',
    a: 'All official payments clear strictly to our corporate bank account: Zenith Bank Plc, Account Number: 1017894562, Account Name: D-AminGrow Agric Ltd. We never accept payments into personal or agent accounts. Official booking slips are issued immediately upon confirmation.',
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
  const [selectedStrain, setSelectedStrain] = useState<string>('foreign');
  const [cartonCount, setCartonCount] = useState<number>(2);
  const [copiedBank, setCopiedBank] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeStrain: StrainInfo =
    TURKEY_STRAINS.find((s) => s.id === selectedStrain) ?? TURKEY_STRAINS[0]!;

  const totalPoults = cartonCount * activeStrain.cartonCount;
  const estimatedTotalCost = cartonCount * activeStrain.cartonPriceNumber;
  const projectedMarketRevenue = totalPoults * (activeStrain.id === 'foreign' ? 85000 : 45000);
  const projectedGrossMargin = projectedMarketRevenue - estimatedTotalCost - (totalPoults * (activeStrain.id === 'foreign' ? 32000 : 18000));

  const copyBankDetails = () => {
    navigator.clipboard.writeText('1017894562');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello D-AminGrow Booking Desk, I would like to reserve ${cartonCount} carton(s) of ${activeStrain.name} (${totalPoults} poults) for the upcoming dispatch (${nextMonday} / ${nextThursday}). Please provide today's confirmed hatchery allocation rate.`
  );

  return (
    <div className="bg-[#0A192F] text-slate-100 min-h-screen selection:bg-emerald-500 selection:text-white">
      {/* =========================================================================
          HERO SECTION (2 Grid Columns, Homepage Typography & Buttons)
      ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-emerald-950/40">
        {/* Ambient Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.18),rgba(10,25,47,0))]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link
              href="/day-old-chicks"
              className="hover:text-emerald-400 transition-colors"
            >
              Day-Old Chicks
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-emerald-400 font-medium">Turkey Poults</span>
          </nav>

          {/* 2 GRID COLUMNS HERO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column (Content & Value Proposition) - 7 cols */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Tag & Schedule Badge */}
              <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Nationwide Dispatch: Mondays & Thursdays</span>
                <span className="text-slate-500 hidden sm:inline">|</span>
                <span className="text-slate-300 hidden sm:inline">48-Hr Order Cutoff</span>
              </div>

              {/* Exact H1 with Homepage Font Size */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                Turkey Poults Price in Nigeria: Foreign & Local Day-Old Turkeys
              </h1>

              {/* Revenue & Hardiness Focused Description */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Protect your commercial turkey capital before dispatch. Certified Nicholas White foreign genetics capable of reaching 10kg to 14kg carcass weights, alongside hardy acclimatized local bronze poults. Direct parent-stock allocations, 35°C brooding protocols, and climate-buffered transit to every state.
              </p>

              {/* Quick Trust Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 pb-2">
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Thermometer className="w-4 h-4 text-emerald-400" />
                    <span>35°C–37°C</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Brooding guide included</p>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Scale className="w-4 h-4 text-emerald-400" />
                    <span>11kg–14kg</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Nicholas White harvest</p>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>30 / 40 Pack</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Ventilated carton standard</p>
                </div>
              </div>

              {/* CTA Button Group (Homepage Button Style, First Letter Capitalized) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href={`https://wa.me/2348139169402?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Chat With Turkey Dispatcher</span>
                </Link>

                <Link
                  href="#pricing-calculator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Turkey Poults</span>
                </Link>

                <Link
                  href="#strains-matrix"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-sm sm:text-base border border-white/10 transition-colors"
                >
                  <span>Compare Strains</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Next Batch Confirmation Banner */}
              <div className="flex items-center gap-3 pt-3 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  Next Available Dispatches:{' '}
                  <strong className="text-emerald-300">{nextMonday}</strong> &amp;{' '}
                  <strong className="text-emerald-300">{nextThursday}</strong>. Orders close 48 hours prior.
                </span>
              </div>
            </div>

            {/* Right Column (Interactive Turkey Investment Card) - 5 cols */}
            <div className="lg:col-span-5" id="pricing-calculator">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-emerald-500/30 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
                {/* Visual Status Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                      Live Quota &amp; ROI Simulator
                    </span>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-medium">
                    Parent Stock Direct
                  </span>
                </div>

                {/* Strain Toggle Tabs */}
                <div className="mt-5 space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Select Turkey Genetic Line
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
                    {TURKEY_STRAINS.map((strain) => (
                      <button
                        key={strain.id}
                        type="button"
                        onClick={() => setSelectedStrain(strain.id)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                          selectedStrain === strain.id
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {strain.id === 'foreign' ? 'Foreign Nicholas White' : 'Local / Bronze Hybrid'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Carton Volume Stepper */}
                <div className="mt-5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider">
                      Carton Quantity
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {activeStrain.cartonCount} Poults / Carton
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-950/80 rounded-xl border border-slate-800 p-2">
                    <button
                      type="button"
                      onClick={() => setCartonCount(Math.max(1, cartonCount - 1))}
                      className="w-10 h-10 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-lg text-slate-200 transition-colors"
                      disabled={cartonCount <= 1}
                    >
                      -
                    </button>
                    <div className="text-center">
                      <span className="text-xl font-extrabold text-white">
                        {cartonCount} {cartonCount === 1 ? 'Carton' : 'Cartons'}
                      </span>
                      <p className="text-[11px] text-slate-400">
                        ({totalPoults} Live Poults + Standard Extra Buffer)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCartonCount(cartonCount + 1)}
                      className="w-10 h-10 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-lg text-slate-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Live Calculated Stats Box */}
                <div className="mt-5 rounded-xl bg-slate-950/90 border border-slate-800/80 p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Estimated Carton Rate:</span>
                    <span className="text-slate-200 font-bold">{activeStrain.cartonPriceEstimate}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Per Poult Benchmark:</span>
                    <span className="text-slate-200 font-bold">{activeStrain.perBirdEstimate}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Target Harvest Weight:</span>
                    <span className="text-emerald-400 font-bold">{activeStrain.targetHarvest}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Starter Feed Requirement:</span>
                    <span className="text-amber-400 font-semibold">{activeStrain.starterProtein}</span>
                  </div>
                </div>

                {/* Live Commercial Return Projection */}
                <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-emerald-300">
                    <span>Projected Mature Farmgate Value:</span>
                    <span>₦{projectedMarketRevenue.toLocaleString()}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Based on typical festive farmgate sales (₦{activeStrain.id === 'foreign' ? '85,000+' : '45,000+'} per mature bird at 20–22 weeks).
                  </p>
                </div>

                {/* Action CTA */}
                <div className="mt-6 space-y-2">
                  <Link
                    href={`https://wa.me/2348139169402?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Confirm Allocation on WhatsApp</span>
                  </Link>

                  <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Hatchery certified stock · Ventilated transit boxes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WHY MOST TURKEY REARING PROJECTS FAIL IN WEEKS 1 TO 4
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold tracking-wide uppercase">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Capital Risk Prevention</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Why Most Commercial Turkey Projects Fail in Weeks 1 to 4
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Turkeys are not large broilers. They have distinct biological requirements. When novice farmers treat day-old poults like standard chickens, mortality spikes above 30% within 14 days. Here is the operational truth competitors rarely disclose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Fatal Mistake 1 */}
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 sm:p-7 relative group hover:border-rose-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-5">
                <Thermometer className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
                1. Brooding Heat Deficit (Under 35°C)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Day-old broiler chicks thrive at 32°C, but turkey poults possess poor thermoregulation and need <strong className="text-rose-300">35°C to 37°C</strong> during Week 1. When the brooding pen falls below 33°C, poults stop eating, crowd together in corners, and suffer fatal smothering within hours.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                D-AminGrow provides a 35°C brooding heating chart with every booking.
              </div>
            </div>

            {/* Fatal Mistake 2 */}
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 sm:p-7 relative group hover:border-rose-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
                2. Feeding Low-Protein Starter Rations
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Broiler starter feed contains 20%–22% Crude Protein. Turkeys require <strong className="text-amber-300">28% Crude Protein</strong> during the first 4 weeks to build dense bone mineral framework. Feeding low-protein rations induces rickets, stunted growth, and perosis (slipped Achilles tendon).
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                We supply high-protein pre-starter crumb formulas to protect bone density.
              </div>
            </div>

            {/* Fatal Mistake 3 */}
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 sm:p-7 relative group hover:border-rose-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
                3. Slippery Bedding &amp; Spraddle Legs
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Novice farmers brood poults on glossy cardboard or newspaper. Turkey poults have delicate foot joints; smooth surfaces cause legs to slip sideways permanently (spraddle leg syndrome). Once spraddled, birds cannot stand to feed and must be culled.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                Use coarse burlap, corrugated anti-skid paper, or dry wood shavings.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 (INFORMATION GAIN): FOREIGN NICHOLAS WHITE VS. LOCAL BRONZE
      ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-slate-800" id="strains-matrix">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              <Scale className="w-3.5 h-3.5" />
              <span>Strain Economics &amp; Harvest Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Foreign Nicholas White vs. Local Bronze: The Real Carcass Performance
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Do not overpay for local crosses expecting 13kg birds, and do not buy high-performing foreign genetics without budgeting for 28% protein starter feed. Match your genetic strain to your specific target market.
            </p>
          </div>

          {/* Desktop & Tablet Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300 min-w-[700px]">
              <thead className="bg-slate-900/90 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6">Commercial Metric</th>
                  <th className="py-4 px-6 text-emerald-400 bg-emerald-950/30">
                    Foreign Nicholas White / Hybrid
                  </th>
                  <th className="py-4 px-6 text-amber-400 bg-amber-950/20">
                    Local &amp; Hybrid Bronze Turkey
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                <tr className="hover:bg-slate-900/40">
                  <td className="py-4 px-6 font-semibold text-white">Carton Packaging Standard</td>
                  <td className="py-4 px-6 text-emerald-300 bg-emerald-950/10 font-bold">
                    30 Poults / Carton (+1 extra buffer)
                  </td>
                  <td className="py-4 px-6 text-amber-300 bg-amber-950/10 font-bold">
                    40 Poults / Carton (+1 extra buffer)
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-4 px-6 font-semibold text-white">Target Weight (Toms) at 20–22 Wks</td>
                  <td className="py-4 px-6 text-emerald-300 bg-emerald-950/10 font-bold">
                    10.5kg – 14.0kg Live Weight
                  </td>
                  <td className="py-4 px-6 text-slate-200 bg-amber-950/10">
                    5.5kg – 7.5kg Live Weight
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-4 px-6 font-semibold text-white">Target Weight (Hens) at 18–20 Wks</td>
                  <td className="py-4 px-6 text-emerald-300 bg-emerald-950/10 font-bold">
                    7.0kg – 9.0kg Live Weight
                  </td>
                  <td className="py-4 px-6 text-slate-200 bg-amber-950/10">
                    4.0kg – 5.0kg Live Weight
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-4 px-6 font-semibold text-white">Starter Feed Crude Protein (Weeks 0–4)</td>
                  <td className="py-4 px-6 text-amber-400 bg-emerald-950/10 font-bold">
                    28% CP Pre-Starter Crumble (Mandatory)
                  </td>
                  <td className="py-4 px-6 text-slate-300 bg-amber-950/10">
                    24% – 26% CP High-Protein Starter
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-4 px-6 font-semibold text-white">Estimated Farmgate Harvest Value</td>
                  <td className="py-4 px-6 text-emerald-400 bg-emerald-950/10 font-bold">
                    ₦85,000 – ₦120,000 / Tom
                  </td>
                  <td className="py-4 px-6 text-amber-400 bg-amber-950/10 font-bold">
                    ₦45,000 – ₦65,000 / Tom
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-4 px-6 font-semibold text-white">Primary Target Sales Channel</td>
                  <td className="py-4 px-6 text-slate-300 bg-emerald-950/10">
                    Hotels, frozen meat processors, high-net-worth festive direct buyers
                  </td>
                  <td className="py-4 px-6 text-slate-300 bg-amber-950/10">
                    Open traditional live-bird markets, village festive buyers, family rearing
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-4 px-6 font-semibold text-white">Recommended Farmer Archetype</td>
                  <td className="py-4 px-6 text-emerald-300 bg-emerald-950/10 font-semibold">
                    Commercial operators with controlled brooding pens and feed access
                  </td>
                  <td className="py-4 px-6 text-slate-300 bg-amber-950/10 font-semibold">
                    Semi-intensive and rural farmers seeking rugged climate resilience
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quick Practical Opinion Callout */}
          <div className="mt-8 p-5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-bold text-sm">
                Our Practical Opinion on Turkey Selection:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                If your farm is targeting maximum revenue from December corporate buyers, hotels, or prime retail cuts, <strong className="text-emerald-300">Foreign Nicholas White is the only commercial option</strong> that yields 11kg+ toms. However, if you are rearing on semi-free range or cannot access 28% CP feed, choose <strong className="text-amber-300">Local Bronze turkeys</strong> to prevent leg weaknesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE 20-WEEK COMMERCIAL TURKEY FATTENING PROTOCOL
      ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>Phased Fattening Protocol</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              The 3-Phase Commercial Turkey Rearing Blueprint
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Turkeys cannot be reared haphazardly. Follow this 3-phase nutritional and brooding progression to harvest heavy 12kg toms without leg defects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phase 1 */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-7 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                    Weeks 0 to 4
                  </span>
                  <span className="text-xs text-slate-400">Phase 1</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Pre-Starter Brooding &amp; Skeletal Base
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Start brooding at 35°C–37°C. Feed exclusive 28% Crude Protein Pre-Starter crumble. Use bright 24-hour lighting for the first 3 days because turkey poults have poor eyesight and need direct illumination over feed trays.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Non-skid bedding (rough burlap or coarse shavings)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Electrolytes and vitamin AD3E in first 5 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Reduce temperature by 2.5°C weekly</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-emerald-400">
                Target Weight: 850g – 1.1kg at 4 Weeks
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-7 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                    Weeks 5 to 12
                  </span>
                  <span className="text-xs text-slate-400">Phase 2</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Turkey Grower &amp; Frame Development
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Transition to 22%–24% CP Turkey Grower Mash. Poults are fully feathered and transferred to well-ventilated open-sided pens with deep dry litter. Perches must be placed low to avoid leg fractures upon dismounting.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Deworming and Newcastle (Komorov) booster</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Continuous water access (turkeys drink 2.5x feed volume)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Biosecurity check against Fowl Pox and Blackhead</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-emerald-400">
                Target Weight: 4.5kg – 6.0kg at 12 Weeks
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-7 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                    Weeks 13 to 22+
                  </span>
                  <span className="text-xs text-slate-400">Phase 3</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  High-Energy Finisher &amp; Festive Conditioning
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Shift to high-energy 18%–20% CP Turkey Finisher. Heavy grain energy (maize, wheat bran, and oil seed cakes) deposits broad pectoral meat and juicy intramuscular fat demanded by prime hotel chefs and festive consumers.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>High-energy finishing to deposit tender breast meat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Separate toms and hens to prevent aggressive treading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Direct farmgate weigh-in and live festive marketing</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-emerald-400">
                Target Weight: 10.5kg – 14.0kg (Toms) at Harvest
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: 20-WEEK FESTIVE MARKET BOOKING CALENDAR
      ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              <Calendar className="w-3.5 h-3.5" />
              <span>Festive Market Strategy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              The 20-Week Counting Rule for Maximum Festive ROI
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              In the Nigerian livestock trade, timing is 70% of your profit margin. Turkeys booked too late sell at severe discounts because buyers demand large 10kg+ birds for Christmas and Easter feasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Christmas Window */}
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 p-6 relative">
              <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full">
                Highest Volume
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
                Christmas &amp; New Year Market
              </h3>
              <p className="text-xs text-emerald-400 font-semibold mb-4">
                Target Sales: December 15 – December 31
              </p>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Stocking Cutoff:</span>
                  <span className="font-bold text-white">Late June – Mid-July</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Rearing Span:</span>
                  <span className="font-bold text-white">20 – 24 Weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Carcass Weight:</span>
                  <span className="font-bold text-emerald-400">11kg – 14kg Toms</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-5 leading-relaxed">
                Prices peak at ₦90,000 to ₦120,000 per bird as corporate firms, caterers, and families buy live heavy toms for end-of-year celebrations.
              </p>
            </div>

            {/* Easter Window */}
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 relative">
              <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full">
                High Margins
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
                Easter Festive Market
              </h3>
              <p className="text-xs text-amber-400 font-semibold mb-4">
                Target Sales: March – April (Varies Annually)
              </p>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Stocking Cutoff:</span>
                  <span className="font-bold text-white">Late October – Early Nov</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Rearing Span:</span>
                  <span className="font-bold text-white">18 – 20 Weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Carcass Weight:</span>
                  <span className="font-bold text-amber-400">9.5kg – 12kg Toms</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-5 leading-relaxed">
                Lenten season conclusion creates high demand for prime dressed whole turkeys and live birds across urban centers.
              </p>
            </div>

            {/* Continuous Commercial Window */}
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 relative">
              <div className="absolute top-4 right-4 bg-cyan-500/20 text-cyan-400 text-xs font-bold px-2.5 py-1 rounded-full">
                Consistent Cashflow
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
                Hotels &amp; Barbecue Supply
              </h3>
              <p className="text-xs text-cyan-400 font-semibold mb-4">
                Target Sales: Rolling Monthly Contracts
              </p>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Stocking Cycle:</span>
                  <span className="font-bold text-white">Every 4 to 6 Weeks</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Harvest Stage:</span>
                  <span className="font-bold text-white">16 – 18 Weeks (8kg–10kg)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Market:</span>
                  <span className="font-bold text-cyan-400">Restaurants, Clubs, BBQ</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-5 leading-relaxed">
                Staggered batches eliminate revenue seasonality, keeping your farm cashflow steady throughout the calendar year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: WE MAY NOT BE THE RIGHT POULT SUPPLIER FOR YOU IF...
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Transparent Qualification
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                We May Not Be the Right Turkey Supplier for Your Farm If...
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                We protect poultry capital by being completely transparent about commercial operating realities. Please read this before placing your order.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-white">You cannot pre-heat your brooding house to 35°C:</strong>
                  <p className="text-slate-400 text-xs mt-1">
                    If you do not have reliable charcoal stoves, gas hovers, or infrared brooders ready before delivery, foreign turkey poults will freeze and pile up. We advise you to defer booking until heating equipment is fully installed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-white">You plan to feed standard 20% broiler starter feed:</strong>
                  <p className="text-slate-400 text-xs mt-1">
                    Turkeys will develop weak joints and leg paralysis on low-protein feeds. If you cannot secure 28% CP pre-starter, consider local bronze strains or hardy cockerels instead.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-white">You expect delivery without a 48-hour pre-booking:</strong>
                  <p className="text-slate-400 text-xs mt-1">
                    Day-old turkeys are hatched to order from certified breeding lines. We do not store live poults in warehouses. All allotments require advance clearing strictly on Monday and Thursday schedules.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-white">You require credit terms or post-harvest payment:</strong>
                  <p className="text-slate-400 text-xs mt-1">
                    All parent-stock allocations clear directly through Zenith Bank Plc prior to hatchery release. We do not offer credit allocations under any circumstances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: VERIFIED COMMERCIAL FARMER RESULTS & REVIEWS
      ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              <Users className="w-3.5 h-3.5" />
              <span>Commercial Track Records</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Verified Commercial Turkey Farmer Results
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Read how serious livestock farm managers across Nigeria scaled their turkey fattening enterprises with D-AminGrow hatchery allocations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Review 1 */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;I booked 4 cartons (120 foreign poults) in early July for our Christmas sales. D-AminGrow supplied the 35°C brooding chart and pre-starter feed formulation. We lost only 3 birds throughout the 21 weeks. The toms averaged 12.4kg live weight, and we sold out at ₦95,000 each before December 20th.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <p className="text-white font-bold text-sm">Pastor David Okonkwo</p>
                <p className="text-xs text-slate-400">Grace Haven Agro-Ventures, Asaba, Delta State</p>
                <span className="inline-block mt-2 text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                  Verified Nicholas White Producer · 4 Cartons
                </span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;Most hatcheries in Ibadan sell mixed local turkeys and claim they are foreign. D-AminGrow is honest. I ordered 3 cartons of Local Bronze turkeys for my semi-intensive farm. True to their word, zero spraddle legs, zero transit mortality. They grew vigorously on local grain mash.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <p className="text-white font-bold text-sm">Alhaja Kudirat Adeleke</p>
                <p className="text-xs text-slate-400">Adeleke Poultry Enterprise, Iwo Road, Ibadan</p>
                <span className="inline-block mt-2 text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                  Verified Local Bronze Farmer · 3 Cartons
                </span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;We supply barbecue grills and hotel kitchens in Abuja. D-AminGrow handles our rolling monthly allocations of 60 poults. The transit box packaging is proper ventilated standard, and the dispatch arrives early Thursday mornings without stress.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <p className="text-white font-bold text-sm">Engr. Kenneth Uba</p>
                <p className="text-xs text-slate-400">Apex Livestock Farms, Karu, Nasarawa / Abuja</p>
                <span className="inline-block mt-2 text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                  Verified Monthly Supplier · Abuja Route
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: INTERACTIVE ACCORDION FAQ
      ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-900/40 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              <Info className="w-3.5 h-3.5" />
              <span>Everything You Need to Know</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Frequently Asked Questions About Day-Old Turkeys in Nigeria
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Clear answers on pricing, brooding heat management, feeding requirements, and nationwide logistics.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-white text-base sm:text-lg hover:text-emerald-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-90 text-emerald-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-900/80">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: CLOSING SOFT CTA & OFFICIAL BANK PAYMENT VERIFICATION
      ========================================================================= */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(16,185,129,0.12),rgba(10,25,47,0))]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 p-8 sm:p-12 shadow-2xl space-y-8">
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
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
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

            {/* Bottom CTA Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href={`https://wa.me/2348139169402?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base shadow-xl shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Chat With Turkey Dispatcher</span>
              </Link>

              <Link
                href="tel:+2348139169402"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Hotline (+234 813 916 9402)</span>
              </Link>
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
