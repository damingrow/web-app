import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { Calendar, Thermometer, CheckCircle2, Phone, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Day-Old Chicks (DOC) Sales & Nationwide Dispatch | D-AminGrow',
  description:
    'Order premium commercial day-old broilers, layer pullets, and cockerels from certified Nigerian hatcheries. Pre-vaccinated for Marek’s Disease with temperature-controlled dispatch every Tuesday and Thursday.',
};

export default function ChicksCategoryPage() {
  const chicks = getProductsByCategory('chicks');

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Day-Old Chicks</span>
        </nav>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
              🐣 Certified First-Generation Genetics
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
              Premium Day-Old Chicks Nationwide
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Direct hatchery partnerships across Nigeria providing vigorous, high-livability commercial broilers and brown layer pullets. Dispatched in specialized ventilated cartons with Marek’s disease pre-vaccination certification.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Marek’s Hatchery Vaccinated</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>51 Chicks per Carton Guarantee</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Climate-Monitored Transit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hatchery Dispatch Schedule & Protocol Widget */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm flex items-start space-x-4">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700 shrink-0">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 font-heading">Weekly Dispatch Windows</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Nationwide shipments depart every <strong>Tuesday</strong> and <strong>Thursday</strong> morning. Bookings close 48 hours prior.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start space-x-4">
            <div className="rounded-xl bg-amber-100 p-3 text-amber-700 shrink-0">
              <Thermometer className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 font-heading">Arrival Brooding Protocol</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Ensure brooder heaters reach <strong>32°C – 35°C</strong> two hours before chick delivery. Provide anti-stress vitamin water immediately.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start space-x-4">
            <div className="rounded-xl bg-cyan-100 p-3 text-cyan-700 shrink-0">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 font-heading">Motor Park Depot Pickup</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Reliable waybill dispatch to registered motor parks across all 36 states and FCT Abuja with arrival SMS alerts.
              </p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-heading">Available Breeds & Strains</h2>
              <p className="text-xs text-slate-500 mt-0.5">Showing verified day-old chick varieties currently available for order</p>
            </div>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20want%20to%20inquire%20about%20current%20hatchery%20prices%20for%20Day-Old%20Chicks."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Inquire on Current Hatchery Rates</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chicks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
