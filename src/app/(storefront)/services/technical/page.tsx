import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';
import {
  Syringe,
  Stethoscope,
  ShieldCheck,
  Thermometer,
  Droplets,
  HeartPulse,
  CheckCircle2,
  MessageCircle,
  Phone,
  ArrowRight,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Award,
  Wrench,
  Users,
  Sparkles,
  AlertTriangle,
  XCircle,
  HelpCircle,
  PhoneCall,
  Layers,
  Flame,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Poultry Farm Technical Support Nigeria | On-Farm Diagnostics & Setup | D-AminGrow',
  description:
    'Certified on-farm poultry technical services across Nigeria. Professional livestock vaccination administration, post-mortem disease diagnostics, nipple drinker flushing, and brooder calibration.',
  keywords: [
    'poultry farm technical support nigeria',
    'on-farm veterinary technical services',
    'broiler vaccination team',
    'poultry farm post-mortem diagnostics',
    'drinker line acid flushing',
    'gas brooder calibration',
    'poultry farm technical services in nigeria',
    'on-farm poultry vaccination services lagos oyo ogun',
    'veterinary technician farm visit nigeria',
    'poultry equipment installation and maintenance support',
  ],
  alternates: {
    canonical: 'https://damingrow.com/services/technical',
  },
  openGraph: {
    title: 'Poultry Farm Technical Support Nigeria | On-Farm Diagnostics & Setup | D-AminGrow',
    description:
      'Professional on-farm vaccination, post-mortem pathology diagnostics, biosecurity audits, and drinker line flushing by licensed veterinary technicians across Nigeria.',
    url: 'https://damingrow.com/services/technical',
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
      name: 'What specific on-farm technical services do D-AminGrow technicians provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our certified field technicians deliver 6 primary on-site services: aseptic live and killed vaccine administration (eye drop, wing web stab, subcutaneous, intramuscular), on-farm post-mortem necropsy diagnostics, biosecurity infrastructure audits, high-pressure organic acid waterline flushing, infrared gas brooder calibration, and flock health screening.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can a technical team be dispatched to my poultry farm?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For scheduled vaccination programs, equipment installation, and waterline flushing, visits are scheduled within 24 to 48 hours across Lagos, Ogun, Oyo, Osun, Kwara, Edo, and nationwide. For acute flock mortality emergencies, our clinical WhatsApp desk initiates virtual triage within 2 hours and arranges rapid technician dispatch.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do your technicians bring their own vaccination equipment and cold chain carriers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our field teams arrive fully equipped with calibrated continuous automatic syringes, sterile needle gauges, wing-web stab applicators, coarse sprayers, and phase-change insulated EPS cold boxes with verified 2°C–8°C thermal packs to preserve vaccine titer viability on site.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is professional on-farm vaccination better than administering it with farm hands?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Over 60% of field vaccine failures in Nigeria occur due to improper administration by farm laborers—such as mixing live vaccines in chlorinated water, exposing vials to direct sunlight, missing bird eyes during drop delivery, or failing to prime oil-emulsion killed injectables at the proper breast angle. Professional administration guarantees 100% seroconversion.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often should commercial nipple drinking lines be flushed with organic acids?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Waterlines should receive a terminal high-pressure shock flush between batches using stabilized hydrogen peroxide or organic acids (formic and propionic acid) to completely strip bacterial biofilms and mineral scale. During production, a weekly low-dose line flush prevents nipple pin clogs and suppresses E. coli.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documentation do I receive after a technical farm visit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Within 24 hours of every farm visit, you receive a formal written Clinical Field Technical Report via WhatsApp and email, detailing vaccination batch numbers, post-mortem gross lesion findings, water pressure settings, and prioritized remedial recommendations signed by our lead veterinary clinician.',
      },
    },
  ],
};

