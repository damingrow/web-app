'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Scale,
  MessageCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Package,
  TrendingDown,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Layers,
  Star,
  Info,
  DollarSign,
  Activity,
  Calculator,
} from 'lucide-react';

const BENCHMARKS = [
  { label: 'Feed Share of Cost', value: '70%–75%', sub: 'largest farm expense', color: 'text-emerald-400' },
  { label: 'Target FCR (6 Wks)', value: '1.55–1.65', sub: 'commercial standard', color: 'text-cyan-400' },
  { label: 'Savings per 0.1 FCR', value: '₦180,000+', sub: 'per 1,000 broilers', color: 'text-amber-400' },
  { label: 'Feed Wastage Audit', value: 'Instant', sub: 'naira value calculated', color: 'text-emerald-400' },
];

const FAILURE_POINTS = [
  {
    icon: TrendingDown,
    title: 'Feeder pan lip misadjustment causing 10%–15% litter spillage',
    desc: 'When feeders are hung too low or filled past the one-third line, broilers beak-scratch feed directly into wood shavings. You pay for bags that never turn into body mass.',
  },
  {
    icon: AlertTriangle,
    title: 'Subclinical coccidiosis & necrotic enteritis destroying gut villi',
    desc: 'Birds appear active, but their intestinal lining is inflamed. Feed passes through the gut partially undigested, pushing FCR from 1.60 up to 1.95+ without sudden mortalities.',
  },
  {
    icon: XCircle,
    title: 'Keeping commercial broilers past week 6 without economic review',
    desc: 'After 42 days, the feed needed for metabolic body maintenance surges. Muscle deposition slows down dramatically. Every additional day past 49 days rapidly erodes your profit margin.',
  },
  {
    icon: TrendingDown,
    title: 'Heat stress and warm drinking water depressing nutrient intake',
    desc: 'In Nigerian temperatures above 32°C, broilers pant continuously and reduce feed consumption during peak daylight. Without nighttime compensatory feeding, growth stalls while feed rots in pans.',
  },
];

