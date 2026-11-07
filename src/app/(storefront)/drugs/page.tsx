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
  XCircle,
  TrendingDown,
  Info,
  MapPin,
  Award,
} from 'lucide-react';

// ============================================================
// FAQ JSON-LD SCHEMA
// ============================================================
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What veterinary drugs does D-AminGrow supply for poultry in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'D-AminGrow supplies NAFDAC-registered veterinary drugs across four categories: Antibiotics & Antimicrobials (Oxytetracycline HCl, Ciprofloxacin/Cipo-Zen, Norfloxacin/Norflogen), Anticoccidials (Cocci-Ton with Amprolium + Sulfaquinoxaline, Toltrazuril, Diclazuril), Vitamins & Probiotics (Ascorbic Acid, B-Complex, probiotic blends), and Feed Amino Acids (DL-Methionine 99%, L-Lysine, Phytase). All carry verifiable NAFDAC batch numbers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are veterinary drugs from D-AminGrow NAFDAC registered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every veterinary pharmaceutical supplied by D-AminGrow is officially registered with the National Agency for Food and Drug Administration and Control (NAFDAC). We only source from approved manufacturers with batch numbers directly traceable to the producer. We do not handle counterfeit or unregistered products.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the correct dosage of Oxytetracycline for poultry in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard Oxytetracycline HCl dosage for poultry: 10–20 mg/kg body weight per day, administered in drinking water for 3–5 days. For 1,000 broilers at 1 kg average weight: dissolve 10–20g in sufficient water for 2-hour consumption. Always observe a 7-day withdrawal period before slaughter. Contact D-AminGrow\'s veterinary desk for a diagnosis-specific dosage advisory.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Cocci-Ton and how is it used for coccidiosis in poultry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cocci-Ton is an anticoccidial drug combining Amprolium and Sulfaquinoxaline, effective against Eimeria species causing intestinal haemorrhage in broilers and layers. Standard dosage: 1–2 g per litre of drinking water for 5–7 days. Begin treatment at the first sign of bloody droppings. For prophylaxis, consult your veterinarian on rotation protocols to prevent drug resistance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I buy poultry drugs online and get delivery across Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. D-AminGrow dispatches veterinary drugs nationwide — Lagos, Ibadan, Ogun, Oyo, Abuja, Kano, and surrounding states. Contact us via WhatsApp to confirm current stock, pricing, and dispatch timeline. Temperature-sensitive biologicals are separately cold-chain packaged.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between therapeutic and prophylactic drug use in poultry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Therapeutic use means treating an active disease outbreak — higher doses for shorter duration. Prophylactic use means preventing disease in at-risk flocks — lower doses for pre-emptive protection during stress periods (transit, heat, vaccination). Responsible use of antibiotics means avoiding blanket prophylactic antibiotic use and reserving antibiotics for confirmed bacterial infections to prevent antimicrobial resistance (AMR).',
      },
    },
  ],
};

// ============================================================
// DATA
// ============================================================

const BENCHMARKS = [
  { label: 'Drug Categories', value: '4+', sub: 'antibiotics to supplements', color: 'text-emerald-400' },
  { label: 'NAFDAC Verified', value: '100%', sub: 'all batch-numbered', color: 'text-cyan-400' },
  { label: 'Counterfeit Tolerance', value: 'Zero', sub: 'no unregistered products', color: 'text-amber-400' },
  { label: 'Advisory Support', value: 'Free', sub: 'WhatsApp veterinary desk', color: 'text-emerald-400' },
];

