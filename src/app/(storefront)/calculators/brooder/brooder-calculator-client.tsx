'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { PRODUCTS } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PrintableBroodingChart } from '@/components/calculators/printable-brooding-chart';
import {
  ShoppingBag,
  CheckCircle2,
  Phone,
  Thermometer,
  Calculator,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export default function BrooderCalculatorClient() {
  const { addItem } = useCart();
  const [flockSize, setFlockSize] = useState<number>(500);
  const [birdType, setBirdType] = useState<'broiler' | 'layer'>('broiler');
  const [packageAdded, setPackageAdded] = useState(false);

  // Brooding ratios based on tropical livestock standards:
  // - 1 Canopy Gas Brooder handles up to 900 chicks
  // - 1 Chick Feeding Tray handles approx. 80 chicks
  // - 1 Manual Bell Drinker handles approx. 60 chicks
  // - Minimum brooding floor space: 0.05 sq. metres per chick (20 chicks per sq. metre in brooding ring)
  const safeFlock = Math.max(50, flockSize || 50);

  const gasBrooderCount = Math.max(1, Math.ceil(safeFlock / 900));
  const feedingTrayCount = Math.max(2, Math.ceil(safeFlock / 80));
  const drinkerCount = Math.max(2, Math.ceil(safeFlock / 60));
  const floorAreaSqM = (safeFlock * 0.05).toFixed(1);
  const floorAreaSqFt = (safeFlock * 0.05 * 10.764).toFixed(0);
  const starterFeedKg = Math.round(safeFlock * (birdType === 'broiler' ? 0.45 : 0.35));
  const starterBags25kg = Math.ceil(starterFeedKg / 25);

  // Map to catalog products
  const gasBrooderProduct = PRODUCTS.find((p) => p.slug === 'infrared-radiant-gas-brooder-heater');
  const feedingTrayProduct = PRODUCTS.find((p) => p.slug === 'day-old-chick-brooding-feeding-tray');
  const drinkerProduct = PRODUCTS.find((p) => p.slug === 'manual-conical-poultry-feeder');

  const handleAddPackageToCart = () => {
    if (gasBrooderProduct) addItem(gasBrooderProduct, gasBrooderCount);
    if (feedingTrayProduct) addItem(feedingTrayProduct, feedingTrayCount);
    if (drinkerProduct) addItem(drinkerProduct, drinkerCount);

    setPackageAdded(true);
    setTimeout(() => setPackageAdded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50/70">
      {/* ====================================================================
          CINEMATIC DARK HERO
          ==================================================================== */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <Link href="/knowledge" className="hover:text-emerald-400 transition-colors">Knowledge & Tools</Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-emerald-400 font-semibold">Brooder Calculator</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="section-label-dark">
              <Calculator className="h-3.5 w-3.5 text-emerald-400" />
              Interactive Farm Engineering Utility
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight">
              Poultry Brooder Equipment <br />
              <span className="text-gradient-green">& Space Calculator</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Accurately compute brooding floor area, radiant gas heating heaters, feeding trays, drinker units, and first 14-day starter feed requirement for your flock size.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CALCULATOR MAIN GRID
          ==================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 z-20 relative pb-20 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Panel (Left 5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center">1</span>
                Flock Parameters
              </h2>
              <p className="text-xs text-slate-500 mt-1">Specify your flock size and target bird type</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Target Number of Day-Old Chicks:
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    min={50}
                    max={50000}
                    step={50}
                    value={flockSize}
                    onChange={(e) => setFlockSize(Number(e.target.value))}
                    className="text-xl font-extrabold text-slate-900 pr-16 py-3.5 rounded-2xl border-slate-300 focus:ring-emerald-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">birds</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <span className="block text-[11px] font-semibold text-slate-500 mb-2">Popular Flock Sizes:</span>
                <div className="flex flex-wrap gap-2">
                  {[200, 500, 1000, 2500, 5000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setFlockSize(preset)}
                      className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                        flockSize === preset
                          ? 'bg-slate-950 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Bird Production Type:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBirdType('broiler')}
                    className={`rounded-2xl border p-4 text-center transition-all ${
                      birdType === 'broiler'
                        ? 'border-emerald-500 bg-emerald-50/70 font-extrabold text-emerald-900 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="block text-sm font-bold font-heading">Commercial Broiler</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">Rapid Meat Production</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBirdType('layer')}
                    className={`rounded-2xl border p-4 text-center transition-all ${
                      birdType === 'layer'
                        ? 'border-emerald-500 bg-emerald-50/70 font-extrabold text-emerald-900 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="block text-sm font-bold font-heading">Brown Layer Pullet</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">Egg Production</span>
                  </button>
                </div>
              </div>

              {/* Crucial Brooding Protocol Notice */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-950 space-y-1.5">
                <div className="font-bold flex items-center space-x-1.5 text-amber-900">
                  <Thermometer className="h-4 w-4 text-amber-700 shrink-0" />
                  <span>Crucial Brooding Temperature Target:</span>
                </div>
                <p className="leading-relaxed">
                  Maintain <strong>32°C – 35°C</strong> at chick height during Days 1–3, gradually reducing by 2.5°C weekly until room ambient is reached. Avoid chick huddling around heat sources.
                </p>
              </div>
            </div>
          </div>

          {/* Results & Equipment Package (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-8">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center">2</span>
                    Recommended Infrastructure
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Engineered for {safeFlock.toLocaleString()} {birdType === 'broiler' ? 'Broiler' : 'Layer'} chicks in Nigeria
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full whitespace-nowrap">
                  Tropical Standard
                </span>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Floor Space</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-1">
                    {floorAreaSqM} m²
                  </div>
                  <span className="text-[10px] text-slate-400">({floorAreaSqFt} sq. ft)</span>
                </div>

                <div className="rounded-2xl bg-emerald-50/60 p-4 border border-emerald-200/80">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">Gas Brooders</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 font-heading mt-1">
                    {gasBrooderCount} {gasBrooderCount === 1 ? 'Unit' : 'Units'}
                  </div>
                  <span className="text-[10px] text-slate-400">LPG Canopy</span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Feeding Trays</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-1">
                    {feedingTrayCount} Trays
                  </div>
                  <span className="text-[10px] text-slate-400">Starter Pans</span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Drinkers</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-1">
                    {drinkerCount} Units
                  </div>
                  <span className="text-[10px] text-slate-400">Bell / Fount</span>
                </div>
              </div>

              {/* Feed Consumption Estimation Strip */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-xs text-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="font-bold text-slate-900 block text-sm mb-0.5">First 14 Days Starter Feed:</span>
                  Estimated requirement is <strong>{starterFeedKg.toLocaleString()} kg</strong> (~{starterBags25kg} bags of 25kg commercial starter crumble).
                </div>
                <Link
                  href="/drugs/ascorbic-acid-vitamin-c-anti-stress-powder"
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-bold shrink-0 flex items-center gap-1"
                >
                  <span>Pair Anti-Stress Vitamins</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Itemized Package & Dynamic Pricing */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-heading">
                    Itemized Equipment Package:
                  </h3>
                  <span className="text-xs text-slate-500">Current Market Rates</span>
                </div>

                <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <div className="flex justify-between py-2.5">
                    <span className="text-slate-800 font-medium">
                      {gasBrooderCount}x Infrared Radiant Gas Brooder Canopy Units
                    </span>
                    <span className="text-xs text-emerald-700 font-bold">Price on Request</span>
                  </div>

                  <div className="flex justify-between py-2.5">
                    <span className="text-slate-800 font-medium">
                      {feedingTrayCount}x Day-Old Chick Brooding Feeding Trays
                    </span>
                    <span className="text-xs text-emerald-700 font-bold">Price on Request</span>
                  </div>

                  <div className="flex justify-between py-2.5">
                    <span className="text-slate-800 font-medium">
                      {drinkerCount}x Manual Poultry Feeder / Drinker Founts
                    </span>
                    <span className="text-xs text-emerald-700 font-bold">Price on Request</span>
                  </div>

                  <div className="flex justify-between py-3 border-t-2 border-slate-200 text-xs text-slate-600">
                    <span className="font-semibold">Pricing Policy:</span>
                    <span className="text-emerald-800 font-extrabold">Weekly Verified Commercial Breeder & Manufacturer Rates</span>
                  </div>
                </div>

                {/* Export & PDF Brooding Management Chart */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-slate-900 font-heading">
                    Export & Pen Wall Brooding Chart:
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Generate an official brooding schedule with temperature, feeding, and vaccine milestones sized specifically for your {safeFlock.toLocaleString()} chicks.
                  </p>
                  <PrintableBroodingChart
                    data={{
                      flockSize: safeFlock,
                      birdType,
                      gasBrooders: gasBrooderCount,
                      feedingTrays: feedingTrayCount,
                      drinkers: drinkerCount,
                      floorAreaSqM,
                      floorAreaSqFt,
                      starterFeedKg,
                      starterBags25kg,
                    }}
                  />
                </div>

                {/* Conversion Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddPackageToCart}
                    className="flex-1 justify-center py-4 rounded-2xl font-bold text-sm h-auto"
                  >
                    {packageAdded ? (
                      <span className="flex items-center gap-2 text-white">
                        <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                        <span>Package Added to Inquiry List!</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5" />
                        <span>Add Equipment Package to Inquiry</span>
                      </span>
                    )}
                  </Button>

                  <a
                    href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20used%20your%20Brooder%20Calculator%20for%20${safeFlock}%20${birdType}%20chicks.%20Required%20equipment:%20${gasBrooderCount}x%20Gas%20Brooders,%20${feedingTrayCount}x%20Feeding%20Trays,%20${drinkerCount}x%20Drinkers.%20Please%20send%20me%20today's%20formal%20quote.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-md text-sm whitespace-nowrap"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Get Quote on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
