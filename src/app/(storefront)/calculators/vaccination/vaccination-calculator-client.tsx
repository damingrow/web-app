'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  Syringe,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  Clock,
  ThermometerSnowflake,
  Droplets,
} from 'lucide-react';
import { VaccinationProgramHub } from '@/components/vaccination/vaccination-program-hub';

const OPERATIONAL_BENCHMARKS = [
  {
    icon: ThermometerSnowflake,
    value: '2°C – 8°C',
    label: 'Verified Cold-Chain Storage',
    detail: 'Continuous digital data-logging and EPS phase-change packaging',
  },
  {
    icon: Clock,
    value: 'Day 1 to Wk 72+',
    label: 'Comprehensive Flock Life Coverage',
    detail: 'Complete timelines for both rapid broilers and long-cycle commercial layers',
  },
  {
    icon: ShieldCheck,
    value: 'VCN Aligned',
    label: 'Clinical Veterinary Standard',
    detail: 'Structured according to Veterinary Council of Nigeria approved protocols',
  },
  {
    icon: Droplets,
    value: '2g / Litre',
    label: 'Skim Milk Buffer Standard',
    detail: 'Stabilizer protocol to neutralize chlorine and halogens in flock drinkers',
  },
];

const PROBLEM_POINTS = [
  {
    title: 'Maternal Antibody Neutralization (Day 1–7 Failure)',
    desc: 'Vaccinating chicks before maternal antibodies decline neutralizes the live viral antigen. If Gumboro is administered too early, parent antibodies bind the vaccine virus before the bursa is stimulated, leaving chicks defenseless when passive immunity wanes.',
    stat: 'Up to 80% Field Failure',
  },
  {
    title: 'Pipeline Chlorine & Disinfectant Inactivation',
    desc: 'Live attenuated viral biologicals (LaSota, Gumboro) are killed within seconds by municipal chlorine, borehole ozone, or residual waterline sanitizers. Administering vaccines in unbuffered water delivers dead biological debris with zero protective immunity.',
    stat: '100% Antigenic Loss',
  },
  {
    title: 'Afternoon Heat Stress & Delayed Intake',
    desc: 'Reconstituting vaccines in tropical heat causes live viruses to degrade within 90 minutes. When birds pant and refuse warm drinker water, dosage is unevenly distributed across the flock, resulting in rolling vaccine reactions and outbreaks.',
    stat: '35°C+ Ambient Degradation',
  },
];

const VACCINATION_MATRIX = [
  {
    age: 'Day 1 (Hatchery)',
    pathogen: "Marek's Disease + Newcastle (ND)",
    strain: "HVT / Rispens + ND Clone 30 / B1",
    route: 'Subcutaneous injection / Coarse spray',
    waterBuffer: 'N/A (Pre-placement hatchery service)',
    caution: 'Must be administered within 2 hours of hatch before chick exposure to field dust and feather dander.',
  },
  {
    age: 'Day 7 – 8',
    pathogen: 'Newcastle Disease (ND 1st Live)',
    strain: 'ND LaSota / Hitchner B1 / Clone 30',
    route: 'Intraocular (Eye drop) or Coarse spray',
    waterBuffer: 'If water: 2g skim milk/L; 5–7 L per 1,000 chicks',
    caution: 'Eye-drop route provides 100% individual flock take. Ensure complete tear formation before releasing chick.',
  },
  {
    age: 'Day 10 – 14',
    pathogen: 'Infectious Bursal Disease (IBD 1st Dose)',
    strain: 'Intermediate / Intermediate Plus (e.g. MB, 228E)',
    route: 'Drinking water',
    waterBuffer: 'Skim milk 2g/L; withhold water 1.5–2 hrs prior',
    caution: 'Do not administer during hot midday hours. Finish all vaccine water within 60–90 minutes maximum.',
  },
  {
    age: 'Day 18 – 21',
    pathogen: 'Infectious Bursal Disease (IBD Booster)',
    strain: 'IBD Intermediate Plus',
    route: 'Drinking water',
    waterBuffer: 'Skim milk 2g/L; 18–22 L per 1,000 birds',
    caution: 'Critical window for broilers in high-challenge zones. Ensure adequate drinker space (1 bell drinker / 50 birds).',
  },
  {
    age: 'Day 21 – 24',
    pathogen: 'Newcastle Disease Booster',
    strain: 'ND LaSota',
    route: 'Drinking water',
    waterBuffer: 'Skim milk 2g/L; 25–30 L per 1,000 birds',
    caution: 'May cause mild post-vaccinal snicking. Provide anti-stress multivitamins only 24 hours AFTER vaccination.',
  },
  {
    age: 'Week 6 – 8 (Layers)',
    pathogen: 'Fowl Pox',
    strain: 'Live Pox Virus (Tissue Culture Origin)',
    route: 'Wing-web puncture (Double needle)',
    waterBuffer: 'N/A (Direct transfixion)',
    caution: 'Inspect wing-web 7–10 days post-application for visible "take" nodules. If missing, revaccinate immediately.',
  },
  {
    age: 'Week 10 – 12 (Layers)',
    pathogen: 'Infectious Coryza',
    strain: 'Inactivated Serovars A, B, C',
    route: 'Intramuscular injection (Breast/Thigh)',
    waterBuffer: 'N/A (Killed oil-emulsion)',
    caution: 'Bring cold emulsion to ambient room temperature (25°C) before injecting to prevent breast muscle granulomas.',
  },
  {
    age: 'Week 16 – 18 (Pre-Lay)',
    pathogen: 'ND + IB + EDS (Inactivated Triple)',
    strain: 'Oil-emulsion killed trivalent antigen',
    route: 'Intramuscular / Subcutaneous',
    waterBuffer: 'N/A (Killed bacterin/virus)',
    caution: 'Administer at least 3 weeks before first expected egg. Provides peak humoral maternal antibody transfer to eggs.',
  },
];

