import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';
import {
  Feather,
  Truck,
  ShieldCheck,
  Thermometer,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  AlertTriangle,
  XCircle,
  HelpCircle,
  PhoneCall,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Day-Old Chick Sourcing Nigeria | Certified Hatchery Booking & Dispatch | D-AminGrow',
  description:
    'Book authentic day-old chicks in Nigeria from certified hatcheries. Commercial broilers, Zartech pullets, hybrid & local turkeys, and noiler chicks. Nationwide Monday and Thursday dispatch with 100% genuine parent-stock guarantee.',
  keywords: [
    'day old chick sourcing service nigeria',
    'commercial broiler day old chicks',
    'zartech pullets booking',
    'day old turkey poults',
    'noiler chicks sourcing',
    'certified hatchery booking agent',
    'day old chicks price list in nigeria today',
    'how to book zartech amo chi broilers in nigeria',
    'day old chicks delivery lagos ibadan abuja kano',
    'commercial pullet chick booking agent nigeria',
  ],
  alternates: {
    canonical: 'https://damingrow.com/services/chicks',
  },
  openGraph: {
    title: 'Day-Old Chick Sourcing Nigeria | Certified Hatchery Booking & Dispatch | D-AminGrow',
    description:
      'Direct primary allocation of day-old broilers, ISA Brown pullets, and turkey poults from Zartech, Amo, and Chi Farms. Nationwide ventilated dispatch.',
    url: 'https://damingrow.com/services/chicks',
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
      name: 'Which hatcheries does D-AminGrow source day-old chicks from?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We partner directly with certified tier-1 Nigerian primary breeding hatcheries, including Zartech Nigeria (Cobb 500 & ISA Brown), Amo Farm Sieberer Hatchery (Arbor Acres & Noiler), Chi Farms (Arbor Acres Plus), and Sayed Farms (Ross 308). We do not broker secondary black-market or unauthorized backyard hatcheries.',
      },
    },
    {
      '@type': 'Question',
      name: 'What days of the week are day-old chicks dispatched across Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial hatcheries operate standardized hatch pulls every Monday and Thursday. We dispatch climate-ventilated cartons from primary hatchery gates in Ibadan and Lagos on Mondays and Thursdays for same-day and overnight delivery to designated motor park transit hubs nationwide.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you guarantee that chicks do not suffocate or overheat during transit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chicks are packed in standard 50+1 heavy-gauge perforated cartons with moisture-absorbing wood wool and side ventilation holes. We partner with dedicated interstate express drivers who position cartons in elevated, well-ventilated bus compartments away from vehicle engines and heavy baggage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are day-old chicks vaccinated before dispatch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every commercial broiler and layer pullet carton receives mandatory Day-1 subcutaneous or automated in-ovo Marek’s Disease (HVT strain) vaccination at the hatchery before packing. Newcastle Disease (B1 strain) is either administered as a hatchery spray or scheduled for your Day-1 farm reception.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum order quantity for day-old chicks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The minimum order quantity is 1 carton (50 chicks + 1 bonus chick for broilers, pullets, and noilers; 30 poults for turkeys). Bulk farm orders of 20 to 100+ cartons receive priority hatchery allocation and direct vehicle waybills.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I confirm today’s chick price and book my cartons?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hatchery chick prices in Nigeria fluctuate weekly based on grain costs and parent-stock availability. Connect directly to our chick booking desk on WhatsApp (+234 806 870 0074) to receive current weekly price quotes and lock in your order 48 hours prior to hatch day.',
      },
    },
  ],
};

const OPERATIONAL_BENCHMARKS = [
  {
    value: 'Mon & Thu',
    label: 'Nationwide Hatch Pulls',
    detail: 'Synchronized weekly dispatch from primary breeding hubs',
  },
  {
    value: '100% 1st-Gen',
    label: 'Verified Parent Genetics',
    detail: 'Direct allocations from Zartech, Amo, Chi, and Sayed',
  },
  {
    value: '50 + 1 Bonus',
    label: 'Guaranteed Pack Count',
    detail: 'Ventilated cartons with factory-sealed hatchery tape',
  },
  {
    value: '36 States',
    label: 'Motor Park Logistics',
    detail: 'Waybill delivery to verified transit hubs across Nigeria',
  },
];

