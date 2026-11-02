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
} from 'lucide-react';

export default function EggCalculatorClient() {
  const [flockCount, setFlockCount] = useState<number>(1000);
  const [flockAgeWeeks, setFlockAgeWeeks] = useState<number>(30); // 30 weeks = peak lay
  const [eggsToday, setEggsToday] = useState<number>(910); // 910 eggs = 91% HDP
  const [dailyFeedBags, setDailyFeedBags] = useState<number>(4.8); // 4.8 bags = 120 kg = 120g/bird
  const [eggPricePerCrateNgn, setEggPricePerCrateNgn] = useState<number>(4500); // ₦4,500 per crate
  const [feedCostPerBagNgn, setFeedCostPerBagNgn] = useState<number>(21500); // ₦21,500 per bag

  // Math conversions
  const safeFlock = Math.max(10, flockCount || 10);
  const safeEggs = Math.max(0, eggsToday || 0);

  // Hen-Day Production Percentage (HDP %) = (Total Eggs / Total Live Hens) * 100
  const hdpPercentage = Math.min(100, (safeEggs / safeFlock) * 100);

  // Crates (30 eggs per crate)
  const dailyCrates = safeEggs / 30;
  const weeklyCrates = dailyCrates * 7;
  const monthlyCrates = dailyCrates * 30;

  // Feed intake per bird in grams/day
  const dailyFeedKg = (dailyFeedBags || 0) * 25;
  const feedIntakeGramsPerBird = safeFlock > 0 ? (dailyFeedKg * 1000) / safeFlock : 0;

  // Expected benchmark HDP based on age
  const getExpectedHdp = (age: number) => {
    if (age < 18) return 0;
    if (age <= 20) return 25;
    if (age <= 23) return 70;
    if (age <= 25) return 85;
    if (age <= 34) return 93; // Peak lay
    if (age <= 42) return 89;
    if (age <= 52) return 83;
    if (age <= 62) return 77;
    if (age <= 72) return 70;
    return 65; // Late lay / molt
  };

  const expectedHdp = getExpectedHdp(flockAgeWeeks);
  const hdpDeviation = hdpPercentage - expectedHdp;

  // Economics
  const dailyEggRevenueNgn = dailyCrates * (eggPricePerCrateNgn || 0);
  const monthlyEggRevenueNgn = monthlyCrates * (eggPricePerCrateNgn || 0);

  const dailyFeedCostNgn = (dailyFeedBags || 0) * (feedCostPerBagNgn || 0);
  const monthlyFeedCostNgn = dailyFeedCostNgn * 30;

  const netDailyMarginNgn = dailyEggRevenueNgn - dailyFeedCostNgn;
  const netMonthlyMarginNgn = monthlyEggRevenueNgn - monthlyFeedCostNgn;

  const feedCostPerCrateNgn = dailyCrates > 0 ? dailyFeedCostNgn / dailyCrates : 0;

  // Evaluation Rating
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
    <div className="min-h-screen bg-slate-50/70 font-body">
      {/* Hero */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/calculators" className="hover:text-emerald-400">Calculators</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-emerald-400 font-semibold">Hen-Day Egg Production (HDP)</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 section-label-dark">
              <Egg className="h-4 w-4 text-amber-400" />
              <span>Commercial Layer & Point-of-Lay Efficiency</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Hen-Day Egg Production (HDP) & <br />
              <span className="text-gradient-green">Layer Margin Calculator</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Track your flock&apos;s egg curve against ISA Brown and Lohmann commercial benchmarks. Calculate daily crates harvested, feed intake in grams per bird, and net monthly gross profit.
            </p>
          </div>
        </div>
      </section>

      {/* Main Calculator Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Form Inputs (Left) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-heading">Flock & Egg Collection Records</h2>
              <p className="text-xs text-slate-500">Enter today&apos;s egg harvest and pen numbers</p>
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
                <span>18 Wks (Point-of-Lay)</span>
                <span>30 Wks (Peak Lay)</span>
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

          {/* Results Analysis (Right) */}
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
                  <span>Send Flocks Report to Vet Desk on WhatsApp</span>
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
                <span>Key Causes of Sudden Egg Drops in Nigerian Layers</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-600">
                <div className="rounded-2xl border border-slate-100 p-3.5 space-y-1">
                  <div className="font-bold text-slate-800">1. Light Duration Fluctuations</div>
                  <p className="leading-relaxed">
                    Layers require a strict 16 hours of light daily. Even 1 hour of missed light drops pituitary stimulation and stops egg ovulation within 48 hours.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-3.5 space-y-1">
                  <div className="font-bold text-slate-800">2. Water Deprivation for &gt; 4 Hours</div>
                  <p className="leading-relaxed">
                    Eggs are 65% water. A 4-hour water failure during hot afternoons causes an instant 15–30% laying drop that takes 2 weeks to recover.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-3.5 space-y-1">
                  <div className="font-bold text-slate-800">3. Calcium & EDS Immunity</div>
                  <p className="leading-relaxed">
                    Check if birds received Egg Drop Syndrome (EDS-76) killed vaccine at 16–18 weeks, and feed oyster shell grit at 4:00 PM for nighttime calcification.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
