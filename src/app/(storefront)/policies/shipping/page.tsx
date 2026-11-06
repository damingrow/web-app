import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  Truck,
  Thermometer,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MessageCircle,
  ArrowRight,
  Building2,
  ChevronRight,
  Zap,
  Activity,
  Scale,
  FileCheck,
  Check,
  Info,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Cold-Chain Delivery & Live Bird Shipping Policy | D-AminGrow',
  description:
    'Nationwide 2°C–8°C cold-chain vaccine delivery and day-old chick interstate shipping protocol across Nigeria. Certified hatcheries, thermal insulated packaging, and live-arrival guarantees.',
  keywords: [
    'livestock cold chain delivery nigeria',
    'vaccine transit temperature',
    'live bird dispatch transit',
    'chick mortality replacement policy',
    'temperature-controlled delivery',
    'interstate transport hubs',
    'day old chick delivery policy in nigeria',
    'how are poultry vaccines transported in nigeria',
    'chick transit mortality guarantee',
    'interstate poultry dispatch parks ibadan lagos abuja',
    'poultry vaccine shipping nigeria',
    'damingrow shipping protocol',
  ],
  openGraph: {
    title: 'Cold-Chain Delivery & Live Bird Shipping Policy | D-AminGrow',
    description:
      'Official livestock logistics protocol: 2°C–8°C continuous cold-chain protection for vaccines, dawn live chick dispatches, and guaranteed interstate hub collection across all 36 Nigerian states.',
    url: 'https://damingrow.com/policies/shipping',
    siteName: 'D-AminGrow',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function ShippingPolicyPage() {
  const stats = [
    {
      value: '2°C–8°C',
      label: 'Continuous Cold-Chain',
      sub: 'Phase-change gel coolant in high-density EPS boxes',
    },
    {
      value: '36 States',
      label: 'Interstate Transport Hubs',
      sub: 'Pre-dawn Monday & Thursday departure routes',
    },
    {
      value: '98.4%',
      label: 'Arrival Livability Rate',
      sub: 'Documented average across verified commercial farms',
    },
    {
      value: '100%',
      label: 'Transit Mortality Cover',
      sub: 'Guaranteed credit on verified in-transit dead-on-arrival',
    },
  ];

  const failurePoints = [
    {
      num: '01',
      title: 'Thermal Vaccine Inactivation',
      tag: 'Viral Viability Collapse',
      color: 'bg-red-50 text-red-700 border-red-200',
      description:
        'Live attenuated vaccines (Lasota, Gumboro, Marek’s) are living viral biologicals. When transported in unchilled cartons or stored above 8°C in tropical transit, the viral titers degrade into inert water within 120 minutes. Farmers vaccinate a flock with zero active antibodies and lose millions when field disease breaks out.',
    },
    {
      num: '02',
      title: 'Mid-Day Highway Heat Stress',
      tag: 'Permanent FCR Damage',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      description:
        'Day-old chicks loaded at 11:00 AM suffer intense dehydration and panting inside congested commercial vehicle boots. Even if they survive transit, the severe gut stress and yolk-sac dehydration permanently compromise their lifetime Feed Conversion Ratio (FCR), adding weeks to your target market weight.',
    },
    {
      num: '03',
      title: 'Roadside Aggregators & Commingled Birds',
      tag: 'Pathogen Contamination',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      description:
        'Unregulated third-party brokers frequently mix birds from backyard incubators with commercial hatchery cartons at motor parks. This cross-contamination introduces early salmonella, navel infections, and infectious bursal disease straight into virgin farm brooders.',
    },
    {
      num: '04',
      title: 'Vanishing Carrier Accountability',
      tag: 'Zero Recourse for Losses',
      color: 'bg-slate-100 text-slate-700 border-slate-200',
      description:
        'Standard interstate courier drivers accept zero liability for live cargo. When a vehicle breaks down or cartons suffocate under heavy luggage, the merchant points fingers at the driver, leaving the buyer to absorb 15% to 30% Dead-on-Arrival (DOA) rates without replacement or refund.',
    },
  ];

  const pillars = [
    {
      num: '01',
      title: 'Direct Primary Hatchery Allotment',
      badge: 'Zero Staging Delay',
      desc: 'All chicks are collected directly from verified primary parent-stock hatcheries—Chi Farms, Amo Farms, Zartech, and Supreme Poultry—within hours of hatching. Birds never sit in retail holding pens or open-air city stalls.',
      icon: Building2,
      color: 'border-emerald-200 bg-emerald-50/40 text-emerald-800',
    },
    {
      num: '02',
      title: '2°C–8°C Thermal Sealed Packaging',
      badge: 'Medical-Grade Coolers',
      desc: 'Biological vaccines are sealed inside thick Expanded Polystyrene (EPS) thermal coolers lined with calibrated phase-change gel ice packs. We maintain unbroken temperature logs capable of holding sub-8°C conditions for up to 48 hours.',
      icon: Thermometer,
      color: 'border-cyan-200 bg-cyan-50/40 text-cyan-800',
    },
    {
      num: '03',
      title: 'Pre-Dawn Synchronized Dispatch',
      badge: '04:30 AM – 06:30 AM',
      desc: 'Interstate transport vehicles roll out in the cool pre-dawn hours every Monday and Thursday. Traveling before the tropical sun peaks minimizes thermal load, avoids highway congestion, and prevents heat-induced chick panting.',
      icon: Truck,
      color: 'border-amber-200 bg-amber-50/40 text-amber-800',
    },
    {
      num: '04',
      title: 'Driver Waybill Telemetry & Live Handover',
      badge: 'Verified Manifest',
      desc: 'We register vehicle plate numbers, motor park union receipts, and drivers’ direct phone numbers. The complete manifest is transmitted to your WhatsApp before departure so you are on standby when the vehicle arrives.',
      icon: FileCheck,
      color: 'border-teal-200 bg-teal-50/40 text-teal-800',
    },
  ];

  const serviceCategories = [
    {
      title: 'Day-Old Chicks & Poults',
      subtitle: 'Broilers, Pullets, Turkeys & Cockerels',
      badge: 'Mon & Thu Dispatch',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      image: '/products/Chicks/day old broiler.jpeg',
      link: '/chicks',
      protocol:
        'Reinforced 50-bird partitioned cardboard cartons with precision ventilation apertures and absorbent wood shavings. Dispatched within 24–36 hours of hatch to capitalize on residual yolk-sac nourishment.',
      requirements: [
        'Cutoff: Sunday 2:00 PM for Monday / Wednesday 2:00 PM for Thursday',
        'Standard packaging: 50 chicks per box + 2 hatchery replacement extras',
        'Mandatory collection at designated state central transit parks',
      ],
    },
    {
      title: 'Biological Livestock Vaccines',
      subtitle: 'Live Freeze-Dried & Killed Formulations',
      badge: '2°C–8°C Cold-Chain',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      image: '/products/Vaccines/lasota-vaccine.jpeg',
      link: '/vaccines',
      protocol:
        'Preserved inside high-density EPS thermal boxes with food-grade phase-change refrigerant ice packs. Dispatched strictly Monday through Wednesday to guarantee zero weekend depot stagnation.',
      requirements: [
        'Strict 2°C–8°C continuous temperature preservation',
        'Direct airport cargo or express interstate passenger bus routing',
        'Farmer must transfer vials into farm refrigeration immediately upon pickup',
      ],
    },
    {
      title: 'NAFDAC Veterinary Therapeutics',
      subtitle: 'Antibiotics, Anticoccidials & Vitamins',
      badge: 'Tested Formulations',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      image: '/products/Drugs/oxytet drug.jpeg',
      link: '/drugs',
      protocol:
        'Moisture-shielded cartons with tamper-evident factory seals. Batch-tracked from registered pharmaceutical manufacturers to protect water-soluble compounds from humidity and direct UV degradation.',
      requirements: [
        'Full batch traceability and active NAFDAC registration numbers',
        'Dispatched daily with 24–48 hour interstate park delivery',
        'Tamper-proof security taping across all medicine consignments',
      ],
    },
    {
      title: 'Commercial Housing & Brooding Hardware',
      subtitle: 'Gas Brooders, Automatic Drinkers & Crates',
      badge: 'Heavy Freight',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
      image: '/products/Acessories/Gas brooder.jpeg',
      link: '/accessories',
      protocol:
        'Heavy-duty freight logistics for radiant infrared brooders, automated nipple drinking lines, poultry transport crates, and defeathering machinery. Dispatched via interstate cargo terminals.',
      requirements: [
        'Reinforced protective wrapping and wooden crate bracing for motors',
        'Transparent waybill tariffs based on weight and cubic volume',
        'State capital freight park collection within 2–4 business days',
      ],
    },
  ];

  const transitHubs = [
    {
      corridor: 'Southwest & Central Beltway',
      depots: 'Lagos (Ojota, Berger, Ikorodu), Ibadan (Iwo Road, Ojoo), Abeokuta, Osogbo, Akure, Ado-Ekiti',
      transitTime: '4 – 8 Hours (Same-Day Arrival)',
      departure: '05:00 AM – 06:30 AM',
    },
    {
      corridor: 'North-Central & FCT Corridor',
      depots: 'Abuja (Utako, Mararaba, Zuba), Ilorin, Minna, Jos, Makurdi, Lafia, Lokoja',
      transitTime: '10 – 14 Hours (Evening / Dawn Arrival)',
      departure: '04:30 AM – 05:30 AM',
    },
    {
      corridor: 'North-West & Northern Terminals',
      depots: 'Kano (Unguwa Uku), Kaduna (Mando, Kawo), Katsina, Sokoto, Zaria, Gusau',
      transitTime: '16 – 22 Hours (Direct Express Route)',
      departure: '04:30 AM Express Run',
    },
    {
      corridor: 'South-East & South-South Niger Delta',
      depots: 'Port Harcourt (Mile 1), Benin City, Enugu, Asaba, Owerri, Warri, Calabar, Uyo',
      transitTime: '8 – 14 Hours (Scheduled Direct Drops)',
      departure: '05:00 AM – 06:00 AM',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does D-AminGrow not offer direct doorstep delivery for day-old chicks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Doorstep delivery for live day-old chicks in Nigeria is biologically irresponsible. Multi-stop delivery vans get stuck in city traffic and negotiate bad rural access roads, extending transit time by 4 to 8 hours. This extra delay causes deadly heat stress, dehydration, and early chick mortality. Delivering to central interstate motor parks allows chicks to travel on fast, nonstop buses and reach the farm brooder hours faster.',
        },
      },
      {
        '@type': 'Question',
        name: 'What exact temperature must be maintained during poultry vaccine transport?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Live viral poultry vaccines (such as Newcastle LaSota and Gumboro) must be kept strictly between 2°C and 8°C throughout transit. Exposure to ambient temperatures above 8°C deactivates the fragile live virus within hours, rendering the vaccine completely ineffective. D-AminGrow ships all biologicals in medical-grade Expanded Polystyrene (EPS) cool boxes packed with frozen phase-change gel ice packs.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is D-AminGrow’s chick transit mortality and replacement guarantee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every standard carton of 50 day-old chicks includes 2 extra chicks (4%) from certified hatcheries to cushion normal transit fatigue. If verified transit mortality exceeds this 2% allowance upon unboxing with the driver at the collection park, D-AminGrow replaces the lost birds or issues an immediate financial credit to your farm account.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the official weekly dispatch days and order cutoff times?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Day-old chicks are dispatched nationwide every Monday and Thursday. Booking cutoff is Sunday at 2:00 PM for Monday dispatch, and Wednesday at 2:00 PM for Thursday dispatch. Vaccine orders are shipped Mondays through Wednesdays to avoid courier delays over the weekend.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are interstate waybill charges paid?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prices displayed on the storefront are ex-depot hatchery rates. Interstate waybill charges depend on destination distance and carton volume. The exact driver fee is communicated prior to dispatch and can be included on your main commercial invoice or paid directly to the transport driver upon collection.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can D-AminGrow ship poultry inputs to Ghana, Benin, or other ECOWAS countries?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Cross-border consignments to ECOWAS nations (Ghana, Benin, Togo, Cameroon) require FMARD Veterinary International Health Certificates and import clearance from the receiving country’s Ministry of Agriculture. These orders are coordinated through our specialized international desk via air freight or bonded transit.',
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
            <span className="text-emerald-300 font-semibold">Weekly Dispatch Days:</span>
            <span>All Day-Old Chicks & Vaccines move <strong>every Monday & Thursday</strong> nationwide.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Cutoff: Sun & Wed 2:00 PM</span>
            <span className="text-slate-600">|</span>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20please%20send%20me%20today%27s%20chick%20rates%20and%20dispatch%20schedule."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
            >
              Check Today&apos;s Dispatch On WhatsApp <ArrowRight className="h-3 w-3" />
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
                  Nationwide Cold-Chain Logistics Protocol
                </div>
              </div>

              {/* Exact Primary H1 Directive */}
              <div className="space-y-4 !mt-2.5">
                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                  Nationwide Cold-Chain Delivery &{' '}
                  <span className="text-gradient-green">Live Bird Shipping</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                  Protect your livestock investment from the single largest cause of early farm mortality: broken transit cold chains and suffocating road stress. Verified direct allocations from Chi, Amo, Zartech, and Supreme, packed in pharmaceutical-grade 2°C–8°C thermal coolers and dispatched pre-dawn every Monday and Thursday across Nigeria and ECOWAS corridors.
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
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20please%20send%20me%20today%27s%20chick%20rates%20and%20dispatch%20schedule."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Check Today&apos;s Dispatch On WhatsApp
                </a>
                <Link
                  href="/chicks"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
                >
                  Book Day-Old Chicks
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/vaccines"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-4 py-4 rounded-xl transition-all duration-200 text-sm hover:underline"
                >
                  Order Cold-Chain Vaccines
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
                  <span>2°C–8°C Thermal Boxes</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Pre-Dawn Mon & Thu Routes</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Live-Arrival Replacement</span>
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): High-Impact Cold-Chain Telemetry Card */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="rounded-3xl card-dark p-6 sm:p-7 border border-emerald-500/20 shadow-2xl relative overflow-hidden space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase text-emerald-400 font-heading">
                      Live Transit Monitor
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold bg-white/10 text-slate-300 px-3 py-1 rounded-full">
                    Route Sync Active
                  </span>
                </div>

                {/* Calibrated Temperature Reading */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-medium">Vaccine Box Sensor</div>
                    <div className="text-3xl font-extrabold text-cyan-400 font-heading tracking-tight flex items-center gap-2">
                      3.8°C <span className="text-xs font-normal text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">Optimal (2°C–8°C)</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
                    <Thermometer className="h-6 w-6" />
                  </div>
                </div>

                {/* Real Dispatch Corridor Data */}
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Primary Corridors</span>
                    <span className="font-semibold text-white">Ibadan • Lagos • Abuja • Kano • PH</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Packaging Type</span>
                    <span className="font-semibold text-white">Expanded Polystyrene + Dry Ice Gel</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-400">Departure Window</span>
                    <span className="font-semibold text-emerald-400">04:30 AM – 06:30 AM (Pre-Heat)</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-slate-400">Arrival Handover</span>
                    <span className="font-semibold text-white">Terminal Driver Phone & Physical Count</span>
                  </div>
                </div>

                {/* Verification Notice */}
                <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-emerald-200">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Every shipment is registered with driver telephone numbers and collection manifests, giving you predictable pickup timing at your state capital motor park.
                  </p>
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
          PROBLEM EXPLANATION & WHY FARMS BLEED CAPITAL — The Reality of Transit
          ==================================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit bg-red-50 text-red-700 border-red-200 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold">
              <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
              The Cost Of Broken Logistics
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why Most Livestock Deliveries Fail in Nigeria
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Feed makes up 70% of your production costs. But when your transit logistics break down, your investment dies before the birds or biologicals even reach your brooder house. Here is what actually ruins flock capital across interstate routes:
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
                The D-AminGrow Operational Reality
              </div>
              <div className="text-lg sm:text-xl font-bold font-heading">
                A cheap carton or warm vaccine is the most expensive mistake in poultry farming.
              </div>
              <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
                Saving ₦1,000 on uninsulated shipping costs you ₦400,000 in unprevented Gumboro mortalities and ruined bird genetics.
              </p>
            </div>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20verify%20delivery%20schedules%20to%20my%20state."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs px-6 py-3.5 rounded-xl shrink-0 transition-colors shadow-md"
            >
              Verify Route To Your State
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          APPROACH & FRAMEWORK — The 4-Pillar D-AminGrow Cold-Chain Protocol
          ==================================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <div className="section-label mx-auto w-fit inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Our Cold-Chain Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 4-Pillar Cold-Chain & Live Dispatch Protocol
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We do not treat live day-old chicks or viral biologicals like inanimate postal parcels. Every single order is processed through a strict multi-stage preservation framework.
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
          UNIQUE INFORMATION GAIN — Field Science & The Thermal Decay Curve
          ==================================================================== */}
      <section className="py-20 bg-[#050E08] text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label-dark mx-auto w-fit inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              Field Science & Biological Data
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              The Thermal Decay Curve: What Happens to Live Vaccines at 34°C
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Competitors casually advise farmers to &ldquo;keep vaccines cool.&rdquo; Here is the documented scientific reality of what happens when vaccine temperature integrity is breached in transit:
            </p>
          </div>

          {/* Temperature Comparison Matrix */}
          <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-white/10 text-slate-200 text-xs uppercase font-heading tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-4 px-6">Transit Temperature</th>
                    <th className="py-4 px-6">Biological Status (After 4 Hours)</th>
                    <th className="py-4 px-6">Seroconversion & Immunity</th>
                    <th className="py-4 px-6">Economic Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr className="bg-emerald-500/10 font-medium">
                    <td className="py-4 px-6 text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span><strong>2°C – 8°C</strong> (D-AminGrow EPS Cooler)</span>
                    </td>
                    <td className="py-4 px-6 text-white">100% Active Live Viral Titers Preserved</td>
                    <td className="py-4 px-6 text-emerald-300">Robust protective maternal & field antibody titers</td>
                    <td className="py-4 px-6 text-emerald-400 font-bold">98%+ Flock Protection against challenge</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-amber-300 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                      <span><strong>15°C – 22°C</strong> (Leaking Ice Water Bag)</span>
                    </td>
                    <td className="py-4 px-6">40% to 65% Inactivation of Freeze-Dried Particles</td>
                    <td className="py-4 px-6">Erratic, uneven antibody response across birds</td>
                    <td className="py-4 px-6 text-amber-300">Frequent subclinical vaccine failure in week 3</td>
                  </tr>
                  <tr className="bg-red-500/10">
                    <td className="py-4 px-6 text-red-300 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                      <span><strong>30°C – 38°C</strong> (Uninsulated Vehicle Trunk)</span>
                    </td>
                    <td className="py-4 px-6 text-red-200 font-semibold">Total Viral Denaturation (Dead Biologic)</td>
                    <td className="py-4 px-6 text-red-300">0% Protection (Equivalent to injecting plain water)</td>
                    <td className="py-4 px-6 text-red-400 font-bold">Total flock vulnerability; 40–80% outbreak mortality</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-white/5 border-t border-white/10 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>
                  <strong>Practical Field Insight:</strong> Never pack live vaccines in ordinary polythene bags with block ice. As ice melts, water seeps into rubber vial stoppers, contaminating biologicals and warming into a heat conductor.
                </span>
              </div>
              <Link
                href="/services/vaccines"
                className="text-emerald-400 hover:text-emerald-300 font-semibold underline shrink-0"
              >
                Learn About Our Vaccine Protocols →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SERVICE DELIVERABLES — Category-by-Category Handling Protocols
          ==================================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              Specialized Handling Guidelines
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Specialized Transport Protocols by Product Category
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Different agricultural inputs demand radically different biological environments. We tailor transit packaging strictly according to live organism specifications:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategories.map((cat, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${cat.badgeColor}`}>
                      {cat.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Standard Logistics Protocol</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-heading text-slate-900">
                      {cat.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cat.protocol}
                  </p>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                      Mandatory Delivery Rules:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {cat.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={cat.link}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                  >
                    Explore {cat.title} Specifications <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PROCESS BREAKDOWN — 4-Step Order to Brooder Sequence
          ==================================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              Simple 4-Step Sequence
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              How Your Chicks & Vaccines Reach Your Farm
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Predictable, transparent, and organized from hatchery confirmation to unboxing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-3xl p-6 text-center space-y-3 bg-slate-50/50 hover:border-emerald-300 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-base font-heading shadow-md">
                1
              </div>
              <h3 className="text-base font-bold font-heading text-slate-900">Lock In Allotment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Confirm your breed, quantities, and vaccines before order cutoff: <strong>Sunday 2 PM for Monday dispatch</strong>, and <strong>Wednesday 2 PM for Thursday dispatch</strong>.
              </p>
            </div>

            <div className="border border-slate-200 rounded-3xl p-6 text-center space-y-3 bg-slate-50/50 hover:border-emerald-300 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-base font-heading shadow-md">
                2
              </div>
              <h3 className="text-base font-bold font-heading text-slate-900">Grading & Packing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chicks are graded for dry healed navels, standing vigor, and alertness. Vaccines are sealed in EPS cool boxes with sub-zero phase-change gel bricks.
              </p>
            </div>

            <div className="border border-slate-200 rounded-3xl p-6 text-center space-y-3 bg-slate-50/50 hover:border-emerald-300 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-base font-heading shadow-md">
                3
              </div>
              <h3 className="text-base font-bold font-heading text-slate-900">Pre-Dawn Dispatch</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consignments leave before 06:30 AM. Vehicle registration numbers, waybill copies, and driver telephone contacts are sent directly to your WhatsApp.
              </p>
            </div>

            <div className="border border-slate-200 rounded-3xl p-6 text-center space-y-3 bg-slate-50/50 hover:border-emerald-300 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-base font-heading shadow-md">
                4
              </div>
              <h3 className="text-base font-bold font-heading text-slate-900">Joint Handover</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Collect your carton at the state transit park. Open and count alongside the driver to verify live arrival before transferring birds into pre-warmed brooders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          INTERSTATE ROUTE MATRIX & TERMINAL HUBS
          ==================================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="section-label mx-auto w-fit inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <MapPin className="h-3.5 w-3.5 text-emerald-600" />
              National Dispatch Network
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Interstate Transport Hubs & Transit Timelines
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We operate scheduled express connections into designated motor park transit terminals across all geopolitical zones:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transitHubs.map((hub, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4 hover:border-emerald-300 transition-all"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                    {hub.corridor}
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {hub.transitTime}
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400 font-medium">Designated Terminals:</span>
                    <p className="text-slate-700 font-semibold mt-0.5">{hub.depots}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Standard Dispatch Time:</span>
                    <p className="text-slate-800 font-medium mt-0.5">{hub.departure}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tariffs & ECOWAS Cross-Border Notice */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-2 text-xs sm:text-sm text-slate-700">
              <h3 className="font-bold font-heading text-slate-900 text-base">
                Interstate Waybill Tariffs & Driver Fares
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs">
                Prices listed on our storefront are ex-depot hatchery rates. Interstate waybill charges vary by state distance and carton quantity according to National Motor Park Union tariffs. The exact delivery fare is confirmed before dispatch and can be billed on your invoice or settled directly with the driver at pickup.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-2 text-xs sm:text-sm text-slate-700">
              <h3 className="font-bold font-heading text-slate-900 text-base">
                ECOWAS Regional Cross-Border Shipments
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs">
                For commercial agricultural shipments bound for Ghana, Benin, Cameroon, or Togo: live bird and biological export requires mandatory <strong>FMARD Veterinary International Health Certificates</strong> and import permits. Contact our specialized desk for air cargo clearance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHICK TRANSIT MORTALITY GUARANTEE & REPLACEMENT POLICY
          ==================================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-3xl border border-emerald-200 bg-emerald-50/40 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200">
                <Scale className="h-3.5 w-3.5 text-emerald-700" />
                Live-Arrival Protection
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Our Chick Transit Mortality Guarantee
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                We back our logistics protocol with a transparent, no-nonsense replacement commitment. Here is how your investment is safeguarded:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-white rounded-2xl p-5 border border-emerald-100 space-y-2">
                <span className="font-bold text-emerald-900 font-heading flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Hatchery Buffer Included
                </span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Every standard carton contains 50 chicks plus <strong>2 extra buffer chicks (4%)</strong> from the hatchery to protect you against minor travel fatigue.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-emerald-100 space-y-2">
                <span className="font-bold text-emerald-900 font-heading flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Joint Inspection at Terminal
                </span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  You or your farm representative must open and count cartons alongside the passenger bus driver at the motor park before leaving the station.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-emerald-100 space-y-2">
                <span className="font-bold text-emerald-900 font-heading flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Instant DOA Credit or Replacement
                </span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  If verified dead-on-arrival exceeds the 2 extra chicks, provide photo/video proof endorsed by the driver. We credit your farm ledger or replace birds on the next dispatch.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-emerald-100 space-y-2">
                <span className="font-bold text-emerald-900 font-heading flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  24-Hour Settlement Desk
                </span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Claims submitted at the park are resolved by our customer care desk within 24 hours. No drawn-out disputes, no bureaucratic runarounds.
                </p>
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
                  Verified Transit Case Study
                </span>
                <h3 className="text-2xl font-extrabold font-heading text-slate-900 mt-2">
                  1,200 Commercial Broilers & 100 Vials Lasota (Ibadan to Abuja)
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">Route: 520 km (11 Hours)</span>
                <div className="text-sm font-bold text-emerald-700">Commercial Broiler Allotment</div>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed py-6">
              Grace Crest Farm in Gwagwalada, FCT, booked 24 cartons of day-old broilers alongside Newcastle LaSota vaccines for Thursday dispatch. Loaded pre-dawn in Ibadan at 05:00 AM, the consignment arrived at Utako Park, Abuja at 04:15 PM. The vaccine cooler measured 4.2°C on arrival, and the chick mortality count was just 3 birds across 1,224 total chicks received.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 bg-slate-50 rounded-2xl p-5 text-center">
              <div>
                <div className="text-2xl font-extrabold text-cyan-700 font-heading">4.2°C</div>
                <div className="text-xs text-slate-500 font-medium">Vaccine Box Temp at Pickup</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">3 Chicks</div>
                <div className="text-xs text-slate-500 font-medium">Transit Mortality (0.24%)</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 font-heading">99.1%</div>
                <div className="text-xs text-slate-500 font-medium">Day 7 Brooding Livability</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-700 font-heading">0% Spoilage</div>
                <div className="text-xs text-slate-500 font-medium">Vaccine Seroconversion</div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 italic">
                &ldquo;The driver called 45 minutes before arrival. The vaccines were icy cold, and the chicks began drinking eagerly within 10 minutes of placement.&rdquo; — Farm Manager, Grace Crest Farm
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
              We May Not Be the Right Logistics Partner for You If...
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We value long-term partnerships with commercial farmers over one-off transactions. To protect your flock and our integrity, we are explicit about where our model fits:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm font-heading">
                <XCircle className="h-5 w-5 shrink-0" />
                <span>You Demand Doorstep Farm Delivery</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                Interstate courier vans stopping at dozens of individual farmsteads add 6 to 10 hours of heat exposure. We only dispatch to rapid central transport parks so birds reach your farm brooder hours faster.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm font-heading">
                <XCircle className="h-5 w-5 shrink-0" />
                <span>You Want Unscheduled Weekend Shipments</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                Live vaccines and chicks cannot sit idle in unattended courier offices on Saturday nights. We only dispatch on fixed Monday and Thursday schedules when full monitoring is active.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm font-heading">
                <XCircle className="h-5 w-5 shrink-0" />
                <span>You Skip The Driver Joint Count</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                Our transit mortality guarantee requires an on-site joint check with the motor park driver before leaving the terminal. We cannot honor claims filed 2 days later after farm placement.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm font-heading">
                <XCircle className="h-5 w-5 shrink-0" />
                <span>You Seek Unverified Backyard Hatcheries</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                We supply strictly from certified parent-stock hatcheries (Chi, Amo, Zartech, Supreme). We do not broker cheap, un-vaccinated chicks without maternal antibody profiles.
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
              Common Questions on Livestock Delivery
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Clear, practical answers about nationwide cold-chain logistics, interstate pickup parks, and transit mortality guarantees.
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
              Next Scheduled Route: Monday & Thursday
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
              Lock In Your Next Livestock Dispatch
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Protect your flock capital with temperature-controlled biological packaging, pre-dawn transit, and verified parent-stock genetics. Book before the 2:00 PM cutoff to secure your delivery.
            </p>
          </div>

          {/* Action Buttons — Matching Homepage Styling */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20confirm%20my%20chick%20booking%20and%20delivery%20schedule."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Check Today&apos;s Dispatch On WhatsApp
            </a>
            <Link
              href="/chicks"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
            >
              Book Day-Old Chicks
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/services/consultation"
              className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-4 py-4 rounded-xl transition-all duration-200 text-sm hover:underline"
            >
              Consult A Livestock Specialist
            </Link>
          </div>

          <div className="pt-6 text-xs text-slate-400">
            <span>D-AminGrow Agro-Allied Limited</span> • <span>Your Satisfaction Is Our Priority</span> • <span>Serving Farmers Across Nigeria & ECOWAS</span>
          </div>
        </div>
      </section>
    </div>
  );
}
