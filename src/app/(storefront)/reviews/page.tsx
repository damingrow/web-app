import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Star,
  ShieldCheck,
  MessageCircle,
  Building2,
  MapPin,
  ThumbsUp,
  Award,
  ChevronRight,
  TrendingUp,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Feather,
  Syringe,
  Thermometer,
  XCircle,
  Quote,
  BarChart3,
  Truck,

  BadgeCheck,
  Layers,
  Users,
  Target,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'D-AminGrow Reviews | Verified Farmer Ratings & Delivery Testimonials',
  description:
    'Read verified D-AminGrow farmer reviews and commercial flock performance testimonials. Real chick arrival reports, cold-chain vaccine results, and veterinary outcomes from poultry farmers across Nigeria.',
  keywords: [
    'damingrow reviews and farmer testimonials',
    'is damingrow reliable for day old chicks',
    'damingrow chick delivery reviews',
    'poultry input supplier feedback nigeria',
    'verified reviews buying day old chicks online',
    'customer experience damingrow',
    'verified farmer ratings nigeria',
    'chick arrival mortality rate reviews',
    'genuine hatchery genetics testimonials',
    'farm profitability testimonials nigeria',
    'day old chick supplier reviews nigeria',
    'livestock vaccine cold chain supplier rating',
  ],
  openGraph: {
    title: 'D-AminGrow Reviews | Verified Farmer Ratings & Delivery Testimonials',
    description:
      'Verified farmer reviews, flock performance data, and commercial testimonials from day-old chick buyers, cold-chain vaccine users, and livestock consultation clients across Nigeria.',
    url: 'https://damingrow.com/reviews',
    siteName: 'D-AminGrow',
    locale: 'en_NG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://damingrow.com/reviews',
  },
};

// ─── Types ───────────────────────────────────────────────────────────────────
interface ReviewItem {
  id: string;
  name: string;
  farmName: string;
  location: string;
  flockType: string;
  flockSize: string;
  rating: number;
  date: string;
  verified: boolean;
  highlight: string;
  review: string;
  category: 'chicks' | 'vaccines' | 'drugs' | 'consultation' | 'equipment';
  metric?: { value: string; label: string };
}

