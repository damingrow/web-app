'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Printer,
  AlertTriangle,
  ArrowRight,
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
    notes: 'Administered at certified hatchery before packaging. Verified on arrival.',
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

export default function VaccinationCalendarPage() {
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
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Poultry Vaccination Calendar</span>
        </nav>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-3.5 py-1 text-xs font-semibold text-cyan-300 border border-cyan-400/30">
              📅 Clinical Veterinary Schedule
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
              Poultry Vaccination Schedule Generator
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Generate a customized day-by-day immunization timetable for your flock placement date. Protect broilers and commercial layers against Newcastle, Gumboro, and Fowl Pox.
            </p>
          </div>
        </div>

        {/* Controls Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Chick Placement / Arrival Date:
              </label>
              <input
                type="date"
                value={placementDate}
                onChange={(e) => setPlacementDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Bird Production Category:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFlockType('broiler')}
                  className={`rounded-xl border p-2.5 text-xs font-bold transition-all ${
                    flockType === 'broiler'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Commercial Broilers
                </button>
                <button
                  type="button"
                  onClick={() => setFlockType('layer')}
                  className={`rounded-xl border p-2.5 text-xs font-bold transition-all ${
                    flockType === 'layer'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
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
                className="w-full justify-center"
              >
                <Printer className="h-4 w-4 mr-2" />
                <span>Print Schedule</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Administration Rules Banner */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 space-y-3">
          <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm font-heading">
            <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0" />
            <span>Golden Rules of Drinking Water Poultry Vaccination in Nigeria:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-amber-900 leading-relaxed">
            <div className="bg-white/60 rounded-xl p-3 border border-amber-200/50">
              <strong>1. Chlorine Neutralization:</strong> Always dissolve 2g of skimmed milk powder per litre of water 20 minutes before adding vaccine. Tap chlorine destroys live viruses.
            </div>
            <div className="bg-white/60 rounded-xl p-3 border border-amber-200/50">
              <strong>2. Thirst Thirst Period:</strong> Deprive birds of water for 1.5 to 2 hours prior to vaccination so all birds drink the full dose within 90 minutes.
            </div>
            <div className="bg-white/60 rounded-xl p-3 border border-amber-200/50">
              <strong>3. Temperature & Sunlight:</strong> Vaccinate strictly between 6:00 AM – 8:00 AM before ambient daytime heat rises. Never expose vaccine solution to sunlight.
            </div>
          </div>
        </div>

        {/* Dynamic Timetable */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Vaccination Timetable ({flockType === 'broiler' ? '6-Week Broiler Cycle' : 'Point-of-Lay Pullet Cycle'})
              </h2>
              <p className="text-xs text-slate-500">
                Calculated for arrival date: {calculateDate(1)}
              </p>
            </div>
            <span className="text-xs font-semibold text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full">
              Cold-Chain (2°C–8°C) Mandatory
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {schedule.map((ev, idx) => (
              <div key={idx} className="p-6 hover:bg-slate-50/80 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Timing & Disease */}
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white font-heading font-extrabold text-sm">
                      D{ev.dayAge}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {calculateDate(ev.dayAge)}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Day {ev.dayAge} of life
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-950 font-heading mt-1">
                        {ev.disease} — <span className="text-slate-600 font-normal">{ev.vaccineName}</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Route: <strong className="text-slate-700">{ev.route}</strong> • Strain: {ev.strain}
                      </p>
                    </div>
                  </div>

                  {/* Right: Notes & Fast Order Link */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:max-w-md">
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 flex-1">
                      {ev.notes}
                    </p>
                    {ev.productLink ? (
                      <Link href={ev.productLink}>
                        <Button variant="primary" size="sm" className="whitespace-nowrap shrink-0">
                          <span>Order Vaccine</span>
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    ) : (
                      <a
                        href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20need%20assistance%20with%20vaccines%20for%20my%20flock."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="whitespace-nowrap shrink-0">
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

        {/* Anti-Stress Recommendation Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Essential Companion Protocol
            </span>
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Post-Vaccination Anti-Stress Recovery
            </h3>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              Vaccination induces mild febrile stress and immune reactions. Administer water-soluble Ascorbic Acid (Vitamin C) for 48 hours following each vaccine dose to prevent drop in feed consumption.
            </p>
          </div>
          <Link href="/drugs/ascorbic-acid-vitamin-c-anti-stress-powder">
            <Button variant="primary" size="md" className="whitespace-nowrap">
              <span>View Ascorbic Acid Vitamin C</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
