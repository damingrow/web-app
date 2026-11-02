import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import {
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Star,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Thermometer,
  Syringe,
  BookOpen,
  Zap,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Livestock Vaccines — Cold-Chain Distribution Nigeria | D-AminGrow',
  description:
    'Buy Newcastle, Gumboro, Fowl Pox, and Marek\'s Disease vaccines in Nigeria with certified 2°C–8°C cold-chain delivery. NAFDAC-registered. Nationwide dispatch.',
  openGraph: {
    title: 'Livestock Vaccines | Cold-Chain Guaranteed | D-AminGrow Nigeria',
    description: 'Live freeze-dried vaccines with 2°C–8°C cold-chain verified delivery. Newcastle, IBD Gumboro, Marek\'s & more.',
  },
};

const COLD_CHAIN_STEPS = [
  {
    step: '01',
    title: 'Refrigerated Storage',
    desc: 'All vaccines stored in dedicated 2°C–8°C biological refrigerators. Never frozen.',
    icon: Thermometer,
    color: 'text-cyan-700 bg-cyan-100',
  },
  {
    step: '02',
    title: 'Cold-Pack Packaging',
    desc: 'Pre-chilled ice gel packs and thermal foam inserts in every dispatch box.',
    icon: ShieldCheck,
    color: 'text-blue-700 bg-blue-100',
  },
  {
    step: '03',
    title: 'Temperature-Logged Transit',
    desc: 'Cold-chain verification call before dispatch. Insulated box seals maintained.',
    icon: Zap,
    color: 'text-emerald-700 bg-emerald-100',
  },
  {
    step: '04',
    title: 'Same-Day Administration',
    desc: 'Vaccine must be administered immediately on receipt. Do not delay or re-freeze.',
    icon: Syringe,
    color: 'text-amber-700 bg-amber-100',
  },
];

export default function VaccinesCategoryPage() {
  const vaccines = getProductsByCategory('vaccines');

  return (
    <div className="font-body">

      {/* ====================================================================
          HERO
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[500px] bg-cyan-500/6 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Livestock Vaccines</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-7">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-5 py-2 rounded-full">
                  <Syringe className="h-3.5 w-3.5" />
                  Cold-Chain Verified
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
                  ❄️ 2°C – 8°C Maintained
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
                Livestock Vaccines with{' '}
                <span className="text-gradient-green">Guaranteed Cold-Chain</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed">
                D-AminGrow supplies live freeze-dried viral and bacterial vaccines with strict 2°C–8°C cold-chain preservation from storage to delivery. Every vaccine shipment is verified and packaged with insulated thermal boxes and certified ice gel packs.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  '2°C–8°C Guaranteed',
                  'NAFDAC Registered',
                  'Live Freeze-Dried',
                  'Nationwide Delivery',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-cyan-400 font-medium bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20vaccines.%20Please%20confirm%20cold-chain%20availability%20and%20pricing."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Order Vaccines — WhatsApp
                </a>
                <Link
                  href="/calculators/vaccination"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  Vaccination Schedule Tool
                </Link>
              </div>
            </div>

            {/* Right: Cold-chain callout */}
            <div className="space-y-5">
              <div className="rounded-3xl bg-cyan-500/10 border border-cyan-500/25 p-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <Thermometer className="h-7 w-7 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-heading">Cold-Chain Protocol</h3>
                    <p className="text-xs text-slate-500">Our unbreakable guarantee</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    'Never stored below 0°C (not frozen) — viruses remain viable',
                    'Never exposed above 8°C during transit — potency maintained',
                    'Pre-cold dispatch verification call to every customer',
                    'Insulated foam box + ice gel pack standard in every order',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AMR Warning */}
              <div className="rounded-3xl bg-amber-500/10 border border-amber-500/25 p-6 flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-300 mb-1">Professional Use Advisory</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    All vaccines require proper cold-chain handling and correct administration protocol. Contact our veterinary desk for guidance on vaccination timing, dilution, and route of administration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* ====================================================================
          COLD-CHAIN PROCESS STEPS
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="section-label mx-auto w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              Our Cold-Chain Process
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              How We Guarantee Vaccine Integrity
            </h2>
            <p className="text-sm text-slate-600">
              Every step is controlled to ensure the vaccines you receive are fully potent and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLD_CHAIN_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative rounded-3xl bg-white border border-slate-200 p-7 space-y-4 hover:shadow-lg transition-shadow group">
                  {/* Step number connector line */}
                  {i < COLD_CHAIN_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-12 right-0 w-6 h-0.5 bg-slate-200 translate-x-full z-10" />
                  )}
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-2xl ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-100 font-heading">{step.step}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          VACCINES GRID
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="section-label w-fit mb-4">
                <Star className="h-3.5 w-3.5" />
                Vaccine Catalogue
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Available Vaccines
              </h2>
              <p className="text-sm text-slate-500 mt-2">All vaccines require cold-chain verification. Contact us before ordering.</p>
            </div>
            <div className="flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-xl px-5 py-3">
              <Clock className="h-4 w-4 text-cyan-600" />
              <span className="text-sm text-cyan-800 font-medium">Cold-chain confirmed per order</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vaccines.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* CTA Strip */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#050E08] to-[#0a1f2e] border border-cyan-500/20 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-extrabold font-heading text-white mb-2">Need a Custom Vaccination Program?</h3>
              <p className="text-sm text-slate-400">Our veterinary desk creates tailored schedules based on your flock age, history, and disease challenge in your zone.</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20a%20vaccination%20program%20for%20my%20flock."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                Get Custom Schedule
              </a>
              <Link
                href="/calculators/vaccination"
                className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-3.5 rounded-xl border border-white/15 hover:border-white/25 transition-all text-sm"
              >
                Free Schedule Tool <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
