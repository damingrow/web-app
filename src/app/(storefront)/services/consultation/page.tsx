import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  Syringe,
  Stethoscope,
  Wheat,
  TrendingUp,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  Star,
  Users,
  HeartHandshake,
  ClipboardList,
  PhoneCall,
  MapPin,
  FileText,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  BookOpen,
  Award,
  BarChart3,
} from 'lucide-react';
import { VeterinaryTriageForm } from '@/components/forms/veterinary-triage-form';

export const metadata: Metadata = {
  title: 'Poultry Farm Consultant in Nigeria | Professional Livestock Advisory | D-AminGrow',
  description:
    'Hire experienced poultry farm consultants in Nigeria. Expert farm housing design, disease outbreak triage, feed formulation, and business feasibility modeling.',
  keywords: [
    'poultry farm consultant in nigeria',
    'veterinary agricultural consultant',
    'livestock business advisor',
    'poultry farm feasibility audit',
    'commercial production expert',
    'poultry farming consultant lagos ibadan',
    'hire poultry farm consultant nigeria',
    'poultry farm business plan and feasibility study',
  ],
  alternates: {
    canonical: 'https://damingrow.com/services/consultation',
  },
  openGraph: {
    title: 'Poultry Farm Consultant in Nigeria | Professional Livestock Advisory | D-AminGrow',
    description:
      'Turnkey commercial poultry farm management, technical veterinary advisory, and certified livestock inputs across Nigeria.',
    url: 'https://damingrow.com/services/consultation',
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
      name: 'What specific areas do D-AminGrow poultry consultants cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our consultancy spans 5 critical commercial domains: turnkey pen and housing engineering, urgent flock disease diagnosis and post-mortem triage, custom least-cost feed formulation, 10-point biosecurity audits, and bankable business plan / financial feasibility modeling.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you provide a bankable feasibility study and business plan for loans or investors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We construct comprehensive, investor-grade financial models reflecting real-time Nigerian commodity costs (maize, soya, premix, DOC pricing), complete with cash flow forecasts, CAPEX/OPEX breakdowns, sensitivity analysis, and break-even timelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can a veterinary consultant visit my farm during a disease outbreak?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For critical disease escalations within Lagos, Ogun, Oyo, Osun, and Kwara states, an on-farm diagnostic clinician can be dispatched within 24–48 hours. Initial emergency triage and differential scoring are provided virtually via WhatsApp within 2 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer remote advisory for diaspora investors based outside Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Over 40% of our enterprise advisory clients reside in the UK, US, and Canada. We provide scheduled video consultations, architectural reviews, independent on-site contractor verification audits, and ongoing digital supervisory reports.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does custom feed formulation consultation reduce my production costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial feeds include significant marketing and branding markups. By balancing locally available grains (maize, wheat offal, soya, bone meal) with synthetic amino acids (methionine, lysine) and phytase enzymes, our custom formulas typically save ₦35 to ₦60 per kg of feed while improving FCR.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I book an initial consultation or on-farm inspection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can submit your farm parameters through our interactive clinical triage form on this page, or connect immediately to our senior consulting desk on WhatsApp (+234 806 870 0074).',
      },
    },
  ],
};

const OPERATIONAL_BENCHMARKS = [
  {
    value: '20+ Years',
    label: 'Combined Veterinary Leadership',
    detail: 'Field-tested agronomic and clinical experience across Nigeria',
  },
  {
    value: '₦450M+',
    label: 'Commercial Capital Guided',
    detail: 'Successfully engineered broiler, layer, and parent-stock projects',
  },
  {
    value: '97.8%',
    label: 'Average Flock Livability',
    detail: 'Achieved through strict biosecure architectural planning',
  },
  {
    value: '< 2 Hours',
    label: 'Rapid Triage Response',
    detail: 'Immediate clinician WhatsApp intake and differential analysis',
  },
];

