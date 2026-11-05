import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Calendar, Syringe, ShieldCheck } from 'lucide-react';
import { VaccinationProgramHub } from '@/components/vaccination/vaccination-program-hub';

export const metadata: Metadata = {
  title: 'Official Poultry Vaccination Programs — Broilers & Layers | D-AminGrow Nigeria',
  description:
    'Download and print official calibrated poultry vaccination programs for commercial broilers and layers in Nigeria. Real-time calendar dates, cold-chain guidelines, and day 1 Marek protocols.',
  openGraph: {
    title: 'Poultry Vaccination Programs Nigeria | D-AminGrow',
    description:
      'Digitized clinical protocols from D-AminGrow Technical Veterinary Desk: Broiler 6-Week Timetable & Layer Day 1 to 1st Phase in Laying.',
    type: 'website',
  },
};

export default function VaccinationProgramPage() {
  return (
    <div className="font-body min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative hero-mesh overflow-hidden py-16 sm:py-24 print:hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/vaccines" className="hover:text-emerald-400 transition-colors">
              Vaccines
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Vaccination Programs</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-4 py-2 rounded-full">
              <Syringe className="h-3.5 w-3.5 text-cyan-400" />
              Clinical Immunization Engine
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Calibrated Poultry <br />
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Vaccination Programs
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Direct digitized clinical protocols from the D-AminGrow Veterinary Technical Desk. Generate an exact day-by-day immunization calendar calibrated for your flock arrival date, with printable PDF export and pre-packaged cold-chain delivery.
            </p>

            {/* Quick highlights */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
                <ShieldCheck className="h-3.5 w-3.5" />
                VCN Standard Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
                ❄️ 2°C–8°C Cold-Chain Guaranteed
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
                <Calendar className="h-3.5 w-3.5" />
                Real-Time Calendar Dates
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Hub */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 -mt-8 sm:-mt-12 relative z-20">
        <VaccinationProgramHub initialFlockType="broiler" />
      </main>
    </div>
  );
}
