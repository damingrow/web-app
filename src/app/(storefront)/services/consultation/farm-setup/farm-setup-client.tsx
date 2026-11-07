'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  Ruler,
  Compass,
  MessageCircle,
  AlertCircle,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  XCircle,
  Layers,
  HelpCircle,
  PhoneCall,
  Clock,
  Wind,
  Droplets,
} from 'lucide-react';

const OPERATIONAL_BENCHMARKS = [
  {
    value: '10 Birds/m²',
    label: 'Tropical Broiler Floor Density',
    detail: 'Prevents heat prostration and litter moisture compaction',
  },
  {
    value: 'East-to-West',
    label: 'Pen Axis Orientation',
    detail: 'Zero direct sun exposure on sidewall wire netting',
  },
  {
    value: '0.9m Dwarf Wall',
    label: 'Wall Architecture Standard',
    detail: 'Maximum cross-ventilation with galvanized wire mesh to 3m',
  },
  {
    value: '₦35k–₦85k/m²',
    label: 'Standard Structural Build Range',
    detail: 'Open-sided deep litter to multi-tier battery cage system',
  },
];

const PROBLEM_POINTS = [
  {
    title: 'North-South Pen Orientation Fatal Heat Trap',
    desc: 'Orienting poultry sheds facing north-south allows the intense tropical sun to beam directly through wire netting during mornings and late afternoons. Pen temperatures surge past 38°C, inducing severe heat prostration, plummeting feed intake by up to 45%, and causing catastrophic mortality spikes in birds over 4 weeks.',
    impact: 'Up to 35% growth suppression & mortality spikes',
  },
  {
    title: 'Overstocking Floor Density Above Tropical Carrying Limits',
    desc: 'Stocking broilers at European high-density standards (15–18 birds/m²) inside natural open-sided Nigerian pens creates acute litter wetness, rapid ammonia gas volatilization, and footpad dermatitis. Birds develop severe chronic respiratory disease (CRD) and fail to reach target weights.',
    impact: 'FCR worsens from 1.6 to 2.2+',
  },
  {
    title: 'Underestimating Waterline Pressure & Storage Resilience',
    desc: 'Commercial farms frequently fail to install overhead gravity tanks sized for 48-hour buffer storage. During Nigerian national grid outages or dry season borehole drawdowns, water deprivation for just 4 hours triggers irreversible egg drops in layers and acute heat death in market-age broilers.',
    impact: 'Sudden flock dehydration & irreversible lay drop',
  },
];

const SETUP_COST_MATRIX = [
  {
    scale: '500 Broilers (Smallholder)',
    area: '50 m² (538 sq ft)',
    dimensions: '10m × 5m',
    structuralCost: '₦1,800,000 – ₦2,500,000',
    equipmentCost: '₦350,000 – ₦500,000',
    workingCapital: '₦1,200,000 – ₦1,500,000',
    breakeven: '2 to 3 Production Cycles',
  },
  {
    scale: '2,500 Broilers (Commercial Semi-Auto)',
    area: '250 m² (2,690 sq ft)',
    dimensions: '25m × 10m',
    structuralCost: '₦8,500,000 – ₦11,500,000',
    equipmentCost: '₦1,800,000 – ₦2,600,000',
    workingCapital: '₦5,500,000 – ₦7,000,000',
    breakeven: '3 to 4 Production Cycles',
  },
  {
    scale: '1,000 Layers (A-Frame Battery Cage)',
    area: '75 m² (807 sq ft)',
    dimensions: '15m × 5m',
    structuralCost: '₦4,500,000 – ₦6,200,000',
    equipmentCost: '₦2,800,000 – ₦3,800,000',
    workingCapital: '₦3,800,000 – ₦4,500,000',
    breakeven: '12 to 14 Months of Lay',
  },
  {
    scale: '5,000 Layers (Automated Cage System)',
    area: '250 m² (2,690 sq ft)',
    dimensions: '30m × 8.5m',
    structuralCost: '₦18,000,000 – ₦24,000,000',
    equipmentCost: '₦14,000,000 – ₦18,500,000',
    workingCapital: '₦16,000,000 – ₦20,000,000',
    breakeven: '14 to 18 Months of Lay',
  },
];

