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
} from 'lucide-react';

interface StrainInfo {
  id: string;
  name: string;
  badge: string;
  cartonPriceEstimate: string;
  perBirdEstimate: string;
  targetHarvest: string;
  maturityWeeks: string;
  fcrModel: string;
  livability: string;
  bestFor: string;
  description: string;
}

const STRAINS: StrainInfo[] = [
  {
    id: 'white',
    name: 'Commercial White Cockerel',
    badge: 'Layer Parentage (ISA / Shaver Male)',
    cartonPriceEstimate: '₦10,000 – ₦18,500',
    perBirdEstimate: '₦200 – ₦370',
    targetHarvest: '2.0kg – 2.4kg',
    maturityWeeks: '20 – 24 Weeks',
    fcrModel: 'Economic Grain & Forage Rearing',
    livability: '96.5% Target Livability',
    bestFor: 'Budget festive rearing, village market live-bird sales, low-capital entry',
    description:
      'High-vigor male chicks from commercial layer parent stock. Incredibly hardy immune systems, high tolerance to heat and basic open-sided pen housing, and very low initial chick investment.',
  },
  {
    id: 'black',
    name: 'Black & Colored Heavy Cockerel',
    badge: 'Heavy Rustic Lineage',
    cartonPriceEstimate: '₦30,000 – ₦55,000',
    perBirdEstimate: '₦600 – ₦1,100',
    targetHarvest: '2.5kg – 3.2kg',
    maturityWeeks: '18 – 22 Weeks',
    fcrModel: 'Moderate Meat-Grower Rations',
    livability: '97.2% Target Livability',
    bestFor: 'Premium hotel/restaurant dressing, festive roasting, high-margin live market sales',
    description:
      'Robust dual-purpose and rustic cockerel strains bred for heavier bone frames and darker plumage. Highly sought after in Nigerian traditional markets command higher live-bird premiums than white strains.',
  },
];

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'What is the current price of a carton of day-old cockerel chicks in Nigeria?',
    a: 'Cockerel prices in Nigeria fluctuate weekly based on parent-stock hatching volume and grain costs. White cockerel cartons (50 chicks) typically trade between ₦10,000 and ₦18,500, while Black/Colored heavy cockerels range between ₦30,000 and ₦55,000 per carton. Because prices adjust every Monday and Thursday, message our booking desk on WhatsApp (+234 813 916 9402) for today’s confirmed hatchery rate.',
  },
  {
    q: 'What is the sexing accuracy guarantee for day-old cockerels?',
    a: 'All day-old cockerels allotted by D-AminGrow undergo commercial vent and feather sexing by trained hatchery technicians from accredited breeding centers (Chi, Amo, Zartech, Supreme). We guarantee a minimum 98% male sexing accuracy per carton of 50 chicks.',
  },
  {
    q: 'How many months does it take a cockerel to reach 2.5kg market size in Nigeria?',
    a: 'Under standard Nigerian tropical farm conditions, commercial white cockerels reach 2.0kg–2.4kg between 20 and 24 weeks (5 to 6 months). Black and heavy colored strains reach 2.5kg–3.0kg faster, usually between 18 and 22 weeks when fed balanced grower mash supplemented with whole grains.',
  },
  {
    q: 'Can I feed cockerels with kitchen waste and local grains instead of expensive commercial feed?',
    a: 'Yes, but timing is critical. During the first 4 weeks (brooding phase), cockerels must receive high-protein Chick Starter Mash (20% CP) to build bone density, heart volume, and gut immunity. From Week 5 onwards, you can transition to economical grower rations diluted with maize bran, wheat offal, dried brewers grain (BDG), and green forage without risking mortality.',
  },
  {
    q: 'What are the official dispatch days and cutoff times for cockerel bookings?',
    a: 'Interstate hatch allocations move strictly on Mondays and Thursdays. Booking cutoffs are Saturday at 2:00 PM WAT for Monday dispatch, and Tuesday at 2:00 PM WAT for Thursday dispatch. Stock is shipped in ventilated cartons with driver contacts and waybill references issued on departure.',
  },
  {
    q: 'How do I make payment and ensure my capital is protected?',
    a: 'All commercial orders must be paid directly into D-AminGrow’s official corporate bank account: Zenith Bank Plc, Account Number: 1017894562, Account Name: D-AminGrow Agric Ltd. We do not accept transfers into personal accounts or agent wallets. A formal booking receipt and allocation reference code are generated upon deposit.',
  },
  {
    q: 'Are cockerel chicks pre-vaccinated against Marek’s Disease at hatch?',
    a: 'Yes. Every carton of cockerel chicks supplied by D-AminGrow is vaccinated against Marek’s Disease (HVT strain) at the hatchery prior to packaging. A suggested routine Newcastle (LaSota) and Gumboro (IBD) vaccination program is included with every delivery.',
  },
];