const CONSULTATION_AREAS = [
  {
    icon: Building2,
    title: 'Poultry Housing & Pen Construction Design',
    desc: 'Turnkey engineering advisory for open-sided tropical pens, closed-house ventilation broiler sheds, and multi-tier layer battery cage infrastructure. Includes material cost estimation, ventilation design, and equipment specification.',
    color: 'bg-amber-100 text-amber-700',
    deliverables: ['Pen layout blueprint', 'Material cost estimation', 'Ventilation design spec', 'Equipment list'],
    href: '/services/consultation/farm-setup',
    ctaText: 'Launch Farm Setup Blueprint Tool',
  },
  {
    icon: Stethoscope,
    title: 'Emergency Flock Health Diagnostics & Triage',
    desc: 'Systematic clinical scoring for acute mortality, post-mortem necropsy protocols, and urgent viral challenge escalation directly to our duty VCN-certified veterinary clinicians.',
    color: 'bg-red-100 text-red-700',
    deliverables: ['Emergency triage score', 'Differential diagnosis', 'Treatment protocol', 'Direct VCN escalation'],
    href: '/services/consultation/disease-triage',
    ctaText: 'Start Emergency Disease Triage',
  },
  {
    icon: Wheat,
    title: 'Feed & Nutrition Program Optimization',
    desc: 'Analysis of current feed program, raw material quality, and Pearson Square Crude Protein formulation. Identifies amino acid gaps (Lysine, Methionine) and calcium balance to reduce production cost.',
    color: 'bg-lime-100 text-lime-700',
    deliverables: ['Pearson square calculation', 'Feed program revision', 'Cost-per-kg feed review', 'FCR improvement targets'],
    href: '/services/consultation/feed-formulation',
    ctaText: 'Open Feed Formulation Tool',
  },
  {
    icon: Syringe,
    title: 'Farm Biosecurity & Viral Disease Defence Audit',
    desc: '10-point barrier assessment evaluating perimeter fencing, disinfectant footbaths, water chlorination, and wild bird exclusion to eliminate viral breach risks.',
    color: 'bg-cyan-100 text-cyan-700',
    deliverables: ['10-point defence scorecard', 'Biosecurity index', 'Custom vaccination timetable', 'Barrier protocol'],
    href: '/services/consultation/biosecurity-audit',
    ctaText: 'Perform Biosecurity Audit',
  },
  {
    icon: TrendingUp,
    title: 'Poultry Business Financial Planning & ROI Modeling',
    desc: 'Full farm economic model including startup capital estimation, monthly operating costs, break-even analysis, projected revenue from eggs or meat, and sensitivity analysis for feed price fluctuations common in Nigeria.',
    color: 'bg-emerald-100 text-emerald-700',
    deliverables: ['Investment cost sheet', 'Break-even analysis', 'Monthly cash flow model', '12-month profit projection'],
    href: '#clinical-triage',
    ctaText: 'Request Financial Model',
  },
];

const PROBLEM_POINTS = [
  {
    title: 'Defective Pen Orientation & Heat Mortality',
    desc: 'Constructing poultry sheds facing east-west without adequate roof overhangs allows direct midday solar radiation. Birds suffer severe heat prostration, dropping daily feed intake by up to 40% and triggering massive mortality.',
    impact: 'Up to 35% growth suppression',
  },
  {
    title: 'Blind Broad-Spectrum Medication Wastage',
    desc: 'Treating viral infections (like Newcastle or Gumboro) with expensive commercial antibiotics destroys bird intestinal microflora and drives antimicrobial resistance while failing to arrest flock death.',
    impact: '₦300,000+ wasted per cycle',
  },
  {
    title: 'Flawed Feasibility Studies & Cash Starvation',
    desc: 'Relying on unrealistic internet projections that ignore 15% annual grain inflation or fail to budget working capital until Point-of-Lay causes projects to run out of money mid-rearing.',
    impact: 'Premature startup liquidation',
  },
];

