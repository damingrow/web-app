import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Pill,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
  Phone,
  ArrowRight,
  ChevronRight,
  Star,
  Clock,
  Droplets,
  Leaf,
  Zap,
  FlaskConical,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Veterinary Drugs & Supplements Nigeria — NAFDAC Registered | D-AminGrow',
  description:
    'NAFDAC-registered veterinary antibiotics, anticoccidials, fluoroquinolones, vitamins, and supplements for poultry in Nigeria. Responsible use guidance included. Contact D-AminGrow for current price and availability.',
  openGraph: {
    title: 'NAFDAC Registered Veterinary Drugs & Supplements | D-AminGrow Nigeria',
    description:
      'Broad-spectrum antibiotics, anticoccidials, amino acids, vitamins, and water treatment acidifiers for commercial poultry and livestock in Nigeria.',
  },
};

const DRUG_CATEGORIES = [
  {
    icon: Pill,
    title: 'Broad-Spectrum Antibiotics',
    desc: 'Oxytetracycline, Amoxicillin, Tylosin — for E. coli, Fowl Cholera, CRD, and Salmonellosis. Water-soluble powder formulations for flock-wide treatment.',
    color: 'bg-emerald-100 text-emerald-700',
    examples: ['Oxytetracycline HCl 200mg/g', 'Norfloxacin (Norflogen)', 'Amoxicillin + Colistin'],
  },
  {
    icon: ShieldCheck,
    title: 'Anticoccidials',
    desc: 'Amprolium-based and sulfaquinoxaline-based treatments for Eimeria spp. outbreaks. Halts bloody diarrhoea, reduces mortality, and restores intestinal mucosa.',
    color: 'bg-violet-100 text-violet-700',
    examples: ['Cocci-Ton (Amprolium + Sulfaquinoxaline)', 'Diclazuril', 'Toltrazuril'],
  },
  {
    icon: Zap,
    title: 'Fluoroquinolones',
    desc: 'Ciprofloxacin and Enrofloxacin oral solutions for complex respiratory disease (CRD), Mycoplasma, and refractory infections resistant to basic antibiotics.',
    color: 'bg-rose-100 text-rose-700',
    examples: ['Cipo-Zen (Ciprofloxacin 10%)', 'Enrofloxacin 10% Oral Solution', 'Marbofloxacin'],
  },
  {
    icon: Leaf,
    title: 'Amino Acid Supplements',
    desc: 'DL-Methionine and Lysine for feed amino acid balancing. Improves feather development, egg albumen quality, breast muscle yield, and FCR in commercial broilers.',
    color: 'bg-lime-100 text-lime-700',
    examples: ['DL-Methionine Powder', 'L-Lysine HCl', 'Threonine + Tryptophan Mix'],
  },
  {
    icon: FlaskConical,
    title: 'Vitamins & Anti-Stress',
    desc: 'Water-soluble Vitamin C (Ascorbic Acid), Vitamin E + Selenium, and multivitamin premixes for heat stress, post-vaccination recovery, and transport shock management.',
    color: 'bg-amber-100 text-amber-700',
    examples: ['Ascorbic Acid (Vitamin C) WSP', 'Vitamin E + Selenium', 'Multi-Vitamin Premix'],
  },
  {
    icon: Droplets,
    title: 'Water Treatment & Acidifiers',
    desc: 'Organic acid-based drinker line conditioners. Lowers water pH to 5.5–6.2 to suppress Salmonella/E. coli, destroys biofilm in nipple systems, and improves gut health.',
    color: 'bg-sky-100 text-sky-700',
    examples: ['Water Treatment Acidifier (Formic + Propionic Acid)', 'Drinking Water Sanitiser', 'Gut Acidifier Premix'],
  },
];

const TOP_PRODUCTS = [
  { name: 'Oxytetracycline HCl Broad-Spectrum Antibiotic', slug: 'oxytetracycline-hcl-broad-spectrum-antibiotic', nafdac: '04-8921', unit: '100g Sachet' },
  { name: 'Cocci-Ton Anticoccidial Treatment Powder', slug: 'cocci-ton-anticoccidial-treatment', nafdac: '04-9412', unit: '100g Sachet' },
  { name: 'Cipo-Zen Ciprofloxacin 10% Oral Solution', slug: 'cipo-zen-antibacterial-oral-solution', nafdac: '04-7623', unit: '1L Bottle' },
  { name: 'Norflogen (Norfloxacin) Antibacterial Powder', slug: 'norflogen-norfloxacin-antibacterial-powder', nafdac: '04-8134', unit: '100g Sachet' },
  { name: 'DL-Methionine Feed Amino Acid Supplement', slug: 'dl-methionine-feed-amino-acid-supplement', nafdac: '04-5521', unit: '25kg Bag' },
  { name: 'Ecto-Zap Ectoparasiticide (Cypermethrin)', slug: 'ecto-zap-ectoparasiticide', nafdac: '04-8267', unit: '1L Spray' },
  { name: 'Ascorbic Acid (Vitamin C) Water-Soluble Powder', slug: 'ascorbic-acid-vitamin-c-water-soluble', nafdac: '04-6012', unit: '100g Sachet' },
  { name: 'Water Treatment & Pipeline Acidifier', slug: 'water-treatment-pipeline-acidifier', nafdac: '04-6345', unit: '1L / 5L Container' },
];

