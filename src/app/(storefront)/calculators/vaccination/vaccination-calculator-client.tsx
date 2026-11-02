'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Printer,
  AlertTriangle,
  ArrowRight,
  Calendar,
  ChevronRight,
} from 'lucide-react';

interface VaccineEvent {
  dayAge: number;
  disease: string;
  vaccineName: string;
  strain: string;
  route: string;
  importance: 'critical' | 'essential' | 'routine';
  productLink?: string;
  notes: string;
}

const BROILER_SCHEDULE: VaccineEvent[] = [
  {
    dayAge: 1,
    disease: "Marek's Disease",
    vaccineName: 'HVT Freeze-Dried Vaccine',
    strain: 'FC 126 Strain',
    route: 'Subcutaneous injection at hatchery',
    importance: 'critical',
    notes: 'Administered at certified hatchery before packaging. Verified on chick arrival.',
  },
  {
    dayAge: 7,
    disease: 'Newcastle Disease (Prime)',
    vaccineName: 'Newcastle Disease Vaccine',
    strain: 'Hitchner B1 or LaSota (1st dose)',
    route: 'Eye drop or unchlorinated drinking water',
    importance: 'critical',
    productLink: '/vaccines/newcastle-disease-vaccine-lasota-strain',
    notes: 'Administer with skimmed milk powder (2g/L). Give Vitamin C anti-stress in the evening.',
  },
  {
    dayAge: 12,
    disease: 'Infectious Bursal Disease (Gumboro)',
    vaccineName: 'Gumboro IBD Vaccine (1st dose)',
    strain: 'Intermediate Plus',
    route: 'Drinking water',
    importance: 'critical',
    productLink: '/vaccines/infectious-bursal-disease-gumboro-vaccine',
    notes: 'Withhold water 1.5 hours prior. All birds must drink within 1.5 hours.',
  },
  {
    dayAge: 18,
    disease: 'Infectious Bursal Disease (Booster)',
    vaccineName: 'Gumboro IBD Vaccine (2nd dose)',
    strain: 'Intermediate Plus',
    route: 'Drinking water',
    importance: 'critical',
    productLink: '/vaccines/infectious-bursal-disease-gumboro-vaccine',
    notes: 'Crucial booster to close maternal antibody immunity gaps in high-risk zones.',
  },
  {
    dayAge: 24,
    disease: 'Newcastle Disease (Booster)',
    vaccineName: 'Newcastle Disease Vaccine (LaSota)',
    strain: 'LaSota Lentogenic Strain',
    route: 'Drinking water',
    importance: 'critical',
    productLink: '/vaccines/newcastle-disease-vaccine-lasota-strain',
    notes: 'Solidifies flock immunity against velogenic Newcastle challenge until slaughter.',
  },
];

const LAYER_SCHEDULE: VaccineEvent[] = [
  ...BROILER_SCHEDULE,
  {
    dayAge: 42,
    disease: 'Fowl Pox',
    vaccineName: 'Fowl Pox Live Vaccine',
    strain: 'Attenuated Chicken Strain',
    route: 'Wing-web puncture with double-needle applicator',
    importance: 'essential',
    notes: 'Inspect wing-web for characteristic vaccine "take" swelling 7–10 days post application.',
  },
  {
    dayAge: 56,
    disease: 'Fowl Typhoid / Salmonella',
    vaccineName: 'Salmonella Gallinarum Vaccine',
    strain: '9R Rough Strain',
    route: 'Intramuscular or subcutaneous injection',
    importance: 'essential',
    notes: 'Do not administer antibiotics within 5 days before or after 9R vaccination.',
  },
  {
    dayAge: 112,
    disease: 'Newcastle + EDS + Infectious Bronchitis',
    vaccineName: 'ND + EDS + IB Inactivated Tri-Vaccine',
    strain: 'Oil-Emulsion Inactivated',
    route: 'Intramuscular breast injection (0.5ml)',
    importance: 'critical',
    notes: 'Administered at point-of-lay (16 weeks) to provide maternal immunity and sustained lay protection.',
  },
];

