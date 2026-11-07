'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { PRODUCTS } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PrintableBroodingChart } from '@/components/calculators/printable-brooding-chart';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';
import {
  ShoppingBag,
  CheckCircle2,
  Phone,
  Thermometer,
  Calculator,
  ArrowRight,
  ChevronRight,
  Flame,
  ShieldCheck,
  AlertTriangle,
  TrendingDown,
  XCircle,
  BookOpen,
  Star,
  Info,
  Clock,
  Activity,
  Layers,
} from 'lucide-react';

const BENCHMARKS = [
  { label: 'Week 1 Heat Target', value: '32°C–35°C', sub: 'at chick back height', color: 'text-amber-400' },
  { label: 'Weekly Deceleration', value: '3°C / week', sub: 'gradual acclimation', color: 'text-cyan-400' },
  { label: 'Target 1st-Wk Mortality', value: '<1.5%', sub: 'commercial standard', color: 'text-emerald-400' },
  { label: 'Chicks per Gas Brooder', value: '500–900', sub: 'LPG canopy capacity', color: 'text-emerald-400' },
];

const FAILURE_POINTS = [
  {
    icon: TrendingDown,
    title: 'Placing chicks on cold litter without 6-hour pre-heating',
    desc: 'Even if the air is warm, cold concrete and wood shavings suck core body heat directly from the chick\'s unfeathered abdomen, causing immediate hypothermia and delayed yolk sac absorption.',
  },
  {
    icon: AlertTriangle,
    title: 'Square pen corners causing fatal crush and suffocation piles',
    desc: 'When chicks feel drafty air or sudden noises, they instinctively bolt into 90-degree corners. They pile three to four layers deep, smothering the bottom chicks within minutes.',
  },
  {
    icon: XCircle,
    title: 'Excessive heat causing severe dehydration & pasted vents',
    desc: 'Temperatures above 36°C force chicks to pant relentlessly, losing body water rapidly. They stop eating, develop pasted vents from sticky uric acid droppings, and die of dehydration.',
  },
  {
    icon: TrendingDown,
    title: 'Cold drinking water shocking day-old core body temperature',
    desc: 'Providing icy bore-hole water to newly arrived chicks drops internal body temperature instantly. Water in brooder drinkers must be allowed to acclimate to 20°C–24°C before chick release.',
  },
];

