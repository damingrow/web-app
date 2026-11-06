import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';
import { PolBookingForm } from '@/components/forms/pol-booking-form';
import {
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Star,
  Clock,
  ShieldCheck,
  Egg,
  TrendingUp,
  Calendar,
  Truck,
  ChevronRight,
  Feather,
  Award,
  BarChart3,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Point-of-Lay Birds (POL Pullets) Sales & Distribution Nigeria | D-AminGrow',
  description:
    'Buy fully vaccinated 17–20 week-old Point-of-Lay (POL) pullets in Nigeria. Brown and white layer breeds ready to start egg production. NAFDAC-registered health history. Nationwide delivery.',
  openGraph: {
    title: 'Point-of-Lay (POL) Pullets | Nationwide Supply | D-AminGrow Nigeria',
    description: 'Fully vaccinated 17–20 week-old brown and white layer POL pullets. Skip rearing risk — buy production-ready birds.',
  },
};

const POL_ADVANTAGES = [
  {
    icon: ShieldCheck,
    title: 'No Rearing Risk',
    desc: 'Skip the 17-week mortality risk of rearing from day-old. POL birds arrive fully grown, vaccinated, and healthy.',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: Calendar,
    title: 'Predictable Production Start',
    desc: 'Expect first eggs within 4–6 weeks of purchase. Consistent production timeline makes cash-flow planning easier.',
    color: 'bg-teal-100 text-teal-700',
  },
  {
    icon: TrendingUp,
    title: 'Fully Vaccinated History',
    desc: 'Complete vaccination record included: Newcastle, Gumboro, Marek\'s, Fowl Pox, and Infectious Bronchitis.',
    color: 'bg-cyan-100 text-cyan-700',
  },
  {
    icon: BarChart3,
    title: 'Uniform Flock Batches',
    desc: 'Same-age birds in every order. Uniform production start enables better egg grading and market consistency.',
    color: 'bg-violet-100 text-violet-700',
  },
];

const VS_DOC_TABLE = [
  { feature: 'Age at Purchase', pol: '17–20 Weeks', doc: 'Day 1 (0 weeks)' },
  { feature: 'Vaccination Complete', pol: '✅ Yes — Full History', doc: '⚠️ Must vaccinate yourself' },
  { feature: 'Feed Cost Before Laying', pol: '✅ Already paid (by farm)', doc: '❌ 17 weeks of feed cost' },
  { feature: 'Mortality Risk', pol: '✅ Low — birds are grown', doc: '⚠️ Higher in early weeks' },
  { feature: 'First Egg Timeline', pol: '4–6 Weeks after purchase', doc: '18–22 Weeks from DOC arrival' },
  { feature: 'Upfront Investment', pol: '⚠️ Higher cost per bird', doc: '✅ Lower cost per bird' },
  { feature: 'Biosecurity Management', pol: '✅ Easier — shorter tenure', doc: '⚠️ More weeks to manage' },
  { feature: 'Ideal For', pol: 'Quick-start operations', doc: 'Long-term planned setups' },
];

