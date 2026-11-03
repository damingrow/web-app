import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { PolBookingForm } from '@/components/forms/pol-booking-form';
import {
  Egg,
  ShieldCheck,
  Calendar,
  BarChart3,
  MessageCircle,
  Phone,
  ArrowRight,
  ChevronRight,
  Star,
  Clock,
  Feather,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Point-of-Lay Pullets Sales Nigeria — Fully Vaccinated 17–20 Week Pullets | D-AminGrow',
  description:
    'Buy fully vaccinated 17–20 week Point-of-Lay (POL) pullets in Nigeria. Brown and white layer breeds ready for egg production within 4–6 weeks. Certified vaccination history. Nationwide delivery from D-AminGrow.',
  openGraph: {
    title: 'Point-of-Lay (POL) Pullets | Skip the Rearing Risk | D-AminGrow Nigeria',
    description:
      'Fully vaccinated 17–20 week brown and white layer POL pullets. Begin egg production in 4–6 weeks. Nationwide delivery across Nigeria.',
  },
};

const POL_ADVANTAGES = [
  {
    icon: ShieldCheck,
    title: 'No Rearing Risk',
    desc: 'Skip 17 weeks of mortality risk, brooding costs, and starter feed expense. POL birds arrive fully grown and healthy.',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: Calendar,
    title: 'Start Laying in 4–6 Weeks',
    desc: 'Predictable first-egg window enables accurate cash-flow planning and farm income projection from week one.',
    color: 'bg-teal-100 text-teal-700',
  },
  {
    icon: Award,
    title: '100% Vaccination History',
    desc: 'Complete vaccination record enclosed: Newcastle, Gumboro, Marek\'s, Fowl Pox, Infectious Bronchitis, Coryza, and IB.',
    color: 'bg-cyan-100 text-cyan-700',
  },
  {
    icon: BarChart3,
    title: 'Uniform Flock Batches',
    desc: 'Same-age birds from identical parent stock. Uniform production onset simplifies egg grading and market delivery logistics.',
    color: 'bg-violet-100 text-violet-700',
  },
];

const VACCINATION_SCHEDULE = [
  { age: 'Day 1 (Hatchery)', vaccine: 'Marek\'s Disease (HVT strain)', route: 'Subcutaneous injection at hatchery' },
  { age: 'Day 5–7', vaccine: 'Newcastle B1 Live (Prime)', route: 'Eye-drop or drinking water' },
  { age: 'Day 10–14', vaccine: 'Gumboro IBD Intermediate Plus (1st dose)', route: 'Drinking water with skimmed milk' },
  { age: 'Day 18–21', vaccine: 'Gumboro IBD Intermediate Plus (Booster)', route: 'Drinking water with skimmed milk' },
  { age: 'Day 21–28', vaccine: 'Newcastle LaSota Live (Booster)', route: 'Drinking water or coarse spray' },
  { age: 'Week 6', vaccine: 'Fowl Pox (Wing-web stab)', route: 'Wing-web stab method' },
  { age: 'Week 8', vaccine: 'ND + IB H120 Bivalent Live', route: 'Eye-drop or coarse spray' },
  { age: 'Week 10–12', vaccine: 'Infectious Coryza Killed (1st dose)', route: 'Intramuscular injection' },
  { age: 'Week 12–14', vaccine: 'Mycoplasma (MG) Killed', route: 'Subcutaneous at neck' },
  { age: 'Week 16–18', vaccine: 'ND + IB + EDS Triple Killed', route: 'Intramuscular (breast muscle)' },
  { age: 'Week 16–18', vaccine: 'Infectious Coryza Killed (Booster)', route: 'Intramuscular injection' },
];

const BREED_COMPARISON = [
  { feature: 'Egg Shell Colour', brown: 'Rich Dark Brown', white: 'White / Off-White' },
  { feature: 'Egg Production (Cycle)', brown: '305–325 eggs/bird', white: '295–315 eggs/bird' },
  { feature: 'Peak Lay Rate', brown: '93%–96%', white: '91%–94%' },
  { feature: 'Feed Intake (Peak)', brown: '115–125g/bird/day', white: '95–110g/bird/day' },
  { feature: 'Body Weight at POL', brown: '1.6–1.85kg', white: '1.3–1.55kg' },
  { feature: 'Market Preference (Nigeria)', brown: 'Very High (Brown egg premium)', white: 'Moderate' },
  { feature: 'Best For', brown: 'Deep litter & battery cage', white: 'Battery cage only' },
];

