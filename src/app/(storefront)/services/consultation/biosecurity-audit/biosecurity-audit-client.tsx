'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Send,
  ClipboardCheck,
  MessageCircle,
  Sparkles,
  ArrowRight,
  XCircle,
  HelpCircle,
  Clock,
  PhoneCall,
  Droplets,
  Layers,
  Flame,
  Users,
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

const OPERATIONAL_BENCHMARKS = [
  {
    value: '10 Core Vectors',
    label: 'Veterinary Biosecurity Audit',
    detail: 'Complete barrier screening from perimeter to waterline',
  },
  {
    value: '95% Reduction',
    label: 'Viral Outbreak Probability',
    detail: 'Achieved when institutional biosecurity index exceeds 85%',
  },
  {
    value: '14 Days Minimum',
    label: 'Sanitary Pen Downtime',
    detail: 'Mandatory rest period post-terminal power wash and fogging',
  },
  {
    value: 'VCN Standard',
    label: 'Clinical Certification',
    detail: 'Direct review by registered Nigerian veterinary clinicians',
  },
];

const PROBLEM_POINTS = [
  {
    title: 'Contaminated Footwear & Lack of Pen-Specific Boots',
    desc: 'Farm attendants moving between open farm grounds and brooding pens without changing footwear transfer microscopic Coccidiosis oocysts and Gumboro (IBD) virus directly into fresh wood shavings. Disinfectant footbaths left unchanged for weeks become mud pools that actively cultivate bacteria instead of neutralizing them.',
    impact: 'Up to 40% mortality within 72 hours of IBD ingress',
  },
  {
    title: 'Untreated Borehole Biofilms & Bacterial Waterlines',
    desc: 'Borehole water in agricultural zones frequently contains high iron, organic matter, and coliform counts. Inside closed nipple pipelines, stagnant water develops thick microbial biofilms that protect E. coli and Salmonella from standard water medications, causing chronic stunted growth and high chick culling rates.',
    impact: '15%–25% weight loss & permanent enteric damage',
  },
  {
    title: 'Live-Bird Market Buyer Crates & Vehicle Cross-Contamination',
    desc: 'Allowing middlemen collection trucks and dirty wooden or plastic chicken crates to enter the pen gate is the single leading vector for Velogenic Newcastle Disease in Nigeria. Market crates carry virulent field strains directly from open live-bird retail markets.',
    impact: 'Catastrophic total flock wipeout in 5–7 days',
  },
];

const BIOSECURITY_MATRIX = [
  {
    tier: 'Institutional Biosecurity (85%–100%)',
    barriers: 'Full perimeter fence, boot wash stations, waterline chlorination, bird-proof mesh, strict all-in/all-out',
    outbreakRisk: '< 5% Annual Exposure',
    typicalMortality: '< 2.5% Broilers / < 4% Layers',
    medicationCost: '₦120 – ₦180 per bird cycle',
    economicStatus: 'Maximum profit margin; zero emergency antibiotic rescues',
  },
  {
    tier: 'Moderate Baseline Security (50%–84%)',
    barriers: 'Perimeter fence present, but footbaths dry/diluted, multi-age flocks present, irregular water sanitation',
    outbreakRisk: '35% – 50% Annual Exposure',
    typicalMortality: '6% – 12% Broilers / 10% – 15% Layers',
    medicationCost: '₦350 – ₦550 per bird cycle',
    economicStatus: 'Recurring antibiotic cycles erode 30% of farm net profits',
  },
  {
    tier: 'High-Risk Unprotected Farm (< 50%)',
    barriers: 'No boundary fence, street shoes worn inside pen, untreated well water, dead birds discarded in open bushes',
    outbreakRisk: '> 85% Guaranteed Ingress',
    typicalMortality: '20% – 70%+ Catastrophic Losses',
    medicationCost: '₦800 – ₦1,200+ per bird cycle',
    economicStatus: 'Recurrent financial crises; frequent emergency flock liquidation',
  },
];

const PILLARS = [
  {
    num: '01',
    title: 'Physical Perimeter & Access Boundary Exclusion',
    desc: 'Constructing predator-proof boundary walls, double-gated disinfection vehicle pits, locked access points, and wild-bird galvanized wire mesh to eliminate vector ingress.',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
  },
  {
    num: '02',
    title: 'Water Sanitization & Pipeline Biofilm Elimination',
    desc: 'Implementing continuous chlorine dioxide or organic acid injection to maintain drinking water at pH 5.8–6.2, suppressing Salmonella, E. coli, and destroying pipeline biofilm.',
    icon: Droplets,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
  },
  {
    num: '03',
    title: 'Boot Exchange, Footbaths & Personnel Hygiene',
    desc: 'Establishing strict color-coded pen-dedicated boots, active glutaraldehyde/QAC footbaths replenished every 48 hours, and clean overall gowning for all farm staff.',
    icon: Users,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
  },
  {
    num: '04',
    title: 'Terminal Pen Decontamination & 14-Day Downtime',
    desc: 'Executing a 5-step terminal protocol: dry litter clearance, alkaline foam power washing, thermal flame disinfection, broad-spectrum fogging, and strict 14-day resting.',
    icon: Flame,
    color: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    bgColor: 'bg-rose-500/10',
  },
];

