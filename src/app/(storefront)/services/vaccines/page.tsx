import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';
import {
  Syringe,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  MessageCircle,
  Phone,
  ArrowRight,
  ChevronRight,
  Clock,
  HelpCircle,
  Package,
  Snowflake,
  Sparkles,
  CheckCircle2,
  XCircle,
  PhoneCall,
  Layers,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cold Chain Vaccine Delivery Service Nigeria | Guaranteed Temperature Transit | D-AminGrow',
  description:
    'Reliable cold-chain poultry vaccine delivery across Nigeria. Verified 2°C–8°C temperature transit with insulated EPS cold boxes, phase-change gel packs, and chemical indicator strips for NVRI and imported biologicals.',
  keywords: [
    'cold chain vaccine delivery service nigeria',
    'temperature monitored biological transit',
    'cold box delivery',
    'live virus vaccine preservation',
    'farm gate vaccine delivery',
    'poultry vaccine cold chain transportation',
    'reliable vaccine dispatch service in nigeria',
    'veterinary cold chain distribution network',
    'express poultry vaccine delivery service',
  ],
  alternates: {
    canonical: 'https://damingrow.com/services/vaccines',
  },
  openGraph: {
    title: 'Cold Chain Vaccine Delivery Service Nigeria | Guaranteed Temperature Transit | D-AminGrow',
    description:
      'Guaranteed 2°C–8°C cold-chain biological transit for poultry vaccines across Nigeria. Shipped with certified ice bricks and irreversible temperature monitors.',
    url: 'https://damingrow.com/services/vaccines',
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
      name: 'How does D-AminGrow guarantee the 2°C–8°C cold-chain during transit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We utilize certified, high-density molded expanded polystyrene (EPS) biological shipping boxes packed with pre-conditioned phase-change ice gel bricks calibrated to maintain internal temperatures between 2°C and 8°C for up to 48 hours. Every shipment contains an irreversible chemical temperature indicator strip that visually confirms the biological never experienced thermal abuse.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if a live poultry vaccine is exposed to room temperature?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Live attenuated viral vaccines (such as Newcastle LaSota and Gumboro Intermediate Plus) begin rapidly degrading when temperatures exceed 8°C. Exposure to ambient tropical temperatures (30°C–36°C) for just 1 to 2 hours neutralizes active viral titers. The farmer ends up administering inactive fluid, leaving the flock 100% unprotected against virulent field outbreaks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can poultry vaccines be delivered to any Nigerian state?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We operate an express nationwide distribution network shipping to all 36 Nigerian states and the FCT. Same-day and next-day deliveries are coordinated through priority interstate courier networks and dedicated motor park logistics hubs with real-time phone tracking.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you supply genuine NVRI Vom vaccines and international brands?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We stock authentic biologicals from the National Veterinary Research Institute (NVRI, Vom, Plateau State) as well as NAFDAC-registered international biological manufacturers including Boehringer Ingelheim, Ceva Santé Animale, and Hipra. All batches have verifiable manufacturing lot numbers and expiry dates.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do if the temperature indicator strip indicates a temperature breach upon arrival?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If the chemical indicator strip inside your cold box has triggered or the ice bricks have completely liquefied, do not administer the vaccine to your birds. Take clear photographs of the strip and package interior immediately and contact our WhatsApp dispatch desk (+234 806 870 0074). We will replace the batch in accordance with our Cold-Chain Integrity Guarantee.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I place an urgent vaccine order and confirm dispatch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can select your required vaccine from our catalog on this page and connect directly with our cold-chain dispatch desk on WhatsApp. We confirm stock availability, pack your thermal box under refrigerated conditions, and provide you with transit waybill tracking details within 2 hours.',
      },
    },
  ],
};

const OPERATIONAL_BENCHMARKS = [
  {
    value: '2°C–8°C',
    label: 'Certified Cold-Chain',
    detail: 'Constant biological storage and thermal transit compliance',
  },
  {
    value: '48 Hours',
    label: 'Thermal Holding Rating',
    detail: 'Molded EPS boxes with phase-change eutectic gel bricks',
  },
  {
    value: 'NVRI & NAFDAC',
    label: 'Verified Biologicals',
    detail: 'Authentic manufacturer batch lot codes with zero counterfeits',
  },
  {
    value: '36 States',
    label: 'Nationwide Express Network',
    detail: 'Fast transit to all state capitals and agricultural hubs',
  },
];