export default function ServicePointOfLayPage() {
  const polProducts = getProductsByCategory('point-of-lay');

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link href="/services" className="hover:text-emerald-600 transition-colors">Services</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 font-medium">Point-of-Lay Birds</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#050E08] via-teal-950/30 to-[#050E08] pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/3" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-400 mb-6">
              <Egg className="h-4 w-4" />
              Production-Ready Birds — Skip 17 Weeks of Rearing
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-[1.05] mb-6">
              Point-of-Lay Pullets{' '}
              <span className="text-teal-400">Sales & Distribution</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl">
              Fully vaccinated 17–20 week-old brown and white layer pullets. Skip the mortality risk of rearing from day-old and begin egg production within 4–6 weeks of purchase.
            </p>

            {/* Key Stats Strip */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { label: '17–20 Weeks Old', emoji: '🐓' },
                { label: '100% Vaccination History', emoji: '💉' },
                { label: 'Lay Starts in 4–6 Weeks', emoji: '🥚' },
                { label: 'Min Order: 50 Birds', emoji: '📦' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-4 py-2">
                  <span>{stat.emoji}</span>
                  <span className="text-sm font-semibold text-white">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#order-form"
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-7 py-4 rounded-2xl transition-all text-sm shadow-lg shadow-teal-900/30"
              >
                <Egg className="h-5 w-5" />
                Reserve POL Pullets
              </a>
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20Point-of-Lay%20pullets.%20I%20need%20%5BQUANTITY%5D%20birds.%20Please%20send%20availability%20and%20price."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-4 rounded-2xl transition-all text-sm shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Desk
              </a>
              <Link
                href="/point-of-lay"
                className="flex items-center gap-2 text-slate-300 hover:text-white font-semibold px-6 py-4 rounded-2xl border border-white/15 hover:border-white/30 transition-all text-sm"
              >
                Full POL Catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why POL */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-4 py-2 rounded-full">
              <Star className="h-3.5 w-3.5" />
              Why Buy Point-of-Lay?
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              4 Powerful Advantages Over Day-Old Chicks
            </h2>
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

      {/* Breed Comparison */}
      <section className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full">
              <BarChart3 className="h-3.5 w-3.5" />
              Breed Comparison
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Brown Layer vs. White Layer
            </h2>
            <p className="text-slate-600">Both breeds available at D-AminGrow. Here&apos;s what separates them:</p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            <div className="grid grid-cols-3 bg-[#050E08] text-white">
              <div className="p-5 text-sm font-bold font-heading">Attribute</div>
              <div className="p-5 text-sm font-bold font-heading text-center border-l border-white/10">
                <span className="flex items-center justify-center gap-2">🟤 <span className="text-amber-400">Brown Layer</span></span>
              </div>
              <div className="p-5 text-sm font-bold font-heading text-center border-l border-white/10">
                <span className="flex items-center justify-center gap-2">⬜ <span className="text-slate-300">White Layer</span></span>
              </div>
            </div>
            {BREED_COMPARISON.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <div className="p-4 text-sm font-semibold text-slate-700">{row.feature}</div>
                <div className="p-4 text-sm text-slate-700 text-center border-l border-slate-100 font-medium">{row.brown}</div>
                <div className="p-4 text-sm text-slate-600 text-center border-l border-slate-100">{row.white}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vaccination Schedule */}
      <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-4 py-2 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5" />
              Full Vaccination History
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Complete POL Vaccination Schedule
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Every bird sold as POL has received all of the vaccines in the schedule below during rearing. Vaccination records accompany each batch.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <div className="grid grid-cols-3 bg-teal-900 text-white">
              <div className="p-4 text-xs font-bold uppercase tracking-wider">Age / Timing</div>
              <div className="p-4 text-xs font-bold uppercase tracking-wider border-l border-white/10">Vaccine</div>
              <div className="p-4 text-xs font-bold uppercase tracking-wider border-l border-white/10">Route</div>
            </div>
            {VACCINATION_SCHEDULE.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}`}>
                <div className="p-3.5 text-xs font-semibold text-teal-700">{row.age}</div>
                <div className="p-3.5 text-xs text-slate-800 border-l border-slate-100 font-medium">{row.vaccine}</div>
                <div className="p-3.5 text-xs text-slate-600 border-l border-slate-100">{row.route}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">* Vaccination schedule may vary slightly by source farm. Records provided with each batch delivery.</p>
        </div>
      </section>

      {/* Interactive Reservation Form */}
      <section id="order-form" className="py-20 sm:py-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-4 py-2 rounded-full">
              <Egg className="h-3.5 w-3.5" />
              Online POL Booking Desk
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Book Your Point-of-Lay Pullets
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Configure your batch size, layer breed, and dispatch day to receive an official reservation code and deposit invoice.
            </p>
          </div>

          <PolBookingForm />
        </div>
      </section>

      {/* POL Products Grid */}
      {polProducts.length > 0 && (
        <section className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-4 py-2 rounded-full mb-4">
                  <Feather className="h-3.5 w-3.5" />
                  Available POL Birds
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                  Current POL Bird Stock
                </h2>
                <p className="text-sm text-slate-500 mt-2">Contact for current weekly availability and price</p>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 shrink-0">
                <Clock className="h-4 w-4 text-amber-600" />
                <span className="text-sm text-amber-800 font-medium">Price on Request — Call for Current Rate</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {polProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#050E08] to-teal-950/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-400 mb-6">
            <Clock className="h-4 w-4" />
            Minimum Order: 50 Birds
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4">
            Ready to Start Laying?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Order your POL pullets today. Contact us for current batch availability, price, and delivery timeline to your farm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20order%20Point-of-Lay%20pullets.%20I%20need%20%5BQUANTITY%5D%20birds.%20Please%20send%20availability%20and%20price."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-2xl transition-all text-sm"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp — Order POL Birds
            </a>
            <a
              href="tel:+2348139169402"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-sm"
            >
              <Phone className="h-5 w-5" />
              +234 813 916 9402
            </a>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Related Tools &amp; Services</h3>
            <p className="text-xs text-slate-500 mt-1">Calculate egg production, HDP, and profitability</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/point-of-lay" className="flex items-center gap-2 text-teal-700 font-semibold text-sm bg-teal-50 border border-teal-200 px-5 py-2.5 rounded-xl hover:bg-teal-100 transition-all">
              Full POL Catalog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/calculators/egg-production" className="flex items-center gap-2 text-slate-700 font-semibold text-sm bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:border-slate-300 transition-all">
              Egg Production Calculator <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services/chicks" className="flex items-center gap-2 text-slate-700 font-semibold text-sm bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:border-slate-300 transition-all">
              Compare With Chick Booking <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