const PROBLEM_POINTS = [
  {
    title: 'Counterfeit Hatchery Cartons & Black-Market Stunted Runts',
    desc: 'Unscrupulous middlemen collect culled runt chicks or unmonitored backyard hatchlings and pack them into fake, discarded branded cartons (e.g. counterfeit Zartech or Amo boxes). Farmers invest millions in feed only to discover after 4 weeks that birds have zero genetic growth potential.',
    impact: 'Stunted 1.4kg 8-week weights & severe financial loss',
  },
  {
    title: 'Suffocation & Heat Exhaustion in Unventilated Transit',
    desc: 'Transporting day-old chicks inside sealed car boots or stuffed beneath market luggage causes rapid carbon dioxide poisoning and overheating above 40°C. Chicks arrive panting, severely dehydrated, and suffer 15% to 25% brooding mortality within the first 48 hours on farm.',
    impact: 'Up to 25% transit & first-week chick mortality',
  },
  {
    title: 'Vertical Transmission of Mycoplasma & Pullorum Disease',
    desc: 'Chicks sourced from substandard, unmonitored parent stock frequently carry vertically transmitted Mycoplasma gallisepticum and Salmonella pullorum directly from the breeding egg. Chicks hatch infected and spread acute respiratory disease throughout your brooder house.',
    impact: 'Chronic CRD, joint lameness & high culling rate',
  },
];

const BREED_BENCHMARK_MATRIX = [
  {
    breed: 'Cobb 500 / Arbor Acres (Broilers)',
    fourWeekWeight: '1.35 – 1.55 kg',
    targetHarvest: '2.4 – 2.8 kg at 6–7 Weeks',
    fcr: '1.60 – 1.72',
    yieldPotential: 'Maximum breast meat conformation',
    housingSystem: 'Deep litter or controlled tunnel house',
  },
  {
    breed: 'ISA Brown / Zartech (Layer Pullets)',
    fourWeekWeight: '320 – 360 g',
    targetHarvest: 'Point-of-Lay at 17–19 Weeks',
    fcr: '2.15 – 2.30 (to 18wks)',
    yieldPotential: '315 – 330 rich brown eggs / hen',
    housingSystem: '3-tier A-frame battery cage or deep litter',
  },
  {
    breed: 'Broad-Breasted White (Hybrid Turkey)',
    fourWeekWeight: '1.80 – 2.20 kg',
    targetHarvest: '7.0 – 10.0 kg at 16–20 Weeks',
    fcr: '2.30 – 2.70',
    yieldPotential: 'Premium festive & restaurant carcass yield',
    housingSystem: 'Spacious deep litter with double floor space',
  },
  {
    breed: 'Noiler Dual-Purpose Hybrid',
    fourWeekWeight: '650 – 850 g',
    targetHarvest: '2.0 – 2.4 kg meat + 160 eggs/yr',
    fcr: '2.10 – 2.45',
    yieldPotential: 'High foraging hardiness, low medication cost',
    housingSystem: 'Free-range, semi-intensive or deep litter',
  },
];

const CHICK_BREEDS = [
  {
    name: 'Commercial Broilers',
    strain: 'Cobb 500 / Arbor Acres / Ross 308',
    harvest: '2.2kg–2.8kg at 6–7 weeks',
    fcr: '1.60–1.75 FCR',
    pack: '50 + 1 bonus chicks per carton',
    emoji: '🐔',
    color: 'border-amber-200 bg-amber-50/50',
  },
  {
    name: 'Zartech Pullets',
    strain: 'ISA Brown / Zartech Certified Strains',
    harvest: '310–325 eggs per hen to 72 weeks',
    fcr: 'Peak lay 94%–96%',
    pack: '50 + 1 bonus pullets per carton',
    emoji: '🥚',
    color: 'border-yellow-200 bg-yellow-50/50',
  },
  {
    name: 'Hybrid Turkey Poults',
    strain: 'Broad-Breasted White Commercial Keets',
    harvest: '7kg–10kg at 16–20 weeks',
    fcr: '2.3–2.8 FCR',
    pack: '30 keets per carton',
    emoji: '🦃',
    color: 'border-orange-200 bg-orange-50/50',
  },
  {
    name: 'Local Turkey Poults',
    strain: 'Improved Indigenous Hardy Turkey Stock',
    harvest: '4.5kg–7kg festive market yield',
    fcr: 'High foraging resilience',
    pack: '30 poults in a carton',
    emoji: '🦃',
    color: 'border-emerald-200 bg-emerald-50/50',
  },
  {
    name: 'Noiler Chicks',
    strain: 'Dual-Yield Meat & Egg Hybrid',
    harvest: '1.8kg–2.3kg meat + 160-180 eggs/yr',
    fcr: '2.1–2.5 FCR',
    pack: '50 + 1 bonus in a carton',
    emoji: '🐓',
    color: 'border-green-200 bg-green-50/50',
  },
  {
    name: 'Hardy Cockerels',
    strain: 'Commercial Hardy Grower Cockerels',
    harvest: '2.0kg–2.5kg at 20–24 weeks',
    fcr: 'Low mortality, high holiday margins',
    pack: '50 + 1 bonus in a carton',
    emoji: '🐓',
    color: 'border-purple-200 bg-purple-50/50',
  },
];