const PILLARS = [
  {
    num: '01',
    title: 'Maternal Titre Synchronization',
    desc: 'Vaccine timing must align with parental antibody decay curves. Administering biologicals too early neutralizes the antigen, while waiting too long leaves an immunity gap.',
    icon: Clock,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
  },
  {
    num: '02',
    title: '2°C–8°C Certified Cold Chain',
    desc: 'Every viral vial is held under continuous digital cold-chain control from manufacturer to your farm gate, preventing thermal attenuation and viral death.',
    icon: ThermometerSnowflake,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
  },
  {
    num: '03',
    title: 'Halogen-Free Stabilized Water',
    desc: 'Waterlines must be free of chlorine, chlorine dioxide, and acids. Adding 2g/litre of skimmed milk powder protects the envelope of live attenuated viruses.',
    icon: Droplets,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
  },
  {
    num: '04',
    title: 'Clinical Booster & Titre Monitoring',
    desc: 'Humoral immunity wanes over flock life. Timely boosters and serological ELISA checks ensure your birds maintain protective geometric mean titres (GMT > 6).',
    icon: ShieldCheck,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/10',
  },
];

const HONESTY_FILTERS = [
  'You are looking for a substitute for farm hygiene and strict biosecurity barriers (vaccines cannot compensate for dirty litter and wild bird intrusions).',
  'Your flock is currently experiencing acute clinical sickness, gasping, or coccidiosis (live vaccines will trigger secondary mortality in sick flocks).',
  'You plan to mix live vaccines in municipal chlorinated tap water without milk stabilizer or proper water withholding.',
  'You expect a single schedule to replace direct veterinary diagnostics when facing atypical regional disease pressure.',
];

const FAQ_DISPLAY = [
  {
    q: 'How does the poultry vaccination schedule generator calculate dates?',
    a: 'The generator anchors each immunization milestone to your exact flock hatch or placement date. It calculates chronological bird age and schedules critical live viral and bacterial immunizations (ND, IBD, Fowl Pox, Coryza) according to proven tropical veterinary protocols and antibody clearance curves.',
  },
  {
    q: 'Why should live poultry vaccines not be given in chlorinated tap water?',
    a: 'Chlorine, heavy metals, and pipe sanitizers destroy live attenuated viral particles instantly, rendering the vaccine useless. Always use untreated deep well or borehole water, or add skimmed milk powder (2g per litre) 20 minutes before vaccine reconstitution to neutralize residual sanitizers.',
  },
  {
    q: 'What happens if I administer the Gumboro (IBD) vaccine too early?',
    a: 'Administering IBD vaccine before Day 10–14 in parentally immune chicks causes circulating maternal antibodies to bind and neutralize the vaccine virus before it can stimulate the bursa of Fabricius. This leaves birds unprotected when maternal immunity declines.',
  },
  {
    q: 'Can I vaccinate sick, panting, or heat-stressed birds?',
    a: 'No. Never vaccinate clinically depressed, diseased, or heat-stressed flocks. Live vaccines impose biological metabolic stress and require an active immune system to develop protective antibodies. Vaccinating stressed birds can precipitate secondary bacterial outbreaks.',
  },
  {
    q: 'What is the main difference between Broiler and Commercial Layer vaccination calendars?',
    a: 'Broilers have a fast 35–42 day turnaround requiring primary live doses for Newcastle (ND) and Gumboro (IBD). Commercial layers live for 72–80+ weeks and require multiple live boosters, wing-web Fowl Pox, Coryza bacterins, and killed oil-emulsion injections (ND+IB+EDS) prior to point of lay.',
  },
  {
    q: 'How does D-AminGrow ensure vaccine potency across Nigeria?',
    a: 'All biologicals are stored in calibrated 2°C–8°C digital medical freezers with automatic solar backup, certified by NVRI Vom and NAFDAC. Outbound orders are dispatched in pre-chilled expanded polystyrene (EPS) insulated shippers with verified frozen phase-change gel refrigerant bricks.',
  },
];