const OPERATIONAL_BENCHMARKS = [
  {
    value: '36 States',
    label: 'Nationwide Field Reach',
    detail: 'Field technicians deployed across all Nigerian geopolitical zones',
  },
  {
    value: '100% VCN Standard',
    label: 'Veterinary Supervision',
    detail: 'Every field protocol authored and monitored by licensed clinicians',
  },
  {
    value: '24–48 Hours',
    label: 'Rapid Field Dispatch',
    detail: 'Quick turnaround for on-site vaccination and equipment calibration',
  },
  {
    value: '500+ Outreaches',
    label: 'Commercial Farms Serviced',
    detail: 'Broiler sheds, layer batteries, and turkey breeder installations',
  },
];

const PROBLEM_POINTS = [
  {
    title: 'Amateur Vaccine Handling Destroying Live Viral Titers',
    desc: 'Farm attendants frequently dissolve freeze-dried Newcastle (LaSota) or Gumboro vaccines in untreated, chlorinated municipal or tap water, which instantly kills the live attenuated virus. Exposing reconstituted vials to hot pen temperatures above 25°C neutralizes protective antigens within 45 minutes, leaving the entire flock completely unprotected.',
    impact: '100% vaccine failure & devastating viral outbreaks',
  },
  {
    title: 'Clogged Nipple Drinker Lines & Invisible Biofilms',
    desc: 'High mineral hardness and organic sediment create thick bacterial biofilms inside enclosed PVC drinking lines. Nipple pins become stiff or completely blocked, causing 20% to 30% of chicks to suffer dehydration and severe uniform weight depression that no expensive feed can overcome.',
    impact: 'Stunted flock uniformity & chronic E. coli enteritis',
  },
  {
    title: 'Improper Gas Brooder Calibration & Lethal Floor Chilling',
    desc: 'Placing infrared gas brooders too high or running uncalibrated gas regulators creates cold floor zones below 28°C during the critical first 72 hours. Chilled chicks huddle, absorb yolk sacs improperly, develop severe ascites (water belly), and suffer massive first-week mortality spikes.',
    impact: 'Up to 8% first-week mortality and permanent stunting',
  },
];

const TECHNICAL_SPEC_MATRIX = [
  {
    service: 'On-Farm Precision Vaccination',
    system: 'Newcastle, Gumboro, Fowl Pox, Coryza, EDS',
    equipment: 'Calibrated automatic syringes, eye-droppers, EPS cold-box',
    clinicalObjective: '100% flock seroconversion without thermal shock',
    deliverable: 'Signed vaccination certificate & titer booster schedule',
  },
  {
    service: 'Post-Mortem Necropsy Diagnostics',
    system: 'Acute flock mortality & sudden drop in lay',
    equipment: 'Aseptic necropsy surgical kit, organ specimen containers',
    clinicalObjective: 'Identify primary pathogen & gross pathological lesions',
    deliverable: 'Formal necropsy dossier with differential treatment plan',
  },
  {
    service: 'High-Pressure Waterline Descaling',
    system: 'Nipple drinking systems & bell drinker lines',
    equipment: 'Organic acid flush pump, pressure regulator gauges',
    clinicalObjective: 'Complete removal of bacterial biofilm & calcium scale',
    deliverable: 'Pre/post water flow log & sanitized waterline audit',
  },
  {
    service: 'Radiant Gas Brooder Calibration',
    system: 'Canopy infrared gas brooders & heat radiators',
    equipment: 'Digital thermal infrared laser gun, gas pressure gauges',
    clinicalObjective: 'Ensure continuous 32°C–35°C floor temperature zone',
    deliverable: 'Brooding microclimate map & gas consumption guide',
  },
];

