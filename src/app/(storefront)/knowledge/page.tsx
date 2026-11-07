import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { EDITORIAL_PILLARS } from '@/lib/editorial/pillars';
import { KnowledgeList } from './knowledge-list';
import {
  Clock,
  ArrowRight,
  Calculator,
  Sparkles,
  BookOpen,
  ShieldCheck,
  MessageCircle,
  FileText,
  Syringe,
  Stethoscope,
  Flame,
  Egg,
  Scale,
  Building2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Poultry Farming Guide in Nigeria | Complete Production & Health Hub | D-AminGrow',
  description:
    'Comprehensive poultry farming guide in Nigeria. Evidence-based clinical broiler manuals, layer production protocols, vaccination schedules, feed formulation recipes, and interactive farm calculators.',
  keywords: [
    'poultry farming guide in nigeria',
    'how to start poultry farming',
    'broiler production manual',
    'layers farming handbook',
    'poultry disease prevention',
    'farming business plan Nigeria',
    'poultry farming in nigeria pdf free download',
    'step by step guide to poultry farming in nigeria',
    'commercial chicken farming guide nigeria',
    'poultry production handbook for beginners',
  ],
  alternates: {
    canonical: 'https://damingrow.com/knowledge',
  },
  openGraph: {
    title: 'Poultry Farming Guide in Nigeria | Complete Production & Health Hub | D-AminGrow',
    description:
      'Actionable clinical veterinary protocols, tropical pen housing engineering, and financial ROI models for commercial and smallholder Nigerian poultry farmers.',
    url: 'https://damingrow.com/knowledge',
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
      name: 'How much capital do I need to start commercial poultry farming in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Starting a smallholder commercial broiler farm (500 birds) in Nigeria typically requires between ₦3,300,000 and ₦4,500,000, covering open-sided pen construction, equipment, day-old chicks, feeds to 6 weeks, and cold-chain vaccines. A commercial layer farm of 1,000 birds requires approximately ₦11,000,000 to ₦14,500,000 including battery cages and 17 weeks of feeding before egg cash flow begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which poultry farming venture is more profitable in Nigeria: Broilers or Layers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Broiler production offers rapid capital turnover (6 to 7-week production cycles) and high holiday festive market demand, but carries working capital risks if market off-takers are not secured beforehand. Layer farming requires substantial upfront capital to rear pullets to 18 weeks, but delivers steady daily cash flow from egg sales for over 12 to 14 months of lay.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the most common fatal poultry diseases in Nigeria and how can they be prevented?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 4 most prevalent fatal poultry diseases in Nigeria are Velogenic Newcastle Disease (ND), Infectious Bursal Disease (Gumboro / IBD), Caecal Coccidiosis, and Chronic Respiratory Disease (CRD). Prevention requires a strict 10-point biosecurity perimeter, chlorinated drinking waterlines, and timely administration of 2°C–8°C cold-chain verified vaccines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do European and American poultry farming manuals fail in tropical Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Foreign manuals assume automated environmental temperature controls (tunnel ventilation with cooling pads), temperate ambient temperatures, and consistent commercial grain quality. In Nigeria, open-sided tropical pens experience midday ambient temperatures exceeding 35°C with high relative humidity, requiring custom east-to-west pen orientation, wider roof overhangs, lower stocking densities (10 birds/m²), and adjusted amino acid-to-energy feed formulations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does D-AminGrow ensure the clinical accuracy of its knowledge guides?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All D-AminGrow knowledge articles, timetables, and calculation tools are authored and clinically audited by registered Veterinary Council of Nigeria (VCN) doctors and agricultural engineers. Guides incorporate real-time Nigerian commodity market data, tropical disease epidemiology, and field-tested commercial farm practices.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are D-AminGrow interactive farm calculators and guides free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All clinical guides, vaccination schedule generators, brooder calculators, FCR analyzers, and disease symptom triage engines on the D-AminGrow Knowledge Centre are 100% free and open access to support over 500,000 African livestock farmers.',
      },
    },
  ],
};

const OPERATIONAL_BENCHMARKS = [
  {
    value: '12+ Guides',
    label: 'Clinical Veterinary Protocols',
    detail: 'Field manuals authored by licensed Nigerian veterinarians',
  },
  {
    value: '6 Authority Pillars',
    label: 'Programmatic Topics',
    detail: 'Biosecurity, brooding, nutrition, immunology, and economics',
  },
  {
    value: '6 Tools',
    label: 'Digital Farm Calculators',
    detail: 'Brooder floor space, FCR analyzer, and custom vaccination timetables',
  },
  {
    value: '500,000+',
    label: 'African Farmers Reached',
    detail: 'Empowering commercial and smallholder livestock producers',
  },
];