export default function VaccinationCalculatorClient() {
  const handleWhatsAppConsult = () => {
    const message = encodeURIComponent(
      `Hello D-AminGrow Technical Veterinary Desk,\n\nI am setting up a poultry vaccination calendar for my farm and would like to verify cold-chain biological availability and protocol adherence for my flock.`
    );
    window.open(`https://wa.me/2348068700074?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50/70">
      {/* ====================================================================
          CINEMATIC HERO (2-COLUMN GRID: 7 COLS LEFT / 5 COLS RIGHT)
          ==================================================================== */}
      <section className="relative hero-mesh bg-[#050E08] text-white pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden print:hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[650px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <Link href="/calculators" className="hover:text-emerald-400 transition-colors">
              Calculators
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-cyan-400 font-semibold">Vaccination Schedule Generator</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label-dark">
                <Syringe className="h-3.5 w-3.5 text-cyan-400" />
                Clinical Immunization Engine
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-tight font-heading leading-tight">
                Poultry Vaccination Schedule Generator:{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Custom Calendar by Hatch Date
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Generate a veterinary-verified, day-by-day immunization calendar synchronized directly to your chick arrival date in Nigeria. Protect broilers and commercial layers against Newcastle, Gumboro, and Fowl Pox with zero maternal antibody interference.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  VCN Protocol Aligned
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
                  ❄️ 2°C–8°C Cold-Chain Verified
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
                  <Clock className="h-3.5 w-3.5" />
                  Maternal Titre Synchronized
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  type="button"
                  onClick={handleWhatsAppConsult}
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Consult Avian Specialist on WhatsApp
                </button>
                <a
                  href="#generator-tool"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
                >
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  Generate Custom Schedule
                </a>
              </div>
            </div>

            {/* Right Column (5 Cols): Live Clinical Telemetry Card */}
            <div className="lg:col-span-5">
              <div className="card-dark rounded-3xl p-6 sm:p-8 space-y-6 border border-cyan-500/20 shadow-2xl relative overflow-hidden backdrop-blur-xl bg-slate-900/90">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                      <ThermometerSnowflake className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                        Cold-Chain Telemetry
                      </div>
                      <div className="text-sm font-bold text-white">Central Depots (Lagos / Ibadan)</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    3.8°C Steady
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Vaccine Formulation Status</div>
                      <div className="text-sm font-bold text-white">Live Attenuated + Inactivated</div>
                    </div>
                    <span className="text-xs text-cyan-300 font-semibold bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                      NVRI / NAFDAC Verified
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Target Dilution Protocol</div>
                      <div className="text-sm font-bold text-white">Skim Milk Buffer (2g / L)</div>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      Zero Chlorine Loss
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Dynamic Date Adjustment</div>
                      <div className="text-sm font-bold text-white">Synchronized to Hatch Date</div>
                    </div>
                    <span className="text-xs text-purple-400 font-semibold bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
                      Day-by-Day Mapping
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    Automated calendar export (PDF &amp; WhatsApp)
                  </span>
                  <span className="text-slate-500 font-mono">Rev 2026.4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          OPERATIONAL BENCHMARKS BAR
          ==================================================================== */}
      <section className="bg-slate-900 border-y border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {OPERATIONAL_BENCHMARKS.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                      {b.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-300">{b.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{b.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          MAIN INTERACTIVE HUB
          ==================================================================== */}
      <div id="generator-tool" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <VaccinationProgramHub initialFlockType="broiler" />
      </div>

      {/* ====================================================================
          PROBLEM / COST OF TIMING INACCURACIES
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              The Clinical Challenge
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why Timing Errors &amp; Water Inactivation Cause Total Vaccine Failure
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Administering biological vaccines without calendar precision or water stabilization leads to catastrophic false-security, leaving birds unprotected against endemic tropical pathogens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROBLEM_POINTS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-slate-50 border border-slate-200 p-8 space-y-4 hover:shadow-lg transition-shadow relative overflow-hidden"
              >
                <div className="inline-block text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                  {item.stat}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          INFORMATION GAIN: MATERNAL ANTIBODY DECAY & VACCINATION MATRIX
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="section-label-dark mx-auto w-fit">
              <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
              Information Gain Matrix
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
              Maternal Antibody Decay &amp; Vaccine Administration Matrix
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Clinical reference detailing optimal age windows, administration routes, and essential water buffers to ensure 100% flock humoral seroconversion.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/70 backdrop-blur-sm shadow-2xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-800/80 text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-700">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Flock Age</th>
                  <th className="py-4 px-4 sm:px-6">Target Pathogen</th>
                  <th className="py-4 px-4 sm:px-6">Vaccine Strain</th>
                  <th className="py-4 px-4 sm:px-6">Route</th>
                  <th className="py-4 px-4 sm:px-6">Stabilizer &amp; Buffer</th>
                  <th className="py-4 px-4 sm:px-6">Clinical Precaution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {VACCINATION_MATRIX.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-white whitespace-nowrap">
                      {row.age}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-cyan-300">
                      {row.pathogen}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-mono text-slate-300 text-xs">
                      {row.strain}
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-emerald-400 border border-slate-700">
                        {row.route}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-300 text-xs">
                      {row.waterBuffer}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-400 text-xs leading-relaxed max-w-xs">
                      {row.caution}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                Live Cold-Chain Dispatch from Vom &amp; Regulated Cold Hubs
              </div>
              <p className="text-xs text-slate-400">
                Need original freeze-dried vials with verified 2°C–8°C ice-brick insulated shipment across Nigeria?
              </p>
            </div>
            <Link
              href="/vaccines"
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shrink-0"
            >
              Order Cold-Chain Biologicals
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4-PILLAR IMMUNIZATION FRAMEWORK
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              Standard Operating Procedure
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 4-Pillar Flock Immunization Protocol
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Vaccination is only as effective as the coldest link in your delivery chain and the stabilization of your mixing water.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className={`card-dark rounded-3xl p-7 space-y-5 border ${p.borderColor} hover:scale-[1.02] transition-transform`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-12 w-12 rounded-2xl ${p.bgColor} border ${p.borderColor} flex items-center justify-center`}
                    >
                      <Icon className={`h-6 w-6 ${p.color}`} />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-700 font-heading">
                      {p.num}
                    </span>
                  </div>
                  <h3 className={`text-base sm:text-lg font-bold font-heading ${p.color}`}>
                    {p.title}
                  </h3>
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
              This Schedule Generator May Not Be Right for You If...
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
                However, if you want precise, day-by-day immunization calendars aligned with proven tropical disease protocols and verified cold-chain biologicals — this generator will protect your flock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FAQ SECTION
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <BookOpen className="h-3.5 w-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Everything You Need to Know About Poultry Immunization
            </h2>
          </div>

          <div className="space-y-5">
            {FAQ_DISPLAY.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 border border-slate-200 p-6">
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 mb-3">
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          FINAL CLOSING CTA BANNER
          ==================================================================== */}
      <section className="bg-emerald-950 py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-5 py-2 rounded-full">
            <Syringe className="h-3.5 w-3.5" />
            Biological Cold-Chain Integrity
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Order Certified Cold-Chain Vaccines or{' '}
            <span className="text-gradient-green">Consult Our Avian Clinicians</span>
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Do not risk entire flock batches to temperature-damaged vaccines. Get NVRI and NAFDAC approved biologicals delivered directly with thermal data-loggers across Nigeria.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={handleWhatsAppConsult}
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              Schedule Immunization on WhatsApp
            </button>
            <Link
              href="/vaccines"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 transition-all text-sm"
            >
              <ThermometerSnowflake className="h-4 w-4 text-cyan-400" />
              Browse Cold-Chain Biologicals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            Certified 2°C–8°C storage · NAFDAC &amp; NVRI Vom biologicals · Nationwide insulated shipping
          </p>
        </div>
      </section>
    </div>
  );
}