const TECH_SERVICES = [
  {
    icon: Syringe,
    title: 'On-Farm Vaccination Administration',
    desc: 'Precision vaccination by certified field technicians using aseptic technique. Covers eye-drop, subcutaneous, intramuscular, wing-web stab, coarse spray, and drinking-water routes for Newcastle, Gumboro, Marek\'s, Fowl Pox, Coryza, and triple killed biologicals.',
    color: 'bg-emerald-100 text-emerald-700',
    deliverables: ['Signed vaccination record sheet', 'Titer monitoring protocol', 'Follow-up booster calendar'],
  },
  {
    icon: Stethoscope,
    title: 'Post-Mortem Disease Diagnostics',
    desc: 'Field necropsy and gross lesion evaluation to identify the exact cause of elevated flock mortality, production drop, or respiratory distress. Includes targeted tissue sampling for laboratory microbiological confirmation.',
    color: 'bg-violet-100 text-violet-700',
    deliverables: ['Written necropsy pathology report', 'Differential diagnosis list', 'Targeted prescription protocol'],
  },
  {
    icon: ShieldCheck,
    title: 'Biosecurity Audit & Farm Setup',
    desc: 'Comprehensive on-site inspection evaluating visitor control gates, disinfectant footbath stations, water chlorination systems, dead bird disposal pits, and wild bird exclusion netting. Includes prioritized remediation steps.',
    color: 'bg-cyan-100 text-cyan-700',
    deliverables: ['Biosecurity risk index scorecard', 'Barrier remediation action plan', 'Disinfection chemical protocol'],
  },
  {
    icon: Thermometer,
    title: 'Gas Brooder Calibration & Setup',
    desc: 'On-site installation, gas pressure regulator calibration, and thermal mapping for infrared canopy and flat-deck gas brooders. Ensures optimal 32°C–35°C floor temperature for day-old chick reception and maximum first-week livability.',
    color: 'bg-amber-100 text-amber-700',
    deliverables: ['Brooding zone thermal floor map', 'Gas pressure setting log', 'Chick arrival brooding checklist'],
  },
  {
    icon: Droplets,
    title: 'Nipple Drinker Line Flushing & Calibration',
    desc: 'Full waterline flushing with organic acids and stabilized hydrogen peroxide to strip stubborn bacterial biofilm and mineral scale. Pressure calibration ensures correct flow rates per bird age for optimal hydration.',
    color: 'bg-sky-100 text-sky-700',
    deliverables: ['Pre/post water flow comparison', 'Pressure regulator calibration log', 'Water sanitization schedule'],
  },
  {
    icon: HeartPulse,
    title: 'Flock Health Screening & Advisory',
    desc: 'Systematic clinical examination of random bird samples for early detection of respiratory rales, lameness, feather abnormalities, and comb pallor. Generates an early intervention plan before mortality peaks.',
    color: 'bg-rose-100 text-rose-700',
    deliverables: ['Clinical flock health scorecard', 'Risk-flagged bird identification', 'Targeted preventive advisory'],
  },
];

const PILLARS = [
  {
    num: '01',
    title: 'Aseptic Cold-Chain Vaccine Administration',
    desc: 'Protecting biological titer viability from distribution refrigerator to the bird eye, ensuring strict needle sterilization and correct injection angles.',
    icon: Syringe,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
  },
  {
    num: '02',
    title: 'Clinical Necropsy & Gross Pathology Profiling',
    desc: 'Conducting systematic on-farm post-mortem examinations to identify pathognomonic lesions in proventriculus, bursa, caeca, and air sacs within 2 hours.',
    icon: Stethoscope,
    color: 'text-violet-400',
    borderColor: 'border-violet-500/30',
    bgColor: 'bg-violet-500/10',
  },
  {
    num: '03',
    title: 'Hydraulic Waterline Biofilm Stripping & Descaling',
    desc: 'Utilizing specialized chemical flushes to dissolve stubborn biofilms and mineral salts, ensuring every bird receives clean, high-flow water.',
    icon: Droplets,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
  },
  {
    num: '04',
    title: 'Precision Microclimate & Brooder Calibration',
    desc: 'Deploying digital infrared laser thermometry to calibrate floor-level brooding heat and cross-ventilation airflow to eliminate chilling stress.',
    icon: Thermometer,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
  },
];

