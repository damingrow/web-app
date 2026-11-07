'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { generateConsultationWhatsAppLink } from '@/lib/whatsapp';
import {
  Stethoscope,
  Building2,
  Syringe,
  Wheat,
  CheckCircle2,
  Send,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Clock,
  ChevronRight,
  Feather,
  Pill,
  Home,
  HeartHandshake,
  TrendingUp,
  BookOpen,
  Egg,
  AlertTriangle,
  XCircle,
  BarChart3,
  Award,
} from 'lucide-react';

const OPERATIONAL_BENCHMARKS = [
  {
    value: '185,000+',
    label: 'Birds Under Active Supervision',
    detail: 'Broiler and layer enterprise operations across Nigeria',
  },
  {
    value: '1.52',
    label: 'Average Supervised Broiler FCR',
    detail: 'Saving 250g–350g feed per kg live bird meat',
  },
  {
    value: '92.4%',
    label: 'Peak Commercial Layer Yield',
    detail: 'Maintained for over 18 consecutive production weeks',
  },
  {
    value: '< 2.8%',
    label: 'Average Cumulative Mortality',
    detail: 'Enforced through rigorous veterinary biosecurity barriers',
  },
];

const SERVICE_PAGES = [
  {
    id: 'chicks',
    title: 'Day-Old Chicks Sales & Distribution',
    href: '/services/chicks',
    icon: Feather,
    description:
      'Premium commercial broilers, Zartech pullets, turkeys, noilers and cockerels from certified breeding partners, dispatched nationwide every Monday and Thursday.',
    features: [
      "Pre-vaccinated against Marek's Disease at day 1",
      'Monday & Thursday nationwide dispatch',
      'Climate-monitored transport cartons',
      '50 chicks per carton standard guarantee',
      'Available: Broilers, Pullets, Turkeys, Noilers, Cockerels',
    ],
    badge: 'Mon & Thu Dispatch',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    gradient: 'from-amber-500/15 to-amber-600/5',
    borderColor: 'border-amber-200',
  },
  {
    id: 'vaccines',
    title: 'Livestock Vaccine Sales & Distribution',
    href: '/services/vaccines',
    icon: Syringe,
    description:
      'Live freeze-dried viral and bacterial vaccines shipped under verified 2°C–8°C cold-chain with certified ice gel packs.',
    features: [
      'Continuous 2°C–8°C cold-chain guarantee',
      'Newcastle Disease (LaSota) vaccine',
      'Gumboro (IBD) Intermediate Plus vaccine',
      "Marek's Disease (HVT) vaccine",
      'Fowl Pox & other viral vaccines available',
    ],
    badge: '2°C–8°C Cold-Chain',
    badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-200',
    gradient: 'from-cyan-500/15 to-cyan-600/5',
    borderColor: 'border-cyan-200',
  },
  {
    id: 'drugs',
    title: 'Antibiotics, Probiotics & Supplements',
    href: '/services/drugs',
    icon: Pill,
    description:
      'NAFDAC-registered broad-spectrum therapeutics, targeted anticoccidials, gut health probiotics, and anti-stress vitamin premixes.',
    features: [
      'NAFDAC-registered batch numbers on all products',
      'Oxytetracycline, Ciprofloxacin, Norfloxacin',
      'Cocci-Ton anticoccidial treatment',
      'Vitamin C anti-stress water-soluble powder',
      'DL-Methionine feed amino acid supplement',
    ],
    badge: 'NAFDAC Registered',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    gradient: 'from-emerald-500/15 to-emerald-600/5',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'accessories',
    title: 'Housing & Rearing Equipment',
    href: '/accessories',
    icon: Home,
    description:
      'Heavy-duty commercial poultry equipment: gas brooders, battery cages, nipple drinkers, feeders, and defeathering machines.',
    features: [
      'Infrared radiant gas brooder heaters (LPG)',
      'Automated galvanized A-frame battery cages',
      '360° stainless steel nipple drinkers',
      'Commercial defeathering plucker machines',
      'Poultry transport crates & egg holding trays',
    ],
    badge: 'Heavy-Duty Commercial',
    badgeColor: 'text-slate-700 bg-slate-50 border-slate-200',
    gradient: 'from-slate-500/15 to-slate-600/5',
    borderColor: 'border-slate-200',
  },
  {
    id: 'point-of-lay',
    title: 'Sales & Distribution of Point-of-Lay Birds',
    href: '/services/point-of-lay',
    icon: Egg,
    description:
      'Fully grown 17–20 week brown and white layer pullets with 100% completed vaccination timetables, ready to start laying eggs immediately.',
    features: [
      '17–20 weeks of age (point-of-lay ready)',
      '100% completed vaccination timetable',
      'Brown & White egg-laying genetics',
      'Begin daily egg income within 7–14 days',
      'Specialized crate dispatch across Nigeria',
    ],
    badge: 'Production-Ready',
    badgeColor: 'text-teal-700 bg-teal-50 border-teal-200',
    gradient: 'from-teal-500/15 to-teal-600/5',
    borderColor: 'border-teal-200',
  },
  {
    id: 'technical',
    title: 'Livestock Technical Services',
    href: '/services/technical',
    icon: ShieldCheck,
    description:
      'On-farm clinical vaccination, biosecurity setup, post-mortem disease diagnostics, and automated equipment installation.',
    features: [
      'On-farm vaccination administration',
      'Nipple drinking line pressure calibration',
      'Gas brooder temperature regulation',
      'Flock health screening & post-mortem',
      'Biosecurity barrier design & sanitization',
    ],
    badge: 'Certified Technicians',
    badgeColor: 'text-violet-700 bg-violet-50 border-violet-200',
    gradient: 'from-violet-500/15 to-violet-600/5',
    borderColor: 'border-violet-200',
  },
];

