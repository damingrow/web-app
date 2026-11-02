import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { Thermometer, CheckCircle2, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Livestock Vaccines (2°C–8°C Cold-Chain Guaranteed) | D-AminGrow',
  description:
    'Genuine poultry vaccines including Newcastle LaSota and Gumboro (IBD). Shipped in temperature-controlled thermal boxes with frozen gel packs to preserve biological potency.',
};

export default function VaccinesCategoryPage() {
  const vaccines = getProductsByCategory('vaccines');

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Livestock Vaccines</span>
        </nav>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-3.5 py-1 text-xs font-semibold text-cyan-300 border border-cyan-400/30">
              ❄️ 2°C – 8°C Continuous Cold-Chain Protocol
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
              Certified Livestock Vaccines
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Biosecure immunologicals protecting commercial flocks against high-mortality viral threats. Every vial is stored in calibrated biological refrigerators and dispatched exclusively in insulated thermal containers with ice gel packs.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                <span>Thermal Ice Pack Packaging</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                <span>Pre-Dispatch Temperature Verification</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                <span>Diluent Reconstitution Guides</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cold-Chain Logistics Protocol Card */}
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50/70 p-6 shadow-sm">
          <div className="flex items-start space-x-3.5">
            <div className="rounded-xl bg-cyan-100 p-2 text-cyan-800 shrink-0">
              <Thermometer className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-cyan-950 font-heading">
                Vaccine Cold-Chain Guarantee & Waybill Requirements
              </h3>
              <p className="text-xs text-cyan-900 leading-relaxed">
                Live vaccines lose immunizing titer within minutes if exposed to ambient tropical temperatures. To prevent immunization failure:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs text-cyan-900">
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-600"></span>
                  <span>Shipped in sealed EPS styrofoam boxes with dry ice/gel packs.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-600"></span>
                  <span>Recipients must have an operational refrigerator on standby before delivery.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-600"></span>
                  <span>Administer strictly using unchlorinated water stabilized with skimmed milk.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-heading">Live Viral Vaccines</h2>
              <p className="text-xs text-slate-500 mt-0.5">High-potency freeze-dried vials for 1,000 birds</p>
            </div>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20want%20to%20consult%20on%20a%20poultry%20vaccination%20schedule."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-800"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Flock Vaccination Schedule Advisory</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vaccines.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
