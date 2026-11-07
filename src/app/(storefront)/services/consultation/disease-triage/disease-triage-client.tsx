'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  Flame,
  CheckCircle2,
  MessageCircle,
  Send,
  Activity,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Clock,
  PhoneCall,
  Droplets,
  Layers,
  Pill,
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

const OPERATIONAL_BENCHMARKS = [
  {
    value: '< 2 Hours',
    label: 'Rapid Clinician Intake',
    detail: 'Immediate case dossier assignment to duty veterinary doctor',
  },
  {
    value: '7 Indicators',
    label: 'Cardinal Clinical Matrix',
    detail: 'Gastroenteritis, respiratory, and neurological triage',
  },
  {
    value: 'VCN Certified',
    label: 'Veterinary Pathologists',
    detail: 'Licensed post-mortem necropsy and differential isolation',
  },
  {
    value: '36 States',
    label: 'Diagnostic Support Reach',
    detail: 'Rapid sample couriering and on-farm technician dispatch',
  },
];

const PROBLEM_POINTS = [
  {
    title: 'Blind Broad-Spectrum Antibiotic Overdosing',
    desc: 'When mortality strikes, farmers commonly run to agro-veterinary shops to buy high-potency antibiotics (e.g. Enrofloxacin, Tylosin) without diagnosis. If the underlying condition is viral (Newcastle, Gumboro) or parasitic (Coccidiosis), antibiotics kill beneficial gut flora, cause toxic nephrosis, and birds continue dying at accelerated rates.',
    impact: '₦200,000+ wasted & kidney organ failure in flock',
  },
  {
    title: 'Confusing Newcastle Disease with Bacterial CRD',
    desc: 'Mild respiratory sneezing and gasping are frequently misdiagnosed as routine Chronic Respiratory Disease (CRD). By the time greenish watery diarrhea and twisted necks (torticollis) appear, Velogenic Newcastle virus has already reached 100% pen prevalence, making intervention impossible.',
    impact: 'Total flock mortality in 5 to 7 days',
  },
  {
    title: 'Delaying Post-Mortem Necropsy Until Mortality Surges',
    desc: 'Waiting until daily mortality exceeds 3% to 5% before calling a veterinarian allows the primary infection to cause systemic sepsis. Early necropsy of 2 to 3 freshly dead birds reveals pathognomonic lesions (caecal cores, proventricular hemorrhages, swollen bursa) allowing immediate curative therapy.',
    impact: 'Loss of 40%–80% of entire livestock capital',
  },
];

const DIFFERENTIAL_GUIDE = [
  {
    disease: 'Infectious Bursal Disease (Gumboro / IBD)',
    pathogen: 'Avibirnavirus (Very Virulent IBDV)',
    targetOrgans: 'Bursa of Fabricius, Thigh & Breast Muscles',
    cardinalSigns: 'Severe chalky diarrhea, ruffled feathers, vent pecking, 3–6 week acute peak',
    firstResponse: 'Immune support (Vitamin C, Electrolytes, Liver tonic), stop heavy antibiotics',
    contraindicated: 'Never administer live vaccines during active outbreak; avoid nephrotoxic drugs',
  },
  {
    disease: 'Velogenic Newcastle Disease (ND)',
    pathogen: 'Avian Paramyxovirus Serotype 1',
    targetOrgans: 'Proventriculus, Trachea, Caecal Tonsils, Brain',
    cardinalSigns: 'Bright greenish diarrhea, gasping, facial swelling, torticollis, sudden high death',
    firstResponse: 'Immediate isolation, antiviral herbal immunostimulant, strict biosecurity quarantine',
    contraindicated: 'Do not administer LaSota live vaccine to actively dying birds',
  },
  {
    disease: 'Caecal Coccidiosis',
    pathogen: 'Eimeria tenella (Protozoan parasite)',
    targetOrgans: 'Caeca (Blind gut pouches)',
    cardinalSigns: 'Frank bloody droppings, pale combs, severe huddling, anaemia, acute 4–7 week death',
    firstResponse: 'Toltracox (Toltrazuril 2.5%) or Amprolium 20% in clean drinking water for 48h',
    contraindicated: 'Do not delay treatment; do not give Vitamin B1 during Amprolium administration',
  },
  {
    disease: 'Infectious Coryza',
    pathogen: 'Avibacterium paragallinarum',
    targetOrgans: 'Infraorbital Sinuses, Nasal Cavity, Eyes',
    cardinalSigns: 'Foul-smelling nasal discharge, swollen face ("owl head"), conjunctivitis, drop in lay',
    firstResponse: 'Norfloxacin or Sulfamethoxazole + Trimethoprim in water; isolate swollen birds',
    contraindicated: 'Do not leave wet litter or poorly ventilated curtains closed in pen',
  },
];

