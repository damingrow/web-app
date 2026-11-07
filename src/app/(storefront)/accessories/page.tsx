import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';
import {
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Star,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Droplets,
  Box,
  Wrench,
  ChevronRight,
  Building,
  Truck,
  XCircle,
  TrendingDown,
  Info,
  Zap,
  MapPin,
  BookOpen,
  Calculator,
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
      name: 'What poultry equipment does D-AminGrow supply in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'D-AminGrow supplies commercial-grade poultry equipment including: LPG infrared canopy gas brooders (up to 1,000 chicks per unit), automatic bell and nipple drinker systems, A-frame hot-dip galvanized layer battery cages (3-tier), conical hanging feeders, stainless steel defeathering plucker machines, HDPE live bird transport crates, and 30-egg plastic holding trays. All equipment is commercial grade with nationwide delivery.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many chicks can a standard gas brooder heat in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A standard LPG infrared radiant canopy gas brooder with 20,000–25,000 BTU output can heat 500–1,000 day-old chicks in a controlled brooding environment at ambient temperatures of 25–32°C (typical Nigerian dry season). For cold harmattan nights, reduce stocking density to 500 chicks per brooder. For warmer wet season conditions, up to 1,000 chicks per brooder is acceptable. Use D-AminGrow\'s free brooder sizing calculator at /calculators/brooder.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between automatic bell drinkers and nipple drinkers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bell drinkers (Plasson/float-valve type) are open-cup drinkers that maintain water level automatically — easier for young chicks to access but prone to litter contamination. Nipple drinkers are closed-pipe 360° systems where birds activate water release by pecking — higher biosecurity, zero litter contamination, and better for large commercial flocks. D-AminGrow supplies both. Nipple systems are recommended for commercial layer and broiler flocks above 2,000 birds.',
      },
    },
    {
      '@type': 'Question',
      name: 'What type of battery cage is best for layer production in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'D-AminGrow supplies A-frame multi-tier hot-dip galvanized layer battery cages (typically 3–4 tiers). Hot-dip galvanization provides superior rust resistance compared to electro-galvanized alternatives — critical for Nigeria\'s humid climate. Standard commercial specification: 450–480 cm² per bird floor space, slanted wire floor for egg rolling, automated egg collection trough, and integrated nipple drinker line.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can D-AminGrow deliver poultry equipment to Ibadan, Lagos, or Abuja?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. D-AminGrow delivers poultry equipment nationwide across all 36 Nigerian states. Delivery fees vary by size, weight, and destination state. Contact us via WhatsApp to get a delivery quote and lead time for your specific equipment order.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I calculate the right brooder quantity for my chick flock?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use our free brooder sizing calculator at D-AminGrow.com/calculators/brooder. Input your flock size, housing dimensions, and ambient temperature. The calculator outputs the number of brooders required, recommended brooder height, and supplemental heating duration based on your location\'s seasonal temperature profile.',
      },
    },
  ],
};

// ============================================================
// DATA
// ============================================================

const BENCHMARKS = [
  { label: 'Equipment Types', value: '10+', sub: 'brooders to cages', color: 'text-emerald-400' },
  { label: 'Delivery Coverage', value: '36 States', sub: 'nationwide Nigeria', color: 'text-cyan-400' },
  { label: 'Build Standard', value: '100%', sub: 'commercial grade', color: 'text-amber-400' },
  { label: 'Battery Cage Grade', value: 'Hot-Dip', sub: 'galvanized — rust-resistant', color: 'text-emerald-400' },
];