const PILLARS = [
  {
    num: '01',
    title: 'Site Selection & Tropical Microclimate Engineering',
    desc: 'Evaluating prevailing wind direction, soil drainage, seasonal water table depth, and buffer distance from other poultry operations to ensure an insurmountable natural disease barrier.',
    icon: Compass,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
  },
  {
    num: '02',
    title: 'Aerodynamic Pen Architecture & Solar Mitigation',
    desc: 'Constructing east-to-west oriented pens with a 0.9m dwarf brick wall, 2.1m open galvanized wire netting, and 1.2m roof overhangs to divert driving rains while drawing ambient cooling breezes.',
    icon: Wind,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
  },
  {
    num: '03',
    title: 'Commercial Equipment, Heating & Waterline Hydraulics',
    desc: 'Sizing header tanks, anti-scale sediment filters, nipple drinking lines with pressure regulators, and infrared radiant brooders calibrated for 32°C–35°C floor-level chick reception warmth.',
    icon: Droplets,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
  },
  {
    num: '04',
    title: 'Bankable Financial Feasibility & Phased Expansion',
    desc: 'Developing comprehensive capital expenditure (CAPEX) schedules, working capital cash-flow models, feed ingredient inflation buffers, and ROI sensitivity projections.',
    icon: TrendingUp,
    color: 'text-teal-400',
    borderColor: 'border-teal-500/30',
    bgColor: 'bg-teal-500/10',
  },
];

const FAQS = [
  {
    q: 'How much does it cost to set up a 1,000 broiler poultry farm in Nigeria?',
    a: 'In 2026, constructing an open-sided commercial poultry pen for 1,000 broilers in Nigeria typically costs between ₦3,500,000 and ₦4,800,000 for the building (blocks, timber trusses, aluminum roofing, wire mesh, concrete floor). Equipment (feeders, bell drinkers, heating brooders, weighing scales) adds ₦600,000 to ₦900,000. Working capital for day-old chicks, feeds to 6 weeks, vaccines, and medication requires approximately ₦2,600,000 to ₦3,200,000.',
  },
  {
    q: 'Why must poultry pens in Nigeria always face East-to-West?',
    a: 'In tropical Nigeria, the sun travels directly overhead along the east-to-west trajectory. Aligning the long axis of the poultry pen strictly east-to-west ensures that the direct morning and evening sunlight strikes only the narrow gable end walls, keeping the long open wire-mesh sidewalls completely in the shade. This prevents midday greenhouse heat buildup, keeping internal pen temperatures 3°C to 5°C cooler.',
  },
  {
    q: 'What is the ideal floor space requirement per bird for broilers vs layers?',
    a: 'For open-sided deep litter broiler pens in Nigeria, the standard stocking density is 10 birds per square meter (0.1 m² or ~1.1 sq ft per bird). In closed tunnel-ventilated houses with cooling pads, this can increase to 14–15 birds/m². For commercial layers on deep litter, provide 0.15 m² per bird; in multi-tier battery cage systems, cages provide approximately 0.045 m² to 0.05 m² per bird.',
  },
  {
    q: 'How long does it take from site clearing to receiving the first batch of chicks?',
    a: 'A standard 1,000 to 5,000 bird open-sided poultry house takes between 4 and 7 weeks to construct, cure concrete floors, install equipment, and undergo thorough dry-out, power washing, and chemical disinfection before chick arrival. We recommend an absolute minimum 10-day downtime post-disinfection before introducing day-old chicks.',
  },
  {
    q: 'Can D-AminGrow engineers supervise my local construction workers on site?',
    a: 'Yes. Our poultry engineering team provides both complete turnkey construction management and technical site supervisory visits. We inspect foundational leveling, wall height accuracy, roof pitch angle, ridge vent openings, and waterline hydraulic slopes to prevent costly structural contractor errors.',
  },
  {
    q: 'How do I get an architectural pen blueprint and customized bill of quantities (BOQ)?',
    a: 'You can generate an initial structural floor plan estimate using our interactive blueprint calculator on this page, and submit your inquiry form. Our senior consulting desk will reach out within 2 hours to discuss your land dimensions, soil profile, and provide a full engineering proposal.',
  },
];