const HATCHERIES = [
  'Amo Farm (Arbor Acres / Noiler)',
  'Zartech Nigeria (Cobb 500 / ISA Brown)',
  'Chi Farms (Arbor Acres Plus)',
  'Sayed Farms (Ross 308)',
];

const BOOKING_STEPS = [
  {
    step: '01',
    icon: MessageCircle,
    title: 'Contact Booking Desk',
    desc: 'Send your desired breed, number of cartons, and target delivery state to our WhatsApp coordinator.',
  },
  {
    step: '02',
    icon: CheckCircle2,
    title: 'Confirm Current Price & Allocation',
    desc: 'Receive confirmed weekly official hatchery pricing and reserve your primary allocation 48h prior.',
  },
  {
    step: '03',
    icon: Calendar,
    title: 'Lock Monday / Thursday Dispatch',
    desc: 'Complete payment to lock your carton allocation. Your batch number is registered with the hatchery.',
  },
  {
    step: '04',
    icon: Truck,
    title: 'Waybill Tracking & Farm Reception',
    desc: 'Receive direct driver phone contact and waybill details. Collect your active, healthy chicks at the designated depot.',
  },
];

const PILLARS = [
  {
    num: '01',
    title: 'Primary Hatchery Direct Allocation',
    desc: 'Zero middlemen or open-market brokers. Every carton is picked up directly at the primary hatchery loading dock with factory tamper-evident tape.',
    icon: ShieldCheck,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
  },
  {
    num: '02',
    title: 'Pre-Dispatch Clinical Vigour & Navel Inspection',
    desc: 'Screening chicks for bright alert eyes, dry uninfected navels, clean red-free hocks, and strong reflex response before interstate departure.',
    icon: CheckCircle2,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
  },
  {
    num: '03',
    title: 'Climate-Calibrated Ventilated Transit',
    desc: 'Partnering exclusively with commercial express drivers who position cartons in elevated, cross-ventilated compartments avoiding engine heat.',
    icon: Truck,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
  },
  {
    num: '04',
    title: 'Day-1 Brooding & Anti-Stress Protocol',
    desc: 'Delivering a tailored brooding guide with electrolyte and glucose reception formulas to ensure your flock hits 180g+ 7-day weights.',
    icon: Thermometer,
    color: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    bgColor: 'bg-rose-500/10',
  },
];

const FAQS = [
  {
    q: 'Which hatcheries does D-AminGrow source day-old chicks from?',
    a: 'We partner directly with certified tier-1 Nigerian primary breeding hatcheries, including Zartech Nigeria (Cobb 500 & ISA Brown), Amo Farm Sieberer Hatchery (Arbor Acres & Noiler), Chi Farms (Arbor Acres Plus), and Sayed Farms (Ross 308). We do not broker secondary black-market or unauthorized backyard hatcheries.',
  },
  {
    q: 'What days of the week are day-old chicks dispatched across Nigeria?',
    a: 'Commercial hatcheries operate standardized hatch pulls every Monday and Thursday. We dispatch climate-ventilated cartons from primary hatchery gates in Ibadan and Lagos on Mondays and Thursdays for same-day and overnight delivery to designated motor park transit hubs nationwide.',
  },
  {
    q: 'How do you guarantee that chicks do not suffocate or overheat during transit?',
    a: 'Chicks are packed in standard 50+1 heavy-gauge perforated cartons with moisture-absorbing wood wool and side ventilation holes. We partner with dedicated interstate express drivers who position cartons in elevated, well-ventilated bus compartments away from vehicle engines and heavy baggage.',
  },
  {
    q: 'Are day-old chicks vaccinated before dispatch?',
    a: 'Yes. Every commercial broiler and layer pullet carton receives mandatory Day-1 subcutaneous or automated in-ovo Marek’s Disease (HVT strain) vaccination at the hatchery before packing. Newcastle Disease (B1 strain) is either administered as a hatchery spray or scheduled for your Day-1 farm reception.',
  },
  {
    q: 'What is the minimum order quantity for day-old chicks?',
    a: 'The minimum order quantity is 1 carton (50 chicks + 1 bonus chick for broilers, pullets, and noilers; 30 poults for turkeys). Bulk farm orders of 20 to 100+ cartons receive priority hatchery allocation and direct vehicle waybills.',
  },
  {
    q: 'How do I confirm today’s chick price and book my cartons?',
    a: 'Hatchery chick prices in Nigeria fluctuate weekly based on grain costs and parent-stock availability. Connect directly to our chick booking desk on WhatsApp (+234 806 870 0074) to receive current weekly price quotes and lock in your order 48 hours prior to hatch day.',
  },
];