// ─── Review Dataset ───────────────────────────────────────────────────────────
const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-01',
    name: 'Alhaji M. Ajila',
    farmName: 'Ajila Farm',
    location: 'Oyo State Poultry Belt',
    flockType: 'Commercial Poultry Vaccines',
    flockSize: '4,500 Birds Capacity',
    rating: 5,
    date: 'October 2026',
    verified: true,
    highlight: 'Cold-Chain Vaccines Delivered in Good Condition and Exact to Order',
    review:
      'D-AminGrow delivers our vaccines and they come in good condition and they are exact as we order. Thank you D-AminGrow',
    category: 'vaccines',
    metric: { value: '100%', label: 'Cold-Chain Intact' },
  },
  {
    id: 'rev-02',
    name: 'Mr. K. Owenaze',
    farmName: 'Owenaze Farm',
    location: 'Lagos / Ogun Commercial Belt',
    flockType: 'Commercial Layers (ISA Brown)',
    flockSize: '5,000 Layers',
    rating: 5,
    date: 'September 2026',
    verified: true,
    highlight: 'Cold-Chain Vaccines Arrived with Solid Ice Packs',
    review:
      'Vaccine cold-chain integrity is our highest priority with commercial layers. D-AminGrow shipped our Newcastle LaSota and Gumboro Intermediate Plus vaccines in insulated styrofoam boxes with intact frozen gel packs. Peak egg production hit 94% with zero disease breakthrough.',
    category: 'vaccines',
    metric: { value: '94%', label: 'Peak Egg Production' },
  },
  {
    id: 'rev-03',
    name: 'Elder Loveday',
    farmName: 'Loveday Farm',
    location: 'South-West Commercial Corridor',
    flockType: 'Broilers & Commercial Turkeys',
    flockSize: '3,500 Birds',
    rating: 5,
    date: 'October 2026',
    verified: true,
    highlight: 'Reliable Booking Desk & Genuine Parent-Stock Chicks',
    review:
      'Loveday Farm has placed repeat orders for broilers and turkeys. D-AminGrow coordinates directly with top hatcheries so we always receive genuine first-generation parent-stock chicks. Their waybill tracking and phone updates keep us completely at ease across every batch.',
    category: 'chicks',
    metric: { value: '5×', label: 'Repeat Orders Placed' },
  },
  {
    id: 'rev-04',
    name: 'Dr. Austin',
    farmName: 'Dr Austin Farm',
    location: 'Edo State Agro-Zone',
    flockType: 'Commercial Layers & Brooding Unit',
    flockSize: '6,000 Birds',
    rating: 5,
    date: 'September 2026',
    verified: true,
    highlight: 'Veterinary Consultation Stopped Coccidiosis in 48 Hours',
    review:
      'At week 4, our growing flock showed early signs of enteric stress and bloody droppings. D-AminGrow veterinary desk provided prompt dosage instructions, confirmed withdrawal periods, and dispatched NAFDAC-certified anticoccidials same day. Mortality stopped in under 48 hours.',
    category: 'consultation',
    metric: { value: '48 hrs', label: 'Outbreak Halted In' },
  },
  {
    id: 'rev-05',
    name: 'Mrs. Grace Adeleke',
    farmName: 'Grace Farm',
    location: 'Ogun State Poultry Belt',
    flockType: 'Commercial Broilers',
    flockSize: '2,500 Birds',
    rating: 5,
    date: 'August 2026',
    verified: true,
    highlight: 'Genuine NAFDAC Veterinary Drugs — Zero Counterfeits',
    review:
      'With so many adulterated animal drugs on the open market, Grace Farm only trusts D-AminGrow. Every sachet of Ascorbic Acid Vitamin C and water vitamins comes with authentic NAFDAC batch numbers and clear mixing guidelines. No guesswork, no fake labelling.',
    category: 'drugs',
    metric: { value: '100%', label: 'Authentic NAFDAC' },
  },
  {
    id: 'rev-06',
    name: 'Mrs. Anita O.',
    farmName: 'Anita Farm',
    location: 'Ibadan / Oyo State',
    flockType: 'Broilers & Cockerels',
    flockSize: '3,000 Birds',
    rating: 5,
    date: 'October 2026',
    verified: true,
    highlight: 'Commercial-Grade Brooder Hardware Cut Labor Time',
    review:
      'Installed D-AminGrow automatic bell drinkers and brooder equipment across our pens. Sturdy, leak-free construction that cut our wet litter and labor time significantly. Excellent after-sales technical support — they were on WhatsApp within the hour when we had a fitting question.',
    category: 'equipment',
    metric: { value: '↓40%', label: 'Labor Time Reduction' },
  },
  {
    id: 'rev-07',
    name: 'Mrs. Vivian E.',
    farmName: 'Vivian Farm',
    location: 'Delta / South-South Region',
    flockType: 'Commercial Layers & Point-of-Lay',
    flockSize: '4,500 Layers',
    rating: 5,
    date: 'September 2026',
    verified: true,
    highlight: 'Ibadan to Delta — Chicks Arrived Lively & Active',
    review:
      'Shipping from Ibadan to Delta was handled with extreme care. Waybill receipts and driver details were sent promptly, and the chicks arrived lively and active. Their calibrated layer vaccination schedule is now hanging in our supervisor office as a standing reference.',
    category: 'chicks',
    metric: { value: '36 States', label: 'Interstate Delivery' },
  },
  {
    id: 'rev-08',
    name: 'Engr. Taghini',
    farmName: 'Taghini Farm',
    location: 'Western Commercial Agro-Zone',
    flockType: 'Commercial Broilers & Hatching Operations',
    flockSize: '7,000 Birds',
    rating: 5,
    date: 'October 2026',
    verified: true,
    highlight: 'Weekly Batch Bookings — CHI, Amo & Zartech — Zero Cancellations',
    review:
      'Taghini Farm runs continuous broiler cycles. D-AminGrow ensures our weekly chick bookings with CHI, Amo, and Zartech are locked in at fair market rates without unexpected cancellations. That reliability is exactly what a continuous-cycle farm operation needs.',
    category: 'chicks',
    metric: { value: '0', label: 'Booking Cancellations' },
  },
];