const CONSULTATION_SERVICES = [
  {
    icon: Building2,
    title: 'Poultry Housing & Pen Construction',
    description:
      'Turnkey engineering advisory for open-sided tropical pens, closed-ventilation broiler sheds, and multi-tier layer battery cage infrastructure.',
    deliverables: ['Pen layout blueprint', 'Material cost estimation', 'Ventilation design', 'Equipment specification'],
  },
  {
    icon: Syringe,
    title: 'Flock Vaccination & Biosecurity Programs',
    description:
      "Site-specific immunization programs aligned with endemic viral challenges in your agricultural zone (Newcastle, Gumboro, Marek's, Fowl Pox).",
    deliverables: ['Custom vaccination timetable', 'Disease risk assessment', 'Biosecurity protocols', 'Record-keeping templates'],
  },
  {
    icon: Stethoscope,
    title: 'Flock Health Diagnostics & Advisory',
    description:
      'Field diagnostics, post-mortem lesion evaluation, and targeted clinical therapy to halt unexplained flock mortality and production drops.',
    deliverables: ['On-site field visit', 'Disease diagnosis report', 'Treatment protocol', 'Prevention strategy'],
  },
  {
    icon: Wheat,
    title: 'Feed Formulation & Nutrition Balancing',
    description:
      'Nutritional ration balancing using local Nigerian grains, soybean meal, methionine, lysine, and enzymes for minimum cost per kg weight gain.',
    deliverables: ['Custom feed formula', 'Ingredient sourcing guide', 'FCR optimization plan', 'Seasonal adjustments'],
  },
];

const PROBLEM_POINTS = [
  {
    title: 'Remote Mismanagement & Feed Pilferage',
    desc: 'Absentee and diaspora investors frequently lose 15% to 30% of total feed purchases due to employee diversion, uncalibrated scoop feeders, and inaccurate stock registers.',
    impact: 'Loss of ₦800,000+ per 1,000 birds',
  },
  {
    title: 'Blind Antibiotic Blunder & Drug Resistance',
    desc: 'Unsupervised farm hands routinely drench birds with inappropriate antibiotics for viral infections like Gumboro or Newcastle, wrecking gut villi and bankrupting the farm with zero therapeutic recovery.',
    impact: 'Up to 60% preventable flock mortality',
  },
  {
    title: 'Suboptimal Feed Conversion Ratio (FCR > 1.90)',
    desc: 'Without daily body weight sampling and feeder height adjustments, broilers consume 4.5kg+ feed to reach a modest 2.2kg harvest weight, completely eliminating profit margins in current high-feed price climates.',
    impact: 'Negative operating cash flow',
  },
];

