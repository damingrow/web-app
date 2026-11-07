import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Pill,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Star,
  Clock,
  Droplets,
  Leaf,
  Zap,
  FlaskConical,
  Sparkles,
  XCircle,
  HelpCircle,
  PhoneCall,
  Layers,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bulk Veterinary Drug Procurement Nigeria | Wholesale Farm Dispensary | D-AminGrow',
  description:
    'Procure 100% genuine NAFDAC-registered veterinary drugs, antibiotics, anticoccidials, and vitamins in wholesale bulk across Nigeria. Direct manufacturer supply for commercial farm dispensaries with free clinical dosage advisory.',
  keywords: [
    'bulk veterinary drug procurement nigeria',
    'wholesale veterinary pharmaceuticals',
    'farm dispensary setup',
    'genuine manufacturer stock',
    'commercial antibiotic supply contract',
    'wholesale poultry drugs supplier in nigeria',
    'bulk veterinary medicine supply for farms',
    'poultry medication distributor nigeria',
    'commercial farm drug dispensary service',
  ],
  alternates: {
    canonical: 'https://damingrow.com/services/drugs',
  },
  openGraph: {
    title: 'Bulk Veterinary Drug Procurement Nigeria | Wholesale Farm Dispensary | D-AminGrow',
    description:
      'Zero counterfeits. Bulk wholesale veterinary pharmaceuticals, vitamins, anticoccidials, and water sanitizers delivered to commercial farms across Nigeria.',
    url: 'https://damingrow.com/services/drugs',
    siteName: 'D-AminGrow Agro-Allied',
    type: 'website',
  },
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are all veterinary drugs supplied by D-AminGrow NAFDAC registered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. 100% of all veterinary pharmaceuticals, water-soluble antibiotics, anticoccidials, premixes, and supplements distributed by D-AminGrow carry verified, authentic NAFDAC registration numbers. We maintain a zero-counterfeit policy and procure directly from accredited manufacturers and primary importers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can commercial farms set up an on-site dispensary supply contract?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We engineer customized commercial farm dispensary packages for broiler and layer facilities stocking 2,000 to 50,000+ birds. These contracts include seasonal bulk volume pricing, scheduled restocking, and free veterinary prescription advisory tailored to your flock disease profile.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a drug withdrawal period and why is it mandatory to observe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The withdrawal period is the required minimum time between the last administration of a veterinary drug and the slaughter of meat birds or collection of eggs for human consumption. Observing withdrawal periods prevents harmful chemical and antibiotic residues from entering the human food chain and complies with veterinary public health laws.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you ensure drugs are not damaged during transit across Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Solid powders and liquid oral solutions are packed in reinforced, moisture-sealed transit cartons. Temperature-sensitive injectable products and vitamins are insulated against excessive heat during interstate motor park transport to prevent chemical degradation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I get clinical dosage guidance when purchasing bulk medications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every order is supported by our licensed VCN veterinary clinicians. We provide precise flock water consumption calculations (liters of water consumed per 1,000 birds based on flock age and ambient pen temperature) to ensure accurate therapeutic dosage and avoid under- or over-dosing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I place a wholesale order for my farm dispensary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can review our product catalog on this page and connect directly with our bulk procurement desk on WhatsApp (+234 806 870 0074). We confirm immediate batch availability, wholesale bulk tiers, and coordinate fast interstate waybill delivery within 24 hours.',
      },
    },
  ],
};

const OPERATIONAL_BENCHMARKS = [
  {
    value: '100% NAFDAC',
    label: 'Registered Stock Only',
    detail: 'Every sachet, bottle, and drum carries verifiable regulatory approval',
  },
  {
    value: 'Free VCN',
    label: 'Dosage Advisory',
    detail: 'Professional calculation based on flock age and water intake volume',
  },
  {
    value: 'Zero Counterfeit',
    label: 'Direct Factory Sourcing',
    detail: 'Procured exclusively from primary manufacturers and accredited importers',
  },
  {
    value: '36 States',
    label: 'Nationwide Express Waybill',
    detail: 'Same-day and next-day motor park delivery to all agricultural hubs',
  },
];

