'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Send,
  ClipboardCheck,
  MessageCircle,
} from 'lucide-react';

interface AuditItem {
  id: string;
  title: string;
  riskIfMissing: string;
  points: number;
}

const AUDIT_QUESTIONS: AuditItem[] = [
  {
    id: 'perimeter_fence',
    title: 'Perimeter fencing with locked security gate excluding unauthorized persons and stray animals',
    riskIfMissing: 'High risk of stray dogs, rodents, and contaminated human traffic introducing pathogens.',
    points: 10,
  },
  {
    id: 'footbath_active',
    title: 'Disinfectant footbath at every pen door replenished every 48 hours',
    riskIfMissing: 'Footwear is the primary mechanical vector for Coccidiosis oocysts and Gumboro virus.',
    points: 10,
  },
  {
    id: 'dedicated_boots',
    title: 'Dedicated rubber boots and protective overalls worn strictly inside the pens',
    riskIfMissing: 'External farm dust and market clothes carry live viruses into flock rearing zones.',
    points: 10,
  },
  {
    id: 'water_sanitization',
    title: 'Water chlorination or chlorine dioxide sanitization protocol for drinking lines',
    riskIfMissing: 'Untreated borehole/well water harbors E. coli, Salmonella, and Pseudomonas biofilms.',
    points: 10,
  },
  {
    id: 'wild_bird_mesh',
    title: 'Intact galvanized wire netting on all windows completely excluding wild birds and bats',
    riskIfMissing: 'Wild doves and sparrows are primary wild carriers of Avian Influenza and Newcastle Disease.',
    points: 10,
  },
  {
    id: 'all_in_all_out',
    title: 'Single-age flock management (all-in / all-out) without mixing older birds with young chicks',
    riskIfMissing: 'Older birds shed carrier viruses that cause severe acute mortality in unvaccinated young stock.',
    points: 15,
  },
  {
    id: 'cold_chain_vaccines',
    title: 'Vaccines transported in dedicated insulated cold box with ice packs and stored at 2°C–8°C',
    riskIfMissing: 'Thermal breaks destroy live viral titers, leading to total vaccine failure in the field.',
    points: 15,
  },
  {
    id: 'mortality_disposal_pit',
    title: 'Deep mortality disposal pit or covered burial pit with lime (dead birds never left exposed)',
    riskIfMissing: 'Exposed carcasses attract flies, buzzards, and rodents that spread disease across pens.',
    points: 10,
  },
  {
    id: 'vehicle_disinfection',
    title: 'Feed delivery trucks and buyer crates disinfected before driving near poultry pens',
    riskIfMissing: 'Live-bird market collection crates are the #1 source of Newcastle disease outbreaks.',
    points: 5,
  },
  {
    id: 'down_time_cleaning',
    title: 'Minimum 14-day sanitary downtime between batches with litter removal, power wash, and disinfection',
    riskIfMissing: 'Carried-over litter perpetuates resistant bacterial pathogens and coccidia oocysts.',
    points: 5,
  },
];

export default function BiosecurityAuditConsultationPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([
    'perimeter_fence',
    'footbath_active',
    'cold_chain_vaccines',
  ]);

  // Form state
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [farmLocation, setFarmLocation] = useState('Oyo State');
  const [birdCount, setBirdCount] = useState<number>(3000);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Score calculation
  const auditScore = useMemo(() => {
    let score = 0;
    checkedItems.forEach((id) => {
      const match = AUDIT_QUESTIONS.find((q) => q.id === id);
      if (match) score += match.points;
    });

    let grade = 'HIGH RISK';
    let gradeBadge = 'bg-red-100 text-red-800 border-red-300';
    let assessment = 'Critical biosecurity gaps detected. Flock is vulnerable to severe viral challenge.';

    if (score >= 80) {
      grade = 'INSTITUTIONAL BIOSECURITY';
      gradeBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
      assessment = 'Excellent biosecurity discipline. Low pathogen ingress risk.';
    } else if (score >= 50) {
      grade = 'MODERATE RISK';
      gradeBadge = 'bg-amber-100 text-amber-800 border-amber-300';
      assessment = 'Fair baseline, but important vectors remain unaddressed.';
    }

    return {
      score,
      grade,
      gradeBadge,
      assessment,
    };
  }, [checkedItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName || !farmerPhone) return;

    setSubmitting(true);
    try {
      const payload = {
        enquiryType: 'biosecurity_audit',
        customerName: farmerName,
        customerPhone: farmerPhone,
        farmName: 'Biosecurity Protocol Audit',
        deliveryState: farmLocation,
        deliveryCity: 'Poultry Farm Site',
        items: [
          {
            name: `Farm Biosecurity Audit (${auditScore.score}% - ${auditScore.grade})`,
            quantity: birdCount,
            unitPriceNgn: 0,
          },
        ],
        userNotes: `Biosecurity Index: ${auditScore.score}% (${auditScore.grade}). Flock size: ${birdCount} birds. Passed items: ${checkedItems.join(', ')}. Assessment: ${auditScore.assessment}`,
        consentGiven: true,
      };

      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
    } catch {
      setSubmitted(true);
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
            <span className="font-semibold text-slate-900">Biosecurity Audit</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white py-14 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              <span>Veterinary Biosecurity &amp; Outbreak Prevention Protocol</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Poultry Farm Biosecurity Audit &amp; Disease Defence
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              85% of catastrophic poultry losses (Newcastle, Gumboro, Avian Influenza) stem from preventable biosecurity
              failures. Audit your farm defences and get a certified veterinary biosecurity protocol.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Audit Grid */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: 10-Point Checklist */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-emerald-600" />
                  10-Point Farm Defence Assessment
                </h2>
                <span className="text-xs font-bold text-slate-500">
                  {checkedItems.length} of 10 enforced
                </span>
              </div>

              <div className="space-y-3">
                {AUDIT_QUESTIONS.map((q) => {
                  const isChecked = checkedItems.includes(q.id);
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => toggleCheck(q.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-4 ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50/50'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-900 block">{q.title}</span>
                        {!isChecked && (
                          <span className="text-[11px] text-red-600 block flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 shrink-0" />
                            {q.riskIfMissing}
                          </span>
                        )}
                      </div>
                      <div
                        className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="h-4 w-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Biosecurity Index Score & Lead Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg sticky top-24 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Biosecurity Rating
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${auditScore.gradeBadge}`}>
                  {auditScore.grade}
                </span>
              </div>

              {/* Score Display */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-1">
                <span className="text-3xl font-extrabold text-slate-900 font-heading block">
                  {auditScore.score}%
                </span>
                <span className="text-xs text-slate-600 block">{auditScore.assessment}</span>
              </div>

              {/* Form Submission */}
              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-950">Audit Submitted</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Our veterinary biosecurity specialist will prepare your custom sanitization and barrier protocol.
                  </p>
                  <a
                    href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20just%20completed%20the%20farm%20biosecurity%20audit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Discuss on WhatsApp</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Request On-Site Veterinary Biosecurity Audit
                  </span>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Austin Loveday"
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
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
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Farm State
                      </label>
                      <input
                        type="text"
                        value={farmLocation}
                        onChange={(e) => setFarmLocation(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Flock Count
                      </label>
                      <input
                        type="number"
                        value={birdCount}
                        onChange={(e) => setBirdCount(Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{submitting ? 'Submitting...' : 'Submit Biosecurity Audit for VCN Review'}</span>
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
