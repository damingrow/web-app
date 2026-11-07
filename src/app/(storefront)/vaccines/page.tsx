import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';
import { CLIENT_FARMS } from '@/data/partners-and-clients';
import {
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Star,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Thermometer,
  Syringe,
  BookOpen,
  Zap,
  ChevronRight,
  FileSpreadsheet,
  Building2,
  Calendar,
  XCircle,
  TrendingDown,
  Award,
  MapPin,
  Phone,
  Layers,
  Truck,
  Info,
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
      name: 'What types of poultry vaccines does D-AminGrow supply in Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'D-AminGrow supplies Newcastle Disease (LaSota, B1), Infectious Bursal Disease/Gumboro (Intermediate Plus), Infectious Bronchitis (IB Multi), Fowl Pox, Coryza, Mycoplasma, Marek\'s Disease, and ND+IB+EDS combination vaccines. All are live freeze-dried or inactivated biologicals, NAFDAC-registered and cold-chain verified.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does D-AminGrow guarantee cold-chain integrity for vaccines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every vaccine order is stored in dedicated 2°C–8°C biological refrigerators, packed with pre-chilled ice gel packs and thermal foam inserts, and dispatched with a pre-cold verification call. Vaccines are never frozen below 0°C (which kills live viruses) and never exposed above 8°C during transit.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between live and killed (inactivated) poultry vaccines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Live (attenuated) vaccines like LaSota and IBD Intermediate Plus replicate mildly in birds and stimulate active cell-mediated immunity — ideal for prime and booster doses. Killed (inactivated) oil-emulsion vaccines like ND+IB+EDS and Mycoplasma Killed are injected and produce high antibody titres for layer flocks nearing production. D-AminGrow supplies both types.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I order poultry vaccines online and get delivery in Lagos, Ibadan, or Abuja?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. D-AminGrow dispatches cold-chain verified vaccines to Lagos, Ibadan, Ogun, Oyo, Abuja, Kano, and other major cities via refrigerated dispatch boxes. Transit hubs in Lagos and Ibadan handle same-day local dispatch; interstate deliveries use insulated foam boxes with 24–36 hour ice gel pack durability.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a veterinary prescription to buy poultry vaccines from D-AminGrow?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most live vaccines (LaSota, IBD) are sold directly to commercial farms. Some inactivated combination vaccines (ND+IB+EDS, Mycoplasma) are recommended with veterinary guidance. D-AminGrow\'s veterinary desk can provide guidance on the correct vaccine strain, dose, route of administration, and timing for your flock.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the skim milk stabilizer and why is it needed for poultry vaccines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Skim milk powder (2–3%) dissolved in cold distilled water is added when reconstituting live freeze-dried vaccines. It acts as a protein stabilizer and cryoprotectant that buffers the viral particles against heat shock after reconstitution, extending viability by 20–40 minutes in hot tropical conditions. Never reconstitute with warm or chlorinated tap water.',
      },
    },
  ],
};

// ============================================================
// DATA
// ============================================================

const BENCHMARKS = [
  { label: 'Storage Temp', value: '2°C–8°C', sub: 'guaranteed', color: 'text-cyan-400' },
  { label: 'Vaccine Types', value: '10+', sub: 'biologicals stocked', color: 'text-emerald-400' },
  { label: 'Dispatch Coverage', value: '36 States', sub: 'nationwide', color: 'text-amber-400' },
  { label: 'Cold Pack Life', value: '24–36hr', sub: 'transit window', color: 'text-cyan-400' },
];

const FAILURE_POINTS = [
  {
    icon: TrendingDown,
    title: 'Open-market vaccines without cold chain',
    desc: 'Street vendors and open-market pharmacies store vaccines at ambient 25°C–35°C. At that temperature, LaSota viral titer decays by 90% within 4 hours.',
  },
  {
    icon: AlertTriangle,
    title: 'Frozen vaccines mistakenly delivered',
    desc: 'Freezing inactivated oil-emulsion vaccines (Mycoplasma, ND+IB+EDS) causes the emulsion to crack. The adjuvant separates — producing zero antibody response on injection.',
  },
  {
    icon: XCircle,
    title: 'Wrong strain for your disease zone',
    desc: 'Applying a mild Gumboro strain in a hotspot region endemic to variant IBD strains results in breakthrough disease at Day 20–28, the peak Gumboro risk window.',
  },
  {
    icon: TrendingDown,
    title: 'Reconstitution with warm or chlorinated water',
    desc: 'Poultry farmers who use municipal tap water or water >15°C to reconstitute live vaccines destroy the viral agents before the first drop reaches the bird.',
  },
];

