import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { HATCHERY_PARTNERS, CLIENT_FARMS } from '@/data/partners-and-clients';
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Sparkles,
  Target,
  Stethoscope,
  Truck,
  Building,
  HelpCircle,
  ShieldCheck,
  MessageCircle,
  Syringe,
  Zap,
  Calculator,
  Feather,
  Thermometer,
  Clock,
  Egg,
  Scale,
  Building2,
  AlertTriangle,
  XCircle,
  Check,
} from 'lucide-react';
import { LiveChickPricingSection } from '@/components/home/live-chick-pricing-section';
import { BASELINE_CHICK_RATES } from '@/lib/chicks/pricing-store';
import { HeroVideoPlayer } from '@/components/ui/hero-video-player';

export const metadata: Metadata = {
  title: 'D-AminGrow | Livestock Inputs, Day-Old Chicks & Poultry Solutions in Africa',
  description:
    'Dependable livestock inputs, day-old chick bookings, NAFDAC-approved veterinary products, and poultry solutions across Africa. Sourced from certified hatcheries with Monday & Thursday synchronized dispatch.',
  keywords: [
    'livestock inputs and poultry solutions in africa',
    'livestock inputs and poultry solutions in nigeria',
    'agro-allied company',
    'day-old chick booking',
    'livestock veterinary supplier',
    'poultry equipment distributor',
    'farm consultancy Nigeria',
    'african poultry solutions',
    'best poultry input supplier in nigeria',
    'online agro allied store nigeria',
    'where to buy poultry inputs in nigeria',
    'damingrow agro allied livestock solutions',
  ],
  openGraph: {
    title: 'D-AminGrow | Livestock Inputs, Day-Old Chicks & Poultry Solutions in Africa',
    description:
      'Dependable livestock inputs, day-old chick bookings, NAFDAC-approved veterinary products, and poultry solutions across Africa. Sourced from certified hatcheries with Monday & Thursday synchronized dispatch.',
    url: 'https://damingrow.com',
    siteName: 'D-AminGrow',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function HomePage() {
  const stats = [
    { value: '98.4%', label: 'Brooding Livability Rate', sub: 'Target benchmark across client farms' },
    { value: '36', label: 'States Dispatched', sub: 'Synchronized Monday & Thursday routes' },
    { value: '2°C–8°C', label: 'Cold-Chain Protection', sub: 'Thermal insulated packaging for live vaccines' },
    { value: '4 Major', label: 'Partner Hatcheries', sub: 'Direct allotment from Chi, Amo, Zartech, Supreme' },
  ];

  const coreServices = [
    {
      title: 'Day-Old Chick Bookings & Allocation',
      description: 'First-generation commercial broilers, layer pullets, turkeys, and cockerels sourced directly from certified hatcheries. Dispatched every Monday and Thursday.',
      icon: Feather,
      link: '/chicks',
      badge: 'Mon & Thu Dispatch',
      color: 'from-amber-500/20 to-amber-600/5',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
    },
    {
      title: 'Livestock Vaccine Cold-Chain Logistics',
      description: 'Strict 2°C–8°C cold preservation with high-density ice gel packs for viral and bacterial vaccines (Newcastle, Gumboro, Marek\'s, Fowl Pox).',
      icon: Syringe,
      link: '/services/vaccines',
      badge: '2°C–8°C Cold-Chain',
      color: 'from-cyan-500/20 to-cyan-600/5',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-700',
    },
    {
      title: 'NAFDAC-Approved Veterinary Products',
      description: 'Field-tested therapeutics from licensed pharmaceutical manufacturers: broad-spectrum antibiotics, anticoccidials, gut health probiotics, and water vitamins.',
      icon: Stethoscope,
      link: '/services/drugs',
      badge: 'Tested & Approved',
      color: 'from-emerald-500/20 to-emerald-600/5',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
    },
    {
      title: 'Housing, Brooding & Farm Equipment',
      description: 'Commercial infrared gas brooders, automatic nipple drinkers, bell drinkers, feeding troughs, transport crates, and heavy-duty defeathering machinery.',
      icon: Building,
      link: '/accessories',
      badge: 'Commercial Hardware',
      color: 'from-slate-500/20 to-slate-600/5',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-700',
    },
    {
      title: 'Point-of-Lay Pullet Distribution',
      description: 'Production-ready 17–20 week layer pullets with fully completed vaccination records. Ready to begin commercial egg collection within weeks.',
      icon: Egg,
      link: '/services/point-of-lay',
      badge: 'Production-Ready',
      color: 'from-amber-500/20 to-orange-600/5',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-800',
    },
    {
      title: 'Technical Advisory & Farm Setup',
      description: 'Practical pen construction planning, biosecurity reviews, ventilation design, and flock health triage to prevent preventable mortality.',
      icon: ShieldCheck,
      link: '/services/consultation',
      badge: 'Practical Advisory',
      color: 'from-teal-500/20 to-teal-600/5',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-700',
    },
  ];

  const categories = [
    {
      title: 'Day-Old Chicks',
      slug: 'chicks',
      description: 'Commercial broilers, pullets, turkeys, noilers, and cockerels with verified maternal antibodies.',
      image: '/products/Chicks/day old broiler.jpeg',
      badge: 'Mon & Thu Dispatch',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      title: 'Livestock Drugs',
      slug: 'drugs',
      description: 'Field-tested antibiotics, anticoccidials, organic acids, and anti-stress vitamin premixes.',
      image: '/products/Drugs/oxytet drug.jpeg',
      badge: 'Tested Formulations',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: 'Livestock Vaccines',
      slug: 'vaccines',
      description: 'Freeze-dried live vaccines preserved in insulated thermal containers with ice gel packs.',
      image: '/Brand identity/damingrow logo.png',
      badge: '2°C–8°C Cold-Chain',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      title: 'Poultry Accessories',
      slug: 'accessories',
      description: 'Radiant gas brooder heaters, nipple drinking systems, bell drinkers, and durable crates.',
      image: '/products/Acessories/Gas brooder.jpeg',
      badge: 'Durable Hardware',
      badgeColor: 'bg-slate-50 text-slate-700 border-slate-200',
    },
    {
      title: 'Point-of-Lay Birds',
      slug: 'point-of-lay',
      description: 'Fully grown 17–20 week pullets with complete immunization cards, ready for egg production.',
      image: '/products/Chicks/day old pullet.jpeg',
      badge: '17–20 Weeks',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    },
  ];

  // FAQ Schema JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the official sales and distribution days for day-old chicks at D-AminGrow?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Day-old chicks and poults are dispatched nationwide every Monday and Thursday. Booking cutoff is Sunday at 2:00 PM for Monday dispatch, and Wednesday at 2:00 PM for Thursday dispatch.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does D-AminGrow own a hatchery or manufacture veterinary medications?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. D-AminGrow is an authorized distributor and agro-allied supply partner. We secure direct allocations from premier Nigerian hatcheries (including Chi Farms, Amo Farms, Zartech, and Supreme) and distribute genuine, NAFDAC-approved veterinary products from licensed manufacturers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does D-AminGrow protect live vaccines during interstate transit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All live and freeze-dried vaccines are packaged in high-density styrofoam containers packed with frozen ice-gel blocks to maintain a continuous 2°C–8°C cold chain from our inventory storage to your receiving terminal.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the current price of day-old broiler chicks in Nigeria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Commercial Broilers are currently ₦2,000 per chick, packed 50 chicks per carton (₦100,000 per carton). Chick prices fluctuate weekly based on hatchery production and feed grain costs. Always confirm today’s rate via our live desk.',
        },
      },
    ],
  };

  return (
    <div className="font-body text-slate-800">
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
            <span className="text-emerald-300 font-semibold">Weekly Dispatch Days:</span>
            <span>All Day-Old Chicks & Vaccines move <strong>every Monday & Thursday</strong> nationwide.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Cutoff: Sun & Wed 2:00 PM</span>
            <span className="text-slate-600">|</span>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20please%20send%20me%20today%27s%20chick%20rates%20and%20booking%20schedule."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
            >
              Get Live Rates on WhatsApp <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ====================================================================
          HERO SECTION — High Conversion, Mobile First, 2-Column Grid
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden min-h-[90vh] flex items-center bg-[#050E08] text-white">
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
                  Dedicated Agro-Allied Solution Center
                </div>
              </div>

              {/* Exact Primary H1 Directive targeting Africa */}
              <div className="space-y-4 !mt-2.5">
                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                  Dependable Livestock Inputs, Day-Old Chicks &{' '}
                  <span className="text-gradient-green">Poultry Solutions</span> in Africa
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                  Protect your farm capital from day one. Direct allocations from reliable hatcheries, 2°C–8°C cold-chain vaccines, NAFDAC-approved medications, and commercial rearing equipment — serving farmers across Nigeria and all African markets.
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

              {/* Primary Action Zone — High Visual Weight */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20confirm%20today%27s%20chick%20rates%20and%20book%20my%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Check Today&apos;s Rates on WhatsApp
                </a>
                <Link
                  href="/chicks"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
                >
                  Book Day-Old Chicks
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/drugs"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-4 py-4 rounded-xl transition-all duration-200 text-sm hover:underline"
                >
                  Veterinary Products
                </Link>
              </div>

              {/* Trust Assurances */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs text-slate-400 border-t border-white/10">
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Chi, Amo, Zartech & Supreme</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>2°C–8°C Insulated Packs</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Monday & Thursday Routes</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Zero Fake or Diluted Drugs</span>
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): Visual Hero Video Player with Floating Telemetry */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <HeroVideoPlayer />
            </div>

          </div>

          {/* Operational Benchmarks */}
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
          LIVE BREED PRICING & CARTON BREAKDOWN — Connected to Admin Command
          ==================================================================== */}
      <LiveChickPricingSection initialRates={BASELINE_CHICK_RATES} />

      {/* ====================================================================
          PROBLEM EXPLANATION & WHY MOST FARMS FAIL — The Brutal Reality
          ==================================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit bg-red-50 text-red-700 border-red-200">
              <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
              The Reality of Poultry Margins
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why Most Nigerian Livestock Farms Bleed Capital
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Feed makes up 70% of your production costs. But when your inputs fail, you lose your feed investment before week four. Here is what actually ruins flock profitability in Nigeria:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Unverified Backyard Hatcheries</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chicks sourced from unofficial breeders often lack maternal antibodies. Navel infections and genetic runts leave farmers with 15%+ mortality in the first 14 days of brooding.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Broken Cold-Chain Vaccines</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Live vaccines transported in warm cartons or stored without continuous ice packs degrade into plain water. When Newcastle or Gumboro strikes, birds have zero real immunity.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Adulterated & Weak Medications</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cheap, unapproved veterinary drugs with under-dosed active ingredients fail to cure coccidiosis and respiratory issues, creating dangerous antibiotic resistance on your farm.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">Mid-Day Transit Heat Stress</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chicks dispatched in the afternoon heat arrive dehydrated, panting, and stressed. That initial shock permanently slows down their lifetime Feed Conversion Ratio (FCR).
              </p>
            </div>
          </div>

          <div className="mt-12 bg-emerald-900 text-white rounded-2xl p-7 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs uppercase tracking-wider text-emerald-300 font-bold">The D-AminGrow Rule</div>
              <div className="text-base sm:text-lg font-bold">Good feed cannot rescue bad genetics or spoiled vaccines.</div>
              <p className="text-xs text-emerald-200">Protect your money by starting with verified, traceable biological inputs.</p>
            </div>
            <Link
              href="/knowledge"
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs px-5 py-3 rounded-xl shrink-0 transition-colors"
            >
              Read Flock Protection Guides
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          OPERATIONAL FRAMEWORK — The 4-Pillar D-AminGrow Assurance System
          ==================================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <div className="section-label mx-auto w-fit">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Our Operating Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 4-Pillar D-AminGrow Assurance System
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We operate as your knowledgeable agro-allied partner. Every order moves through a strict 4-step quality filter before it reaches your farm gate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-slate-200 rounded-2xl p-7 hover:border-emerald-300 transition-colors bg-slate-50/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-emerald-700">Pillar 01</span>
                  <h3 className="text-lg font-bold text-slate-900">Direct Partner Sourcing Only</h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                We never buy from roadside vendors or unregulated hatcheries. All chicks come directly from certified breeding lines: <strong>CHI Farms, Amo Farms, Zartech, and Supreme Poultry</strong>. You receive verifiable parent-stock vigor with confirmed Marek&apos;s vaccination at hatch.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-7 hover:border-cyan-300 transition-colors bg-slate-50/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                  <Thermometer className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-cyan-700">Pillar 02</span>
                  <h3 className="text-lg font-bold text-slate-900">Strict 2°C–8°C Cold-Chain Packaging</h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Live viral vaccines (Lasota, Gumboro, Fowl Pox) are packed inside high-density insulated styrofoam coolers loaded with deep-frozen ice packs. The cold chain stays intact throughout interstate travel so your vaccines remain viable when administered.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-7 hover:border-amber-300 transition-colors bg-slate-50/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-amber-700">Pillar 03</span>
                  <h3 className="text-lg font-bold text-slate-900">Monday & Thursday Early-Morning Dispatch</h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Interstate transit is strictly synchronized. Birds and biologicals leave before the intense heat of the Nigerian afternoon. Waybill receipts and driver phone numbers are communicated right after dispatch for hassle-free collection at your local park.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-7 hover:border-teal-300 transition-colors bg-slate-50/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-teal-700">Pillar 04</span>
                  <h3 className="text-lg font-bold text-slate-900">Post-Arrival Brooding & Health Support</h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your purchase is not an isolated transaction. We guide you on water temperature, glucose stabilization, anti-stress administration, and brooder temperature regulation so your flock thrives through the critical first 7 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CORE SERVICE DELIVERABLES — Full Commercial Portfolio
          ==================================================================== */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit">
              <Target className="h-3.5 w-3.5 text-emerald-600" />
              Comprehensive Supply Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Products & Services We Deliver
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Equipping Nigerian poultry and livestock entrepreneurs with tested supplies, healthy genetics, and responsive advisory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-emerald-300 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 rounded-xl ${service.iconBg} ${service.iconColor} flex items-center justify-center`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <Link
                  href={service.link}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  View Specifications & Rates <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PROCESS BREAKDOWN — How to Place and Receive Your Order
          ==================================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              Simple 4-Step Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              How Your Chicks & Supplies Reach You
            </h2>
            <p className="text-base text-slate-600">
              Predictable, organized, and transparent from confirmation to arrival.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-2xl p-6 text-center space-y-3 bg-slate-50/50">
              <div className="h-10 w-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Lock In Allotment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Confirm your breed and quantity before cutoff (Sun 2 PM for Monday, Wed 2 PM for Thursday) via WhatsApp or our booking desk.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 text-center space-y-3 bg-slate-50/50">
              <div className="h-10 w-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Quality Inspection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chicks are checked at collection for closed navels, vigor, and weight. Vaccines are packed in thermal boxes with deep-frozen ice blocks.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 text-center space-y-3 bg-slate-50/50">
              <div className="h-10 w-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Synchronized Transit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Early-morning dispatch on Monday or Thursday. Waybill number, vehicle plate, and driver contact are sent to your phone immediately.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 text-center space-y-3 bg-slate-50/50">
              <div className="h-10 w-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900">Brooding Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Collect your birds, initiate our anti-stress water protocol, and follow our day-by-day flock management guidelines for maximum livability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          INFORMATION GAIN SECTIONS — Actionable Insights Competitors Miss
          ==================================================================== */}
      <section className="py-20 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <div className="section-label-dark mx-auto w-fit">
              <Zap className="h-3.5 w-3.5 text-emerald-400" />
              Practical Field Systems
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white tracking-tight">
              Actionable Insights for Commercial Farmers
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Real farm protocols we share with our partners to safeguard bird health, prevent transit losses, and maximize feed conversion.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Information Gain 1 */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                  Transit Protection
                </span>
                <h3 className="text-lg font-bold text-white mt-3 mb-2">
                  Transit Heat Stress Defense Protocol
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every degree above 32°C in a transit vehicle causes rapid moisture loss. Our Monday & Thursday pre-dawn dispatch strategy cuts transit dehydration by over 80%, ensuring chicks arrive alert and ready to drink immediately.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-emerald-300 flex items-center justify-between font-medium">
                <span>Impact: Cuts Day 1–3 losses below 1.5%</span>
              </div>
            </div>

            {/* Information Gain 2 */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-md">
                  Field Quality Check
                </span>
                <h3 className="text-lg font-bold text-white mt-3 mb-2">
                  5-Point Veterinary Drug Verification
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Before administering antibiotics, check: 1) Intact tamper-proof foil seal, 2) Valid NAFDAC registration number, 3) Batch number matching invoice, 4) Complete powder solubility in water without residue, and 5) Stated manufacturing expiry window.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-teal-300 flex items-center justify-between font-medium">
                <span>Impact: Eliminates treatment failure</span>
              </div>
            </div>

            {/* Information Gain 3 */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md">
                  Economic Analysis
                </span>
                <h3 className="text-lg font-bold text-white mt-3 mb-2">
                  The Real FCR Margin Sensitivity
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In a 1,000-bird broiler flock, an FCR difference of just 0.20 (1.60 vs 1.80) consumes 450 kg of additional feed. At current commercial feed prices, that eats ₦450,000 to ₦600,000 of your gross profit. Verified genetics pay for themselves.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-cyan-300 flex items-center justify-between font-medium">
                <span>Impact: Saves ₦500k+ in wasted feed</span>
              </div>
            </div>
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
                  1,200 Commercial Broiler Run (Ogun State Poultry Corridor)
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">Duration: 42 Days</span>
                <div className="text-sm font-bold text-emerald-700">Commercial Broiler Allotment</div>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed py-6">
              Grace Farm booked 24 cartons (1,200 chicks) dispatched on a Thursday schedule. Utilizing our pre-warmed brooding setup, electrolyte hydration protocol, and prompt Lasota immunization schedule, the flock achieved outstanding uniformity with minimal mortality.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 bg-slate-50 rounded-2xl p-5 text-center">
              <div>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">98.4%</div>
                <div className="text-xs text-slate-500 font-medium">Flock Livability (19 lost)</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">2.52 kg</div>
                <div className="text-xs text-slate-500 font-medium">Avg Weight at Day 42</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">1.58</div>
                <div className="text-xs text-slate-500 font-medium">Feed Conversion Ratio</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-700 font-heading">₦2.14M</div>
                <div className="text-xs text-slate-500 font-medium">Net Operating Margin</div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 italic">
                &ldquo;D-AminGrow delivered on time. The chicks were active right from the carton with zero runts.&rdquo; — Farm Manager, Grace Farm
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
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-slate-200 p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Radical Transparency</span>
              <h3 className="text-2xl font-extrabold font-heading text-slate-900">
                We May Not Be The Right Partner For You If...
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We are committed to healthy, profitable livestock communities. To protect our customers and standards, our services are specifically tailored for serious farmers. We may not be a good fit if:
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p><strong>You are looking for unregulated, cut-price black-market runts.</strong> We deal strictly in certified first-generation genetics from premier partner hatcheries at standard market rates.</p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p><strong>You plan to skip foundational biosecurity.</strong> No vaccine or antibiotic can compensate for dirty water, wet litter, or poorly ventilated pens.</p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p><strong>You need off-schedule deliveries.</strong> To ensure cold-chain integrity and prevent transit heat stress, day-old chicks and live vaccines are strictly moved on <strong>Mondays and Thursdays</strong>.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">If you value healthy birds, verified vaccines, and dependable support, we are here for you.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PRODUCT CATEGORY CATALOGUE — Clean Grid with Direct Links
          ==================================================================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              Product Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Products We Supply & Distribute
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Tested inputs from licensed manufacturers and certified hatcheries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cat.badgeColor}`}>
                      {cat.badge}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-base font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>Explore Products</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SCIENTIFIC FARM CALCULATORS — Value-Add Intelligence Tools
          ==================================================================== */}
      <section className="py-20 bg-[#050E08] text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3">
              <div className="section-label-dark w-fit">
                <Calculator className="h-3.5 w-3.5 text-emerald-400" />
                <span>Agricultural Intelligence Suite</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white tracking-tight">
                Scientific Farm Calculators & Decision Tools
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Free mathematical and diagnostic utilities engineered for commercial broiler, layer, and turkey farmers across Nigeria.
              </p>
            </div>

            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 shrink-0 group border border-emerald-500/30 rounded-xl px-5 py-3 hover:bg-emerald-500/10 transition-colors"
            >
              <span>Explore All Calculators</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/calculators/fcr"
              className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/8 hover:border-emerald-500/30 transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white group-hover:text-emerald-400 transition-colors mb-2">
                Feed Conversion Ratio (FCR) Calculator
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Calculate total feed consumption against live body weight to determine if your flock is meeting international growth curves.
              </p>
              <div className="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1">
                Calculate FCR <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/calculators/brooder"
              className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/8 hover:border-emerald-500/30 transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Thermometer className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white group-hover:text-amber-400 transition-colors mb-2">
                Brooder Space & Heat Calculator
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Determine required floor area, charcoal or gas heater counts, and chick guard diameter based on your flock size.
              </p>
              <div className="text-xs font-semibold text-amber-400 inline-flex items-center gap-1">
                Size Brooder <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/calculators/vaccination"
              className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/8 hover:border-emerald-500/30 transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
                <Syringe className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white group-hover:text-cyan-400 transition-colors mb-2">
                Vaccination Timetable Generator
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Generate custom, date-stamped vaccination schedules for Newcastle, Gumboro, and Fowl Pox based on your chick arrival day.
              </p>
              <div className="text-xs font-semibold text-cyan-400 inline-flex items-center gap-1">
                Plan Vaccine Dates <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PARTNER HATCHERIES & VERIFIED CLIENT TESTIMONIALS
          ==================================================================== */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <div className="section-label mx-auto w-fit">
              <Building2 className="h-3.5 w-3.5 text-emerald-600" />
              Verified Breeder Operations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Hatcheries We Allot From
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Direct hatchery allotments ensuring genuine genetics and verified maternal antibody transfer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {HATCHERY_PARTNERS.map((hatchery) => (
              <div
                key={hatchery.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                    {hatchery.badge}
                  </span>
                  <h4 className="text-base font-bold font-heading text-slate-900">
                    {hatchery.shortName}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {hatchery.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-700 font-semibold">
                  {hatchery.specialtyBreeds[0]}
                </div>
              </div>
            ))}
          </div>

          {/* Client Testimonials */}
          <div className="border-t border-slate-200 pt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold font-heading text-slate-900">Some Commercial Poultry Clients</h3>
                <p className="text-xs text-slate-500">Commercial farms relying on D-AminGrow across Nigeria</p>
              </div>
              <Link
                href="/reviews"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                All Farm Testimonials <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CLIENT_FARMS.slice(0, 4).map((farm) => (
                <div
                  key={farm.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between hover:shadow-md hover:border-emerald-200 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {farm.flockType.split('&')[0]}
                      </span>
                      <span className="text-[10px] text-slate-400">{farm.relationshipYears}</span>
                    </div>
                    <h4 className="text-sm font-bold font-heading text-slate-900">
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
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
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
          FAQ SECTION — Clear Answers to High-Intent Buyer Questions
          ==================================================================== */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit">
              <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Got Questions? We Have Honest Answers
            </h2>
            <p className="text-sm text-slate-600">
              Straightforward answers about our distribution network, chick booking, and cold chain.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                When are chicks dispatched and what are the booking deadlines?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                All day-old chicks, turkeys, noilers, and cockerels are dispatched nationwide every <strong>Monday and Thursday</strong>. To ensure your order is confirmed with the partner hatcheries, you must book before <strong>Sunday 2:00 PM</strong> for Monday dispatch, and before <strong>Wednesday 2:00 PM</strong> for Thursday dispatch.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                Are you a hatchery or manufacturer?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                No. D-AminGrow is an authorized agro-allied supply and livestock distribution enterprise. We hold established allotment agreements with premier certified Nigerian hatcheries (Chi Farms, Amo Farms, Zartech, Supreme) and distribute genuine, NAFDAC-approved veterinary products from licensed pharmaceutical laboratories. We do not manufacture drugs or operate hatcheries.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                How do you ensure vaccines stay potent during transit?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                All viral vaccines are packed in thick, insulated styrofoam coolers surrounded by deep-frozen ice packs. This locks the temperature between <strong>2°C and 8°C</strong> throughout interstate transit, ensuring your live vaccines do not lose antigenic potency.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                How do I receive my chicks after dispatch?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                Once dispatched from our transit hub, we send you the waybill slip, driver phone number, and vehicle registration. You can collect your cartons at your designated local interstate transport terminal, or request direct farm-gate delivery for bulk orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FINAL CALL TO ACTION — High-Trust Conversion Closer
          ==================================================================== */}
      <section className="py-20 relative overflow-hidden bg-[#050E08] text-white">
        <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="section-label-dark mx-auto w-fit">
            <Phone className="h-3.5 w-3.5 text-emerald-400" />
            Fast WhatsApp Response
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Ready to Secure Your Flock Allotment &<br />
            <span className="text-gradient-green">Farm Supplies for Next Dispatch?</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect with our live distribution desk to check real-time hatchery allotments, confirm current carton rates, or receive clinical dosage guidance for your flock.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20am%20ready%20to%20book%20my%20order%20for%20the%20upcoming%20dispatch."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base shadow-xl shadow-[#25D366]/25 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Chat Directly on WhatsApp
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
            >
              Contact Our Desk
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="pt-6 text-xs text-slate-400 flex items-center justify-center gap-6">
            <span>Call / WhatsApp: +234 813 916 9402</span>
            <span>•</span>
            <span>Monday & Thursday Dispatch</span>
            <span>•</span>
            <span>Your Satisfaction Is Our Priority</span>
          </div>
        </div>
      </section>
    </div>
  );
}
