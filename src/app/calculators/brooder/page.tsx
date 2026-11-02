'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { PRODUCTS } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ShoppingBag,
  CheckCircle2,
  Phone,
  Thermometer,
} from 'lucide-react';

export default function BrooderCalculatorPage() {
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
  const drinkerProduct = PRODUCTS.find((p) => p.slug === 'manual-conical-poultry-feeder'); // or drinker

  const gasBrooderTotal = (gasBrooderProduct?.price || 38500) * gasBrooderCount;
  const feedingTrayTotal = (feedingTrayProduct?.price || 1800) * feedingTrayCount;
  const drinkerTotal = (drinkerProduct?.price || 4200) * drinkerCount;
  const estimatedEquipmentTotal = gasBrooderTotal + feedingTrayTotal + drinkerTotal;

  const handleAddPackageToCart = () => {
    if (gasBrooderProduct) addItem(gasBrooderProduct, gasBrooderCount);
    if (feedingTrayProduct) addItem(feedingTrayProduct, feedingTrayCount);
    if (drinkerProduct) addItem(drinkerProduct, drinkerCount);

    setPackageAdded(true);
    setTimeout(() => setPackageAdded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Brooder Equipment Calculator</span>
        </nav>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
              🧮 Interactive Farm Planning Utility
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
              Poultry Brooder Equipment Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Calculate exact brooding space, radiant gas heating units, starter feeding trays, drinkers, and estimated initial capital required for your specific flock size.
            </p>
          </div>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-heading">1. Farm Parameters</h2>
              <p className="text-xs text-slate-500 mt-1">Specify your flock size and target bird type</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
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
                    className="text-lg font-bold text-slate-900 pr-12"
                  />
                  <span className="absolute right-3.5 top-3 text-xs font-medium text-slate-400">birds</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2">
                {[200, 500, 1000, 2500, 5000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setFlockSize(preset)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      flockSize === preset
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {preset.toLocaleString()} birds
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Bird Production Type:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBirdType('broiler')}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      birdType === 'broiler'
                        ? 'border-emerald-500 bg-emerald-50/50 font-bold text-emerald-800 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="block text-sm">Commercial Broiler</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">Meat Production</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBirdType('layer')}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      birdType === 'layer'
                        ? 'border-emerald-500 bg-emerald-50/50 font-bold text-emerald-800 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="block text-sm">Brown Layer Pullet</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">Table Egg Layer</span>
                  </button>
                </div>
              </div>

              {/* Brooding Protocol Alert */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 space-y-1">
                <div className="font-semibold flex items-center space-x-1.5">
                  <Thermometer className="h-4 w-4 text-amber-700" />
                  <span>Crucial Temperature Target:</span>
                </div>
                <p>
                  Maintain <strong>32°C – 35°C</strong> at chick height during Days 1–3, dropping 2.5°C weekly until ambient room temperature is reached at week 4.
                </p>
              </div>
            </div>
          </div>

          {/* Results & Equipment Package Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-heading">
                    2. Recommended Brooding Infrastructure
                  </h2>
                  <p className="text-xs text-slate-500">
                    Engineered for {safeFlock.toLocaleString()} {birdType === 'broiler' ? 'Broiler' : 'Layer'} chicks
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  Nigerian Climate Standard
                </span>
              </div>

              {/* Specification Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <span className="text-[10px] uppercase font-semibold text-slate-500">Floor Space</span>
                  <div className="text-xl font-extrabold text-slate-900 font-heading mt-1">
                    {floorAreaSqM} m²
                  </div>
                  <span className="text-[10px] text-slate-400">({floorAreaSqFt} sq. ft)</span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <span className="text-[10px] uppercase font-semibold text-slate-500">Gas Brooders</span>
                  <div className="text-xl font-extrabold text-emerald-700 font-heading mt-1">
                    {gasBrooderCount} Unit{gasBrooderCount > 1 ? 's' : ''}
                  </div>
                  <span className="text-[10px] text-slate-400">Canopy LPG heaters</span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <span className="text-[10px] uppercase font-semibold text-slate-500">Feeding Trays</span>
                  <div className="text-xl font-extrabold text-slate-900 font-heading mt-1">
                    {feedingTrayCount} Trays
                  </div>
                  <span className="text-[10px] text-slate-400">Low-lip starter pans</span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <span className="text-[10px] uppercase font-semibold text-slate-500">Starter Drinkers</span>
                  <div className="text-xl font-extrabold text-slate-900 font-heading mt-1">
                    {drinkerCount} Units
                  </div>
                  <span className="text-[10px] text-slate-400">Fount or bell drinkers</span>
                </div>
              </div>

              {/* Feed Consumption Estimation */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-xs text-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="font-semibold text-slate-900">First 14 Days Starter Feed:</span>{' '}
                  Approximately <strong>{starterFeedKg} kg</strong> (~{starterBags25kg} bags of 25kg commercial starter crumble).
                </div>
                <Link
                  href="/drugs/ascorbic-acid-vitamin-c-anti-stress-powder"
                  className="text-xs text-emerald-700 hover:underline font-semibold shrink-0"
                >
                  Pair with Anti-Stress Vitamins →
                </Link>
              </div>

              {/* Itemized Equipment Cost Breakdown */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                  Equipment Investment Package:
                </h3>

                <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">
                      {gasBrooderCount}x Infrared Radiant Gas Brooder Canopy (₦38,500/ea)
                    </span>
                    <span className="font-semibold text-slate-900">₦{gasBrooderTotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">
                      {feedingTrayCount}x Day-Old Chick Brooding Feeding Tray (₦1,800/ea)
                    </span>
                    <span className="font-semibold text-slate-900">₦{feedingTrayTotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">
                      {drinkerCount}x Manual Poultry Feeder / Drinker Fount (₦4,200/ea)
                    </span>
                    <span className="font-semibold text-slate-900">₦{drinkerTotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-3 border-t-2 border-slate-200 text-base font-bold text-slate-950 font-heading">
                    <span>Estimated Total Equipment:</span>
                    <span className="text-emerald-700">₦{estimatedEquipmentTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddPackageToCart}
                    className="flex-1 justify-center"
                  >
                    {packageAdded ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-300" />
                        <span>Package Added to Order Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        <span>Add Complete Equipment Package to Order</span>
                      </>
                    )}
                  </Button>

                  <a
                    href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20used%20your%20Brooder%20Calculator%20for%20${safeFlock}%20${birdType}%20chicks.%20Estimated%20equipment%20package:%20₦${estimatedEquipmentTotal.toLocaleString()}.%20Please%20send%20me%20a%20formal%20quote.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="whatsapp" size="lg" className="w-full sm:w-auto justify-center">
                      <Phone className="h-5 w-5 mr-2" />
                      <span>Request Quote on WhatsApp</span>
                    </Button>
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