const PILLARS = [
  {
    num: '01',
    icon: Thermometer,
    title: 'Biological Cold-Chain Storage',
    desc: 'Dedicated 2°C–8°C vaccine refrigerators — separate from general cold storage. No compromises.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    num: '02',
    icon: ShieldCheck,
    title: 'NAFDAC-Registered Biologicals',
    desc: 'Every vaccine we stock is NAFDAC-listed, batch-numbered, with valid expiry clearly documented.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    num: '03',
    icon: Layers,
    title: 'Strain-Matched Protocols',
    desc: 'Our veterinary desk matches your zone, bird age, and disease pressure to the correct vaccine strain and schedule.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    num: '04',
    icon: Truck,
    title: 'Dispatch-Verified Delivery',
    desc: 'Pre-cold verification call before every shipment. Thermal foam + ice gel pack standard. Never dispatched warm.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
];

// INFORMATION GAIN: Viral Titer Decay Matrix
const TITER_DECAY = [
  { temp: '2°C–8°C', lasota: 'Full potency (manufacturer shelf)', gumboro: 'Full potency', fowlpox: 'Full potency', risk: 'None', riskColor: 'text-emerald-600 bg-emerald-50' },
  { temp: '15°C–20°C', lasota: '10–20% titer loss / 6hrs', gumboro: '5–15% loss / 6hrs', fowlpox: '15% loss / 4hrs', risk: 'Low', riskColor: 'text-amber-600 bg-amber-50' },
  { temp: '25°C–30°C', lasota: '50–70% loss / 2hrs', gumboro: '30–50% loss / 4hrs', fowlpox: '60% loss / 2hrs', risk: 'High', riskColor: 'text-orange-600 bg-orange-50' },
  { temp: '35°C+', lasota: '>95% loss within 1hr', gumboro: '>80% loss / 1hr', fowlpox: 'Complete loss / 30min', risk: 'Critical', riskColor: 'text-red-600 bg-red-50' },
  { temp: 'Frozen (<0°C)', lasota: 'Live vax: viable (lyophilized)', gumboro: 'Live vax: viable', fowlpox: 'Oil-emulsion: DESTROYED', risk: 'Variable', riskColor: 'text-purple-600 bg-purple-50' },
];

const PROCESS_STEPS = [
  {
    step: '01',
    icon: Phone,
    title: 'Contact our veterinary desk',
    desc: 'Tell us your flock type (broiler/layer), bird age, flock size, and location. We confirm vaccine availability and cold-chain dispatch window.',
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
  },
  {
    step: '02',
    icon: ShieldCheck,
    title: 'Cold-chain verification',
    desc: 'We confirm ice gel pack preparation, thermal box assembly, and estimated transit time to your location before we process your order.',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  },
  {
    step: '03',
    icon: Truck,
    title: 'Dispatch & tracking notification',
    desc: 'Your vaccines are dispatched with a pre-cold verification call. You receive a dispatch notification with estimated arrival time.',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  },
  {
    step: '04',
    icon: Syringe,
    title: 'Administer immediately on receipt',
    desc: 'Reconstitute with chilled distilled water + 2% skim milk powder. Administer within 90 minutes. Store unused doses at 2°C–8°C — never re-freeze.',
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
  },
];

const HONESTY_FILTERS = [
  'You want vaccines without cold-chain verification — we won\'t compromise on this, even for smaller orders.',
  'You need delivery in under 2 hours — interstate cold-chain dispatch requires careful preparation time.',
  'You want to store vaccines in your fridge alongside food — our protocol requires a dedicated vaccine refrigerator.',
  'You are not ready to follow the vaccination schedule and skim milk stabilizer protocol — we provide these free, but compliance is yours.',
];

const FAQ_DISPLAY = [
  {
    q: 'What vaccine types does D-AminGrow supply?',
    a: 'Newcastle Disease (LaSota, B1), Gumboro IBD (Intermediate Plus), IB Multi, Fowl Pox, Coryza, Mycoplasma, Marek\'s Disease, and ND+IB+EDS combination. All NAFDAC-registered.',
  },
  {
    q: 'How is cold-chain guaranteed?',
    a: 'All vaccines stored at 2°C–8°C in dedicated biological refrigerators. Every order is packed with ice gel packs and thermal foam, with a pre-cold verification call before dispatch.',
  },
  {
    q: 'What is the difference between live and killed vaccines?',
    a: 'Live (attenuated) vaccines stimulate active cell-mediated immunity — ideal for prime/booster doses. Killed (inactivated) oil-emulsion vaccines produce high antibody titres — used for layers near production.',
  },
  {
    q: 'Can I get vaccine delivery in Lagos, Ibadan, or Abuja?',
    a: 'Yes. We dispatch to Lagos, Ibadan, Ogun, Oyo, Abuja, Kano and more. Same-day local dispatch from Lagos/Ibadan hubs; interstate delivery in insulated boxes (24–36hr ice gel pack durability).',
  },
  {
    q: 'Why use skim milk powder when reconstituting vaccines?',
    a: 'Skim milk (2–3%) dissolved in cold distilled water acts as a protein stabilizer — buffering viral particles from heat shock post-reconstitution. This extends viability by 20–40 minutes in Nigerian tropical heat.',
  },
  {
    q: 'Do I need a prescription?',
    a: 'Most live vaccines are sold directly to commercial farms. Some inactivated combination vaccines are recommended with veterinary guidance. Our desk provides free protocol advice with every order.',
  },
];

// ============================================================
// PAGE COMPONENT
// ============================================================
export const metadata: Metadata = {
  title: 'Poultry Vaccines in Nigeria | Cold-Chain Biologicals & Wholesale Prices | D-AminGrow',
  description:
    'Buy NAFDAC-registered poultry vaccines in Nigeria with certified 2°C–8°C cold-chain delivery. Newcastle LaSota, Gumboro IBD, Marek\'s Disease, Fowl Pox, Coryza & combination vaccines. Wholesale pricing. Dispatch to Lagos, Ibadan, Abuja.',
  openGraph: {
    title: 'Poultry Vaccines in Nigeria | Cold-Chain Biologicals & Wholesale Prices',
    description: 'Newcastle, Gumboro IBD, Fowl Pox, Coryza, Marek\'s & ND+IB+EDS vaccines. 2°C–8°C cold-chain guaranteed. NAFDAC-registered. Nationwide Nigeria dispatch.',
  },
};

export default function VaccinesCategoryPage() {
  const vaccines = getProductsByCategory('vaccines');

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
            <Thermometer className="h-3.5 w-3.5 text-cyan-400" />
            Cold-chain dispatch: 2°C–8°C verified on every order
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            NAFDAC-registered biologicals only
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
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[500px] bg-cyan-500/6 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Poultry Vaccines</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* LEFT — 7 cols */}
            <div className="lg:col-span-7 space-y-5">

              {/* Badge pill */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-5 py-2 rounded-full">
                  <Syringe className="h-3.5 w-3.5" />
                  Cold-Chain Verified Biologicals
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
                  ❄️ 2°C–8°C Maintained
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                Poultry Vaccines in Nigeria:{' '}
                <span className="text-gradient-green">Cold-Chain Guaranteed Biologicals & Pricing</span>
              </h1>

              {/* Lead */}
              <p className="text-lg text-slate-300 leading-relaxed">
                D-AminGrow supplies NAFDAC-registered live and killed poultry vaccines — Newcastle LaSota, Gumboro IBD, Fowl Pox, Coryza, Mycoplasma, Marek&apos;s Disease, and ND+IB+EDS combination — with strict 2°C–8°C cold-chain preservation from storage to delivery, across all 36 states in Nigeria.
              </p>

              {/* Motto pill */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                <Star className="h-3.5 w-3.5 text-emerald-400" />
                Your Satisfaction Is Our Priority
              </div>

              {/* Trust assurance grid */}
              <div className="flex flex-wrap gap-3">
                {[
                  '2°C–8°C Guaranteed',
                  'NAFDAC Registered',
                  'Live Freeze-Dried',
                  'Strain-Matched Protocol',
                  'Nationwide Delivery',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-cyan-300 font-medium bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20poultry%20vaccines%20with%20cold-chain%20delivery.%20Please%20confirm%20availability%20and%20pricing."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Order Vaccines — WhatsApp
                </a>
                <Link
                  href="/vaccination-program"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  Official vaccination program
                </Link>
                <Link
                  href="/calculators/vaccination"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  <Calendar className="h-4 w-4" />
                  Dose calculator
                </Link>
              </div>
            </div>

            {/* RIGHT — 5 cols */}
            <div className="lg:col-span-5 space-y-5">
              <MediaVideoPlayer
                src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/Presentation%20on%20IBH%20vaccine.mp4"
                poster="/products/Vaccines/ND lasota.jpeg"
                title="Clinical Briefing: Inclusion Body Hepatitis (IBH) Vaccine"
                badge="Veterinary Biologicals"
                caption="In-depth clinical presentation on poultry viral immunization & cold-chain preservation"
                aspectRatio="video"
              />

              {/* Cold-Chain Telemetry Card */}
              <div className="rounded-3xl bg-cyan-500/10 border border-cyan-500/25 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <Thermometer className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-heading">Cold-Chain Protocol Active</h3>
                    <p className="text-xs text-slate-500">Unbreakable storage guarantee</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400 font-medium">Live</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Storage', value: '4°C', sub: 'active reading' },
                    { label: 'Min Threshold', value: '2°C', sub: 'never below' },
                    { label: 'Max Threshold', value: '8°C', sub: 'never above' },
                    { label: 'Ice Pack Life', value: '36hr', sub: 'transit window' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/5 border border-white/8 rounded-xl p-3">
                      <div className="text-xs text-slate-500 mb-0.5">{s.label}</div>
                      <div className="text-lg font-extrabold text-cyan-400 font-heading">{s.value}</div>
                      <div className="text-xs text-slate-600">{s.sub}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[
                    'Never frozen below 0°C — live viruses remain viable',
                    'Never above 8°C in transit — potency maintained',
                    'Pre-cold dispatch verification call, every order',
                    'Foam box + ice gel pack standard in every shipment',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300">{item}</span>
                    </div>
                  ))}
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
          PROBLEM: WHY VACCINES FAIL IN NIGERIA
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <AlertTriangle className="h-3.5 w-3.5" />
              The Root Problem
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why Vaccines Fail on Most Nigerian Farms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Vaccination failure — not vaccine shortage — is the leading cause of preventable flock losses in West Africa. The problem is almost always cold-chain or protocol failure, not the vaccine itself.
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

          <div className="mt-10 rounded-3xl bg-slate-900 border border-slate-700 p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
              <Info className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-200 font-semibold mb-1">The D-AminGrow Standard</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every vaccine we dispatch is cold-chain verified, batch-traceable, and strain-matched to your disease zone. We provide free protocol guidance on reconstitution, timing, water withholding, and skim milk stabilizer dosage with every order.
              </p>
            </div>
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
              The 4-Pillar Vaccine Integrity System
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Most suppliers deliver vaccines. We deliver vaccine viability. Here is how we do it.
            </p>
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
          INFORMATION GAIN: VIRAL TITER DECAY MATRIX
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Zap className="h-3.5 w-3.5" />
              Unique Information Gain
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Viral Titer Decay Matrix: Why Temperature Is Everything
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Most farmers don&apos;t know that a vaccine exposed to 30°C for just 2 hours loses 50–70% of its efficacy before it reaches the bird. This table explains exactly what happens at each temperature bracket — and why 2°C–8°C is non-negotiable.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Storage / Transit Temp</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Newcastle LaSota</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Gumboro IBD</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Fowl Pox</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {TITER_DECAY.map((row, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-t border-slate-100`}>
                    <td className="px-5 py-4 font-mono font-semibold text-slate-700">{row.temp}</td>
                    <td className="px-5 py-4 text-slate-600">{row.lasota}</td>
                    <td className="px-5 py-4 text-slate-600">{row.gumboro}</td>
                    <td className="px-5 py-4 text-slate-600">{row.fowlpox}</td>
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
              Data based on FAO veterinary biologicals temperature sensitivity guidelines &amp; field studies in tropical climates.
            </span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          VACCINES PRODUCT GRID
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="section-label w-fit mb-4">
                <Star className="h-3.5 w-3.5" />
                Vaccine Catalogue
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Available Vaccines — Cold-Chain Stocked
              </h2>
              <p className="text-sm text-slate-500 mt-2">All vaccines require cold-chain pre-verification. Contact our desk before ordering.</p>
            </div>
            <div className="flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-xl px-5 py-3 shrink-0">
              <Clock className="h-4 w-4 text-cyan-600" />
              <span className="text-sm text-cyan-800 font-medium">Cold-chain confirmed per order</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vaccines.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Vaccine image strip */}
          <div className="mt-14">
            <div className="text-center mb-8">
              <div className="section-label mx-auto w-fit mb-3">
                <Award className="h-3.5 w-3.5" />
                Biologicals In Stock
              </div>
              <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">Photographed From Our Cold Storage</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { src: '/products/Vaccines/lasota-vaccine.jpeg', label: 'ND LaSota Live' },
                { src: '/products/Vaccines/gumboro-vaccine.jpeg', label: 'Gumboro IBD' },
                { src: '/products/Vaccines/coryza-vaccine-killed.jpeg', label: 'Coryza Killed' },
                { src: '/products/Vaccines/mycoplasma-killed-vaccine.jpeg', label: 'Mycoplasma Killed' },
                { src: '/products/Vaccines/nd-ib-eds-killed-vaccine.jpeg', label: 'ND+IB+EDS Killed' },
                { src: '/products/Vaccines/nd-ibh20-vaccine.jpeg', label: 'ND IBH₂O' },
              ].map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
                  <div className="relative h-32">
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    />
                  </div>
                  <div className="p-2.5 text-center">
                    <p className="text-xs font-semibold text-slate-700 font-heading">{img.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          VACCINATION PROGRAM BANNER
          ==================================================================== */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-[#050E08] to-cyan-950 border border-emerald-500/25 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-4 py-1.5 rounded-full">
                  <Calendar className="h-3.5 w-3.5" />
                  Official Veterinary Protocol
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  Generate Your Calibrated Broiler & Layer Vaccination Calendar
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Enter your flock placement date to instantly calculate calendar-mapped vaccination days (IB Multi, ND LaSota, IBD Intermediate Plus, Fowl Pox, Salmonella, and Layer Inactivated Triple). Print or download as PDF.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/vaccination-program"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-emerald-600/30"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    Open vaccination program hub
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/calculators/vaccination"
                    className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-5 py-3.5 rounded-xl border border-white/15 hover:border-white/25 transition-all text-sm"
                  >
                    Dose volume calculator
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Protocols</div>
                <div className="space-y-2 text-xs text-slate-200">
                  {[
                    'Broiler Chart: Day 1 to 19 (ND + IBD Prime/Booster)',
                    'Layer Protocol: Day 1 to Week 22 Point-of-Lay',
                    'Water withholding & skimmed milk stabilizer rules',
                    'Printable pen chart for farm managers & staff',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4-STEP ORDER PROCESS
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Zap className="h-3.5 w-3.5" />
              How to Order
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              4-Step Vaccine Order Process
            </h2>
            <p className="text-slate-600 leading-relaxed">
              From contact to cold-chain delivery — every step documented and verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="relative">
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-6 right-0 w-6 h-0.5 bg-slate-200 translate-x-full z-10" />
                  )}
                  <div className="rounded-3xl bg-white border border-slate-200 p-7 space-y-4 h-full hover:shadow-lg transition-shadow">
                    <div className={`h-12 w-12 rounded-2xl ${s.color} border flex items-center justify-center`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-extrabold text-slate-100 font-heading">{s.step}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">{s.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          CLIENT FARMS — TRUST SIGNALS
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Building2 className="h-3.5 w-3.5" />
              Commercial Farm Trust
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Trusted by Commercial Poultry Operations Nationwide
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Commercial farms across Nigeria rely on D-AminGrow cold-chain logistics to safeguard tens of thousands of birds against virulent field challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLIENT_FARMS.slice(0, 4).map((farm) => (
              <div
                key={farm.id}
                className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      {farm.flockType}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{farm.relationshipYears}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors">
                    {farm.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    {farm.location} · {farm.flockCapacity}
                  </p>
                  <p className="text-xs text-slate-600 italic leading-relaxed pt-2 border-t border-slate-100">
                    &ldquo;{farm.testimonialSnippet}&rdquo;
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Flock Capacity</span>
                  <span className="font-semibold text-slate-700">{farm.flockCapacity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Read all verified commercial client reviews
              <ArrowRight className="h-4 w-4" />
            </Link>
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
            <p className="text-slate-600">
              We&apos;d rather be honest about this than take your money and deliver a poor outcome.
            </p>
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
                But if you want cold-chain guaranteed, strain-matched, NAFDAC-registered biologicals delivered to your door — we are built for exactly that.
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
              Everything You Need to Know About Poultry Vaccines in Nigeria
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
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-5 py-2 rounded-full">
            <Thermometer className="h-3.5 w-3.5" />
            Cold-Chain Ready — Order Today
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Order Poultry Vaccines with Guaranteed{' '}
            <span className="text-gradient-green">Cold-Chain Delivery</span>
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Every vaccine is stored at 2°C–8°C, dispatched with ice gel packs and thermal foam, and verified with a pre-cold call. Your birds deserve biologically viable vaccines — not ambient-temperature guesswork.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20poultry%20vaccines%20with%20cold-chain%20delivery.%20Please%20send%20your%20current%20vaccine%20price%20list."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              Order vaccines — WhatsApp
            </a>
            <Link
              href="/vaccination-program"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
            >
              <FileSpreadsheet className="h-4 w-4" />
              View vaccination program
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            Cold-chain protocol verified. NAFDAC-registered biologicals. Strain-matched dispatch.
          </p>
        </div>
      </section>

    </div>
  );
}
