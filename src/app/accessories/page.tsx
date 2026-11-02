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
  Flame,
  Droplets,
  Box,
  Wrench,
  ChevronRight,
  Building,
  Truck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Poultry Accessories & Farm Equipment | D-AminGrow Nigeria',
  description:
    'Heavy-duty commercial poultry equipment: gas brooders, battery cages, nipple drinkers, feeders, defeathering machines, and transport crates. Nationwide delivery across Nigeria.',
  openGraph: {
    title: 'Commercial Poultry Accessories & Farm Equipment | D-AminGrow',
    description: 'Gas brooders, battery cages, nipple drinkers, feeders, plucker machines. Nationwide delivery.',
  },
};

const EQUIPMENT_TYPES = [
  {
    icon: Flame,
    title: 'Brooding Equipment',
    desc: 'LPG infrared radiant canopy gas brooders providing gentle, uniform heat for up to 1,000 day-old chicks per unit.',
    items: ['Gas Brooder Heaters (Canopy Type)', 'Chick Brooding Feeding Trays', 'Thermometers & Temp Controllers'],
    color: 'bg-orange-100 text-orange-700',
  },
  {
    icon: Droplets,
    title: 'Drinkers & Water Systems',
    desc: 'Complete poultry water solutions from automatic bell drinkers to closed-pipe stainless steel nipple drinker systems.',
    items: ['Automatic Bell Drinkers (Plasson)', '360° Nipple Drinkers with Drip Cups', 'Water Pressure Regulators'],
    color: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Building,
    title: 'Cages & Housing',
    desc: 'Hot-dip galvanized A-frame multi-tier battery cage systems for commercial layer operations with automated feeding.',
    items: ['A-Frame Layer Battery Cages (3-Tier)', 'Galvanized Layer Frames', 'Automated Egg Collection Troughs'],
    color: 'bg-slate-100 text-slate-700',
  },
  {
    icon: Box,
    title: 'Feeders & Feed Management',
    desc: 'Conical hanging feeders, breeder feeders, and brooder tray systems to eliminate feed wastage and improve FCR.',
    items: ['Conical Hanging Poultry Feeders', 'Breeder Hanging Feeders', 'Chick Starter Brooder Trays'],
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Wrench,
    title: 'Processing Equipment',
    desc: 'Commercial stainless steel defeathering plucker machines for high-throughput abattoir and farm processing operations.',
    items: ['SS Defeathering Plucker Machines', 'Auto Continuous Vaccinator Syringes', 'Needle Sets'],
    color: 'bg-teal-100 text-teal-700',
  },
  {
    icon: Truck,
    title: 'Transport & Storage',
    desc: 'HDPE perforated live bird transport crates and reusable plastic egg holding trays for safe farm-to-market transit.',
    items: ['Live Bird Transport Crates (HDPE)', 'Poultry Transfer Cages', 'Plastic 30-Egg Holding Trays'],
    color: 'bg-emerald-100 text-emerald-700',
  },
];

export default function AccessoriesPage() {
  const accessories = getProductsByCategory('accessories');

  return (
    <div className="font-body">

      {/* ====================================================================
          HERO
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-slate-400/4 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Poultry Accessories</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-7">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 bg-slate-500/10 border border-slate-500/25 px-5 py-2 rounded-full">
                  <Building className="h-3.5 w-3.5" />
                  Heavy-Duty Commercial
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Industry Grade
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
                Professional Poultry{' '}
                <span className="text-gradient-green">Farm Equipment</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed">
                From LPG infrared gas brooders and automated nipple drinker systems to heavy-duty battery cages and commercial defeathering machines — D-AminGrow supplies everything your poultry farm needs.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  'Gas Brooders',
                  'Battery Cages',
                  'Nipple Drinkers',
                  'Plucker Machines',
                  'Transport Crates',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300 font-medium bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20inquire%20about%20poultry%20equipment%20pricing%20and%20availability."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Get Equipment Quote
                </a>
                <Link
                  href="/services"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  Farm Setup Advisory <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right: Quick Stats */}
            <div className="space-y-5">
              <div className="rounded-3xl bg-white/5 border border-white/8 p-7 space-y-5">
                <h3 className="text-lg font-bold text-white font-heading">Equipment Supply Promise</h3>
                <div className="space-y-4">
                  {[
                    { icon: ShieldCheck, text: 'Genuine commercial-grade materials — no cheap imitations' },
                    { icon: Truck, text: 'Nationwide delivery — all 36 states and FCT' },
                    { icon: Wrench, text: 'Technical installation guidance provided with every purchase' },
                    { icon: Star, text: 'After-sales support — call our desk for product questions' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-emerald-400" />
                        </div>
                        <span className="text-sm text-slate-400 leading-relaxed">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '10+', label: 'Equipment Types' },
                  { value: '36+', label: 'States Covered' },
                  { value: '100%', label: 'Commercial Grade' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl bg-white/5 border border-white/8 p-4 text-center">
                    <div className="text-2xl font-extrabold text-white font-heading">{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* ====================================================================
          EQUIPMENT CATEGORIES
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="section-label mx-auto w-fit">
              <Building className="h-3.5 w-3.5" />
              Equipment Range
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              Farm Equipment Categories
            </h2>
            <p className="text-sm text-slate-600">
              Everything your commercial poultry operation needs from day-one chick arrival to market dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EQUIPMENT_TYPES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className="rounded-3xl bg-white border border-slate-200 p-7 space-y-4 hover:shadow-lg hover:border-slate-300 transition-all group">
                  <div className={`h-12 w-12 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading mb-2">{cat.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{cat.desc}</p>
                    <ul className="space-y-1.5">
                      {cat.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-slate-500">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PRODUCT GRID
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="section-label w-fit mb-4">
                <Star className="h-3.5 w-3.5" />
                Product Catalogue
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Available Equipment & Accessories
              </h2>
              <p className="text-sm text-slate-500 mt-2">Commercial-grade. Contact for current pricing and delivery quote.</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
              <Clock className="h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-700 font-medium">Prices on request — delivery fee varies by state</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessories.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Farm Setup Consultation CTA */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#050E08] to-slate-900 border border-white/8 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-extrabold font-heading text-white mb-2">Setting Up a New Farm?</h3>
              <p className="text-sm text-slate-400">Our farm setup consultants can help you choose the right equipment, calculate quantities, and optimize your investment.</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                href="/services"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm"
              >
                Book Farm Setup Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20equipment%20advice%20for%20setting%20up%20a%20new%20poultry%20farm."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp for Advice
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