export default function ServiceDrugsPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link href="/services" className="hover:text-emerald-600 transition-colors">Services</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 font-medium">Veterinary Drugs</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#050E08] via-emerald-950/20 to-[#050E08] pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/3" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">
              <ShieldCheck className="h-4 w-4" />
              100% NAFDAC Registered Products
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-[1.05] mb-6">
              Veterinary Drugs{' '}
              <span className="text-emerald-400">&amp; Supplements</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl">
              NAFDAC-registered broad-spectrum antibiotics, targeted anticoccidials, fluoroquinolone oral solutions, amino acid supplements, and organic acid water treatment products for commercial poultry and livestock enterprises.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20veterinary%20drugs.%20Product%3A%20%5BDRUG%20NAME%5D.%20Flock%20size%3A%20%5BNUMBER%5D%20birds.%20Please%20advise%20on%20dosage%20and%20current%20price."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-2xl transition-all text-sm shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                Order Drugs via WhatsApp
              </a>
              <Link
                href="/drugs"
                className="flex items-center gap-2 text-slate-300 hover:text-white font-semibold px-7 py-4 rounded-2xl border border-white/15 hover:border-white/30 transition-all text-sm"
              >
                Full Drug Catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Antibiotic Stewardship Warning */}
      <div className="bg-amber-50 border-b border-amber-200 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            <span className="font-bold">Antibiotic Stewardship Notice:</span> Antibiotics must be used responsibly under veterinary guidance. Always observe withdrawal periods before slaughter. Overuse contributes to antimicrobial resistance. D-AminGrow supplies only NAFDAC-registered products with verified batch numbers.
          </p>
        </div>
      </div>

      {/* Drug Categories */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
              <Pill className="h-3.5 w-3.5" />
              Drug Categories
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              6 Product Categories
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Every product supplied with NAFDAC registration number, active ingredient content, and dosage guidance.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DRUG_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className="rounded-3xl bg-slate-50 border border-slate-200 p-7 space-y-4 hover:shadow-lg hover:border-slate-300 transition-all">
                  <div className={`h-12 w-12 rounded-2xl ${cat.color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">{cat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{cat.desc}</p>
                  <div className="space-y-1.5">
                    {cat.examples.map((e, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NAFDAC Compliance Section */}
      <section className="py-16 bg-emerald-950/95 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-5">
                <ShieldCheck className="h-4 w-4" />
                NAFDAC Compliance Statement
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mb-4">
                Every Drug Carries a Verified NAFDAC Number
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                The National Agency for Food and Drug Administration and Control (NAFDAC) regulates all veterinary pharmaceuticals in Nigeria. D-AminGrow sources exclusively from NAFDAC-registered manufacturers with verified batch traceability.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Authentic NAFDAC registration number on every product',
                  'Batch number traceability for every shipment',
                  'No expired or counterfeit products supplied',
                  'Active ingredient concentrations independently verified',
                  'Proper storage and cold-chain maintained where required',
                  'Withdrawal periods clearly communicated with each order',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-80 shrink-0">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-8 text-center space-y-4">
                <div className="text-5xl font-extrabold text-emerald-400 font-heading">100%</div>
                <div className="text-base font-bold text-white">NAFDAC Registered</div>
                <div className="text-sm text-slate-400">All veterinary drugs and biologicals supplied by D-AminGrow carry current NAFDAC registration numbers and are sourced from licensed manufacturers.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Products Quick Reference */}
      <section className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full">
              <Star className="h-3.5 w-3.5" />
              Most Ordered Products
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Top Products in Stock
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOP_PRODUCTS.map((p, i) => (
              <div key={i} className="rounded-2xl bg-white border border-slate-200 p-5 flex items-center gap-4 hover:shadow-md hover:border-slate-300 transition-all">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Pill className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 font-heading truncate">{p.name}</h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[10px] text-slate-500">NAFDAC: {p.nafdac}</span>
                    <span className="text-[10px] text-slate-400">|</span>
                    <span className="text-[10px] text-slate-500">{p.unit}</span>
                  </div>
                </div>
                <a
                  href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20${encodeURIComponent(p.name)}.%20Please%20advise%20on%20availability%20and%20current%20price.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl transition-all shrink-0"
                >
                  Order
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/drugs"
              className="inline-flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-50 border border-emerald-200 px-6 py-3.5 rounded-xl hover:bg-emerald-100 transition-all"
            >
              View Full Drug Catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#050E08] to-emerald-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">
            <Clock className="h-4 w-4" />
            2-Hour Response Guarantee
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4">
            Need Drugs for Your Flock?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Tell us your drug name, flock size, and state. We advise on dosage, confirm price, and arrange fast delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20veterinary%20drugs.%20Product%3A%20%5BDRUG%20NAME%5D.%20Flock%20size%3A%20%5BNUMBER%5D%20birds.%20Please%20advise%20on%20dosage%20and%20current%20price."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-2xl transition-all text-sm"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp — Order Now
            </a>
            <a
              href="tel:+2348139169402"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-sm"
            >
              <Phone className="h-5 w-5" />
              +234 813 916 9402
            </a>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Related Tools &amp; Services</h3>
            <p className="text-xs text-slate-500 mt-1">Disease checker, dosage guides, and technical support</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/drugs" className="flex items-center gap-2 text-emerald-700 font-semibold text-sm bg-emerald-50 border border-emerald-200 px-5 py-2.5 rounded-xl hover:bg-emerald-100 transition-all">
              Full Drug Catalog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/calculators/symptom-checker" className="flex items-center gap-2 text-slate-700 font-semibold text-sm bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:border-slate-300 transition-all">
              Disease Symptom Checker <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services/technical" className="flex items-center gap-2 text-slate-700 font-semibold text-sm bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:border-slate-300 transition-all">
              Technical Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
