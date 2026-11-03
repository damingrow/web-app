'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Printer,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Building2,
  Phone,
  User,
  MapPin,
  Sparkles,
  Download,
  Layers,
  Award,
} from 'lucide-react';
import {
  calculateVaccinationCalendar,
} from '@/data/vaccination-programs';
import { HATCHERY_PARTNERS, CLIENT_FARMS } from '@/data/partners-and-clients';

const NIGERIAN_STATES = [
  'Oyo',
  'Ogun',
  'Lagos',
  'Osun',
  'Ondo',
  'Ekiti',
  'Kwara',
  'Edo',
  'Delta',
  'Rivers',
  'Kaduna',
  'Kano',
  'Plateau',
  'Abuja (FCT)',
  'Anambra',
  'Enugu',
  'Imo',
  'Abia',
  'Akwa Ibom',
  'Cross River',
  'Benue',
  'Kogi',
  'Niger',
  'Nasarawa',
  'Bauchi',
  'Gombe',
  'Sokoto',
  'Kebbi',
  'Zamfara',
  'Katsina',
  'Jigawa',
  'Yobe',
  'Borno',
  'Adamawa',
  'Taraba',
  'Bayelsa',
  'Ebonyi',
];

interface VaccinationProgramHubProps {
  initialFlockType?: 'broiler' | 'layer';
}