const FEASIBILITY_MATRIX = [
  {
    variable: 'Pen Architectural Layout',
    uninformed: 'Low-ceiling, poor ridge vent, wrong solar axis',
    damingrow: 'Aerodynamic ridge vent, oriented to prevailing breeze',
    delta: 'Lowers ambient pen temp by 3°C–5°C; eliminates heat deaths',
  },
  {
    variable: 'Feed Compounding Program',
    uninformed: '100% commercial bagged feed with retail markup',
    damingrow: 'Precision custom ration using audited local grains',
    delta: 'Saves ₦1,200,000+ on feed per 5,000 broilers reared',
  },
  {
    variable: 'Vaccine & Health Protocol',
    uninformed: 'Generic internet chart with room-temp vaccines',
    damingrow: 'Site-specific protocol with 2°C–8°C cold chain',
    delta: 'Reduces mortality from 12% to under 2.5%',
  },
  {
    variable: 'Working Capital Planning',
    uninformed: 'Budgeted only for chicks and initial 2 feed bags',
    damingrow: '12-month cash flow model with price sensitivity buffers',
    delta: 'Guarantees liquidity through market volatility',
  },
];

const PILLARS = [
  {
    num: '01',
    title: 'Strategic Feasibility & Financial Modeling',
    desc: 'Constructing bankable, reality-tested financial models with dynamic sensitivity margins for feed ingredient fluctuations and egg-meat seasonal prices.',
    icon: TrendingUp,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
  },
  {
    num: '02',
    title: 'Biosecure Pen & Infrastructure Engineering',
    desc: 'Designing tropical open-sided sheds and automated battery cage housing configured for natural microclimate ventilation, biosecurity fences, and clean water filtration.',
    icon: Building2,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
  },
  {
    num: '03',
    title: 'Clinical Pathology & Differential Triage',
    desc: 'Immediate veterinary necropsy diagnosis, bacteriological sensitivity isolation, and targeted therapeutic intervention to contain acute disease challenges within 24 hours.',
    icon: Stethoscope,
    color: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    bgColor: 'bg-rose-500/10',
  },
  {
    num: '04',
    title: 'Nutritional Ration & FCR Optimization',
    desc: 'Balancing energy-to-protein ratios and synthetic amino acid profiles to achieve an FCR under 1.55 on broilers and prolonged 90%+ lay persistence.',
    icon: Wheat,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    icon: MessageCircle,
    title: 'Intake & Needs Assessment',
    desc: 'Submit your flock size, location, and operational hurdles via our interactive triage or direct WhatsApp consultation.',
  },
  {
    step: '02',
    icon: PhoneCall,
    title: 'Diagnostic Discovery Call',
    desc: 'A structured 30-minute deep-dive session with our senior livestock consultant to evaluate your layout and financials.',
  },
  {
    step: '03',
    icon: MapPin,
    title: 'On-Farm Inspection / Remote Audit',
    desc: 'A physical on-site evaluation of your facilities or a high-resolution video and data audit for remote and diaspora clients.',
  },
  {
    step: '04',
    icon: FileText,
    title: 'Technical Blueprint & 30-Day Support',
    desc: 'A comprehensive operational roadmap, formulation sheets, and 30-day active WhatsApp supervision during execution.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Alhaji Musa Garba',
    location: 'Kano State',
    role: 'Commercial Broiler Farmer (10,000 birds)',
    quote:
      'D-AminGrow consultants redesigned our broiler pen ventilation and revised our feed program. Our FCR dropped from 2.1 to 1.75 in two cycles. That is money directly back into my pocket. Highly recommended.',
    avatar: 'MG',
  },
  {
    name: 'Mrs. Adaeze Okonkwo',
    location: 'Enugu State',
    role: 'Commercial Layer Farmer (5,000 birds)',
    quote:
      "I was losing 3–5 birds daily from unexplained respiratory signs for 3 weeks. D-AminGrow's technician diagnosed Mycoplasma + IB complex, and provided a targeted protocol. Mortality dropped to zero in 4 days.",
    avatar: 'AO',
  },
  {
    name: 'Mr. Biodun Adesanya',
    location: 'Oyo State',
    role: 'Startup Poultry Investor',
    quote:
      'As a first-time poultry investor, I was confused about housing design, which breeds to choose, and how much capital I needed. D-AminGrow built me a full business plan and supervised my pen construction. My first batch recorded 98% livability.',
    avatar: 'BA',
  },
];

const HONESTY_FILTERS = [
  'You are looking for get-rich-quick agricultural schemes that promise 100% profit without investing in basic biosecurity and clean borehole water.',
  'You refuse to adjust pen stocking density or ventilation when our clinicians prove heat stress is killing your flock.',
  'You prefer administering unlabelled street-market concoctions rather than certified veterinary therapeutics and cold-chain vaccines.',
  'You want an investor business plan based on fictional 0% mortality figures rather than audited Nigerian commercial reality.',
];

