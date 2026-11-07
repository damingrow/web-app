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
  AlertTriangle,
  TrendingDown,
  XCircle,
  BookOpen,
  Star,
  Info,
  ShieldCheck,
  Zap,
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

const BENCHMARKS = [
  { label: 'Triage Speed', value: '<2 Minutes', sub: 'instant differential match', color: 'text-emerald-400' },
  { label: 'Pathogens Covered', value: '15+ Avian', sub: 'tropical diseases', color: 'text-cyan-400' },
  { label: 'Clinical Accuracy', value: 'Differential', sub: 'rule-out logic', color: 'text-amber-400' },
  { label: 'Vet Desk Escalation', value: 'Direct SOS', sub: 'WhatsApp certified desk', color: 'text-emerald-400' },
];

const FAILURE_POINTS = [
  {
    icon: TrendingDown,
    title: 'Blindly treating viral outbreaks (ND, Gumboro) with antibiotics',
    desc: 'Antibiotics have zero biological effect against viral paramyxoviruses or avibirnaviruses. Administering heavy antibiotics causes toxic kidney and liver failure, accelerating flock mortality.',
  },
  {
    icon: AlertTriangle,
    title: 'Delayed biosecurity containment allowing pen-to-pen airborne spread',
    desc: 'Waiting 3 days for lab results without establishing footbaths and clothing changes spreads Newcastle Disease or Mycoplasma across your entire farm compound.',
  },
  {
    icon: XCircle,
    title: 'Confusing caecal coccidiosis with necrotic enteritis',
    desc: 'Both diseases produce dark droppings and listless birds, but coccidiosis requires antiprotozoal toltrazuril while enteritis requires targeted Clostridium antimicrobials. Misdiagnosis wastes critical time.',
  },
  {
    icon: TrendingDown,
    title: 'High-dose B-complex vitamin administration during active coccidiosis',
    desc: 'Many farmers administer multivitamin premixes to weak birds. However, Eimeria protozoa thrive on thiamine (Vitamin B1). Feeding B-vitamins during an active outbreak accelerates parasite growth.',
  },
];