export default function ServiceChicksPage() {
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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-emerald-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Day-Old Chick Booking</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label-dark">
                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                Nationwide Dispatch — Every Monday &amp; Thursday
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading tracking-tight leading-tight">
                Day-Old Chick Sourcing Service in Nigeria: <br />
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 bg-clip-text text-transparent">
                  Certified Hatchery Broilers &amp; Pullets
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Avoid fake black-market cartons, stunted runts, and transit suffocation. D-AminGrow provides verified direct primary allocation from Zartech, Amo, Chi, and Sayed Farms. Pre-vaccinated, climate-monitored, and dispatched nationwide every Monday and Thursday.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20book%20day-old%20chicks.%20Please%20send%20this%20week's%20price%20list."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Book Chicks on WhatsApp</span>
                </a>
                <Link
                  href="/chicks"
                  className="inline-flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-4 rounded-xl transition-all text-sm"
                >
                  <span>Browse Chick Catalog</span>
                  <ArrowRight className="h-4 w-4 text-amber-400" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>100% Genuine Hatchery Tape</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Marek&apos;s Vaccinated at Hatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Interstate Waybill to All 36 States</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Preserved Live Chicks Video Player */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl bg-slate-900">
                <MediaVideoPlayer
                  src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/supreme%20pullets%20inside%20cartons.mp4"
                  poster="/products/Chicks/day old broiler.jpeg"
                  title="Hatchery Dispatch Cartons & Live Chicks"
                  badge="Mon & Thu Waybill"
                  caption="Ventilated 50+1 packaging with verified livability before interstate motor park departure"
                  aspectRatio="portrait"
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
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  {b.label}
                </div>
                <div className="text-xs text-slate-500 leading-snug">{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PROBLEM SECTION: DANGEROUS CHICK SOURCING PITFALLS
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            Chick Sourcing Hazards
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Why Cheap Open-Market Chicks Cost Nigerian Farmers Millions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A bird&apos;s genetic potential is permanently determined on Day 1. Sourcing from black-market middlemen or poor logistics ruins your feed conversion before brooding even starts.
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
          INFORMATION GAIN MATRIX: BREED PERFORMANCE BENCHMARKS
          ==================================================================== */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <Layers className="h-3.5 w-3.5 text-amber-700" />
              Genetic Performance Standards
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Commercial Poultry Breed Performance Benchmark Matrix (Nigeria 2026)
            </h2>
            <p className="text-sm text-slate-600">
              Audited tropical growth trajectories, feed conversion rates, and harvest projections for authentic commercial breeds sourced directly from tier-1 parent stock.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-heading">
                  <th className="p-4 sm:p-5 font-bold">Breed &amp; Commercial Strain</th>
                  <th className="p-4 sm:p-5 font-bold">4-Week Live Weight</th>
                  <th className="p-4 sm:p-5 font-bold">Target Harvest Age &amp; Weight</th>
                  <th className="p-4 sm:p-5 font-bold">Average Tropical FCR</th>
                  <th className="p-4 sm:p-5 font-bold">Commercial Yield Potential</th>
                  <th className="p-4 sm:p-5 font-bold">Recommended Housing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {BREED_BENCHMARK_MATRIX.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{row.breed}</td>
                    <td className="p-4 sm:p-5 font-mono">{row.fourWeekWeight}</td>
                    <td className="p-4 sm:p-5 font-bold text-amber-800">{row.targetHarvest}</td>
                    <td className="p-4 sm:p-5 font-mono font-bold text-emerald-700">{row.fcr}</td>
                    <td className="p-4 sm:p-5">{row.yieldPotential}</td>
                    <td className="p-4 sm:p-5 font-medium text-slate-800">{row.housingSystem}</td>
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
            Quality Assurance Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            The D-AminGrow 4-Pillar Chick Quality Guarantee
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From the incubator pull to your farm gate, our logistics protocol safeguards every bird against dehydration, chilling, and infection.
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
          PRESERVED AVAILABLE BREEDS CARDS
          ==================================================================== */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="section-label">
              <Feather className="h-3.5 w-3.5" />
              Available Varieties
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Commercial Day-Old Chick Varieties
            </h2>
            <p className="text-slate-600 text-sm">
              All varieties are pre-vaccinated at hatch, temperature-packed in 50+1 cartons, and dispatched weekly on Mondays and Thursdays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHICK_BREEDS.map((breed, i) => (
              <div key={i} className={`rounded-3xl border p-7 space-y-5 hover:shadow-xl transition-all ${breed.color} flex flex-col justify-between`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{breed.emoji}</span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">{breed.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{breed.strain}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs pt-2 border-t border-slate-200/60">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Harvest Target</span>
                      <span className="text-slate-900 font-bold">{breed.harvest}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Efficiency</span>
                      <span className="text-slate-900 font-bold">{breed.fcr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Pack Unit</span>
                      <span className="text-slate-900 font-bold">{breed.pack}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/60">
                  <a
                    href={`https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20book%20${encodeURIComponent(breed.name)}%20(${encodeURIComponent(breed.strain)}).%20Please%20confirm%20current%20price%20and%20next%20hatch%20availability.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-700 transition-colors shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Inquire Current Price &amp; Book</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Partner Hatcheries List */}
          <div className="pt-10 text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Certified Partner Breeding Hatcheries</p>
            <div className="flex flex-wrap justify-center gap-3">
              {HATCHERIES.map((h, i) => (
                <span key={i} className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-5 py-2.5 rounded-full">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PRESERVED 4-STEP BOOKING PROCESS
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="section-label">
            <Clock className="h-3.5 w-3.5 text-amber-700" />
            Simple Booking Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            How to Book Your Day-Old Chicks
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BOOKING_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="rounded-3xl bg-white border border-slate-200 p-7 space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-4xl font-extrabold text-slate-200 font-heading">{step.step}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          HONESTY FILTER: WE MAY NOT BE RIGHT FOR YOU IF...
          ==================================================================== */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-3">
            <div className="section-label">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />
              Honest Fit Assessment
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
              Our Chick Sourcing Service May <span className="text-rose-600">Not</span> Be Right For You If...
            </h2>
            <p className="text-sm text-slate-600">
              We exclusively allocate first-generation stock from certified commercial hatcheries. We do not participate in cut-price speculative grey-market trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Are Looking for Below-Market &apos;Discount&apos; Chicks
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Legitimate primary hatcheries maintain fixed official wholesale prices. If you are looking for cut-rate unbranded chicks from undocumented backyard incubators, our verified supply chain is not a fit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Fail to Prepare Brooders Prior to Delivery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Day-old chicks cannot wait for heaters or feed to be bought after arrival. If your brooder house is not pre-heated to 32°C–35°C with water and feed in place 4 hours before pickup, you will suffer chilling losses.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Attempt to Order on Hatch Day Morning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Primary hatchery allocations are locked 48 hours prior to Monday and Thursday hatches. We do not sell speculative left-over birds from transit holding depots.
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
              <HelpCircle className="h-3.5 w-3.5 text-amber-700" />
              Chick Sourcing FAQs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions About Day-Old Chick Sourcing in Nigeria
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
      <section className="py-20 bg-gradient-to-br from-[#050E08] via-slate-950 to-amber-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/30 px-3.5 py-1 text-xs font-bold text-amber-300">
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            <span>Lock Next Monday or Thursday Hatch Dispatch</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Secure Authentic First-Generation Day-Old Chicks
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Contact our booking coordinator today for this week&apos;s confirmed live chick prices and reserve your cartons for nationwide dispatch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20book%20day-old%20chicks%20for%20the%20upcoming%20hatch."
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
              <PhoneCall className="h-5 w-5 text-amber-400" />
              <span>Call Chick Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