const PILLARS = [
  {
    num: '01',
    title: 'Rapid Clinical Sign Scoring & Differential Mapping',
    desc: 'Systematic algorithmic evaluation of droppings color, respiratory rales, neurological posture, and feed drop kinetics to narrow down field differentials within minutes.',
    icon: Activity,
    color: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    bgColor: 'bg-rose-500/10',
  },
  {
    num: '02',
    title: 'Gross Lesion Profiling & Post-Mortem Necropsy',
    desc: 'Structured veterinary necropsy examining the proventriculus, bursa, spleen, liver, air sacs, and intestinal mucosa to establish definitive gross pathological diagnosis.',
    icon: Stethoscope,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
  },
  {
    num: '03',
    title: 'Targeted Antimicrobial Sensitivity & Stewardship',
    desc: 'Prescribing narrow-spectrum, lab-verified therapeutics rather than shotgun broad-spectrum antibiotics, protecting kidney function and avoiding antimicrobial resistance.',
    icon: Pill,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
  },
  {
    num: '04',
    title: 'Electrolyte Rehydration & Strict Pen Quarantine',
    desc: 'Restoring osmotic balance and mitigating fever while establishing disinfectant barriers to contain pathogen shedding from spreading to adjacent farm houses.',
    icon: Droplets,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
  },
];

const FAQS = [
  {
    q: 'What should I do immediately if I notice bloody droppings in my broiler pen?',
    a: 'Bloody droppings are a classic hallmark of acute Caecal Coccidiosis caused by Eimeria tenella. Immediately commence treatment with Toltrazuril (2.5% oral solution at 1ml per liter of drinking water for 2 consecutive days) or Amprolium 20% water-soluble powder. Avoid giving multivitamin preparations containing Vitamin B1 (thiamine) during Amprolium treatment, as thiamine directly antagonizes the action of Amprolium.',
  },
  {
    q: 'Can a live vaccine like LaSota cure an active outbreak of Newcastle Disease?',
    a: 'No. Administering a live viral vaccine (like LaSota or B1) to a flock that is already actively suffering from Newcastle Disease will accelerate mortality. Vaccines stimulate the immune system and cause a mild stress reaction; introducing live virus into an immunocompromised, viremic bird can trigger acute organ failure. Treatment during an outbreak focuses on supportive care, electrolyte hydration, vitamins, and broad-spectrum antibiotics solely to prevent secondary bacterial complications.',
  },
  {
    q: 'How quickly does D-AminGrow triage an urgent farm disease case?',
    a: 'When you submit clinical symptoms and flock mortality parameters through our digital triage form, our duty veterinary clinician reviews the case file within 2 hours. If your farm is located within Lagos, Ogun, Oyo, Osun, or Kwara states, an on-farm diagnostic technician can be dispatched within 24 to 48 hours for physical post-mortem examination.',
  },
  {
    q: 'What causes sudden high mortality in 3 to 5-week-old broilers without prior symptoms?',
    a: 'Sudden, acute mortality in this age bracket is most commonly caused by Very Virulent Infectious Bursal Disease (vvIBD / Gumboro), acute Caecal Coccidiosis, heat prostration (temperatures > 36°C without ventilation), or toxic chemical/feed contamination (such as acute mycotoxicosis from aflatoxin-laden maize). Immediate necropsy is required to inspect the bursa, caeca, and kidneys.',
  },
  {
    q: 'How do I perform a field post-mortem necropsy safely?',
    a: 'Necropsy should only be conducted using personal protective equipment (rubber boots, disposable gloves, face mask). Select 2 to 3 freshly dead or moribund birds. Disinfect the carcass exterior, soak feathers with disinfectant solution to avoid airborne feather dust, make a midline incision, and systematically inspect the trachea, air sacs, heart, liver, proventriculus, intestines, caecal pouches, and bursa of Fabricius. Always bury carcasses in a deep lime-lined pit afterwards.',
  },
  {
    q: 'What is the difference between Newcastle Disease and Infectious Coryza?',
    a: 'While both produce respiratory signs, Infectious Coryza is a bacterial disease (Avibacterium paragallinarum) characterized by distinctive foul-smelling nasal discharge, severe facial swelling, and eye conjunctivitis with low mortality but severe feed drop. Newcastle Disease is a virulent viral infection causing high mortality, bright greenish diarrhea, and characteristic neurological signs (twisted neck, leg paralysis).',
  },
];