const PILLARS = [
  {
    num: '01',
    icon: Scale,
    title: 'Feeder Height & Spillage Control',
    desc: 'Keep feeder lip aligned with the bird\'s back. Never fill past 1/3 capacity to prevent feed scratching and direct litter loss.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    num: '02',
    icon: Activity,
    title: 'Intestinal Integrity & Probiotics',
    desc: 'Protect mucosal villi with targeted anticoccidials and multi-strain probiotics to ensure 90%+ nutrient absorption.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    num: '03',
    icon: Layers,
    title: 'Water-to-Feed Intake Ratio',
    desc: 'Maintain a 2:1 water-to-feed consumption ratio with clean, cool water below 22°C to prevent biological feed refusal.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    num: '04',
    icon: DollarSign,
    title: 'Strict Target Harvest Scheduling',
    desc: 'Plan market slaughter between Day 38 and Day 44 when broiler biological feed conversion efficiency is at its peak.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
];

// INFORMATION GAIN: Economic Sensitivity Matrix
const SENSITIVITY_DATA = [
  { flock: '500 broilers', weight: '1,100 kg', fcr160: '₦1,654,400', fcr170: '₦1,757,800', fcr185: '₦1,912,900', lossAt185: '₦258,500' },
  { flock: '1,000 broilers', weight: '2,200 kg', fcr160: '₦3,308,800', fcr170: '₦3,515,600', fcr185: '₦3,825,800', lossAt185: '₦517,000' },
  { flock: '2,500 broilers', weight: '5,500 kg', fcr160: '₦8,272,000', fcr170: '₦8,789,000', fcr185: '₦9,564,500', lossAt185: '₦1,292,500' },
  { flock: '5,000 broilers', weight: '11,000 kg', fcr160: '₦16,544,000', fcr170: '₦17,578,000', fcr185: '₦19,129,000', lossAt185: '₦2,585,000' },
];

const HONESTY_FILTERS = [
  'You do not weigh your feed or count empty 25kg bags — calculating FCR requires accurate feed intake data.',
  'You do not sample-weigh your birds — guessing body weights leads to misleading conversion figures.',
  'You expect feed additives to fix FCR when your feeders are overflowing into dirty litter.',
  'You are looking for magic tricks rather than systematic farm management, biosecurity, and pen ventilation.',
];

const FAQ_DISPLAY = [
  {
    q: 'How do you calculate Feed Conversion Ratio (FCR) in poultry?',
    a: 'Feed Conversion Ratio (FCR) is calculated by dividing total feed consumed (in kg) by total live weight gained (in kg): FCR = Total Feed Consumed (kg) ÷ Total Live Weight Gained (kg). For example, if 1,000 broilers consume 3,300 kg of feed to reach 2,200 kg total live weight, FCR is 1.50.',
  },
  {
    q: 'What is a good FCR for commercial broilers in Nigeria?',
    a: 'In Nigeria, a good commercial broiler FCR at 6 weeks (42 days) is between 1.55 and 1.65 for breeds like Cobb 500 and Ross 308. An FCR below 1.50 is exceptional. An FCR above 1.85 indicates serious feed wastage, gut enteritis, or adulterated feed.',
  },
  {
    q: 'How much money does a 0.1 improvement in broiler FCR save?',
    a: 'Feed accounts for 70% to 75% of production cost. A 0.1 reduction in FCR on a 1,000-bird flock harvesting at 2.2 kg saves 220 kg of feed (approx. 8.8 bags of 25kg feed), translating to ₦180,000 to ₦205,000 in saved profit per cycle.',
  },
  {
    q: 'What causes poor FCR on Nigerian poultry farms?',
    a: 'Primary causes are feeder height misadjustments causing litter spillage (up to 15%), subclinical coccidiosis damaging the gut, heat stress depressing growth, and sub-standard feed lacking required amino acids.',
  },
  {
    q: 'Why does FCR increase as broilers get older?',
    a: 'As birds get heavier, more feed energy is diverted strictly to body maintenance rather than muscle growth. Beyond 6 to 7 weeks, growth slows while maintenance costs climb, causing FCR to rise toward 2.0+.',
  },
  {
    q: 'Can gut probiotics improve poultry FCR?',
    a: 'Yes. Multi-strain gut probiotics and exogenous enzymes improve digestibility and strengthen intestinal villi, delivering an average FCR improvement of 0.05 to 0.12 points during field trials.',
  },
];

export default function FcrCalculatorClient() {
  const [birdType, setBirdType] = useState<'broiler' | 'turkey' | 'noiler'>('broiler');
  const [harvestAgeWeeks, setHarvestAgeWeeks] = useState<number>(6);
  const [flockCount, setFlockCount] = useState<number>(500);
  const [feedInputUnit, setFeedInputUnit] = useState<'bags' | 'kg'>('bags');
  const [feedInputValue, setFeedInputValue] = useState<number>(70);
  const [avgLiveWeightKg, setAvgLiveWeightKg] = useState<number>(2.15);
  const [costPerBagNgn, setCostPerBagNgn] = useState<number>(23500);

  // Math conversions
  const safeFlock = Math.max(10, flockCount || 10);
  const safeWeight = Math.max(0.2, avgLiveWeightKg || 0.2);
  const totalWeightProducedKg = safeFlock * safeWeight;

  const totalFeedKg = feedInputUnit === 'bags' ? (feedInputValue || 0) * 25 : feedInputValue || 0;
  const totalBags25kg = feedInputUnit === 'bags' ? feedInputValue || 0 : (feedInputValue || 0) / 25;

  const calculatedFcr = totalWeightProducedKg > 0 ? totalFeedKg / totalWeightProducedKg : 0;

  const getBenchmarkFcr = () => {
    if (birdType === 'broiler') {
      if (harvestAgeWeeks <= 4) return 1.35;
      if (harvestAgeWeeks === 5) return 1.50;
      if (harvestAgeWeeks === 6) return 1.65;
      if (harvestAgeWeeks === 7) return 1.80;
      return 1.95;
    }
    if (birdType === 'turkey') {
      if (harvestAgeWeeks <= 8) return 1.85;
      if (harvestAgeWeeks <= 12) return 2.15;
      return 2.45;
    }
    return 2.20;
  };

  const benchmarkFcr = getBenchmarkFcr();
  const fcrDifference = calculatedFcr - benchmarkFcr;

  const totalFeedCostNgn = totalBags25kg * (costPerBagNgn || 0);
  const feedCostPerKgMeatNgn = totalWeightProducedKg > 0 ? totalFeedCostNgn / totalWeightProducedKg : 0;

  const idealFeedKg = totalWeightProducedKg * benchmarkFcr;
  const excessFeedKg = Math.max(0, totalFeedKg - idealFeedKg);
  const excessFeedBags = excessFeedKg / 25;
  const moneyLostToWastageNgn = excessFeedBags * (costPerBagNgn || 0);

  const getRating = () => {
    if (calculatedFcr <= benchmarkFcr) {
      return {
        label: 'Exceptional Feed Efficiency',
        status: 'excellent',
        badgeColor: 'bg-emerald-500/10 text-emerald-800 border-emerald-300',
        textColor: 'text-emerald-700',
        summary: 'Your flock is converting feed into meat above the international breed standard. Excellent intestinal health and minimal feeder spillage.',
      };
    }
    if (fcrDifference <= 0.15) {
      return {
        label: 'Standard Commercial Performance',
        status: 'good',
        badgeColor: 'bg-blue-500/10 text-blue-800 border-blue-300',
        textColor: 'text-blue-700',
        summary: 'Acceptable commercial margin, but fine-tuning pen temperature, feeder height, or gut probiotics can recover additional profit.',
      };
    }
    if (fcrDifference <= 0.35) {
      return {
        label: 'Sub-Optimal — Feed Wastage Detected',
        status: 'warning',
        badgeColor: 'bg-amber-500/10 text-amber-800 border-amber-300',
        textColor: 'text-amber-800',
        summary: 'Noticeable profit leakage. Causes include feeder pan spillage, sub-clinical coccidiosis, poor ventilation, or low-energy feed.',
      };
    }
    return {
      label: 'Critical Inefficiency — Urgent Review Needed',
      status: 'danger',
      badgeColor: 'bg-rose-500/10 text-rose-800 border-rose-300',
      textColor: 'text-rose-700',
      summary: 'Severe financial erosion. Birds are consuming feed without adequate weight gain. High risk of intestinal enteritis, mycotoxins, or chronic respiratory disease.',
    };
  };

  const rating = getRating();

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello D-AminGrow Technical Services Desk,\n\nI evaluated my flock on the FCR Calculator:\n- Flock: ${safeFlock} ${birdType}s (${harvestAgeWeeks} weeks)\n- Feed Consumed: ${totalFeedKg.toLocaleString()} kg (${totalBags25kg.toFixed(1)} bags)\n- Avg Weight: ${safeWeight} kg (Total: ${totalWeightProducedKg.toLocaleString()} kg)\n- Calculated FCR: ${calculatedFcr.toFixed(2)} (Benchmark: ${benchmarkFcr})\n- Feed Cost / kg Meat: ₦${Math.round(feedCostPerKgMeatNgn).toLocaleString()}\n- Estimated Wastage: ₦${Math.round(moneyLostToWastageNgn).toLocaleString()}\n\nI would like technical advice on gut probiotics and feed optimization for my farm.`
    );
    window.open(`https://wa.me/2348139169402?text=${message}`, '_blank');
  };

  return (
    <div className="font-body min-h-screen bg-slate-50">

      {/* ====================================================================
          HERO — 12-col grid, left 7 / right 5
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/calculators" className="hover:text-emerald-400 transition-colors">Calculators</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Feed Conversion Ratio</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* LEFT — 7 cols */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
                  <Scale className="h-3.5 w-3.5" />
                  Poultry Feed Economics Algorithm
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-5 py-2 rounded-full">
                  Cobb 500 & Ross 308 Verified
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                Poultry Feed Conversion Ratio (FCR) Calculator &{' '}
                <span className="text-gradient-green">Feed Efficiency Analyzer</span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed">
                Feed represents 70% to 75% of your total livestock investment. Measure your flock&apos;s biological feed efficiency, compare directly against international breed standards, and calculate the exact naira value lost to feed wastage.
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                <Star className="h-3.5 w-3.5 text-emerald-400" />
                Your Satisfaction Is Our Priority
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  'Cobb 500 & Ross 308 Benchmarks',
                  'Feed Cost per kg Meat',
                  'Naira Wastage Calculator',
                  'Gut Health Diagnostic Rules',
                  'Free & Instant',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-cyan-300 font-medium bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#calculator-engine"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
                >
                  <Calculator className="h-5 w-5" />
                  Calculate Flock FCR Now
                </a>
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  Consult Vet Desk via WhatsApp
                </button>
                <Link
                  href="/drugs"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  <Package className="h-4 w-4" />
                  Explore Gut Probiotics
                </Link>
              </div>
            </div>

            {/* RIGHT — 5 cols: Telemetry Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-7 space-y-5 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Scale className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-heading">FCR Benchmark Engine</h3>
                      <p className="text-xs text-slate-400">Live flock sensitivity simulation</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active Algorithm
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Target 6-Wk FCR</div>
                    <div className="text-2xl font-extrabold text-cyan-400 font-heading mt-1">1.65</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">kg feed / kg meat</div>
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Feed Share</div>
                    <div className="text-2xl font-extrabold text-emerald-400 font-heading mt-1">72%</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">of total rearing cost</div>
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">0.1 FCR Value</div>
                    <div className="text-2xl font-extrabold text-amber-400 font-heading mt-1">₦180k+</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">per 1,000 broilers</div>
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Spillage Rate</div>
                    <div className="text-2xl font-extrabold text-rose-400 font-heading mt-1">8–15%</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">in unadjusted pens</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-emerald-950/60 border border-emerald-500/20 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <span>Why Precision FCR Matters</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A broiler flock with an FCR of 1.65 versus 1.85 produces the exact same harvest revenue, but leaves an extra ₦517,000 in your pocket per 1,000 birds.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          OPERATIONAL BENCHMARKS BAR
          ==================================================================== */}
      <section className="bg-emerald-950/80 border-y border-emerald-900/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {BENCHMARKS.map((b, i) => (
              <div key={i} className="text-center">
                <div className={`text-3xl font-extrabold font-heading ${b.color}`}>{b.value}</div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">{b.label}</div>
                <div className="text-xs text-slate-600 mt-0.5">{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          INTERACTIVE FCR CALCULATOR ENGINE
          ==================================================================== */}
      <section id="calculator-engine" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="section-label mx-auto w-fit">
            <Calculator className="h-3.5 w-3.5" />
            Live Calculation Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Calculate Your Flock&apos;s Exact FCR & Profit Leakage
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Enter your flock size, bird weight, and feed consumed to evaluate performance against commercial breed benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Form Inputs (Left - 5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">Flock & Feed Records</h3>
              <p className="text-xs text-slate-500">Provide exact pen measurements for accurate calculation</p>
            </div>

            {/* Bird Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Bird Classification</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'broiler', label: 'Commercial Broiler' },
                  { id: 'turkey', label: 'Turkey Poults' },
                  { id: 'noiler', label: 'Noiler / Cockerel' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setBirdType(t.id as 'broiler' | 'turkey' | 'noiler')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      birdType === t.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Harvest / Evaluation Age */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-700 uppercase tracking-wider">Evaluation Age (Weeks)</label>
                <span className="font-extrabold text-emerald-700">{harvestAgeWeeks} Weeks Old</span>
              </div>
              <input
                type="range"
                min={3}
                max={12}
                step={1}
                value={harvestAgeWeeks}
                onChange={(e) => setHarvestAgeWeeks(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>3 Wks</span>
                <span>6 Wks (Target)</span>
                <span>8 Wks</span>
                <span>12 Wks</span>
              </div>
            </div>

            {/* Flock Size */}
            <div>
              <Input
                label="Total Live Birds in Pen"
                type="number"
                min={10}
                max={100000}
                value={flockCount}
                onChange={(e) => setFlockCount(Number(e.target.value))}
                helperText="Actual live birds counted at evaluation time"
              />
            </div>

            {/* Average Live Weight */}
            <div>
              <Input
                label="Average Live Weight (kg / Bird)"
                type="number"
                step="0.05"
                min={0.2}
                max={25}
                value={avgLiveWeightKg}
                onChange={(e) => setAvgLiveWeightKg(Number(e.target.value))}
                helperText="Sample weigh 5% of birds from different pen zones and calculate mean"
              />
            </div>

            {/* Feed Consumed */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Total Feed Consumed to Date
                </label>
                <div className="flex rounded-lg border border-slate-200 p-0.5 text-xs bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setFeedInputUnit('bags')}
                    className={`px-2 py-0.5 rounded-md font-semibold ${
                      feedInputUnit === 'bags' ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    Bags (25kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedInputUnit('kg')}
                    className={`px-2 py-0.5 rounded-md font-semibold ${
                      feedInputUnit === 'kg' ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    Kilograms (kg)
                  </button>
                </div>
              </div>
              <Input
                type="number"
                step="1"
                min={1}
                value={feedInputValue}
                onChange={(e) => setFeedInputValue(Number(e.target.value))}
                helperText={`Total cumulative ${feedInputUnit} of Starter, Grower, and Finisher feeds consumed`}
              />
            </div>

            {/* Price per Bag */}
            <div>
              <Input
                label="Average Cost per 25kg Feed Bag (₦)"
                type="number"
                step="100"
                min={5000}
                value={costPerBagNgn}
                onChange={(e) => setCostPerBagNgn(Number(e.target.value))}
                helperText="Current retail price of commercial mash/pellets in your area"
              />
            </div>
          </div>

          {/* Results Analysis (Right - 7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Scoreboard Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Calculated Feed Conversion Ratio
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-4xl sm:text-6xl font-extrabold text-slate-900 font-heading tracking-tight">
                      {calculatedFcr.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-500">
                      kg feed per 1 kg meat
                    </span>
                  </div>
                </div>

                <div className={`rounded-2xl border px-4 py-2.5 text-right ${rating.badgeColor}`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider">Benchmark: {benchmarkFcr.toFixed(2)}</div>
                  <div className="text-sm font-bold mt-0.5">{rating.label}</div>
                </div>
              </div>

              {/* Economic Summary Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="text-xs text-slate-500 font-medium">Total Meat Produced</div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mt-1">
                    {Math.round(totalWeightProducedKg).toLocaleString()} <span className="text-xs font-normal">kg</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {safeFlock} birds @ {safeWeight}kg
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="text-xs text-slate-500 font-medium">Feed Cost / kg Meat</div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mt-1">
                    ₦{Math.round(feedCostPerKgMeatNgn).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Total Feed: ₦{Math.round(totalFeedCostNgn).toLocaleString()}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="text-xs text-slate-500 font-medium">Money Lost to Wastage</div>
                  <div className={`text-xl sm:text-2xl font-bold font-heading mt-1 ${moneyLostToWastageNgn > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {moneyLostToWastageNgn > 0 ? `₦${Math.round(moneyLostToWastageNgn).toLocaleString()}` : '₦0 (Zero Loss)'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {excessFeedBags > 0 ? `${excessFeedBags.toFixed(1)} excess bags` : 'Optimized intake'}
                  </div>
                </div>
              </div>

              {/* Clinical Assessment */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  <span>Technical Field Interpretation</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {rating.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleShareWhatsApp}
                  variant="whatsapp"
                  size="lg"
                  className="w-full sm:flex-1 justify-center shadow-lg"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <span>Send Report to Vet Desk on WhatsApp</span>
                </Button>
                <Link
                  href="/drugs"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-5 py-3 text-sm transition-colors text-center"
                >
                  <Package className="h-4 w-4 mr-2 text-emerald-600" />
                  <span>Explore Gut Probiotics</span>
                </Link>
              </div>
            </div>

            {/* How to Improve FCR Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span>3 Critical Levers to Cut FCR on Nigerian Farms</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-600">
                <div className="rounded-2xl border border-slate-100 p-3.5 space-y-1">
                  <div className="font-bold text-slate-800">1. Feeder Lip Height</div>
                  <p className="leading-relaxed">
                    Set feeder pan rims level with the bird&apos;s back. Overfilling accounts for up to 12% direct feed loss into litter.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-3.5 space-y-1">
                  <div className="font-bold text-slate-800">2. Gut Integrity</div>
                  <p className="leading-relaxed">
                    Subclinical coccidiosis damages intestinal villi, letting expensive nutrient proteins pass undigested into droppings.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-3.5 space-y-1">
                  <div className="font-bold text-slate-800">3. Water Sanitation</div>
                  <p className="leading-relaxed">
                    Broilers drink 2x more water than they eat. Warm or contaminated drinking water instantly depresses feed conversion.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          PROBLEM: WHY FEED MARGINS COLLAPSE
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <AlertTriangle className="h-3.5 w-3.5" />
              The Profit Leak
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why Feed Margins Collapse on Nigerian Farms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              When farmers lose money on broilers, they blame day-old chick prices or market gluts. In 8 out of 10 cases, the actual financial loss happens right inside the feeder pan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAILURE_POINTS.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="rounded-3xl bg-red-50 border border-red-100 p-7 flex gap-5">
                  <div className="h-11 w-11 rounded-2xl bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          INFORMATION GAIN: FCR ECONOMIC SENSITIVITY MATRIX
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <DollarSign className="h-3.5 w-3.5" />
              Unique Information Gain
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              FCR Economic Sensitivity Matrix: The Real Naira Cost of Inefficiency
            </h2>
            <p className="text-slate-600 leading-relaxed">
              This matrix calculates the exact cumulative naira cost when your flock FCR slips from an optimal 1.60 up to 1.70 or 1.85, calculated at ₦23,500 per 25kg commercial feed bag.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Flock Scale</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Total Harvest Meat</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Feed Cost @ 1.60 FCR</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Feed Cost @ 1.70 FCR</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Feed Cost @ 1.85 FCR</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider text-rose-300">Net Profit Lost (1.85 vs 1.60)</th>
                </tr>
              </thead>
              <tbody>
                {SENSITIVITY_DATA.map((row, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-t border-slate-100`}>
                    <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">{row.flock}</td>
                    <td className="px-5 py-4 text-slate-600">{row.weight}</td>
                    <td className="px-5 py-4 text-emerald-700 font-semibold">{row.fcr160}</td>
                    <td className="px-5 py-4 text-slate-600">{row.fcr170}</td>
                    <td className="px-5 py-4 text-slate-600">{row.fcr185}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-rose-700 bg-rose-50">
                        {row.lossAt185}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-slate-400" />
              Calculations based on 2.2 kg average market weight at 42 days, assuming current commercial pelleted broiler finisher at ₦23,500/25kg.
            </span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4-PILLAR RECOVERY SYSTEM
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              Efficiency Recovery
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 4-Pillar Feed Efficiency Recovery Framework
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Fixing a bad FCR requires systematic control over equipment, gut health, water sanitation, and harvest timing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className={`card-dark rounded-3xl p-7 space-y-5 border ${p.borderColor} hover:scale-[1.02] transition-transform`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-2xl ${p.bgColor} border ${p.borderColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${p.color}`} />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-700 font-heading">{p.num}</span>
                  </div>
                  <h3 className={`text-base sm:text-lg font-bold font-heading ${p.color}`}>{p.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          HONESTY FILTER
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <div className="section-label mx-auto w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              Honest Assessment
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              This FCR Tool May Not Help You If...
            </h2>
          </div>

          <div className="rounded-3xl bg-slate-900 border border-slate-700 p-8 space-y-4">
            {HONESTY_FILTERS.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">{item}</p>
              </div>
            ))}
            <div className="pt-4 border-t border-slate-700 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <p className="text-sm text-emerald-300 font-semibold">
                But if you keep real pen records and want to turn feed data into hundreds of thousands in saved profits — this algorithm is built for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FAQ
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <BookOpen className="h-3.5 w-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Everything About Poultry Feed Conversion Ratio
            </h2>
          </div>

          <div className="space-y-5">
            {FAQ_DISPLAY.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 border border-slate-200 p-6">
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          FINAL CTA
          ==================================================================== */}
      <section className="bg-emerald-950 py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
            <Scale className="h-3.5 w-3.5" />
            Optimize Feed Margins Today
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Stop Losing Profits to{' '}
            <span className="text-gradient-green">Hidden Feed Wastage</span>
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Send your FCR calculation directly to D-AminGrow&apos;s veterinary desk. We review your feed formulation, feeder lip setup, and gut health protocol to help you recover lost margins.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              Send Report to Vet Desk on WhatsApp
            </button>
            <Link
              href="/drugs"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
            >
              <Package className="h-4 w-4" />
              View Gut Health Probiotics
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            Free clinical utility · Cobb 500 & Ross 308 benchmarks · WhatsApp veterinary advisory
          </p>
        </div>
      </section>

    </div>
  );
}