const PROBLEM_POINTS = [
  {
    title: 'Counterfeit & Underdosed Active Pharmaceutical Ingredients',
    desc: 'Up to 35% of veterinary medications sold in open open-air Nigerian agricultural markets contain underdosed active ingredients (e.g. 50mg/g instead of stated 200mg/g) or inert chalk fillers. Underdosed antibiotics fail to eliminate bacterial infections while rapidly breeding antimicrobial-resistant superbugs on your farm.',
    impact: 'Treatment failure & rapid multi-drug resistance',
  },
  {
    title: 'Toxic Heavy Metal Contamination in Unregistered Minerals',
    desc: 'Unregistered local mineral premixes, synthetic amino acids, and dicalcium phosphate (DCP) often contain dangerous levels of heavy metals (lead, arsenic, fluorine). Chronic ingestion damages bird gizzards, inflames renal tubules, and causes permanent feed intake depression.',
    impact: 'Severe renal toxicity & stunted flock growth',
  },
  {
    title: 'Absence of Withdrawal Period Guidance for Meat & Eggs',
    desc: 'Open market sellers rarely educate farmers on mandatory drug withdrawal periods before slaughter. Selling broilers saturated with residual fluoroquinolones (Enrofloxacin) or nitrofurans endangers human consumers and destroys farm reputation with institutional off-takers.',
    impact: 'Rejection of birds by commercial off-takers & regulatory penalties',
  },
];

const FORMULARY_MATRIX = [
  {
    productName: 'Oxytetracycline HCl 200mg/g WSP',
    category: 'Broad-Spectrum Tetracycline',
    targetPathogen: 'E. coli, Fowl Cholera, CRD (Mycoplasma), Salmonella',
    standardDose: '100g sachet per 150–200 Litres of drinking water for 3–5 days',
    withdrawalPeriod: '7 Days (Meat) · Do not use in commercial layers in production',
    nafdacNumber: '04-8921',
  },
  {
    productName: 'Cocci-Ton (Amprolium + Sulfaquinoxaline)',
    category: 'Targeted Anticoccidial',
    targetPathogen: 'Acute Caecal & Intestinal Coccidiosis (Eimeria spp.)',
    standardDose: '100g sachet per 100 Litres of drinking water for 48h, then half dose',
    withdrawalPeriod: '10 Days (Meat) · 5 Days (Eggs)',
    nafdacNumber: '04-9412',
  },
  {
    productName: 'Cipo-Zen (Ciprofloxacin 10% Oral Solution)',
    category: 'Fluoroquinolone Antibacterial',
    targetPathogen: 'Refractory CRD, Infectious Synovitis, Colibacillosis',
    standardDose: '1ml per 2 Litres of drinking water for 3–5 consecutive days',
    withdrawalPeriod: '12 Days (Meat) · Strictly prohibited in commercial laying birds',
    nafdacNumber: '04-7623',
  },
  {
    productName: 'DL-Methionine 99% Pure Feed Grade',
    category: 'Essential Synthetic Amino Acid',
    targetPathogen: 'Feather plucking, poor FCR, low breast muscle conformation',
    standardDose: '1.0kg – 2.5kg per 1,000kg finished feed compounding ration',
    withdrawalPeriod: 'Zero Days (Natural Amino Acid)',
    nafdacNumber: '04-5521',
  },
];

