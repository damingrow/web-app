import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';
import { PolBookingForm } from '@/components/forms/pol-booking-form';
import {
  Egg,
  ShieldCheck,
  BarChart3,
  MessageCircle,
  Clock,
  Feather,
  Sparkles,
  AlertTriangle,
  XCircle,
  HelpCircle,
  PhoneCall,
  Layers,
  CheckCircle2,
  Truck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Point-of-Lay Rearing Service Nigeria | Contract Commercial Pullets | D-AminGrow',
  description:
    'Commercial Point-of-Lay (POL) pullet rearing contracts and bulk procurement in Nigeria. Production-ready 17–20 week brown and white layer pullets with 100% certified vaccination records.',
  keywords: [
    'commercial point of lay bird rearing service',
    'custom pullet brooding on contract',
    '16 weeks layer supply agreement',
    'audited vaccination records',
    'farm gate delivery cages',
    'contract pullet rearing service in nigeria',
    'commercial point of lay flock procurement',
    'buy raised pullets direct from rearing farm',
    'point of lay sourcing and delivery management',
  ],
  alternates: {
    canonical: 'https://damingrow.com/services/point-of-lay',
  },
  openGraph: {
    title: 'Point-of-Lay Rearing Service Nigeria | Contract Commercial Pullets | D-AminGrow',
    description:
      'Eliminate 17 weeks of brooding mortality. Buy fully grown, production-ready Point-of-Lay pullets with audited vaccination histories delivered across Nigeria.',
    url: 'https://damingrow.com/services/point-of-lay',
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
      name: 'What age are Point-of-Lay (POL) pullets delivered to my farm?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our Point-of-Lay pullets are supplied strictly between 17 and 20 weeks of age. At this physiological developmental stage, birds have completed skeletal frame formation, reached a uniform target body weight of 1.60kg to 1.85kg (for brown layers), and are ready to commence egg laying within 7 to 21 days after arrival.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is buying Point-of-Lay pullets less risky than brooding day-old chicks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rearing pullets from day-old requires 17 weeks of intensive brooding capital, heating electricity, high mortality risks (Gumboro, Newcastle, Coccidiosis), and continuous feed expenditure with zero egg revenue. Buying POL pullets transfers all brooding risks and operational labor to our professional rearing facilities, giving you immediate cash flow within weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What vaccinations have D-AminGrow POL birds received prior to delivery?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every POL pullet receives a complete 11-point vaccination schedule: Day-1 Marek’s (HVT), Newcastle B1 and LaSota boosters, Gumboro Intermediate Plus boosters, Fowl Pox wing-web stab, ND+IB H120 live, Mycoplasma killed bacterin, Infectious Coryza killed bivalent, and pre-lay ND+IB+EDS triple killed oil-emulsion injectables. Official signed vaccination logs accompany every batch.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are the birds transported to avoid stress and broken bones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We transport pullets inside rigid, sanitized heavy-duty plastic poultry delivery crates holding a maximum of 10 to 12 birds per crate. Deliveries are scheduled during cool night or early morning hours using specialized cross-ventilated vehicles to prevent heat exhaustion, suffocation, and broken wings.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum order quantity for Point-of-Lay pullets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The minimum order quantity for commercial farm delivery is 50 birds. For enterprise orders of 500, 1,000, to 10,000+ birds, we enter into forward contract pullet rearing agreements with locked production schedules and staged batch deliveries.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I prepare my pens before receiving Point-of-Lay birds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pens and battery cages must be thoroughly power-washed, chemically disinfected, and rested for at least 10 days. Ensure drinking waterlines are flushed, nipple drinker lines are operational, and fill feed troughs with high-quality Layer Developer or Pre-Lay Mash containing anti-stress electrolytes and Vitamin C.',
      },
    },
  ],
};

const OPERATIONAL_BENCHMARKS = [
  {
    value: '17–20 Weeks',
    label: 'Production-Ready Age',
    detail: 'Frame-developed pullets ready to commence lay in 1–3 weeks',
  },
  {
    value: '315–330 Eggs',
    label: 'Annual Hen Production',
    detail: 'ISA Brown peak persistence above 92% for 40+ weeks',
  },
  {
    value: '100% Audited',
    label: 'Vaccine Compliance',
    detail: 'Full live and killed triple oil-emulsion documentation included',
  },
  {
    value: '7–14 Days',
    label: 'First Egg Post-Arrival',
    detail: 'Rapid farm cash flow without 4 months of rearing starvation',
  },
];