const EQUIPMENT_TYPES = [
  {
    icon: Flame,
    title: 'Brooding Equipment',
    desc: 'LPG infrared radiant canopy gas brooders providing gentle, uniform heat for up to 1,000 day-old chicks per unit.',
    items: ['Gas Brooder Heaters (Canopy Type)', 'Chick Brooding Feeding Trays', 'Thermometers & Temp Controllers'],
    color: 'bg-orange-100 text-orange-700',
  },
  {
    icon: Droplets,
    title: 'Drinkers & Water Systems',
    desc: 'Complete poultry water solutions from automatic bell drinkers to closed-pipe stainless steel nipple drinker systems.',
    items: ['Automatic Bell Drinkers (Plasson)', '360° Nipple Drinkers with Drip Cups', 'Water Pressure Regulators'],
    color: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Building,
    title: 'Cages & Housing',
    desc: 'Hot-dip galvanized A-frame multi-tier battery cage systems for commercial layer operations with automated feeding.',
    items: ['A-Frame Layer Battery Cages (3-Tier)', 'Galvanized Layer Frames', 'Automated Egg Collection Troughs'],
    color: 'bg-slate-100 text-slate-700',
  },
  {
    icon: Box,
    title: 'Feeders & Feed Management',
    desc: 'Conical hanging feeders, breeder feeders, and brooder tray systems to eliminate feed wastage and improve FCR.',
    items: ['Conical Hanging Poultry Feeders', 'Breeder Hanging Feeders', 'Chick Starter Brooder Trays'],
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Wrench,
    title: 'Processing Equipment',
    desc: 'Commercial stainless steel defeathering plucker machines for high-throughput abattoir and farm processing operations.',
    items: ['SS Defeathering Plucker Machines', 'Auto Continuous Vaccinator Syringes', 'Needle Sets'],
    color: 'bg-teal-100 text-teal-700',
  },
  {
    icon: Truck,
    title: 'Transport & Storage',
    desc: 'HDPE perforated live bird transport crates and reusable plastic egg holding trays for safe farm-to-market transit.',
    items: ['Live Bird Transport Crates (HDPE)', 'Poultry Transfer Cages', 'Plastic 30-Egg Holding Trays'],
    color: 'bg-emerald-100 text-emerald-700',
  },
];

const FAILURE_POINTS = [
  {
    icon: TrendingDown,
    title: 'Under-powered brooders causing chick pile-up mortality',
    desc: 'A brooder with insufficient BTU output creates cold zones that push chicks to pile-up under heat source — crushing and smothering deaths that can reach 5–8% of flock in the first 7 days.',
  },
  {
    icon: AlertTriangle,
    title: 'Electro-galvanized cages rusting in 12–18 months',
    desc: 'Cheap electro-galvanized battery cages start rust streaking within 12 months in humid Nigerian environments. Hot-dip galvanized cages resist rust for 7–10+ years under the same conditions.',
  },
  {
    icon: XCircle,
    title: 'Open bell drinkers contaminating litter and feed',
    desc: 'Open drinker cups in deep litter systems collect droppings and litter, creating a reservoir for Salmonella, E. coli, and Eimeria. Closed nipple systems eliminate this contamination pathway entirely.',
  },
  {
    icon: TrendingDown,
    title: 'Under-specification feeders driving feed waste',
    desc: 'Feeder pan lip depth of less than 25mm and no anti-scratch mechanism leads to 8–15% feed wastage — equivalent to wasting ₦40,000–₦80,000 per 1,000-bird flock per cycle on feed alone.',
  },
];

