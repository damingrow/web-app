import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  ShieldCheck,
  Truck,
  ArrowRight,
  ChevronRight,
  Egg,
  MessageCircle,
} from 'lucide-react';
import { PolBookingForm } from '@/components/forms/pol-booking-form';

export const metadata: Metadata = {
  title: 'Point-of-Lay Birds in Nigeria (16–18 Weeks) — Pre-Vaccinated Layers | D-AminGrow',
  description:
    'Order commercial 16–18 week-old Point-of-Lay brown layer pullets ready to start laying within 4–6 weeks. Fully vaccinated against Newcastle, Gumboro, Fowl Pox, Marek’s, and IB. Transported in 10-bird crates. Minimum order 50 birds.',
  keywords: [
    'point of lay birds nigeria',
    'point of lay hens ibadan',
    'point of lay chickens lagos',
    '16 weeks pullets for sale',
    '18 weeks layers price nigeria',
    'commercial egg farming nigeria',
  ],
};

const VACCINATION_HISTORY = [
  { disease: 'Marek’s Disease (HVT)', timing: 'Day 1 (Hatchery subcutaneous)' },
  { disease: 'Newcastle Disease (HB1 / LaSota)', timing: 'Day 7, Day 21 & Week 8' },
  { disease: 'Infectious Bursal Disease (IBD Gumboro)', timing: 'Day 10, Day 18 & Day 28' },
  { disease: 'Fowl Pox (Wing Web)', timing: 'Week 6' },
  { disease: 'Infectious Bronchitis (IB Mass)', timing: 'Week 3 & Week 12' },
  { disease: 'Egg Drop Syndrome (EDS + ND Inactivated)', timing: 'Week 14 – 16 (Pre-lay booster)' },
];

export default function PointOfLayBirdsPage() {
  return (
    <div className="font-body bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/day-old-chicks" className="hover:text-emerald-700 transition-colors">
              Birds
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-slate-900">Point-of-Lay Birds</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950 text-white py-14 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300">
                <Egg className="h-4 w-4" />
                <span>Ready to Lay in 4–6 Weeks · 16–18 Weeks Old</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white leading-tight">
                Commercial Point-of-Lay Birds (16–18 Weeks)
              </h1>

              <p className="text-sm sm:text-base text-amber-200/90 font-medium">
                Skip 4 Months of Brooding Costs &amp; Risks — Start Egg Production Fast
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Reared under biosecure veterinary oversight, our Point-of-Lay brown layer pullets arrive with complete
                vaccination histories, uniform breed standard body weights (1.3kg–1.5kg), and peak production potential
                of 310–325 rich brown eggs per hen housed.
              </p>

              {/* Fast Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                  <span className="text-[10px] text-amber-300 uppercase font-bold block">First Egg</span>
                  <span className="font-bold text-white text-sm mt-0.5 block">4–6 Weeks</span>
                </div>
                <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                  <span className="text-[10px] text-amber-300 uppercase font-bold block">Peak Lay Rate</span>
                  <span className="font-bold text-white text-sm mt-0.5 block">94% – 96%</span>
                </div>
                <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                  <span className="text-[10px] text-amber-300 uppercase font-bold block">Min Order</span>
                  <span className="font-bold text-white text-sm mt-0.5 block">50 Birds (5 Crts)</span>
                </div>
                <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                  <span className="text-[10px] text-amber-300 uppercase font-bold block">Packaging</span>
                  <span className="font-bold text-white text-sm mt-0.5 block">10 Birds / Crate</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <a
                  href="#booking-form"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Reserve Point-of-Lay Birds</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20want%20to%20enquire%20about%20Point-of-Lay%20birds%20availability"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>Chat With Farm Manager</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 shadow-2xl">
                <div className="relative h-72 sm:h-80 w-full">
                  <Image
                    src="/products/Chicks/Point of Lay.jpeg"
                    alt="Commercial Point-of-Lay Birds"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-400">Transit Protection:</span>
                      <span className="font-semibold text-white">Reinforced plastic transport crates (10 birds/crate)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Form Grid */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Comprehensive Technical Value */}
          <div className="lg:col-span-7 space-y-8">
            {/* Why Point-of-Lay vs Day-Old Pullets */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                Why Commercial Farmers Choose Point-of-Lay
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <span className="font-bold text-slate-900 block">No Brooding Mortality Risk</span>
                  <p className="text-slate-600 leading-relaxed">
                    Avoid critical Weeks 0–6 early mortality where most inexperienced farmers suffer 10%–20% flock losses.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <span className="font-bold text-slate-900 block">Eliminate 16 Weeks of Feed Bills</span>
                  <p className="text-slate-600 leading-relaxed">
                    Skip starter and grower feed compounding costs. Birds arrive ready to consume direct layer mash.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <span className="font-bold text-slate-900 block">Fast Cash Flow Generation</span>
                  <p className="text-slate-600 leading-relaxed">
                    Egg revenue commences in 4–6 weeks rather than waiting 5 long months from day-old brooding.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <span className="font-bold text-slate-900 block">Verified Body Weight Standards</span>
                  <p className="text-slate-600 leading-relaxed">
                    Birds are weighed at 16 weeks to ensure proper skeletal pelvic development for high lay persistence.
                  </p>
                </div>
              </div>
            </div>

            {/* Complete Immunization Record */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  Full Pre-Sale Vaccination History
                </h3>
                <span className="rounded bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                  Veterinary Certified
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Each batch is administered full viral prophylaxis under strict cold-chain supervision:
              </p>

              <div className="space-y-2 text-xs">
                {VACCINATION_HISTORY.map((vax) => (
                  <div
                    key={vax.disease}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span className="font-bold text-slate-800">{vax.disease}</span>
                    <span className="font-medium text-emerald-700 text-[11px]">{vax.timing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics & Crating Details */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                <Truck className="h-5 w-5 text-amber-600" />
                Interstate Delivery &amp; Crate Protocol
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Point-of-Lay birds require ventilated plastic poultry crates. Each crate holds 10 mature birds comfortably.
                Dispatches are scheduled in evening or early morning transit to eliminate heat stress. We deliver across
                Oyo, Lagos, Ogun, Osun, Ondo, Edo, Delta, Kwara, and Abuja hubs.
              </p>
            </div>
          </div>

          {/* Right Column: Embedded Interactive Booking Form */}
          <div id="booking-form" className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg sticky top-24">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Direct Farm Booking
                </span>
                <h3 className="text-xl font-bold font-heading text-slate-900 mt-0.5">
                  Point-of-Lay Reservation Form
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Submit your required crate count for instant confirmation and dispatch arrangement.
                </p>
              </div>

              {/* Render PolBookingForm */}
              <PolBookingForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