const BENCHMARK_COMPARISON = [
  {
    metric: 'Broiler 6-Week FCR',
    unmanaged: '1.85 – 2.10',
    damingrow: '1.48 – 1.55',
    impact: 'Saves ₦650 – ₦900 feed cost per finished bird',
  },
  {
    metric: 'Flock Cumulative Mortality',
    unmanaged: '7% – 15%+',
    damingrow: '< 2.8%',
    impact: 'Protects 100+ harvestable birds per 1,000 batch',
  },
  {
    metric: 'Commercial Layer Peak Lay',
    unmanaged: '76% – 82%',
    damingrow: '90% – 94%',
    impact: 'Yields +120 additional crates per 1,000 layers monthly',
  },
  {
    metric: 'High-Yield Persistence (>80%)',
    unmanaged: '12 – 16 Weeks',
    damingrow: '28 – 34 Weeks',
    impact: 'Extends peak cash flow window by over 3 months',
  },
  {
    metric: 'Vaccine Cold-Chain Verification',
    unmanaged: 'Unknown / Melting Ice',
    damingrow: '2°C–8°C Calibrated EPS',
    impact: 'Eliminates catastrophic vaccine breakthrough outbreaks',
  },
  {
    metric: 'Investor Telemetry & Financial Audit',
    unmanaged: 'Manual paper notes / Verbal',
    damingrow: 'Weekly digital KPIs & video',
    impact: 'Complete financial transparency for diaspora owners',
  },
];

const PILLARS = [
  {
    num: '01',
    title: 'Turnkey Biosecurity & Pen Engineering',
    desc: 'Proper shed orientation against solar azimuth and prevailing winds, high-roof ridge ventilation, and double-gate footbath sanitation to prevent infectious incursions.',
    icon: Building2,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
  },
  {
    num: '02',
    title: 'Clinical Veterinary Supervision',
    desc: 'VCN-registered veterinarians overseeing daily flock health, conducting rapid post-mortems within 2 hours of mortality, and enforcing cold-chain vaccination.',
    icon: Stethoscope,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
  },
  {
    num: '03',
    title: 'Least-Cost Nutritional Precision',
    desc: 'Formulating customized rations that utilize local grains, synthetic amino acids, and phytase enzymes to depress feed cost per kilogram while maintaining peak FCR.',
    icon: Wheat,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
  },
  {
    num: '04',
    title: 'Digital Flock Telemetry & Audits',
    desc: 'Transparent digital record-keeping tracking daily feed intake, water-to-feed ratios, egg collection curves, and automated inventory reconciliation for owners.',
    icon: BarChart3,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10',
  },
];

const HONESTY_FILTERS = [
  'You are seeking a magical guarantee of profit without being willing to invest in clean water filtration and quality baseline feed ingredients.',
  'You refuse to follow strict biosecurity boundaries, footbath sanitation, and visitor lockdown protocols on your farm.',
  'You prefer buying cheap expired or unverified market vaccines over certified cold-chain biologicals.',
  'You want completely remote management without providing on-site workers with minimum welfare and reliable weighing scales.',
];

