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
} from 'lucide-react';

export default function FcrCalculatorClient() {
  const [birdType, setBirdType] = useState<'broiler' | 'turkey' | 'noiler'>('broiler');
  const [harvestAgeWeeks, setHarvestAgeWeeks] = useState<number>(6);
  const [flockCount, setFlockCount] = useState<number>(500);
  const [feedInputUnit, setFeedInputUnit] = useState<'bags' | 'kg'>('bags');
  const [feedInputValue, setFeedInputValue] = useState<number>(70); // 70 bags for 500 broilers ~ 3.5kg feed each
  const [avgLiveWeightKg, setAvgLiveWeightKg] = useState<number>(2.15); // 2.15 kg
  const [costPerBagNgn, setCostPerBagNgn] = useState<number>(23500); // ₦23,500 per bag

  // Math conversions
  const safeFlock = Math.max(10, flockCount || 10);
  const safeWeight = Math.max(0.2, avgLiveWeightKg || 0.2);
  const totalWeightProducedKg = safeFlock * safeWeight;

  const totalFeedKg = feedInputUnit === 'bags' ? (feedInputValue || 0) * 25 : feedInputValue || 0;
  const totalBags25kg = feedInputUnit === 'bags' ? feedInputValue || 0 : (feedInputValue || 0) / 25;

  // Calculated FCR = Total Feed Consumed (kg) / Total Live Body Weight (kg)
  const calculatedFcr = totalWeightProducedKg > 0 ? totalFeedKg / totalWeightProducedKg : 0;

  // Benchmark FCR based on age & bird type
  const getBenchmarkFcr = () => {
    if (birdType === 'broiler') {
      if (harvestAgeWeeks <= 4) return 1.35;
      if (harvestAgeWeeks === 5) return 1.50;
      if (harvestAgeWeeks === 6) return 1.65;
      if (harvestAgeWeeks === 7) return 1.80;
      return 1.95; // 8+ weeks
    }
    if (birdType === 'turkey') {
      if (harvestAgeWeeks <= 8) return 1.85;
      if (harvestAgeWeeks <= 12) return 2.15;
      return 2.45;
    }
    // Noiler / dual purpose
    return 2.20;
  };

  const benchmarkFcr = getBenchmarkFcr();
  const fcrDifference = calculatedFcr - benchmarkFcr;

  // Economics
  const totalFeedCostNgn = totalBags25kg * (costPerBagNgn || 0);
  const feedCostPerKgMeatNgn = totalWeightProducedKg > 0 ? totalFeedCostNgn / totalWeightProducedKg : 0;

  // Monetary loss from poor FCR (excess feed consumed above breed standard)
  const idealFeedKg = totalWeightProducedKg * benchmarkFcr;
  const excessFeedKg = Math.max(0, totalFeedKg - idealFeedKg);
  const excessFeedBags = excessFeedKg / 25;
  const moneyLostToWastageNgn = excessFeedBags * (costPerBagNgn || 0);

  // Performance Rating
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
            <span className="text-emerald-400 font-semibold">Feed Conversion Ratio (FCR)</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 section-label-dark">
              <Scale className="h-4 w-4 text-emerald-400" />
              <span>Poultry Feed Economics Algorithm</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Feed Conversion Ratio (FCR) & <br />
              <span className="text-gradient-green">Meat Cost Margin Calculator</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Feed accounts for 70% to 75% of your total livestock rearing investment. Measure your flock&apos;s biological efficiency, compare against Cobb 500 and Ross 308 standards, and eliminate money lost to feed wastage.
            </p>
          </div>
        </div>
      </section>

      {/* Main Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Form Inputs (Left) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-heading">Flock & Feed Inputs</h2>
              <p className="text-xs text-slate-500">Enter your flock records to compute exact conversion</p>
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
                <span>6 Wks (Market Target)</span>
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

          {/* Results Analysis (Right) */}
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
                <span>3 Critical Levers to Cut FCR in Nigerian Farms</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-600">
                <div className="rounded-2xl border border-slate-100 p-3.5 space-y-1">
                  <div className="font-bold text-slate-800">1. Feeder Height & Spillage</div>
                  <p className="leading-relaxed">
                    Adjust feeder lips to the height of the bird&apos;s back. Overfilling accounts for up to 12% direct feed loss into the litter.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-3.5 space-y-1">
                  <div className="font-bold text-slate-800">2. Gut Integrity & Probiotics</div>
                  <p className="leading-relaxed">
                    Subclinical coccidiosis and necrotic enteritis damage intestinal villi, causing feed to pass through undigested.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-3.5 space-y-1">
                  <div className="font-bold text-slate-800">3. Water Sanitation & Ratio</div>
                  <p className="leading-relaxed">
                    Broilers drink 2x more water than they eat. Warm, chlorinated, or contaminated water instantly depresses feed conversion.
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
