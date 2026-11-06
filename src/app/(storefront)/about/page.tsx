import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { HATCHERY_PARTNERS, CLIENT_FARMS } from '@/data/partners-and-clients';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  Building,
  HelpCircle,
  Feather,
  Syringe,
  ChevronRight,
  MessageCircle,
  AlertTriangle,
  XCircle,
  Check,
  Clock,
  Egg,
  Truck,
  BadgeCheck,
  TrendingUp,
  Building2,
  Calendar,
  Layers,
  Thermometer,
  Award,
  Target,
  HeartHandshake,
  Globe,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Leading Agro-Allied Company in Nigeria',
  description:
    'About D-AminGrow: Leading agro-allied company in Nigeria specialized in livestock vaccines, drugs, farmhouse accessories, technical consultation services, and sales and distribution of day-old chicks across Africa.',
  keywords: [
    'agro allied company in nigeria',
    'agricultural enterprise Nigeria',
    'veterinary expertise',
    'Veterinary Council of Nigeria (VCN)',
    'livestock health partner',
    'poultry genetics partner',
    'list of agro allied companies in nigeria',
    'agricultural consultancy firms in nigeria',
    'top livestock supply companies in nigeria',
    'damingrow company profile and mission',
  ],
  openGraph: {
    title: 'About Us | Leading Agro-Allied Company in Nigeria',
    description:
      'D-AminGrow: Reliable Agro-Allied Company in Africa. Specialized in livestock vaccines, drugs, farmhouse accessories, technical consultation services, and sales and distribution of day-old chicks.',
    url: 'https://damingrow.com/about',
    siteName: 'D-AminGrow',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function AboutPage() {
  // Structured JSON-LD schemas: AboutPage, Organization, FAQPage
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'AgroAlliedBusiness',
    name: 'D-AminGrow Agric Ltd',
    url: 'https://damingrow.com',
    logo: 'https://damingrow.com/Brand%20identity/damingrow%20logo.png',
    description:
      'D-AminGrow is an agro-allied company specialized in livestock vaccines, Drugs, farmhouse accessories, offers technical consultation services, and sales and distribution of day-old chicks across Nigeria and Africa.',
    slogan: 'Your satisfaction is our priority',
    founder: {
      '@type': 'Person',
      name: 'D-AminGrow Executive Team',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ibadan',
      addressRegion: 'Oyo State',
      addressCountry: 'NG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+2348139169402',
      contactType: 'Customer Operations & Technical Desk',
      availableLanguage: ['English', 'Yoruba', 'Hausa', 'Igbo'],
    },
    knowsAbout: [
      'Day-Old Chick Allocation',
      'Livestock Vaccine Cold-Chain Logistics',
      'Veterinary Drugs & NAFDAC Formulations',
      'Commercial Poultry Equipment',
      'Poultry Farm Setup & Biosecurity Advisory',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes D-AminGrow different from other agro-allied companies in Nigeria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unlike open-market middlemen, D-AminGrow operates as an authorized distributor with direct hatchery allocations (Chi, Amo, Zartech, Supreme), strict 2°C–8°C ice-gel cold-chain packaging for vaccines, verifiable NAFDAC registered formulations, and dedicated clinical advisory led by certified veterinary practitioners.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does D-AminGrow ensure day-old chicks are healthy and genuine?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every batch of day-old broilers, pullets, and poults is sourced exclusively from parent-stock primary hatcheries with documented maternal antibodies. We enforce the 50+1 packaging standard (51 chicks per carton) and dispatch exclusively in temperature-controlled early-morning transit on Mondays and Thursdays.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does D-AminGrow manufacture veterinary drugs or own hatcheries?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. D-AminGrow is an authorized agro-allied distributor, technical consultancy firm, and supply partner. We secure verified commercial allocations from licensed pharmaceutical manufacturers and certified grandparent/parent-stock hatcheries, protecting farmers against counterfeits.',
        },
      },
      {
        '@type': 'Question',
        name: 'What regions and African countries does D-AminGrow serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We operate scheduled weekly logistics across all 36 states of Nigeria and the FCT (Abuja), with commercial cross-border consultancy and equipment supplies extending across Ghana, Benin Republic, Cameroon, and wider West African livestock corridors.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I book chicks or request veterinary technical advisory?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can book verified day-old chicks online through our chicks desk or connect with our customer operations desk on WhatsApp (+234 813 916 9402). Bookings require a verified 50% deposit into our official Zenith Bank corporate account (1017894562) before the weekly booking cutoff.',
        },
      },
    ],
  };

  const services = [
    {
      title: 'Day-Old Chick Bookings & Allocation',
      description: 'First-generation commercial broilers, layer pullets, cockerels, and turkeys from premier parent-stock hatcheries. Dispatched every Monday and Thursday nationwide.',
      icon: Feather,
      link: '/chicks',
      badge: '50+1 Packaging Rule',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
    },
    {
      title: 'Livestock Vaccine Cold-Chain Logistics',
      description: 'Continuous 2°C–8°C thermal insulation with high-density ice gel packs for live and inactivated viral vaccines (Newcastle Lasota, Gumboro, Marek\'s, Fowl Pox).',
      icon: Syringe,
      link: '/vaccines',
      badge: '2°C–8°C Cold-Chain',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-700',
    },
    {
      title: 'NAFDAC-Approved Veterinary Products',
      description: 'Authentic therapeutic inputs direct from licensed pharmaceutical manufacturers: broad-spectrum antibiotics, anticoccidials, gut acidifiers, and stress electrolytes.',
      icon: Stethoscope,
      link: '/drugs',
      badge: 'Zero Counterfeits',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
    },
    {
      title: 'Housing, Brooding & Farm Accessories',
      description: 'Industrial radiant gas brooders, automatic nipple drinker networks, bell drinkers, durable egg crates, and heavy-duty poultry transport equipment.',
      icon: Building,
      link: '/accessories',
      badge: 'Commercial Durability',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-700',
    },
    {
      title: 'Point-of-Lay Pullet Distribution',
      description: 'Production-ready 17–20 week pullets with authenticated vaccination history cards, reared under strict veterinary supervision for commercial egg production.',
      icon: Egg,
      link: '/services/point-of-lay',
      badge: '17–20 Weeks Old',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-800',
    },
    {
      title: 'Farm Setup & Veterinary Advisory',
      description: 'On-farm and remote clinical triage, housing ventilation engineering, pen biosecurity audits, and custom flock health programs for commercial farmers.',
      icon: ShieldCheck,
      link: '/services/consultation',
      badge: 'VCN Clinical Standards',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-700',
    },
  ];

  return (
    <div className="font-body text-slate-800">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ====================================================================
          1. HERO SECTION — 2-Grid Columns matching Homepage
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden min-h-[85vh] flex items-center bg-[#050E08] text-white">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-slate-200">About D-AminGrow</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-emerald-400 font-semibold">Agro-Allied Profile</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left Column (7 cols): Directives, Hook, Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-5 text-left">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Leading Agro-Allied Company in Nigeria
                </div>
              </div>

              {/* Exact H1 Directive */}
              <div className="space-y-4 !mt-2.5">
                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                  D-AminGrow: Reliable{' '}
                  <span className="text-gradient-green">Agro-Allied Company in Africa</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                  D-AminGrow is an agro-allied company specialized in livestock vaccines, Drugs, farmhouse accessories, offers technical consultation services, and sales and distribution of day-old chicks.
                </p>
              </div>

              {/* Brand Motto / Slogan Pill */}
              <div>
                <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs">
                  <span className="text-slate-400 font-medium uppercase tracking-wider">Motor / Slogan</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 font-bold italic">&ldquo;Your satisfaction is our priority&rdquo;</span>
                </div>
              </div>

              {/* Action Zone matching homepage button style and capitalization */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20consult%20with%20your%20veterinary%20and%20livestock%20team."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Speak With A Livestock Consultant On WhatsApp
                </a>
                <Link
                  href="/chicks"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
                >
                  Explore Day-Old Chicks Allocation
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/drugs"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-4 py-4 rounded-xl transition-all duration-200 text-sm hover:underline"
                >
                  View NAFDAC Product Catalog
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs text-slate-400 border-t border-white/10">
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Chi, Amo, Zartech & Supreme</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>2°C–8°C Thermal Packs</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Mon & Thu Interstate Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>VCN Clinical Standards</span>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Visual Showcase Card with Logo & Credential Badges */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-b from-emerald-950/70 via-slate-950/80 to-black p-3 shadow-2xl backdrop-blur-md">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-black/90 via-emerald-950/40 to-black/95 flex items-center justify-center p-6 border border-emerald-500/10">
                  {/* Subtle radial emerald illumination */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />

                  {/* Logo with high-end framing */}
                  <div className="relative w-4/5 h-4/5 max-w-[280px] max-h-[280px]">
                    <Image
                      src="/Brand identity/damingrow logo.png"
                      alt="D-AminGrow Logo — Reliable Agro-Allied Company in Africa"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-contain drop-shadow-[0_12px_30px_rgba(46,229,113,0.35)]"
                      priority
                    />
                  </div>

                  {/* Top Slogan / Motor Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-black/80 backdrop-blur-md border border-emerald-500/30 rounded-xl px-3.5 py-1.5 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#2ee571] animate-pulse" />
                    <span className="text-xs font-bold text-white tracking-wide">
                      Your satisfaction is our priority
                    </span>
                  </div>

                  {/* Bottom Specialization Capsule */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-emerald-950/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-3.5 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2ee571]">
                        Specialized Agro-Allied Enterprise
                      </span>
                      <span className="text-[10px] text-emerald-300 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                        Nigeria & Africa
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-200 leading-snug">
                      Livestock vaccines, Drugs, farmhouse accessories, technical consultation, &amp; sales and distribution of day-old chicks.
                    </p>
                  </div>
                </div>

                {/* Bottom mini-metrics */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-1 text-center">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <div className="text-lg font-black text-white font-heading">98.6%</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Brooding Livability</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <div className="text-lg font-black text-white font-heading">50+1</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Standard Carton Rule</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <div className="text-lg font-black text-white font-heading">2°C–8°C</div>
                    <div className="text-[10px] text-emerald-400 font-bold">Vaccine Cold-Chain</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Operational Benchmarks */}
          <div className="mt-14 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: '36 States', label: 'Nationwide Delivery Coverage', sub: 'Synchronized Monday & Thursday routes' },
              { value: '4 Primary', label: 'Certified Partner Hatcheries', sub: 'Direct allotment: Chi, Amo, Zartech, Supreme' },
              { value: '100% Genuine', label: 'NAFDAC Formulations Only', sub: 'Direct pharmaceutical pipeline with batch logs' },
              { value: 'VCN Advisory', label: 'Clinical Veterinary Guidance', sub: 'Preventable flock mortality reduction programs' },
            ].map((stat, i) => (
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
          STRATEGIC FOUNDATION: Goal, Aim, Vision & Slogan
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-[#050E08] via-slate-950 to-slate-900 text-white border-b border-emerald-950/60 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header block with Core Specialization Definition */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              Strategic Foundation &amp; Corporate Direction
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Our Goal, Aim, Vision &amp; Operating Creed
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              D-AminGrow is an agro-allied company specialized in livestock vaccines, Drugs, farmhouse accessories, offers technical consultation services, and sales and distribution of day-old chicks across Nigeria, West Africa, and the continent.
            </p>
          </div>

          {/* 4 Strategic Direction Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Our Goal */}
            <div className="rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/40 p-7 flex flex-col justify-between transition-all hover:-translate-y-1 backdrop-blur-sm group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Target className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    Our Goal
                  </span>
                </div>
                <h3 className="text-xl font-bold font-heading text-white">Our Goal</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Our goal is to help improve the livestock sector in Nigeria and Africa by introducing the latest information and healthy solutions to the livestock market.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Check className="h-4 w-4" />
                <span>Sector Modernization</span>
              </div>
            </div>

            {/* Our Aim */}
            <div className="rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/40 p-7 flex flex-col justify-between transition-all hover:-translate-y-1 backdrop-blur-sm group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                    <HeartHandshake className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-300 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                    Our Aim
                  </span>
                </div>
                <h3 className="text-xl font-bold font-heading text-white">Our Aim</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Our aim is to build communities of healthy livestock and in general, healthy living of the people.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-teal-300">
                <Check className="h-4 w-4" />
                <span>Healthy Communities</span>
              </div>
            </div>

            {/* Our Vision */}
            <div className="rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/40 p-7 flex flex-col justify-between transition-all hover:-translate-y-1 backdrop-blur-sm group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Globe className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                    Our Vision
                  </span>
                </div>
                <h3 className="text-xl font-bold font-heading text-white">Our Vision</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Our vision is to see the African livestock market becoming better and stronger globally.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-cyan-300">
                <Check className="h-4 w-4" />
                <span>Global Competitiveness</span>
              </div>
            </div>

            {/* Motor / Slogan */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-950/80 via-white/5 to-emerald-900/40 border border-emerald-500/40 p-7 flex flex-col justify-between transition-all hover:-translate-y-1 backdrop-blur-sm group shadow-xl shadow-emerald-950/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                    <Award className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                    Motor / Slogan
                  </span>
                </div>
                <h3 className="text-xl font-bold font-heading text-white">Motor / Slogan</h3>
                <div className="bg-black/50 border border-emerald-500/30 rounded-2xl p-4">
                  <p className="text-base font-extrabold text-emerald-400 font-heading italic">
                    &ldquo;Your satisfaction is our priority&rdquo;
                  </p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every product verification, certified cold-chain shipment, and veterinary consultation is guided by this unchanging commitment.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-amber-300">
                <Check className="h-4 w-4" />
                <span>Customer Priority</span>
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* ====================================================================
          2. EMOTIONALLY COMPELLING HOOK & FARM REALITY
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
            <AlertTriangle className="h-4 w-4 text-emerald-700" />
            The High Stakes of Modern African Farming
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Livestock Farming in Nigeria Punishes Bad Inputs Instantly. We Protect Your Capital.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            A single broken cold-chain during vaccine transport can silently destroy an entire batch of 2,000 broilers to Newcastle disease by week four. A fake box of day-old chicks from an unverified backyard multiplier eats millions of Naira in high-cost commercial feeds without ever converting to target weight.
          </p>

          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <strong>The D-AminGrow Principle:</strong> As a dedicated agro allied company in Nigeria, we believe you should never bet your hard-earned money on uncertain genetics, diluted medications, or unverified middleman promises. You deserve verified products, exact packaging standards, and practical guidance that respects your balance sheet.
          </p>
        </div>
      </section>

      {/* ====================================================================
          3. PROBLEM EXPLANATION: The 4 Dangerous Cracks in Agricultural Supply
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100/80 border border-red-200 px-4 py-1.5 rounded-full">
              <XCircle className="h-4 w-4 text-red-600" />
              Industry Realities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why So Many Livestock Farms Struggle to Turn a Profit in Nigeria
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              When farmers evaluate top livestock supply companies in Nigeria, they often overlook how unstandardized the open market remains. These four operational failures account for over 70% of early-stage farm bankruptcies:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Backyard Multiplier Chicks',
                problem: 'Broilers that stall at 1.4kg after 7 weeks',
                description: 'Uncertified hatcheries mix spent parent-stock with commercial eggs. The chicks look healthy on day one but lack genetic vigor, resulting in sky-high feed conversion ratios and zero profit.',
                impact: 'Up to 35% loss on feed investment',
                icon: AlertTriangle,
                border: 'border-red-200',
              },
              {
                title: 'Dead Cold-Chain Vaccines',
                problem: 'Live biologics transported in warm cardboard',
                description: 'Viral vaccines like Newcastle (Lasota) and Gumboro (IBD) die within two hours above 8°C. Farmers administer dead saline solution, assuming their birds are immunized until an outbreak wipes the pen.',
                impact: 'Complete flock mortality risk',
                icon: Thermometer,
                border: 'border-amber-200',
              },
              {
                title: 'Counterfeit & Diluted Drugs',
                problem: 'Sub-potent antibiotics causing treatment failure',
                description: 'The informal market is flooded with relabeled bottles containing sub-therapeutic active ingredients. Instead of clearing respiratory or gut infections, they breed drug-resistant bacteria.',
                impact: 'Chronic stunting & recurrent mortality',
                icon: XCircle,
                border: 'border-orange-200',
              },
              {
                title: 'Middleman Speculation & Markups',
                problem: 'Ghost allocations and transit heat stress',
                description: 'Intermediaries sell booking slots they do not own, holding chicks inside hot vehicle boots for hours before dispatch. Chicks arrive dehydrated with weak yolk absorption and heavy week-one drop-off.',
                impact: '15%+ week-one brooding loss',
                icon: Clock,
                border: 'border-rose-200',
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className={`rounded-3xl bg-white border ${card.border} p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow`}
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center font-bold">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold font-heading text-slate-900">{card.title}</h3>
                  <div className="text-xs font-semibold text-red-600 bg-red-50/60 px-2.5 py-1 rounded-lg">
                    {card.problem}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.description}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Economic Drag:</span>
                  <span className="text-red-700">{card.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. WHY MOST AGRO-ALLIED BUSINESSES FAIL & OUR PRACTICAL OPINION
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
                <BadgeCheck className="h-4 w-4 text-emerald-700" />
                Strategic Perspective
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Why Most Agro-Supply Companies Let Farmers Down
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Most agricultural distributors treat livestock inputs like ordinary dry goods. They buy from whoever has the cheapest inventory, pack vaccines in ordinary envelopes, and disappear the moment you pay.
              </p>

              {/* Mandatory Practical Opinion */}
              <div className="bg-emerald-50/80 border-l-4 border-emerald-600 rounded-r-2xl p-5 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Our Practical Opinion as an Agro-Allied Enterprise</p>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  &ldquo;A cheap day-old chick from an unverified backyard multiplier or an unrefrigerated ₦3,000 vaccine is the single most expensive mistake a Nigerian poultry farmer can make. Saving ₦100 on input costs frequently leads to ₦1,500,000 in preventable losses. Quality inputs are an insurance policy, not an expense.&rdquo;
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                D-AminGrow was built by agricultural practitioners who understand that profit in animal husbandry is won in the margins. We focus on verifiable parent-stock genetics, certified temperature logging, and Veterinary Council of Nigeria (VCN) approved protocols so your farm yields what you planned for.
              </p>
            </div>

            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 space-y-6 border border-emerald-950 shadow-xl">
              <h3 className="text-xl font-bold font-heading text-white">The D-AminGrow Standard Comparison</h3>
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                  <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-200">The Informal Market:</span>
                    <p className="text-slate-400 mt-0.5">Warm ice water packs, 48 chicks per carton, speculative pricing, and zero post-arrival mortality support.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-300">The D-AminGrow Framework:</span>
                    <p className="text-slate-300 mt-0.5">Strict 50+1 packaging verification, certified 2°C–8°C thermal insulation packs, Monday & Thursday early-morning routes, and direct VCN clinical triage.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/chicks"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all text-xs"
                >
                  Verify Our Weekly Dispatch Schedule
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. THE DAMINGROW APPROACH / FRAMEWORK (4 Operational Pillars)
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Layers className="h-4 w-4 text-emerald-700" />
              Our Operating Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The D-AminGrow Quality Framework
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Every day-old chick, vaccine vial, and therapeutic formulation follows a four-stage quality gate before touching your farm gate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'Pillar 01',
                title: 'Certified Primary Sourcing Only',
                description: 'We do not trade with backyard aggregators. All day-old commercial broilers, layer pullets, and turkeys come directly from premier parent-stock hatcheries: Chi Farms, Amo Farms, Zartech, and Supreme.',
                badge: 'Verified Pedigree',
                icon: Feather,
              },
              {
                step: 'Pillar 02',
                title: '2°C–8°C Cold-Chain Integrity',
                description: 'All live viral vaccines (Lasota, Gumboro, Marek\'s) are sealed in custom insulated thermal styrofoam chests with industrial frozen ice gel packs, ensuring viral titers remain 100% active during transit.',
                badge: 'Active Titers Guaranteed',
                icon: Thermometer,
              },
              {
                step: 'Pillar 03',
                title: 'Synchronized Mon & Thu Logistics',
                description: 'Chicks and biologics are dispatched exclusively in the cool early hours of Monday and Thursday. This minimizes road heat stress, promotes rapid yolk absorption, and eliminates overnight layovers.',
                badge: 'Zero Road Heat Stress',
                icon: Truck,
              },
              {
                step: 'Pillar 04',
                title: 'Veterinary Advisory & Brooding Triage',
                description: 'Our support doesn\'t end at waybill handover. Farmers receive flock-specific brooding guidance, lighting charts, water sanitation steps, and clinical guidance to safeguard flock livability.',
                badge: 'VCN Clinical Standard',
                icon: Stethoscope,
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 hover:shadow-lg transition-shadow relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    {pillar.step}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                    <pillar.icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="text-base font-bold font-heading text-slate-900">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>

                <div className="pt-2 text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" />
                  <span>{pillar.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. SERVICE DELIVERABLES: What D-AminGrow Provides
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Building2 className="h-4 w-4 text-emerald-700" />
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Comprehensive Agro-Allied Solutions Across Nigeria
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              From day-old chick bookings to biosecurity design and clinical flock reviews, explore how our specialized divisions support commercial farm profitability:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl bg-slate-50 border border-slate-200 p-7 flex flex-col justify-between hover:bg-white hover:border-emerald-300 hover:shadow-lg transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center font-bold`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-200/60">
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-0.5 transition-all"
                  >
                    Explore Service Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. PROCESS BREAKDOWN: How Working With D-AminGrow Works
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Calendar className="h-4 w-4 text-emerald-700" />
              Transparent Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 4-Step Farmer Booking & Dispatch Pipeline
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We eliminated bureaucratic chaos with an orderly weekly pipeline. Here is how we get verified inputs to your farm on time:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Allocation & Deposit',
                desc: 'Select your breed or input needs. Confirm current rates with our desk and lock your quota before weekly cutoff (Sun 2PM for Mon; Wed 2PM for Thu) via 50% deposit to Zenith Bank 1017894562.',
              },
              {
                step: '02',
                title: 'Hatch & Cold-Chain Prep',
                desc: 'On hatch morning, chicks undergo strict 50+1 physical count verification. Vaccines are packed in thermal styrofoam with industrial frozen gel packs to maintain continuous 2°C–8°C.',
              },
              {
                step: '03',
                title: 'Synchronized Transit',
                desc: 'Vehicles roll out in early-morning hours across South-West, North, South-South, and South-East terminals. Waybill references and live driver dispatch telemetry are shared directly with the farmer.',
              },
              {
                step: '04',
                title: 'Arrival & Brooding Support',
                desc: 'Pick up your allotment at your verified destination hub. Receive our brooding protocol with vital glucose anti-stress dosing, temperature targets, and optional clinical follow-ups.',
              },
            ].map((st, sIdx) => (
              <div
                key={sIdx}
                className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 relative hover:shadow-md transition-shadow"
              >
                <div className="text-3xl font-black text-emerald-600/30 font-heading">
                  {st.step}
                </div>
                <h3 className="text-base font-bold text-slate-900 font-heading">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. CASE STUDY / REAL-WORLD REVENUE RESULTS & CLIENT FARMS
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="rounded-3xl bg-gradient-to-br from-[#062413] via-[#093d1f] to-[#041a0d] p-8 sm:p-12 text-white border border-emerald-950/40 relative overflow-hidden shadow-2xl">
            <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-3.5 py-1 text-xs font-bold text-[#2ee571]">
                  <TrendingUp className="h-4 w-4" />
                  Commercial Case Study: 5,000 Broiler Flock
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight">
                  How Crown Heights Farms Saved ₦1.8M in Feed & Reduced Brooding Mortality to 1.4%
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Crown Heights Poultry (Oyo State) previously suffered 8%–11% brooding mortality and poor 2.1 FCR using unverified open-market broiler allocations. After transitioning to D-AminGrow&apos;s direct Chi/Zartech synchronized allotments and cold-chain vaccination schedule, their 5,000-bird cycle completed with:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                    <div className="text-xl font-black text-[#2ee571] font-heading">98.6%</div>
                    <div className="text-[11px] text-slate-300">Brooding Livability</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                    <div className="text-xl font-black text-[#2ee571] font-heading">1.68 FCR</div>
                    <div className="text-[11px] text-slate-300">Feed Conversion Ratio</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                    <div className="text-xl font-black text-[#2ee571] font-heading">₦1,840,000</div>
                    <div className="text-[11px] text-slate-300">Net Cycle Savings</div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 italic pt-1">
                  &ldquo;D-AminGrow delivered our 100 cartons at 6:30 AM with every box inspected for the 50+1 rule. The birds maintained aggressive appetite from day one.&rdquo; — Alh. K. Adeleke, Farm Director
                </p>
              </div>

              <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-heading">
                  Verified Hatchery Partners
                </h4>
                <div className="space-y-3">
                  {HATCHERY_PARTNERS.slice(0, 3).map((h) => (
                    <div key={h.id} className="bg-black/30 rounded-xl p-3 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{h.name}</div>
                        <div className="text-[10px] text-slate-400">{h.location}</div>
                      </div>
                      <span className="text-[10px] font-bold text-[#2ee571] bg-emerald-500/20 px-2 py-0.5 rounded-md">
                        {h.badge}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/reviews"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all text-xs"
                >
                  Read More Verified Farm Reviews
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Commercial Client Farms Grid */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-bold font-heading text-slate-900">
                Commercial Client Farms Relying on D-AminGrow
              </h3>
              <p className="text-xs text-slate-500">
                Broiler, layer, and mixed livestock operations with verified recurring allocations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CLIENT_FARMS.map((farm) => (
                <div
                  key={farm.id}
                  className="rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-300 hover:bg-white transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                        {farm.flockType.split('&')[0]}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{farm.relationshipYears}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors">
                      {farm.name}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      {farm.location}
                    </p>
                    <p className="text-xs text-slate-600 italic leading-relaxed pt-2 border-t border-slate-200">
                      &ldquo;{farm.testimonialSnippet}&rdquo;
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span>Capacity:</span>
                    <span className="font-semibold text-slate-800">{farm.flockCapacity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          INFORMATION GAIN: 3 Unique Insights Competitors Never Discuss
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Award className="h-4 w-4 text-emerald-700" />
              Information Gain Blueprint
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              What Conventional Agro-Allied Articles Never Tell You
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Actionable, original knowledge developed from years of managing high-volume poultry routes across Nigeria:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-base font-bold font-heading text-slate-900">
                The Anatomy of the 50+1 Packaging Rule
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard Nigerian hatchery cartons contain 50 birds plus 1 extra chick to cover accidental transit mortality. Unethical middle-market aggregators frequently siphon off the extra chick across 100 cartons to resell extra boxes, leaving the farmer with short counts and zero buffer.
              </p>
              <div className="text-xs font-bold text-emerald-700 pt-1">
                D-AminGrow Standard: Sealed 51-count verified at loading.
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-base font-bold font-heading text-slate-900">
                The 2-Hour Thermal Titer Threshold in Vaccines
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Live Newcastle virus particles degrade irreversibly when exposed to temperatures exceeding 10°C for more than 120 minutes. Regular blue ice melting inside wet cardboard creates a false sense of security. Industrial high-density gel blocks inside insulated styrofoam are mandatory.
              </p>
              <div className="text-xs font-bold text-cyan-700 pt-1">
                D-AminGrow Standard: High-density foam + gel freeze blocks.
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-base font-bold font-heading text-slate-900">
                Maternal Antibody Interference in Early Vaccines
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Administering intermediate-plus Gumboro vaccine before maternal antibody titers decay neutralizes the vaccine rather than building immunity. D-AminGrow provides verified parent-stock vaccination profiles so your day-10 and day-14 schedules hit the optimal biological window.
              </p>
              <div className="text-xs font-bold text-amber-800 pt-1">
                D-AminGrow Standard: Genetic schedule pairing on every order.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          MANDATORY SECTION: "We May Not Be Right for You If..."
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-slate-200 bg-slate-50/80 p-8 sm:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 px-4 py-1.5 rounded-full">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Honest Self-Selection
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
              We May Not Be Right For You If…
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              We believe in clear expectations from the first conversation. D-AminGrow is an enterprise-grade agro-allied supply and technical partner, and we might not be the best fit if:
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>You are looking for cut-rate unverified backyard multiplier chicks:</strong> We only distribute genuine parent-stock allotments from CHI, AMO, Zartech, and Supreme. We do not discount quality to match open-market cut-rate rates.</span>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>You expect miracle cures without basic pen biosecurity:</strong> Even the highest-potency veterinary antibiotics cannot overcome contaminated water, poor ventilation, or wet litter ammonia. We recommend clinical drugs only as part of sound husbandry.</span>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>You insist on off-schedule mid-day transit:</strong> We strictly dispatch day-old birds in early-morning hours on Mondays and Thursdays. We will not ship delicate chicks under afternoon tropical heat to satisfy an urgent impulse order.</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 border-t border-slate-200">
              If, on the other hand, you value predictable genetics, cold-chain integrity, and professional guidance, we are proud to be your long-term farming partner.
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. FREQUENTLY ANSWERED QUESTIONS (Schema-Backed FAQ)
          ==================================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
              <HelpCircle className="h-4 w-4 text-emerald-700" />
              Frequently Answered Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Common Questions About D-AminGrow & Agro-Allied Operations
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Clear answers to the most important logistical and operational questions asked by poultry and livestock farmers:
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What makes D-AminGrow different from ordinary livestock input dealers in Nigeria?',
                a: 'Unlike open-market middlemen who trade without technical oversight, D-AminGrow operates with verified commercial partner hatcheries (Chi, Amo, Zartech, Supreme), strict 2°C–8°C ice-gel thermal packaging for vaccines, verifiable NAFDAC-approved medications, and dedicated clinical advisory led by certified veterinary practitioners.',
              },
              {
                q: 'How does D-AminGrow guarantee day-old chicks are healthy and genuine?',
                a: 'Every batch of broilers, pullets, and turkeys is sourced exclusively from parent-stock primary hatcheries with documented maternal antibodies. We enforce the 50+1 packaging rule (51 chicks per carton) and dispatch exclusively in temperature-controlled early-morning transit on Mondays and Thursdays.',
              },
              {
                q: 'Does D-AminGrow own a hatchery or manufacture veterinary medications?',
                a: 'No. D-AminGrow is an authorized agro-allied distributor, technical consultancy firm, and supply partner. We secure direct allocations from premier Nigerian hatcheries and distribute genuine, NAFDAC-approved veterinary products from licensed pharmaceutical manufacturers.',
              },
              {
                q: 'What regions and African countries does D-AminGrow serve?',
                a: 'We operate synchronized delivery routes across all 36 states of Nigeria and Abuja FCT. In addition, our agricultural consultancy, farm setup planning, and commercial equipment divisions support farming enterprises across Ghana, Benin Republic, Cameroon, and wider West Africa.',
              },
              {
                q: 'How do I book chicks or request veterinary technical advisory?',
                a: 'You can book verified day-old chicks online through our chicks portal or connect with our customer operations desk on WhatsApp (+234 813 916 9402). Bookings require a verified 50% deposit into our official Zenith Bank corporate account (1017894562) before the weekly booking cutoff.',
              },
            ].map((faq, fIdx) => (
              <div
                key={fIdx}
                className="rounded-2xl bg-white border border-slate-200 p-6 space-y-2 shadow-sm"
              >
                <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. SOFT CONVERSION CTA SECTION
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-[#050E08] text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Your Satisfaction Is Our Priority
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Build A Healthier, More Profitable Farm With A Knowledgeable Partner
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stop risking your investment on broken cold-chains, fake allocations, and unverified drugs. Join hundreds of commercial farmers across Nigeria who count on D-AminGrow every Monday and Thursday.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20am%20ready%20to%20place%20an%20order%20and%20discuss%20my%20farm%20schedule."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Chat With Our Technical Operations Desk
            </a>
            <Link
              href="/chicks"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
            >
              View Day-Old Chicks Pricing
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Authorized Zenith Bank: 1017894562
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Mon & Thu Synchronized Dispatch
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Zero Counterfeits Policy
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