const DRUG_CATEGORIES = [
  {
    icon: Pill,
    title: 'Broad-Spectrum Antibiotics',
    desc: 'Oxytetracycline, Amoxicillin, and Tylosin water-soluble powders for effective flock-wide treatment of Colibacillosis (E. coli), Fowl Cholera, and Infectious Sinusitis.',
    color: 'bg-emerald-100 text-emerald-700',
    examples: ['Oxytetracycline HCl 200mg/g', 'Norflogen Antibacterial Powder', 'Amoxicillin + Colistin Trihydrate'],
  },
  {
    icon: ShieldCheck,
    title: 'Targeted Anticoccidials',
    desc: 'High-efficacy Amprolium, Toltrazuril, and Sulfaquinoxaline treatments for halting bloody diarrhea, preventing intestinal scarring, and rapidly restoring mucosal villi.',
    color: 'bg-violet-100 text-violet-700',
    examples: ['Cocci-Ton (Amprolium + Sulfa)', 'Toltrazuril 2.5% Oral Solution', 'Diclazuril 0.5% Feed Additive'],
  },
  {
    icon: Zap,
    title: 'Fluoroquinolone Solutions',
    desc: 'Ciprofloxacin and Enrofloxacin 10% oral solutions for aggressive, deep-seated respiratory infections (CRD complex), airsacculitis, and refractory bacterial outbreaks.',
    color: 'bg-rose-100 text-rose-700',
    examples: ['Cipo-Zen (Ciprofloxacin 10%)', 'Enrofloxacin 10% Oral Liquid', 'Flumequine 20% Oral Solution'],
  },
  {
    icon: Leaf,
    title: 'Pure Amino Acid Supplements',
    desc: 'Feed-grade crystalline DL-Methionine and L-Lysine HCl for precision crude protein balancing. Maximizes breast muscle accretion and improves commercial FCR below 1.60.',
    color: 'bg-lime-100 text-lime-700',
    examples: ['DL-Methionine 99% (25kg drum)', 'L-Lysine HCl 98.5%', 'L-Threonine + Tryptophan Blends'],
  },
  {
    icon: FlaskConical,
    title: 'Vitamins & Anti-Stress Premixes',
    desc: 'Water-soluble Ascorbic Acid (Vitamin C), Vitamin E + Selenium, and complete B-complex formulations for heat prostration, post-vaccination recovery, and transport arrival shock.',
    color: 'bg-amber-100 text-amber-700',
    examples: ['Ascorbic Acid (Vitamin C) WSP', 'Vitamin E 50% + Selenium', 'Super Stress Pack Multivitamin'],
  },
  {
    icon: Droplets,
    title: 'Water Treatment & Organic Acidifiers',
    desc: 'Formic and propionic acid-based drinking line conditioners. Lowers intestinal pH to 5.8 to suppress Salmonella, destroys waterline biofilms, and optimizes mineral absorption.',
    color: 'bg-sky-100 text-sky-700',
    examples: ['Waterline Descaling Acidifier', 'Chlorine Dioxide Disinfectant Tabs', 'Gut Flora Organic Acid Premix'],
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

const PILLARS = [
  {
    num: '01',
    title: '100% NAFDAC-Registered Manufacturer Inventory',
    desc: 'Procuring exclusively from licensed pharmaceutical manufacturing facilities with audited certificates of analysis and verifiable batch numbers.',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
  },
  {
    num: '02',
    title: 'Clinical Dosage & Water Volume Calibration',
    desc: 'Calculating water consumption dynamics per flock based on age and heat index, ensuring therapeutically active bloodstream levels.',
    icon: Pill,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
  },
  {
    num: '03',
    title: 'Strict Withdrawal Period Compliance Advisory',
    desc: 'Providing printed withdrawal timetables for every therapeutic class to guarantee zero illegal chemical residues in commercial poultry products.',
    icon: AlertTriangle,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
  },
  {
    num: '04',
    title: 'Wholesale Farm Dispensary Supply Contracts',
    desc: 'Direct bulk pricing tiers for commercial operations, reducing ongoing medication expenditure by up to 25% while securing stock availability.',
    icon: Award,
    color: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    bgColor: 'bg-rose-500/10',
  },
];

const FAQS = [
  {
    q: 'Are all veterinary drugs supplied by D-AminGrow NAFDAC registered?',
    a: 'Yes. 100% of all veterinary pharmaceuticals, water-soluble antibiotics, anticoccidials, premixes, and supplements distributed by D-AminGrow carry verified, authentic NAFDAC registration numbers. We maintain a zero-counterfeit policy and procure directly from accredited manufacturers and primary importers.',
  },
  {
    q: 'Can commercial farms set up an on-site dispensary supply contract?',
    a: 'Yes. We engineer customized commercial farm dispensary packages for broiler and layer facilities stocking 2,000 to 50,000+ birds. These contracts include seasonal bulk volume pricing, scheduled restocking, and free veterinary prescription advisory tailored to your flock disease profile.',
  },
  {
    q: 'What is a drug withdrawal period and why is it mandatory to observe?',
    a: 'The withdrawal period is the required minimum time between the last administration of a veterinary drug and the slaughter of meat birds or collection of eggs for human consumption. Observing withdrawal periods prevents harmful chemical and antibiotic residues from entering the human food chain and complies with veterinary public health laws.',
  },
  {
    q: 'How do you ensure drugs are not damaged during transit across Nigeria?',
    a: 'Solid powders and liquid oral solutions are packed in reinforced, moisture-sealed transit cartons. Temperature-sensitive injectable products and vitamins are insulated against excessive heat during interstate motor park transport to prevent chemical degradation.',
  },
  {
    q: 'Do I get clinical dosage guidance when purchasing bulk medications?',
    a: 'Yes. Every order is supported by our licensed VCN veterinary clinicians. We provide precise flock water consumption calculations (liters of water consumed per 1,000 birds based on flock age and ambient pen temperature) to ensure accurate therapeutic dosage and avoid under- or over-dosing.',
  },
  {
    q: 'How do I place a wholesale order for my farm dispensary?',
    a: 'You can review our product catalog on this page and connect directly with our bulk procurement desk on WhatsApp (+234 806 870 0074). We confirm immediate batch availability, wholesale bulk tiers, and coordinate fast interstate waybill delivery within 24 hours.',
  },
];

export default function ServiceDrugsPage() {
  return (
    <div className="font-body bg-slate-50 min-h-screen">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* ====================================================================
          CINEMATIC DARK HERO (7/5 GRID)
          ==================================================================== */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-emerald-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Veterinary Drugs</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label-dark">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                100% NAFDAC-Registered Veterinary Pharmaceuticals
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading tracking-tight leading-tight">
                Bulk Veterinary Drug Procurement &amp; <br />
                <span className="text-gradient-green">Commercial Farm Dispensary Supply</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Eliminate counterfeit agro-veterinary medications, underdosed antibiotics, and chalk adulterations. D-AminGrow supplies genuine, manufacturer-direct veterinary pharmaceuticals, anticoccidials, synthetic amino acids, and water acidifiers with free clinical dosage advisory.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%20Dispensary%20Desk%2C%20I%20need%20to%20order%20veterinary%20drugs%20in%20bulk."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Order Drugs on WhatsApp</span>
                </a>
                <Link
                  href="/drugs"
                  className="inline-flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-4 rounded-xl transition-all text-sm"
                >
                  <span>Full Drug Catalog</span>
                  <ArrowRight className="h-4 w-4 text-emerald-400" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Zero-Counterfeit Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Free VCN Clinical Dosage Guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Nationwide Express Interstate Delivery</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Dispensary Category Overview Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Commercial Farm Dispensary
                  </span>
                  <span className="px-3 py-0.5 rounded-full text-[11px] font-extrabold border bg-emerald-950/80 text-emerald-400 border-emerald-800">
                    Wholesale In Stock
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Broad-Spectrum Antibiotics</span>
                    <span className="text-emerald-400 font-bold">NAFDAC Registered</span>
                  </div>
                  <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Anticoccidials (Amprolium/Toltrazuril)</span>
                    <span className="text-emerald-400 font-bold">100g &amp; 1L Sizes</span>
                  </div>
                  <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Amino Acids (DL-Methionine / Lysine)</span>
                    <span className="text-emerald-400 font-bold">25kg Original Bags</span>
                  </div>
                  <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Waterline Acidifiers &amp; Vitamin C</span>
                    <span className="text-emerald-400 font-bold">Biofilm Strippers</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#drug-catalog"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-xs font-bold text-white hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md"
                  >
                    <span>Browse In-Stock Formulations</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          OPERATIONAL BENCHMARKS BAR
          ==================================================================== */}
      <section className="bg-white border-y border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {OPERATIONAL_BENCHMARKS.map((b, i) => (
              <div key={i} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  {b.value}
                </div>
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  {b.label}
                </div>
                <div className="text-xs text-slate-500 leading-snug">{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PROBLEM SECTION: COUNTERFEIT VETERINARY DRUG RISKS
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            Pharmaceutical Hazards in Nigerian Agriculture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            How Counterfeit &amp; Adulterated Medications Destroy Flock Profits
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The Nigerian veterinary supply chain suffers from unregulated open-market traders selling underdosed active ingredients and counterfeit packages that cause catastrophic treatment failures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROBLEM_POINTS.map((p, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-red-100 bg-red-50/30 p-7 space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-red-100 text-xs font-bold text-red-700">
                Flock Impact: {p.impact}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          INFORMATION GAIN MATRIX: CLINICAL FORMULARY & DOSAGE
          ==================================================================== */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              Clinical Pharmacopoeia
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Commercial Farm Drug Formulary &amp; Dosage Reference Table
            </h2>
            <p className="text-sm text-slate-600">
              Verified clinical therapeutic dosages, target pathogens, withdrawal periods, and official NAFDAC registration numbers for essential commercial poultry medications.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-heading">
                  <th className="p-4 sm:p-5 font-bold">Product &amp; Active Molecule</th>
                  <th className="p-4 sm:p-5 font-bold">Pharmacological Class</th>
                  <th className="p-4 sm:p-5 font-bold">Target Pathogens / Symptoms</th>
                  <th className="p-4 sm:p-5 font-bold">Standard Inclusion Dosage</th>
                  <th className="p-4 sm:p-5 font-bold">Withdrawal Period</th>
                  <th className="p-4 sm:p-5 font-bold font-mono">NAFDAC Reg.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {FORMULARY_MATRIX.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{row.productName}</td>
                    <td className="p-4 sm:p-5 font-medium text-emerald-800">{row.category}</td>
                    <td className="p-4 sm:p-5">{row.targetPathogen}</td>
                    <td className="p-4 sm:p-5 font-bold text-slate-800">{row.standardDose}</td>
                    <td className="p-4 sm:p-5 font-semibold text-amber-900 bg-amber-50/30">{row.withdrawalPeriod}</td>
                    <td className="p-4 sm:p-5 font-mono text-slate-600">{row.nafdacNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4-PILLAR FRAMEWORK OF OPERATIONAL EXCELLENCE
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <Sparkles className="h-3.5 w-3.5" />
            Pharmaceutical Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            The D-AminGrow 4-Pillar Pharmaceutical Guarantee
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every pharmaceutical item delivered to your farm dispensary adheres to strict clinical verification protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pil) => {
            const Icon = pil.icon;
            return (
              <div
                key={pil.num}
                className="rounded-3xl border border-slate-200 bg-white p-7 space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-heading text-slate-300">{pil.num}</span>
                    <div className={`h-10 w-10 rounded-2xl ${pil.bgColor} ${pil.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 leading-snug">
                    {pil.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          PRESERVED 6 DRUG CATEGORIES
          ==================================================================== */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="section-label">
              <Pill className="h-3.5 w-3.5" />
              Dispensary Product Categories
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              6 Complete Categories for Commercial Farm Health
            </h2>
            <p className="text-slate-600 text-sm">
              From emergency curative antimicrobials to daily digestive acidifiers, explore our full wholesale inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DRUG_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className="rounded-3xl bg-slate-50 border border-slate-200 p-7 space-y-5 hover:shadow-xl hover:border-emerald-300 transition-all group flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className={`h-14 w-14 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading mb-2">{cat.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{cat.desc}</p>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Formulations</div>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {cat.examples.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <a
                      href={`https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20products%20from%20the%20${encodeURIComponent(cat.title)}%20category.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Request Category Price List</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PRESERVED TOP PRODUCTS LIST WITH QUICK ORDER
          ==================================================================== */}
      <section id="drug-catalog" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="section-label">
              <Star className="h-3.5 w-3.5" />
              High-Demand Formulations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Top Commercial Farm Dispensary Items
            </h2>
            <p className="text-slate-600 text-sm">
              All items are in stock and ready for immediate interstate waybill dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOP_PRODUCTS.map((p, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-all flex items-center justify-between gap-4"
              >
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Pill className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 font-heading truncate">{p.name}</h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[11px] text-slate-500 font-mono">NAFDAC: {p.nafdac}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-[11px] text-slate-600 font-medium">{p.unit}</span>
                  </div>
                </div>
                <a
                  href={`https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20${encodeURIComponent(p.name)}%20(${p.unit}).%20Please%20confirm%20wholesale%20price.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl transition-all shrink-0 shadow-sm"
                >
                  Order
                </a>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/drugs"
              className="inline-flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-50 border border-emerald-200 px-6 py-3.5 rounded-xl hover:bg-emerald-100 transition-all"
            >
              <span>View Full Drug Catalog (100+ SKUs)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          HONESTY FILTER: WE MAY NOT BE RIGHT FOR YOU IF...
          ==================================================================== */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-3">
            <div className="section-label">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Honest Fit Assessment
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
              Our Bulk Drug Procurement May <span className="text-rose-600">Not</span> Be Right For You If...
            </h2>
            <p className="text-sm text-slate-600">
              We operate as a licensed professional veterinary distributor. We adhere to clinical and regulatory guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Request Unregistered Black-Market Imports
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We do not supply smuggled, uninspected medications lacking authentic NAFDAC certificates. We never compromise livestock health or human food safety.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Plan to Routinely Overdose Commercial Layers
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We will not dispense fluoroquinolones (Ciprofloxacin / Enrofloxacin) for continuous preventive use in commercial layer birds actively producing table eggs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Are Ordering Micro-Quantities for Backyard Pets
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our operations are configured for commercial livestock farms and wholesale dispensaries. Orders below commercial wholesale pack sizes are best served by local retail chemists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FAQ SECTION (6 QUESTIONS)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="section-label">
              <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
              Pharmaceutical FAQs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions About Veterinary Drugs in Nigeria
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2">
                <h3 className="text-sm sm:text-base font-bold font-heading text-slate-900">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          HIGH-CONVERTING CLOSING CTA BANNER
          ==================================================================== */}
      <section className="py-20 bg-gradient-to-br from-[#050E08] via-slate-950 to-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
            <Clock className="h-3.5 w-3.5 text-emerald-400" />
            <span>Fast Wholesale Interstate Waybill Across Nigeria</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Stock Your Farm Dispensary with 100% Genuine Biologicals &amp; Drugs
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminate treatment failure and secure direct manufacturer bulk pricing. Connect directly with our veterinary pharmaceutical procurement desk on WhatsApp today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%20Pharmaceutical%20Desk%2C%20I%20want%20to%20order%20veterinary%20drugs%20in%20bulk%20for%20my%20farm."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-xl inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Connect on WhatsApp (+234 806 870 0074)</span>
            </a>
            <a
              href="tel:+2348068700074"
              className="border border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-xl transition-all text-base inline-flex items-center justify-center gap-2 bg-white/5"
            >
              <PhoneCall className="h-5 w-5 text-emerald-400" />
              <span>Call Bulk Procurement Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