const DRUG_CATEGORIES = [
  {
    icon: Pill,
    title: 'Antibiotics & Antimicrobials',
    desc: 'Broad-spectrum and targeted antibiotics for respiratory, enteric, and systemic bacterial infections in poultry and livestock.',
    examples: ['Oxytetracycline HCl', 'Ciprofloxacin (Cipo-Zen)', 'Norfloxacin (Norflogen)'],
    color: 'bg-red-100 text-red-700',
    badge: 'Prescription Advisory',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    borderColor: 'border-red-100',
    bgColor: 'bg-red-50',
  },
  {
    icon: Zap,
    title: 'Anticoccidials & Antiprotozoals',
    desc: 'Fast-acting therapeutic coccidiostats for Eimeria control, intestinal haemorrhage prevention, and clinical coccidiosis management.',
    examples: ['Cocci-Ton (Amprolium + Sulfaquinoxaline)', 'Toltrazuril', 'Diclazuril'],
    color: 'bg-orange-100 text-orange-700',
    badge: 'Therapeutic Grade',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    borderColor: 'border-orange-100',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Leaf,
    title: 'Vitamins, Probiotics & Supplements',
    desc: 'Anti-stress vitamins, electrolytes, gut health probiotics, and feed amino acids to maximize performance and immunity.',
    examples: ['Ascorbic Acid (Vitamin C)', 'Vitamin B-Complex', 'Probiotic blends'],
    color: 'bg-emerald-100 text-emerald-700',
    badge: 'No Withdrawal',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    borderColor: 'border-emerald-100',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: FlaskConical,
    title: 'Feed Amino Acids & Additives',
    desc: 'Essential amino acids for feed formulation, optimal FCR, and reducing on-farm feed compounding costs.',
    examples: ['DL-Methionine (99% pure)', 'L-Lysine', 'Enzymes & Phytase'],
    color: 'bg-violet-100 text-violet-700',
    badge: 'Feed-Grade',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
    borderColor: 'border-violet-100',
    bgColor: 'bg-violet-50',
  },
];

const FAILURE_POINTS = [
  {
    icon: TrendingDown,
    title: 'Counterfeit drugs with no active ingredient',
    desc: 'Open-market veterinary drugs in Nigeria frequently have no active pharmaceutical ingredient or below-label concentrations. Farmers apply full doses, see no response, and escalate dosage — accelerating drug resistance.',
  },
  {
    icon: AlertTriangle,
    title: 'Antibiotic overuse driving AMR on farm',
    desc: 'Using broad-spectrum antibiotics prophylactically as growth promoters or without veterinary guidance creates antimicrobial-resistant pathogens. Resistant Salmonella and E. coli are increasingly common on Nigerian farms.',
  },
  {
    icon: XCircle,
    title: 'Incorrect withdrawal periods causing residue failures',
    desc: 'Birds slaughtered before the withdrawal period ends carry antibiotic residues in meat and eggs. This is a food safety violation and increasingly a market access barrier for export-oriented farms.',
  },
  {
    icon: TrendingDown,
    title: 'Wrong drug class applied to the wrong pathogen',
    desc: 'Applying antibiotics to treat viral infections (Newcastle, Gumboro, IBD) is ineffective. Applying anticoccidials to treat bacterial enteritis is equally futile. Misdiagnosis and drug misclassification cost farms money and time.',
  },
];