const PROBLEM_POINTS = [
  {
    title: '17 Weeks of Brooding Mortality & Disease Exposure',
    desc: 'Brooding day-old chicks through to 17 weeks carries severe financial vulnerability. A single breach of Gumboro (IBD), Newcastle disease, or acute Coccidiosis during the grower phase can wipe out 25% of your flock, destroying your entire investment before a single egg is laid.',
    impact: 'Up to 25% cumulative pullet rearing mortality',
  },
  {
    title: 'Cash Flow Starvation & Working Capital Burn',
    desc: 'Rearing your own pullets requires purchasing approximately 8.5 to 9.5 kilograms of expensive chick starter and grower mash per bird over 17 weeks without generating a single naira of revenue. Many farmers exhaust their working capital by week 12 and are forced to underfeed growing birds.',
    impact: 'Premature flock stunting & delayed lay onset',
  },
  {
    title: 'Skipping Expensive Pre-Lay Killed Injectable Vaccines',
    desc: 'Smallholder brooding operations frequently fail to administer critical oil-emulsion killed injectables (such as ND + IB + EDS triple killed and Infectious Coryza bacterins at 16 weeks) due to high vial costs and lack of skilled injection labor. When birds enter lay, Egg Drop Syndrome or Coryza crashes lay from 90% down to 35%.',
    impact: 'Permanent 50%+ reduction in lifetime egg yield',
  },
];

const PROCUREMENT_VS_DIY_MATRIX = [
  {
    parameter: 'Mortality & Clinical Risk',
    diyRearing: 'High (8%–20% mortality from Day 1 to 17 Weeks)',
    damingrowPOL: 'Zero (Birds arrive fully grown & healthy at 17–20wks)',
    advantage: '100% of purchased birds enter immediate egg production',
  },
  {
    parameter: 'Capital Locked Before Revenue',
    diyRearing: '4.5 Months of feed, heating, and labor cash burn',
    damingrowPOL: '7 to 21 Days to first commercial egg sale',
    advantage: 'Immediate cash flow turns working capital into revenue',
  },
  {
    parameter: 'Vaccine Schedule Compliance',
    diyRearing: 'Frequent gaps; killed pre-lay injectables often skipped',
    damingrowPOL: '100% audited 11-point vaccination dossier signed by VCN vet',
    advantage: 'Protected against Egg Drop Syndrome (EDS-76) and Coryza',
  },
  {
    parameter: 'Body Weight & Frame Uniformity',
    diyRearing: 'Variable (uneven feeder space causes 25% stunted runts)',
    damingrowPOL: 'High uniformity (>85% within ±10% target 1.7kg weight)',
    advantage: 'Synchronized flock peak lay exceeding 92% across all cages',
  },
];

const BREED_COMPARISON = [
  { feature: 'Egg Shell Colour', brown: 'Rich Dark Brown', white: 'White / Off-White' },
  { feature: 'Egg Production (Cycle)', brown: '310–330 eggs/bird', white: '300–320 eggs/bird' },
  { feature: 'Peak Lay Rate', brown: '93%–96%', white: '91%–94%' },
  { feature: 'Feed Intake (Peak)', brown: '115–125g/bird/day', white: '95–110g/bird/day' },
  { feature: 'Body Weight at POL', brown: '1.65–1.85kg', white: '1.35–1.55kg' },
  { feature: 'Market Preference (Nigeria)', brown: 'Very High (Brown egg retail premium)', white: 'Moderate (Industrial baking/confectionery)' },
  { feature: 'Best Housing Fit', brown: 'Deep litter & battery cage', white: 'Battery cage only' },
];

const VACCINATION_SCHEDULE = [
  { age: 'Day 1', vaccine: 'Marek\'s Disease (HVT strain)', route: 'Subcutaneous injection at hatchery' },
  { age: 'Day 5–7', vaccine: 'Newcastle B1 Live (Prime)', route: 'Eye-drop or drinking water' },
  { age: 'Day 10–14', vaccine: 'Gumboro IBD Intermediate Plus (1st dose)', route: 'Drinking water with skimmed milk' },
  { age: 'Day 18–21', vaccine: 'Gumboro IBD Intermediate Plus (Booster)', route: 'Drinking water with skimmed milk' },
  { age: 'Day 21–28', vaccine: 'Newcastle LaSota Live (Booster)', route: 'Drinking water or coarse spray' },
  { age: 'Week 6', vaccine: 'Fowl Pox (Wing-web stab)', route: 'Wing-web stab method' },
  { age: 'Week 8', vaccine: 'ND + IB H120 Bivalent Live', route: 'Eye-drop or coarse spray' },
  { age: 'Week 10–12', vaccine: 'Infectious Coryza Killed (1st dose)', route: 'Intramuscular injection' },
  { age: 'Week 12–14', vaccine: 'Mycoplasma (MG) Killed', route: 'Subcutaneous at lower neck' },
  { age: 'Week 16–18', vaccine: 'ND + IB + EDS Triple Killed', route: 'Intramuscular (breast muscle)' },
  { age: 'Week 16–18', vaccine: 'Infectious Coryza Killed (Booster)', route: 'Intramuscular injection' },
];