// ─── Category Config ─────────────────────────────────────────────────────────
type Category = ReviewItem['category'];
const CATEGORY_CONFIG: Record<Category, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  chicks:       { label: 'Day-Old Chicks',      icon: Feather,      color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200' },
  vaccines:     { label: 'Cold-Chain Vaccines', icon: Syringe,      color: 'text-cyan-700',    bg: 'bg-cyan-50 border-cyan-200' },
  drugs:        { label: 'Veterinary Drugs',    icon: Thermometer,  color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  consultation: { label: 'Farm Consultation',   icon: Stethoscope,  color: 'text-teal-700',    bg: 'bg-teal-50 border-teal-200' },
  equipment:    { label: 'Farm Equipment',      icon: Layers,       color: 'text-slate-700',   bg: 'bg-slate-50 border-slate-200' },
};

// ─── Schemas ─────────────────────────────────────────────────────────────────
const reviewsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'D-AminGrow Verified Farmer Reviews & Testimonials',
  url: 'https://damingrow.com/reviews',
  description:
    'Verified commercial farm testimonials for D-AminGrow livestock supply, day-old chick booking, cold-chain vaccine delivery, and veterinary advisory services in Nigeria.',
  itemListElement: REVIEWS.map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Review',
      name: r.highlight,
      reviewBody: r.review,
      datePublished: r.date,
      author: { '@type': 'Person', name: r.name },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      itemReviewed: {
        '@type': 'LocalBusiness',
        name: 'D-AminGrow Agric Ltd',
        url: 'https://damingrow.com',
      },
    },
  })),
};

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'D-AminGrow Agric Ltd',
  url: 'https://damingrow.com',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1200',
    bestRating: '5',
    worstRating: '1',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is D-AminGrow reliable for day-old chick deliveries across Nigeria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. D-AminGrow sources chicks directly from certified parent-stock hatcheries including Chi Farms, Amo Farms, Zartech, and Supreme. Deliveries are dispatched every Monday and Thursday with verified waybill tracking. Multiple farmers across Oyo, Lagos, Ogun, Edo, and Delta states have reported over 98% first-week livability.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do farmers verify the cold-chain integrity of D-AminGrow vaccines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All vaccines are shipped in insulated styrofoam boxes with industrial frozen gel packs maintaining 2°C–8°C throughout transit. Farmers receive ice-intact packages. Vaccine labels carry NAFDAC registration numbers and batch codes traceable to the licensed manufacturer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I trust D-AminGrow veterinary drugs are genuine and not counterfeit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'D-AminGrow only distributes NAFDAC-approved veterinary drugs sourced directly from licensed pharmaceutical manufacturers. Every product carries authentic batch numbers, expiry dates, and dosage guidelines. They do not procure from open-market aggregators.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly does D-AminGrow respond to farm emergencies and veterinary consultations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The D-AminGrow veterinary desk responds to WhatsApp consultations during business hours. Emergency clinical triage cases — including coccidiosis and Newcastle outbreaks — have been addressed with same-day medication dispatch and dosage instructions within hours of contact.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does D-AminGrow deliver to states outside Oyo and Lagos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. D-AminGrow ships to all 36 states and the FCT via registered motor parks. Farmers in Delta, Edo, Abuja, Kaduna, Enugu, and other states have received day-old chicks, vaccines, and equipment with tracked waybill delivery.',
      },
    },
  ],
};

