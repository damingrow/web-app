'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar, Syringe, ShieldCheck } from 'lucide-react';
import { VaccinationProgramHub } from '@/components/vaccination/vaccination-program-hub';

export default function VaccinationCalculatorClient() {
  return (
    <div className="min-h-screen bg-slate-50/70">
      {/* ====================================================================
          CINEMATIC HERO
          ==================================================================== */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden print:hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <Link href="/calculators" className="hover:text-emerald-400 transition-colors">
              Calculators
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-cyan-400 font-semibold">Vaccination Schedule Generator</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="section-label-dark">
              <Calendar className="h-3.5 w-3.5 text-cyan-400" />
              Clinical Immunization Engine
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight">
              Flock Vaccination <br />
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Schedule Generator
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Generate a verified, day-by-day immunization calendar tailored to your chick arrival date in Nigeria. Built for commercial broilers and commercial layer pullets according to D-AminGrow Veterinary Protocols.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
                <ShieldCheck className="h-3.5 w-3.5" />
                VCN Standard Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
                ❄️ 2°C–8°C Cold-Chain Guaranteed
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
                <Syringe className="h-3.5 w-3.5" />
                Direct Hatchery Integration
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Hub */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 z-20 relative pb-20">
        <VaccinationProgramHub initialFlockType="broiler" />
      </div>
    </div>
  );
}