const PROBLEM_POINTS = [
  {
    title: 'Thermal Rupture During Uninsulated Motor Park Transit',
    desc: 'Unregistered market vendors routinely ship fragile live freeze-dried vaccines inside uninsulated polyethene bags or flimsy cardboard boxes with a single melting ice cube. By the time the bus arrives in Akure, Enugu, or Kano, pen temperatures have exceeded 35°C, completely denaturing the live virus.',
    impact: '100% vaccine titer destruction & silent flock vulnerability',
  },
  {
    title: 'Cracked Emulsions in Inactivated Killed Oil Injectables',
    desc: 'Killed oil-emulsion vaccines (e.g. ND + IB + EDS triple killed) must never freeze and must never overheat. Thermal shock cracks the oil-water emulsion, causing irreversible phase separation. Injecting cracked emulsion causes severe breast muscle inflammation, sterile abscesses, and zero antibody protection.',
    impact: 'Severe injection tissue necrosis & lay crashes',
  },
  {
    title: 'Placing Vaccines Beside Hot Vehicle Engines',
    desc: 'Untrained bus drivers frequently place packages directly over hot engine compartments or under unventilated metal vehicle roofs. Internal temperatures inside cargo compartments reach 45°C–50°C during midday traffic, instantly cooking biological antigens into useless protein residue.',
    impact: 'Total loss of invested vaccine and freight capital',
  },
];

const COLD_CHAIN_MATRIX = [
  {
    parameter: 'Transit Packaging',
    marketDispatch: 'Nylon bag or thin carton with melting water ice',
    damingrowColdChain: 'Dense molded EPS insulated cooler + phase-change bricks',
    impact: 'Maintains 2°C–8°C for 48 hours in 38°C tropical heat',
  },
  {
    parameter: 'Thermal Verification',
    marketDispatch: 'Zero temperature verification (blind trust)',
    damingrowColdChain: 'Chemical temperature indicator strip in every box',
    impact: 'Irreversible visual confirmation that cold chain was unbroken',
  },
  {
    parameter: 'Biological Viral Viability',
    marketDispatch: 'Degraded titers (<30% viability upon arrival)',
    damingrowColdChain: '100% verified viral potency & active antibody titer',
    impact: 'Guarantees protective flock seroconversion against field challenge',
  },
  {
    parameter: 'Manufacturer Traceability',
    marketDispatch: 'Expired, relabeled, or broken-seal secondary vials',
    damingrowColdChain: 'Direct NVRI & NAFDAC registered manufacturer lots',
    impact: 'Full certificate of analysis & batch traceability on every vial',
  },
];

const VACCINES = [
  {
    name: 'Newcastle Disease (LaSota Strain) — Live',
    sku: 'VAC-ND-01',
    type: 'Live Freeze-Dried Attenuated',
    route: 'Drinking water with skimmed milk or coarse spray',
    age: 'Day 21–28 (booster after Day 1/7 B1 prime)',
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    name: 'Gumboro (IBD) Intermediate Plus — Live',
    sku: 'VAC-IBD-02',
    type: 'Live Freeze-Dried Attenuated',
    route: 'Drinking water with non-fat milk stabilizer',
    age: 'Day 10–14, booster Day 18–21',
    color: 'bg-violet-50 border-violet-200',
  },
  {
    name: 'Newcastle Killed Oil-Emulsion (LaSota) — Injectable',
    sku: 'VAC-NDK-03',
    type: 'Inactivated Oil-Emulsion Biological',
    route: 'Subcutaneous (neck) or intramuscular (breast)',
    age: 'Week 16–18 (pre-lay commercial pullets)',
    color: 'bg-cyan-50 border-cyan-200',
  },
  {
    name: 'Infectious Coryza (A, B & C) — Killed Bacterin',
    sku: 'VAC-COR-04',
    type: 'Inactivated Trivalent Bacterin',
    route: 'Intramuscular or subcutaneous injection',
    age: 'Week 10–12 + pre-lay booster Week 16–18',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    name: 'Mycoplasma Gallisepticum (MG) Killed — Injectable',
    sku: 'VAC-MYC-05',
    type: 'Inactivated Bacterin / Emulsion',
    route: 'Subcutaneous at lower neck dorsal area',
    age: 'Week 12–14 + booster Week 18',
    color: 'bg-rose-50 border-rose-200',
  },
  {
    name: 'ND + IB + EDS Triple Killed — Injectable',
    sku: 'VAC-TRP-06',
    type: 'Inactivated Triple Inactivated Biological',
    route: 'Intramuscular (breast) or subcutaneous',
    age: 'Week 16–18 (2–4 weeks prior to first egg)',
    color: 'bg-teal-50 border-teal-200',
  },
  {
    name: 'ND + IB H120 Bivalent Live — Freeze-Dried',
    sku: 'VAC-NDIB-07',
    type: 'Live Freeze-Dried Bivalent Biological',
    route: 'Eye-drop, coarse spray, or drinking water',
    age: 'Day 1–7 prime; booster per program',
    color: 'bg-lime-50 border-lime-200',
  },
];

