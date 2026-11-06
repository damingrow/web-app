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
  Stethoscope,
  BookOpen,
  Pill,
  ChevronRight,
  FlaskConical,
  Leaf,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Veterinary Drugs, Antibiotics, Probiotics & Supplements | D-AminGrow Nigeria',
  description:
    'NAFDAC-registered veterinary antibiotics, anticoccidials, probiotics, vitamins, and amino acids for commercial poultry and livestock farms in Nigeria. Contact for current pricing.',
  openGraph: {
    title: 'NAFDAC-Verified Livestock Drugs | D-AminGrow Nigeria',
    description: 'Antibiotics, probiotics, vitamins & supplements for Nigerian poultry and livestock farms. Batch verified.',
  },
};

const DRUG_CATEGORIES = [
  {
    icon: Pill,
    title: 'Antibiotics & Antimicrobials',
    desc: 'Broad-spectrum and targeted antibiotics for respiratory, enteric, and systemic bacterial infections in poultry and livestock.',
    examples: ['Oxytetracycline HCl', 'Ciprofloxacin (Cipo-Zen)', 'Norfloxacin (Norflogen)'],
    color: 'bg-red-100 text-red-700',
    badge: 'Prescription Required',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    icon: Zap,
    title: 'Anticoccidials & Antiprotozoals',
    desc: 'Fast-acting therapeutic coccidiostats for Eimeria control, intestinal haemorrhage prevention, and clinical coccidiosis management.',
    examples: ['Cocci-Ton (Amprolium + Sulfaquinoxaline)', 'Toltrazuril', 'Diclazuril'],
    color: 'bg-orange-100 text-orange-700',
    badge: 'Therapeutic Grade',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  {
    icon: Leaf,
    title: 'Vitamins, Probiotics & Supplements',
    desc: 'Anti-stress vitamins, electrolytes, gut health probiotics, and feed amino acids to maximize performance and immunity.',
    examples: ['Ascorbic Acid (Vitamin C)', 'Vitamin B-Complex', 'Probiotic blends'],
    color: 'bg-emerald-100 text-emerald-700',
    badge: 'No Withdrawal',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    icon: FlaskConical,
    title: 'Feed Amino Acids & Additives',
    desc: 'Essential amino acids for feed formulation, optimal FCR, and reducing on-farm feed compounding costs.',
    examples: ['DL-Methionine (99% pure)', 'L-Lysine', 'Enzymes & Phytase'],
    color: 'bg-violet-100 text-violet-700',
    badge: 'Feed-Grade',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
  },
];

export default function DrugsPage() {
  const drugs = getProductsByCategory('drugs');

  return (
    <div className="font-body">

      {/* ====================================================================
          HERO
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-teal-500/6 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Livestock Drugs</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-7">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  NAFDAC Registered
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/25 px-5 py-2 rounded-full">
                  <Stethoscope className="h-3.5 w-3.5" />
                  Batch Verified
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
                NAFDAC-Verified Livestock{' '}
                <span className="text-gradient-green">Drugs & Supplements</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed">
                D-AminGrow supplies 100% genuine NAFDAC-registered veterinary antibiotics, anticoccidials, probiotics, and essential amino acids for commercial poultry and livestock farms across Nigeria.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  'NAFDAC Batch Numbers',
                  'Genuine Pharmaceuticals',
                  'AMR-Responsible',
                  'Dosage Advisory Included',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20veterinary%20drugs.%20Please%20share%20current%20pricing."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Order Drugs — WhatsApp
                </a>
                <Link
                  href="/services"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  <Stethoscope className="h-4 w-4" />
                  Get Dosage Advice
                </Link>
              </div>
            </div>

            {/* Right: Stats + AMR Notice */}
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '100%', label: 'NAFDAC Verified', sub: 'Registered batch numbers' },
                  { value: '0', label: 'Counterfeit Products', sub: 'Zero tolerance policy' },
                  { value: '7+', label: 'Drug Categories', sub: 'Antibiotics to supplements' },
                  { value: '48hr', label: 'Dosage Support', sub: 'WhatsApp advisory' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl bg-white/5 border border-white/8 p-5 text-center hover:border-emerald-500/25 transition-all">
                    <div className="text-2xl font-extrabold text-white font-heading">{stat.value}</div>
                    <div className="text-xs font-semibold text-emerald-400 mt-0.5">{stat.label}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* NAFDAC Compliance Box */}
              <div className="rounded-3xl bg-emerald-500/10 border border-emerald-500/25 p-7 space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-7 w-7 text-emerald-400" />
                  <h3 className="text-base font-bold text-white font-heading">NAFDAC Compliance Statement</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Every veterinary pharmaceutical we supply is officially registered with the National Agency for Food and Drug Administration and Control (NAFDAC). As an authorized distributor and reseller, we only source and stock genuine, verified, and field-tested products from approved manufacturers with batch numbers traceable directly to the producer.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Antibiotics', 'Anticoccidials', 'Vitamins', 'Amino Acids', 'Ectoparasiticides'].map((cat, i) => (
                    <span key={i} className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* AMR Warning */}
              <div className="rounded-3xl bg-amber-500/10 border border-amber-500/25 p-5 flex items-start gap-4">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-300 mb-1">Responsible Use of Antibiotics</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Prescription antibiotics should only be used as directed. Overuse contributes to antimicrobial resistance (AMR). Consult our veterinary desk for correct dosage and withdrawal periods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* ====================================================================
          DRUG CATEGORIES
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="section-label mx-auto w-fit">
              <Pill className="h-3.5 w-3.5" />
              Product Categories
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              Our Veterinary Drug Range
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DRUG_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className="rounded-3xl bg-white border border-slate-200 p-7 space-y-4 hover:shadow-lg hover:border-slate-300 transition-all group">
                  <div className="flex items-start justify-between">
                    <div className={`h-12 w-12 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${cat.badgeColor}`}>
                      {cat.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">{cat.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{cat.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.examples.map((ex, j) => (
                        <span key={j} className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
                          {ex}
                        </span>
                      ))}
                    </div>
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
                Available Products
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Veterinary Drugs Catalogue
              </h2>
              <p className="text-sm text-slate-500 mt-2">All products NAFDAC-registered. Contact for confirmed current pricing.</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span className="text-sm text-emerald-800 font-medium">Prices on request — no fixed retail rates</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {drugs.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* CTA Strip */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#050E08] to-emerald-950 border border-emerald-500/20 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-extrabold font-heading text-white mb-2">Need Expert Drug Advisory?</h3>
              <p className="text-sm text-slate-400">Our veterinary desk provides free dosage guidance, withdrawal period confirmation, and treatment protocol support.</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20veterinary%20drug%20advisory%20and%20pricing."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                Get Drug Advisory
              </a>
              <Link
                href="/knowledge"
                className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-3.5 rounded-xl border border-white/15 hover:border-white/25 transition-all text-sm"
              >
                <BookOpen className="h-4 w-4" />
                Clinical Guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