const PROBLEM_POINTS = [
  {
    title: 'Blindly Copying Temperate European Poultry Manuals',
    desc: 'Foreign textbooks assume enclosed insulated housing with automated evaporative cooling pads. Applying those guidelines to naturally ventilated tropical open-sided Nigerian pens results in catastrophic heat prostration during 36°C afternoon peaks, triggering panting, respiratory alkalosis, and massive mortality in birds over 4 weeks.',
    impact: 'Up to 35% growth suppression & sudden heat deaths',
  },
  {
    title: 'Relying on Outdated 2018–2020 Feed Economics',
    desc: 'Old online articles cite maize at ₦120/kg and soya at ₦250/kg. Planning modern poultry investments using obsolete financial templates leads to rapid cash starvation when real 2026 grain prices and commercial feed costs require 3x higher working capital buffers.',
    impact: 'Premature project collapse & feed cash starvation',
  },
  {
    title: 'Shotgun Antibiotic Abuse Instead of Epidemiological Prevention',
    desc: 'Unregulated internet forums teach beginners to dump mixed antibiotics into water troughs from Day 1. This destroys chick gut villi, creates antibiotic-resistant bacterial superbugs, and leaves the flock 100% defenseless against acute viral challenges like Newcastle and Gumboro.',
    impact: 'Permanent FCR damage & recurring flock wipeouts',
  },
];

const PRODUCTION_MATRIX = [
  {
    system: 'Commercial Meat Broilers',
    capital: '₦3.5M – ₦5.0M (per 1,000 birds)',
    turnover: '6 to 7 Weeks',
    keyRisks: 'Heat stress, acute Gumboro (IBD), feed price surges',
    recommendedGuide: 'Broiler Brooding & Nutritional Blueprint',
    calculatorLink: '/calculators/fcr',
    calculatorLabel: 'FCR Calculator',
  },
  {
    system: 'Commercial Egg Layers (Cages)',
    capital: '₦11.0M – ₦14.5M (per 1,000 birds)',
    turnover: '18 Weeks to first egg; 14 months of lay',
    keyRisks: 'Egg Drop Syndrome, cage paralysis, defective feed calcium',
    recommendedGuide: 'Layer Production Handbook & Egg Persistency',
    calculatorLink: '/calculators/egg-production',
    calculatorLabel: 'Egg Calculator',
  },
  {
    system: 'Point-of-Lay Pullet Procurement',
    capital: '₦6.5M – ₦8.5M (per 1,000 POL birds)',
    turnover: '2 to 3 Weeks to commercial egg flow',
    keyRisks: 'Transit stress, post-delivery dehydration, feed change shock',
    recommendedGuide: 'POL Reception & Photoperiod Lighting Protocol',
    calculatorLink: '/services/point-of-lay',
    calculatorLabel: 'POL Booking Desk',
  },
  {
    system: 'Dual-Purpose Noiler / Kuroiler',
    capital: '₦2.2M – ₦3.2M (per 1,000 birds)',
    turnover: '14 to 16 Weeks (Meat) / 22 Weeks (Eggs)',
    keyRisks: 'Predators, wild bird exposure, Fowl Pox outbreaks',
    recommendedGuide: 'Tropical Semi-Intensive Free-Range Management',
    calculatorLink: '/calculators/brooder',
    calculatorLabel: 'Brooder Calculator',
  },
];

const PILLARS = [
  {
    num: '01',
    title: 'Clinical Veterinary Pathology & Immunology',
    desc: 'Evidence-based protocols covering viral challenge differentials, post-mortem necropsy interpretation, and verified 2°C–8°C cold-chain vaccination timetables.',
    icon: Syringe,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
  },
  {
    num: '02',
    title: 'Tropical Housing & Thermodynamic Engineering',
    desc: 'Aerodynamic open-sided pen layout, strict east-to-west solar orientation, dwarf wall construction, and infrared brooding calibration for zero chilling losses.',
    icon: Building2,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
  },
  {
    num: '03',
    title: 'Precision Nutrition Science & Pearson Formulation',
    desc: 'Least-cost linear diet formulation balancing crude protein, crystalline amino acids (Lysine & Methionine), and phytase enzymes to achieve sub-1.60 FCR.',
    icon: Scale,
    color: 'text-lime-400',
    borderColor: 'border-lime-500/30',
    bgColor: 'bg-lime-500/10',
  },
  {
    num: '04',
    title: 'Bankable Agribusiness Economics & Risk Modeling',
    desc: 'Real-time financial models with dynamic grain inflation buffers, break-even timelines, cash-flow projections, and sensitivity analysis for African commercial operations.',
    icon: FileText,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
  },
];