const COLD_CHAIN_STEPS = [
  {
    icon: Snowflake,
    title: '1. Calibrated Refrigerated Storage',
    desc: 'All vaccines are stored in dedicated medical 2°C–8°C biological refrigerators with automated dual temperature logging twice daily.',
    color: 'bg-cyan-100 text-cyan-700',
  },
  {
    icon: Package,
    title: '2. High-Density EPS Insulated Packaging',
    desc: 'Vaccines are packed in thick molded expanded polystyrene coolers with frozen phase-change ice gel bricks engineered for 48h thermal holding.',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    icon: Thermometer,
    title: '3. Irreversible Indicator Strips',
    desc: 'Every consignment includes a verified chemical indicator strip confirming the internal package temperature never exceeded critical limits during transit.',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: ShieldCheck,
    title: '4. Verified Delivery & Handover Protocol',
    desc: 'Shipment dispatched with direct driver contact details. Customer receives pre-arrival call to verify cold box integrity before administration.',
    color: 'bg-violet-100 text-violet-700',
  },
];

const PILLARS = [
  {
    num: '01',
    title: 'Continuous 2°C–8°C Biological Storage',
    desc: 'Back-up solar inverter power arrays prevent temperature fluctuations during municipal electricity outages at our regional hub.',
    icon: Snowflake,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
  },
  {
    num: '02',
    title: 'Phase-Change Eutectic Cold Packaging',
    desc: 'Utilizing specialized gel formulas that absorb ambient heat while releasing constant 4°C latent cold for up to 48 hours.',
    icon: Package,
    color: 'text-sky-400',
    borderColor: 'border-sky-500/30',
    bgColor: 'bg-sky-500/10',
  },
  {
    num: '03',
    title: 'Chemical Temperature Quality Verification',
    desc: 'Eliminating guesswork with irreversible color-change monitor strips inside every shipment to protect farmer capital.',
    icon: Thermometer,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
  },
  {
    num: '04',
    title: 'Express Interstate Route Optimization',
    desc: 'Coordinating with verified courier drivers to avoid midday holding delays and deliver directly to your state capital depot.',
    icon: ShieldCheck,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
  },
];

const FAQS = [
  {
    q: 'How does D-AminGrow guarantee the 2°C–8°C cold-chain during transit?',
    a: 'We utilize certified, high-density molded expanded polystyrene (EPS) biological shipping boxes packed with pre-conditioned phase-change ice gel bricks calibrated to maintain internal temperatures between 2°C and 8°C for up to 48 hours. Every shipment contains an irreversible chemical temperature indicator strip that visually confirms the biological never experienced thermal abuse.',
  },
  {
    q: 'What happens if a live poultry vaccine is exposed to room temperature?',
    a: 'Live attenuated viral vaccines (such as Newcastle LaSota and Gumboro Intermediate Plus) begin rapidly degrading when temperatures exceed 8°C. Exposure to ambient tropical temperatures (30°C–36°C) for just 1 to 2 hours neutralizes active viral titers. The farmer ends up administering inactive fluid, leaving the flock 100% unprotected against virulent field outbreaks.',
  },
  {
    q: 'Can poultry vaccines be delivered to any Nigerian state?',
    a: 'Yes. We operate an express nationwide distribution network shipping to all 36 Nigerian states and the FCT. Same-day and next-day deliveries are coordinated through priority interstate courier networks and dedicated motor park logistics hubs with real-time phone tracking.',
  },
  {
    q: 'Do you supply genuine NVRI Vom vaccines and international brands?',
    a: 'Yes. We stock authentic biologicals from the National Veterinary Research Institute (NVRI, Vom, Plateau State) as well as NAFDAC-registered international biological manufacturers including Boehringer Ingelheim, Ceva Santé Animale, and Hipra. All batches have verifiable manufacturing lot numbers and expiry dates.',
  },
  {
    q: 'What should I do if the temperature indicator strip indicates a temperature breach upon arrival?',
    a: 'If the chemical indicator strip inside your cold box has triggered or the ice bricks have completely liquefied, do not administer the vaccine to your birds. Take clear photographs of the strip and package interior immediately and contact our WhatsApp dispatch desk (+234 806 870 0074). We will replace the batch in accordance with our Cold-Chain Integrity Guarantee.',
  },
  {
    q: 'How do I place an urgent vaccine order and confirm dispatch?',
    a: 'You can select your required vaccine from our catalog on this page and connect directly with our cold-chain dispatch desk on WhatsApp. We confirm stock availability, pack your thermal box under refrigerated conditions, and provide you with transit waybill tracking details within 2 hours.',
  },
];

