import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { AlertTriangle, CheckCircle2, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Veterinary Drugs, Antibiotics & Supplements | D-AminGrow Nigeria',
  description:
    'NAFDAC-compliant veterinary pharmaceuticals, therapeutic antibiotics, anticoccidials, amino acids, and anti-stress supplements for commercial poultry and livestock.',
};

export default function DrugsCategoryPage() {
  const drugs = getProductsByCategory('drugs');

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Veterinary Drugs</span>
        </nav>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-teal-500/20 px-3.5 py-1 text-xs font-semibold text-teal-300 border border-teal-400/30">
              🛡️ 100% Genuine NAFDAC Registered Medications
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
              Veterinary Drugs & Supplements
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Certified veterinary therapeutics, fast-dissolving antibiotics, targeted anticoccidials, and pure nutritional supplements. Formulated to safeguard flock health, improve feed conversion, and halt disease outbreaks.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                <span>NAFDAC Batch Verification</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                <span>Disclosed Withdrawal Periods</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                <span>Zero Counterfeits Policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* AMR Stewardship & Compliance Banner */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 shadow-sm">
          <div className="flex items-start space-x-3.5">
            <div className="rounded-xl bg-amber-100 p-2 text-amber-800 shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-amber-900 font-heading">
                Antimicrobial Resistance (AMR) & Responsible Usage Notice
              </h3>
              <p className="text-xs text-amber-800 leading-relaxed max-w-4xl">
                D-AminGrow strictly supports national and WHO guidelines against antimicrobial resistance. Antibiotics must be administered solely for veterinary therapy under professional guidance, strictly observing labeled withdrawal periods before meat or eggs enter human food channels. Never administer therapeutic antibiotics as routine growth promoters.
              </p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-heading">Veterinary Formulations ({drugs.length})</h2>
              <p className="text-xs text-slate-500 mt-0.5">Water-soluble powders, oral solutions, and nutritional feed additives</p>
            </div>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20need%20veterinary%20dosage%20advice%20for%20my%20flock."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Veterinary Dosage Advisory</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {drugs.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