export function DiseaseTriageClient() {
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
    return `https://wa.me/2348068700074?text=${encodeURIComponent(text)}`;
  }, [farmerName, farmLocation, flockSize, birdType, flockAge, mortalityCount, triage, selectedSymptoms]);

  return (
    <div className="font-body bg-slate-50 min-h-screen">
      {/* ====================================================================
          CINEMATIC DARK HERO (7/5 GRID)
          ==================================================================== */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-emerald-400 transition-colors">Services</Link>
            <span>/</span>
            <Link href="/services/consultation" className="hover:text-emerald-400 transition-colors">Consultation</Link>
            <span>/</span>
            <span className="text-red-400 font-semibold">Clinical Disease Triage</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label-dark">
                <Stethoscope className="h-3.5 w-3.5 text-red-400" />
                VCN Clinical Emergency Triage Desk
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading tracking-tight leading-tight">
                Poultry Disease Diagnosis &amp; Treatment: <br />
                <span className="bg-gradient-to-r from-red-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
                  Emergency Flock Health Triage
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Facing unexplained flock mortality, bloody droppings, severe gasping, or sudden egg drops? Avoid blind antibiotic dosing that accelerates death. Get real-time clinical differential scoring and direct VCN veterinary escalation.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Escalate to Duty Clinician on WhatsApp</span>
                </a>
                <a
                  href="#interactive-triage"
                  className="inline-flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-4 rounded-xl transition-all text-sm"
                >
                  <span>Score Flock Symptoms</span>
                  <ArrowRight className="h-4 w-4 text-red-400" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Under 2-Hour Clinician Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>VCN-Registered Veterinary Doctors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Targeted Therapy, Zero Shotgun Antibiotics</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Live Urgency Preview Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-red-500/30 bg-slate-900/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Live Case Triage Status
                  </span>
                  <span className={`px-3 py-0.5 rounded-full text-[11px] font-extrabold border ${triage.urgencyBadgeClass}`}>
                    {triage.urgency} STATUS
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center space-y-2">
                  <div className="text-3xl font-extrabold text-white font-heading">
                    {triage.mortalityRatePercent}% Mortality
                  </div>
                  <div className="text-xs text-slate-300">
                    {mortalityCount} deaths recorded in {flockSize.toLocaleString()} {birdType}
                  </div>
                  <div className="text-[11px] text-amber-400 font-medium">
                    {selectedSymptoms.length} Cardinal Clinical Symptoms Selected
                  </div>
                </div>

                {triage.matchedDifferentials.length > 0 ? (
                  <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/50 space-y-1.5 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Differential Leads Identified:
                    </span>
                    <ul className="space-y-1 text-slate-200">
                      {triage.matchedDifferentials.slice(0, 2).map((d, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-[11px] truncate">
                          <span className="text-red-400 font-bold">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-800/40 rounded-xl text-center text-xs text-slate-400">
                    Configure clinical symptoms below for immediate differential mapping.
                  </div>
                )}

                <div className="pt-2">
                  <a
                    href="#interactive-triage"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-3 text-xs font-bold text-white hover:from-red-500 hover:to-rose-500 transition-all shadow-md"
                  >
                    <span>Complete Emergency Triage Assessment</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          OPERATIONAL BENCHMARKS BAR
          ==================================================================== */}
      <section className="bg-white border-y border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {OPERATIONAL_BENCHMARKS.map((b, i) => (
              <div key={i} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  {b.value}
                </div>
                <div className="text-xs font-bold text-red-700 uppercase tracking-wider">
                  {b.label}
                </div>
                <div className="text-xs text-slate-500 leading-snug">{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PROBLEM SECTION: SYSTEMIC POULTRY HEALTH MISTAKES IN NIGERIA
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            Fatal Mismanagement Traps
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Why Self-Medicating Chickens Causes 70% of Catastrophic Flock Losses
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Pouring high-dose antibiotics into drinking water without a verified diagnosis is like throwing water on an electrical fire. Here is why self-prescription fails in the field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROBLEM_POINTS.map((p, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-red-100 bg-red-50/30 p-7 space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-red-100 text-xs font-bold text-red-700">
                Flock Impact: {p.impact}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          INFORMATION GAIN MATRIX: DIFFERENTIAL DIAGNOSIS GUIDE
          ==================================================================== */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <Layers className="h-3.5 w-3.5 text-red-600" />
              Veterinary Differential Diagnostic Guide
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Emergency Differential Diagnosis &amp; Clinical Action Guide
            </h2>
            <p className="text-sm text-slate-600">
              Field diagnostic markers, target necropsy organs, immediate emergency supportive therapy, and absolute contraindications for the most prevalent avian diseases in Nigeria.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-heading">
                  <th className="p-4 sm:p-5 font-bold">Suspected Disease</th>
                  <th className="p-4 sm:p-5 font-bold">Primary Pathogen</th>
                  <th className="p-4 sm:p-5 font-bold">Target Organs &amp; Lesions</th>
                  <th className="p-4 sm:p-5 font-bold">Distinguishing Signs</th>
                  <th className="p-4 sm:p-5 font-bold">Emergency First Response</th>
                  <th className="p-4 sm:p-5 font-bold text-red-300">What NEVER to Do</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {DIFFERENTIAL_GUIDE.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{row.disease}</td>
                    <td className="p-4 sm:p-5 font-mono text-slate-600">{row.pathogen}</td>
                    <td className="p-4 sm:p-5">{row.targetOrgans}</td>
                    <td className="p-4 sm:p-5 font-medium text-slate-900">{row.cardinalSigns}</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-700">{row.firstResponse}</td>
                    <td className="p-4 sm:p-5 font-medium text-red-700 bg-red-50/30">{row.contraindicated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4-PILLAR FRAMEWORK OF OPERATIONAL EXCELLENCE
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <Sparkles className="h-3.5 w-3.5" />
            Clinical Triage Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            The D-AminGrow 4-Pillar Clinical Intervention Protocol
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our evidence-based veterinary methodology halts active mortality, identifies root causes, and restores flock productivity without creating toxic antibiotic residues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pil) => {
            const Icon = pil.icon;
            return (
              <div
                key={pil.num}
                className="rounded-3xl border border-slate-200 bg-white p-7 space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-heading text-slate-300">{pil.num}</span>
                    <div className={`h-10 w-10 rounded-2xl ${pil.bgColor} ${pil.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 leading-snug">
                    {pil.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          PRESERVED INTERACTIVE CLINICAL TRIAGE TOOL & INTAKE FORM
          ==================================================================== */}
      <section id="interactive-triage" className="py-16 bg-white border-y border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <Activity className="h-3.5 w-3.5 text-red-600" />
              Interactive Emergency Triage Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Select Observed Clinical Signs &amp; Log Emergency Case
            </h2>
            <p className="text-sm text-slate-600">
              Select all observable symptoms, enter current 24-hour mortality counts, and generate an immediate triage severity score with potential clinical differentials.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Symptoms & Mortality Checklist */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Cardinal Symptoms */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-red-600" />
                    1. Select Observable Clinical Signs
                  </h3>
                  <span className="text-[11px] font-bold text-slate-600 bg-white px-2.5 py-0.5 rounded border border-slate-200">
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
                            ? 'border-red-600 bg-white shadow-sm ring-1 ring-red-600'
                            : 'border-slate-200 bg-white hover:bg-slate-100'
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
                  2. Flock Dynamics &amp; Mortality Figures
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
        </div>
      </section>

      {/* ====================================================================
          HONESTY FILTER: WE MAY NOT BE RIGHT FOR YOU IF...
          ==================================================================== */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-3">
            <div className="section-label">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Honest Fit Assessment
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
              Our Clinical Diagnostics May <span className="text-rose-600">Not</span> Be Right For You If...
            </h2>
            <p className="text-sm text-slate-600">
              We practice evidence-based veterinary clinical medicine. We do not provide quick-fix guesses without clinical data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Insist on Instant Telephone Antibiotic Prescriptions
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Veterinary medical ethics prohibit prescribing heavy antimicrobials without seeing symptom history, flock age, or necropsy photographs. We refuse to gamble with your livestock capital.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Refuse to Isolate or Quarantine Sick Pens
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If farm workers continue moving freely between infected pens and unexposed young flocks, medications cannot halt transmission. Strict barrier quarantine is mandatory for clinical success.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Ignore Safe Withdrawal Periods Before Slaughter
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We strictly uphold human food safety. We will not support emergency medication protocols if you plan to slaughter and sell birds to human consumers before chemical withdrawal periods elapse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FAQ SECTION (6 QUESTIONS)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="section-label">
              <HelpCircle className="h-3.5 w-3.5 text-red-600" />
              Clinical FAQs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions About Poultry Disease Diagnosis &amp; Treatment
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2">
                <h3 className="text-sm sm:text-base font-bold font-heading text-slate-900">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          HIGH-CONVERTING CLOSING CTA BANNER
          ==================================================================== */}
      <section className="py-20 bg-gradient-to-br from-[#050E08] via-slate-950 to-red-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 border border-red-500/30 px-3.5 py-1 text-xs font-bold text-red-300">
            <Clock className="h-3.5 w-3.5 text-red-400" />
            <span>Emergency Diagnostic Triage Across Nigeria</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Stop Unnecessary Poultry Mortality Today
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect immediately with registered Nigerian veterinary doctors. Obtain exact disease identification, targeted treatment protocols, and prevent flock liquidation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%20Clinical%20Desk%2C%20I%20have%20an%20urgent%20flock%20disease%20outbreak%20that%20needs%20veterinary%20triage."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-xl inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Connect with Clinician on WhatsApp (+234 806 870 0074)</span>
            </a>
            <a
              href="tel:+2348068700074"
              className="border border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-xl transition-all text-base inline-flex items-center justify-center gap-2 bg-white/5"
            >
              <PhoneCall className="h-5 w-5 text-red-400" />
              <span>Call Emergency Veterinary Line</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