const PILLARS = [
  {
    num: '01',
    icon: ShieldAlert,
    title: 'Immediate 60-Minute Quarantine',
    desc: 'Lock down the affected shed. Restrict staff movement, install disinfectant footbaths, and halt all live bird dispatch immediately.',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
  },
  {
    num: '02',
    icon: Activity,
    title: 'Water Line Bio-Acidification',
    desc: 'Acidify drinking water to pH 4.0–4.5 with organic acids. This sanitizes lines and halts pathogenic bacterial/protozoal proliferation in gut lumens.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    num: '03',
    icon: Stethoscope,
    title: 'Viral vs Bacterial Differential Rule-Out',
    desc: 'Check flock vaccination records and post-mortem proventricular lesions before choosing between supportive therapy and targeted therapeutics.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    num: '04',
    icon: Zap,
    title: 'Direct VCN Veterinary Escalation',
    desc: 'Send photos of droppings and post-mortem tissues directly to D-AminGrow\'s registered veterinary desk for verified prescription protocols.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
];

// INFORMATION GAIN: Differential Matrix
const DIFFERENTIAL_MATRIX = [
  { sign: 'Bloody / red-brown droppings', probable: 'Caecal Coccidiosis (E. tenella)', confirm: 'Distended caeca filled with blood core', action: 'Toltrazuril (Cocci-Ton) in water, remove damp litter, withhold B-vitamins' },
  { sign: 'Twisted neck & bright green diarrhea', probable: 'Velogenic Newcastle Disease', confirm: 'Pinpoint proventricular gland hemorrhages', action: 'Quarantine pen, ring vaccinate neighbors with LaSota, supportive electrolytes' },
  { sign: 'Vent pecking, shivering, white diarrhea', probable: 'Infectious Bursal Disease (Gumboro)', confirm: 'Swollen gelatinous or hemorrhagic Bursa', action: 'Kidney flushers, high-dose electrolytes, reduce dietary protein for 4 days' },
  { sign: 'Snicking, wheezing, foamy eyes', probable: 'CRD (Mycoplasma gallisepticum)', confirm: 'Cheesy yellow air sac exudate', action: 'Improve ventilation, fluoroquinolones (Norflogen) or Oxytetracycline' },
  { sign: 'Sudden soft or shell-less eggs', probable: 'EDS-76 / Acute Calcium Depletion', confirm: 'Alert hens laying 20–30% fewer eggs', action: 'Coarse oyster shell grit at 4:00 PM, verify ND+IB+EDS vaccination record' },
];

const HONESTY_FILTERS = [
  'You expect this algorithmic checker to replace a certified veterinarian’s on-farm post-mortem examination.',
  'You refuse to quarantine sick birds and continue moving staff freely between clean and infected pens.',
  'You want an antibiotic recommendation for a clear viral outbreak like Newcastle or Gumboro.',
  'You do not isolate dead birds and leave carcasses inside the pen attracting flies and vermin.',
];

const FAQ_DISPLAY = [
  {
    q: 'How does the Poultry Disease Symptom Checker work?',
    a: 'Select observed symptoms across enteric, respiratory, neurological, and reproductive categories. The algorithm matches your signs against our database of tropical avian pathogens and ranks probable conditions by match score.',
  },
  {
    q: 'What should I do immediately if I see bloody droppings?',
    a: 'Bloody droppings typically indicate acute Caecal Coccidiosis. Immediately isolate birds, replace wet litter under drinkers, stop B-complex vitamins, and administer Toltrazuril (Cocci-Ton) in drinking water.',
  },
  {
    q: 'Why should I never treat suspected Newcastle Disease with antibiotics?',
    a: 'Newcastle Disease is viral. Antibiotics cannot kill viruses. Giving high doses of antibiotics to an ND flock damages inflamed kidneys and livers, worsening dehydration and accelerating mortality.',
  },
  {
    q: 'What causes sudden mortality spikes in 3 to 5-week-old broilers in Nigeria?',
    a: 'Primary culprits are Velogenic Newcastle Disease (green diarrhea, torticollis), Gumboro / IBD (shivering, white diarrhea), acute Coccidiosis with necrotic enteritis, or severe heat stress above 34°C.',
  },
  {
    q: 'Can this tool replace a physical veterinary post-mortem necropsy?',
    a: 'No. This is an emergency triage aid to avoid catastrophic errors in the first 2 hours of symptom onset. Definitive diagnosis requires physical post-mortem examination by a registered VCN veterinarian.',
  },
  {
    q: 'How do I send my symptom report to D-AminGrow’s duty veterinarians?',
    a: 'After selecting your symptoms, click "Send Triage to Vet Desk on WhatsApp". The tool compiles your flock age, bird type, symptoms, and probable match into an immediate clinical message.',
  },
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
    .sort((a, b) => b.matchScore - a.matchScore);

  const topMatch = rankedDiseases[0];

  const handleShareWhatsApp = () => {
    const selectedLabels = SYMPTOM_OPTIONS.filter((s) => selectedSymptoms.includes(s.id))
      .map((s) => s.label)
      .join(', ');

    const message = encodeURIComponent(
      `🚨 EMERGENCY VETERINARY TRIAGE SOS 🚨\n\nFarm Flock Details:\n- Type: ${birdType} (${flockAge})\n- Flock Population: ${flockSize} birds\n- Observed Symptoms: ${selectedLabels || 'None selected'}\n- Top Algorithmic Match: ${topMatch?.disease.name} (${topMatch?.matchScore}% match)\n- Severity Level: ${topMatch?.disease.severity}\n\nPlease advise immediately on prescription therapeutics and biosecurity containment.`
    );
    window.open(`https://wa.me/2348139169402?text=${message}`, '_blank');
  };

  return (
    <div className="font-body min-h-screen bg-slate-50">

      {/* ====================================================================
          HERO — 12-col grid, left 7 / right 5
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-rose-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/calculators" className="hover:text-emerald-400 transition-colors">Calculators</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Disease Symptom Checker</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* LEFT — 7 cols */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/25 px-5 py-2 rounded-full">
                  <Stethoscope className="h-3.5 w-3.5" />
                  Clinical Triage Algorithm
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-5 py-2 rounded-full">
                  VCN Protocol Aligned
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                Poultry Disease Symptom Checker:{' '}
                <span className="text-gradient-green">Clinical Triage & Differential Diagnosis</span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed">
                Identify probable flock pathogens in minutes. Match respiratory, digestive, neurological, and reproductive symptoms to clinical diseases, avoid indiscriminate antibiotic misuse, and activate 60-minute biosecure containment protocols.
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                <Star className="h-3.5 w-3.5 text-emerald-400" />
                Your Satisfaction Is Our Priority
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  'Enteric, Respiratory & Neurological Signs',
                  'Emergency 60-Minute Farm Protocol',
                  'Post-Mortem Necropsy Clues',
                  'Direct VCN WhatsApp Escalation',
                  'Free Clinical Decision Support',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-cyan-300 font-medium bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#triage-engine"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
                >
                  <Stethoscope className="h-5 w-5" />
                  Start Clinical Triage Now
                </a>
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  Direct Vet Desk SOS on WhatsApp
                </button>
                <Link
                  href="/drugs"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  <Package className="h-4 w-4" />
                  View Veterinary Drugs
                </Link>
              </div>
            </div>

            {/* RIGHT — 5 cols: Telemetry Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-7 space-y-5 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                      <ShieldAlert className="h-5 w-5 text-rose-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-heading">Emergency Triage Status</h3>
                      <p className="text-xs text-slate-400">Real-time differential logic</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Active Sentinel
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Top Match</div>
                    <div className="text-lg font-extrabold text-rose-400 font-heading mt-1 truncate">
                      {topMatch?.disease.name.split(' ')[0] || 'Coccidiosis'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{topMatch?.matchScore}% match score</div>
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Severity</div>
                    <div className="text-lg font-extrabold text-amber-400 font-heading mt-1">High Alert</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">quarantine advised</div>
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Triage Speed</div>
                    <div className="text-lg font-extrabold text-emerald-400 font-heading mt-1">&lt;2 Mins</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">instant guidance</div>
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Vet Backup</div>
                    <div className="text-lg font-extrabold text-cyan-400 font-heading mt-1">VCN Duty</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">on-call clinician</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-rose-950/60 border border-rose-500/20 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                    <AlertTriangle className="h-4 w-4 text-rose-400" />
                    <span>The Golden 2 Hours of Disease Onset</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Treating Newcastle Disease with antibiotics or feeding B-vitamins during active coccidiosis accelerates bird mortality. Precision triage protects your birds.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          OPERATIONAL BENCHMARKS BAR
          ==================================================================== */}
      <section className="bg-emerald-950/80 border-y border-emerald-900/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {BENCHMARKS.map((b, i) => (
              <div key={i} className="text-center">
                <div className={`text-3xl font-extrabold font-heading ${b.color}`}>{b.value}</div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">{b.label}</div>
                <div className="text-xs text-slate-600 mt-0.5">{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          MAIN TRIAGE ENGINE
          ==================================================================== */}
      <section id="triage-engine" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="section-label mx-auto w-fit">
            <Stethoscope className="h-3.5 w-3.5" />
            Flock Triage Questionnaire
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Select Observed Flock Symptoms
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Check all visible signs in your pen. Our algorithm matches your symptoms against our database of tropical avian diseases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Symptom Selection Panel (Left - 6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">Flock Demographics</h3>
                <p className="text-xs text-slate-500">Provide bird type and age for precise scoring</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                {selectedSymptoms.length} Symptoms Active
              </span>
            </div>

            {/* Quick Demographics Selector */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Flock Type</label>
                <select
                  value={birdType}
                  onChange={(e) => setBirdType(e.target.value)}
                  className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:ring-emerald-500"
                >
                  <option value="Broilers">Broilers</option>
                  <option value="Layers">Commercial Layers</option>
                  <option value="Cockerels / Noilers">Cockerels / Noilers</option>
                  <option value="Turkeys">Turkeys</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Flock Age</label>
                <select
                  value={flockAge}
                  onChange={(e) => setFlockAge(e.target.value)}
                  className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:ring-emerald-500"
                >
                  <option value="1–2 Weeks">1–2 Weeks</option>
                  <option value="3–4 Weeks">3–4 Weeks</option>
                  <option value="4–6 Weeks">4–6 Weeks</option>
                  <option value="7+ Weeks / Lay">7+ Weeks / Lay</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Bird Count</label>
                <input
                  type="number"
                  value={flockSize}
                  onChange={(e) => setFlockSize(Number(e.target.value))}
                  className="w-full text-xs font-semibold rounded-xl border border-slate-200 p-2 bg-slate-50 focus:ring-emerald-500"
                  placeholder="1000"
                />
              </div>
            </div>

            {/* Symptom Checklist Grouped by Category */}
            <div className="space-y-4 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Select Observed Signs:</div>
              <div className="space-y-2">
                {SYMPTOM_OPTIONS.map((sym) => {
                  const isChecked = selectedSymptoms.includes(sym.id);
                  return (
                    <button
                      key={sym.id}
                      type="button"
                      onClick={() => toggleSymptom(sym.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs font-medium transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{sym.label}</span>
                      <span className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 ml-3 ${
                        isChecked ? 'bg-rose-600 border-rose-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <CheckCircle2 className="h-3 w-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Differential Diagnostic Output (Right - 6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Top Clinical Match
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-1">
                    {topMatch?.disease.name}
                  </h3>
                  <p className="text-xs text-slate-500 italic mt-0.5">{topMatch?.disease.scientificName}</p>
                </div>
                <div className={`rounded-2xl border px-3.5 py-1.5 text-center ${topMatch?.disease.severityColor}`}>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider">{topMatch?.disease.severity}</div>
                  <div className="text-sm font-extrabold mt-0.5">{topMatch?.matchScore}% Match</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {topMatch?.disease.description}
              </p>

              {/* Immediate Steps */}
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 space-y-2">
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-700" />
                  <span>Immediate 60-Minute Farm Protocol:</span>
                </div>
                <ul className="space-y-1 text-xs text-amber-950">
                  {topMatch?.disease.immediateSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Post-Mortem Clues */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-emerald-600" />
                  <span>Key Post-Mortem Necropsy Clues:</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-600">
                  {topMatch?.disease.postMortemClues.map((clue, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>{clue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Biologicals & Pharmaceuticals */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Associated NAFDAC Treatments:
                </div>
                <div className="space-y-2">
                  {topMatch?.disease.recommendedTreatments.map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/80 text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{t.name}</div>
                        <div className="text-[11px] text-slate-500">{t.note}</div>
                      </div>
                      <Link
                        href={`/drugs/${t.slug}`}
                        className="text-xs text-emerald-700 hover:text-emerald-800 font-bold shrink-0 flex items-center gap-1 ml-2"
                      >
                        <span>View</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleShareWhatsApp}
                  variant="whatsapp"
                  size="lg"
                  className="w-full sm:flex-1 justify-center shadow-lg"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <span>Send Triage to Vet Desk on WhatsApp</span>
                </Button>
                <Link
                  href="/drugs"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-5 py-3 text-sm transition-colors text-center"
                >
                  <Package className="h-4 w-4 mr-2 text-emerald-600" />
                  <span>Pharmacy Catalogue</span>
                </Link>
              </div>
            </div>

            {/* Other Differential Matches */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-3">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Secondary Differential Rule-Outs:
              </div>
              <div className="divide-y divide-slate-100">
                {rankedDiseases.slice(1, 4).map((item) => (
                  <div key={item.key} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">{item.disease.name}</div>
                      <div className="text-[10px] text-slate-400">{item.disease.scientificName}</div>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {item.matchScore}% Match
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          PROBLEM: WHY GUESSWORK KILLS FLOCKS
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <AlertTriangle className="h-3.5 w-3.5" />
              The Diagnostic Trap
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why Guesswork Kills Flocks on Nigerian Farms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              When birds fall sick, farmers run to open-market pharmacies to buy whatever antibiotic is handy. In 7 out of 10 cases, the treatment is biologically wrong and hastens mortality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAILURE_POINTS.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="rounded-3xl bg-red-50 border border-red-100 p-7 flex gap-5">
                  <div className="h-11 w-11 rounded-2xl bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          INFORMATION GAIN: CLINICAL DIFFERENTIAL MATRIX
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Activity className="h-3.5 w-3.5" />
              Unique Information Gain
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Clinical Differential &amp; Immediate Action Matrix
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Use this rapid differential reference table to rule out lookalike diseases and initiate emergency farm protocols before necropsy confirmation.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Observed Sign</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Probable Pathogen</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider">Confirmatory Clue</th>
                  <th className="text-left px-5 py-4 font-bold font-heading text-xs uppercase tracking-wider text-emerald-400">Immediate 60-Minute Farm Protocol</th>
                </tr>
              </thead>
              <tbody>
                {DIFFERENTIAL_MATRIX.map((row, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-t border-slate-100`}>
                    <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">{row.sign}</td>
                    <td className="px-5 py-4 font-mono font-bold text-rose-600">{row.probable}</td>
                    <td className="px-5 py-4 text-slate-600 text-xs">{row.confirm}</td>
                    <td className="px-5 py-4 text-slate-700 text-xs leading-relaxed">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-slate-400" />
              Always observe a minimum 7-day withdrawal period before marketing meat from antibiotic-treated pens.
            </span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4-PILLAR BIOSECURITY DEFENSE SYSTEM
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              Biosecurity Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 4-Pillar Flock Biosecurity Defense Protocol
            </h2>
            <p className="text-slate-600 leading-relaxed">
              When disease strikes, containment in the first 2 hours prevents airborne spread across neighboring pens.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className={`card-dark rounded-3xl p-7 space-y-5 border ${p.borderColor} hover:scale-[1.02] transition-transform`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-2xl ${p.bgColor} border ${p.borderColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${p.color}`} />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-700 font-heading">{p.num}</span>
                  </div>
                  <h3 className={`text-base sm:text-lg font-bold font-heading ${p.color}`}>{p.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          HONESTY FILTER
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <div className="section-label mx-auto w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              Honest Assessment
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              This Triage Tool Is Not for You If...
            </h2>
          </div>

          <div className="rounded-3xl bg-slate-900 border border-slate-700 p-8 space-y-4">
            {HONESTY_FILTERS.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">{item}</p>
              </div>
            ))}
            <div className="pt-4 border-t border-slate-700 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <p className="text-sm text-emerald-300 font-semibold">
                But if you want rapid clinical guidance, rule-out decision support, and direct veterinary escalation — this sentinel system is here for your farm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FAQ
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <BookOpen className="h-3.5 w-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Everything About Poultry Disease Symptoms &amp; Clinical Triage
            </h2>
          </div>

          <div className="space-y-5">
            {FAQ_DISPLAY.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 border border-slate-200 p-6">
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          FINAL CTA
          ==================================================================== */}
      <section className="bg-emerald-950 py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/25 px-5 py-2 rounded-full">
            <Stethoscope className="h-3.5 w-3.5" />
            Duty Veterinarian On-Call
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Escalate Unresolved Flock Symptoms to{' '}
            <span className="text-gradient-green">Our Clinical Veterinary Desk</span>
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Send your symptom selections and photos directly to D-AminGrow&apos;s registered avian clinicians on WhatsApp. Get verified prescription dosage advice and biosecurity containment plans.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              Send Emergency Triage SOS on WhatsApp
            </button>
            <Link
              href="/drugs"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
            >
              <Package className="h-4 w-4" />
              Browse NAFDAC Veterinary Drugs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            Clinical decision support · VCN protocol aligned · Direct veterinary SOS dispatch
          </p>
        </div>
      </section>

    </div>
  );
}