const PILLARS = [
  {
    num: '01',
    title: 'Primary Genetic Parent Stock Allocation',
    desc: 'Sourcing 100% certified ISA Brown and Shaver parent stock from accredited primary hatcheries, guaranteeing high lay persistency.',
    icon: Feather,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
  },
  {
    num: '02',
    title: 'Controlled 17-Week Weight & Frame Uniformity',
    desc: 'Restricted feeding protocols calibrated to develop optimal pelvic skeletal frame width without premature fat pad accumulation.',
    icon: BarChart3,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
  },
  {
    num: '03',
    title: 'Complete 11-Stage Immunization Compliance',
    desc: 'Administering all mandatory live viral primes and pre-lay oil-emulsion killed injectables (EDS-76, ND, Coryza) before delivery.',
    icon: ShieldCheck,
    color: 'text-teal-400',
    borderColor: 'border-teal-500/30',
    bgColor: 'bg-teal-500/10',
  },
  {
    num: '04',
    title: 'Stress-Mitigated Farm Gate Crate Logistics',
    desc: 'Transporting birds in heavy-duty sanitized crates during cool nocturnal hours with pre-dispatch electrolyte conditioning.',
    icon: Truck,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
  },
];

const FAQS = [
  {
    q: 'What age are Point-of-Lay (POL) pullets delivered to my farm?',
    a: 'Our Point-of-Lay pullets are supplied strictly between 17 and 20 weeks of age. At this physiological developmental stage, birds have completed skeletal frame formation, reached a uniform target body weight of 1.60kg to 1.85kg (for brown layers), and are ready to commence egg laying within 7 to 21 days after arrival.',
  },
  {
    q: 'Why is buying Point-of-Lay pullets less risky than brooding day-old chicks?',
    a: 'Rearing pullets from day-old requires 17 weeks of intensive brooding capital, heating electricity, high mortality risks (Gumboro, Newcastle, Coccidiosis), and continuous feed expenditure with zero egg revenue. Buying POL pullets transfers all brooding risks and operational labor to our professional rearing facilities, giving you immediate cash flow within weeks.',
  },
  {
    q: 'What vaccinations have D-AminGrow POL birds received prior to delivery?',
    a: 'Every POL pullet receives a complete 11-point vaccination schedule: Day-1 Marek’s (HVT), Newcastle B1 and LaSota boosters, Gumboro Intermediate Plus boosters, Fowl Pox wing-web stab, ND+IB H120 live, Mycoplasma killed bacterin, Infectious Coryza killed bivalent, and pre-lay ND+IB+EDS triple killed oil-emulsion injectables. Official signed vaccination logs accompany every batch.',
  },
  {
    q: 'How are the birds transported to avoid stress and broken bones?',
    a: 'We transport pullets inside rigid, sanitized heavy-duty plastic poultry delivery crates holding a maximum of 10 to 12 birds per crate. Deliveries are scheduled during cool night or early morning hours using specialized cross-ventilated vehicles to prevent heat exhaustion, suffocation, and broken wings.',
  },
  {
    q: 'What is the minimum order quantity for Point-of-Lay pullets?',
    a: 'The minimum order quantity for commercial farm delivery is 50 birds. For enterprise orders of 500, 1,000, to 10,000+ birds, we enter into forward contract pullet rearing agreements with locked production schedules and staged batch deliveries.',
  },
  {
    q: 'How do I prepare my pens before receiving Point-of-Lay birds?',
    a: 'Pens and battery cages must be thoroughly power-washed, chemically disinfected, and rested for at least 10 days. Ensure drinking waterlines are flushed, nipple drinker lines are operational, and fill feed troughs with high-quality Layer Developer or Pre-Lay Mash containing anti-stress electrolytes and Vitamin C.',
  },
];