export default function ServiceVaccinesPage() {
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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-emerald-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-cyan-400 font-semibold">Vaccine Distribution</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label-dark">
                <Snowflake className="h-3.5 w-3.5 text-cyan-400" />
                Verified 2°C–8°C Cold-Chain Biological Transit
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading tracking-tight leading-tight">
                Cold-Chain Vaccine Delivery &amp; <br />
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  Controlled Temperature Logistics Services
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Never risk administering heat-degraded vaccines to your livestock. D-AminGrow ships live and killed poultry biologicals across all 36 Nigerian states inside heavy-duty insulated EPS thermal shippers with certified phase-change ice bricks and irreversible temperature verification monitors.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20need%20to%20order%20vaccines%20with%20cold-chain%20delivery."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Order Vaccines on WhatsApp</span>
                </a>
                <Link
                  href="/vaccines"
                  className="inline-flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-4 rounded-xl transition-all text-sm"
                >
                  <span>Full Vaccine Catalog</span>
                  <ArrowRight className="h-4 w-4 text-cyan-400" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>NVRI Vom &amp; NAFDAC Biologicals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Chemical Temperature Indicator Strip</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Express Dispatch to All 36 States</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Preserved Video Player */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl bg-slate-900">
                <MediaVideoPlayer
                  src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/Presentation%20on%20IBH%20vaccine.mp4"
                  poster="/products/Vaccines/ND lasota.jpeg"
                  title="Biological Presentation: Inclusion Body Hepatitis (IBH)"
                  badge="Cold-Chain Certified"
                  caption="Clinical veterinary overview on viral titer maintenance and cold storage transport"
                  aspectRatio="video"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prescription Warning Bar */}
      <div className="bg-amber-50 border-b border-amber-200 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <span className="font-bold">Veterinary Prescription Advisory:</span> All live and killed biologicals are dispensed under veterinary oversight. Vaccines must be administered strictly by trained personnel using aseptic instruments. Never expose biological vials to direct sunlight or chlorinated drinking water.
          </p>
        </div>
      </div>

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
                <div className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
                  {b.label}
                </div>
                <div className="text-xs text-slate-500 leading-snug">{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PROBLEM SECTION: SYSTEMIC COLD-CHAIN BREAKS IN NIGERIA
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            Biological Vulnerability in Nigerian Transit
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Why 55% of Live Poultry Vaccines Degrade Before Reaching the Pen
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Live virus vaccines are microscopic fragile organisms. Shipping them through unmonitored road transit without phase-change thermal engineering results in silent vaccine failure.
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
          INFORMATION GAIN MATRIX: COLD-CHAIN TRANSIT MATRIX
          ==================================================================== */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <Layers className="h-3.5 w-3.5 text-cyan-700" />
              Thermal Engineering Matrix
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Cold-Chain Transit Failure vs. Verified EPS Dispatch Matrix
            </h2>
            <p className="text-sm text-slate-600">
              Comparative analysis demonstrating how engineered thermal transit packaging preserves biological potency in tropical Nigerian climates.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-heading">
                  <th className="p-4 sm:p-5 font-bold">Logistics Parameter</th>
                  <th className="p-4 sm:p-5 font-bold">Standard Market Dispatch</th>
                  <th className="p-4 sm:p-5 font-bold">D-AminGrow Verified Cold-Chain</th>
                  <th className="p-4 sm:p-5 font-bold text-cyan-300">Flock Immunity Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {COLD_CHAIN_MATRIX.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{row.parameter}</td>
                    <td className="p-4 sm:p-5 text-red-700 bg-red-50/20">{row.marketDispatch}</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-800 bg-emerald-50/20">{row.damingrowColdChain}</td>
                    <td className="p-4 sm:p-5 font-semibold text-slate-900">{row.impact}</td>
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
            Biological Integrity Protocol
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            The D-AminGrow 4-Pillar Cold-Chain Protocol
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every vial we ship remains strictly within the 2°C–8°C physiological safety window from warehouse refrigerator to farm administration.
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
          PRESERVED 4 COLD-CHAIN STEPS
          ==================================================================== */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="section-label">
              <Snowflake className="h-3.5 w-3.5 text-cyan-700" />
              Packaging Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              How We Protect Your Vaccines During Interstate Transit
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLD_CHAIN_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="rounded-3xl bg-slate-50 border border-slate-200 p-7 space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className={`h-12 w-12 rounded-2xl ${step.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PRESERVED 7 VACCINES IN STOCK TABLE / CARDS
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="section-label">
              <Syringe className="h-3.5 w-3.5" />
              Verified In-Stock Biologicals
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Essential Avian Vaccines Available for Express Dispatch
            </h2>
            <p className="text-slate-600 text-sm">
              All biologicals are stored under verified 2°C–8°C conditions. Contact our cold-chain dispatch desk for current dose counts and price.
            </p>
          </div>

          <div className="space-y-4">
            {VACCINES.map((v, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-5 sm:p-6 transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${v.color}`}
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {v.sku}
                    </span>
                    <span className="text-xs font-semibold text-cyan-800">{v.type}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">{v.name}</h3>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                    <div>
                      <span className="font-semibold text-slate-800">Route: </span>
                      <span>{v.route}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Administration Age: </span>
                      <span>{v.age}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-2 sm:pt-0">
                  <a
                    href={`https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20${encodeURIComponent(v.name)}%20(${v.sku}).%20Please%20confirm%20dose%20availability%20and%20cold-chain%20delivery.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-5 py-2.5 rounded-xl transition-all text-xs shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Order Vaccine</span>
                  </a>
                </div>
              </div>
            ))}
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
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-700" />
              Honest Fit Assessment
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
              Our Vaccine Delivery Service May <span className="text-rose-600">Not</span> Be Right For You If...
            </h2>
            <p className="text-sm text-slate-600">
              We uphold rigid veterinary biological standards. We do not compromise cold-chain logistics to offer cheap, uninsulated courier shipping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Request Uninsulated Nylon Packaging to Save Money
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We will never ship biological vaccines in cheap nylon wraps or ordinary cardboard. If you decline insulated EPS coolers with phase-change bricks, we will not fulfill the order.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Do Not Have Reliable Refrigerator Backup on Farm
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our thermal boxes protect vaccines for 48 hours in transit. If your farm lacks an operating refrigerator (or solar backup) to store biologicals until administration, do not order before vaccine day.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Plan to Reconstitute Live Vaccines with Tap Water
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Municipal or borehole water containing residual chlorine instantly kills live viruses. Live vaccines must be mixed with chlorine-free water and skimmed milk powder (2g/L) to stabilize titers.
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
              <HelpCircle className="h-3.5 w-3.5 text-cyan-700" />
              Cold-Chain FAQs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions About Vaccine Cold-Chain Logistics
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
      <section className="py-20 bg-gradient-to-br from-[#050E08] via-slate-950 to-cyan-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 px-3.5 py-1 text-xs font-bold text-cyan-300">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>Guaranteed 2°C–8°C Thermal Transit Across Nigeria</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Order Poultry Vaccines with 100% Thermal Confidence
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Protect your flock immunity with verified biologicals from NVRI Vom and certified international manufacturers. Shipped in heavy-duty EPS coolers with chemical temperature verification strips.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%20Vaccine%20Desk%2C%20I%20need%20to%20order%20vaccines%20with%20verified%20cold-chain%20delivery."
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
              <PhoneCall className="h-5 w-5 text-cyan-400" />
              <span>Call Cold-Chain Logistics Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
