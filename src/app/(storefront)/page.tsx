import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { HATCHERY_PARTNERS, CLIENT_FARMS } from '@/data/partners-and-clients';
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Sparkles,
  Target,
  Compass,
  Globe2,
  Award,
  Stethoscope,
  Truck,
  Building,
  HelpCircle,
  ShieldCheck,
  MessageCircle,
  Syringe,
  Star,
  Users,
  TrendingUp,
  Zap,
  ChevronRight,
  BookOpen,
  Calculator,
  Feather,
  Thermometer,
  Clock,
  MapPin,
  Egg,
  Scale,
  Building2,
  FileSpreadsheet,
} from 'lucide-react';
import { ARTICLES } from '@/data/articles';

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 4);
  const latestArticles = ARTICLES.slice(0, 3);

  const stats = [
    { value: '500K+', label: 'Monthly Target Reach', sub: 'Across Nigeria & Africa' },
    { value: '36', label: 'States Covered', sub: 'Nationwide Dispatch' },
    { value: '100%', label: 'NAFDAC Compliant', sub: 'All Veterinary Drugs' },
    { value: '2°–8°C', label: 'Cold-Chain Guaranteed', sub: 'For All Live Vaccines' },
  ];

  const services = [
    {
      title: 'Day-Old Chicks Sales & Distribution',
      description: 'Premium commercial broiler chicks and brown layer pullets sourced from certified Nigerian hatcheries. Pre-vaccinated against Marek\'s disease.',
      icon: Feather,
      link: '/services/chicks',
      badge: 'Tue & Thu Dispatch',
      color: 'from-amber-500/20 to-amber-600/5',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
    },
    {
      title: 'Livestock Vaccine Sales & Distribution',
      description: 'Strict 2°C–8°C cold-chain preservation for viral and bacterial vaccines. Newcastle, Gumboro, Marek\'s with ice-pack insulated packaging.',
      icon: Syringe,
      link: '/services/vaccines',
      badge: '2°C–8°C Cold-Chain',
      color: 'from-cyan-500/20 to-cyan-600/5',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-700',
    },
    {
      title: 'Antibiotics, Probiotics & Supplements',
      description: 'NAFDAC-compliant broad-spectrum therapeutics, targeted anticoccidials, gut health probiotics, and water-soluble anti-stress vitamin premixes.',
      icon: Stethoscope,
      link: '/services/drugs',
      badge: 'NAFDAC Registered',
      color: 'from-emerald-500/20 to-emerald-600/5',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
    },
    {
      title: 'Housing & Rearing Equipment',
      description: 'Infrared radiant gas brooders, automatic nipple drinkers, automated battery cages, bell feeders, and commercial defeathering machines.',
      icon: Building,
      link: '/accessories',
      badge: 'Heavy-Duty Commercial',
      color: 'from-slate-500/20 to-slate-600/5',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-700',
    },
    {
      title: 'Sales & Distribution of Point-of-Lay Birds',
      description: 'Fully grown 17–20 week brown and white layer pullets with 100% completed vaccination timetables. Start generating daily egg income within 1–2 weeks of arrival.',
      icon: Egg,
      link: '/services/point-of-lay',
      badge: 'Production-Ready',
      color: 'from-amber-500/20 to-orange-600/5',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-800',
    },
    {
      title: 'Livestock Technical Services',
      description: 'On-farm vaccination administration, drinker pressure calibration, brooder temperature regulation, and farm biosecurity protocols.',
      icon: ShieldCheck,
      link: '/services/technical',
      badge: 'Certified Experts',
      color: 'from-teal-500/20 to-teal-600/5',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-700',
    },
    {
      title: 'Agricultural Consultation Services',
      description: 'Turnkey commercial farm setup planning, pen construction architecture, feed formulation balancing, and disease diagnostic advisory.',
      icon: HelpCircle,
      link: '/services/consultation',
      badge: 'Professional Advisory',
      color: 'from-violet-500/20 to-violet-600/5',
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-700',
    },
  ];

  const categories = [
    {
      title: 'Day-Old Chicks',
      slug: 'chicks',
      description: 'First-generation commercial broilers and brown layer pullets from certified hatcheries.',
      image: '/products/Chicks/day old broiler.jpeg',
      badge: 'Tue & Thu Dispatch',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      title: 'Livestock Drugs',
      slug: 'drugs',
      description: 'NAFDAC-compliant antibiotics, anticoccidials, amino acids, and water-soluble vitamins.',
      image: '/products/Drugs/oxytet drug.jpeg',
      badge: 'NAFDAC Verified',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: 'Livestock Vaccines',
      slug: 'vaccines',
      description: 'Live freeze-dried viral vaccines shipped in thermal containers with ice gel packs.',
      image: '/Brand identity/damingrow logo.png',
      badge: '2°C–8°C Cold-Chain',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      title: 'Poultry Accessories',
      slug: 'accessories',
      description: 'Gas brooder heaters, plucker machines, nipple lines, bell drinkers, and transport crates.',
      image: '/products/Acessories/Gas brooder.jpeg',
      badge: 'Heavy-Duty',
      badgeColor: 'bg-slate-50 text-slate-700 border-slate-200',
    },
    {
      title: 'Point-of-Lay Birds',
      slug: 'point-of-lay',
      description: 'Fully grown 17–20 week pullets with complete immunization schedules, ready to produce eggs.',
      image: '/products/Chicks/day old pullet.jpeg',
      badge: 'Ready to Lay',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    },
  ];

  const pillars = [
    {
      title: 'Our Goal',
      description: 'To help improve the livestock sector in Nigeria and Africa, by introducing the latest information and healthy solutions to the livestock market.',
      icon: Target,
      gradient: 'from-emerald-500 to-teal-600',
      number: '01',
    },
    {
      title: 'Our Aim',
      description: 'To build vibrant communities of healthy livestock, directly underpinning food security and the healthy living of our people.',
      icon: Compass,
      gradient: 'from-teal-500 to-cyan-600',
      number: '02',
    },
    {
      title: 'Our Vision',
      description: 'Seeing the African livestock market becoming better, stronger, and globally competitive across international agricultural standards.',
      icon: Globe2,
      gradient: 'from-cyan-500 to-blue-600',
      number: '03',
    },
  ];

  return (
    <div className="font-body">

      {/* ====================================================================
          HERO SECTION — Cinematic Dark
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden min-h-[92vh] flex items-center">
        {/* Background grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />

        {/* Radial glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-emerald-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-teal-500/6 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto text-center space-y-8">

            {/* Section label */}
            <div className="flex justify-center">
              <div className="section-label-dark inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                Nigeria&apos;s Trusted Agro-Allied Solutions Partner
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.08]">
                Powering Africa&apos;s{' '}
                <span className="relative">
                  <span className="text-gradient-green">Livestock</span>
                </span>
                {' '}Future
              </h1>
              <p className="text-xl sm:text-2xl text-slate-400 font-medium">
                Premium Vaccines · Veterinary Drugs · Day-Old Chicks · Farm Equipment
              </p>
            </div>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              D-AminGrow is Nigeria&apos;s specialized agro-allied enterprise delivering biosecure livestock inputs, cold-chain vaccines, certified day-old chicks, and professional farm consultation across all 36 states.
            </p>

            {/* Motto */}
            <div className="flex justify-center">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2.5">
                <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Our Motto</span>
                <span className="text-slate-300 text-xs">—</span>
                <span className="text-emerald-400 text-sm font-bold italic">&ldquo;Your Satisfaction Is Our Priority&rdquo;</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20inquire%20about%20today%27s%20chick%20rates%20and%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                Get Today&apos;s Rates on WhatsApp
              </a>
              <Link
                href="/services"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
              >
                Our Services
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white font-medium px-5 py-4 rounded-xl transition-all duration-200 text-base"
              >
                About Us <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {[
                { icon: CheckCircle2, text: 'Certified Pureline Genetics' },
                { icon: CheckCircle2, text: '2°C–8°C Cold-Chain' },
                { icon: CheckCircle2, text: 'NAFDAC Compliant' },
                { icon: CheckCircle2, text: 'Nationwide Dispatch' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <badge.icon className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="relative rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm p-5 sm:p-6 text-center group hover:bg-white/8 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-emerald-400 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-600">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
      </section>

      {/* ====================================================================
          PRODUCT CATEGORIES — Stunning Cards
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-14 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              Product Catalogue
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
              Products We Supply & Distribute
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              All products available at current market rates. Contact us for confirmed pricing and booking.
            </p>
            {/* Market Rate Notice */}
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 text-sm">
              <span className="text-amber-600 font-bold">⚡ Market Rate Notice:</span>
              <span className="text-amber-800">Prices fluctuate weekly — contact for today&apos;s confirmed rates</span>
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 hover:border-emerald-200"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain p-6 group-hover:scale-108 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex text-xs font-bold px-3 py-1.5 rounded-full border ${cat.badgeColor}`}>
                      {cat.badge}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex flex-col flex-1 p-6 space-y-3">
                  <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs font-medium text-slate-400">Contact for pricing</span>
                    <span className="flex items-center gap-1 text-sm font-bold text-emerald-700 group-hover:gap-2 transition-all">
                      View <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SERVICES SECTION
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl space-y-4">
              <div className="section-label w-fit">
                <Zap className="h-3.5 w-3.5" />
                Comprehensive Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
                Our Professional Services
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                From certified day-old chick bookings to biosecure cold-chain vaccine delivery and expert farm technical consultations across Nigeria.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 shrink-0 group"
            >
              View All Services
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={idx}
                  href={srv.link}
                  className="service-card group relative rounded-3xl border border-slate-200 bg-white p-7 space-y-4 hover:border-slate-300 transition-all"
                >
                  {/* Icon */}
                  <div className="flex items-start justify-between">
                    <div className={`h-12 w-12 rounded-2xl ${srv.iconBg} ${srv.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                      idx === 0 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      idx === 1 ? 'bg-cyan-50 text-cyan-700 border-cyan-200' :
                      idx === 2 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      idx === 3 ? 'bg-slate-50 text-slate-700 border-slate-200' :
                      idx === 4 ? 'bg-amber-50 text-amber-800 border-amber-200' :
                      idx === 5 ? 'bg-teal-50 text-teal-700 border-teal-200' :
                      'bg-violet-50 text-violet-700 border-violet-200'
                    }`}>
                      {srv.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors leading-snug">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 group-hover:gap-2.5 transition-all pt-1">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          WHY CHOOSE US — With Trust Elements
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-[#050E08] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/6 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <div className="space-y-8">
              <div>
                <div className="section-label-dark w-fit mb-5">
                  <Star className="h-3.5 w-3.5" />
                  Why Choose D-AminGrow
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
                  Nigeria&apos;s Most Trusted{' '}
                  <span className="text-gradient-green">Agro-Allied</span>{' '}
                  Partner
                </h2>
              </div>

              <p className="text-base text-slate-400 leading-relaxed">
                We don&apos;t just sell products — we build lasting partnerships with Nigerian and African farmers, providing certified inputs, technical knowledge, and responsive support that drives farm profitability.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: ShieldCheck,
                    title: 'NAFDAC-Registered Products Only',
                    desc: 'Every veterinary drug and vaccine we supply is officially registered, with batch numbers traceable to the manufacturer.',
                  },
                  {
                    icon: Thermometer,
                    title: 'Verified Cold-Chain Integrity',
                    desc: 'Our vaccines never leave 2°C–8°C from our warehouse to your farm. Temperature-logged packaging included.',
                  },
                  {
                    icon: Truck,
                    title: 'Nationwide Motor Park Dispatch',
                    desc: 'Reliable delivery to all 36 states and FCT through trusted motor park networks with real waybill tracking.',
                  },
                  {
                    icon: Users,
                    title: 'Certified Livestock Professionals',
                    desc: 'Our team includes trained animal health technicians who provide hands-on farm support, not just product sales.',
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20become%20a%20partner."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  Partner With Us
                </a>
                <Link
                  href="/about"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  Learn Our Story <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right: Pillar Cards */}
            <div className="space-y-5">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={i}
                    className="relative rounded-3xl bg-white/5 border border-white/8 hover:border-emerald-500/30 p-6 sm:p-8 transition-all duration-300 hover:bg-white/8 group"
                  >
                    <div className="flex items-start gap-5">
                      <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold text-slate-600">{pillar.number}</span>
                          <h3 className="text-lg font-bold text-white font-heading">{pillar.title}</h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{pillar.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Motto Callout */}
              <div className="relative rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/25 p-6 sm:p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                <div className="relative">
                  <Award className="h-8 w-8 text-emerald-400 mb-3" />
                  <div className="text-2xl font-extrabold font-heading text-white italic">
                    &ldquo;Your Satisfaction Is Our Priority&rdquo;
                  </div>
                  <p className="text-sm text-slate-400 mt-2">— Our Core Motto & Operating Standard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FEATURED PRODUCTS
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-4">
              <div className="section-label w-fit">
                <TrendingUp className="h-3.5 w-3.5" />
                Popular Products
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Available for Booking & Order
              </h2>
              <p className="text-base text-slate-600">
                Premium verified livestock supplies. Contact us for current pricing.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-white rounded-xl border border-slate-200 px-4 py-3">
                <Clock className="h-4 w-4 text-emerald-600" />
                <span>Prices change weekly — <strong>call for today&apos;s rate</strong></span>
              </div>
              <Link
                href="/accessories"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 group"
              >
                View All Products
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          FARM PLANNING CALCULATORS & CLINICAL DIAGNOSTIC SUITE
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-[#050E08] text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-4">
              <div className="section-label-dark w-fit">
                <Calculator className="h-3.5 w-3.5 text-emerald-400" />
                <span>Agricultural Intelligence Suite</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
                Scientific Farm Calculators & <br />
                <span className="text-gradient-green">Clinical Decision Tools</span>
              </h2>
              <p className="text-base text-slate-300 max-w-xl leading-relaxed">
                Free mathematical and diagnostic utilities engineered for commercial broiler, layer, and turkey farmers across Nigeria and West Africa.
              </p>
            </div>

            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 shrink-0 group border border-emerald-500/30 rounded-xl px-5 py-3 hover:bg-emerald-500/10 transition-colors"
            >
              <span>Explore All 5 Calculators</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Feed Conversion Ratio (FCR)',
                desc: 'Compute exact feed-to-meat efficiency and identify money lost to feeder pan spillage.',
                href: '/calculators/fcr',
                icon: Scale,
                badge: 'Profit Optimizer',
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/10',
              },
              {
                title: 'Hen-Day Egg Production (HDP)',
                desc: 'Track laying percentages against ISA Brown standards and compute feed cost per crate of eggs.',
                href: '/calculators/egg-production',
                icon: Egg,
                badge: 'Layer Management',
                color: 'text-amber-400',
                bg: 'bg-amber-500/10',
              },
              {
                title: 'Disease Symptom Triager',
                desc: 'Algorithmic matching of flock symptoms to Coccidiosis, Newcastle, Gumboro, or CRD with vet SOS.',
                href: '/calculators/symptom-checker',
                icon: Stethoscope,
                badge: 'Emergency Clinical Tool',
                color: 'text-rose-400',
                bg: 'bg-rose-500/10',
              },
              {
                title: 'Brooder Space & Heaters',
                desc: 'Size canopy gas brooders, feeding trays, drinkers, and starter feed for tropical brooding.',
                href: '/calculators/brooder',
                icon: Thermometer,
                badge: 'Day-Old Brooding',
                color: 'text-cyan-400',
                bg: 'bg-cyan-500/10',
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <Link
                  key={i}
                  href={card.href}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/8 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`h-12 w-12 rounded-2xl ${card.bg} border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <Icon className={`h-6 w-6 ${card.color}`} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                        {card.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white font-heading group-hover:text-emerald-400 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                    <span>Launch Calculator</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ====================================================================
          KNOWLEDGE / BLOG SECTION
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-4">
              <div className="section-label w-fit">
                <BookOpen className="h-3.5 w-3.5" />
                Expert Knowledge
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Livestock Insights & Farm Guides
              </h2>
              <p className="text-base text-slate-600 max-w-xl leading-relaxed">
                Expert-authored articles on Nigerian poultry farming, veterinary protocols, and livestock management — your trusted resource for agricultural success.
              </p>
            </div>
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 shrink-0 group"
            >
              View All Articles
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <Link
                key={article.id}
                href={`/knowledge/${article.slug}`}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                      {article.category}
                    </span>
                    <span className="flex items-center text-xs text-slate-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    By <span className="font-semibold text-slate-700">{article.author.name}</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-emerald-700 group-hover:gap-2 transition-all">
                    Read Guide <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Tools promo */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link
              href="/calculators/brooder"
              className="group flex items-center gap-5 rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 hover:bg-emerald-50 hover:shadow-md transition-all"
            >
              <div className="rounded-2xl bg-emerald-600 p-4 text-white shadow-lg group-hover:scale-105 transition-transform shrink-0">
                <Calculator className="h-7 w-7" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Free Tool</div>
                <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-emerald-800">Brooder Equipment Calculator</h3>
                <p className="text-xs text-slate-600 mt-1">Calculate space, brooders & feeders for your flock size</p>
              </div>
            </Link>

            <Link
              href="/vaccination-program"
              className="group flex items-center gap-5 rounded-3xl border border-cyan-200 bg-cyan-50/60 p-6 hover:bg-cyan-50 hover:shadow-md transition-all"
            >
              <div className="rounded-2xl bg-cyan-600 p-4 text-white shadow-lg group-hover:scale-105 transition-transform shrink-0">
                <FileSpreadsheet className="h-7 w-7" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-700 mb-1">Free Tool</div>
                <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-cyan-800">Calibrated Vaccination Programs</h3>
                <p className="text-xs text-slate-600 mt-1">Official Broiler & Layer schedules with exact dates and printable PDF</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CERTIFIED HATCHERIES & COMMERCIAL CLIENT FARMS NETWORK
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Building2 className="h-3.5 w-3.5" />
              Trusted Poultry Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
              Hatcheries & Commercial Farms We Work With
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We connect commercial poultry farmers to certified grandparent and parent-stock genetics, paired with genuine cold-chain vaccines and scientific flock health programs.
            </p>
          </div>

          {/* Hatcheries strip */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900">Partner Breeder Operations</h3>
                <p className="text-xs text-slate-500">Certified breeding operations and day-old chick sources</p>
              </div>
              <Link
                href="/chicks"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                Book DOC Allocation <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {HATCHERY_PARTNERS.map((hatchery) => (
                <div
                  key={hatchery.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                      {hatchery.badge}
                    </span>
                    <h4 className="text-sm font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {hatchery.shortName}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {hatchery.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200/60 text-[11px] text-slate-600 font-medium">
                    {hatchery.specialtyBreeds[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commercial Client Farms */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900">Commercial Poultry Clients</h3>
                <p className="text-xs text-slate-500">Poultry operations trusting D-AminGrow across Nigeria</p>
              </div>
              <Link
                href="/reviews"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                All Client Testimonials <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CLIENT_FARMS.map((farm) => (
                <div
                  key={farm.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between hover:shadow-md hover:border-emerald-200 transition-all group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {farm.flockType.split('&')[0]}
                      </span>
                      <span className="text-[10px] text-slate-400">{farm.relationshipYears}</span>
                    </div>
                    <h4 className="text-sm font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {farm.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-600 shrink-0" />
                      {farm.location}
                    </p>
                    <p className="text-xs text-slate-600 italic leading-relaxed pt-2 border-t border-slate-100">
                      &ldquo;{farm.testimonialSnippet}&rdquo;
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Flock Size</span>
                    <span className="font-semibold text-slate-700">{farm.flockCapacity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CONSULTATION CTA — Full-width Dark Section
          ==================================================================== */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-[#050E08]">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/6" />

        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/6 rounded-full blur-3xl translate-y-1/2" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">

          <div className="section-label-dark mx-auto w-fit">
            <Phone className="h-3.5 w-3.5" />
            Professional Consultation
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Need Expert Guidance on<br />
            <span className="text-gradient-green">Flock Health or Farm Setup?</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Our veterinary and livestock engineering team provides personalized flock vaccination schedules, commercial broiler pen design, feed formulation, and disease diagnostics across Nigeria.
          </p>

          {/* Services highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Syringe, label: 'Vaccination Programs' },
              { icon: Building, label: 'Pen Construction' },
              { icon: Stethoscope, label: 'Health Diagnostics' },
              { icon: TrendingUp, label: 'Feed Formulation' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 border border-white/8 p-4">
                  <Icon className="h-6 w-6 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-300 text-center">{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
            >
              Book Farm Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20am%20requesting%20a%20veterinary%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-lg shadow-[#25D366]/20 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Our Vet Desk
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <MapPin className="h-4 w-4" />
            Serving all 36 Nigerian states + West Africa · Response within 2 hours
          </div>
        </div>
      </section>

    </div>
  );
}