const FAQ_DISPLAY = [
  {
    q: 'What specific areas do D-AminGrow poultry consultants cover?',
    a: 'Our consultancy spans 5 critical commercial domains: turnkey pen and housing engineering, urgent flock disease diagnosis and post-mortem triage, custom least-cost feed formulation, 10-point biosecurity audits, and bankable business plan / financial feasibility modeling.',
  },
  {
    q: 'Can you provide a bankable feasibility study and business plan for loans or investors?',
    a: 'Yes. We construct comprehensive, investor-grade financial models reflecting real-time Nigerian commodity costs (maize, soya, premix, DOC pricing), complete with cash flow forecasts, CAPEX/OPEX breakdowns, sensitivity analysis, and break-even timelines.',
  },
  {
    q: 'How quickly can a veterinary consultant visit my farm during a disease outbreak?',
    a: 'For critical disease escalations within Lagos, Ogun, Oyo, Osun, and Kwara states, an on-farm diagnostic clinician can be dispatched within 24–48 hours. Initial emergency triage and differential scoring are provided virtually via WhatsApp within 2 hours.',
  },
  {
    q: 'Do you offer remote advisory for diaspora investors based outside Nigeria?',
    a: 'Yes. Over 40% of our enterprise advisory clients reside in the UK, US, and Canada. We provide scheduled video consultations, architectural reviews, independent on-site contractor verification audits, and ongoing digital supervisory reports.',
  },
  {
    q: 'How does custom feed formulation consultation reduce my production costs?',
    a: 'Commercial feeds include significant marketing and branding markups. By balancing locally available grains (maize, wheat offal, soya, bone meal) with synthetic amino acids (methionine, lysine) and phytase enzymes, our custom formulas typically save ₦35 to ₦60 per kg of feed while improving FCR.',
  },
  {
    q: 'How do I book an initial consultation or on-farm inspection?',
    a: 'You can submit your farm parameters through our interactive clinical triage form on this page, or connect immediately to our senior consulting desk on WhatsApp (+234 806 870 0074).',
  },
];

