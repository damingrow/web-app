import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';
import { PolBookingForm } from '@/components/forms/pol-booking-form';
import {
  Egg,
  ShieldCheck,
  Truck,
  CheckCircle2,
  XCircle,
  MessageCircle,
  ArrowRight,
  Scale,
  AlertTriangle,
  Award,
  BarChart3,
  Feather,
  Clock,
  ChevronRight,
  Zap,
  Activity,
  FileCheck,
  Check,
  Info,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Buy Point-of-Lay Hens Online | Direct Flock Reservation Form',
  description:
    'Buy verified 16–18 week-old Point-of-Lay pullets in Nigeria (ISA Brown & Lohmann White). 1.45kg–1.65kg body weight, complete veterinary vaccination records, and nationwide crate delivery.',
  keywords: [
    'buy point of lay hens in nigeria',
    'flock allocation request',
    'layer batch reservation',
    'health inspection certificate',
    'cage delivery logistics',
    'egg production handover',
    'order point of lay pullets online',
    'book vaccinated point of lay hens',
    'point of lay pullet supply contract',
    'reserve 500 layers point of lay',
    'point of lay birds price in nigeria',
    'isa brown point of lay nigeria',
    'lohmann white layers nigeria',
    'damingrow point of lay pullets',
  ],
  openGraph: {
    title: 'Buy Point-of-Lay Hens Online | Direct Flock Reservation Form | D-AminGrow',
    description:
      'Production-ready 16–18 week-old Point-of-Lay layer pullets with verified 1.45kg–1.65kg body weights and complete veterinary vaccination cards. Dispatched nationwide in ventilated crates.',
    url: 'https://damingrow.com/point-of-lay',
    siteName: 'D-AminGrow',
    images: [
      {
        url: '/products/Chicks/Point of Lay.jpeg',
        width: 1200,
        height: 630,
        alt: 'Point-of-Lay Pullets for Sale in Nigeria - D-AminGrow',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
};

export default function PointOfLayPage() {
  const stats = [
    {
      value: '16–18 Wks',
      label: 'Physiological Readiness',
      sub: 'Mature skeletal frame and pelvic pin-bone expansion',
    },
    {
      value: '1.45–1.65kg',
      label: 'Target Body Weight',
      sub: '>85% flock uniformity across every batch',
    },
    {
      value: '14–28 Days',
      label: 'First Commercial Eggs',
      sub: 'Immediate cash flow without 4-month brooding delay',
    },
    {
      value: '100% Core',
      label: 'Veterinary Immunization',
      sub: 'Marek’s, LaSota, IBD, Pox, Typhoid & pre-lay EDS 76',
    },
  ];

  const failurePoints = [
    {
      num: '01',
      title: 'The Stunted Pullet Trap',
      tag: 'Permanent Lay Deficit',
      color: 'bg-red-50 text-red-700 border-red-200',
      description:
        'Substandard starter feeds leave 16-week pullets weighing under 1.25kg. Stunted birds produce small peewee eggs and collapse into reproductive fatigue, never achieving commercial peak lay above 70%. Good genetics cannot overcome skeletal underdevelopment.',
    },
    {
      num: '02',
      title: 'Unvaccinated Middlemen & EDS Disasters',
      tag: 'Egg Shell Collapse',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      description:
        'Unregulated roadside brokers skip the expensive inactivated Egg Drop Syndrome (EDS 76) and Coryza injections. When production commences, viral challenges cause soft-shelled eggs, depigmentation, and a sudden 40% crash in lay rate.',
    },
    {
      num: '03',
      title: 'Spent Culled Layer Scams',
      tag: 'Unethical Fraud',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      description:
        'Unscrupulous traders purchase 18-month-old exhausted commercial spent layers from battery cage farms, trim their beaks, bleach their shanks, and resell them as young &ldquo;point-of-lay pullets&rdquo; to beginner farmers who never see a steady crate of eggs.',
    },
    {
      num: '04',
      title: '17 Weeks of Feed Capital Depletion',
      tag: 'Cash Flow Exhaustion',
      color: 'bg-slate-100 text-slate-700 border-slate-200',
      description:
        'With maize and soybean meal prices fluctuating wildly, brooding day-old layer chicks for 119 days demands huge working capital and fuel before a single kobo returns. Many farmers run out of cash in week 12 and abandon their flock.',
    },
  ];

  const pillars = [
    {
      num: '01',
      title: 'Certified Parent-Stock Lineage',
      badge: 'First-Gen Vigor',
      desc: 'Sourced strictly from primary commercial parent stock (ISA Brown, Lohmann White, Bovan Brown). Birds carry verified maternal antibody profiles and high lay persistence designed for 305–325 eggs per cycle.',
      icon: Award,
      color: 'border-emerald-200 bg-emerald-50/40 text-emerald-800',
    },
    {
      num: '02',
      title: 'Calibrated Weigh-In & 85%+ Uniformity',
      badge: '1.45kg – 1.65kg Standard',
      desc: 'Flocks are audited by sample weight measurements prior to allocation. We reject underweight runts and ensure a tight bell-curve distribution so birds mature and commence egg-laying simultaneously.',
      icon: Scale,
      color: 'border-cyan-200 bg-cyan-50/40 text-cyan-800',
    },
    {
      num: '03',
      title: '7-Point Veterinary Health Certificate',
      badge: 'Veterinary Certified',
      desc: 'Each batch comes with an official immunization log: Marek’s Disease at hatch, repeated Newcastle LaSota & Clone 30, Gumboro IBD, Fowl Pox wing-web stab, Fowl Typhoid, and the mandatory pre-lay EDS inactivated booster.',
      icon: FileCheck,
      color: 'border-teal-200 bg-teal-50/40 text-teal-800',
    },
    {
      num: '04',
      title: 'Ventilated Crate Transit & Night Dispatch',
      badge: '10 Birds per Crate',
      desc: 'Adult layers are crated in sanitized, heavy-duty HDPE transport crates (strictly 10 mature birds per crate) and transported during cool evening and pre-dawn hours to eliminate transit heat exhaustion.',
      icon: Truck,
      color: 'border-amber-200 bg-amber-50/40 text-amber-800',
    },
  ];

  const anatomicalChecks = [
    {
      feature: 'Pelvic Pin-Bone Spread',
      genuinePol: '2-finger snug spread (pliable, expanding pubic bones preparing for first egg)',
      spentHen: 'Wide 3-to-4 finger gap, rigid, heavily calcified, or permanently flared',
    },
    {
      feature: 'Vent Color & Elasticity',
      genuinePol: 'Small, moist, circular with deep yellow pigmentation; elastic sphincter',
      spentHen: 'Enlarged, flaccid, oval, bleached pale white with torn or scarred edges',
    },
    {
      feature: 'Comb & Wattle Texture',
      genuinePol: 'Bright waxy red, velvety soft to the touch, actively expanding in volume',
      spentHen: 'Pale pink or shriveled, dry, flaccid, oversized, or scabby from old cage wire',
    },
    {
      feature: 'Shanks & Foot Pads',
      genuinePol: 'Vibrant yellow coloration, smooth fresh scales, clean healthy foot pads',
      spentHen: 'Bleached chalky white, rough flaked scales, worn spurs, calloused bumblefoot',
    },
  ];

  const breedProfiles = [
    {
      name: 'ISA Brown Commercial Layer',
      badge: 'Market Favorite',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      eggColor: 'Rich Dark Brown',
      cycleOutput: '310 – 325 Eggs / 52-Week Cycle',
      feedIntake: '112 – 118g per bird / day',
      shellQuality: 'Exceptional shell breaking strength (>40 Newtons)',
      housing: 'Optimal in both battery cages and deep-litter housing',
      description:
        'The dominant commercial brown egg layer in West Africa. Renowned for docile temperament, high livability (>94% through lay cycle), and rapid adaptation to tropical ambient temperatures.',
    },
    {
      name: 'Lohmann White Commercial Layer',
      badge: 'Maximum Feed Efficiency',
      badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      eggColor: 'Pristine Chalk White',
      cycleOutput: '320 – 335 Eggs / 52-Week Cycle',
      feedIntake: '98 – 106g per bird / day (Ultra-Low FCR)',
      shellQuality: 'Uniform oval shape, superior internal albumen height',
      housing: 'Engineered specifically for multi-tier battery cage setups',
      description:
        'The profit leader for commercial table egg producers with battery cages. Consumes 10–15g less feed per day than brown breeds while delivering superior early egg size and unmatched peak persistence.',
    },
    {
      name: 'Dominant Black / Bovan Brown',
      badge: 'Heavyweight Hardiness',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      eggColor: 'Tinted Brown / Cream',
      cycleOutput: '290 – 310 Eggs / 52-Week Cycle',
      feedIntake: '118 – 125g per bird / day',
      shellQuality: 'Heavy brown shells with thick cuticles',
      housing: 'Superb for semi-intensive, open-sided pens, and village setups',
      description:
        'A rugged dual-purpose layer line with heavier body frame (1.65kg–1.85kg). Delivers steady table egg production with strong resistance against harsh regional climate swings and biosecurity challenges.',
    },
  ];

  const financialComparison = [
    {
      parameter: 'Rearing Mortality Exposure',
      doc: '8% to 15% cumulative mortality over 17 weeks',
      pol: '0% brooding loss; 100% mature live birds received',
    },
    {
      parameter: 'Feed Required Before First Egg',
      doc: 'Approx. 6.8kg of Starter & Grower Mash per chick',
      pol: '0kg starter/grower; you only purchase Pre-Lay & Layer Mash',
    },
    {
      parameter: 'Time to First Commercial Revenue',
      doc: '18 to 22 Weeks (126 to 154 days of waiting)',
      pol: '2 to 4 Weeks (14 to 28 days from placement)',
    },
    {
      parameter: 'Brooding Fuel & Heating Equipment',
      doc: 'Heavy charcoal/gas heater expenses + brooder guards',
      pol: 'Zero heating fuel or brooder equipment investment',
    },
    {
      parameter: 'Vaccination Labor & Error Risk',
      doc: '12 separate vaccine administrations (eye, water, wing stab)',
      pol: 'All core vaccinations already completed and certified',
    },
    {
      parameter: 'Cash Flow Capital Velocity',
      doc: 'Capital locked up without returns for 5 months',
      pol: 'Egg sales revenue begins generating within 30 days',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What exact age are D-AminGrow Point-of-Lay pullets at delivery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our commercial Point-of-Lay pullets are supplied at 16 to 18 weeks of age (112 to 126 days). At this age, the birds have completed their skeletal and reproductive organ development, weigh between 1.45kg and 1.65kg, and have completed their full veterinary immunization program.',
        },
      },
      {
        '@type': 'Question',
        name: 'How soon will my Point-of-Lay birds start dropping commercial eggs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Depending on travel recovery and farm acclimation, 16–18 week Point-of-Lay birds typically begin dropping their first eggs within 14 to 28 days of arrival at your farm (around week 19 to 21). Flock production gradually ramps up to reach 50% lay by week 22–23 and peak commercial production (90%+) by week 25–26.',
        },
      },
      {
        '@type': 'Question',
        name: 'What vaccines have the birds received before delivery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every batch is accompanied by a certified veterinary immunization card confirming: Marek’s Disease (Day 1 subcutaneous), Newcastle Disease (LaSota and Clone 30 boosts), Gumboro (IBD intermediate boosts), Fowl Pox (wing-web stab), Fowl Typhoid, Infectious Bronchitis, and the mandatory pre-lay Egg Drop Syndrome (EDS 76) inactivated injection.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the minimum order quantity (MOQ) for Point-of-Lay hens?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our minimum flock reservation order is 50 birds (5 crates). We supply commercial orders from 50 birds up to 5,000+ birds per batch for commercial egg farms across Nigeria.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are Point-of-Lay birds packaged and transported to my farm?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Adult layers are crated in sanitized, heavy-duty HDPE plastic poultry crates packed strictly at 10 mature birds per crate to prevent suffocation. Deliveries are dispatched during cool evening or early morning hours via specialized express logistics or farm-gate truck charter.',
        },
      },
      {
        '@type': 'Question',
        name: 'What feed and lighting program should I use during the first 14 days of arrival?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Upon arrival, provide clean water enriched with anti-stress electrolytes and vitamins for 3 to 5 days. Feed Grower Mash for the first 5 to 7 days to allow birds to settle without digestive shock, then transition to Pre-Lay Mash (or Layer Phase 1 Mash with 3.5% calcium) as the first eggs appear. Gradually increase photoperiod lighting by 30 minutes weekly until reaching 16 hours of daily light.',
        },
      },
    ],
  };

  return (
    <div className="font-body text-slate-800 bg-white">
      {/* Schema Markup for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ====================================================================
          TOP DISPATCH NOTIFICATION BAR — Urgent & Practical
          ==================================================================== */}
      <div className="bg-emerald-950 text-white border-b border-emerald-800/60 py-2.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-300 font-semibold">Flock Allocation Desk:</span>
            <span>Verified 16–18 week ISA Brown & Lohmann batches moving nationwide <strong>every Monday & Thursday</strong>.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Minimum: 50 Birds (5 Crates)</span>
            <span className="text-slate-600">|</span>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20reserve%20a%20Point-of-Lay%20pullet%20batch.%20Please%20share%20today%27s%20rates."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
            >
              Confirm Rates On WhatsApp <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ====================================================================
          HERO SECTION — High Conversion, Mobile First, 2-Column Grid
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden min-h-[85vh] flex items-center bg-[#050E08] text-white">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left Column (7 cols): Benefit-Driven Copy, Hook, CTAs */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-5 text-left">

              {/* Credibility Tag */}
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Production-Ready Layer Pullets (16–18 Weeks)
                </div>
              </div>

              {/* Exact Primary H1 Directive */}
              <div className="space-y-4 !mt-2.5">
                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                  Buy Point-of-Lay Hens in Nigeria:{' '}
                  <span className="text-gradient-green">Custom Batch Allocation</span> &amp; Health Records
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                  Bypass 17 exhausting weeks of brooding mortality, compounding feed inflation, and disease vulnerability. D-AminGrow supplies healthy, fully vaccinated 16–18 week Point-of-Lay pullets with verified 1.45kg–1.65kg body weights, ready to drop their first commercial eggs within 2 to 4 weeks.
                </p>
              </div>

              {/* Brand Motto Pill */}
              <div>
                <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs">
                  <span className="text-slate-400 font-medium uppercase tracking-wider">Our Commitment</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 font-bold italic">&ldquo;Your Satisfaction Is Our Priority&rdquo;</span>
                </div>
              </div>

              {/* Primary Action Zone — High Visual Weight & Homepage Button Styles */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20reserve%20a%20Point-of-Lay%20batch.%20Please%20share%20today%27s%20rates%20and%20availability."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Reserve Flock Allocation On WhatsApp
                </a>
                <a
                  href="#book-pol"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
                >
                  Book Layer Pullets Online
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link
                  href="/chicks"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-4 py-4 rounded-xl transition-all duration-200 text-sm hover:underline"
                >
                  Day-Old Pullet Chicks
                </Link>
              </div>

              {/* Trust Assurances */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs text-slate-400 border-t border-white/10">
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>16–18 Wks Pre-Lay</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>1.45kg–1.65kg Weight</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>100% Core Vaccines</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>10-Bird HDPE Crates</span>
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): Live Pullet Video Footage + Telemetry Card */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 space-y-4">
              <div className="rounded-3xl overflow-hidden border border-emerald-500/20 shadow-2xl bg-black">
                <MediaVideoPlayer
                  src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/supreme%20pullets.mp4"
                  poster="/products/Chicks/Point of Lay.jpeg"
                  title="Commercial Layer Pullet Flock"
                  badge="16–18 Weeks Old"
                  caption="Active, robust brown layer pullets with complete veterinary immunization"
                  aspectRatio="video"
                />
              </div>

              {/* Batch Telemetry Card */}
              <div className="rounded-2xl card-dark p-5 border border-emerald-500/20 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <Activity className="h-3.5 w-3.5" />
                    Current Batch Profile
                  </span>
                  <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">
                    Ready for Lay Pen
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-400">Target Body Weight:</span>
                    <p className="font-bold text-white text-sm">1.45kg – 1.65kg</p>
                  </div>
                  <div>
                    <span className="text-slate-400">First Egg Window:</span>
                    <p className="font-bold text-emerald-400 text-sm">14 – 28 Days</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Flock Uniformity:</span>
                    <p className="font-semibold text-white">&gt;85% Bell Curve</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Egg Cycle Potential:</span>
                    <p className="font-semibold text-white">305 – 325 Eggs/Hen</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Operational Benchmarks Bar */}
          <div className="mt-14 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center hover:border-emerald-500/40 transition-colors"
              >
                <div className="text-3xl font-extrabold text-white font-heading mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-emerald-400 mb-0.5">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ====================================================================
          PROBLEM EXPLANATION & WHY FARMS BLEED CAPITAL — The Reality of Layer Rearing
          ==================================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit bg-red-50 text-red-700 border-red-200 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold">
              <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
              The Cost Of Rearing Mistakes
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why Most Layer Farming Projects Fail in Nigeria
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Rearing layer chicks from day-old through 17 weeks requires intensive capital, skilled technical supervision, and relentless disease defense. Here is where commercial farmers lose their capital before the first egg is laid:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {failurePoints.map((point, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="h-10 w-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm font-heading">
                      {point.num}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${point.color}`}>
                      {point.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">
                    {point.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Practical Biological Opinion Callout */}
          <div className="mt-12 bg-emerald-900 text-white rounded-3xl p-7 sm:p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="text-xs uppercase tracking-wider text-emerald-300 font-bold flex items-center gap-1.5 justify-center md:justify-start">
                <Zap className="h-3.5 w-3.5 text-emerald-300" />
                The D-AminGrow Biological Reality
              </div>
              <div className="text-lg sm:text-xl font-bold font-heading">
                Buying uncalibrated or underweight pullets to save ₦500 per bird guarantees 40% fewer eggs over the entire cycle.
              </div>
              <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
                A layer bird that enters lay at 1.1kg produces small peewee eggs and burns out within 6 months. Genuine 1.5kg pullets pay for themselves within 60 days.
              </p>
            </div>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20please%20send%20me%20the%20current%20weight%20and%20health%20records%20of%20available%20POL%20birds."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs px-6 py-3.5 rounded-xl shrink-0 transition-colors shadow-md"
            >
              Verify Available Batches
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          APPROACH & FRAMEWORK — The 4-Pillar Flock Allocation Framework
          ==================================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <div className="section-label mx-auto w-fit inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Our Rearing Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 4-Pillar Flock Allocation Framework
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We do not source birds from anonymous backyard farms. Every batch of Point-of-Lay pullets passes through a rigorous four-stage quality verification filter before allocation:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-3xl p-7 sm:p-8 hover:border-emerald-300 transition-all bg-slate-50/50 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <pillar.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                        Pillar {pillar.num}
                      </span>
                      <h3 className="text-lg font-bold font-heading text-slate-900">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-200/70 text-slate-700">
                    {pillar.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          UNIQUE INFORMATION GAIN — How to Detect Spent Culled Hens
          ==================================================================== */}
      <section className="py-20 bg-[#050E08] text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label-dark mx-auto w-fit inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              Field Science & Verification
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Field Science: How to Detect Spent Culled Hens Disguised as Young Point-of-Lay Pullets
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              The single biggest fraud in the Nigerian poultry market is selling 18-month-old exhausted commercial spent layers as &ldquo;point-of-lay pullets.&rdquo; Here is the exact anatomical audit framework our veterinary team uses to verify young birds:
            </p>
          </div>

          {/* Anatomical Comparison Matrix */}
          <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-white/10 text-slate-200 text-xs uppercase font-heading tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-4 px-6">Anatomical Check</th>
                    <th className="py-4 px-6">Genuine 16–18 Wk Point-of-Lay Pullet</th>
                    <th className="py-4 px-6">Spent Culled Layer (Old Hen Fraud)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {anatomicalChecks.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}>
                      <td className="py-4 px-6 font-bold text-white font-heading flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{item.feature}</span>
                      </td>
                      <td className="py-4 px-6 text-emerald-300 font-medium">
                        {item.genuinePol}
                      </td>
                      <td className="py-4 px-6 text-red-300 font-medium">
                        {item.spentHen}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-white/5 border-t border-white/10 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>
                  <strong>Field Veterinary Rule:</strong> Look closely at the foot pads and scales. A true 16-week pullet has vibrant yellow shanks and fresh, supple skin. An old spent layer has bleached, chalky white scales from 12 months of calcium depletion.
                </span>
              </div>
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20verify%20the%20authenticity%20of%20available%20point-of-lay%20pullets."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold underline shrink-0"
              >
                Inspect Batch With Our Vets →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          BREEDS AVAILABLE — Detailed Performance Profiles
          ==================================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              Commercial Layer Breeds
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Layer Breeds Available for Flock Allocation
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Select proven commercial layers calibrated for superior egg shell strength, feed conversion efficiency, and sustained lay persistence under African climatic conditions:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {breedProfiles.map((breed, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-all space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${breed.badgeColor}`}>
                      {breed.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">16–18 Weeks Old</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-heading text-slate-900">
                      {breed.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {breed.description}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Egg Color:</span>
                      <span className="font-bold text-slate-800">{breed.eggColor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Cycle Potential:</span>
                      <span className="font-bold text-emerald-700">{breed.cycleOutput}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Daily Feed:</span>
                      <span className="font-semibold text-slate-700">{breed.feedIntake}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Shell Strength:</span>
                      <span className="font-semibold text-slate-700">{breed.shellQuality}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href="#book-pol"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                  >
                    Select {breed.name.split(' ')[0]} For Reservation <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          FINANCIAL COMPARISON — POL vs Day-Old Pullets (17-Week Audit)
          ==================================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="section-label mx-auto w-fit inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <BarChart3 className="h-3.5 w-3.5 text-emerald-600" />
              Economic Comparison
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Point-of-Lay Pullets vs. Day-Old Chicks: The Real 17-Week Financial Audit
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Many farmers assume day-old layer chicks are cheaper because the initial chick price is lower. When you factor in 17 weeks of compounding feed inflation, mortality, heating gas, and labor, the financial comparison tells a very different story:
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-[#050E08] text-white">
              <div className="p-5 text-sm font-bold font-heading">Key Operating Metric</div>
              <div className="p-5 text-sm font-bold font-heading text-center border-t md:border-t-0 md:border-l border-white/10 bg-emerald-950/40">
                <span className="inline-flex items-center gap-2">
                  <Egg className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-300">Point-of-Lay (16–18 Wks)</span>
                </span>
              </div>
              <div className="p-5 text-sm font-bold font-heading text-center border-t md:border-t-0 md:border-l border-white/10">
                <span className="inline-flex items-center gap-2">
                  <Feather className="h-4 w-4 text-amber-400" />
                  <span className="text-amber-300">Day-Old Pullet (Week 0)</span>
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              {financialComparison.map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-1 md:grid-cols-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}
                >
                  <div className="p-4 font-bold text-slate-900 font-heading flex items-center">
                    {row.parameter}
                  </div>
                  <div className="p-4 text-emerald-900 bg-emerald-50/30 font-semibold md:border-l border-slate-100 flex items-center">
                    <Check className="h-4 w-4 text-emerald-600 mr-2 shrink-0" />
                    <span>{row.pol}</span>
                  </div>
                  <div className="p-4 text-slate-600 md:border-l border-slate-100 flex items-center">
                    <XCircle className="h-4 w-4 text-amber-600 mr-2 shrink-0" />
                    <span>{row.doc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-slate-600 mb-3">
              Need personalized advice for your specific pen capacity and cash-flow schedule?
            </p>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20compare%20the%20cost%20of%20Point-of-Lay%20vs%20Day-Old%20Chicks%20for%20my%20farm."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-bold text-sm underline"
            >
              <MessageCircle className="h-4 w-4" />
              Discuss With Our Poultry Economists on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PROCESS BREAKDOWN — 4-Step Reservation to First Crate Sequence
          ==================================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              Simple 4-Step Sequence
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              From Reservation to Your First Commercial Crate
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Transparent, structured, and predictable from reservation deposit to egg collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-3xl p-6 text-center space-y-3 bg-white shadow-sm hover:border-emerald-300 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-base font-heading shadow-md">
                1
              </div>
              <h3 className="text-base font-bold font-heading text-slate-900">Lock In Reservation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit your breed choice, crate count, and delivery state below. A commitment invoice with a formal allocation reservation reference is generated.
              </p>
            </div>

            <div className="border border-slate-200 rounded-3xl p-6 text-center space-y-3 bg-white shadow-sm hover:border-emerald-300 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-base font-heading shadow-md">
                2
              </div>
              <h3 className="text-base font-bold font-heading text-slate-900">Veterinary Audit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flock is weighed for the 1.45kg–1.65kg target, pelvic pin bones are inspected, and the official 7-point immunization card is counter-signed.
              </p>
            </div>

            <div className="border border-slate-200 rounded-3xl p-6 text-center space-y-3 bg-white shadow-sm hover:border-emerald-300 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-base font-heading shadow-md">
                3
              </div>
              <h3 className="text-base font-bold font-heading text-slate-900">Ventilated Night Transit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Birds are crated strictly 10 per HDPE crate and moved during cool night or dawn hours to protect them against tropical transit dehydration.
              </p>
            </div>

            <div className="border border-slate-200 rounded-3xl p-6 text-center space-y-3 bg-white shadow-sm hover:border-emerald-300 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-base font-heading shadow-md">
                4
              </div>
              <h3 className="text-base font-bold font-heading text-slate-900">Pen Placement & Eggs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Follow our 14-day anti-stress hydration, pre-lay mash, and photoperiod lighting schedule. Commercial egg collection begins within 2 to 4 weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          INTERACTIVE RESERVATION FORM — Direct Flock Reservation Desk
          ==================================================================== */}
      <section id="book-pol" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="section-label mx-auto w-fit inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Egg className="h-3.5 w-3.5 text-emerald-600" />
              Online Flock Reservation Form
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Reserve Your Point-of-Lay Flock Allocation
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Select your layer breed, crate quantity, and dispatch schedule. The system calculates crate counts, deposit requirements, and issues your reservation invoice:
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            <PolBookingForm />
          </div>
        </div>
      </section>

      {/* ====================================================================
          CASE STUDY / RESULTS — Verified Operational Proof
          ==================================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-md p-8 sm:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                  Verified Batch Case Study
                </span>
                <h3 className="text-2xl font-extrabold font-heading text-slate-900 mt-2">
                  600 ISA Brown Layers (Oyo Hatchery Hub to Sagamu, Ogun State)
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">Flock Size: 60 Crates (600 Birds)</span>
                <div className="text-sm font-bold text-emerald-700">ISA Brown 17-Week Batch</div>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed py-6">
              Apex Green Poultry in Sagamu booked 600 ISA Brown Point-of-Lay pullets at 17 weeks of age. Sourced directly from certified rearing lines in Oyo State, birds were weighed at 1.54kg average upon arrival. Following our 14-day anti-stress hydration and pre-lay mash protocol, the first commercial egg dropped on Day 18, reaching an impressive 92.4% peak lay rate at Week 25.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 bg-slate-50 rounded-2xl p-5 text-center">
              <div>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">1.54 kg</div>
                <div className="text-xs text-slate-500 font-medium">Avg Arrival Weight (88% Uniform)</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">Day 18</div>
                <div className="text-xs text-slate-500 font-medium">First Commercial Egg Dropped</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-700 font-heading">92.4%</div>
                <div className="text-xs text-slate-500 font-medium">Peak Lay Rate at Week 25</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-700 font-heading">₦1.86M</div>
                <div className="text-xs text-slate-500 font-medium">Net Monthly Egg Revenue</div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 italic">
                &ldquo;We bypassed four months of expensive feed bills. The birds were uniform, healthy, and started producing within three weeks.&rdquo; — Farm Director, Apex Green Poultry
              </span>
              <Link
                href="/reviews"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 shrink-0"
              >
                Read More Farm Testimonials <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          HONESTY FILTER: WE MAY NOT BE RIGHT FOR YOU IF...
          ==================================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />
              Honest Expectations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              We May Not Be the Right Pullet Supplier for You If...
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We believe in transparent, long-term commercial relationships. To protect your capital and ensure mutual success, we are clear about where our operational model fits:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm font-heading">
                <XCircle className="h-5 w-5 shrink-0" />
                <span>You Want Quantities Below 50 Birds</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                Our rearing farms operate in commercial batch allotments (minimum 5 crates / 50 birds). We cannot break commercial crates for small backyard pet orders.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm font-heading">
                <XCircle className="h-5 w-5 shrink-0" />
                <span>Your Cages or Pens Are Not Ready</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                Point-of-Lay birds cannot sit in transport crates overnight on your farm. Pens, nipple drinkers, and feeders must be disinfected and filled with anti-stress water before the truck arrives.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm font-heading">
                <XCircle className="h-5 w-5 shrink-0" />
                <span>You Seek Cheap Backyard Roadside Birds</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                We only distribute verified parent-stock layers with certified vaccination histories. We do not broker un-vaccinated, stunted birds sold at bargain-basement prices.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm font-heading">
                <XCircle className="h-5 w-5 shrink-0" />
                <span>You Plan to Feed Unformulated Local Bran</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                Genetics can only perform if nutritional requirements are met. High-yielding layers require calibrated pre-lay and layer mash with 3.5% calcium to sustain 90%+ egg production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FAQ SECTION — Comprehensive Schema-Aligned Answers
          ==================================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Frequently Answered Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Common Questions on Point-of-Lay Hens
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Clear, practical answers about flock age, egg start timelines, veterinary vaccination cards, minimum orders, and transport crating.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqSchema.mainEntity.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2 hover:border-emerald-300 transition-colors"
              >
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          FINAL CALL TO ACTION — High-Conversion Soft CTA Desk
          ==================================================================== */}
      <section className="py-20 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Next Scheduled Dispatch: Monday &amp; Thursday
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
              Ready to Start Collecting Commercial Eggs in 2 to 4 Weeks?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Lock in your 16–18 week Point-of-Lay flock allocation with verified parent-stock genetics, certified vaccination records, and scheduled crate delivery across Nigeria.
            </p>
          </div>

          {/* Action Buttons — Matching Homepage Styling */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20reserve%20a%20Point-of-Lay%20batch.%20Please%20share%20today%27s%20rates%20and%20availability."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Reserve Flock Allocation On WhatsApp
            </a>
            <a
              href="#book-pol"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
            >
              Book Layer Pullets Online
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/services/consultation"
              className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-4 py-4 rounded-xl transition-all duration-200 text-sm hover:underline"
            >
              Consult A Layer Specialist
            </Link>
          </div>

          <div className="pt-6 text-xs text-slate-400">
            <span>D-AminGrow Agro-Allied Limited</span> • <span>Your Satisfaction Is Our Priority</span> • <span>Nationwide Crated Delivery Across Nigeria</span>
          </div>
        </div>
      </section>
    </div>
  );
}
