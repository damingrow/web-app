'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Stethoscope,
  ShieldAlert,
  CheckCircle2,
  MessageCircle,
  ChevronRight,
  Package,
  Activity,
  ArrowRight,
} from 'lucide-react';

interface DiseaseProfile {
  name: string;
  scientificName: string;
  severity: 'CRITICAL EMERGENCY' | 'HIGH ALERT' | 'MODERATE CLINICAL';
  severityColor: string;
  description: string;
  postMortemClues: string[];
  immediateSteps: string[];
  recommendedTreatments: { name: string; slug: string; note: string }[];
  keySymptoms: string[];
}

const DISEASE_DATABASE: Record<string, DiseaseProfile> = {
  coccidiosis: {
    name: 'Coccidiosis (Eimeria Outbreak)',
    scientificName: 'Eimeria tenella / E. necatrix / E. acervulina',
    severity: 'HIGH ALERT',
    severityColor: 'bg-rose-500/10 text-rose-800 border-rose-300',
    description: 'Parasitic protozoan infection destroying intestinal and caecal mucosa, most prevalent on warm, wet, compacted deep litter.',
    postMortemClues: [
      'Caeca distended with clotted bloody core (E. tenella)',
      'Mid-gut ballooned with petechial hemorrhages (E. necatrix)',
      'White ladder-like transverse streaks in duodenum (E. acervulina)',
    ],
    immediateSteps: [
      'Immediately remove and replace all damp/caked litter beneath drinkers',
      'Stop multi-vitamin supplements containing high B-vitamins (thiamine feeds coccidia)',
      'Initiate water acidification to pH 4.0–4.5 to inhibit oocyst sporulation',
    ],
    recommendedTreatments: [
      { name: 'Cocci-Ton Oral Solution', slug: 'cocci-ton-oral-solution', note: 'Broad-spectrum toltrazuril anti-coccidial' },
      { name: 'Ascorbic Acid Vitamin C 100g', slug: 'ascorbic-acid-vitamin-c-100g', note: 'Restores vascular integrity and reduces gut shock' },
    ],
    keySymptoms: ['bloody_droppings', 'huddling', 'pale_combs', 'ruffled_feathers', 'appetite_loss'],
  },
  newcastle: {
    name: 'Velogenic Newcastle Disease (ND)',
    scientificName: 'Avian Paramyxovirus Serotype 1 (APMV-1)',
    severity: 'CRITICAL EMERGENCY',
    severityColor: 'bg-rose-600 text-white border-rose-600',
    description: 'Highly contagious, lethal viral disease affecting respiratory, nervous, and digestive systems with rapid mortality up to 90%.',
    postMortemClues: [
      'Pinpoint hemorrhages on the tips of proventricular glands',
      'Button-like necrotic ulcerations on intestinal lymphoid patches',
      'Hemorrhagic tracheitis with excess mucus exudate',
    ],
    immediateSteps: [
      'Isolate pen immediately; do not move staff, crates, or equipment between sheds',
      'Stop all elective stress factors and human foot traffic',
      'Report urgently to state veterinary officer or D-AminGrow technical desk',
    ],
    recommendedTreatments: [
      { name: 'Newcastle LaSota Live Vaccine', slug: 'newcastle-disease-lasota-vaccine', note: 'Emergency ring vaccination in unaffected neighboring pens' },
      { name: 'Cipro-Zen Antibiotic Solution', slug: 'cipo-zen-oral-antibiotic', note: 'Prevents secondary bacterial invasion (E. coli)' },
    ],
    keySymptoms: ['twisted_neck', 'green_diarrhea', 'gasping', 'sudden_mortality', 'facial_swelling', 'egg_drop'],
  },
  gumboro: {
    name: 'Infectious Bursal Disease (IBD / Gumboro)',
    scientificName: 'Avibirnavirus',
    severity: 'CRITICAL EMERGENCY',
    severityColor: 'bg-rose-600 text-white border-rose-600',
    description: 'Immuno-suppressive viral pathogen attacking the Bursa of Fabricius in young birds (3–6 weeks), causing hemorrhagic dehydration.',
    postMortemClues: [
      'Enlarged, edematous Bursa with gelatinous yellowish transudate or dark hemorrhage',
      'Intramuscular hemorrhages on breast and thigh meat',
      'Severe kidney enlargement with white urate deposits',
    ],
    immediateSteps: [
      'Provide continuous high-dose electrolyte water to counteract extreme dehydration',
      'Administer kidney flushers (citric acid or ammonium chloride) to clear urate plugs',
      'Avoid high-protein feeds during the peak 4-day mortality phase to rest kidneys',
    ],
    recommendedTreatments: [
      { name: 'Ascorbic Acid Vitamin C 100g', slug: 'ascorbic-acid-vitamin-c-100g', note: 'Counteracts fever, dehydration, and vascular shock' },
      { name: 'Infectious Bursal Disease (Gumboro) Live Vaccine', slug: 'infectious-bursal-disease-gumboro-vaccine', note: 'For prevention in future placement cycles' },
    ],
    keySymptoms: ['white_diarrhea', 'vent_pecking', 'shivering', 'sudden_mortality', 'huddling', 'appetite_loss'],
  },
  crd: {
    name: 'Chronic Respiratory Disease (CRD / Mycoplasmosis)',
    scientificName: 'Mycoplasma gallisepticum + Secondary E. coli',
    severity: 'HIGH ALERT',
    severityColor: 'bg-amber-500/10 text-amber-800 border-amber-300',
    description: 'Persistent respiratory syndrome causing coughing, nasal discharge, facial swelling, and severe broiler growth stunting.',
    postMortemClues: [
      "Cloudy, thickened air sacs with foamy or yellow 'cheesy' exudate (airsacculitis)",
      'Fibrinous pericarditis (thick white film coating heart)',
      'Perihepatitis (thick white exudate covering liver surface)',
    ],
    immediateSteps: [
      'Improve ventilation immediately; raise curtain drops to exhaust ammonia fumes',
      'Sanitize drinking lines with water disinfectant to block cross-contamination',
      'Check pen litter moisture; dry litter reduces airborne dust and bacteria',
    ],
    recommendedTreatments: [
      { name: 'Norflogen 20% Oral Antibiotic Solution', slug: 'norflogen-20-antibiotic', note: 'Broad-spectrum veterinary fluoroquinolone' },
      { name: 'Oxytet Soluble Antibiotic Powder', slug: 'oxytet-soluble-antibiotic-powder', note: 'Effective systemic bacteriostatic antibiotic' },
    ],
    keySymptoms: ['snicking', 'nasal_discharge', 'facial_swelling', 'rattling', 'stunted_growth', 'appetite_loss'],
  },
  eds: {
    name: 'Egg Drop Syndrome (EDS-76) / Calcium Depletion',
    scientificName: 'Avian Adenovirus Type 1',
    severity: 'MODERATE CLINICAL',
    severityColor: 'bg-amber-500/10 text-amber-800 border-amber-300',
    description: 'Acute reproductive infection causing normal-appearing birds to suddenly lay thin-shelled, soft-shelled, or completely shell-less eggs.',
    postMortemClues: [
      'Ovary and oviduct frequently show minimal macroscopic lesions',
      'Oviduct mucosal inflammation with inactive shell gland (histopathology)',
      'Birds remain clinically alert and eating despite 20–40% loss of eggs',
    ],
    immediateSteps: [
      'Collect and segregate soft-shelled eggs to prevent egg-eating habits in pen',
      'Supplement coarse oyster shell grit (2–4mm particle size) at 4:00 PM daily',
      'Verify flock water intake and water pH to assist intestinal calcium absorption',
    ],
    recommendedTreatments: [
      { name: 'Combined ND + IB + EDS Inactivated (Killed) Vaccine', slug: 'nd-ib-eds-inactivated-killed-triple-vaccine', note: 'Killed emulsion for future layer batches' },
      { name: 'Ascorbic Acid Vitamin C 100g', slug: 'ascorbic-acid-vitamin-c-100g', note: 'Reduces heat stress interference with calcium absorption' },
    ],
    keySymptoms: ['soft_eggs', 'egg_drop', 'chalky_eggs', 'pale_yolks'],
  },
  heat_stress: {
    name: 'Acute Tropical Heat Stress & Dehydration',
    scientificName: 'Environmental Hyperthermia & Respiratory Alkalosis',
    severity: 'HIGH ALERT',
    severityColor: 'bg-amber-500/10 text-amber-800 border-amber-300',
    description: 'Triggered when pen ambient temperature exceeds 32°C with high relative humidity, causing open-beak panting and blood pH elevation.',
    postMortemClues: [
      'Dark, dehydrated pectoral muscle tissue',
      'Engorged subcutaneous blood vessels',
      'Full crop with sour, warm, fermenting liquid',
    ],
    immediateSteps: [
      'Direct cool water misting on pen roofing sheets during 12:00 PM – 3:00 PM peak',
      'Flush drinking lines every 2 hours to prevent birds drinking hot standing water',
      'Withhold heavy feed during the hottest 4 hours of the day (11:00 AM – 3:00 PM)',
    ],
    recommendedTreatments: [
      { name: 'Ascorbic Acid Vitamin C 100g', slug: 'ascorbic-acid-vitamin-c-100g', note: 'Clinically proven to reduce corticosteroid stress hormones' },
    ],
    keySymptoms: ['panting', 'wings_spread', 'lethargy', 'watery_droppings', 'sudden_mortality'],
  },
};