export default function ConsultationPage() {
  return (
    <div className="font-body min-h-screen bg-slate-50/70">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* ====================================================================
          CINEMATIC HERO (2-COLUMN GRID: 7 COLS LEFT / 5 COLS RIGHT)
          ==================================================================== */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden print:hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <Link href="/services" className="hover:text-emerald-400 transition-colors">
              Services
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-emerald-400 font-semibold">Poultry Farm Consultation</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label-dark">
                <HeartHandshake className="h-3.5 w-3.5 text-emerald-400" />
                Senior Livestock Advisory
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-tight font-heading leading-tight">
                Poultry Farm Consultant in Nigeria:{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Strategic Business &amp; Veterinary Advisory
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Whether designing your first commercial pen, troubleshooting unexplained mortality, or planning a 50,000-bird expansion, D-AminGrow pairs senior VCN-certified veterinary expertise with battle-tested agribusiness leadership across Nigeria.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  VCN Certified Advisory
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
                  📐 Turnkey Housing Blueprints
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
                  📊 Bankable Feasibility &amp; ROI
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <a
                  href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%20Consulting%20Desk%2C%20I%20would%20like%20to%20book%20a%20poultry%20farm%20advisory%20session%20for%20my%20farm."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Book Veterinary Advisory on WhatsApp
                </a>
                <a
                  href="#clinical-triage"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
                >
                  <Stethoscope className="h-4 w-4 text-emerald-400" />
                  Start Emergency Triage Intake
                </a>
              </div>
            </div>

            {/* Right Column (5 Cols): Live Advisory Desk Status Card */}
            <div className="lg:col-span-5">
              <div className="card-dark rounded-3xl p-6 sm:p-8 space-y-6 border border-emerald-500/25 shadow-2xl relative overflow-hidden backdrop-blur-xl bg-slate-900/90">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                      <HeartHandshake className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                        Clinical Advisory Desk
                      </div>
                      <div className="text-sm font-bold text-white">Commercial Farm Consultation</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Clinician On-Call
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400">Total Farm Projects</div>
                    <div className="text-lg font-extrabold text-white font-heading mt-1">100+ Commercial</div>
                    <div className="text-[10px] text-emerald-400 font-medium">Startups &amp; Expansions</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400">Average FCR Delta</div>
                    <div className="text-lg font-extrabold text-cyan-400 font-heading mt-1">-0.35 FCR</div>
                    <div className="text-[10px] text-slate-400 font-medium">After Ration Balance</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400">Average Livability</div>
                    <div className="text-lg font-extrabold text-amber-400 font-heading mt-1">97.8%</div>
                    <div className="text-[10px] text-slate-400 font-medium">Across Client Flocks</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400">Triage SLA</div>
                    <div className="text-lg font-extrabold text-emerald-400 font-heading mt-1">&lt; 2 Hours</div>
                    <div className="text-[10px] text-emerald-400 font-medium">WhatsApp Triage Response</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 space-y-1">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-emerald-400" />
                    Serving Investors in All 36 States &amp; Diaspora
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Personalized engineering blueprints, on-site audits, and independent contractor verification for UK, US, and local investors.
                  </p>
                </div>

                <div className="pt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    VCN Veterinary Council Compliance
                  </span>
                  <span className="text-slate-500 font-mono">Tier-1 Consulting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          OPERATIONAL BENCHMARKS BAR
          ==================================================================== */}
      <section className="bg-slate-900 border-y border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {OPERATIONAL_BENCHMARKS.map((b, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Award className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                    {b.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-300">{b.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{b.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          CLINICAL DIAGNOSTIC TRIAGE INTAKE SECTION
          ==================================================================== */}
      <section
        id="clinical-triage"
        className="py-20 sm:py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Stethoscope className="h-3.5 w-3.5 text-emerald-600" />
              Emergency &amp; Diagnostic Intake
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Interactive Clinical Health Triage
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Enter your flock size, bird age, mortality symptoms, and medication history. Receive an instant urgency score and connect directly with a qualified avian specialist.
            </p>
          </div>

          <VeterinaryTriageForm />
        </div>
      </section>

      {/* ====================================================================
          5 EXPERT ADVISORY AREAS
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <ClipboardList className="h-3.5 w-3.5" />
              Consulting Domains
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              5 Core Strategic Advisory Pillars
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              From pen construction engineering to financial modelling — our advisory covers every phase of building a high-margin poultry enterprise.
            </p>
          </div>

          <div className="space-y-6">
            {CONSULTATION_AREAS.map((area, i) => {
              const Icon = area.icon;
              return (
                <div
                  key={i}
                  className="rounded-3xl bg-white border border-slate-200 p-7 sm:p-9 flex flex-col sm:flex-row gap-6 hover:shadow-xl hover:border-emerald-200 transition-all"
                >
                  <div
                    className={`h-14 w-14 rounded-2xl ${area.color} flex items-center justify-center shrink-0`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900 font-heading">
                        {area.title}
                      </h3>
                      {area.href && (
                        <Link
                          href={area.href}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl shadow-sm shrink-0 transition-colors w-fit"
                        >
                          <span>{area.ctaText}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{area.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.deliverables.map((d, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50/70 border border-emerald-200 px-3 py-1 rounded-full"
                        >
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          {d}
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
          PROBLEM / COST OF TRIAL-AND-ERROR FARMING
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              The Advisory Imperative
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The Catastrophic Cost of Trial-and-Error Farming
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Most poultry failures in Nigeria stem from rookie engineering mistakes, inappropriate antibiotic usage, and uncalibrated business assumptions before the first chick even arrives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROBLEM_POINTS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-slate-50 border border-slate-200 p-8 space-y-4 hover:shadow-lg transition-shadow relative overflow-hidden"
              >
                <div className="inline-block text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                  {item.impact}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          INFORMATION GAIN: FEASIBILITY & SENSITIVITY MODEL
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="section-label-dark mx-auto w-fit">
              <BarChart3 className="h-3.5 w-3.5 text-emerald-400" />
              Information Gain Matrix
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
              Commercial Poultry Farm Feasibility &amp; Sensitivity Model (Nigeria 2026)
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              How professional architectural engineering and nutritional calibration safeguard millions of Naira against typical tropical startup pitfalls.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/70 backdrop-blur-sm shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-800/80 text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-700">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Strategic Variable</th>
                  <th className="py-4 px-4 sm:px-6 text-rose-400">Uninformed Self-Setup</th>
                  <th className="py-4 px-4 sm:px-6 text-emerald-400">D-AminGrow Optimized Advisory</th>
                  <th className="py-4 px-4 sm:px-6 text-cyan-300">Net Operational Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {FEASIBILITY_MATRIX.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-white whitespace-nowrap">
                      {row.variable}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-rose-300 text-xs">
                      {row.uninformed}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-emerald-300 text-xs font-bold">
                      {row.damingrow}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-300 text-xs leading-relaxed">
                      {row.delta}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Schedule a 40-Minute Strategic Video or Phone Advisory
              </div>
              <p className="text-xs text-slate-400">
                Bring your pen dimensions, current feed formulation, or business plan for an intensive review.
              </p>
            </div>
            <a
              href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%20Consulting%20Desk%2C%20I%20would%20like%20to%20schedule%20a%20strategic%20advisory%20call%20for%20my%20farm."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shrink-0"
            >
              Book Advisory Call
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4-PILLAR CONSULTING FRAMEWORK
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              Advisory Protocol
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 4-Pillar Farm Advisory System
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              We anchor every advisory engagement in structural feasibility, clinical diagnostics, nutritional science, and strict operational biosecurity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className={`card-dark rounded-3xl p-7 space-y-5 border ${p.borderColor} hover:scale-[1.02] transition-transform`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-12 w-12 rounded-2xl ${p.bgColor} border ${p.borderColor} flex items-center justify-center`}
                    >
                      <Icon className={`h-6 w-6 ${p.color}`} />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-700 font-heading">
                      {p.num}
                    </span>
                  </div>
                  <h3 className={`text-base sm:text-lg font-bold font-heading ${p.color}`}>
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PROCESS STEPS (HOW A CONSULTATION WORKS)
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Star className="h-3.5 w-3.5" />
              Our Advisory Flow
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              How an Advisory Engagement Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="relative rounded-3xl bg-white border border-slate-200 p-8 space-y-4 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-4xl font-extrabold text-slate-200 font-heading">
                      {step.step}
                    </span>
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
          CLIENT TESTIMONIALS
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Users className="h-3.5 w-3.5 text-emerald-600" />
              Client Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Verified Feedback From Nigerian Farm Owners
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="rounded-3xl bg-slate-50 border border-slate-200 p-8 space-y-5 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                    <div className="text-xs text-emerald-600 font-medium">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
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
              Our Advisory Services May Not Be Right for You If...
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
                However, if you are committed to professional operational rigour, verifiable financial telemetry, and clinical biosecurity — our consultants will safeguard your farm capital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FAQ SECTION
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <BookOpen className="h-3.5 w-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Everything You Need to Know About Poultry Farm Advisory
            </h2>
          </div>

          <div className="space-y-5">
            {FAQ_DISPLAY.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 border border-slate-200 p-6">
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 mb-3">
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          FINAL CLOSING CTA BANNER
          ==================================================================== */}
      <section className="bg-emerald-950 py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
            <HeartHandshake className="h-3.5 w-3.5" />
            Senior Advisory Desk
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Protect Your Capital With{' '}
            <span className="text-gradient-green">Seasoned Veterinary &amp; Business Advisory</span>
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Do not gamble with millions in flock investments. Connect with D-AminGrow’s registered avian consultants to optimize your pen engineering, nutrition, and biosecurity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%20Consulting%20Desk%2C%20I%20would%20like%20to%20book%20a%20poultry%20farm%20advisory%20session%20for%20my%20farm."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              Book Advisory on WhatsApp
            </a>
            <Link
              href="/services"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
            >
              <Building2 className="h-4 w-4 text-emerald-400" />
              Explore All Management Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            VCN registered veterinarians · Nationwide on-site audits · Transparent diaspora reports
          </p>
        </div>
      </section>
    </div>
  );
}