export function CockerelLandingClient({
  nextMonday,
  nextThursday,
}: {
  nextMonday: string;
  nextThursday: string;
}) {
  const [selectedStrain, setSelectedStrain] = useState<StrainInfo>(STRAINS[0] as StrainInfo);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedBank, setCopiedBank] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('1017894562');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 3000);
  };

  return (
    <div className="font-body bg-slate-50 text-slate-900 min-h-screen">

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/day-old-chicks" className="hover:text-emerald-700 transition-colors">
              Day-Old Chicks
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-900">Commercial Cockerels</span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          1. HERO SECTION (2-GRID COLUMNS MATCHING HOMEPAGE)
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden min-h-[85vh] flex items-center bg-[#050E08] text-white">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left Column (7 cols): Benefit-Driven Copy, Hook, CTAs */}
            <div className="lg:col-span-7 space-y-7 text-left">

              {/* Credibility Badge */}
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Rugged Tropical Lineage · Low-Capital Festive Farming
                </div>
              </div>

              {/* Primary H1 Directive */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                  Day-Old Cockerel Chicks Price in Nigeria:{' '}
                  <span className="text-gradient-green">White &amp; Heavy Strains</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                  Turn low chick capital into solid festive profits. Direct allocations of Marek&apos;s-vaccinated white layer cockerels and black heavy strains from Chi, Amo, Zartech, and Supreme hatcheries. Guaranteed 98%+ sexing accuracy with temperature-monitored Monday and Thursday waybill dispatch across all 36 states.
                </p>
              </div>

              {/* Brand Commitment Pill */}
              <div>
                <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs">
                  <span className="text-slate-400 font-medium uppercase tracking-wider">Our Commitment</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 font-bold italic">&ldquo;Your Satisfaction Is Our Priority&rdquo;</span>
                </div>
              </div>

              {/* Primary Action Zone — High Visual Weight */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20check%20today%27s%20cockerel%20carton%20price%20and%20lock%20my%20quota."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Check Today&apos;s Cockerel Rates
                </a>

                <Link
                  href="/chicks?breed=cockerel"
                  className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
                >
                  Book Cockerel Cartons
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <a
                  href="tel:+2348139169402"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-3 py-4 rounded-xl transition-all duration-200 text-sm hover:underline"
                >
                  <Phone className="h-4 w-4 text-emerald-400" />
                  +234 813 916 9402
                </a>
              </div>

              {/* Trust Assurances Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs text-slate-400 border-t border-white/10">
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>50 Chicks Standard Carton</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>98%+ Male Sexing Accuracy</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Marek&apos;s Pre-Vaccinated</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Monday &amp; Thursday Dispatch</span>
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): Cockerel Strain Selection Cockpit Card */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md p-5 sm:p-7 shadow-2xl space-y-6">

                {/* Strain Toggle Switcher */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Feather className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Select Strain Model</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setSelectedStrain(STRAINS[0] as StrainInfo)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-lg transition-all ${
                        selectedStrain.id === 'white'
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      White
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedStrain(STRAINS[1] as StrainInfo)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-lg transition-all ${
                        selectedStrain.id === 'black'
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Black/Heavy
                    </button>
                  </div>
                </div>

                {/* Live Card Details */}
                <div className="rounded-2xl bg-slate-950/70 border border-white/10 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-extrabold text-white font-heading">
                        {selectedStrain.name}
                      </h3>
                      <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                        {selectedStrain.badge}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
                      {selectedStrain.livability}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-0.5">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Estimated Carton Rate</span>
                      <div className="text-sm font-extrabold text-white font-mono">
                        {selectedStrain.cartonPriceEstimate}
                      </div>
                      <span className="text-[10px] text-slate-400 block">50 chicks per box</span>
                    </div>

                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-0.5">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Target Live Weight</span>
                      <div className="text-sm font-extrabold text-emerald-400 font-heading">
                        {selectedStrain.targetHarvest}
                      </div>
                      <span className="text-[10px] text-slate-400 block">At {selectedStrain.maturityWeeks}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3">
                    {selectedStrain.description}
                  </p>
                </div>

                {/* Dispatch Countdown & Booking Route */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Next Hatch Runs: <strong className="text-white">Mon &amp; Thu WAT</strong></span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 font-mono">Cutoff 48h Prior</span>
                </div>

                {/* Official Escrow Account Box */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Zenith Bank: <strong className="text-white">1017894562</strong> (D-AminGrow Agric)</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="text-[10px] text-emerald-300 font-bold bg-emerald-500/20 hover:bg-emerald-500/30 px-2 py-1 rounded-md transition-all flex items-center gap-1"
                  >
                    {copiedBank ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedBank ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Action CTA inside card */}
                <a
                  href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20confirm%20current%20rates%20for%20${encodeURIComponent(selectedStrain.name)}%20and%20book%20cartons.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-md"
                >
                  <MessageCircle className="h-4 w-4" />
                  Inquire Today&apos;s Confirmed Rate
                </a>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          2. PROBLEM EXPLANATION: WHY COCKERELS ARE THE SMART FARMER'S CHOICE
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
              <TrendingUp className="h-3.5 w-3.5" />
              Low Capital, Resilient Cash-Flow
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why Cockerel Rearing Is Nigeria&apos;s Most Dependable Poultry Model
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Broiler farming in Nigeria has become increasingly high-stress due to surging commercial pellet prices (₦20,000+ per 25kg bag) and sensitivity to afternoon heat. Cockerels offer a reliable counter-model that protects smallholder and commercial working capital:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-lg">
                01
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                10x Lower Initial Chick Investment
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                While a carton of broiler chicks commands ₦80,000–₦110,000, white cockerels cost a fraction (₦10,000–₦18,500 per carton). A farmer can stock 200 cockerels with the budget required for just 25 broilers, massively lowering entry capital risk.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-lg">
                02
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                Rugged Natural Immunity (&gt;96% Livability)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Derived from layer breeding stock, cockerels have dense plumage and robust respiratory resilience. They withstand temperature swings, open-sided village housing, and rustic conditions that would trigger fatal ascites in rapid-growth broilers.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-extrabold text-lg">
                03
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                High Festive Market Live-Bird Demand
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Nigerian consumers prefer the lean, firm, and flavorful meat of mature cockerels for traditional stews and festive feasting. A 2.2kg–2.5kg cockerel consistently sells for ₦6,500–₦9,500 during Christmas, Easter, and Salah periods.
              </p>
            </div>
          </div>

          {/* Practical Opinion Box */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1 max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Practical Farm Strategy</div>
              <p className="text-sm sm:text-base font-semibold leading-relaxed">
                Do not attempt to feed cockerels commercial broiler finisher feed throughout their 24-week lifecycle. You will spend your profit on grain milling fees. Brood them strictly on high-protein starter for 4 weeks to lock organ vigor, then shift to economical farm-mixed grower rations with maize bran, wheat offal, and brewery grains.
              </p>
            </div>
            <Link
              href="/calculators/brooder"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm whitespace-nowrap shadow-md"
            >
              <Zap className="h-4 w-4" />
              Calculate Brooder Heat
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. INFORMATION GAIN: WHITE VS. BLACK COCKERELS MATRIX
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-1.5 rounded-full">
              <Scale className="h-3.5 w-3.5" />
              Strain Economics Comparison
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              White Cockerels vs. Black Heavy Cockerels: Comprehensive Matrix
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Choosing the right strain depends on your rearing budget, available land, and your target marketing window:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/15 bg-white/5 text-slate-300 text-xs uppercase tracking-wider font-bold">
                  <th className="p-4 sm:p-5">Performance Metric</th>
                  <th className="p-4 sm:p-5 text-emerald-400">Commercial White Cockerel</th>
                  <th className="p-4 sm:p-5 text-cyan-400">Black &amp; Colored Heavy Cockerel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-300">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Lineage &amp; Genetics</td>
                  <td className="p-4 sm:p-5">ISA Brown / Shaver Commercial Layer Male</td>
                  <td className="p-4 sm:p-5">Heavy Dual-Purpose &amp; Kuroiler/Noiler Cross</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Carton Price (50 Chicks)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">₦10,000 – ₦18,500 (Budget Entry)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-400 font-bold">₦30,000 – ₦55,000 (Premium Line)</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Initial Cost Per Chick</td>
                  <td className="p-4 sm:p-5 font-mono">₦200 – ₦370</td>
                  <td className="p-4 sm:p-5 font-mono">₦600 – ₦1,100</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Rearing Cycle to Market</td>
                  <td className="p-4 sm:p-5">20 – 24 Weeks (5 to 6 Months)</td>
                  <td className="p-4 sm:p-5">18 – 22 Weeks (4.5 to 5.5 Months)</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Target Live Harvest Weight</td>
                  <td className="p-4 sm:p-5 font-bold text-white">2.0kg – 2.4kg</td>
                  <td className="p-4 sm:p-5 font-bold text-white">2.6kg – 3.2kg (Heavier Breast Frame)</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Feed Tolerance Model</td>
                  <td className="p-4 sm:p-5">High tolerance to agricultural by-products &amp; offal</td>
                  <td className="p-4 sm:p-5">Responds faster to balanced grower nutrition</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Live-Bird Festive Price</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">₦6,500 – ₦8,500 / bird</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-400 font-bold">₦9,000 – ₦14,000 / bird</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Best Target Buyer</td>
                  <td className="p-4 sm:p-5">Open market live-bird retail, household cooks</td>
                  <td className="p-4 sm:p-5">Hotels, restaurants, premium festive roasters</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 border-t border-white/10 pt-4">
            <span>Prices fluctuate weekly based on parent-stock availability across Nigerian hatcheries.</span>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20compare%20white%20and%20black%20cockerel%20availability%20for%20my%20state."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1"
            >
              Ask Our Broodstock Specialist <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. THE ECONOMIC LOW-COST FEEDING FRAMEWORK
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Layers className="h-3.5 w-3.5" />
              Nutritional Cost Optimization
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 3-Phase Low-Cost Cockerel Feeding Framework
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              How experienced commercial farmers turn a ₦15,000 carton of cockerels into ₦350,000+ live-bird revenue without buying expensive commercial pellets after Month 1:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  Phase 1: Weeks 0–4
                </span>
                <span className="text-xs text-slate-500 font-mono">Brooding</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                High-Protein Starter Mash (20% CP)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Provide commercial chick starter mash with clean, cool water containing vitamins and glucose. Keep heat at 32°C–34°C. This builds the skeletal frame, bone marrow, and internal organs needed for long-term health.
              </p>
              <div className="text-xs text-slate-500 border-t border-slate-200 pt-3">
                Feed intake: ~1.0kg total per chick over 28 days.
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                  Phase 2: Weeks 5–18
                </span>
                <span className="text-xs text-slate-500 font-mono">Grower &amp; Forage</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                Economic Grower &amp; Grain Blends (14%–16% CP)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Gradually blend commercial grower mash with local agricultural by-products: maize offal, wheat bran, palm kernel cake (PKC), and dried brewer&apos;s grains (BDG). If land allows, let birds forage on deep litter or outdoor runs.
              </p>
              <div className="text-xs text-slate-500 border-t border-slate-200 pt-3">
                Cuts daily feeding expenses by 45% compared to broilers.
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full">
                  Phase 3: Weeks 19–24
                </span>
                <span className="text-xs text-slate-500 font-mono">Finisher Flash</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                Energy Density &amp; Festive Finishing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                In the 4 weeks leading up to market day, boost carbohydrates with broken corn, cassava peel mash, and vegetable fats. This rounds out breast conformation and enhances the rich yellow skin finish prized in Nigerian markets.
              </p>
              <div className="text-xs text-slate-500 border-t border-slate-200 pt-3">
                Final live weights: 2.2kg to 2.8kg ready for premium sale.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          5. THE 24-WEEK FESTIVE MARKET CALENDAR
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
                <Calendar className="h-3.5 w-3.5" />
                Timing Is Everything
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                The 24-Week Festive Market Booking Calendar
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Because cockerels require 20 to 24 weeks to mature, booking dates must be planned backwards from major Nigerian festival days to capture peak live-bird prices:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-600 font-mono">Target: Christmas Market</div>
                <h3 className="text-lg font-bold font-heading text-slate-900">December 20–25 Sales</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Booking Window:</strong> June 15 to July 10.<br />
                  Chicks arriving in early July reach full 2.4kg maturity and solid comb development by mid-December, selling for peak holiday prices.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-amber-600 font-mono">Target: Easter Market</div>
                <h3 className="text-lg font-bold font-heading text-slate-900">March–April Festive Sales</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Booking Window:</strong> October 15 to November 10.<br />
                  Brooded through the dry Harmattan season with low disease incidence, ready for premium live-bird sales during Easter celebrations.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-cyan-600 font-mono">Target: Salah &amp; Year-Round</div>
                <h3 className="text-lg font-bold font-heading text-slate-900">Eid &amp; Staggered Sales</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Booking Window:</strong> Continuous 6-month cycles.<br />
                  Staggering 50 to 100 birds every 60 days provides steady monthly cash flow to supply local meat sellers and ceremonial caterers.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span>Next Monday hatch day: <strong className="text-slate-900">{nextMonday}</strong> · Next Thursday: <strong className="text-slate-900">{nextThursday}</strong></span>
              <Link
                href="/chicks?breed=cockerel"
                className="font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
              >
                Reserve Your Batch Today <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. "WE MAY NOT BE RIGHT FOR YOU IF..." (INFORMATION GAIN QUALIFICATION)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-200/60 border border-slate-300 px-3.5 py-1.5 rounded-full">
                <XCircle className="h-3.5 w-3.5 text-slate-500" />
                Honest Farm Suitability
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                We May Not Be The Right Chick Supplier For You If...
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                We protect our farmers&apos; money by being transparent up-front. Cockerels are a patient, resilient model — not a quick cash scheme:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>You Need Fast 6-Week Cash Turnover</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cockerels take 20 to 24 weeks to reach commercial table size. If you need birds ready to harvest in 6 to 7 weeks for quick capital recycling, cockerels are the wrong model — you should order commercial broilers instead.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>You Want Unsexed Culls or Cheap Mixed Run</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Some street markets sell random unsexed culls with high female ratios. We only allot 98%+ sexed male cockerels from accredited partner hatcheries. If you are seeking sub-standard mixed culls, we do not stock them.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>You Expect Uninsulated Passenger Transit</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We refuse to dispatch day-old chicks inside suffocating bus luggage trunks without ventilated 50-bird boxes. Our transit routes operate strictly via trusted motor park waybill networks on Monday and Thursday mornings.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>You Expect Tuesday Dispatches</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our hatchery allotments move strictly on Mondays and Thursdays. We do not dispatch on Tuesdays or weekends to ensure stock arrives before weekend depot closures.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <span>If you are planning a patient, high-margin festive batch, we are your trusted partner.</span>
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20cockerels%20for%20the%20upcoming%20festive%20cycle."
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
              >
                Discuss Your Batch on WhatsApp <ChevronRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. CLIENT RESULTS & REVIEWS
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Users className="h-3.5 w-3.5" />
              Verified Farmer Results
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Real Nigerian Farmers Who Succeeded With Our Cockerels
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Real batches, documented livability, and confirmed market returns:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 font-heading">Pastor Emmanuel O.</span>
                  <span className="text-emerald-600 font-semibold font-mono">Ibadan, Oyo State</span>
                </div>
                <div className="text-xs text-amber-500">★★★★★ 5.0 Verified Batch</div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  &ldquo;I booked 4 cartons (200 chicks) of white cockerels in July for Christmas sales. Lost only 5 birds in 5 months. I fed them maize bran and grower mash. By December 20, I sold all 195 birds at ₦7,500 each at Bodija market. Profit was clean because initial chick cost was so low.&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                Batch: 200 White Cockerels · 97.5% Rearing Livability
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 font-heading">Madam Ngozi Farms</span>
                  <span className="text-emerald-600 font-semibold font-mono">Asaba, Delta State</span>
                </div>
                <div className="text-xs text-amber-500">★★★★★ 5.0 Verified Batch</div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  &ldquo;We ordered 3 cartons of black heavy cockerels for Easter sales. The boxes arrived at Asaba motor park early Thursday morning. Birds were strong and active on arrival. They grew heavy frames with dark feathers that our buyers paid ₦11,000 per bird for. 100% recommended.&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                Batch: 150 Black Heavy Cockerels · Asaba Motor Park Route
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 font-heading">Alhaji Bello Agric</span>
                  <span className="text-emerald-600 font-semibold font-mono">Ilorin, Kwara State</span>
                </div>
                <div className="text-xs text-amber-500">★★★★★ 5.0 Verified Batch</div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  &ldquo;The Zenith Bank corporate account gave me peace of mind. Many people were scammed on Facebook with fake chick prices. D-AminGrow issued a proper invoice and our cockerels arrived on Monday dispatch exactly as promised.&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                Batch: 300 Cockerels · Zenith Bank Verification: 1017894562
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. FREQUENTLY ASKED QUESTIONS
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Clock className="h-3.5 w-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Common Questions About Day-Old Cockerel Chicks
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Clear facts on pricing, sexing accuracy, feeding schedules, and dispatch routes in Nigeria.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold font-heading text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronRight
                    className={`h-5 w-5 text-emerald-600 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs sm:text-sm text-slate-500 mb-3">
              Need assistance calculating cockerel feed costs for your flock size?
            </p>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20have%20a%20question%20about%20cockerel%20rearing%20and%20feed%20budgeting."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-xl shadow-sm hover:border-emerald-300 transition-all"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              Ask Our Poultry Desk On WhatsApp
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
            Lock Your Cockerel Quota For The Next Monday Or Thursday Hatch Run
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Protect your capital with genuine 98%+ male cockerels from accredited hatcheries. We coordinate synchronized road waybill departure before afternoon heat with direct driver tracking.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20am%20ready%20to%20book%20my%20cockerel%20cartons%20for%20the%20upcoming%20hatch%20day."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Chat With Our Cockerel Dispatcher
            </a>

            <Link
              href="/chicks?breed=cockerel"
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
            >
              Open Booking Calendar
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Authorized Zenith Bank: 1017894562
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Mon &amp; Thu Synchronized Dispatch
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 98%+ Sexing Accuracy Guarantee
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}

export default CockerelLandingClient;
