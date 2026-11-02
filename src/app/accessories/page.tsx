import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { CheckCircle2, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Poultry Equipment, Housing & Farm Accessories | D-AminGrow Nigeria',
  description:
    'Commercial poultry brooding heaters, automatic feeders, bell & nipple drinkers, live bird transport crates, defeathering machines, and battery cages.',
};

export default function AccessoriesCategoryPage() {
  const accessories = getProductsByCategory('accessories');

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Farm Accessories & Equipment</span>
        </nav>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
              ⚙️ Commercial Grade Poultry Equipment
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
              Poultry Housing & Accessories
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Industrial durability engineered for African farm conditions. Reduce feed wastage, eliminate wet litter ammonia, and streamline operations with heavy-duty gas brooders, automated watering lines, transport crates, and processing machinery.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Heavy-Duty Virgin HDPE & Stainless Steel</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Spares & Replacement Parts Available</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Bulk Commercial Farm Discounts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Farm Equipment Catalog ({accessories.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Rearing pans, bell drinkers, nipple lines, crates, and processing equipment
              </p>
            </div>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20need%20a%20bulk%20quote%20for%20farm%20accessories%20and%20cages."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Bulk Commercial Quotation Desk</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessories.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
