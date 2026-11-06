'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Ruler,
  Compass,
  MessageCircle,
  AlertCircle,
  Send,
} from 'lucide-react';

export default function FarmSetupConsultationPage() {
  // Calculator state
  const [birdType, setBirdType] = useState<'broiler' | 'layer' | 'turkey'>('broiler');
  const [capacity, setCapacity] = useState<number>(2500);
  const [housingSystem, setHousingSystem] = useState<'deep_litter' | 'battery_cage' | 'tunnel_vent'>('deep_litter');

  // Lead form state
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [farmName, setFarmName] = useState('');
  const [stateLocation, setStateLocation] = useState('Oyo');
  const [cityLocation, setCityLocation] = useState('Ibadan');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Blueprint calculations
  const blueprint = useMemo(() => {
    let sqMetersPerBird = 0.1; // Default broiler deep litter 10 birds/sqm
    if (birdType === 'broiler') {
      sqMetersPerBird = housingSystem === 'tunnel_vent' ? 0.07 : 0.1;
    } else if (birdType === 'layer') {
      sqMetersPerBird = housingSystem === 'battery_cage' ? 0.045 : 0.15;
    } else if (birdType === 'turkey') {
      sqMetersPerBird = 0.25; // 4 turkeys/sqm
    }

    const totalFloorAreaSqM = Math.round(capacity * sqMetersPerBird);
    const standardPenWidthM = 10; // Standard 30ft / 10m width for natural tropical cross-ventilation
    const calculatedLengthM = Math.ceil(totalFloorAreaSqM / standardPenWidthM);

    // Feeders and Drinkers (1 bell drinker / tube feeder per 40–50 birds)
    const feedersCount = Math.ceil(capacity / 45);
    const drinkersCount = Math.ceil(capacity / 45);

    // Battery cage units (if layer battery cage selected, ~96 birds per 3-tier cage set)
    const cageUnitsCount = housingSystem === 'battery_cage' ? Math.ceil(capacity / 96) : 0;

    return {
      totalFloorAreaSqM,
      totalFloorAreaSqFt: Math.round(totalFloorAreaSqM * 10.764),
      penDimensions: `${calculatedLengthM}m × ${standardPenWidthM}m (${Math.round(calculatedLengthM * 3.28)}ft × 33ft)`,
      feedersCount,
      drinkersCount,
      cageUnitsCount,
      orientation: 'Strict East-to-West axis (prevents direct morning & evening sun heating)',
      recommendedSideWallHeight: '0.9m (3ft) dwarf wall with galvanized wire mesh to eaves at 3.0m (10ft)',
    };
  }, [birdType, capacity, housingSystem]);

  // Handle consultation submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName || !farmerPhone) {
      setErrorMessage('Please enter your full name and phone number.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        enquiryType: 'farm_setup',
        customerName: farmerName,
        customerPhone: farmerPhone,
        farmName: farmName || 'Commercial Farm Project',
        deliveryState: stateLocation,
        deliveryCity: cityLocation,
        items: [
          {
            name: `Commercial Farm Setup Advisory (${capacity} ${birdType}s - ${housingSystem})`,
            quantity: 1,
            unitPriceNgn: 0,
          },
        ],
        userNotes: `Target: ${capacity} ${birdType}s in ${housingSystem} system. Blueprint area: ${blueprint.totalFloorAreaSqM} sqm. Notes: ${additionalNotes}`,
        consentGiven: true,
      };

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to submit consultation inquiry.');
      }

      setSubmitSuccess(true);
    } catch {
      setErrorMessage('Failed to send consultation inquiry. Please contact our desk directly on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

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
            <Link href="/services/consultation" className="hover:text-emerald-700 transition-colors">
              Consultation Services
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-slate-900">Farm Setup &amp; Pen Architecture</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950 text-white py-14 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300">
              <Building2 className="h-4 w-4" />
              <span>Turnkey Commercial Farm Engineering</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
              Poultry Farm Setup &amp; Pen Architecture Engineering
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Design high-yield, biosecure open-sided deep litter pens and multi-tier battery cage structures optimized
              for Nigerian tropical heat and maximum flock performance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Interactive Blueprint Generator & Intake Form */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Calculator & Blueprint */}
          <div className="lg:col-span-7 space-y-6">
            {/* Control Panel */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
              <h2 className="text-lg font-bold font-heading text-slate-900">
                1. Configure Your Farm Parameters
              </h2>

              {/* Bird Type Switcher */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Target Livestock Species
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'broiler', label: 'Meat Broilers' },
                    { id: 'layer', label: 'Commercial Layers' },
                    { id: 'turkey', label: 'Turkey Poults' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setBirdType(t.id as typeof birdType)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        birdType === t.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flock Capacity Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Target Flock Capacity
                  </label>
                  <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                    {capacity.toLocaleString()} Birds
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="500"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>500 birds</span>
                  <span>5,000 birds</span>
                  <span>10,000 birds</span>
                  <span>20,000 birds</span>
                </div>
              </div>

              {/* Housing System Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Housing System
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'deep_litter', label: 'Open-Sided Deep Litter', hint: 'Natural ventilation' },
                    { id: 'battery_cage', label: 'Battery Cage System', hint: 'High-density egg production' },
                    { id: 'tunnel_vent', label: 'Closed Tunnel Shed', hint: 'Evaporative cooling' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setHousingSystem(s.id as typeof housingSystem)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        housingSystem === s.id
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 block">{s.label}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{s.hint}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generated Engineering Blueprint Summary */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-emerald-600" />
                  Preliminary Engineering Estimates
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Calculated Live
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-500 font-semibold block">Required Floor Area</span>
                  <span className="text-lg font-bold text-slate-900 block">
                    {blueprint.totalFloorAreaSqM} m² ({blueprint.totalFloorAreaSqFt.toLocaleString()} sq ft)
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-500 font-semibold block">Pen Dimensions (L × W)</span>
                  <span className="text-lg font-bold text-slate-900 block">{blueprint.penDimensions}</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-500 font-semibold block">Feeding &amp; Drinking Units</span>
                  <span className="text-sm font-bold text-slate-900 block">
                    {blueprint.feedersCount} tube feeders · {blueprint.drinkersCount} bell drinkers
                  </span>
                </div>

                {blueprint.cageUnitsCount > 0 ? (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-slate-500 font-semibold block">A-Frame Battery Cage Sets</span>
                    <span className="text-sm font-bold text-emerald-800 block">
                      {blueprint.cageUnitsCount} sets (96–120 capacity)
                    </span>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-slate-500 font-semibold block">Wall Architecture</span>
                    <span className="text-xs font-bold text-slate-900 block">
                      3ft dwarf wall + 7ft wire mesh
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Compass className="h-3.5 w-3.5" />
                  Thermal Bioclimatic Orientation:
                </span>
                <p>{blueprint.orientation}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Consultation Intake Form */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg sticky top-24 space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Engineering Advisory Intake
                </span>
                <h3 className="text-xl font-bold font-heading text-slate-900 mt-1">
                  Request Complete Pen Blueprint
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submit your parameters for a detailed material quotation and on-site engineering advisory.
                </p>
              </div>

              {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-950">Inquiry Received</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Our agricultural engineering lead has received your {capacity}-bird {birdType} setup plan. A
                    consultant will contact you within 24 hours.
                  </p>
                  <a
                    href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20just%20submitted%20a%20farm%20setup%20consultation%20plan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Fast-Track on WhatsApp</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engr. Babatunde Adeyemi"
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Farm or Project Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Adeyemi Commercial Farms"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 08139169402"
                      value={farmerPhone}
                      onChange={(e) => setFarmerPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        State Location
                      </label>
                      <input
                        type="text"
                        value={stateLocation}
                        onChange={(e) => setStateLocation(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        City / LGA
                      </label>
                      <input
                        type="text"
                        value={cityLocation}
                        onChange={(e) => setCityLocation(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Land Dimensions / Special Requests
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. 1 plot of dry land in Ido LGA, prefer 3-tier battery cage with deep well water source..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{submitting ? 'Submitting Blueprint...' : 'Submit Blueprint Advisory Request'}</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    Compliant with Nigeria Data Protection Act (NDPA 2023). Zero spam guaranteed.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