export function FarmSetupClient() {
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
            <span className="text-emerald-400 font-semibold">Farm Setup Blueprint</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label-dark">
                <Building2 className="h-3.5 w-3.5 text-emerald-400" />
                Agricultural Engineering &amp; Pen Blueprint
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading tracking-tight leading-tight">
                Poultry Farm Setup Cost in Nigeria: <br />
                <span className="text-gradient-green">Pen Construction &amp; Commercial Blueprint</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Avoid fatal solar orientation traps, improper dwarf wall heights, and toxic litter ammonia buildup. Engineer high-yield, bio-secure poultry sheds with custom bill-of-quantities and verified Nigerian cost projections.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20want%20to%20consult%20on%20setting%20up%20a%20commercial%20poultry%20farm."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all text-base shadow-lg inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Consult Engineering Desk on WhatsApp</span>
                </a>
                <a
                  href="#interactive-blueprint"
                  className="inline-flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-4 rounded-xl transition-all text-sm"
                >
                  <span>Launch Blueprint Calculator</span>
                  <ArrowRight className="h-4 w-4 text-emerald-400" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>VCN-Certified Livestock Engineers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Real-Time 2026 Material Costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>36 States Field Deployment</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Quick Blueprint Summary Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white font-heading">
                      Live Blueprint Spec: {capacity.toLocaleString()} {birdType}s
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    Calculated Live
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-slate-800/70 rounded-xl border border-slate-700/60 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Floor Space Required</span>
                    <span className="text-sm font-bold text-white font-mono">
                      {blueprint.totalFloorAreaSqM} m² ({blueprint.totalFloorAreaSqFt.toLocaleString()} sq ft)
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-800/70 rounded-xl border border-slate-700/60 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Pen Dimensions (L × W)</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {blueprint.penDimensions}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-800/70 rounded-xl border border-slate-700/60 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Feeding &amp; Drinker Units</span>
                    <span className="text-sm font-bold text-white">
                      {blueprint.feedersCount} tube / {blueprint.drinkersCount} bell
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-800/70 rounded-xl border border-slate-700/60 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Ventilation Specification</span>
                    <span className="text-xs font-bold text-slate-200">
                      0.9m wall + 2.1m mesh
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#interactive-blueprint"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-xs font-bold text-white hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md"
                  >
                    <span>Customize Dimensions &amp; Submit Details</span>
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
          PROBLEM SECTION: COSTLY PEN ARCHITECTURE PITFALLS
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            Structural Pitfalls in Nigerian Farm Construction
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Why 68% of New Poultry Houses in Nigeria Trigger Chronic Flock Losses
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Most local bricklayers build poultry houses like residential buildings. Without veterinary thermodynamic specifications, your building becomes an incubator for respiratory disease and heat stress.
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
                Financial Impact: {p.impact}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          INFORMATION GAIN MATRIX: SETUP COST & SPECIFICATIONS (NIGERIA 2026)
          ==================================================================== */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              Empirical Construction Economics
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Commercial Poultry Farm Setup Cost &amp; Specification Matrix (Nigeria 2026)
            </h2>
            <p className="text-sm text-slate-600">
              Audited structural estimates, space requirements, and working capital budgets based on verified current Nigerian building commodity prices (sand, granite, 42.5R cement, timber, 0.45mm aluminum roofing).
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-heading">
                  <th className="p-4 sm:p-5 font-bold">Farm Capacity &amp; System</th>
                  <th className="p-4 sm:p-5 font-bold">Floor Area (m²)</th>
                  <th className="p-4 sm:p-5 font-bold">Recommended Dimensions</th>
                  <th className="p-4 sm:p-5 font-bold">Civil Structure Cost</th>
                  <th className="p-4 sm:p-5 font-bold">Equipment &amp; Plumbing</th>
                  <th className="p-4 sm:p-5 font-bold">Working Capital (Feed/Birds)</th>
                  <th className="p-4 sm:p-5 font-bold">Target Payback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {SETUP_COST_MATRIX.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{row.scale}</td>
                    <td className="p-4 sm:p-5 font-mono">{row.area}</td>
                    <td className="p-4 sm:p-5 font-mono">{row.dimensions}</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-700">{row.structuralCost}</td>
                    <td className="p-4 sm:p-5">{row.equipmentCost}</td>
                    <td className="p-4 sm:p-5">{row.workingCapital}</td>
                    <td className="p-4 sm:p-5 font-semibold text-slate-900">{row.breakeven}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 italic">
            * Costs reflect Southwest and North Central Nigerian averages as of Q1 2026. Excludes agricultural land acquisition and deep borehole drilling.
          </p>
        </div>
      </section>

      {/* ====================================================================
          4-PILLAR FRAMEWORK OF OPERATIONAL EXCELLENCE
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="section-label">
            <Sparkles className="h-3.5 w-3.5" />
            Veterinary Engineering Framework
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            The D-AminGrow 4-Pillar Farm Setup Methodology
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every commercial facility we engineer integrates thermodynamics, veterinary pathology containment, and cash-flow resilience into a turnkey blueprint.
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
          PRESERVED INTERACTIVE BLUEPRINT CALCULATOR & INTAKE FORM
          ==================================================================== */}
      <section id="interactive-blueprint" className="py-16 bg-white border-y border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="section-label">
              <Ruler className="h-3.5 w-3.5 text-emerald-600" />
              Interactive Architectural Planner
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Configure Your Farm Parameters &amp; Generate Preliminary Blueprint
            </h2>
            <p className="text-sm text-slate-600">
              Adjust bird species, stocking volume, and housing design to dynamically calculate floor area, pen dimensions, feeder/drinker requirements, and request full engineering bills of quantities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Cols: Interactive Calculator Controls & Blueprint Output */}
            <div className="lg:col-span-7 space-y-6">
              {/* Control Panel */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 space-y-6">
                <h3 className="text-base font-bold font-heading text-slate-900">
                  1. Configure Livestock Species &amp; System
                </h3>

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
                            ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
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
                    <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
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
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
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
                            ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600'
                            : 'border-slate-200 bg-white hover:bg-slate-100'
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
                    Calculated Engineering Blueprint
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Live Specification
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-slate-500 font-semibold block">Required Pen Floor Area</span>
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
                        {blueprint.cageUnitsCount} sets (96–120 birds per unit)
                      </span>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                      <span className="text-slate-500 font-semibold block">Wall Architecture</span>
                      <span className="text-xs font-bold text-slate-900 block">
                        0.9m dwarf wall + 2.1m mesh to eaves
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-amber-900">
                    <Compass className="h-3.5 w-3.5" />
                    Critical Engineering Mandate:
                  </span>
                  <p>{blueprint.orientation}</p>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Consultation Inquiry Form */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5 sticky top-24">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold font-heading text-slate-900">
                    Request Full BOQ &amp; Farm Site Advisory
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct consultation with our senior poultry engineering desk.
                  </p>
                </div>

                {submitSuccess ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                    <h4 className="text-base font-bold text-emerald-950">Inquiry Received</h4>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Our senior agricultural engineer will review your blueprint parameters for {capacity.toLocaleString()} {birdType}s and connect with you on WhatsApp within 2 hours.
                    </p>
                    <a
                      href={`https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20submitted%20a%20farm%20setup%20blueprint%20for%20${capacity}%20${birdType}s%20in%20${stateLocation}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Chat Immediately on WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
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
                        placeholder="e.g. 08068700074"
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
              Our Farm Setup Advisory May <span className="text-rose-600">Not</span> Be Right For You If...
            </h2>
            <p className="text-sm text-slate-600">
              We engineer commercial agricultural assets designed for 10+ year longevity and institutional biosecurity. We believe in total upfront transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Are Looking For Cheap Temporary Makeshift Sheds
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you intend to use low-grade bamboo poles, palm frond roofing, or uncurtained open dirt floors that cannot be chemically disinfected, our engineering standards will not match your approach.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Refuse to Allocate Working Capital for Feed &amp; Vaccines
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A gorgeous poultry house is useless without sufficient liquidity to feed the flock through to market or first egg. We do not support projects that spend 95% of their capital on buildings and run out of feed cash mid-cycle.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                You Insist on Building Close to Existing Infected Farms
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We will decline advisory on land situated directly adjacent to a multi-age unmonitored commercial farm or downstream from poultry drainage. Biosecurity breaches will inevitably destroy your investment.
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
              Engineering &amp; Setup FAQs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions About Farm Setup in Nigeria
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
            <span>Turnkey Agricultural Engineering Across Nigeria</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Build Your Commercial Poultry Farm on Solid Engineering
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect directly with our senior agricultural engineers and VCN veterinary consultants. Receive turnkey pen blueprints, site-specific BOQs, and equipment procurement plans tailored to your budget.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/2348068700074?text=Hello%20D-AminGrow%2C%20I%20am%20ready%20to%20engineer%20my%20poultry%20farm%20pen."
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
              <span>Call Senior Consultant</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