const SYMPTOM_OPTIONS = [
  { id: 'bloody_droppings', label: 'Bloody or reddish-brown caecal droppings', category: 'Enteric & Digestive' },
  { id: 'green_diarrhea', label: 'Bright green watery diarrhea', category: 'Enteric & Digestive' },
  { id: 'white_diarrhea', label: 'Chalky white, pasting vent diarrhea', category: 'Enteric & Digestive' },
  { id: 'watery_droppings', label: 'Excessively watery, unformed droppings', category: 'Enteric & Digestive' },
  { id: 'snicking', label: 'Snicking, sneezing, or tracheal rattling', category: 'Respiratory' },
  { id: 'gasping', label: 'Gasping with extended neck and open beak', category: 'Respiratory' },
  { id: 'nasal_discharge', label: 'Nasal discharge or conjunctivitis eye foam', category: 'Respiratory' },
  { id: 'facial_swelling', label: 'Swollen face, infraorbital sinus or eyes shut', category: 'Respiratory' },
  { id: 'twisted_neck', label: 'Twisted neck (torticollis) or paralysis', category: 'Neurological & Skeletal' },
  { id: 'shivering', label: 'Tremors, shivering, or huddling under light', category: 'Neurological & Skeletal' },
  { id: 'sudden_mortality', label: 'Sudden spike in daily flock mortality (> 1%)', category: 'General & Mortality' },
  { id: 'appetite_loss', label: 'Severe drop in feed consumption', category: 'General & Mortality' },
  { id: 'panting', label: 'Severe panting with wings drooped open', category: 'General & Mortality' },
  { id: 'soft_eggs', label: 'Soft-shelled, rough, or shell-less eggs', category: 'Egg & Reproductive' },
  { id: 'egg_drop', label: 'Sudden sharp drop in egg collection (> 10%)', category: 'Egg & Reproductive' },
];