const FAQS = [
  {
    q: 'What specific on-farm technical services do D-AminGrow technicians provide?',
    a: 'Our certified field technicians deliver 6 primary on-site services: aseptic live and killed vaccine administration (eye drop, wing web stab, subcutaneous, intramuscular), on-farm post-mortem necropsy diagnostics, biosecurity infrastructure audits, high-pressure organic acid waterline flushing, infrared gas brooder calibration, and flock health screening.',
  },
  {
    q: 'How quickly can a technical team be dispatched to my poultry farm?',
    a: 'For scheduled vaccination programs, equipment installation, and waterline flushing, visits are scheduled within 24 to 48 hours across Lagos, Ogun, Oyo, Osun, Kwara, Edo, and nationwide. For acute flock mortality emergencies, our clinical WhatsApp desk initiates virtual triage within 2 hours and arranges rapid technician dispatch.',
  },
  {
    q: 'Do your technicians bring their own vaccination equipment and cold chain carriers?',
    a: 'Yes. Our field teams arrive fully equipped with calibrated continuous automatic syringes, sterile needle gauges, wing-web stab applicators, coarse sprayers, and phase-change insulated EPS cold boxes with verified 2°C–8°C thermal packs to preserve vaccine titer viability on site.',
  },
  {
    q: 'Why is professional on-farm vaccination better than administering it with farm hands?',
    a: 'Over 60% of field vaccine failures in Nigeria occur due to improper administration by farm laborers—such as mixing live vaccines in chlorinated water, exposing vials to direct sunlight, missing bird eyes during drop delivery, or failing to prime oil-emulsion killed injectables at the proper breast angle. Professional administration guarantees 100% seroconversion.',
  },
  {
    q: 'How often should commercial nipple drinking lines be flushed with organic acids?',
    a: 'Waterlines should receive a terminal high-pressure shock flush between batches using stabilized hydrogen peroxide or organic acids (formic and propionic acid) to completely strip bacterial biofilms and mineral scale. During production, a weekly low-dose line flush prevents nipple pin clogs and suppresses E. coli.',
  },
  {
    q: 'What documentation do I receive after a technical farm visit?',
    a: 'Within 24 hours of every farm visit, you receive a formal written Clinical Field Technical Report via WhatsApp and email, detailing vaccination batch numbers, post-mortem gross lesion findings, water pressure settings, and prioritized remedial recommendations signed by our lead veterinary clinician.',
  },
];