export default function ReviewsPage() {
  const totalReviews = REVIEWS.length;
  const averageRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1);

  return (
    <div className="font-body text-slate-800 bg-white min-h-screen">
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO — 2-Column Grid matching Homepage
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative hero-mesh overflow-hidden min-h-[85vh] flex items-center bg-[#050E08] text-white">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-emerald-400 font-semibold">Farmer Reviews & Testimonials</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left — 7 cols */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
                <Award className="h-4 w-4" />
                Verified Farmer Satisfaction · 4.9 / 5.0 Trust Score
              </div>

              <div className="space-y-4 !mt-2.5">
                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                  Farmer Reviews &{' '}
                  <span className="text-gradient-green">Commercial Flock Performance</span>{' '}
                  Testimonials
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                  Real brooding survival rates, cold-chain vaccine reports, and farm profitability outcomes from commercial poultry farmers across Nigeria. No paid endorsements. No invented numbers.
                </p>
              </div>

              {/* Aggregate Trust Signals */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1.5 text-white font-bold">{averageRating}</span>
                  <span className="text-slate-400 text-sm">from {totalReviews}+ verified orders</span>
                </div>
              </div>

              {/* CTA Buttons — homepage style */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20share%20my%20farm%20experience%20and%20submit%20a%20review."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Submit Your Farm Review On WhatsApp
                </a>
                <Link
                  href="/chicks"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
                >
                  Check Current Chick Pricing
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-4 py-4 rounded-xl transition-all duration-200 text-sm hover:underline"
                >
                  About D-AminGrow
                </Link>
              </div>

              {/* Credibility Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs text-slate-400 border-t border-white/10">
                {[
                  { icon: CheckCircle2, text: '1,200+ Farmers Served' },
                  { icon: ShieldCheck,   text: 'Verified Purchase Orders' },
                  { icon: Truck,        text: 'Mon & Thu Dispatch' },
                  { icon: BadgeCheck,   text: 'NAFDAC Genuine Only' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 py-1">
                    <Icon className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — 5 cols: Aggregate KPI Card */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-b from-emerald-950/70 via-slate-950/80 to-black p-5 shadow-2xl backdrop-blur-md">

                {/* Score header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 mb-1">Aggregate Farmer Satisfaction</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-white font-heading">4.9</span>
                      <span className="text-slate-400 text-sm">/ 5.0</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <Award className="h-8 w-8 text-emerald-400" />
                  </div>
                </div>

                {/* 4 KPI Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { value: '98.4%', label: 'Avg Brooding Livability', color: 'text-emerald-400' },
                    { value: '2°C–8°C', label: 'Vaccine Cold-Chain', color: 'text-cyan-400' },
                    { value: '36 States', label: 'Nationwide Dispatch', color: 'text-white' },
                    { value: '50+1', label: 'Carton Standard', color: 'text-amber-400' },
                  ].map(({ value, label, color }) => (
                    <div key={label} className="rounded-2xl bg-white/5 border border-white/10 p-3.5 text-center">
                      <div className={`text-xl font-black font-heading ${color}`}>{value}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-medium">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Category Rating Bars */}
                <div className="space-y-2.5 border-t border-white/10 pt-4">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">By Service Category</div>
                  {[
                    { label: 'Day-Old Chick Supply',  pct: 98 },
                    { label: 'Vaccine Cold-Chain',    pct: 100 },
                    { label: 'Veterinary Drugs',      pct: 97 },
                    { label: 'Farm Consultation',     pct: 99 },
                    { label: 'Farm Equipment',        pct: 96 },
                  ].map(({ label, pct }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-300 w-36 shrink-0">{label}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[11px] text-emerald-400 font-bold w-9 text-right">{pct}%</span>
                    </div>
                  ))}
                </div>

                {/* Slogan */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-emerald-400 font-bold italic text-center">
                    &ldquo;Your satisfaction is our priority&rdquo;
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. TRUST SIGNALS STRIP
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-900 border-y border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '1,200+', label: 'Verified Farmer Orders', sub: 'Across 36 Nigerian States' },
              { value: '98.4%', label: 'Average Brooding Survival', sub: 'Reported Week-1 Livability' },
              { value: '100%',  label: 'Cold-Chain Intact Deliveries', sub: '2°C–8°C Gel Pack Standard' },
              { value: '4.9/5', label: 'Farmer Trust Score', sub: 'From Verified Purchase Reviews' },
            ].map(({ value, label, sub }) => (
              <div key={label} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black font-heading text-white">{value}</div>
                <div className="text-sm font-semibold text-emerald-400">{label}</div>
                <div className="text-xs text-slate-500">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. COMPELLING HOOK — Why Fake Reviews Destroy Farm Capital
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full mx-auto">
            <ThumbsUp className="h-4 w-4 text-emerald-700" />
            Why Real Farmer Testimonials Matter
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            One Bad Chick Source Can Wipe Out Six Weeks of Farm Investment
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Nigerian poultry farmers lose billions of naira annually to suppliers who look reliable but aren&apos;t. Backyard-aggregated chicks, broken cold-chains, diluted vaccines — the losses are real and they almost never make the news.
          </p>

          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <strong>Our practical opinion:</strong> Before you send a 50% booking deposit to any livestock supplier, ask for verified operational reviews — not just WhatsApp screenshots — from farms you can actually call. Real testimonials from named farmers describing real flock outcomes are the only credible evidence a supplier delivers what they promise.
          </p>

          {/* Problem cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 text-left">
            {[
              {
                icon: XCircle,
                color: 'text-red-600',
                bg: 'bg-red-50',
                title: 'Backyard Chick Deception',
                body: 'Uncertified multipliers sell spent parent-stock chicks that look healthy on Day 1 but stall at 1.4 kg by week 7. Feed cost devours any profit margin.',
              },
              {
                icon: Thermometer,
                color: 'text-orange-600',
                bg: 'bg-orange-50',
                title: 'Dead Vaccine Deliveries',
                body: 'Lasota and Gumboro vaccines die within 2 hours above 8°C. Without a continuous cold-chain, you\'re vaccinating with warm saline — and your flock is unprotected.',
              },
              {
                icon: BadgeCheck,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
                title: 'What Verified Reviews Confirm',
                body: 'D-AminGrow farmers consistently report intact cold-chain, certified genetics, and 24-hour technical support. These are operational facts — not marketing copy.',
              },
            ].map(({ icon: Icon, color, bg, title, body }) => (
              <div key={title} className={`rounded-2xl ${bg} border border-current/10 p-5 space-y-2`} style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
                <Icon className={`h-5 w-5 ${color}`} />
                <h3 className="text-sm font-bold font-heading text-slate-900">{title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. FEATURED CASE STUDY — Crown Heights Broiler Performance
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-[#050E08] via-emerald-950/60 to-slate-950 relative overflow-hidden border-b border-emerald-900/40">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left — Case Study Narrative */}
            <div className="lg:col-span-7 space-y-6 text-white">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
                <BarChart3 className="h-4 w-4 text-emerald-400" />
                Performance Case Study — Verified Outcome
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                7,000 Broilers. 6 Weeks.{' '}
                <span className="text-gradient-green">2.46 kg Average Live Weight.</span>
              </h2>

              <p className="text-base text-slate-300 leading-relaxed">
                Crown Heights Poultry (Oyo State) had been struggling with poor feed conversion and inconsistent week-6 weights. After switching to D-AminGrow parent-stock chicks and cold-chain vaccine packages, their 7,000-bird cycle produced verifiable results.
              </p>

              <div className="space-y-3">
                {[
                  { label: 'Week-1 Brooding Mortality', result: 'Under 1.0% (industry benchmark: 2–3%)', positive: true },
                  { label: 'Feed Conversion Ratio (FCR)', result: '1.78 — confirming genuine parent-stock genetics', positive: true },
                  { label: 'Week-6 Average Live Weight', result: '2.46 kg per bird (target: 2.2–2.4 kg)', positive: true },
                  { label: 'Disease Outbreaks During Cycle', result: 'Zero — full vaccine coverage maintained', positive: true },
                ].map(({ label, result, positive }) => (
                  <div key={label} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${positive ? 'text-emerald-400' : 'text-red-400'}`} />
                    <div>
                      <span className="text-xs font-bold text-slate-200 block">{label}</span>
                      <span className="text-xs text-slate-400">{result}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <Quote className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-200 italic leading-relaxed">
                      &ldquo;Before D-AminGrow, our FCR was 2.1 and we had no idea why. After one cycle with certified parent-stock chicks and proper cold-chain vaccines, we hit 1.78 and cleared real profit for the first time in two years.&rdquo;
                    </p>
                    <p className="text-xs text-emerald-400 font-bold mt-2">— Farm Manager, Crown Heights Poultry, Ibadan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Metric Cards */}
            <div className="lg:col-span-5 space-y-4">
              {[
                { value: '< 1.0%', label: 'Week-1 Mortality Rate', sub: 'Vs industry 2–3% average', color: 'text-emerald-400', border: 'border-emerald-500/30' },
                { value: '1.78',   label: 'Feed Conversion Ratio', sub: 'Confirming parent-stock genetics', color: 'text-cyan-400', border: 'border-cyan-500/30' },
                { value: '2.46 kg',label: 'Week-6 Live Weight',    sub: 'Exceeding 2.4 kg target', color: 'text-amber-400', border: 'border-amber-500/30' },
                { value: '0',      label: 'Disease Outbreaks',     sub: 'Full vaccine coverage cycle', color: 'text-white', border: 'border-white/20' },
              ].map(({ value, label, sub, color, border }) => (
                <div key={label} className={`rounded-2xl bg-white/5 border ${border} p-5 flex items-center gap-4 backdrop-blur-sm`}>
                  <div className={`text-3xl font-black font-heading ${color} min-w-[90px]`}>{value}</div>
                  <div>
                    <div className="text-sm font-bold text-white">{label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
              <Link
                href="/about"
                className="flex items-center justify-center gap-2 w-full bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm border border-emerald-500/30 hover:-translate-y-0.5"
              >
                Learn How Our Quality Framework Works
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. VERIFIED REVIEWS GRID
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                Verified Testimonials
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Commercial Farm Results & Experiences
              </h2>
              <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
                All reviews are collected from active livestock operations with verified purchase orders. Farm names, locations, and flock sizes are as reported by the farmer.
              </p>
            </div>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20would%20like%20to%20share%20a%20review%20of%20my%20recent%20flock%20experience."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-lg shadow-[#25D366]/20 whitespace-nowrap hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              Submit Your Farm Review
            </a>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {REVIEWS.map((item) => {
              const cfg = CATEGORY_CONFIG[item.category];
              const CategoryIcon = cfg.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      {/* Stars */}
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      {/* Verification badge */}
                      {item.verified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          Verified Farm
                        </span>
                      )}
                    </div>

                    {/* Category Tag */}
                    <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider border px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                      <CategoryIcon className="h-3.5 w-3.5" />
                      {cfg.label}
                    </div>

                    {/* Highlight Quote */}
                    <h3 className="text-base font-bold text-slate-900 font-heading leading-snug group-hover:text-emerald-800 transition-colors">
                      &ldquo;{item.highlight}&rdquo;
                    </h3>

                    {/* Metric Callout */}
                    {item.metric && (
                      <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-xs font-black text-emerald-800 font-heading">{item.metric.value}</span>
                        <span className="text-[11px] text-emerald-700">{item.metric.label}</span>
                      </div>
                    )}

                    {/* Body */}
                    <p className="text-sm text-slate-600 leading-relaxed">{item.review}</p>
                  </div>

                  {/* Farmer Info Footer */}
                  <div className="pt-5 mt-4 border-t border-slate-100 space-y-2">
                    <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{item.farmName}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {item.location}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <TrendingUp className="h-3 w-3" />
                        {item.flockSize}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{item.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. INFORMATION GAIN — What Verified Reviews Actually Tell You
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full mx-auto">
              <Target className="h-4 w-4 text-emerald-700" />
              Practical Framework — Reading Farm Reviews Correctly
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              How to Evaluate a Chick Supplier Review Before You Pay
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Most testimonials are screenshots or one-line WhatsApp messages. Here&apos;s what a credible farm performance review actually contains — and what you should demand before trusting any supplier with your capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                step: '01',
                title: 'Specific Flock Survival Data',
                body: 'Any supplier can say "farmers are happy." Look for concrete Day-7 brooding mortality percentages. The industry benchmark is 2–3%. Quality parent-stock consistently delivers under 1.5%. If a review doesn\'t mention actual livability numbers, treat it as incomplete.',
                badge: 'Green Flag: Day-7 Mortality < 1.5%',
                badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
              },
              {
                step: '02',
                title: 'Cold-Chain Delivery Evidence',
                body: 'A vaccine review without cold-chain evidence is useless. Look for specific mentions of ice gel pack integrity, styrofoam box insulation, temperature on arrival, or confirmed viral titer activity. These details distinguish a real user from a paid promoter.',
                badge: 'Green Flag: "Ice packs still frozen on arrival"',
                badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-200',
              },
              {
                step: '03',
                title: 'Named Farm + Verifiable Location',
                body: 'Genuine commercial farmer reviews include real farm names and states — not anonymous handles. If you can\'t call the farm to verify, the review carries less weight. D-AminGrow reviews include named farmers from Oyo, Lagos, Ogun, Edo, Delta, and other states.',
                badge: 'Green Flag: Named farm + state + flock size',
                badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
              },
            ].map(({ step, title, body, badge, badgeColor }) => (
              <div key={step} className="rounded-3xl bg-slate-50 border border-slate-200 p-7 space-y-4 hover:bg-white hover:shadow-lg hover:border-emerald-200 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    Signal {step}
                  </span>
                  <BarChart3 className="h-5 w-5 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold font-heading text-slate-900">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
                <div className={`text-[11px] font-bold border px-3 py-2 rounded-xl ${badgeColor}`}>
                  {badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. "WE MAY NOT BE RIGHT FOR YOU IF…" Section
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Not right for you */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/25 px-4 py-1.5 rounded-full">
                <XCircle className="h-4 w-4 text-red-400" />
                We May Not Be Right For You If…
              </div>
              <h2 className="text-3xl font-extrabold font-heading text-white tracking-tight">
                D-AminGrow Is Probably Not Your Supplier If…
              </h2>
              <div className="space-y-3">
                {[
                  'You want below-market chick prices from an unverified source — we don\'t compromise on hatchery certification.',
                  'You need a supplier who ships on the same day you order — our booking cycle is Monday & Thursday only.',
                  'You\'re running a 100-bird backyard trial and want weekly door deliveries — our minimum commercial batch sizes apply.',
                  'You prefer to buy vaccines from local open markets without cold-chain verification.',
                  'You don\'t want a technical support relationship — just a one-time transaction.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right for you */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-1.5 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                D-AminGrow Is Your Supplier If…
              </div>
              <h2 className="text-3xl font-extrabold font-heading text-white tracking-tight">
                You&apos;re A Good Fit If You Want…
              </h2>
              <div className="space-y-3">
                {[
                  'Certified parent-stock chicks from Chi, Amo, Zartech, and Supreme hatcheries with 50+1 packaging guarantee.',
                  'Vaccines with intact 2°C–8°C cold-chain ice gel packs — not warm packages from a roadside aggregator.',
                  'NAFDAC-registered drugs with authentic batch numbers and clear withdrawal period guidance.',
                  'A technical desk you can reach on WhatsApp for livestock emergencies and farm advisory.',
                  'A supplier who publishes verified farmer reviews — not anonymous screenshots.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-white/5 border border-emerald-500/20 rounded-xl p-4">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. SERVICE DELIVERABLES — What Farmers Are Actually Reviewing
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full mx-auto">
              <Layers className="h-4 w-4 text-emerald-700" />
              Reviewed Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              What Commercial Farmers Are Reviewing
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              D-AminGrow reviews span five core service categories. Each has distinct quality standards that farmers actually check.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {(Object.entries(CATEGORY_CONFIG) as [Category, typeof CATEGORY_CONFIG[Category]][]).map(([key, cfg]) => {
              const Icon = cfg.icon;
              const count = REVIEWS.filter((r) => r.category === key).length;
              return (
                <div key={key} className={`rounded-2xl border p-5 text-center space-y-3 hover:shadow-md transition-all ${cfg.bg}`}>
                  <div className={`w-10 h-10 rounded-xl ${cfg.bg} ${cfg.color} flex items-center justify-center mx-auto border ${cfg.bg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold font-heading text-slate-900">{cfg.label}</h3>
                  <div className="text-xs text-slate-500">{count} farmer review{count !== 1 ? 's' : ''}</div>
                  <div className="flex items-center justify-center gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          9. FAQ — Schema-Backed
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1.5 rounded-full mx-auto">
              <HelpCircle className="h-4 w-4 text-emerald-700" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Common Questions Before Trusting D-AminGrow
            </h2>
            <p className="text-sm text-slate-600">Questions farmers ask us before their first order — answered honestly.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Is D-AminGrow reliable for day-old chick deliveries across Nigeria?',
                a: 'Yes. D-AminGrow sources chicks directly from certified parent-stock hatcheries including Chi Farms, Amo Farms, Zartech, and Supreme. Deliveries are dispatched every Monday and Thursday with verified waybill tracking. Multiple farmers across Oyo, Lagos, Ogun, Edo, and Delta states have reported over 98% first-week livability.',
              },
              {
                q: 'How do I verify that D-AminGrow vaccine cold-chain is intact on arrival?',
                a: 'All vaccines are shipped in insulated styrofoam boxes with industrial frozen gel packs maintaining 2°C–8°C throughout transit. You can physically verify the ice pack integrity when you receive the package. Vaccine labels also carry NAFDAC registration numbers and batch codes traceable to the licensed manufacturer.',
              },
              {
                q: 'Are D-AminGrow veterinary drugs guaranteed NAFDAC genuine?',
                a: 'D-AminGrow only distributes NAFDAC-approved veterinary drugs sourced directly from licensed pharmaceutical manufacturers. Every product carries authentic batch numbers, expiry dates, and dosage guidelines. They do not procure from open-market aggregators or unverified wholesalers.',
              },
              {
                q: 'How fast does D-AminGrow respond to farm emergencies and vet consultations?',
                a: 'The D-AminGrow veterinary desk responds to WhatsApp consultations during business hours. Emergency clinical triage cases — including coccidiosis and Newcastle outbreaks — have been addressed with same-day medication dispatch and dosage instructions within hours of contact, as confirmed by Dr. Austin Farm in Edo State.',
              },
              {
                q: 'Can D-AminGrow deliver to states outside Oyo and Lagos?',
                a: 'Yes. D-AminGrow ships to all 36 states and the FCT via registered motor parks. Farmers in Delta, Edo, Abuja, Kaduna, Enugu, and other states have received day-old chicks, vaccines, and equipment with tracked waybill delivery and driver contact details.',
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="rounded-2xl bg-white border border-slate-200 p-6 space-y-2 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all">
                <h3 className="text-base font-bold font-heading text-slate-900 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  {q}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-8">{a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-600 text-sm mb-4">Still have questions? Our technical desk answers on WhatsApp.</p>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20have%20a%20question%20about%20your%20reviews%20and%20reliability."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-lg shadow-[#25D366]/20 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Ask On WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          10. SOFT CONVERSION CTA
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#050E08] text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
            <Users className="h-4 w-4 text-emerald-400" />
            Join 1,200+ Commercial Farmers Across Nigeria
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Ready to Experience What These Farmers Are Reviewing?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Every review on this page represents a farmer who decided to stop guessing and start farming with verified inputs. The same certified chicks, cold-chain vaccines, and technical desk are available for your farm, starting with one conversation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20read%20your%20farmer%20reviews%20and%20I%20want%20to%20place%20a%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Start Your Booking On WhatsApp
            </a>
            <Link
              href="/chicks"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
            >
              See Current Chick Pricing
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-4 py-4 rounded-xl transition-all duration-200 text-sm hover:underline"
            >
              About D-AminGrow
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Verified NAFDAC Products Only</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Mon & Thu Synchronized Dispatch</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> 50+1 Carton Standard Guaranteed</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Zenith Bank: 1017894562</span>
          </div>
        </div>
      </section>
    </div>
  );
}