const FAQS = [
  {
    q: 'What is a poultry farm biosecurity audit and why is it necessary?',
    a: 'A poultry farm biosecurity audit is a systematic clinical evaluation of all physical barriers, operational workflows, water treatment protocols, and sanitation practices on your livestock facility. It identifies pathogen transmission routes (rodents, wild birds, visitor shoes, dirty crates, untreated water) before they cause deadly outbreaks like Newcastle disease, Gumboro, or Avian Influenza.',
  },
  {
    q: 'How often should footbath disinfectant be replaced in a poultry pen?',
    a: 'Footbaths must be emptied, scrubbed, and refilled with fresh disinfectant solution at least every 48 hours in dry conditions, and daily during wet or high-traffic periods. Organic matter like poultry litter, mud, and feces rapidly neutralizes active chemical disinfectants (such as quaternary ammonium compounds or glutaraldehyde), turning old footbaths into bacterial reservoirs.',
  },
  {
    q: 'Why is untreated borehole water dangerous for commercial broilers and layers?',
    a: 'Even clear borehole water often carries elevated microbial loads, including coliforms, E. coli, and Salmonella, along with dissolved iron and calcium. Inside drinking waterlines, bacteria form a protective slime matrix known as biofilm. Biofilm shields pathogens from antibiotics, causing chronic gut inflammation, watery droppings, and poor nutrient absorption.',
  },
  {
    q: 'What does "all-in, all-out" flock management mean?',
    a: 'All-in, all-out management means rearing only birds of the exact same age in a given farm facility or pen sector, and dispatching all of them together before cleaning and resting the pen. Mixing different ages (e.g. brooding day-old chicks next to 6-week broilers or adult layers) is disastrous because older carrier birds shed virulent pathogens that devastate younger chicks with immature immune systems.',
  },
  {
    q: 'How does D-AminGrow conduct an on-farm biosecurity audit in Nigeria?',
    a: 'Our registered veterinary clinicians visit your farm to conduct a thorough 10-point barrier inspection. We test drinking water pH and microbial quality, inspect fence integrity, evaluate mortality disposal pits, assess staff footbath protocols, and produce a formal VCN Biosecurity Scorecard with prioritized corrective action steps.',
  },
  {
    q: 'Can improving biosecurity reduce my farm medication costs?',
    a: 'Yes. Commercial farms that achieve an institutional biosecurity index of 85%+ routinely experience an 80% reduction in antibiotic expenditures. Because viral and severe bacterial challenges are prevented from entering the farm, birds do not require frequent prophylactic antibiotic treatments, lowering cost-per-kg of meat produced.',
  },
];