export default function SymptomCheckerClient() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['bloody_droppings', 'huddling']);
  const [birdType, setBirdType] = useState<string>('Broilers');
  const [flockAge, setFlockAge] = useState<string>('4–6 Weeks');
  const [flockSize, setFlockSize] = useState<number>(1000);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Rank diseases by number of matching symptoms
  const rankedDiseases = Object.entries(DISEASE_DATABASE)
    .map(([key, disease]) => {
      const matchCount = disease.keySymptoms.filter((s) => selectedSymptoms.includes(s)).length;
      const matchScore = disease.keySymptoms.length > 0 ? (matchCount / disease.keySymptoms.length) * 100 : 0;
      return {
        key,
        disease,
        matchCount,
        matchScore: Math.round(matchScore),
      };
    })
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  const topMatch = rankedDiseases[0];

  const handleSendWhatsAppSOS = (diseaseName: string) => {
    const symptomLabels = selectedSymptoms
      .map((id) => SYMPTOM_OPTIONS.find((s) => s.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const message = encodeURIComponent(
      `🚨 *EMERGENCY CLINICAL VET INQUIRY — D-AMINGROW SYMPTOM CHECKER*\n\n*Farm Profile:*\n- Flock: ${flockSize} ${birdType} (${flockAge})\n- Observed Symptoms: ${symptomLabels}\n- Probable Matched Condition: *${diseaseName}*\n\nWe need urgent technical assistance, autopsy confirmation, and recommended medications for dispatch.`
    );
    window.open(`https://wa.me/2348139169402?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 font-body">
      {/* Hero */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/calculators" className="hover:text-emerald-400">Calculators</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-emerald-400 font-semibold">Symptom Diagnostic Triager</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 section-label-dark">
              <Stethoscope className="h-4 w-4 text-rose-400" />
              <span>Veterinary Clinical Diagnostic Triager</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight leading-tight">
              Poultry Disease Symptom Triager & <br />
              <span className="text-gradient-green">Emergency Farm Biosecurity Protocol</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Identify potential pathogen threats early. Select observed clinical signs to cross-reference with Nigerian field strains (Coccidiosis, Newcastle, Gumboro, CRD, EDS-76) and receive immediate biosecurity instructions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Questionnaire & Diagnostic Result */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Symptom Selection Panel (Left) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-heading">Flock Demographics & Observed Signs</h2>
              <p className="text-xs text-slate-500">Check all symptoms seen in the pen during the past 24–48 hours</p>
            </div>

            {/* Quick Flock Setup */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Bird Type</label>
                <select
                  value={birdType}
                  onChange={(e) => setBirdType(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Broilers</option>
                  <option>Commercial Layers</option>
                  <option>Point-of-Lay Pullets</option>
                  <option>Turkeys</option>
                  <option>Noilers</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Flock Age</label>
                <select
                  value={flockAge}
                  onChange={(e) => setFlockAge(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Day 1–14 (Brooding)</option>
                  <option>3–5 Weeks</option>
                  <option>6–10 Weeks</option>
                  <option>18–35 Weeks (Peak Lay)</option>
                  <option>36+ Weeks</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Flock Size</label>
                <input
                  type="number"
                  value={flockSize}
                  onChange={(e) => setFlockSize(Number(e.target.value))}
                  className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Symptoms Checkboxes */}
            <div className="space-y-4 pt-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Select Observed Symptoms ({selectedSymptoms.length} selected)
              </label>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {SYMPTOM_OPTIONS.map((symptom) => {
                  const isChecked = selectedSymptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      type="button"
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50/70 text-slate-900 shadow-sm'
                          : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100/70'
                      }`}
                    >
                      <div className={`h-5 w-5 rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-semibold block leading-tight">{symptom.label}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 block">{symptom.category}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Diagnostic Result & Protocol (Right) */}
          <div className="lg:col-span-6 space-y-6">

            {topMatch ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
                {/* Header Match */}
                <div className="border-b border-slate-100 pb-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Primary Clinical Suspect ({topMatch.matchScore}% Symptom Alignment)
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${topMatch.disease.severityColor}`}>
                      {topMatch.disease.severity}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    {topMatch.disease.name}
                  </h3>
                  <div className="text-xs text-slate-500 italic mt-0.5 font-mono">
                    {topMatch.disease.scientificName}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {topMatch.disease.description}
                  </p>
                </div>

                {/* Post-Mortem Clues */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-rose-600" />
                    <span>Pathological Lesions to Confirm on Dead Birds</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {topMatch.disease.postMortemClues.map((clue, idx) => (
                      <li key={idx} className="flex items-start gap-2 rounded-xl bg-slate-50 p-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{clue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Emergency Protocol */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 space-y-2 text-xs text-amber-900">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0" />
                    <span>Immediate Emergency Farm Biosecurity Actions:</span>
                  </div>
                  <ul className="space-y-1 list-disc list-inside text-amber-800 pl-1 leading-relaxed">
                    {topMatch.disease.immediateSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Treatments */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Package className="h-4 w-4 text-emerald-600" />
                    <span>Verified Veterinary Countermeasures</span>
                  </h4>
                  <div className="space-y-2">
                    {topMatch.disease.recommendedTreatments.map((t, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500 transition-colors">
                        <div>
                          <div className="text-xs font-bold text-slate-900">{t.name}</div>
                          <div className="text-[11px] text-slate-500">{t.note}</div>
                        </div>
                        <Link
                          href={`/drugs/${t.slug}`}
                          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 shrink-0"
                        >
                          <span>View Product</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Vet SOS Button */}
                <div className="pt-2">
                  <Button
                    onClick={() => handleSendWhatsAppSOS(topMatch.disease.name)}
                    variant="whatsapp"
                    size="lg"
                    className="w-full justify-center shadow-lg"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    <span>Send Emergency Clinical SOS to Vet Desk</span>
                  </Button>
                  <p className="text-center text-[10px] text-slate-400 mt-2">
                    Direct live connection to D-AminGrow veterinarians. Responds within 2 hours.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
                <Stethoscope className="h-10 w-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-700">No Symptoms Selected Yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Please select one or more observed clinical symptoms on the left to begin algorithmic disease matching.
                </p>
              </div>
            )}

            {/* Other Differential Diagnoses */}
            {rankedDiseases.length > 1 && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Other Differential Diagnoses ({rankedDiseases.length - 1} matches)
                </h4>
                <div className="space-y-2">
                  {rankedDiseases.slice(1, 4).map(({ key, disease, matchScore }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{disease.name}</span>
                        <span className="text-[11px] text-slate-500 block">{disease.scientificName}</span>
                      </div>
                      <span className="rounded-lg bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {matchScore}% Alignment
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="rounded-2xl border border-slate-200 bg-slate-100/80 p-4 text-[11px] text-slate-500 leading-relaxed">
              <strong>Clinical Veterinary Disclaimer:</strong> This symptom triager is a clinical decision-support utility and does not replace in-person laboratory necropsy or microbial culture. In acute outbreaks, contact D-AminGrow Technical Services for farm autopsy investigation.
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