const FAQ_DISPLAY = [
  {
    q: 'What is included in D-AminGrow’s poultry farm management services?',
    a: 'Our comprehensive management encompasses turnkey farm engineering layout, daily flock health oversight, biosecurity barrier enforcement, least-cost feed formulation, cold-chain vaccine administration, farm staff training, and rigorous digital yield auditing for broilers and commercial layers.',
  },
  {
    q: 'Can D-AminGrow manage my poultry farm if I live in the diaspora (UK, US, Canada)?',
    a: 'Yes. Over 40% of our enterprise clients are diaspora-based Nigerian investors. We provide transparent weekly flock telemetry reports, video site audits, biometric feed consumption reconciliation, and direct bank disbursement tracking to eliminate remote mismanagement.',
  },
  {
    q: 'How do you control mortality and disease outbreaks on client farms?',
    a: 'We implement the 4-Pillar Biosecurity Standard: physical entry barriers with footbaths, water pipeline acidification and halogen disinfection, 100% cold-chain biological administration, and immediate post-mortem differential triage within 2 hours of any abnormal flock mortality.',
  },
  {
    q: 'What is the typical return on investment (ROI) for commercial broiler or layer farms under professional supervision?',
    a: 'By depressing broiler FCR below 1.55 (saving 300g feed per kg live weight) and maintaining layer peak production above 90% with flock mortality kept strictly under 3%, our client farms typically realize 25% to 38% higher net margins compared to unmanaged facilities.',
  },
  {
    q: 'Do you supply the day-old chicks, feed ingredients, and vaccines for managed farms?',
    a: 'Yes. As an integrated agro-allied distributor, D-AminGrow supplies certified day-old chicks (Zartech, Amo, Sayed), NAFDAC-registered veterinary pharmaceuticals, cold-chain vaccines from NVRI Vom, and high-protein feed supplements directly at wholesale institutional rates.',
  },
  {
    q: 'How do we get started with an initial farm audit or management contract?',
    a: 'You can request an on-site feasibility evaluation or operational diagnostic through our online booking desk or via direct WhatsApp connection. Our lead veterinary consultant will review your flock capacity, location, and operational goals within 2 hours.',
  },
];

