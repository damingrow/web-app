import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { HATCHERY_PARTNERS, CLIENT_FARMS } from '@/data/partners-and-clients';
import ChickBookingForm from './chick-booking-form';
import {
  Calendar,
  Thermometer,
  CheckCircle2,
  Phone,
  Truck,
  MessageCircle,
  ArrowRight,
  Star,
  Clock,
  Feather,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  TrendingUp,
  Building2,
  Syringe,
  FileSpreadsheet,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Day-Old Chicks (DOC) Sales & Nationwide Dispatch | D-AminGrow Nigeria',
  description:
    'Order premium commercial day-old broilers, layer pullets, and turkeys from certified Nigerian hatcheries. Pre-vaccinated for Marek\'s Disease with temperature-controlled dispatch every Monday and Thursday nationwide.',
  openGraph: {
    title: 'Premium Day-Old Chicks Sales & Distribution | D-AminGrow',
    description: 'Certified broiler, layer, and turkey chicks. Monday & Thursday dispatch to all 36 Nigerian states.',
  },
};

export default function ChicksCategoryPage() {
  const chicks = getProductsByCategory('chicks');

  const dispatchFeatures = [
    {
      icon: Calendar,
      title: 'Monday & Thursday Dispatch',
      desc: 'Nationwide shipments depart every Monday and Thursday morning. Bookings close 48 hours prior.',
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      icon: Thermometer,
      title: 'Brooding Arrival Protocol',
      desc: 'Ensure brooder heaters reach 32°C – 35°C two hours before chick delivery. Provide anti-stress vitamin water immediately.',
      color: 'bg-amber-100 text-amber-700',
    },
    {
      icon: Truck,
      title: 'Motor Park Depot Pickup',
      desc: 'Reliable waybill dispatch to all 36 states and FCT with SMS arrival alerts through registered motor parks.',
      color: 'bg-cyan-100 text-cyan-700',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Guarantee',
      desc: '51 chicks per carton guarantee. All chicks are active, hydrated, and uniform. Pre-vaccinated against Marek\'s Disease.',
      color: 'bg-teal-100 text-teal-700',
    },
  ];

  return (
    <div className="font-body">

      {/* ====================================================================
          HERO
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/6 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-emerald-500/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/chicks" className="text-slate-300">Day-Old Chicks</Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-7">
              <div className="flex flex-wrap gap-3">
                <span className="section-label-dark inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
                  <Feather className="h-3.5 w-3.5" />
                  Certified First-Generation Genetics
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/25 px-5 py-2 rounded-full">
                  🐣 Tue & Thu Dispatch
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
                Premium Day-Old Chicks{' '}
                <span className="text-gradient-green">Nationwide</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed">
                Direct partnerships across Nigeria providing vigorous, high-livability commercial broilers and brown layer pullets. Dispatched in specialized ventilated cartons with Marek&apos;s disease pre-vaccination certification.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "Marek's Pre-Vaccinated",
                  '51 Chicks per Carton',
                  'Climate-Monitored Transit',
                  'Nationwide Delivery',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20inquire%20about%20current%20prices%20for%20Day-Old%20Chicks."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Inquire Today&apos;s Rate
                </a>
                <Link
                  href="/knowledge"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  Brooding Guides
                </Link>
              </div>
            </div>

            {/* Right: Pricing Notice + Key Stats */}
            <div className="space-y-5">
              <div className="rounded-3xl bg-amber-500/10 border border-amber-500/25 p-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">Dynamic Market Pricing</h3>
                    <p className="text-xs text-slate-500">Prices update weekly</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Day-old chick prices fluctuate based on parent-stock capacity and feed costs. We do not publish fixed prices — contact us for today&apos;s confirmed rate before booking.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'Broiler Chicks', note: 'Commercial meat production' },
                    { type: 'Layer Pullets', note: '310+ eggs potential' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl bg-white/5 border border-white/8 p-3">
                      <div className="text-sm font-bold text-white">{item.type}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.note}</div>
                      <div className="text-xs font-semibold text-amber-400 mt-2">Contact for price →</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '51', label: 'Chicks/Carton', sub: 'Guaranteed count' },
                  { value: 'Tue & Thu', label: 'Dispatch Days', sub: 'Booking 48hrs prior' },
                  { value: '36+', label: 'States Covered', sub: 'Motor park delivery' },
                  { value: '32–35°C', label: 'Brooding Temp', sub: 'First week standard' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl bg-white/5 border border-white/8 p-4 text-center">
                    <div className="text-xl font-extrabold text-white font-heading">{stat.value}</div>
                    <div className="text-xs font-semibold text-emerald-400 mt-0.5">{stat.label}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* ====================================================================
          DISPATCH & CARE FEATURES
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dispatchFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="rounded-3xl bg-white border border-slate-200 p-6 space-y-3 hover:shadow-lg transition-shadow group">
                  <div className={`h-12 w-12 rounded-2xl ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          COMMITMENT DEPOSIT NOTICE — Zenith Bank
          ==================================================================== */}
      <section className="py-6 bg-amber-50 border-y border-amber-200" id="deposit-notice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-white rounded-2xl border border-amber-300 shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-amber-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 mb-0.5">
                50% Commitment Deposit Required to Confirm Your Booking
              </p>
              <p className="text-sm text-slate-600">
                Pay via bank transfer to{' '}
                <span className="font-semibold text-slate-800">Zenith Bank Plc</span>
                {' — '}
                Account: <span className="font-mono font-bold text-emerald-700">1017894562</span>
                {' — '}
                Name: <span className="font-semibold text-slate-800">D-AminGrow Agro-Allied Services</span>.
                Send proof of payment via WhatsApp to confirm your slot.
              </p>
            </div>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20have%20made%20my%2050%25%20commitment%20deposit%20and%20want%20to%20confirm%20my%20chick%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              Send Proof
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          INTERACTIVE HATCHERY BOOKING ENGINE
          ==================================================================== */}
      <section className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200" id="booking-engine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChickBookingForm />
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
                Available Varieties
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Available Breeds & Strains
              </h2>
              <p className="text-sm text-slate-500 mt-2">Verified day-old chick varieties currently available for booking</p>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3">
              <Clock className="h-4 w-4 text-amber-600" />
              <span className="text-sm text-amber-800 font-medium">Contact for current weekly rates</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chicks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Official Vaccination Program Banner */}
          <div className="mt-16 rounded-3xl bg-gradient-to-br from-emerald-950 via-[#050E08] to-slate-950 border border-emerald-500/25 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-1.5 rounded-full">
                  <Syringe className="h-3.5 w-3.5" />
                  Included With Every Batch
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  Calibrated Day-by-Day Vaccination Program for Your Birds
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Every chick placement requires timely immunization against Newcastle Disease, Gumboro (IBD), and Infectious Bronchitis. Input your delivery date into our veterinary planner to generate a calendar with exact dates, pen directions, and a downloadable PDF chart.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/vaccination-program"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-emerald-600/30"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    Generate Pen Schedule Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/calculators/brooder"
                    className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-5 py-3.5 rounded-xl border border-white/15 hover:border-white/25 transition-all text-sm"
                  >
                    Brooder Heat & Space Setup
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Veterinary Highlights</div>
                <div className="space-y-2 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Marek&apos;s HVT 0.2ml verified pre-delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Exact calendar dates calculated automatically</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Printable chart to pin directly in brooding pen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp cold-chain pre-order integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Strip */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#050E08] to-emerald-950 border border-emerald-500/20 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-extrabold font-heading text-white mb-2">Ready to Place Your Order?</h3>
              <p className="text-sm text-slate-400">Contact our sales desk for today&apos;s confirmed rate and to reserve your cartons.</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20book%20day-old%20chicks.%20Please%20send%20me%20today%27s%20price%20and%20availability."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp to Book
              </a>
              <a
                href="tel:+2348139169402"
                className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-3.5 rounded-xl border border-white/15 hover:border-white/25 transition-all text-sm"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SUPPLIERS WE WORK WITH
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Building2 className="h-3.5 w-3.5" />
              Certified Supplier Network
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Bird Suppliers We Work With
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We partner directly with Nigeria&apos;s leading grandparent and parent-stock farms to guarantee genuine genetics, strict bio-security, and high livability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HATCHERY_PARTNERS.map((hatchery) => (
              <div
                key={hatchery.id}
                className="rounded-3xl bg-white border border-slate-200 p-7 space-y-4 hover:shadow-lg transition-shadow group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      {hatchery.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{hatchery.location.split(',')[0]}</span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {hatchery.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {hatchery.establishedRole}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {hatchery.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Breeds Supplied</div>
                  <div className="flex flex-wrap gap-1.5">
                    {hatchery.specialtyBreeds.map((breed, bIdx) => (
                      <span
                        key={bIdx}
                        className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md"
                      >
                        {breed}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          TRUSTED BY COMMERCIAL CLIENT FARMS
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Award className="h-3.5 w-3.5" />
              Verified Commercial Clients
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Trusted by Commercial Poultry Operations
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              From smallholder brooders to multi-pen commercial operations, poultry farms across Nigeria count on D-AminGrow for reliable chick dispatch and brooding performance.
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
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                      {farm.flockType.split('&')[0]}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{farm.relationshipYears}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors">
                    {farm.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    {farm.location}
                  </p>
                  <p className="text-xs text-slate-600 italic leading-relaxed pt-2 border-t border-slate-200">
                    &ldquo;{farm.testimonialSnippet}&rdquo;
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>Capacity</span>
                  <span className="font-semibold text-slate-800">{farm.flockCapacity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              View detailed case studies and verified reviews
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Knowledge CTA */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold font-heading text-slate-900">New to brooding day-old chicks?</h3>
              <p className="text-sm text-slate-600 mt-1">Read our expert guides on brooder setup, feed management, and first-week survival.</p>
            </div>
            <div className="flex gap-4 shrink-0">
              <Link
                href="/calculators/brooder"
                className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold text-sm bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-xl transition-all"
              >
                Brooder Calculator <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/knowledge"
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold text-sm bg-white border border-slate-200 px-5 py-3 rounded-xl transition-all"
              >
                <BookOpen className="h-4 w-4" />
                Farm Guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