export function VaccinationProgramHub({
  initialFlockType = 'broiler',
}: VaccinationProgramHubProps) {
  const [flockType, setFlockType] = useState<'broiler' | 'layer'>(initialFlockType);
  const [placementDate, setPlacementDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0] || '2026-11-03';
  });

  // Lead capture state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [farmName, setFarmName] = useState('');
  const [state, setState] = useState('Oyo');
  const [flockSize, setFlockSize] = useState('1000');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const calendarEntries = calculateVaccinationCalendar(flockType, placementDate);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim() || !phone.trim()) {
      setFormError('Please enter your full name and phone number to unlock the schedule.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Post lead to backend enquiries database for CRM follow-up
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          farmName: farmName.trim() || undefined,
          state,
          flockType: flockType === 'broiler' ? 'Commercial Broiler' : 'Commercial Layer',
          flockSize: flockSize ? Number(flockSize) : 1000,
          placementDate,
          enquiryType: 'vaccination_program',
          notes: `Requested official calibrated ${flockType.toUpperCase()} vaccination calendar for ${flockSize} birds starting on ${placementDate}.`,
          consentMarketing: true,
        }),
      });

      if (!response.ok) {
        // Still allow unlock on client side even if remote endpoint encounters transient error
        console.warn('Vaccination lead submission returned status:', response.status);
      }

      setLeadSaved(true);
      setIsUnlocked(true);
    } catch (err) {
      console.error('Vaccination lead capture error:', err);
      // Soft unlock so farmer is never blocked from essential biosecurity data
      setIsUnlocked(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const breed = flockType === 'broiler' ? 'Broiler' : 'Layer';
    const scheduleSummary = calendarEntries
      .slice(0, 8)
      .map((e) => `• ${e.timeLabel} (${e.calendarDate}): ${e.item} [${e.routeOfAdministration}]`)
      .join('\n');

    const text = `*D-AMINGROW CALIBRATED ${breed.toUpperCase()} VACCINATION SCHEDULE* 💉
-----------------------------------------
*Farm Name:* ${farmName || 'Commercial Farm'}
*Flock Size:* ${flockSize ? Number(flockSize).toLocaleString() : '1,000'} Birds (${breed})
*Arrival Date:* ${placementDate}
*State / Region:* ${state}

*Key Immunization Events:*
${scheduleSummary}

*Cold-Chain Mandatory:* Store live freeze-dried vaccines at 2°C–8°C.
Official protocol calibrated by D-AminGrow Veterinary Advisory Desk.
https://damingrow.com/vaccination-program`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/2348139169402?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-12">
      {/* ====================================================================
          TOP LEAD CAPTURE & SCHEDULE CONFIGURATOR
          ==================================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xl shadow-slate-900/5 print:hidden">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Veterinary Council of Nigeria (VCN) Standard
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-950 tracking-tight">
              Get Your Calibrated Flock Vaccination Calendar
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Official immunization programs from D-AminGrow Technical Veterinary Desk for commercial Nigerian poultry environments. Enter your chick arrival date to generate and print your exact dated schedule.
            </p>
          </div>

          {/* Flock Type Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <button
              type="button"
              onClick={() => setFlockType('broiler')}
              className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all text-sm font-bold ${
                flockType === 'broiler'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold">
                🐣
              </div>
              <div className="text-left">
                <div className="font-extrabold font-heading">Commercial Broilers</div>
                <div className="text-xs text-slate-500 font-normal">Fast-growth 6-week program</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFlockType('layer')}
              className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all text-sm font-bold ${
                flockType === 'layer'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold">
                🥚
              </div>
              <div className="text-left">
                <div className="font-extrabold font-heading">Commercial Layers</div>
                <div className="text-xs text-slate-500 font-normal">Day 1 to 1st Phase in Laying</div>
              </div>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitLead} className="space-y-6 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Farmer / Manager Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alhaji Rasheed Adebayo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  WhatsApp Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08139169402"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Farm Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Farm Name (Optional)
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Bayo Agro Farms"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Farm Location / State <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st} State
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Flock Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Flock Capacity / Size <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Layers className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <select
                    value={flockSize}
                    onChange={(e) => setFlockSize(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="500">500 Birds</option>
                    <option value="1000">1,000 Birds</option>
                    <option value="2000">2,000 Birds</option>
                    <option value="3000">3,000 Birds</option>
                    <option value="5000">5,000 Birds</option>
                    <option value="10000">10,000+ Birds</option>
                  </select>
                </div>
              </div>

              {/* Arrival Date */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Chick Placement Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={placementDate}
                    onChange={(e) => setPlacementDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {formError && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 font-medium">
                {formError}
              </div>
            )}

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Your details are kept strictly confidential under NDPR compliance.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-4 rounded-2xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating Calendar...</span>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>{isUnlocked ? 'Update & Refresh Calendar' : 'Generate & Unlock My Schedule'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ====================================================================
          GOLDEN RULES BANNER (ALWAYS VISIBLE)
          ==================================================================== */}
      <section className="rounded-3xl border border-amber-200 bg-amber-50/90 p-6 sm:p-8 space-y-4 print:border-amber-300">
        <div className="flex items-center gap-2 text-amber-950 font-bold text-sm sm:text-base font-heading">
          <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0" />
          <span>Golden Rules of Drinking-Water Poultry Vaccination in Nigeria:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-amber-950 leading-relaxed">
          <div className="bg-white/90 rounded-2xl p-4 border border-amber-200/60 shadow-xs">
            <strong className="block text-amber-900 font-bold mb-1">1. Chlorine Neutralization:</strong>
            Dissolve 2g of skimmed milk powder per litre of drinking water 20 minutes before mixing vaccine. Residual tap water chlorine neutralizes live vaccine viruses.
          </div>
          <div className="bg-white/90 rounded-2xl p-4 border border-amber-200/60 shadow-xs">
            <strong className="block text-amber-900 font-bold mb-1">2. Thirst Period (Withholding):</strong>
            Withhold water for 1.5 to 2 hours prior to vaccination so that all birds drink eagerly and consume the full dose within 90 minutes.
          </div>
          <div className="bg-white/90 rounded-2xl p-4 border border-amber-200/60 shadow-xs">
            <strong className="block text-amber-900 font-bold mb-1">3. Early Morning Administration:</strong>
            Vaccinate strictly between 6:00 AM – 8:00 AM before ambient heat spikes. Never allow vaccine solution to sit under sunlight or ambient heat above 25°C.
          </div>
        </div>
      </section>

      {/* ====================================================================
          CALIBRATED SCHEDULE DISPLAY (UNLOCKED / DEFAULT PREVIEW)
          ==================================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 overflow-hidden print:shadow-none print:border-none">
        {/* Printable Header (visible on paper) */}
        <div className="hidden print:block p-8 border-b border-slate-300">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold font-heading text-slate-950">D-AMINGROW NIGERIA</h1>
              <p className="text-xs text-slate-600">Biosecure Livestock Solutions & Veterinary Supplies</p>
              <p className="text-xs text-slate-600">Ibadan: 12 Oluyole Extension | Lagos: 20 Simarch St, Ojo</p>
              <p className="text-xs text-slate-600">Hotline: +234 813 916 9402 | Web: damingrow.com</p>
            </div>
            <div className="text-right text-xs text-slate-700">
              <p className="font-bold">OFFICIAL FLOCK VACCINATION TIMETABLE</p>
              <p>Flock Type: {flockType.toUpperCase()}S</p>
              <p>Placement Date: {placementDate}</p>
              <p>Farm: {farmName || 'Commercial Farm'} ({state} State)</p>
              <p>Flock Size: {flockSize} Birds</p>
            </div>
          </div>
        </div>

        {/* Timetable Toolbar (screen only) */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-slate-50 to-white print:hidden">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-heading">
                {flockType === 'broiler'
                  ? 'Suggested Broiler Vaccination Schedule'
                  : 'Suggested Layer Vaccination Program (Day 1 – 1st Phase in Laying)'}
              </h3>
              {leadSaved && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Unlocked & Saved
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Showing exact calendar dates calculated from placement on{' '}
              <strong className="text-slate-800 font-semibold">{placementDate}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Send to WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Timetable Rows */}
        <div className="divide-y divide-slate-100">
          {calendarEntries.map((ev, idx) => (
            <div
              key={ev.id}
              className={`p-6 sm:p-7 transition-colors ${
                idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
              } hover:bg-emerald-50/40`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Day & Name */}
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center justify-center h-14 w-14 shrink-0 rounded-2xl bg-slate-950 text-white font-heading shadow-md">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      {ev.timeLabel.split(' ')[0]}
                    </span>
                    <span className="text-sm font-extrabold leading-none mt-0.5">
                      {ev.timeLabel.split(' ')[1] || ev.dayAge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                        {ev.weekday}, {ev.calendarDate}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                          ev.category === 'vaccine'
                            ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                            : ev.category === 'subcutaneous_injection'
                            ? 'bg-purple-50 text-purple-800 border-purple-200'
                            : ev.category === 'wing_web'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {ev.category.replace(/_/g, ' ')}
                      </span>
                      {ev.requiresColdChain && (
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                          ❄️ 2°C–8°C Cold-Chain
                        </span>
                      )}
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-950 font-heading">
                      {ev.item}
                    </h4>

                    <div className="text-xs text-slate-600">
                      <strong className="text-slate-900 font-semibold">Route:</strong>{' '}
                      {ev.routeOfAdministration} •{' '}
                      <strong className="text-slate-900 font-semibold">Dosage:</strong> {ev.dosage}
                    </div>
                  </div>
                </div>

                {/* Right: Clinical Instructions & Ordering CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:max-w-md">
                  <p className="text-xs text-slate-600 bg-white p-3.5 rounded-2xl border border-slate-200 flex-1 leading-relaxed shadow-2xs">
                    {ev.clinicalInstructions}
                  </p>

                  <div className="shrink-0 print:hidden">
                    {ev.productLink ? (
                      <Link href={ev.productLink}>
                        <button className="whitespace-nowrap inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2.5 rounded-xl transition-all">
                          <span>View Product</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </Link>
                    ) : (
                      <a
                        href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20want%20to%20order%20${encodeURIComponent(
                          ev.item
                        )}%20for%20my%20${flockType}%20flock.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition-all"
                      >
                        Inquire Desk
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Footnote (from Layer document NB) */}
        {flockType === 'layer' && (
          <div className="p-6 bg-slate-900 text-white space-y-2 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Award className="h-4 w-4" />
              Clinical Maintenance Notice for Laying Phase:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>NB:</strong> IB multi can be repeated every <strong>7 weeks</strong> throughout the laying period. ND LaSota can be repeated every <strong>6 weeks</strong> during the laying cycle to maintain humoral antibody titers against velogenic challenge.
            </p>
          </div>
        )}
      </section>

      {/* ====================================================================
          PARTNER HATCHERIES TRUST SECTION
          ==================================================================== */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200/80 p-8 sm:p-10 space-y-6 print:hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="section-label w-fit mb-2">
              <Building2 className="h-3.5 w-3.5" />
              Verified Sourcing Lineage
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-950">
              Hatcheries We Work With
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              D-AminGrow sources day-old chicks directly from Nigeria&apos;s licensed tier-1 parent-stock hatcheries. Every chick arrives pre-vaccinated against Marek&apos;s Disease with verified hatchery health certificates.
            </p>
          </div>

          <Link
            href="/chicks"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>View Day-Old Chick Breeds</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {HATCHERY_PARTNERS.map((hatchery) => (
            <div
              key={hatchery.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  {hatchery.badge}
                </span>
                <h4 className="text-sm font-bold text-slate-900 font-heading mt-2">
                  {hatchery.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  {hatchery.location}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
                {hatchery.specialtyBreeds[0]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          CLIENT FARMS TRUST SECTION
          ==================================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 space-y-6 print:hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="section-label w-fit mb-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              Real Farmer Outcomes
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-950">
              Trusted by Commercial Poultry Operations
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Our vaccination programs and cold-chain biologicals protect thousands of commercial broilers and layers every week across leading Nigerian farms.
            </p>
          </div>

          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>Read All Farmer Reviews</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CLIENT_FARMS.map((farm) => (
            <div
              key={farm.id}
              className="rounded-2xl p-4 bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-xs transition-all"
            >
              <div className="font-bold text-slate-900 text-sm">{farm.name}</div>
              <div className="text-[11px] text-emerald-700 font-medium mt-0.5">{farm.flockType}</div>
              <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-slate-400" />
                {farm.location}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Capacity: {farm.flockCapacity}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          BOTTOM CTA
          ==================================================================== */}
      <section className="rounded-3xl bg-gradient-to-r from-[#050E08] to-emerald-950 p-8 sm:p-10 border border-emerald-500/20 text-white flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold font-heading">
            Need Cold-Chain Vaccines Pre-Packaged for Your Placement Date?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Order your complete vaccine and anti-stress kit in advance. Packed in pre-chilled styrofoam ice boxes with temperature-logging verification and same-day dispatch.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 shrink-0">
          <a
            href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20want%20to%20pre-order%20the%20complete%20cold-chain%20vaccine%20kit%20for%20my%20${flockType}%20flock%20arriving%20on%20${placementDate}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Pre-Order Vaccine Kit</span>
          </a>
          <Link
            href="/vaccines"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white text-sm font-medium px-6 py-3.5 rounded-2xl transition-all"
          >
            Browse Individual Vaccines
          </Link>
        </div>
      </section>
    </div>
  );
}