const PILLARS = [
  {
    num: '01',
    icon: ShieldCheck,
    title: 'Commercial-Grade Build Standard',
    desc: 'Every piece of equipment we supply is commercial grade — not consumer hobby specifications. Hot-dip galvanized where it matters.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    num: '02',
    icon: Calculator,
    title: 'Free Equipment Sizing Calculators',
    desc: 'Our brooder sizing, stocking density, and water pressure calculators ensure you buy exactly the right quantity and specification.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    num: '03',
    icon: Zap,
    title: 'Video-Verified Operation',
    desc: 'Every equipment category has real field footage — automated cage feeding, brooder heat zones, nipple drinker operation — before you order.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    num: '04',
    icon: Truck,
    title: 'Nationwide Delivery',
    desc: 'Equipment delivered to your farm gate across all 36 Nigerian states. Contact us for delivery cost and lead time by state.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
];

// INFORMATION GAIN: Brooder Heat Output Calculation
const BROODER_SPECS = [
  { type: 'Standard LPG Canopy Brooder', btu: '18,000–22,000 BTU', chicks: '500 chicks', tempRange: 'Ambient 25°C+', season: 'Wet season', note: 'Adequate in warm periods' },
  { type: 'High-Output LPG Canopy Brooder', btu: '23,000–28,000 BTU', chicks: '800–1,000 chicks', tempRange: 'Ambient 20°C+', season: 'Year-round', note: 'Standard commercial recommendation' },
  { type: 'Dual Brooder Setup', btu: '46,000–56,000 BTU', chicks: '2,000 chicks', tempRange: 'Ambient 18°C+', season: 'Harmattan', note: 'Required for harmattan cold nights' },
  { type: 'Triple Brooder Setup', btu: '70,000–85,000 BTU', chicks: '3,000 chicks', tempRange: 'Ambient 15°C+', season: 'Year-round', note: 'Large commercial batches' },
  { type: 'Electric Infrared Panel (backup)', btu: 'Variable', chicks: '200–400 chicks', tempRange: 'All', season: 'Backup only', note: 'High operational cost — LPG preferred' },
];

const HONESTY_FILTERS = [
  'You need 1-day delivery for large equipment like battery cage systems — lead times for large cage orders are 7–14 days.',
  'You are starting with fewer than 200 birds and want commercial battery cage systems — this scale is not economically viable for cage housing.',
  'You want equipment without any delivery fee regardless of location — delivery fees vary by weight, size, and state.',
  'You need installation teams — we supply equipment; installation is your responsibility or through a local contractor.',
];

const FAQ_DISPLAY = [
  {
    q: 'What poultry equipment does D-AminGrow supply?',
    a: 'LPG gas brooders, automatic bell & nipple drinkers, A-frame galvanized battery cages, conical hanging feeders, stainless steel defeathering machines, HDPE transport crates, and 30-egg plastic trays.',
  },
  {
    q: 'How many chicks can one gas brooder heat?',
    a: 'A standard 20,000–25,000 BTU canopy brooder heats 500–1,000 day-old chicks in Nigerian ambient temperatures. Use our free brooder sizing calculator for exact quantities.',
  },
  {
    q: 'Bell drinkers vs nipple drinkers — which is better?',
    a: 'Bell (float-valve) drinkers are easier for young chicks but prone to litter contamination. Closed nipple drinkers are biosecurity-superior and recommended for commercial flocks above 2,000 birds.',
  },
  {
    q: 'What type of battery cage resists rust best?',
    a: 'Hot-dip galvanized A-frame cages resist rust for 7–10+ years in Nigerian humidity vs 12–18 months for electro-galvanized alternatives. D-AminGrow supplies hot-dip galvanized systems.',
  },
  {
    q: 'Can you deliver to Lagos, Ibadan, or Abuja?',
    a: 'Yes — nationwide across all 36 states. Delivery fees vary by size, weight, and destination. Contact us on WhatsApp for a delivery quote.',
  },
  {
    q: 'How do I calculate the right brooder quantity?',
    a: 'Use our free brooder sizing calculator at /calculators/brooder — input flock size, housing dimensions, and ambient temperature to get the exact number needed.',
  },
];

// ============================================================
// PAGE METADATA
// ============================================================
export const metadata: Metadata = {
  title: 'Poultry Equipment & Accessories in Nigeria | Commercial Housing & Tools | D-AminGrow',
  description:
    'Buy commercial-grade poultry equipment in Nigeria: battery cages, gas brooders, automatic drinkers, hanging feeders, defeathering machines, and transport crates. Hot-dip galvanized. Nationwide delivery.',
  openGraph: {
    title: 'Poultry Equipment & Accessories in Nigeria | D-AminGrow',
    description: 'Gas brooders, battery cages, nipple drinkers, feeders, plucker machines & transport crates. Hot-dip galvanized. Nationwide Nigeria delivery.',
  },
};

// ============================================================
// PAGE COMPONENT
// ============================================================
export default function AccessoriesPage() {
  const accessories = getProductsByCategory('accessories');

  return (
    <div className="font-body">

      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* ====================================================================
          DISPATCH NOTIFICATION BAR
          ==================================================================== */}
      <div className="bg-emerald-950 border-b border-emerald-900/60 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-emerald-300 font-medium">
          <span className="flex items-center gap-1.5">
            <Building className="h-3.5 w-3.5 text-emerald-400" />
            100% commercial-grade poultry equipment
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
            Hot-dip galvanized battery cages — rust-resistant for 7–10 years
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            Nationwide Nigeria delivery — Lagos · Ibadan · Abuja · Kano
          </span>
        </div>
      </div>

      {/* ====================================================================
          HERO — 12-col grid, left 7 / right 5
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-slate-400/4 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Poultry Accessories</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* LEFT — 7 cols */}
            <div className="lg:col-span-7 space-y-5">

              {/* Badge pills */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 bg-slate-500/10 border border-slate-500/25 px-5 py-2 rounded-full">
                  <Building className="h-3.5 w-3.5" />
                  Heavy-Duty Commercial
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Industry Grade
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                Poultry Equipment & Accessories in Nigeria:{' '}
                <span className="text-gradient-green">Battery Cages, Drinkers & Brooders</span>
              </h1>

              {/* Lead */}
              <p className="text-lg text-slate-300 leading-relaxed">
                From LPG infrared gas brooders and automated nipple drinker systems to hot-dip galvanized battery cages and commercial defeathering machines — D-AminGrow supplies everything your poultry farm needs, with video-verified product footage and free equipment sizing calculators.
              </p>

              {/* Motto pill */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                <Star className="h-3.5 w-3.5 text-emerald-400" />
                Your Satisfaction Is Our Priority
              </div>

              {/* Trust assurance pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  'Gas Brooders',
                  'Battery Cages',
                  'Nipple Drinkers',
                  'Plucker Machines',
                  'Transport Crates',
                  'Hanging Feeders',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300 font-medium bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20inquire%20about%20poultry%20equipment%20pricing%20and%20availability."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Get equipment quote
                </a>
                <Link
                  href="/calculators/brooder"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
                >
                  <Calculator className="h-4 w-4" />
                  Brooder sizing calculator
                </Link>
                <Link
                  href="/services"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  Farm setup advisory <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* RIGHT — 5 cols */}
            <div className="lg:col-span-5 space-y-5">
              <MediaVideoPlayer
                src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/automated%20battery%20cage.mp4"
                poster="/products/Acessories/Battery cage.jpeg"
                title="Galvanized Layer Battery Cage Systems"
                badge="Turnkey Installation"
                caption="Multi-tier hot-dip galvanized layer cages with automated drinking & feeding"
                aspectRatio="video"
              />

              {/* Equipment specs card */}
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <Building className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-heading">Equipment Specification Highlights</h3>
                    <p className="text-xs text-slate-500">Commercial-grade standards</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: 'Battery cage floor space', value: '450–480 cm²/bird' },
                    { label: 'Galvanization type', value: 'Hot-dip (not electro)' },
                    { label: 'Brooder BTU range', value: '18,000–28,000 BTU/unit' },
                    { label: 'Bell drinker capacity', value: '50–80 birds/unit' },
                    { label: 'Nipple drinker line', value: '10–12 birds/nipple' },
                    { label: 'Transport crate capacity', value: '8–12 birds/crate' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 border border-white/8 rounded-xl px-3 py-2">
                      <span className="text-xs text-slate-400">{row.label}</span>
                      <span className="text-xs font-semibold text-emerald-400">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stat cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '10+', label: 'Equipment Types' },
                  { value: '36+', label: 'States Covered' },
                  { value: '100%', label: 'Commercial Grade' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl bg-white/5 border border-white/8 p-4 text-center">
                    <div className="text-xl font-extrabold text-white font-heading">{stat.value}</div>
                    <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
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
              Why Under-Specified Equipment Costs Nigerian Farmers Millions
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Equipment failure is not always visible immediately. It shows up 12 months later as rust, chick mortality, feed wastage, and water-borne disease — all avoidable with the right specification from the start.
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
              The 4-Pillar Equipment Quality System
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
          INFORMATION GAIN: BROODER HEAT OUTPUT TABLE
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Zap className="h-3.5 w-3.5" />
              Unique Information Gain
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Brooder Heat Output Specification Guide for Nigeria
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Most Nigerian farmers don&apos;t calculate BTU-to-chick ratios before buying brooders. Under-specified brooders are the number one cause of first-week chick mortality on Nigerian farms. This guide tells you exactly what to buy.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Brooder Type</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">BTU Output</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Chick Capacity</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Min Ambient Temp</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Best Season Use</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Note</th>
                </tr>
              </thead>
              <tbody>
                {BROODER_SPECS.map((row, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-t border-slate-100`}>
                    <td className="px-5 py-4 font-semibold text-slate-700 whitespace-nowrap">{row.type}</td>
                    <td className="px-5 py-4 text-slate-600">{row.btu}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50">
                        {row.chicks}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{row.tempRange}</td>
                    <td className="px-5 py-4 text-slate-600">{row.season}</td>
                    <td className="px-5 py-4 text-xs text-slate-500">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-start gap-3 text-xs text-slate-500 max-w-2xl">
              <Info className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>BTU calculations assume typical Nigerian LPG canopy brooder at 1.8–2.0m diameter, floor brooding setup. For cage-rearing or box brooding, different specifications apply. Use our free brooder calculator for exact sizing.</span>
            </div>
            <Link
              href="/calculators/brooder"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl"
            >
              <Calculator className="h-4 w-4" />
              Use free brooder sizing calculator
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          EQUIPMENT CATEGORIES
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Building className="h-3.5 w-3.5" />
              Equipment Range
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Farm Equipment Categories
            </h2>
            <p className="text-slate-600">
              Everything your commercial poultry operation needs from day-one chick arrival to market dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EQUIPMENT_TYPES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className="rounded-3xl bg-white border border-slate-200 p-7 space-y-4 hover:shadow-lg hover:border-slate-300 transition-all group">
                  <div className={`h-12 w-12 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading mb-2">{cat.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{cat.desc}</p>
                    <ul className="space-y-1.5">
                      {cat.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-slate-500">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          EQUIPMENT IN ACTION — VIDEO FOOTAGE
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-4 py-1.5 text-xs font-bold text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Real Field Footage · Working Equipment</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Watch Our Equipment in Action
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Verify build quality, automated feed delivery, and live operation before ordering your farm equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MediaVideoPlayer
              src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/fully%20automated%20battery%20cage%20system.mp4"
              poster="/products/Acessories/Battery cage.jpeg"
              title="Fully Automated Battery Cage Architecture"
              badge="Turnkey Poultry Housing"
              caption="Motorized feeding trolleys, nipple drinker lines, and egg collection belts"
              aspectRatio="video"
            />

            <MediaVideoPlayer
              src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/poultry%20hanging%20feeder.mp4"
              poster="/products/Acessories/poultry hanging feeder.jpeg"
              title="Commercial Conical Hanging Feeders"
              badge="Zero-Feed-Wastage"
              caption="Adjustable flow pan lip designed to prevent litter scratching and feed loss"
              aspectRatio="video"
            />

            <MediaVideoPlayer
              src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/chicks%20feeder.mp4"
              poster="/products/Acessories/feeder.jpeg"
              title="Brooder Day-Old Chick Feeders"
              badge="First-Week Brooding"
              caption="Shallow anti-spill feeding trays ensuring early starter feed access for day-old chicks"
              aspectRatio="video"
            />

            <MediaVideoPlayer
              src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/defathering%20machine.mp4"
              poster="/products/Acessories/Defeathering machine.jpeg"
              title="SS Defeathering Plucker Machine"
              badge="Abattoir High-Throughput"
              caption="Commercial food-grade stainless steel plucker for rapid broiler dressing"
              aspectRatio="video"
            />

            <MediaVideoPlayer
              src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/transportation%20cage.mp4"
              poster="/products/Acessories/transportation crate.jpeg"
              title="HDPE Live Bird Transport Crates"
              badge="Interstate Transit"
              caption="High-density perforated crates ensuring ventilation and zero bird suffocation during transit"
              aspectRatio="video"
            />

            <MediaVideoPlayer
              src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/egg%20crate.mp4"
              poster="/products/Acessories/plastic egg crate.jpeg"
              title="Heavy-Duty Commercial Egg Crates"
              badge="30-Egg Reusable Trays"
              caption="Impact-resistant stackable plastic trays preventing hairline shell fractures during transport"
              aspectRatio="video"
            />
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
                Product Catalogue
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Available Equipment & Accessories
              </h2>
              <p className="text-sm text-slate-500 mt-2">Commercial-grade. Contact for current pricing and delivery quote.</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 shrink-0">
              <Clock className="h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-700 font-medium">Pricing on request — delivery fee varies by state</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessories.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Farm Setup CTA */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#050E08] to-slate-900 border border-white/8 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-extrabold font-heading text-white mb-2">Setting Up a New Poultry Farm?</h3>
              <p className="text-sm text-slate-400">Our farm setup consultants help you choose the right equipment, calculate quantities, and optimize your investment from day one.</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                href="/services"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm"
              >
                Book farm setup consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20equipment%20advice%20for%20setting%20up%20a%20new%20poultry%20farm."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp for advice
              </a>
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
                But if you want commercial-grade, correctly specified, video-verified poultry equipment delivered to your farm gate — we are built for exactly that.
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
              Everything About Poultry Equipment & Accessories in Nigeria
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
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
            <Building className="h-3.5 w-3.5" />
            Commercial-Grade — Order Today
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Equip Your Poultry Farm with{' '}
            <span className="text-gradient-green">Commercial-Grade Precision</span>
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
            The right equipment pays for itself within 2–3 cycles through reduced mortality, lower feed wastage, and longer operational life. D-AminGrow supplies only commercial-grade poultry equipment with video-verified build quality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20a%20quote%20for%20poultry%20equipment%20for%20my%20farm.%20Please%20send%20pricing%20and%20availability."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              Get equipment quote
            </a>
            <Link
              href="/calculators/brooder"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
            >
              <Calculator className="h-4 w-4" />
              Free brooder calculator
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            Commercial grade · Hot-dip galvanized · Video verified · Nationwide delivery
          </p>
        </div>
      </section>

    </div>
  );
}