const FAQS = [
  {
    q: 'How much capital do I need to start commercial poultry farming in Nigeria?',
    a: 'Starting a smallholder commercial broiler farm (500 birds) in Nigeria typically requires between ₦3,300,000 and ₦4,500,000, covering open-sided pen construction, equipment, day-old chicks, feeds to 6 weeks, and cold-chain vaccines. A commercial layer farm of 1,000 birds requires approximately ₦11,000,000 to ₦14,500,000 including battery cages and 17 weeks of feeding before egg cash flow begins.',
  },
  {
    q: 'Which poultry farming venture is more profitable in Nigeria: Broilers or Layers?',
    a: 'Broiler production offers rapid capital turnover (6 to 7-week production cycles) and high holiday festive market demand, but carries working capital risks if market off-takers are not secured beforehand. Layer farming requires substantial upfront capital to rear pullets to 18 weeks, but delivers steady daily cash flow from egg sales for over 12 to 14 months of lay.',
  },
  {
    q: 'What are the most common fatal poultry diseases in Nigeria and how can they be prevented?',
    a: 'The 4 most prevalent fatal poultry diseases in Nigeria are Velogenic Newcastle Disease (ND), Infectious Bursal Disease (Gumboro / IBD), Caecal Coccidiosis, and Chronic Respiratory Disease (CRD). Prevention requires a strict 10-point biosecurity perimeter, chlorinated drinking waterlines, and timely administration of 2°C–8°C cold-chain verified vaccines.',
  },
  {
    q: 'Why do European and American poultry farming manuals fail in tropical Nigeria?',
    a: 'Foreign manuals assume automated environmental temperature controls (tunnel ventilation with cooling pads), temperate ambient temperatures, and consistent commercial grain quality. In Nigeria, open-sided tropical pens experience midday ambient temperatures exceeding 35°C with high relative humidity, requiring custom east-to-west pen orientation, wider roof overhangs, lower stocking densities (10 birds/m²), and adjusted amino acid-to-energy feed formulations.',
  },
  {
    q: 'How does D-AminGrow ensure the clinical accuracy of its knowledge guides?',
    a: 'All D-AminGrow knowledge articles, timetables, and calculation tools are authored and clinically audited by registered Veterinary Council of Nigeria (VCN) doctors and agricultural engineers. Guides incorporate real-time Nigerian commodity market data, tropical disease epidemiology, and field-tested commercial farm practices.',
  },
  {
    q: 'Are D-AminGrow interactive farm calculators and guides free to use?',
    a: 'Yes. All clinical guides, vaccination schedule generators, brooder calculators, FCR analyzers, and disease symptom triage engines on the D-AminGrow Knowledge Centre are 100% free and open access to support over 500,000 African livestock farmers.',
  },
];