export default function TechnicalServicesPage() {
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
            <span className="text-emerald-400 font-semibold">Technical Services</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label-dark">
                <Wrench className="h-3.5 w-3.5 text-emerald-400" />
                Certified On-Farm Technical Operations &amp; Diagnostics
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading tracking-tight leading-tight">
                Poultry Farm Technical Support in Nigeria: <br />
                <span className="text-gradient-green">On-Farm Vaccination &amp; Diagnostics</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Eliminate catastrophic vaccine failures, clogged waterline dehydration, and delayed outbreak diagnoses. Certified D-AminGrow veterinary field technicians provide professional on-site vaccination, post-mortem necropsy, and equipment calibration across all 36 Nigerian states.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20need%20to%20book%20an%20on-farm%20technical%20service%20visit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Book Technical Visit on WhatsApp</span>
                </a>
                <a
                  href="tel:+2348068700074"
                  className="inline-flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-4 rounded-xl transition-all text-sm"
                >
                  <PhoneCall className="h-4 w-4 text-emerald-400" />
                  <span>Call Operations Desk (+234 806 870 0074)</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>100% VCN Veterinary Supervision</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>24–48h Nationwide Field Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Calibrated Sterile Field Kits</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Preserved Video Player */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-emerald-500/30 overflow-hidden shadow-2xl bg-slate-900">
                <MediaVideoPlayer
                  src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/fully%20automated%20battery%20cage%20system.mp4"
                  poster="/products/Acessories/Battery cage.jpeg"
                  title="Industrial Automated Poultry Housing"
                  badge="Engineering & Installation"
                  caption="Motorized feeding, automated egg collection, and nipple line calibration in commercial operations"
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
          PROBLEM SECTION: SYSTEMIC TECHNICAL MISTAKES
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            Field Operational Failures
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Why Untrained Labor Triggers 60% of Farm Vaccination Failures
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Vaccines are delicate biological products, not routine minerals. When administered by casual farm laborers using tap water or dirty needles, protective immunity is destroyed.
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
          INFORMATION GAIN MATRIX: TECHNICAL SERVICES PROTOCOLS
          ==================================================================== */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              Field Operational Protocols
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              On-Farm Technical Service Protocols &amp; Operational Deliverables
            </h2>
            <p className="text-sm text-slate-600">
              Clear clinical procedures, specialized equipment deployed, and written documentation provided to farm managers after every on-site technical engagement.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-heading">
                  <th className="p-4 sm:p-5 font-bold">Service Category</th>
                  <th className="p-4 sm:p-5 font-bold">Target Pathogen / System</th>
                  <th className="p-4 sm:p-5 font-bold">Specialized Equipment Deployed</th>
                  <th className="p-4 sm:p-5 font-bold">Primary Clinical Objective</th>
                  <th className="p-4 sm:p-5 font-bold">Post-Visit Deliverable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {TECHNICAL_SPEC_MATRIX.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{row.service}</td>
                    <td className="p-4 sm:p-5">{row.system}</td>
                    <td className="p-4 sm:p-5 font-mono">{row.equipment}</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-700">{row.clinicalObjective}</td>
                    <td className="p-4 sm:p-5 font-medium text-slate-900">{row.deliverable}</td>
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
            Field Operational Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            The D-AminGrow 4-Pillar Technical Support Framework
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We bridge the gap between theoretical veterinary advice and physical hands-on pen execution.
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
          PRESERVED 6 TECHNICAL SERVICE CARDS WITH DIRECT WHATSAPP ACTION
          ==================================================================== */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="section-label">
              <Star className="h-3.5 w-3.5" />
              On-Site Service Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              6 Expert Technical Services Delivered On Your Farm
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Delivered by certified professionals using calibrated aseptic equipment, followed by written documentation and priority follow-up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="rounded-3xl bg-slate-50 border border-slate-200 p-7 space-y-5 hover:shadow-xl hover:border-emerald-300 transition-all group flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className={`h-14 w-14 rounded-2xl ${service.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading mb-2">{service.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{service.desc}</p>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Deliverables</div>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {service.deliverables.map((item, idx) => (
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
                      href={`https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20book%20the%20${encodeURIComponent(service.title)}%20service%20for%20my%20farm.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Book Service on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
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
              Our On-Farm Technical Services May <span className="text-rose-600">Not</span> Be Right For You If...
            </h2>
            <p className="text-sm text-slate-600">
              We deploy licensed veterinary technicians who follow strict biosecurity protocols. We do not compromise on clinical standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Refuse Biosecure Footbaths &amp; Protective Gowning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our technicians bring their own sterile coveralls and disinfected boots. If a facility refuses our decontamination entry requirements, our technicians will decline entry to prevent pathogen contamination.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Want Vaccines Administered to Moribund Dying Flocks
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We will not vaccinate flocks actively suffering from acute Newcastle or Gumboro viremia. Injecting live vaccines into dying birds accelerates death; our team will advise emergency supportive therapy first.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Expect Free Physical Farm Callouts Without Scheduling
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mobilizing veterinary technicians, cold chain transport, and sterilized equipment across states requires scheduled logistics and committed clinical dispatch fees.
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
              Technical Support FAQs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions About Technical Farm Services
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
            <span>24–48 Hour On-Farm Technician Dispatch</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Deploy Certified Technicians to Your Farm Today
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Ensure flawless vaccination compliance, eliminate waterline bio-slimes, and secure precise post-mortem diagnostics. Schedule your on-farm technical visit with D-AminGrow today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20schedule%20a%20technical%20farm%20visit."
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
              <span>Call Technical Operations Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