export default function VaccinationCalculatorClient() {
  const [placementDate, setPlacementDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0] || '2026-11-02';
  });
  const [flockType, setFlockType] = useState<'broiler' | 'layer'>('broiler');

  const schedule = flockType === 'broiler' ? BROILER_SCHEDULE : LAYER_SCHEDULE;

  const calculateDate = (dayOffset: number): string => {
    const base = new Date(placementDate);
    base.setDate(base.getDate() + (dayOffset - 1));
    return base.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50/70">
      {/* ====================================================================
          CINEMATIC DARK HERO
          ==================================================================== */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden print:hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <Link href="/knowledge" className="hover:text-emerald-400 transition-colors">Knowledge & Tools</Link>
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
              Generate a verified, day-by-day immunization calendar tailored to your chick arrival date in Nigeria. Built for commercial broilers and brown layer pullets.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CONTROLS & TIMETABLE CONTAINER
          ==================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 z-20 relative pb-20 space-y-8">
        {/* Controls Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 print:border-none print:shadow-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Chick Placement / Arrival Date:
              </label>
              <input
                type="date"
                value={placementDate}
                onChange={(e) => setPlacementDate(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Bird Production Category:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFlockType('broiler')}
                  className={`rounded-2xl border p-3 text-xs font-bold transition-all ${
                    flockType === 'broiler'
                      ? 'border-cyan-500 bg-cyan-50/70 text-cyan-900 ring-2 ring-cyan-500/20 font-extrabold shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Commercial Broilers
                </button>
                <button
                  type="button"
                  onClick={() => setFlockType('layer')}
                  className={`rounded-2xl border p-3 text-xs font-bold transition-all ${
                    flockType === 'layer'
                      ? 'border-cyan-500 bg-cyan-50/70 text-cyan-900 ring-2 ring-cyan-500/20 font-extrabold shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Commercial Layers
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="md"
                onClick={handlePrint}
                className="w-full justify-center py-3.5 rounded-2xl border-slate-300 hover:bg-slate-100 font-bold text-xs"
              >
                <Printer className="h-4 w-4 mr-2" />
                <span>Print Immunization Chart</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Administration Rules Banner */}
        <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-6 sm:p-8 space-y-4 print:border print:border-amber-300">
          <div className="flex items-center space-x-2 text-amber-950 font-bold text-sm font-heading">
            <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0" />
            <span>Golden Rules of Drinking Water Poultry Vaccination in Nigeria:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-amber-950 leading-relaxed">
            <div className="bg-white/80 rounded-2xl p-4 border border-amber-200/60 shadow-sm">
              <strong className="block text-amber-900 font-bold mb-1">1. Chlorine Neutralization:</strong>
              Dissolve 2g of skimmed milk powder per litre of drinking water 20 minutes before mixing vaccine. Tap water chlorine neutralizes live vaccine viruses.
            </div>
            <div className="bg-white/80 rounded-2xl p-4 border border-amber-200/60 shadow-sm">
              <strong className="block text-amber-900 font-bold mb-1">2. Thirst Period:</strong>
              Withhold water for 1.5 to 2 hours prior to vaccination so all birds drink the full dose within 90 minutes.
            </div>
            <div className="bg-white/80 rounded-2xl p-4 border border-amber-200/60 shadow-sm">
              <strong className="block text-amber-900 font-bold mb-1">3. Early Morning Timing:</strong>
              Vaccinate strictly between 6:00 AM – 8:00 AM before ambient daytime heat rises. Never expose vaccine solution to sunlight.
            </div>
          </div>
        </div>

        {/* Dynamic Timetable */}
        <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gradient-to-r from-slate-50 to-white">
            <div>
              <h2 className="text-xl font-extrabold text-slate-950 font-heading">
                Vaccination Timetable ({flockType === 'broiler' ? '6-Week Broiler Cycle' : 'Point-of-Lay Pullet Cycle'})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Calculated for arrival date: <strong className="text-slate-800">{calculateDate(1)}</strong>
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-800 bg-cyan-50 border border-cyan-200 px-3.5 py-1.5 rounded-full whitespace-nowrap">
              Cold-Chain (2°C–8°C) Mandatory
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {schedule.map((ev, idx) => (
              <div key={idx} className="p-6 sm:p-7 hover:bg-slate-50/80 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Timing & Disease */}
                  <div className="flex items-start space-x-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white font-heading font-extrabold text-sm shadow-md">
                      D{ev.dayAge}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-md">
                          {calculateDate(ev.dayAge)}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Day {ev.dayAge} of life
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-950 font-heading">
                        {ev.disease} — <span className="text-slate-600 font-normal">{ev.vaccineName}</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Route: <strong className="text-slate-800 font-semibold">{ev.route}</strong> • Strain: {ev.strain}
                      </p>
                    </div>
                  </div>

                  {/* Right: Notes & Fast Order Link */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:max-w-md">
                    <p className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex-1 leading-relaxed">
                      {ev.notes}
                    </p>
                    {ev.productLink ? (
                      <Link href={ev.productLink} className="whitespace-nowrap shrink-0">
                        <Button variant="primary" size="sm" className="whitespace-nowrap font-bold text-xs py-2.5 px-4 rounded-xl">
                          <span>Order Vaccine</span>
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    ) : (
                      <a
                        href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20need%20assistance%20ordering%20vaccines%20for%20my%20flock."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap shrink-0"
                      >
                        <Button variant="outline" size="sm" className="whitespace-nowrap font-bold text-xs py-2.5 px-4 rounded-xl">
                          <span>Inquire Desk</span>
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Anti-Stress Companion Protocol Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Essential Companion Protocol
            </span>
            <h3 className="text-xl font-extrabold text-slate-950 font-heading">
              Post-Vaccination Anti-Stress Recovery
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Vaccination induces mild febrile stress and immune reactions. Administer water-soluble Ascorbic Acid (Vitamin C) for 48 hours following each vaccine dose to prevent drop in feed intake.
            </p>
          </div>
          <Link href="/drugs/ascorbic-acid-vitamin-c-anti-stress-powder" className="shrink-0">
            <Button variant="primary" size="md" className="whitespace-nowrap py-3.5 px-6 rounded-2xl font-bold text-xs">
              <span>View Ascorbic Acid (Vitamin C)</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