export default function KnowledgeHubPage() {
  const featuredArticle = ARTICLES[0]!;

  return (
    <div className="min-h-screen bg-slate-50/70 font-body">
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
            <span className="text-emerald-400 font-semibold">Knowledge Centre</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label-dark">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Veterinary Knowledge &amp; Agricultural Engineering Hub
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-tight font-heading leading-tight">
                Poultry Farming Guide in Nigeria: <br />
                <span className="text-gradient-green">Clinical Production Guides &amp; Farm Economics</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Empowering over 500,000 African livestock farmers with actionable clinical veterinary protocols, tropical brooding engineering standards, least-cost feed formulation recipes, and interactive farm calculators to eliminate mortality and maximize commercial profitability.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%20Knowledge%20Desk%2C%20I%20have%20an%20urgent%20poultry%20management%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Consult Veterinary Desk on WhatsApp</span>
                </a>
                <a
                  href="#articles-library"
                  className="inline-flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-4 rounded-xl transition-all text-sm"
                >
                  <span>Browse Clinical Library</span>
                  <ArrowRight className="h-4 w-4 text-emerald-400" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Authored by Licensed Nigerian VCN Veterinarians</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Real-Time 2026 Production Economics</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-400" />
                  <span>100% Free &amp; Open Access</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Digital Decision Tools Quick Hub */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white font-heading">
                      Interactive Farm Calculators
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    6 Live Tools
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <Link
                    href="/calculators/fcr"
                    className="p-3 bg-slate-800/70 hover:bg-slate-800 rounded-xl border border-slate-700/60 flex items-center justify-between transition-all group"
                  >
                    <div>
                      <span className="text-white font-bold block group-hover:text-emerald-400 transition-colors">
                        FCR &amp; Meat Cost Margin Analyzer
                      </span>
                      <span className="text-[11px] text-slate-400">Calculate feed conversion &amp; profit per bird</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/calculators/brooder"
                    className="p-3 bg-slate-800/70 hover:bg-slate-800 rounded-xl border border-slate-700/60 flex items-center justify-between transition-all group"
                  >
                    <div>
                      <span className="text-white font-bold block group-hover:text-emerald-400 transition-colors">
                        Brooder Temperature &amp; Floor Space
                      </span>
                      <span className="text-[11px] text-slate-400">Floor area, gas brooders &amp; heat zones</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/calculators/egg-production"
                    className="p-3 bg-slate-800/70 hover:bg-slate-800 rounded-xl border border-slate-700/60 flex items-center justify-between transition-all group"
                  >
                    <div>
                      <span className="text-white font-bold block group-hover:text-emerald-400 transition-colors">
                        Egg Production &amp; Hen-Day (HDP)
                      </span>
                      <span className="text-[11px] text-slate-400">Track daily crates, feed efficiency &amp; revenue</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/calculators/symptom-checker"
                    className="p-3 bg-slate-800/70 hover:bg-slate-800 rounded-xl border border-slate-700/60 flex items-center justify-between transition-all group"
                  >
                    <div>
                      <span className="text-white font-bold block group-hover:text-emerald-400 transition-colors">
                        Poultry Disease Symptom Checker
                      </span>
                      <span className="text-[11px] text-slate-400">Identify clinical differentials &amp; treatments</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </div>

                <div className="pt-2">
                  <Link
                    href="/calculators/vaccination"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-xs font-bold text-white hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md"
                  >
                    <span>Generate Custom Vaccination Timetable</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FEATURED HERO ARTICLE BANNER
          ==================================================================== */}
      <section className="relative -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-10 shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300">
                  <Sparkles className="h-3 w-3" />
                  Featured Clinical Protocol
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {featuredArticle.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-tight">
                {featuredArticle.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                {featuredArticle.summary}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span>By <strong className="text-emerald-300">{featuredArticle.author.name}</strong></span>
                <span>•</span>
                <span>{featuredArticle.category}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href={`/knowledge/${featuredArticle.slug}`}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-6 py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 text-sm group"
              >
                <span>Read Full Protocol</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          OPERATIONAL BENCHMARKS BAR
          ==================================================================== */}
      <section className="bg-white border-y border-slate-200 py-8 my-12">
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
          PROBLEM SECTION: WHY GENERIC INTERNET GUIDES FAIL IN NIGERIA
          ==================================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            Flawed Information Traps
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Why Generic Internet Poultry Guides Cost African Farmers Millions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Copy-pasting temperate European farm handbooks into Nigerian tropical conditions leads to massive heat prostration, cash-flow starvation, and rampant antibiotic resistance.
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
          INFORMATION GAIN MATRIX: COMMERCIAL PRODUCTION MATRIX
          ==================================================================== */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              Commercial Quick-Reference
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Commercial Poultry Production Quick-Reference Matrix (Nigeria 2026)
            </h2>
            <p className="text-sm text-slate-600">
              Essential capital benchmarks, cash-flow turnover horizons, major clinical vulnerabilities, and recommended digital decision tools for primary Nigerian poultry ventures.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-heading">
                  <th className="p-4 sm:p-5 font-bold">Production System</th>
                  <th className="p-4 sm:p-5 font-bold">Est. Capital / 1,000 Birds</th>
                  <th className="p-4 sm:p-5 font-bold">Time to Revenue</th>
                  <th className="p-4 sm:p-5 font-bold">Key Clinical Vulnerabilities</th>
                  <th className="p-4 sm:p-5 font-bold">Recommended Guide</th>
                  <th className="p-4 sm:p-5 font-bold text-emerald-300">Dedicated Calculator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {PRODUCTION_MATRIX.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{row.system}</td>
                    <td className="p-4 sm:p-5 font-mono text-emerald-800 font-bold">{row.capital}</td>
                    <td className="p-4 sm:p-5 font-medium">{row.turnover}</td>
                    <td className="p-4 sm:p-5 text-slate-600">{row.keyRisks}</td>
                    <td className="p-4 sm:p-5 font-semibold text-slate-900">{row.recommendedGuide}</td>
                    <td className="p-4 sm:p-5">
                      <Link
                        href={row.calculatorLink}
                        className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
                      >
                        <span>{row.calculatorLabel}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
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
            Clinical Knowledge Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            The D-AminGrow 4-Pillar Farm Management Foundation
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our clinical advisory bridges pathology, microclimate engineering, and financial economics into a unified standard of agricultural excellence.
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
          6 CORE AUTHORITY PILLARS (PROGRAMMATIC TOPIC CLUSTERS)
          ==================================================================== */}
      <section className="pt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="section-label mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              E-E-A-T Programmatic Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading">
              6 Core Agricultural Authority Pillars
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Specialized veterinary and engineering research clusters serving 500,000+ monthly poultry producers across West Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDITORIAL_PILLARS.map((p) => {
            let IconComp = BookOpen;
            if (p.iconName === 'Syringe') IconComp = Syringe;
            else if (p.iconName === 'Stethoscope') IconComp = Stethoscope;
            else if (p.iconName === 'Flame') IconComp = Flame;
            else if (p.iconName === 'Egg') IconComp = Egg;
            else if (p.iconName === 'Scale') IconComp = Scale;
            else if (p.iconName === 'Building2') IconComp = Building2;

            return (
              <Link
                key={p.id}
                href={`/knowledge/pillar/${p.slug}`}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
                    <span>Target: <strong className="text-slate-800">{(p.monthlyTrafficTarget / 1000).toFixed(0)}k/mo</strong></span>
                    <span className="text-emerald-700 font-semibold group-hover:underline flex items-center gap-1">
                      Explore Pillar <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          MAIN ARTICLES DIRECTORY WITH LIVE SEARCH & FILTERING
          ==================================================================== */}
      <section id="articles-library" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="space-y-2">
          <div className="section-label">
            <BookOpen className="h-3.5 w-3.5" />
            Field Advisory
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 font-heading tracking-tight">
            Clinical Veterinary &amp; Farm Engineering Library
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            Practical, evidence-backed guides created by Nigerian veterinary doctors and livestock engineers to protect your capital.
          </p>
        </div>

        {/* Client Interactive Filter & Grid */}
        <KnowledgeList articles={ARTICLES} />
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
              Our Clinical Knowledge Hub May <span className="text-rose-600">Not</span> Be Right For You If...
            </h2>
            <p className="text-sm text-slate-600">
              We publish rigorous veterinary and engineering science. We do not promote get-rich-quick agricultural fantasies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Believe Poultry Farming is Automatic Passive Income
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Commercial poultry farming is an intensive, daily biological operation. If you expect guaranteed passive returns without rigorous biosecurity, daily monitoring, and strict feeding discipline, our guides will prove challenging.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Prefer Internet Myths Over Laboratory Science
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If your disease treatment protocol relies on unverified home remedies (e.g. pouring kerosene in drinkers or treating Newcastle with paracetamol) rather than clinical diagnosis, our evidence-backed protocols are not a fit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Refuse to Plan for Feed Price Inflation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nigerian agricultural commodities experience seasonal volatility. If you refuse to budget a 15% working capital liquidity buffer for maize and soya price swings, your farm risks running out of feed mid-cycle.
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
              Poultry Farming FAQs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions About Commercial Poultry in Nigeria
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
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Dedicated Veterinary Clinical Outbreak Line</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Facing an Active Disease Challenge or Farm Planning Question?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Do not guess with your flock capital. Connect directly with our duty veterinary doctors on WhatsApp for emergency symptom triage, post-mortem lesion evaluation, or turnkey pen setup advisory.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%20Veterinary%20Desk%2C%20I%20have%20an%20urgent%20flock%20health%20inquiry%20regarding%20my%20birds."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-xl inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Connect on WhatsApp (+234 806 870 0074)</span>
            </a>
            <Link
              href="/services/consultation"
              className="border border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-xl transition-all text-base inline-flex items-center justify-center gap-2 bg-white/5"
            >
              <span>Book Turnkey Farm Advisory</span>
              <ArrowRight className="h-4 w-4 text-emerald-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