const PILLARS = [
  {
    num: '01',
    icon: ShieldCheck,
    title: 'NAFDAC-Verified Sourcing',
    desc: 'Every product carries a verifiable NAFDAC registration number and batch traceability to the approved manufacturer.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    num: '02',
    icon: Stethoscope,
    title: 'Free Dosage Advisory',
    desc: 'Our veterinary desk provides dosage calculations, withdrawal period guidance, and treatment protocol advice — free with every order.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    num: '03',
    icon: Award,
    title: 'Responsible AMR Position',
    desc: 'We only supply prescription antibiotics with dosage advisories. We actively guide farmers away from blanket prophylactic antibiotic misuse.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    num: '04',
    icon: MapPin,
    title: 'Nationwide Delivery',
    desc: 'Veterinary drugs dispatched to Lagos, Ibadan, Abuja, Kano and 36 states. Temperature-sensitive products handled with appropriate packaging.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
];

// INFORMATION GAIN: Antibiotic Resistance Framework
const AMR_TABLE = [
  { drug: 'Oxytetracycline HCl', class: 'Tetracycline', indication: 'CRD, Mycoplasmosis, Colibacillosis', dosage: '10–20 mg/kg/day × 5 days (water)', withdrawal: '7 days (meat)', risk: 'Medium', riskColor: 'text-orange-600 bg-orange-50' },
  { drug: 'Ciprofloxacin (Cipo-Zen)', class: 'Fluoroquinolone', indication: 'Severe bacterial infections, E. coli', dosage: '5–10 mg/kg/day × 3–5 days', withdrawal: '8 days (meat)', risk: 'High AMR Risk', riskColor: 'text-red-600 bg-red-50' },
  { drug: 'Norfloxacin (Norflogen)', class: 'Fluoroquinolone', indication: 'Enteric infections, Salmonella', dosage: '5–10 mg/kg/day × 3–5 days', withdrawal: '7 days', risk: 'High AMR Risk', riskColor: 'text-red-600 bg-red-50' },
  { drug: 'Cocci-Ton (Amprolium)', class: 'Anticoccidial', indication: 'Eimeria, bloody droppings, coccidiosis', dosage: '1–2 g/L drinking water × 5–7 days', withdrawal: '3 days', risk: 'Low', riskColor: 'text-emerald-600 bg-emerald-50' },
  { drug: 'Ascorbic Acid (Vit C)', class: 'Vitamin', indication: 'Heat stress, post-vaccination recovery', dosage: '200–300 mg/L continuously', withdrawal: 'None', risk: 'None', riskColor: 'text-emerald-600 bg-emerald-50' },
  { drug: 'DL-Methionine 99%', class: 'Amino Acid', indication: 'Feather growth, FCR improvement, egg shell', dosage: 'Per feed formulation spec', withdrawal: 'None', risk: 'None', riskColor: 'text-emerald-600 bg-emerald-50' },
];

const HONESTY_FILTERS = [
  'You want antibiotics without dosage advisory — we always provide withdrawal period and dosage guidance.',
  'You need drugs for a diagnosed viral disease — antibiotics don\'t treat Newcastle, IBD, or Fowl Pox. We will redirect you to vaccine therapy.',
  'You want products below NAFDAC registration threshold — we cannot and will not supply unregistered pharmaceuticals.',
  'You are looking for the cheapest possible price regardless of authenticity — counterfeit drugs are cheaper but ineffective and dangerous.',
];

const FAQ_DISPLAY = [
  {
    q: 'What veterinary drugs does D-AminGrow supply?',
    a: 'Antibiotics (Oxytetracycline, Ciprofloxacin, Norfloxacin), Anticoccidials (Cocci-Ton, Toltrazuril), Vitamins & Probiotics (Vitamin C, B-Complex), and Feed Amino Acids (DL-Methionine, L-Lysine). All NAFDAC-registered.',
  },
  {
    q: 'Are all products NAFDAC registered?',
    a: 'Yes. Every pharmaceutical we supply carries a verifiable NAFDAC registration number and batch traceability to the approved manufacturer. Zero tolerance for counterfeit products.',
  },
  {
    q: 'What is the correct Oxytetracycline dosage for poultry?',
    a: '10–20 mg/kg body weight per day in drinking water for 3–5 days. 7-day withdrawal before slaughter. Contact our desk for diagnosis-specific dosage advisory.',
  },
  {
    q: 'What is Cocci-Ton used for?',
    a: 'Cocci-Ton (Amprolium + Sulfaquinoxaline) treats Eimeria coccidiosis — bloody droppings, intestinal haemorrhage. 1–2 g/L drinking water for 5–7 days. 3-day withdrawal.',
  },
  {
    q: 'Can I get veterinary drug delivery across Nigeria?',
    a: 'Yes — Lagos, Ibadan, Abuja, Kano and all 36 states. Contact us via WhatsApp to confirm stock, pricing, and dispatch timeline.',
  },
  {
    q: 'What is the difference between therapeutic and prophylactic drug use?',
    a: 'Therapeutic = treating active disease (higher doses, shorter duration). Prophylactic = preventing disease during stress periods (lower doses). Avoid blanket antibiotic prophylaxis — it drives AMR.',
  },
];

// ============================================================
// PAGE METADATA
// ============================================================
export const metadata: Metadata = {
  title: 'Veterinary Drugs for Poultry in Nigeria | Quality Animal Pharmaceuticals | D-AminGrow',
  description:
    'Buy NAFDAC-registered veterinary drugs for poultry in Nigeria: antibiotics (Oxytetracycline, Ciprofloxacin), anticoccidials (Cocci-Ton, Toltrazuril), vitamins, probiotics, and amino acids. Free dosage advisory. Nationwide delivery.',
  openGraph: {
    title: 'Veterinary Drugs for Poultry in Nigeria | NAFDAC-Registered | D-AminGrow',
    description: 'NAFDAC-verified antibiotics, anticoccidials, probiotics, vitamins and amino acids for Nigerian poultry farms. Free dosage advisory. Nationwide delivery.',
  },
};

// ============================================================
// PAGE COMPONENT
// ============================================================
export default function DrugsPage() {
  const drugs = getProductsByCategory('drugs');

  return (
    <div className="font-body">

      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />


      {/* ====================================================================
          HERO — 12-col grid, left 7 / right 5
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* LEFT — 7 cols */}
            <div className="lg:col-span-7 space-y-5">

              {/* Badge pills */}
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

              {/* H1 */}
              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                Veterinary Drugs for Poultry in Nigeria:{' '}
                <span className="text-gradient-green">Antibiotics, Coccidiostats & Vitamins</span>
              </h1>

              {/* Lead */}
              <p className="text-lg text-slate-300 leading-relaxed">
                D-AminGrow supplies 100% genuine NAFDAC-registered veterinary antibiotics, anticoccidials, probiotics, and essential amino acids for commercial poultry and livestock farms across Nigeria — with free dosage advisory and withdrawal period guidance on every order.
              </p>

              {/* Motto pill */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                <Star className="h-3.5 w-3.5 text-emerald-400" />
                Your Satisfaction Is Our Priority
              </div>

              {/* Trust assurance pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  'NAFDAC Batch Numbers',
                  'Genuine Pharmaceuticals',
                  'AMR-Responsible',
                  'Dosage Advisory Included',
                  'Nationwide Delivery',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-emerald-300 font-medium bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20veterinary%20drugs%20for%20my%20poultry%20farm.%20Please%20share%20current%20pricing%20and%20availability."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Order drugs — WhatsApp
                </a>
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20veterinary%20drug%20dosage%20advisory%20for%20my%20flock."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
                >
                  <Stethoscope className="h-4 w-4" />
                  Get dosage advice
                </a>
                <Link
                  href="/knowledge"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  Clinical guides
                </Link>
              </div>
            </div>

            {/* RIGHT — 5 cols: NAFDAC compliance card + stats */}
            <div className="lg:col-span-5 space-y-5">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '100%', label: 'NAFDAC Verified', sub: 'All batch-numbered' },
                  { value: 'Zero', label: 'Counterfeit Products', sub: 'Absolute policy' },
                  { value: '4+', label: 'Drug Categories', sub: 'Antibiotics to supplements' },
                  { value: 'Free', label: 'Dosage Support', sub: 'WhatsApp advisory' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl bg-white/5 border border-white/8 p-5 text-center hover:border-emerald-500/25 transition-all">
                    <div className="text-2xl font-extrabold text-white font-heading">{stat.value}</div>
                    <div className="text-xs font-semibold text-emerald-400 mt-0.5">{stat.label}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* NAFDAC compliance card */}
              <div className="rounded-3xl bg-emerald-500/10 border border-emerald-500/25 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-heading">NAFDAC Compliance Statement</h3>
                    <p className="text-xs text-slate-500">Authorized distributor — zero counterfeits</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every veterinary pharmaceutical we supply is officially registered with NAFDAC. As an authorized distributor, we only source genuine, verified, field-tested products from approved manufacturers with batch numbers traceable to the producer.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Antibiotics', 'Anticoccidials', 'Vitamins', 'Amino Acids'].map((cat, i) => (
                    <span key={i} className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* AMR advisory */}
              <div className="rounded-3xl bg-amber-500/10 border border-amber-500/25 p-5 flex items-start gap-4">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-300 mb-1">Responsible Antibiotic Use</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Prescription antibiotics should only be used as directed. Overuse drives antimicrobial resistance (AMR). Our desk provides dosage, withdrawal, and diagnosis guidance on request.
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
          PROBLEM SECTION
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <AlertTriangle className="h-3.5 w-3.5" />
              The Root Problem
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why Veterinary Drugs Fail on Most Nigerian Poultry Farms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Drug failure is almost never about drug quality from reputable suppliers — it is about counterfeit products, misdiagnosis, incorrect dosage, and antibiotic resistance from blanket prophylaxis.
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
          4-PILLAR FRAMEWORK
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              The D-AminGrow Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 4-Pillar Drug Quality & Advisory System
            </h2>
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
          INFORMATION GAIN: ANTIBIOTIC REFERENCE TABLE
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Zap className="h-3.5 w-3.5" />
              Unique Information Gain
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Veterinary Drug Reference Guide: Dosage, Withdrawal & AMR Risk
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The most common question from Nigerian poultry farmers: &ldquo;What dose and for how long?&rdquo; This reference table gives you evidence-based starting points — always verify with our veterinary desk for your specific diagnosis.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Drug Name</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Class</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Indication</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Dosage Guide</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Withdrawal</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">AMR Risk</th>
                </tr>
              </thead>
              <tbody>
                {AMR_TABLE.map((row, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-t border-slate-100`}>
                    <td className="px-5 py-4 font-semibold text-slate-700 whitespace-nowrap">{row.drug}</td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.class}</td>
                    <td className="px-5 py-4 text-slate-600 text-xs">{row.indication}</td>
                    <td className="px-5 py-4 text-slate-600 text-xs">{row.dosage}</td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.withdrawal}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${row.riskColor}`}>
                        {row.risk}
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
              Dosages are general guidelines. Exact dosage depends on body weight, disease severity, and drug concentration. Always consult D-AminGrow&apos;s veterinary desk before treatment.
            </span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          DRUG CATEGORIES
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Pill className="h-3.5 w-3.5" />
              Product Categories
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Our Veterinary Drug Range
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DRUG_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className={`rounded-3xl ${cat.bgColor} border ${cat.borderColor} p-7 space-y-4 hover:shadow-lg transition-all group`}>
                  <div className="flex items-start justify-between">
                    <div className={`h-12 w-12 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${cat.badgeColor}`}>
                      {cat.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading mb-2">{cat.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{cat.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.examples.map((ex, j) => (
                        <span key={j} className="text-xs text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">
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
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Veterinary Drugs Catalogue
              </h2>
              <p className="text-sm text-slate-500 mt-2">All products NAFDAC-registered. Contact for confirmed current pricing.</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 shrink-0">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span className="text-sm text-emerald-800 font-medium">Pricing on request — no fixed retail rates</span>
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
                Get drug advisory
              </a>
              <Link
                href="/knowledge"
                className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-3.5 rounded-xl border border-white/15 hover:border-white/25 transition-all text-sm"
              >
                <BookOpen className="h-4 w-4" />
                Clinical guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
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
              We May Not Be the Right Supplier for You If...
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
                But if you want 100% genuine NAFDAC-registered veterinary drugs with free advisory support — we are built for exactly that.
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
              Everything About Veterinary Drugs for Poultry in Nigeria
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
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/8 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
            <ShieldCheck className="h-3.5 w-3.5" />
            NAFDAC-Registered — Order Today
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Buy Genuine Veterinary Drugs for{' '}
            <span className="text-gradient-green">Your Poultry Farm</span>
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Every pharmaceutical is NAFDAC-registered, batch-numbered, and comes with free dosage advisory. Your birds deserve treatments that actually work — not counterfeit products that waste your time and money.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20buy%20veterinary%20drugs%20for%20my%20poultry%20farm.%20Please%20send%20your%20current%20stock%20and%20pricing."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              Order drugs — WhatsApp
            </a>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20free%20dosage%20advisory%20for%20my%20flock%20treatment."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
            >
              <Stethoscope className="h-4 w-4" />
              Free advisory consultation
            </a>
          </div>
          <p className="text-xs text-slate-500">
            NAFDAC-registered · Batch-traceable · Free dosage support · Nationwide delivery
          </p>
        </div>
      </section>

    </div>
  );
}