export default function PointOfLayPage() {
  const polBirds = getProductsByCategory('point-of-lay');

  return (
    <div className="font-body">

      {/* ====================================================================
          HERO
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-teal-500/6 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Point-of-Lay Birds</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-7">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
                  <Egg className="h-3.5 w-3.5" />
                  Production-Ready Pullets
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/25 px-5 py-2 rounded-full">
                  <Award className="h-3.5 w-3.5" />
                  Fully Vaccinated
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
                Point-of-Lay Pullets —{' '}
                <span className="text-gradient-green">Ready to Produce</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed">
                Skip 17 weeks of rearing risk. D-AminGrow supplies fully vaccinated, production-ready brown and white layer POL pullets (17–20 weeks) from certified farms — ready to start laying within 4–6 weeks of arrival at your farm.
              </p>

              {/* Key benefits pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  'Full Vaccination History',
                  'Laying in 4–6 Weeks',
                  'No Rearing Stress',
                  'Nationwide Delivery',
                  'Min. Order: 50 Birds',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#book-pol"
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg shadow-emerald-900/30"
                >
                  <Egg className="h-5 w-5" />
                  Reserve POL Pullets Now
                </a>
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20inquire%20about%20Point-of-Lay%20pullets.%20Please%20share%20current%20pricing%20and%20availability."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-4 rounded-xl transition-all text-sm shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Desk
                </a>
                <Link
                  href="/chicks"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-5 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  <Feather className="h-4 w-4" />
                  Day-Old Chicks
                </Link>
              </div>
            </div>

            {/* Right: Live Pullets Footage + Dispatch Stats */}
            <div className="space-y-5">
              <MediaVideoPlayer
                src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/supreme%20pullets.mp4"
                poster="/products/Chicks/Point of Lay.jpeg"
                title="Commercial Layer Pullet Flock"
                badge="17–20 Weeks Old"
                caption="Active, robust brown layer pullets with complete veterinary immunization"
                aspectRatio="video"
              />

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '17–20', label: 'Weeks Old at Sale', sub: 'Pre-lay transition age' },
                  { value: '4–6wk', label: 'First Eggs', sub: 'After purchase arrival' },
                  { value: '305+', label: 'Eggs Per Cycle', sub: 'Brown layer production' },
                  { value: '100%', label: 'Vaccinated', sub: 'Full schedule completed' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl bg-white/5 border border-white/8 p-4 text-center hover:border-emerald-500/25 transition-all">
                    <div className="text-xl font-extrabold text-white font-heading">{stat.value}</div>
                    <div className="text-xs font-semibold text-emerald-400 mt-0.5">{stat.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* Dispatch notice */}
              <div className="rounded-3xl bg-emerald-500/10 border border-emerald-500/25 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-base font-bold text-white font-heading">Dispatch &amp; Delivery</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Dispatch days:', value: 'Monday & Thursday' },
                    { label: 'Minimum order:', value: '50 birds per batch' },
                    { label: 'Delivery method:', value: 'Motor park nationwide + farm delivery' },
                    { label: 'Transport crates:', value: 'Provided — ventilated HDPE crates' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-4">
                      <span className="text-xs text-slate-500">{item.label}</span>
                      <span className="text-xs font-semibold text-slate-300 text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price notice */}
              <div className="rounded-3xl bg-amber-500/10 border border-amber-500/20 p-5 flex items-start gap-4">
                <TrendingUp className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-300 mb-1">Dynamic Market Pricing</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    POL bird prices fluctuate based on feed costs, rearing farm availability, and demand. Contact us for today&apos;s confirmed rate before booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ====================================================================
          KEY ADVANTAGES
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="section-label mx-auto w-fit">
              <Star className="h-3.5 w-3.5" />
              Why Buy POL Birds?
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              The Advantages of Point-of-Lay
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              POL birds let you start egg production faster with less risk, less labour, and a more predictable investment return.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POL_ADVANTAGES.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="rounded-3xl bg-slate-50 border border-slate-200 p-7 space-y-4 hover:shadow-lg hover:border-slate-300 transition-all group">
                  <div className={`h-12 w-12 rounded-2xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          POL vs. DOC COMPARISON TABLE
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="section-label mx-auto w-fit">
              <BarChart3 className="h-3.5 w-3.5" />
              Which is Right for You?
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              POL Birds vs. Day-Old Chicks
            </h2>
            <p className="text-sm text-slate-600">
              Both options are available at D-AminGrow. Here&apos;s a clear side-by-side to help you decide.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            {/* Header */}
            <div className="grid grid-cols-3 bg-[#050E08] text-white">
              <div className="p-5 text-sm font-bold font-heading">Feature</div>
              <div className="p-5 text-sm font-bold font-heading text-center border-l border-white/10">
                <span className="inline-flex items-center gap-2">
                  <Egg className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Point-of-Lay (POL)</span>
                </span>
              </div>
              <div className="p-5 text-sm font-bold font-heading text-center border-l border-white/10">
                <span className="inline-flex items-center gap-2">
                  <Feather className="h-4 w-4 text-amber-400" />
                  <span className="text-amber-400">Day-Old Chick (DOC)</span>
                </span>
              </div>
            </div>

            {/* Rows */}
            {VS_DOC_TABLE.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
              >
                <div className="p-4 text-sm font-semibold text-slate-700">{row.feature}</div>
                <div className="p-4 text-sm text-slate-700 text-center border-l border-slate-100">{row.pol}</div>
                <div className="p-4 text-sm text-slate-600 text-center border-l border-slate-100">{row.doc}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600 mb-4">
              Not sure which is right for your operation? Our advisors will help you decide.
            </p>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20advice%20on%20whether%20to%20buy%20Point-of-Lay%20or%20Day-Old%20Chicks%20for%20my%20farm."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              Ask Our Advisory Desk
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          INTERACTIVE RESERVATION FORM
          ==================================================================== */}
      <section id="book-pol" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="section-label mx-auto w-fit">
              <Egg className="h-3.5 w-3.5" />
              Online POL Reservation
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              Reserve Your Point-of-Lay Flock
            </h2>
            <p className="text-sm text-slate-600">
              Select your layer breed, batch size, and preferred dispatch day to receive a reservation reference and commitment deposit invoice.
            </p>
          </div>

          <PolBookingForm />
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
                <Egg className="h-3.5 w-3.5" />
                Available Breeds
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                POL Pullets Available for Order
              </h2>
              <p className="text-sm text-slate-500 mt-2">Contact us for current availability and confirmed pricing.</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span className="text-sm text-emerald-800 font-medium">Prices on request — stock limited weekly</span>
            </div>
          </div>

          {polBirds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {polBirds.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-14 text-center space-y-4">
              <Egg className="h-12 w-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-600 font-heading">Check Current Availability</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                POL bird availability changes weekly. Contact our desk to confirm current stock and pricing for your preferred breed.
              </p>
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20please%20confirm%20current%20availability%20of%20Point-of-Lay%20pullets."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm mt-2"
              >
                <MessageCircle className="h-4 w-4" />
                Check Stock via WhatsApp
              </a>
            </div>
          )}

          {/* CTA Strip */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#050E08] to-emerald-950 border border-emerald-500/20 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-extrabold font-heading text-white mb-2">Ready to Start Egg Production Faster?</h3>
              <p className="text-sm text-slate-400">Place your POL order today and receive laying-ready birds within the week.</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20book%20Point-of-Lay%20pullets.%20Please%20share%20today%27s%20pricing%20and%20availability."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                Book POL Birds Now
              </a>
              <Link
                href="/chicks"
                className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-3.5 rounded-xl border border-white/15 hover:border-white/25 transition-all text-sm"
              >
                <Feather className="h-4 w-4" />
                View Day-Old Chicks <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
