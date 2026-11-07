'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Egg,
  MessageCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Layers,
  Box,
  TrendingDown,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Star,
  Info,
  DollarSign,
  Activity,
  Calculator,
} from 'lucide-react';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';

const BENCHMARKS = [
  { label: 'Peak Laying Target', value: '92%–96%', sub: 'Weeks 26 to 34', color: 'text-amber-400' },
  { label: 'Annual Hen-Day Avg', value: '85%+', sub: 'commercial standard', color: 'text-emerald-400' },
  { label: 'Feed Intake / Hen', value: '115g–125g', sub: 'grams per bird daily', color: 'text-cyan-400' },
  { label: 'Economic Culling', value: '<60%–65%', sub: 'spent hen threshold', color: 'text-rose-400' },
];

const FAILURE_POINTS = [
  {
    icon: TrendingDown,
    title: 'Irregular lighting programs interrupting pituitary ovulation',
    desc: 'Commercial layers require 16 hours of continuous light daily. A 2-hour electrical outage during morning or evening light schedules stops the follicle maturation reflex within 48 hours.',
  },
  {
    icon: AlertTriangle,
    title: 'Short water disruptions during peak tropical heat',
    desc: 'Eggs consist of 65% water. A 4-hour water line blockage during a 34°C afternoon causes an instant 15% to 25% drop in egg collection that takes up to 14 days to recover.',
  },
  {
    icon: XCircle,
    title: 'Skipping Egg Drop Syndrome (EDS-76) killed vaccines at 16 weeks',
    desc: 'Flocks without inactivated EDS-76 and ND protection suffer catastrophic, silent drops in egg production (from 90% down to 45%) with soft-shelled, chalky, or deformed eggs.',
  },
  {
    icon: TrendingDown,
    title: 'Fine calcium powder instead of coarse oyster shell grit at 4:00 PM',
    desc: 'Feeding fine calcium dust in the morning causes it to pass through before nighttime eggshell calcification. Large particle oyster shell or limestone grit is required in late afternoon.',
  },
];