export default function ServicePointOfLayPage() {
  const polProducts = getProductsByCategory('point-of-lay');

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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-emerald-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-teal-400 font-semibold">Point-of-Lay Birds</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label-dark">
                <Egg className="h-3.5 w-3.5 text-teal-400" />
                Production-Ready Layers — Skip 17 Weeks of Rearing
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading tracking-tight leading-tight">
                Commercial Point-of-Lay Rearing Contracts &amp; <br />
                <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
                  Bulk Pullet Procurement
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Eliminate 17 weeks of brooding mortality, heating expenses, and cash-flow starvation. D-AminGrow supplies fully grown, vaccinated 17–20 week ISA Brown and Shaver pullets ready to begin commercial egg production within 7 to 21 days of arrival.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#order-form"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg inline-flex items-center gap-2"
                >
                  <Egg className="h-5 w-5" />
                  <span>Reserve POL Pullets Online</span>
                </a>
                <a
                  href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20Point-of-Lay%20pullets.%20Please%20send%20current%20batch%20availability%20and%20pricing."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-4 rounded-xl transition-all text-sm"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>Chat with POL Coordinator</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>100% Audited Vaccine Dossier</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>1.65kg–1.85kg Frame Body Weight</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Farm Gate Delivery in Rigid Cages</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Preserved Live Transit Video Player */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-teal-500/30 overflow-hidden shadow-2xl bg-slate-900">
                <MediaVideoPlayer
                  src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/transportation%20cage.mp4"
                  poster="/products/Chicks/Point of Lay.jpeg"
                  title="Live Bird Crating & Transport Operations"
                  badge="Safe Arrival Standard"
                  caption="Rigid plastic transport crates ensuring zero injury & calm transit during farm delivery"
                  aspectRatio="video"
                />
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
                <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  {b.label}
                </div>
                <div className="text-xs text-slate-500 leading-snug">{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PROBLEM SECTION: DIY PULLET REARING HAZARDS
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            Rearing Capital Traps
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Why Rearing Pullets from Day-Old Bankrupts 40% of Layer Startups
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Rearing commercial layers is an unforgiving 17-week marathon. Mistakes during early skeletal frame growth permanently ruin peak egg production.
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
          INFORMATION GAIN MATRIX: POL PROCUREMENT VS DIY REARING
          ==================================================================== */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <Layers className="h-3.5 w-3.5 text-teal-700" />
              Economic &amp; Risk Comparison
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              POL Procurement vs. DIY Farm Rearing Cost &amp; Risk Matrix (Nigeria 2026)
            </h2>
            <p className="text-sm text-slate-600">
              Direct comparison between rearing your own pullets from day-old chicks versus procuring fully grown Point-of-Lay stock from D-AminGrow.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-heading">
                  <th className="p-4 sm:p-5 font-bold">Operational Parameter</th>
                  <th className="p-4 sm:p-5 font-bold">DIY On-Farm Pullet Rearing</th>
                  <th className="p-4 sm:p-5 font-bold">D-AminGrow Contract POL</th>
                  <th className="p-4 sm:p-5 font-bold text-teal-300">Commercial Bottomline Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {PROCUREMENT_VS_DIY_MATRIX.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{row.parameter}</td>
                    <td className="p-4 sm:p-5 text-red-700 bg-red-50/20">{row.diyRearing}</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-800 bg-emerald-50/20">{row.damingrowPOL}</td>
                    <td className="p-4 sm:p-5 font-semibold text-slate-900">{row.advantage}</td>
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
            Institutional Quality Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            The D-AminGrow 4-Pillar POL Rearing Methodology
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every flock we deliver has undergone professional weight grading, skeletal frame measurement, and strict immunization protocols.
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
          PRESERVED BREED COMPARISON TABLE
          ==================================================================== */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="section-label">
              <BarChart3 className="h-3.5 w-3.5" />
              Breed Selection Guide
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Brown Layer vs. White Layer Performance
            </h2>
            <p className="text-slate-600 text-sm">
              Both breeds are reared under strict veterinary protocols. Select the right bird for your regional consumer egg market.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <div className="grid grid-cols-3 bg-[#050E08] text-white">
              <div className="p-5 text-sm font-bold font-heading">Production Attribute</div>
              <div className="p-5 text-sm font-bold font-heading text-center border-l border-white/10">
                <span className="flex items-center justify-center gap-2">🟤 <span className="text-amber-400">Brown Layer (ISA Brown)</span></span>
              </div>
              <div className="p-5 text-sm font-bold font-heading text-center border-l border-white/10">
                <span className="flex items-center justify-center gap-2">⬜ <span className="text-slate-300">White Layer (Shaver White)</span></span>
              </div>
            </div>
            {BREED_COMPARISON.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <div className="p-4 text-xs font-bold text-slate-900">{row.feature}</div>
                <div className="p-4 text-xs text-slate-800 text-center border-l border-slate-100 font-semibold">{row.brown}</div>
                <div className="p-4 text-xs text-slate-600 text-center border-l border-slate-100">{row.white}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PRESERVED VACCINATION SCHEDULE TABLE
          ==================================================================== */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="section-label">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-700" />
              Veterinary Immunization
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Complete POL Immunization Schedule (Day 1 to 18 Weeks)
            </h2>
            <p className="text-slate-600 text-sm">
              Every pullet delivered has received all 11 vaccines detailed below, including critical pre-lay killed injectables.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <div className="grid grid-cols-3 bg-teal-900 text-white">
              <div className="p-4 text-xs font-bold uppercase tracking-wider">Flock Age / Timing</div>
              <div className="p-4 text-xs font-bold uppercase tracking-wider border-l border-white/10">Administered Vaccine</div>
              <div className="p-4 text-xs font-bold uppercase tracking-wider border-l border-white/10">Clinical Route</div>
            </div>
            {VACCINATION_SCHEDULE.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}`}>
                <div className="p-3.5 text-xs font-semibold text-teal-800">{row.age}</div>
                <div className="p-3.5 text-xs text-slate-900 border-l border-slate-100 font-medium">{row.vaccine}</div>
                <div className="p-3.5 text-xs text-slate-600 border-l border-slate-100">{row.route}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center italic">* Certified vaccination log with batch numbers is delivered with each order waybill.</p>
        </div>
      </section>

      {/* ====================================================================
          PRESERVED INTERACTIVE POL RESERVATION FORM
          ==================================================================== */}
      <section id="order-form" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="section-label">
              <Egg className="h-3.5 w-3.5 text-teal-700" />
              Online POL Booking Desk
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Book Your Point-of-Lay Pullets
            </h2>
            <p className="text-slate-600 text-sm">
              Configure batch size, target breed, and requested delivery state to receive immediate price confirmation.
            </p>
          </div>

          <PolBookingForm />
        </div>
      </section>

      {/* ====================================================================
          PRESERVED POL PRODUCTS GRID
          ==================================================================== */}
      {polProducts.length > 0 && (
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="section-label">
                  <Feather className="h-3.5 w-3.5" />
                  Available POL Birds
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                  Current Production Stock
                </h2>
                <p className="text-sm text-slate-500 mt-1">Verified weekly availability for farm gate delivery</p>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 shrink-0">
                <Clock className="h-4 w-4 text-amber-600" />
                <span className="text-sm text-amber-800 font-medium">Price on Request — Call for Current Batch Rate</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {polProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          HONESTY FILTER: WE MAY NOT BE RIGHT FOR YOU IF...
          ==================================================================== */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-3">
            <div className="section-label">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-700" />
              Honest Fit Assessment
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
              Our Point-of-Lay Procurement May <span className="text-rose-600">Not</span> Be Right For You If...
            </h2>
            <p className="text-sm text-slate-600">
              We rear top-tier, fully vaccinated production birds for commercial egg enterprises. We believe in complete transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Do Not Have Cleaned, Disinfected Pens Ready
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                POL pullets cannot be delivered into pens that housed older birds without a 10-day terminal disinfection and downtime. Contaminated environments will immediately infect fresh birds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Plan to Feed Cheap Substandard Grower Mash
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                At 17 to 20 weeks, birds undergo intense reproductive system development. Feeding low-protein or unfortified mash without calcium will delay lay onset and cause cage layer paralysis.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Your Order Quantity is Below 50 Birds
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialized crating and biosecure transport logistics require a minimum order volume of 50 birds to ensure economic viability and bird comfort during transit.
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
              <HelpCircle className="h-3.5 w-3.5 text-teal-700" />
              POL Procurement FAQs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions About Point-of-Lay Pullets in Nigeria
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
      <section className="py-20 bg-gradient-to-br from-[#050E08] via-slate-950 to-teal-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 border border-teal-500/30 px-3.5 py-1 text-xs font-bold text-teal-300">
            <Clock className="h-3.5 w-3.5 text-teal-400" />
            <span>Farm Gate Delivery Across Nigeria</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Start Generating Egg Revenue in Weeks, Not Months
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Order certified 17–20 week Point-of-Lay pullets with audited vaccination records. Reserve your batch today and begin egg collection within 2 to 3 weeks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20Point-of-Lay%20pullets.%20Please%20confirm%20current%20batch%20price%20and%20delivery%20schedule."
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
              <PhoneCall className="h-5 w-5 text-teal-400" />
              <span>Call Commercial POL Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