export default function ServicesClient() {
  const [selectedService, setSelectedService] = useState(CONSULTATION_SERVICES[0]?.title ?? '');
  const [farmerName, setFarmerName] = useState('');
  const [phone, setPhone] = useState('');
  const [stateName, setStateName] = useState('');
  const [flockSize, setFlockSize] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !phone.trim() || !stateName.trim()) {
      setFormError('Please fill in your Name, Phone number, and Farm State.');
      return;
    }
    setFormError(null);
    setIsSubmitting(true);

    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: farmerName,
          phone,
          state: stateName,
          enquiryType: 'veterinary_consultation',
          notes: `Service: ${selectedService}. Flock Size: ${flockSize}. Notes: ${notes}`,
          consentMarketing: true,
        }),
      });
    } catch {
      // Non-blocking fallback
    }

    setIsSubmitting(false);
    setSubmitted(true);

    const waUrl = generateConsultationWhatsAppLink(
      selectedService,
      farmerName.trim(),
      flockSize.trim() || undefined
    );
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleHeroWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello D-AminGrow Enterprise Desk,\n\nI am inquiring about commercial poultry farm management, technical supervision, and input procurement for my farm.`
    );
    window.open(`https://wa.me/2348068700074?text=${msg}`, '_blank');
  };

  return (
    <div className="font-body min-h-screen bg-slate-50/70">
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
            <span className="text-emerald-400 font-semibold">Services</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label-dark">
                <Stethoscope className="h-3.5 w-3.5 text-emerald-400" />
                Commercial Agro-Allied Operations
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-tight font-heading leading-tight">
                Commercial Poultry Farm Management &amp;{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Technical Agro-Allied Services
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Turnkey farm engineering, clinical veterinary supervision, least-cost feed formulation, and institutional input procurement. Designed for investors, commercial producers, and diaspora farm owners across Nigeria.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Turnkey Farm Supervision
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
                  🔬 VCN Certified Clinicians
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
                  <BarChart3 className="h-3.5 w-3.5" />
                  Diaspora Remote Transparency
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  type="button"
                  onClick={handleHeroWhatsApp}
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Schedule Farm Audit on WhatsApp
                </button>
                <a
                  href="#consultation-desk"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
                >
                  <HeartHandshake className="h-4 w-4 text-emerald-400" />
                  Request Technical Consultation
                </a>
              </div>
            </div>

            {/* Right Column (5 Cols): Live Operations Hub Card */}
            <div className="lg:col-span-5">
              <div className="card-dark rounded-3xl p-6 sm:p-8 space-y-6 border border-emerald-500/25 shadow-2xl relative overflow-hidden backdrop-blur-xl bg-slate-900/90">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                        Enterprise Operations Hub
                      </div>
                      <div className="text-sm font-bold text-white">Commercial Farm Management</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active Supervision
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400">Total Supervised Birds</div>
                    <div className="text-lg font-extrabold text-white font-heading mt-1">185,000+</div>
                    <div className="text-[10px] text-emerald-400 font-medium">Broilers &amp; Layers</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400">Average Broiler FCR</div>
                    <div className="text-lg font-extrabold text-cyan-400 font-heading mt-1">1.52</div>
                    <div className="text-[10px] text-slate-400 font-medium">vs 1.85+ NG Avg</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400">Peak Layer Yield</div>
                    <div className="text-lg font-extrabold text-amber-400 font-heading mt-1">92.4%</div>
                    <div className="text-[10px] text-slate-400 font-medium">28+ Wks Persistence</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-xs text-slate-400">Client Mortality Target</div>
                    <div className="text-lg font-extrabold text-emerald-400 font-heading mt-1">&lt; 2.8%</div>
                    <div className="text-[10px] text-emerald-400 font-medium">Biosecure Defense</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 space-y-1">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-emerald-400" />
                    Transparent Remote Investor Reporting
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Weekly telemetry dashboards, feed inventory weigh-in logs, and video audits delivered directly to overseas and executive farm owners.
                  </p>
                </div>

                <div className="pt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    VCN Veterinary Compliance
                  </span>
                  <span className="text-slate-500 font-mono">36 States</span>
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
          PRODUCT SERVICES — 6 Cards
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <TrendingUp className="h-3.5 w-3.5" />
              Integrated Input Supply
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Certified Inputs &amp; Wholesale Distribution
            </h2>
            <p className="text-base text-slate-600">
              Direct institutional access to genetics, biologicals, pharmaceuticals, and automated equipment across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_PAGES.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  href={service.href}
                  className={`group relative rounded-3xl overflow-hidden border ${service.borderColor} bg-gradient-to-br ${service.gradient} p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`h-14 w-14 rounded-2xl bg-white border ${service.borderColor} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-7 w-7 text-slate-700" />
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border ${service.badgeColor}`}
                      >
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-heading text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 group-hover:gap-3 transition-all pt-4 border-t border-slate-200/60">
                    View Products &amp; Inquire Rates
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PROBLEM / THE COST OF UNSUPERVISED FARMING
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              The Commercial Dilemma
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why 70% of Unsupervised Poultry Farms Fail in Nigeria
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Without professional veterinary supervision and daily feed telemetry, commercial farms bleed capital through poor feed conversion, preventable mortality, and remote operational leakage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROBLEM_POINTS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-slate-200 p-8 space-y-4 hover:shadow-lg transition-shadow relative overflow-hidden"
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
          INFORMATION GAIN: OPERATIONAL AUDIT & BENCHMARK MATRIX
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
              Commercial Farm Operational Audit &amp; Yield Benchmark Matrix
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Quantifiable performance comparison between unmanaged average Nigerian operations and farms supervised under D-AminGrow agro-allied technical standards.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/70 backdrop-blur-sm shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-800/80 text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-700">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Operational Parameter</th>
                  <th className="py-4 px-4 sm:px-6 text-rose-400">Unmanaged Nigerian Average</th>
                  <th className="py-4 px-4 sm:px-6 text-emerald-400">D-AminGrow Managed Benchmark</th>
                  <th className="py-4 px-4 sm:px-6 text-cyan-300">Net Commercial Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {BENCHMARK_COMPARISON.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-white whitespace-nowrap">
                      {row.metric}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-mono text-rose-300 text-xs">
                      {row.unmanaged}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-mono text-emerald-300 text-xs font-bold">
                      {row.damingrow}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-300 text-xs leading-relaxed">
                      {row.impact}
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
                Book an On-Site Farm Feasibility or Clinical Audit
              </div>
              <p className="text-xs text-slate-400">
                Operating a flock of 1,000+ birds? Have a registered veterinarian inspect your pens, water lines, and feed silos.
              </p>
            </div>
            <Link
              href="/services/consultation"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shrink-0"
            >
              Request Strategic Advisory
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          TECHNICAL & CONSULTATION SERVICES (INTERACTIVE FORM)
          ==================================================================== */}
      <section id="consultation-desk" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <HeartHandshake className="h-3.5 w-3.5" />
              Expert Advisory Desk
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Book a Technical &amp; Farm Advisory Session
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Evidence-based veterinary consultations, custom farm housing design, and least-cost feed formulation led by registered avian professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {CONSULTATION_SERVICES.map((srv, idx) => {
              const Icon = srv.icon;
              const isSelected = selectedService === srv.title;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedService(srv.title)}
                  className={`cursor-pointer rounded-3xl border p-7 transition-all duration-200 ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-50/20 shadow-lg ring-2 ring-emerald-200'
                      : 'border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`rounded-2xl p-3.5 shrink-0 transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-slate-900 font-heading">
                          {srv.title}
                        </h3>
                        {isSelected && (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            ✓ Selected
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{srv.description}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {srv.deliverables.map((d, i) => (
                          <span
                            key={i}
                            className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Consultation Form */}
          <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200 bg-slate-50/50 shadow-xl p-8 sm:p-12">
            <div className="border-b border-slate-200/80 pb-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                  <HeartHandshake className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-heading">
                    Request an Advisory Consultation
                  </h2>
                  <p className="text-xs text-slate-500">
                    Free technical triage · Dedicated response within 2 hours
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Submit your inquiry below or connect directly to our enterprise desk at{' '}
                <a
                  href="https://wa.me/2348068700074"
                  className="font-bold text-emerald-700 hover:text-emerald-800"
                >
                  +234 806 870 0074
                </a>
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Consultation Request Sent!
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your ticket has been logged with our technical supervisory desk. Our consultant is ready to review your parameters on WhatsApp.
                </p>
                <div className="pt-2">
                  <a
                    href={generateConsultationWhatsAppLink(selectedService, farmerName, flockSize)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm shadow-md"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Continue on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {formError && (
                  <div className="p-4 text-sm bg-red-50 border border-red-200 text-red-700 rounded-xl">
                    {formError}
                  </div>
                )}

                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-1">
                    Selected Service:
                  </div>
                  <div className="text-sm font-semibold text-emerald-900">{selectedService}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Farmer / Enterprise Name *"
                    required
                    placeholder="e.g. Babatunde Adeyemi Farms"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                  />
                  <Input
                    label="WhatsApp Phone Number *"
                    required
                    placeholder="e.g. 0802 345 6789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Farm Location (State / LGA) *"
                    required
                    placeholder="e.g. Ogun State (Sagamu)"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                  />
                  <Input
                    label="Current Flock / Herd Size"
                    placeholder="e.g. 3,500 Broilers"
                    value={flockSize}
                    onChange={(e) => setFlockSize(e.target.value)}
                  />
                </div>

                <Input
                  label="Challenge or Service Details"
                  placeholder="e.g. Broiler FCR running above 1.85, need least-cost feed formulation and pen audit"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="h-4 w-4" />
                    Direct Line: <strong className="text-slate-800">+234 806 870 0074</strong>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] disabled:opacity-60 text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm shadow-md"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? 'Submitting...' : 'Connect to Technical Desk'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4-PILLAR MANAGEMENT PROTOCOL
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              Supervisory Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 4-Pillar Commercial Management System
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Sustainable poultry profitability relies on structural engineering, clinical pathology, nutritional chemistry, and uncompromising inventory accounting.
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
              Our Management Services May Not Be Right for You If...
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
                However, if you are committed to professional operational rigour, verifiable financial telemetry, and clinical biosecurity — our technical agro-allied team will transform your margins.
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
              Everything You Need to Know About Poultry Farm Management
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
            <Building2 className="h-3.5 w-3.5" />
            Turnkey Agricultural Operations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Protect Your Livestock Investment With{' '}
            <span className="text-gradient-green">Professional Farm Management</span>
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Eliminate remote mismanagement and excessive feed loss. Partner with D-AminGrow’s registered veterinarians and livestock engineers to maximize your commercial yield.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={handleHeroWhatsApp}
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              Schedule Farm Consultation on WhatsApp
            </button>
            <Link
              href="/knowledge"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
            >
              <BookOpen className="h-4 w-4 text-emerald-400" />
              Explore Clinical Guides
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            Certified VCN veterinary advisory · 185,000+ birds supervised · Transparent diaspora reporting
          </p>
        </div>
      </section>
    </div>
  );
}