const PILLARS = [
  {
    num: '01',
    icon: Activity,
    title: 'Strict 16-Hour Photoperiod',
    desc: 'Maintain automated timer lighting. Never decrease light duration during the laying cycle to prevent sudden artificial molting.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    num: '02',
    icon: Layers,
    title: 'Coarse Afternoon Calcium Buffer',
    desc: 'Supplement coarse limestone grit or oyster shells at 4:00 PM so calcium resides in the gizzard during overnight eggshell synthesis.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'EDS-76 & ND LaSota Booster Routine',
    desc: 'Administer live LaSota drinking water boosters every 6 to 8 weeks to maintain high viral antibody titres throughout peak production.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    num: '04',
    icon: DollarSign,
    title: 'Daily Hen-Day Record Keeping',
    desc: 'Compute Hen-Day percentage every evening. Detecting a 3% dip on Day 2 allows you to treat enteritis or water issues before full collapse.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
];

// INFORMATION GAIN: Crate Harvest & Revenue Matrix
const CRATE_MATRIX = [
  { flock: '500 layers', hdp: '90%', eggs: '450 eggs', crates: '15.0 crates', dailyFeed: '60 kg (2.4 bags)', monthlyMargin: '₦877,500' },
  { flock: '1,000 layers', hdp: '90%', eggs: '900 eggs', crates: '30.0 crates', dailyFeed: '120 kg (4.8 bags)', monthlyMargin: '₦1,755,000' },
  { flock: '2,500 layers', hdp: '88%', eggs: '2,200 eggs', crates: '73.3 crates', dailyFeed: '300 kg (12.0 bags)', monthlyMargin: '₦4,185,000' },
  { flock: '5,000 layers', hdp: '86%', eggs: '4,300 eggs', crates: '143.3 crates', dailyFeed: '600 kg (24.0 bags)', monthlyMargin: '₦8,010,000' },
];

const HONESTY_FILTERS = [
  'You do not count daily egg harvest and guess crate numbers by visual eyeball.',
  'You do not record daily flock mortality, making Hen-Housed calculations impossible.',
  'You expect egg production boosters to fix laying drops when your hens are deprived of water or light.',
  'You keep spent hens laying below 55% while feed costs consume all your operating capital.',
];

const FAQ_DISPLAY = [
  {
    q: 'What is the formula for calculating Hen-Day Egg Production (HDEP) percentage?',
    a: 'Hen-Day Egg Production (HDEP) measures biological laying efficiency: HDEP (%) = (Total Eggs Collected Today ÷ Total Live Hens Present Today) × 100. For example, 855 eggs from 950 live hens = 90.0% HDEP.',
  },
  {
    q: 'What is the difference between Hen-Day (HDEP) and Hen-Housed (HHEP) egg production?',
    a: 'Hen-Day (HDEP) divides eggs by living hens present — reflecting biological performance. Hen-Housed (HHEP) divides eggs by the original number of pullets housed at start of lay. HHEP penalizes mortality and shows true farm profitability.',
  },
  {
    q: 'What is the peak egg production percentage for commercial layers in Nigeria?',
    a: 'Peak production for ISA Brown and Lohmann Brown reaches 92% to 96% between Weeks 26 and 32 under proper nutrition and 16-hour lighting. It typically stays above 85% for about 30 weeks.',
  },
  {
    q: 'How many eggs are in a commercial egg crate in Nigeria?',
    a: 'Standard commercial egg crates in Nigeria hold 30 eggs arranged in a 5×6 pocket pattern. Total eggs divided by 30 gives your daily crate yield.',
  },
  {
    q: 'What causes sudden egg production drops on commercial poultry farms?',
    a: 'Key triggers are: lighting reductions (less than 16 hours), water deprivation over 3–4 hours, viral challenges (EDS-76, Newcastle, Infectious Bronchitis), calcium imbalance, and extreme heat stress.',
  },
  {
    q: 'At what laying percentage should commercial layer hens be culled as spent hens?',
    a: 'The economic culling threshold is when Hen-Day Production drops below 60% to 65% (usually around Weeks 72–80), where daily egg sales fail to cover daily feed expenses.',
  },
];

export default function EggCalculatorClient() {
  const [flockCount, setFlockCount] = useState<number>(1000);
  const [flockAgeWeeks, setFlockAgeWeeks] = useState<number>(30);
  const [eggsToday, setEggsToday] = useState<number>(910);
  const [dailyFeedBags, setDailyFeedBags] = useState<number>(4.8);
  const [eggPricePerCrateNgn, setEggPricePerCrateNgn] = useState<number>(4500);
  const [feedCostPerBagNgn, setFeedCostPerBagNgn] = useState<number>(21500);

  const safeFlock = Math.max(10, flockCount || 10);
  const safeEggs = Math.max(0, eggsToday || 0);

  const hdpPercentage = Math.min(100, (safeEggs / safeFlock) * 100);

  const dailyCrates = safeEggs / 30;
  const weeklyCrates = dailyCrates * 7;
  const monthlyCrates = dailyCrates * 30;

  const dailyFeedKg = (dailyFeedBags || 0) * 25;
  const feedIntakeGramsPerBird = safeFlock > 0 ? (dailyFeedKg * 1000) / safeFlock : 0;

  const getExpectedHdp = (age: number) => {
    if (age < 18) return 0;
    if (age <= 20) return 25;
    if (age <= 23) return 70;
    if (age <= 25) return 85;
    if (age <= 34) return 93;
    if (age <= 42) return 89;
    if (age <= 52) return 83;
    if (age <= 62) return 77;
    if (age <= 72) return 70;
    return 65;
  };

  const expectedHdp = getExpectedHdp(flockAgeWeeks);
  const hdpDeviation = hdpPercentage - expectedHdp;

  const dailyEggRevenueNgn = dailyCrates * (eggPricePerCrateNgn || 0);
  const monthlyEggRevenueNgn = monthlyCrates * (eggPricePerCrateNgn || 0);

  const dailyFeedCostNgn = (dailyFeedBags || 0) * (feedCostPerBagNgn || 0);
  const monthlyFeedCostNgn = dailyFeedCostNgn * 30;

  const netDailyMarginNgn = dailyEggRevenueNgn - dailyFeedCostNgn;
  const netMonthlyMarginNgn = monthlyEggRevenueNgn - monthlyFeedCostNgn;

  const feedCostPerCrateNgn = dailyCrates > 0 ? dailyFeedCostNgn / dailyCrates : 0;

  const getRating = () => {
    if (hdpDeviation >= 0) {
      return {
        label: 'Peak Efficiency — On Target',
        status: 'excellent',
        badgeColor: 'bg-emerald-500/10 text-emerald-800 border-emerald-300',
        textColor: 'text-emerald-700',
        summary: 'Your layers are meeting or surpassing international commercial genetic potential (ISA Brown/Lohmann standard). Feed-to-egg conversion is optimal.',
      };
    }
    if (hdpDeviation >= -5) {
      return {
        label: 'Normal Commercial Fluctuation',
        status: 'good',
        badgeColor: 'bg-blue-500/10 text-blue-800 border-blue-300',
        textColor: 'text-blue-700',
        summary: 'Acceptable laying rate. Slight variations are often weather or lighting related. Monitor shell quality and ensure continuous freshwater supply.',
      };
    }
    if (hdpDeviation >= -12) {
      return {
        label: 'Moderate Drop in Laying Rate',
        status: 'warning',
        badgeColor: 'bg-amber-500/10 text-amber-800 border-amber-300',
        textColor: 'text-amber-800',
        summary: 'Unusual drop in production. Review photoperiod (minimum 16 hours light), calcium/phosphorus ratio, and check for sub-clinical gut enteritis.',
      };
    }
    return {
      label: 'Critical Laying Collapse — Urgent Vet Review',
      status: 'danger',
      badgeColor: 'bg-rose-500/10 text-rose-800 border-rose-300',
      textColor: 'text-rose-700',
      summary: 'Severe reproductive drop. Potential acute viral triggers: Egg Drop Syndrome (EDS-76), Newcastle Disease, Infectious Bronchitis (IB), or feed toxin contamination.',
    };
  };

  const rating = getRating();

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello D-AminGrow Technical Services Desk,\n\nI evaluated my layer flock on the Egg Production Calculator:\n- Flock: ${safeFlock} layers at ${flockAgeWeeks} weeks old\n- Today's Collection: ${safeEggs.toLocaleString()} eggs (${dailyCrates.toFixed(1)} crates)\n- Hen-Day Production (HDP): ${hdpPercentage.toFixed(1)}% (Breed Benchmark: ${expectedHdp}%)\n- Daily Feed Intake: ${Math.round(feedIntakeGramsPerBird)}g / bird / day\n- Feed Cost / Crate: ₦${Math.round(feedCostPerCrateNgn).toLocaleString()}\n- Net Monthly Gross Margin: ₦${Math.round(netMonthlyMarginNgn).toLocaleString()}\n\nStatus: ${rating.label}.\nI would like expert advice on optimizing egg production and nutrition.`
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
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/calculators" className="hover:text-emerald-400 transition-colors">Calculators</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Egg Production (HDP)</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* LEFT — 7 cols */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/25 px-5 py-2 rounded-full">
                  <Egg className="h-3.5 w-3.5" />
                  Commercial Layer Economics
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
                  ISA Brown & Lohmann Verified
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                Egg Production Percentage Calculator:{' '}
                <span className="text-gradient-green">Hen-Day & Hen-Housed Analysis</span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed">
                Track your flock&apos;s egg production curve against international breed benchmarks. Calculate exact Hen-Day percentage (HDP), daily 30-egg crates harvested, feed intake per bird, and net monthly gross egg margin in Nigerian Naira.
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                <Star className="h-3.5 w-3.5 text-emerald-400" />
                Your Satisfaction Is Our Priority
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  'Hen-Day (HDEP) & Hen-Housed (HHEP)',
                  'Daily 30-Egg Crate Yield',
                  'Feed Cost per Crate in Naira (₦)',
                  'Early Egg Drop Diagnostic Alerts',
                  'Free & Instant Calculation',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-cyan-300 font-medium bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#calculator-section"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
                >
                  <Calculator className="h-5 w-5" />
                  Calculate Laying Rate Now
                </a>
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  Consult Vet on Egg Drops via WhatsApp
                </button>
                <Link
                  href="/point-of-lay"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  <span>Point-of-Lay Pullets</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* RIGHT — 5 cols: Telemetry Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-7 space-y-5 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                      <Egg className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-heading">Layer Efficiency Engine</h3>
                      <p className="text-xs text-slate-400">Breed standard laying curve</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Live Metric
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Peak Lay Target</div>
                    <div className="text-2xl font-extrabold text-amber-400 font-heading mt-1">92%–96%</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Weeks 26 to 34</div>
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Annual Average</div>
                    <div className="text-2xl font-extrabold text-emerald-400 font-heading mt-1">85%+</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Hen-Day benchmark</div>
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Daily Feed Target</div>
                    <div className="text-2xl font-extrabold text-cyan-400 font-heading mt-1">115–125g</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">per layer / day</div>
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Spent Hen Point</div>
                    <div className="text-2xl font-extrabold text-rose-400 font-heading mt-1">&lt;65% HDP</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">culling threshold</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-950/60 border border-amber-500/20 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span>Every 5% Laying Drop Counts</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    On a 1,000-layer farm, a 5% drop in Hen-Day Production equals 50 lost eggs (1.67 crates) every day — costing over ₦225,000 in lost revenue every month.
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
          MAIN CALCULATOR BODY
          ==================================================================== */}
      <section id="calculator-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="section-label mx-auto w-fit">
            <Calculator className="h-3.5 w-3.5" />
            Flock Efficiency Analyzer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Calculate Hen-Day Percentage & Monthly Margin
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Enter your flock size, bird age, daily egg collection, and feed consumption to evaluate laying efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Form Inputs (Left - 5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">Flock & Egg Harvest Records</h3>
              <p className="text-xs text-slate-500">Enter today&apos;s egg collection and feed numbers</p>
            </div>

            {/* Flock Age Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-700 uppercase tracking-wider">Flock Age (Weeks)</label>
                <span className="font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  {flockAgeWeeks} Weeks Old
                </span>
              </div>
              <input
                type="range"
                min={18}
                max={80}
                step={1}
                value={flockAgeWeeks}
                onChange={(e) => setFlockAgeWeeks(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>18 Wks (POL)</span>
                <span>30 Wks (Peak)</span>
                <span>52 Wks (1 Year)</span>
                <span>80 Wks (Molt)</span>
              </div>
            </div>

            {/* Live Hens Count */}
            <div>
              <Input
                label="Total Live Hens in Pen"
                type="number"
                min={10}
                max={200000}
                value={flockCount}
                onChange={(e) => setFlockCount(Number(e.target.value))}
                helperText="Current active population (excluding mortality and culls)"
              />
            </div>

            {/* Eggs Collected Today */}
            <div>
              <Input
                label="Total Eggs Collected Today (Pieces)"
                type="number"
                min={0}
                max={200000}
                value={eggsToday}
                onChange={(e) => setEggsToday(Number(e.target.value))}
                helperText={`Equivalent to ${(safeEggs / 30).toFixed(1)} crates (30 eggs / crate)`}
              />
            </div>

            {/* Daily Feed Consumed */}
            <div>
              <Input
                label="Daily Feed Consumed (Bags of 25kg)"
                type="number"
                step="0.1"
                min={0.1}
                value={dailyFeedBags}
                onChange={(e) => setDailyFeedBags(Number(e.target.value))}
                helperText={`Intake: ${Math.round(feedIntakeGramsPerBird)} grams / bird / day (Target: 115g – 125g)`}
              />
            </div>

            {/* Price Per Crate */}
            <div>
              <Input
                label="Selling Price per Crate of Eggs (₦)"
                type="number"
                step="50"
                min={1000}
                value={eggPricePerCrateNgn}
                onChange={(e) => setEggPricePerCrateNgn(Number(e.target.value))}
                helperText="Farm-gate wholesale price per crate in your local market"
              />
            </div>

            {/* Cost Per Bag of Feed */}
            <div>
              <Input
                label="Cost per 25kg Bag of Layer Mash (₦)"
                type="number"
                step="100"
                min={5000}
                value={feedCostPerBagNgn}
                onChange={(e) => setFeedCostPerBagNgn(Number(e.target.value))}
                helperText="Your purchase price for commercial layer feed"
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
                    Hen-Day Production (HDP)
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-4xl sm:text-6xl font-extrabold text-slate-900 font-heading tracking-tight">
                      {hdpPercentage.toFixed(1)}%
                    </span>
                    <span className="text-xs text-slate-500">
                      laying efficiency
                    </span>
                  </div>
                </div>

                <div className={`rounded-2xl border px-4 py-2.5 text-right ${rating.badgeColor}`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider">Breed Benchmark: {expectedHdp}%</div>
                  <div className="text-sm font-bold mt-0.5">{rating.label}</div>
                </div>
              </div>

              {/* Economic Summary Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
                  <div className="text-[11px] text-slate-500 font-medium">Daily Crates</div>
                  <div className="text-xl font-bold text-slate-900 font-heading mt-1">
                    {dailyCrates.toFixed(1)} <span className="text-xs font-normal">crates</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {Math.round(weeklyCrates)} / week
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
                  <div className="text-[11px] text-slate-500 font-medium">Feed Intake</div>
                  <div className={`text-xl font-bold font-heading mt-1 ${feedIntakeGramsPerBird < 110 || feedIntakeGramsPerBird > 130 ? 'text-amber-600' : 'text-emerald-700'}`}>
                    {Math.round(feedIntakeGramsPerBird)} <span className="text-xs font-normal">g/bird</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Target: 115–125g
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
                  <div className="text-[11px] text-slate-500 font-medium">Feed Cost / Crate</div>
                  <div className="text-xl font-bold text-slate-900 font-heading mt-1">
                    ₦{Math.round(feedCostPerCrateNgn).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Feed only
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
                  <div className="text-[11px] text-slate-500 font-medium">Net Monthly Margin</div>
                  <div className={`text-xl font-bold font-heading mt-1 ${netMonthlyMarginNgn > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    ₦{Math.round(netMonthlyMarginNgn).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    ₦{Math.round(netDailyMarginNgn).toLocaleString()}/day
                  </div>
                </div>
              </div>

              {/* Clinical Assessment */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  <span>Flock Productivity Diagnostic</span>
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
                  <span>Send Flock Report to Vet Desk on WhatsApp</span>
                </Button>
                <Link
                  href="/point-of-lay"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-5 py-3 text-sm transition-colors text-center"
                >
                  <Layers className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Book Point-of-Lay Birds</span>
                </Link>
              </div>
            </div>

            {/* Scientific Egg Maximization Tips */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span>Key Causes of Sudden Egg Drops on Nigerian Farms</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-600">
                <div className="rounded-2xl border border-slate-100 p-3.5 space-y-1">
                  <div className="font-bold text-slate-800">1. Light Duration Dips</div>
                  <p className="leading-relaxed">
                    Layers require 16 hours of daily light. Even 1 hour missed drops pituitary hormone release and halts egg ovulation within 48 hours.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-3.5 space-y-1">
                  <div className="font-bold text-slate-800">2. Water Deprivation &gt; 4 Hrs</div>
                  <p className="leading-relaxed">
                    Eggs are 65% water. A 4-hour water failure during hot afternoons causes an immediate 15%–30% laying drop taking 14 days to recover.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-3.5 space-y-1">
                  <div className="font-bold text-slate-800">3. Calcium &amp; EDS Immunity</div>
                  <p className="leading-relaxed">
                    Confirm birds received Egg Drop Syndrome (EDS-76) killed vaccine at 16–18 weeks, and feed coarse oyster shell grit at 4:00 PM.
                  </p>
                </div>
              </div>
            </div>

            {/* Commercial Egg Crates & Logistics Field Footage */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                    <Box className="h-5 w-5 text-emerald-600" />
                    <span>Commercial Egg Crates &amp; Farm-Gate Packaging</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Reusable heavy-duty 30-egg holding trays for zero shell hairline fractures during farm handling &amp; transit.
                  </p>
                </div>
                <Link
                  href="/accessories"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-xl transition-colors w-fit"
                >
                  Order Egg Crates <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MediaVideoPlayer
                  src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/egg%20crates%20to%20be%20supplied.mp4"
                  poster="/products/Acessories/plastic egg crate.jpeg"
                  title="Wholesale Egg Crates Prepared for Farm Supply"
                  badge="Inventory In-Stock"
                  caption="Bulk bundles of high-grade virgin plastic 30-egg trays ready for delivery"
                  aspectRatio="video"
                />

                <MediaVideoPlayer
                  src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/egg%20crates%202.mp4"
                  poster="/products/Acessories/plastic egg crate.jpeg"
                  title="Impact-Resistant Crate Stacking Demonstration"
                  badge="Durability Tested"
                  caption="Commercial stacking rigidity preventing egg weight crush in layer houses"
                  aspectRatio="video"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          PROBLEM: WHY COMMERCIAL EGG MARGINS DISAPPEAR
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <AlertTriangle className="h-3.5 w-3.5" />
              The Profit Leak
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why Commercial Layer Margins Disappear
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Layers eat feed every single day whether they produce an egg or not. When Hen-Day percentage drops below 70%, feed costs quickly swallow entire farm operational margins.
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
          INFORMATION GAIN: CRATE HARVEST & REVENUE MATRIX
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <DollarSign className="h-3.5 w-3.5" />
              Unique Information Gain
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Daily Laying Rate to Crate Harvest &amp; Revenue Matrix
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Standard commercial projection based on ₦4,500/crate farm-gate wholesale price and ₦21,500/25kg layer mash.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Flock Scale</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Hen-Day (HDP)</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Daily Eggs</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Daily Crates (30s)</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Daily Feed Consumed</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider text-emerald-400">Net Monthly Margin</th>
                </tr>
              </thead>
              <tbody>
                {CRATE_MATRIX.map((row, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-t border-slate-100`}>
                    <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">{row.flock}</td>
                    <td className="px-5 py-4 font-mono font-bold text-amber-600">{row.hdp}</td>
                    <td className="px-5 py-4 text-slate-600">{row.eggs}</td>
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.crates}</td>
                    <td className="px-5 py-4 text-slate-600">{row.dailyFeed}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50">
                        {row.monthlyMargin}
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
              Assumes 120g/bird/day feed consumption, ₦4,500 wholesale crate revenue, and ₦21,500 layer mash cost.
            </span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4-PILLAR LAYER PRODUCTIVITY SYSTEM
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              Productivity Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 4-Pillar Layer Productivity Framework
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Maintain peak lay above 90% for months with these clinical farm management principles.
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
              This Calculator May Not Help You If...
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
                But if you count daily eggs and want clinical diagnostics on your laying curve — this tool will protect your farm profits.
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
              Everything About Layer Egg Production &amp; Hen-Day Calculations
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
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/25 px-5 py-2 rounded-full">
            <Egg className="h-3.5 w-3.5" />
            Layer Health Advisory Ready
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Diagnose Laying Drops Before{' '}
            <span className="text-gradient-green">They Cost Your Farm Millions</span>
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Send your Hen-Day production numbers to D-AminGrow&apos;s veterinary desk. We inspect your lighting program, calcium balance, and vaccination history to restore peak production.
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
              href="/point-of-lay"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
            >
              <Layers className="h-4 w-4" />
              Book Point-of-Lay Pullets
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            Free Hen-Day utility · ISA Brown & Lohmann standards · Direct veterinary triage
          </p>
        </div>
      </section>

    </div>
  );
}
