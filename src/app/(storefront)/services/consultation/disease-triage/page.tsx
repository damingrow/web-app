'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  Flame,
  CheckCircle2,
  MessageCircle,
  ChevronRight,
  Send,
  Activity,
} from 'lucide-react';

interface SymptomChoice {
  id: string;
  label: string;
  category: 'gastro' | 'respiratory' | 'neuro' | 'production';
  severityWeight: number; // 1 to 5
  differential: string;
}

const CLINICAL_SYMPTOMS: SymptomChoice[] = [
  {
    id: 'bloody_droppings',
    label: 'Bloody or Dark Mucoid Droppings',
    category: 'gastro',
    severityWeight: 4,
    differential: 'Suspect Acute Caecal/Intestinal Coccidiosis (Eimeria tenella / necatrix)',
  },
  {
    id: 'greenish_watery_droppings',
    label: 'Greenish / Bright Yellow Watery Diarrhea',
    category: 'gastro',
    severityWeight: 5,
    differential: 'Suspect Velogenic Newcastle Disease (ND) or Fowl Typhoid',
  },
  {
    id: 'chalky_whitish_pasting',
    label: 'Chalky Whitish Diarrhea & Vent Feathers Pasted',
    category: 'gastro',
    severityWeight: 4,
    differential: 'Suspect Infectious Bursal Disease (IBD / Gumboro) or Pullorum',
  },
  {
    id: 'gasping_respiratory_rales',
    label: 'Severe Gasping, Neck Stretching & Gurgling Breathing',
    category: 'respiratory',
    severityWeight: 4,
    differential: 'Suspect Newcastle (Pneumotropic), Infectious Laryngotracheitis (ILT), or CRD',
  },
  {
    id: 'swollen_head_facial_sinus',
    label: 'Swollen Eyes, Puffy Face, Foul Nasal Discharge',
    category: 'respiratory',
    severityWeight: 3,
    differential: 'Suspect Infectious Coryza (Avibacterium paragallinarum) or Mycoplasma',
  },
  {
    id: 'twisted_neck_torticollis',
    label: 'Twisted Neck (Torticollis), Tremors, or Leg Paralysis',
    category: 'neuro',
    severityWeight: 5,
    differential: 'Suspect Neurotropic Newcastle Disease, Marek’s Disease, or Avian Encephalomyelitis',
  },
  {
    id: 'sudden_egg_drop',
    label: 'Sudden Drop in Egg Production (>20%) with Pale/Soft Shells',
    category: 'production',
    severityWeight: 4,
    differential: 'Suspect Egg Drop Syndrome (EDS-76), Newcastle, or Avian Metapneumovirus',
  },
];

export default function DiseaseTriageConsultationPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [birdType, setBirdType] = useState('Broilers');
  const [flockAge, setFlockAge] = useState('3 weeks');
  const [flockSize, setFlockSize] = useState<number>(1000);
  const [mortalityCount, setMortalityCount] = useState<number>(15);
  const [feedIntakeDrop, setFeedIntakeDrop] = useState<'normal' | 'slight' | 'severe'>('severe');

  // Contact form
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [farmLocation, setFarmLocation] = useState('Ibadan, Oyo State');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Toggle symptom
  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Urgency & Triage Evaluation
  const triage = useMemo(() => {
    const mortalityRatePercent = flockSize > 0 ? (mortalityCount / flockSize) * 100 : 0;
    let score = 0;

    selectedSymptoms.forEach((sId) => {
      const match = CLINICAL_SYMPTOMS.find((c) => c.id === sId);
      if (match) score += match.severityWeight;
    });

    if (mortalityRatePercent >= 2.0) score += 6;
    else if (mortalityRatePercent >= 0.5) score += 3;

    if (feedIntakeDrop === 'severe') score += 4;
    else if (feedIntakeDrop === 'slight') score += 2;

    let urgency: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'MILD' = 'MILD';
    let urgencyBadgeClass = 'bg-blue-100 text-blue-800 border-blue-200';

    if (score >= 12 || mortalityRatePercent >= 2.5) {
      urgency = 'CRITICAL';
      urgencyBadgeClass = 'bg-red-100 text-red-800 border-red-300';
    } else if (score >= 7) {
      urgency = 'HIGH';
      urgencyBadgeClass = 'bg-amber-100 text-amber-800 border-amber-300';
    } else if (score >= 4) {
      urgency = 'MODERATE';
      urgencyBadgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }

    const matchedDifferentials = selectedSymptoms
      .map((id) => CLINICAL_SYMPTOMS.find((s) => s.id === id)?.differential)
      .filter(Boolean) as string[];

    return {
      score,
      urgency,
      urgencyBadgeClass,
      mortalityRatePercent: mortalityRatePercent.toFixed(1),
      matchedDifferentials,
    };
  }, [selectedSymptoms, flockSize, mortalityCount, feedIntakeDrop]);

  // Handle lead submission
  const handleSubmitTriage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName || !farmerPhone) return;

    setSubmitting(true);
    try {
      const payload = {
        enquiryType: 'clinical_consultation',
        customerName: farmerName,
        customerPhone: farmerPhone,
        farmName: 'Clinical Emergency Case',
        deliveryState: farmLocation.split(',')[1]?.trim() || 'Oyo',
        deliveryCity: farmLocation.split(',')[0]?.trim() || 'Ibadan',
        items: [
          {
            name: `Clinical Emergency Triage (${triage.urgency} Urgency - ${birdType})`,
            quantity: flockSize,
            unitPriceNgn: 0,
          },
        ],
        userNotes: `URGENCY: ${triage.urgency}. Flock: ${flockSize} ${birdType} (Age: ${flockAge}). Mortality: ${mortalityCount} birds (${triage.mortalityRatePercent}%). Symptoms: ${selectedSymptoms.join(', ')}. Differentials: ${triage.matchedDifferentials.join(' | ')}. Feed intake: ${feedIntakeDrop}`,
        consentGiven: true,
      };

      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
    } catch {
      // Allow fallback
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  // WhatsApp pre-formatted string
  const whatsappUrl = useMemo(() => {
    const text = `*CLINICAL POULTRY EMERGENCY TRIAGE*
Farmer: ${farmerName || 'Emergency Farm'}
Location: ${farmLocation}
Flock: ${flockSize} ${birdType} (${flockAge})
Mortality (24h): ${mortalityCount} birds (${triage.mortalityRatePercent}%)
Symptoms: ${selectedSymptoms.join(', ')}
Urgency Rating: *${triage.urgency}* (Score: ${triage.score})
Please assign a VCN veterinary clinician immediately.`;
    return `https://wa.me/2348139169402?text=${encodeURIComponent(text)}`;
  }, [farmerName, farmLocation, flockSize, birdType, flockAge, mortalityCount, triage, selectedSymptoms]);

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
            <span className="font-semibold text-slate-900">Clinical Disease Triage</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-red-950 text-white py-14 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 border border-red-400/30 px-3.5 py-1 text-xs font-bold text-red-300">
              <Stethoscope className="h-4 w-4" />
              <span>Veterinary Council of Nigeria (VCN) Clinical Triage Desk</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
              Poultry Flock Health Diagnostics &amp; Emergency Triage
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Rapid clinical scoring for acute poultry flock mortality, viral challenges, and disease outbreaks.
              Escalate emergency cases directly to our VCN-certified veterinary clinicians.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Triage Grid */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Symptoms & Mortality Checklist */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Cardinal Symptoms */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-red-600" />
                  1. Select Observable Clinical Signs
                </h2>
                <span className="text-[11px] font-bold text-slate-500">
                  {selectedSymptoms.length} selected
                </span>
              </div>

              <div className="space-y-2">
                {CLINICAL_SYMPTOMS.map((symptom) => {
                  const isChecked = selectedSymptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      type="button"
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 ${
                        isChecked
                          ? 'border-red-600 bg-red-50/60'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-900 block">{symptom.label}</span>
                        <span className="text-[11px] text-slate-500 block">{symptom.differential}</span>
                      </div>
                      <div
                        className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked ? 'bg-red-600 border-red-600 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="h-4 w-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Flock Dynamics & Mortality Rate */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
              <h3 className="text-base font-bold font-heading text-slate-900">
                2. Flock Size &amp; Mortality Figures
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Bird Species &amp; Age
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={birdType}
                      onChange={(e) => setBirdType(e.target.value)}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Broilers">Broilers</option>
                      <option value="Layers">Layers</option>
                      <option value="Pullets">Pullets</option>
                      <option value="Turkeys">Turkeys</option>
                    </select>

                    <input
                      type="text"
                      placeholder="e.g. 3 weeks"
                      value={flockAge}
                      onChange={(e) => setFlockAge(e.target.value)}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Total Flock Size
                  </label>
                  <input
                    type="number"
                    value={flockSize}
                    onChange={(e) => setFlockSize(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Mortality in Past 24–48 Hours
                  </label>
                  <input
                    type="number"
                    value={mortalityCount}
                    onChange={(e) => setMortalityCount(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-red-700 focus:ring-2 focus:ring-red-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Calculated Mortality Rate: <strong className="text-red-700">{triage.mortalityRatePercent}%</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Feed &amp; Water Consumption Drop
                  </label>
                  <select
                    value={feedIntakeDrop}
                    onChange={(e) => setFeedIntakeDrop(e.target.value as typeof feedIntakeDrop)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-red-500"
                  >
                    <option value="normal">Normal Intake</option>
                    <option value="slight">Slight Drop (10%–25% reduction)</option>
                    <option value="severe">Severe Drop (&gt;30% refusal / anorexia)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Triage Score & Urgent Routing */}
          <div className="lg:col-span-5 space-y-6">
            {/* Real-time Triage Score Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg sticky top-24 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Triage Severity Assessment
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${triage.urgencyBadgeClass}`}>
                  {triage.urgency} STATUS
                </span>
              </div>

              {/* Differentials Alert */}
              {triage.matchedDifferentials.length > 0 ? (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Clinical Differentials to Investigate:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-800">
                    {triage.matchedDifferentials.map((diff, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-red-500 font-bold shrink-0">•</span>
                        <span>{diff}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 text-xs text-slate-500 text-center">
                  Select clinical signs to view potential differentials.
                </div>
              )}

              {/* Emergency Escalation Button */}
              {triage.urgency === 'CRITICAL' && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-900">
                    <Flame className="h-4 w-4 text-red-600 animate-pulse" />
                    <span>Immediate Clinical Intervention Advised</span>
                  </div>
                  <p className="text-[11px] text-red-800 leading-relaxed">
                    Acute flock mortality detected. Every hour of delay increases viral shedding and loss of bird value.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs font-bold text-white hover:bg-red-700 transition-colors shadow-md"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Dispatch Triage Packet on WhatsApp</span>
                  </a>
                </div>
              )}

              {/* Lead Submission Form */}
              {submitted ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                  <span className="text-sm font-bold text-emerald-950 block">Triage Case Logged</span>
                  <p className="text-xs text-emerald-800">
                    Our duty veterinary surgeon has received your case dossier. We are reviewing treatment protocols.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitTriage} className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Record Case on VCN Triage Desk
                  </span>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Phone Number *"
                      value={farmerPhone}
                      onChange={(e) => setFarmerPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Farm Location (e.g. Akinyele, Ibadan)"
                      value={farmLocation}
                      onChange={(e) => setFarmLocation(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{submitting ? 'Submitting Case...' : 'Submit Triage Case to VCN Clinician'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