const PILLARS = [
  {
    num: '01',
    icon: Flame,
    title: '6-Hour Pen Pre-Heating',
    desc: 'Fire up gas brooders 4 to 6 hours before arrival. Concrete and litter must reach 32°C before the first chick touches the floor.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    num: '02',
    icon: Layers,
    title: 'Curved Guard Ring Geometry',
    desc: 'Use circular corrugated cardboard brooder rings. Eliminating 90° corners completely stops fatal chick piling and smothering.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    num: '03',
    icon: Activity,
    title: 'Behavior-Driven Heat Calibration',
    desc: 'Do not rely solely on thermometers. Watch chick dispersal patterns: active, evenly spaced chicks indicate perfect thermal comfort.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'Electrolyte & Vitamin Priming',
    desc: 'Offer warm water fortified with electrolytes and Vitamin C for the first 3 hours before presenting starter crumble feed.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
];

// INFORMATION GAIN: Weekly Temperature & Behavioral Matrix
const TEMPERATURE_MATRIX = [
  { week: 'Week 1 (Days 1–7)', tempRange: '32°C – 35°C', brooderHeight: '0.8 – 1.0 m', behavior: 'Evenly scattered, active feeding, continuous gentle chirping', riskStatus: 'Critical Heat Zone', riskColor: 'text-amber-700 bg-amber-50' },
  { week: 'Week 2 (Days 8–14)', tempRange: '29°C – 30°C', brooderHeight: '1.0 – 1.2 m', behavior: 'Expanding to ring perimeter, rapid feather bud development', riskStatus: 'High Heat Zone', riskColor: 'text-cyan-700 bg-cyan-50' },
  { week: 'Week 3 (Days 15–21)', tempRange: '26°C – 27°C', brooderHeight: '1.2 – 1.4 m', behavior: 'Guard rings removed, flock occupying entire pen floor', riskStatus: 'Transition Zone', riskColor: 'text-emerald-700 bg-emerald-50' },
  { week: 'Week 4 (Days 22–28)', tempRange: '22°C – 24°C', brooderHeight: 'Off / Ambient', behavior: 'Full juvenile feathering, natural resistance to ambient dips', riskStatus: 'Ambient Rearing', riskColor: 'text-slate-700 bg-slate-100' },
];

const HONESTY_FILTERS = [
  'You do not have a dedicated pen thermometer and plan to guess temperatures with your bare hands.',
  'You do not have backup gas cylinders for harmattan night temperature drops between 2:00 AM and 6:00 AM.',
  'You plan to brood 1,000 chicks in a square concrete room without rounded brooder guard rings.',
  'You believe heat lamps can substitute for dry wood shavings and proper natural pen ventilation.',
];

const FAQ_DISPLAY = [
  {
    q: 'What temperature should a chick brooder be in Celsius for Weeks 1 through 4?',
    a: 'Week 1: 32°C to 35°C at chick height; Week 2: 29°C to 30°C; Week 3: 26°C to 27°C; Week 4: 22°C to 24°C. Reduce temperature by approximately 3°C per week until chicks are fully feathered.',
  },
  {
    q: 'How can you tell if day-old chicks are too cold, too hot, or comfortable?',
    a: 'Evenly spread chicks eating and drinking = perfect temperature. Chicks crowded and piling tightly under heat = too cold. Chicks fleeing to walls and panting = too hot. Chicks huddled on one side = drafty wind leak.',
  },
  {
    q: 'How many chicks can one LPG radiant canopy gas brooder heat in Nigeria?',
    a: 'A standard 20,000–25,000 BTU canopy gas brooder comfortably heats 500 to 900 chicks. In cold harmattan nights in Northern/Central Nigeria, limit to 500–600 chicks. In humid wet season conditions, it supports up to 900 chicks.',
  },
  {
    q: 'How much brooding floor space is required per chick?',
    a: 'During the first 14 days, allow 0.05 m² (approx. 0.54 sq. ft) per chick in the brooder ring — about 20 chicks per m². In Weeks 3 and 4, expand the ring to double the space (0.09–0.10 m² per bird).',
  },
  {
    q: 'Why are circular brooder guard rings recommended instead of square corners?',
    a: 'Circular rings eliminate 90° corners. When chicks feel temperature drops or get startled, they run into corners and pile up. Bottom chicks quickly suffocate. Curved walls eliminate crush corners completely.',
  },
  {
    q: 'How long before chick arrival should the brooder be pre-heated?',
    a: 'Pre-heat the brooder for at least 4 to 6 hours before arrival. It is essential that floor concrete and wood shaving litter absorb heat to reach 32°C. Cold litter causes hypothermia and delayed yolk sac absorption.',
  },
];

export default function BrooderCalculatorClient() {
  const { addItem } = useCart();
  const [flockSize, setFlockSize] = useState<number>(500);
  const [birdType, setBirdType] = useState<'broiler' | 'layer'>('broiler');
  const [packageAdded, setPackageAdded] = useState(false);

  const safeFlock = Math.max(50, flockSize || 50);

  const gasBrooderCount = Math.max(1, Math.ceil(safeFlock / 900));
  const feedingTrayCount = Math.max(2, Math.ceil(safeFlock / 80));
  const drinkerCount = Math.max(2, Math.ceil(safeFlock / 60));
  const floorAreaSqM = (safeFlock * 0.05).toFixed(1);
  const floorAreaSqFt = (safeFlock * 0.05 * 10.764).toFixed(0);
  const starterFeedKg = Math.round(safeFlock * (birdType === 'broiler' ? 0.45 : 0.35));
  const starterBags25kg = Math.ceil(starterFeedKg / 25);

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
            <span className="text-slate-300">Brooder Calculator</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* LEFT — 7 cols */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/25 px-5 py-2 rounded-full">
                  <Flame className="h-3.5 w-3.5" />
                  Thermal Brooding Architecture
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
                  Sub-1.5% Mortality Standard
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                Brooder Temperature Calculator &{' '}
                <span className="text-gradient-green">Weekly Heat Management Guide</span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed">
                Protect your day-old chick investment. Calculate exact LPG radiant canopy gas brooders, floor space, chick feeding trays, bell drinkers, and starter feed requirements calibrated for Nigerian tropical conditions.
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                <Star className="h-3.5 w-3.5 text-emerald-400" />
                Your Satisfaction Is Our Priority
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  'Week 1–4 Temperature Schedule',
                  'LPG Canopy Brooder Sizing',
                  'Floor Area in m² and sq. ft',
                  'Chick Feeder & Drinker Counts',
                  'Starter Feed Bag Forecast',
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
                  Size My Brooder Equipment
                </a>
                <a
                  href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20a%20formal%20quote%20for%20brooder%20equipment%20and%20gas%20heaters.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
                >
                  <Phone className="h-4 w-4" />
                  Get Equipment Quote on WhatsApp
                </a>
                <Link
                  href="/broilers"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  <span>Order Day-Old Chicks</span>
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
                      <Thermometer className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-heading">Thermal Brooding Target</h3>
                      <p className="text-xs text-slate-400">Week 1 Critical Lifeline</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Day 1–7 Target
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Litter Temp</div>
                    <div className="text-2xl font-extrabold text-amber-400 font-heading mt-1">32°–35°C</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">at chick back height</div>
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Floor Density</div>
                    <div className="text-2xl font-extrabold text-cyan-400 font-heading mt-1">20 chicks/m²</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">inside guard ring</div>
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Pre-Heat Time</div>
                    <div className="text-2xl font-extrabold text-emerald-400 font-heading mt-1">4–6 Hours</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">before chick placement</div>
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Water Temp</div>
                    <div className="text-2xl font-extrabold text-blue-400 font-heading mt-1">20°–24°C</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">never icy borehole</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-950/60 border border-amber-500/20 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <span>The First 72 Hours Define Your Flock</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Chicks cannot regulate their own body temperature until Day 10 to 14. An uncalibrated brooder leads to chilling, pasted vents, and stunted flock uniformity that cannot be corrected later.
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
          MAIN CALCULATOR SECTION
          ==================================================================== */}
      <section id="calculator-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="section-label mx-auto w-fit">
            <Calculator className="h-3.5 w-3.5" />
            Equipment & Space Sizing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Configure Your Brooder Infrastructure
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Enter your flock count and bird type to generate recommended floor space, gas heaters, feeders, and starter feed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Panel (Left 5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center">1</span>
                Flock Parameters
              </h3>
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
                  Maintain <strong>32°C – 35°C</strong> at chick height during Days 1–3, gradually reducing by 2.5°C–3°C weekly until room ambient is reached.
                </p>
              </div>
            </div>
          </div>

          {/* Results & Equipment Package (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-8">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 font-heading flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center">2</span>
                    Recommended Infrastructure
                  </h3>
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
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-heading">
                    Itemized Equipment Package:
                  </h4>
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
                    className="flex-1 justify-center py-4 rounded-xl font-bold text-sm h-auto bg-emerald-600 hover:bg-emerald-700 text-white"
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
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md text-sm whitespace-nowrap"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Get Quote on WhatsApp</span>
                  </a>
                </div>

                {/* Live Brooding Field Demonstration Video */}
                <div className="pt-4 border-t border-slate-100">
                  <MediaVideoPlayer
                    src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/chicks%20feeder.mp4"
                    poster="/products/Acessories/feeder.jpeg"
                    title="Brooder Pen Chick Feeder Operation"
                    badge="Brooding Equipment"
                    caption="Early starter feed trays designed for day-old chick access & low feed wastage"
                    aspectRatio="video"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PROBLEM: WHY 5% TO 10% OF CHICKS DIE IN WEEK 1
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <AlertTriangle className="h-3.5 w-3.5" />
              The Brooding Trap
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why 5% to 10% of Day-Old Chicks Die in Week 1
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Chicks are not dying from natural weakness. Over 80% of first-week chick mortality is caused by avoidable thermal shock, corner smothering, and cold concrete litter.
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
          INFORMATION GAIN: TEMPERATURE & BEHAVIOR MATRIX
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Thermometer className="h-3.5 w-3.5" />
              Unique Information Gain
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Brooder Temperature Schedule (Celsius) & Behavioral Guide
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Use this weekly thermal deceleration chart. Always match thermometer readings with chick spatial behavior on the pen floor.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Flock Age</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Target Temp (°C)</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Canopy Height</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Chick Behavioral Indicator</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Thermal Zone</th>
                </tr>
              </thead>
              <tbody>
                {TEMPERATURE_MATRIX.map((row, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-t border-slate-100`}>
                    <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">{row.week}</td>
                    <td className="px-5 py-4 font-mono font-bold text-amber-600">{row.tempRange}</td>
                    <td className="px-5 py-4 text-slate-600">{row.brooderHeight}</td>
                    <td className="px-5 py-4 text-slate-600 text-xs leading-relaxed">{row.behavior}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${row.riskColor}`}>
                        {row.riskStatus}
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
              Temperatures must be measured at chick back height (approx. 5 cm off the litter), never at the ceiling or brooder rim.
            </span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4-PILLAR BROODING PROTOCOL
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              The Brooding Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 4-Pillar Precision Brooding System
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Keep first-week chick mortality below 1.5% with this clinical protocol implemented by commercial hatcheries across Nigeria.
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
              This Brooder Tool May Not Be for You If...
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
                But if you want predictable, uniform, sub-1.5% mortality brooding with equipment sized to the exact square foot — this system was built for you.
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
              Everything About Chick Brooder Temperatures & Equipment
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
            <Flame className="h-3.5 w-3.5" />
            Equipment Ready for Dispatch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Order Certified Brooder Equipment for{' '}
            <span className="text-gradient-green">Your Next Batch</span>
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Get genuine LPG canopy gas brooders, anti-spill chick feeding trays, and bell drinkers delivered directly to your farm gate across Nigeria before your chicks arrive.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20gas%20brooders%20and%20chick%20brooding%20equipment%20for%20my%20farm.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
            >
              <Phone className="h-5 w-5" />
              Order Brooder Equipment — WhatsApp
            </a>
            <Link
              href="/broilers"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
            >
              <Clock className="h-4 w-4" />
              View Day-Old Chick Batches
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            Commercial LPG brooders · 20,000–25,000 BTU · Free sizing advisory · Nationwide delivery
          </p>
        </div>
      </section>

    </div>
  );
}