export function BiosecurityAuditClient() {
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
      {/* ====================================================================
          CINEMATIC DARK HERO (7/5 GRID)
          ==================================================================== */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-emerald-400 transition-colors">Services</Link>
            <span>/</span>
            <Link href="/services/consultation" className="hover:text-emerald-400 transition-colors">Consultation</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Biosecurity Audit</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label-dark">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Veterinary Biosecurity &amp; Disease Defence Protocol
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading tracking-tight leading-tight">
                Poultry Farm Biosecurity Audit: <br />
                <span className="text-gradient-green">10-Point Disease Barrier Protocol &amp; Scorecard</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                85% of catastrophic poultry mortalities (Newcastle, Gumboro, Avian Influenza) stem from preventable biosecurity breaches. Audit your physical farm defences and secure a certified VCN clinical barrier protocol.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20request%20an%20on-farm%20biosecurity%20audit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Consult Biosecurity Desk on WhatsApp</span>
                </a>
                <a
                  href="#interactive-audit"
                  className="inline-flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-4 rounded-xl transition-all text-sm"
                >
                  <span>Launch 10-Point Scorecard</span>
                  <ArrowRight className="h-4 w-4 text-emerald-400" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>VCN-Certified Clinical Standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Eliminate 95% Outbreak Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Field Inspections Across 36 States</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Live Score Preview Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Live Biosecurity Assessment
                  </span>
                  <span className={`px-3 py-0.5 rounded-full text-[11px] font-extrabold border ${auditScore.gradeBadge}`}>
                    {auditScore.grade}
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center space-y-2">
                  <div className="text-4xl font-extrabold text-white font-heading">
                    {auditScore.score}%
                  </div>
                  <div className="text-xs text-slate-300">
                    {checkedItems.length} of 10 Essential Disease Barriers Enforced
                  </div>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    {auditScore.assessment}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Includes drinking water acidification protocol</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Terminal decontamination &amp; downtime guide</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#interactive-audit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-xs font-bold text-white hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md"
                  >
                    <span>Complete 10-Point Scorecard Below</span>
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
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  {b.label}
                </div>
                <div className="text-xs text-slate-500 leading-snug">{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PROBLEM SECTION: CATASTROPHIC BIOSECURITY BREACH MODES
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            Vulnerability Analysis in Nigerian Poultry
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            How Invisible Pathogens Breach 80% of Commercial Farms
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Pathogens do not spontaneously generate in chicken pens. They are mechanically carried by people, dirty equipment, wild birds, and untreated waterlines.
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
          INFORMATION GAIN MATRIX: BIOSECURITY TIER COMPARISON
          ==================================================================== */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              Biosecurity Economics &amp; Risk Matrix
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Farm Biosecurity Vulnerability &amp; Economic Loss Matrix (Nigeria 2026)
            </h2>
            <p className="text-sm text-slate-600">
              Comparative analysis demonstrating how structured biosecurity barriers protect working capital and eliminate recurring antibiotic dependency in tropical poultry setups.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-heading">
                  <th className="p-4 sm:p-5 font-bold">Biosecurity Rating Tier</th>
                  <th className="p-4 sm:p-5 font-bold">Barrier Infrastructure Present</th>
                  <th className="p-4 sm:p-5 font-bold">Viral Outbreak Risk</th>
                  <th className="p-4 sm:p-5 font-bold">Average Flock Mortality</th>
                  <th className="p-4 sm:p-5 font-bold">Medication Cost/Bird</th>
                  <th className="p-4 sm:p-5 font-bold">Commercial Bottomline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {BIOSECURITY_MATRIX.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{row.tier}</td>
                    <td className="p-4 sm:p-5">{row.barriers}</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-700">{row.outbreakRisk}</td>
                    <td className="p-4 sm:p-5 font-mono">{row.typicalMortality}</td>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{row.medicationCost}</td>
                    <td className="p-4 sm:p-5 text-slate-600">{row.economicStatus}</td>
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
            Clinical Veterinary Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            The D-AminGrow 4-Pillar Biosecurity Standard
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our multi-layered barrier strategy seals the four primary microbiological ingress pathways into your commercial facility.
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
          PRESERVED INTERACTIVE 10-POINT SCORECARD & INTAKE FORM
          ==================================================================== */}
      <section id="interactive-audit" className="py-16 bg-white border-y border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <ClipboardCheck className="h-3.5 w-3.5 text-emerald-600" />
              Interactive Biosecurity Scorecard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Audit Your Farm Defences: 10-Point Clinical Assessment
            </h2>
            <p className="text-sm text-slate-600">
              Check off every protocol currently enforced on your farm. The scorecard calculates your biosecurity risk index and allows you to submit your audit directly for VCN review.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: 10-Point Checklist */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Essential Barrier Checklist
                  </h3>
                  <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
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
                            ? 'border-emerald-600 bg-white shadow-sm ring-1 ring-emerald-600'
                            : 'border-slate-200 bg-white hover:bg-slate-100'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-slate-900 block">{q.title}</span>
                          {!isChecked && (
                            <span className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
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
                      href="https://wa.me/2348068700074?text=Hello%20D-AminGrow,%20I%20just%20completed%20the%20farm%20biosecurity%20audit"
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
                        placeholder="e.g. 08068700074"
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
              Our Biosecurity Advisory May <span className="text-rose-600">Not</span> Be Right For You If...
            </h2>
            <p className="text-sm text-slate-600">
              We enforce uncompromising veterinary protocols to protect commercial flocks from catastrophic losses. We are transparent about what works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Allow Live-Bird Middlemen Into Rearing Pens
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you permit bird market buyers to bring dirty wooden crates directly inside your pens to weigh birds, no disinfectant routine can save your farm from virulent viral outbreaks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Prefer Blind Antibiotic Dosing Over Sanitization
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If your strategy is to administer broad-spectrum antibiotics continuously rather than sanitizing waterlines and establishing clean boot exchanges, our preventive veterinary methodology is not a fit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Refuse the Mandatory 14-Day Downtime Rule
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rushing day-old chicks into pens immediately after evacuating broilers without a 14-day resting and disinfection period perpetuates resistant bacterial pathogens and coccidia oocysts across generations.
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
              <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
              Biosecurity FAQs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions About Poultry Biosecurity in Nigeria
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
      <section className="py-20 bg-gradient-to-br from-[#050E08] via-slate-950 to-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
            <Clock className="h-3.5 w-3.5 text-emerald-400" />
            <span>On-Farm Veterinary Biosecurity Audits Across Nigeria</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Protect Your Flock Capital with Institutional Biosecurity
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect directly with registered Nigerian veterinary doctors. Eliminate viral vectors, optimize water sanitation, and secure your flock against devastating disease outbreaks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20schedule%20a%20veterinary%20biosecurity%20audit%20for%20my%20farm."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-xl inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Connect on WhatsApp (+234 806 870 0074)</span>
            </a>
            <a
              href="tel:+2348068700074"
              className="border border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-xl transition-all text-base inline-flex items-center justify-center gap-2 bg-white/5"
            >
              <PhoneCall className="h-5 w-5 text-emerald-400" />
              <span>Call Senior Biosecurity Clinician</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
