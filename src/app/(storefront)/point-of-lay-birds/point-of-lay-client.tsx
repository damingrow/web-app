'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  MessageCircle,
  Truck,
  Phone,
  Feather,
  ChevronRight,
  Clock,
  Sparkles,
  Layers,
  Thermometer,
  XCircle,
  Copy,
  Check,
  TrendingUp,
  Scale,
  Award,
  AlertTriangle,
  Calculator,
  HelpCircle,
  ChevronDown,
  Syringe,
  FileSpreadsheet,
  BookOpen,
  DollarSign,
  Egg,
  Lightbulb,
} from 'lucide-react';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';
import { PolBookingForm } from '@/components/forms/pol-booking-form';
import { CLIENT_FARMS } from '@/data/partners-and-clients';

const VACCINATION_PROGRAM_LOG = [
  { disease: 'Marek’s Disease (HVT)', age: 'Day 1', route: 'Subcutaneous injection at hatchery', status: 'Verified' },
  { disease: 'Newcastle Disease (HB1 / Hitchner B1)', age: 'Day 7', route: 'Ocular / drinking water', status: 'Verified' },
  { disease: 'Infectious Bursal Disease (IBD Gumboro Intermediate)', age: 'Day 10 & Day 18', route: 'Drinking water with skimmed milk stabilizer', status: 'Verified' },
  { disease: 'Newcastle Disease (LaSota First Booster)', age: 'Day 24', route: 'Drinking water', status: 'Verified' },
  { disease: 'Fowl Pox (Pox Chick Embryo Origin)', age: 'Week 6', route: 'Wing-web puncture with double-needle', status: 'Verified' },
  { disease: 'Infectious Bronchitis (IB H120 Booster)', age: 'Week 8', route: 'Drinking water', status: 'Verified' },
  { disease: 'Infectious Coryza (Inactivated Bacterin)', age: 'Week 12', route: 'Intramuscular breast injection', status: 'Verified' },
  { disease: 'Egg Drop Syndrome (EDS 76 + ND Inactivated)', age: 'Week 15 – 16', route: 'Intramuscular pre-lay booster injection', status: 'Verified' },
];

interface PolBreedItem {
  id: string;
  name: string;
  strain: string;
  ageBracket: string;
  targetWeight: string;
  eggPotential: string;
  peakLayRate: string;
  shellQuality: string;
  feedIntake: string;
  estimatedRatePerBird: number;
  image: string;
  badge: string;
  desc: string;
}

const POL_BREED_CATALOG: PolBreedItem[] = [
  {
    id: 'isa-brown',
    name: 'Commercial ISA Brown Pullets',
    strain: 'Certified Primary ISA Brown Genetics',
    ageBracket: '16–18 Weeks Old',
    targetWeight: '1.45kg – 1.60kg body weight',
    eggPotential: '310 – 325 rich brown eggs / hen',
    peakLayRate: '94% – 96% peak production',
    shellQuality: 'Thick brown eggshell with uniform pigmentation',
    feedIntake: '110g – 115g per bird / day at full lay',
    estimatedRatePerBird: 14500,
    image: '/products/Chicks/Point of Lay.jpeg',
    badge: 'Nigeria’s #1 Commercial Layer',
    desc: 'The undisputed benchmark for commercial brown egg production in Nigeria. Renowned for calm pen temperament, high feed efficiency, and persistent 72-week lay cycles.',
  },
  {
    id: 'hy-line-brown',
    name: 'Commercial Hy-Line Brown Pullets',
    strain: 'Certified Primary Hy-Line Genetic Line',
    ageBracket: '16–18 Weeks Old',
    targetWeight: '1.42kg – 1.58kg body weight',
    eggPotential: '315 – 330 dense brown eggs / hen',
    peakLayRate: '95% – 97% peak production',
    shellQuality: 'Superior fracture resistance and internal albumen height',
    feedIntake: '108g – 112g per bird / day at full lay',
    estimatedRatePerBird: 14500,
    image: '/products/Chicks/Pullet day old.jpeg',
    badge: 'High Shell Fracture Resistance',
    desc: 'Engineered for exceptional eggshell breaking strength, reduced cracked egg losses during transport, and outstanding livability under tropical Nigerian temperatures.',
  },
  {
    id: 'dominant-black',
    name: 'Zartech & Dominant Black Layers',
    strain: 'Hardy Commercial Tinted/Brown Strains',
    ageBracket: '17–18 Weeks Old',
    targetWeight: '1.50kg – 1.70kg body weight',
    eggPotential: '290 – 310 large tinted eggs / hen',
    peakLayRate: '90% – 93% peak production',
    shellQuality: 'Medium-dark brown to tinted firm shells',
    feedIntake: '115g – 122g per bird / day at full lay',
    estimatedRatePerBird: 14000,
    image: '/products/Chicks/point-of-lay.jpeg',
    badge: 'Rugged Semi-Intensive Resilience',
    desc: 'Highly resilient dual-hardiness layer pullets well suited for open-sided deep litter pens and farmers seeking robust natural disease resistance.',
  },
];

const FAQS = [
  {
    q: 'How much are point-of-lay birds in Nigeria today?',
    a: 'In Nigeria, vaccinated 16–18 week commercial point-of-lay pullets generally range between ₦13,500 and ₦15,000 per bird depending on the breed (ISA Brown, Hy-Line Brown, Dominant Black), current age, and feed costs incurred during rearing. Prices reflect full viral immunization, 16 weeks of professional feed management, and verified body weight standards (1.45kg–1.60kg). Exact batch quotes are confirmed via our WhatsApp desk.',
  },
  {
    q: 'When do 16–18 week point-of-lay pullets start laying eggs?',
    a: 'When healthy 16–18 week pullets are moved into well-ventilated battery cages or deep-litter pens with correct 14-to-16 hour lighting and clean layer mash, the first "point eggs" (pullet eggs) typically appear within 14 to 28 days (at 19–21 weeks of age). The flock reaches 50% production by weeks 22–24 and ramps up to 90%+ peak production around weeks 26–30.',
  },
  {
    q: 'What is the minimum order quantity (MOQ) for point-of-lay birds?',
    a: 'The minimum order quantity is 50 birds, which fills 5 standard commercial plastic poultry crates (10 birds per crate). We do not dispatch retail quantities below 50 birds because specialized crate logistics require dedicated compartment spacing to prevent heat stress and road mortality.',
  },
  {
    q: 'How does the 50% commitment deposit protect my flock reservation?',
    a: 'Point-of-lay pullets are grown in biosecure pen batches under veterinary monitoring. Because mature birds cannot be held indefinitely in grower pens without initiating laying, farms only crate and allocate birds to confirmed reservations. A 50% commitment deposit transferred to our corporate Zenith Bank account (1017894562, D-AminGrow Agric Ltd) locks your crate allocation. The remaining balance clears prior to vehicle departure on dispatch day.',
  },
  {
    q: 'What vaccinations have the birds received before delivery?',
    a: 'Every batch undergoes a complete 16-week viral immunization schedule: subcutaneous Marek’s HVT at hatch; Gumboro (IBD) on Days 10 and 18; Newcastle (HB1, LaSota, and Week 8 booster); Fowl Pox (wing-web puncture); Infectious Bronchitis (IB Mass); Infectious Coryza; and an inactivated Egg Drop Syndrome (EDS + ND) oil-emulsion injection at weeks 15–16. A signed veterinary administration card accompanies every delivery.',
  },
  {
    q: 'How are point-of-lay birds transported safely across states?',
    a: 'Mature pullets are transported in specialized heavy-duty ventilated plastic poultry crates holding exactly 10 birds each. Transit vehicles depart exclusively during cool evening or early dawn hours to eliminate tropical heat stress. We coordinate direct farm gate deliveries across Oyo, Ogun, Osun, Lagos, Ondo, Ekiti, Edo, Delta, Kwara, and Abuja transport corridors.',
  },
  {
    q: 'What should I prepare in my pens before the point-of-lay birds arrive?',
    a: 'Ensure your battery cages or deep-litter pens have been washed with disinfectant and rested for at least 7 days. Check all nipple drinkers for proper water pressure. Fill drinkers with fresh water containing anti-stress vitamins and electrolytes 2 hours before bird placement. Provide Grower/Pre-lay mash on day 1, and gradually transition to 16.5%–17.5% crude protein Layer Mash over a 7-day period.',
  },
  {
    q: 'What happens if a bird dies during transport to my farm?',
    a: 'Transit mortality is rare when birds are crated at 10 birds per crate during cool hours. In the rare event of transit mortality, birds are inspected directly during crate offloading at your farm. Record a continuous video of the uncrating process showing intact vehicle seals and dead birds to receive immediate compensation or credit adjustments.',
  },
];

export default function PointOfLayClient() {
  const [copiedBank, setCopiedBank] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedBreedId, setSelectedBreedId] = useState('isa-brown');
  const [birdCount, setBirdCount] = useState<number>(100);

  const handleCopyBank = () => {
    navigator.clipboard.writeText('1017894562');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const selectedBreed = POL_BREED_CATALOG.find((b) => b.id === selectedBreedId) ?? POL_BREED_CATALOG[0]!;
  const cratesCount = Math.ceil(birdCount / 10);
  const estimatedCost = birdCount * selectedBreed.estimatedRatePerBird;
  const depositRequired = estimatedCost * 0.5;

  return (
    <div className="font-body text-slate-800">
      {/* ====================================================================
          1. HERO SECTION (HOMEPAGE 2-GRID 12-COLUMN ARCHITECTURE: 7 + 5)
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-[#05130b] to-slate-900 border-b border-emerald-950/40">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[350px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 sm:mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <Link href="/day-old-chicks" className="hover:text-emerald-400 transition-colors">Commercial Poultry</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-emerald-400 font-medium">Point-of-Lay Birds for Sale</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column (7 Cols): Conversion-focused value proposition */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-4 py-1.5 rounded-full">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Leading Agro-Allied Company in Nigeria
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
                  <Egg className="h-3.5 w-3.5 text-amber-400" />
                  Eggs in 14–28 Days &bull; Fully Vaccinated
                </span>
              </div>

              {/* Exact H1 Directive */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                Point-of-Lay Birds for Sale in Nigeria:{' '}
                <span className="text-gradient-green">16–18 Weeks Vaccinated Pullets</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Bypass 16 weeks of expensive feed bills, brooding heating costs, and early chick mortality. Stock verified <strong className="text-white font-semibold">16 weeks pullets</strong> and <strong className="text-white font-semibold">18 weeks layers</strong> with certified 1.45kg–1.60kg body weights, complete viral vaccination records, and proven 310–325 brown egg potential per hen. Reared under strict veterinary biosecurity and dispatched in specialized 10-bird crates across Nigeria.
              </p>

              {/* Value Signal Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {[
                  { label: 'Fully Vaccinated', sub: 'Marek’s, ND, IBD, EDS' },
                  { label: '1.45kg–1.60kg Weight', sub: 'Pelvic bone verified' },
                  { label: 'Bypassed Brooding', sub: 'Zero week 0–6 loss' },
                  { label: '10 Birds / Crate', sub: 'Ventilated night transit' },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-white/5 border border-white/10 p-2.5 sm:p-3 text-left">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.sub}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20inquire%20about%20available%2016-18%20weeks%20Point-of-Lay%20pullet%20batches%20and%20rates."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl text-base shadow-xl shadow-[#25D366]/20 hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" />
                  <span>Reserve Via WhatsApp Desk</span>
                </a>
                <a
                  href="#booking-section"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 hover:-translate-y-0.5 transition-all text-sm"
                >
                  <span>Fill Crate Allotment Form</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Brand Slogan */}
              <p className="text-xs text-slate-400 italic">
                &ldquo;Your satisfaction is our priority&rdquo; &mdash; D-AminGrow Agro-Allied Solution Center
              </p>
            </div>

            {/* Right Column (5 Cols): Live Video Footage & Batch Health Card */}
            <div className="lg:col-span-5 space-y-4">
              <MediaVideoPlayer
                src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/AMO%20pullets.mp4"
                poster="/products/Chicks/Point of Lay.jpeg"
                title="Accredited 16–18 Weeks Point-of-Lay Pen Audit"
                badge="Pre-Lay Inspection"
                caption="Uniform ISA Brown pullets reaching 1.5kg body weight and ready for caging"
                aspectRatio="video"
              />

              <div className="rounded-3xl bg-slate-900/90 border border-emerald-500/30 p-5 shadow-2xl backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Active Pen Allocation Queue
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                    Week 16–18 Batch
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 block text-[11px]">Egg Laying Window</span>
                    <strong className="text-white font-bold text-sm block mt-0.5">14–28 Days Post-Arrival</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 block text-[11px]">Minimum Order</span>
                    <strong className="text-white font-bold text-sm block mt-0.5">50 Birds (5 Crates)</strong>
                  </div>
                </div>

                {/* Bank Account Quick Reference */}
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Bank Allotment Account:</span>
                    <span className="font-bold text-emerald-400">Zenith Bank Plc</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                    <span className="font-mono text-sm font-extrabold text-emerald-300">1017894562</span>
                    <button
                      type="button"
                      onClick={handleCopyBank}
                      className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      {copiedBank ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedBank ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Account Name: <strong className="text-slate-200">D-AminGrow Agric Ltd</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. EMOTIONALLY COMPELLING HOOK & ECONOMIC ADVANTAGE
          ==================================================================== */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
                  Cashflow Economics
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-2">
                  Why Savvy Poultry Investors Choose Point-of-Lay Over Day-Old Chicks
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 md:text-right">
                <span>Start Egg Revenues in </span>
                <strong className="text-slate-900 font-bold">2 to 4 Weeks</strong>
              </div>
            </div>

            <p className="text-base text-slate-700 leading-relaxed max-w-4xl">
              Rearing day-old pullets to maturity requires 16 to 18 weeks of continuous capital expenditure: expensive chick mash, charcoal or gas brooder heaters, 8 separate rounds of viral vaccines, and four months of labor before a single egg is collected. During this period, accidental chilling, Gumboro breaks, or power cuts can wipe out 15% to 25% of your flock. By stocking 16–18 week Point-of-Lay birds, all brooding risks and feed compounding are completely eliminated. You step straight into commercial egg cashflow.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">Time to First Egg Collection</span>
                <strong className="text-xl font-bold font-heading text-slate-900 mt-1 block">14 – 28 Days</strong>
                <span className="text-[11px] text-emerald-700">Instead of 130+ days from day-old</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">Early Brooding Mortality Avoided</span>
                <strong className="text-xl font-bold font-heading text-slate-900 mt-1 block">Zero Week 0–6 Loss</strong>
                <span className="text-[11px] text-emerald-700">All vulnerable growth stages bypassed</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">Expected 72-Week Production</span>
                <strong className="text-xl font-bold font-heading text-slate-900 mt-1 block">310 – 325 Eggs/Hen</strong>
                <span className="text-[11px] text-emerald-700">94%+ peak lay persistence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. PROBLEM EXPLANATION: THE ANATOMY OF POINT-OF-LAY SCAMS
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-4 py-1.5 rounded-full">
              Industry Pitfalls
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The Costly Traps of Unregulated Point-of-Lay Sourcing
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              The open market for point-of-lay pullets in Nigeria is fraught with fraudulent age manipulation and disease transmission that cripples smallholder and commercial egg margins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-200/80 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">
                Age Inflation: Selling 12-Week Birds as 16 Weeks
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unscrupulous brokers purchase stunted 12-week growers weighing barely 1.0kg–1.1kg and market them as &ldquo;ready-to-lay 16-week pullets&rdquo;. When the birds arrive, you spend an extra 6 to 8 weeks feeding them grower mash at massive financial loss before they lay a single egg.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-200/80 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">
                Omitted EDS &amp; Coryza Oil Boosters
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Inactivated viral oil vaccines (like Egg Drop Syndrome and Infectious Coryza) require expensive labor and individual bird injection at weeks 14–16. Low-grade rearers omit these vaccines to save costs, leaving your flock vulnerable to soft-shelled eggs and facial swelling when production peaks.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-200/80 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">
                Flock Weight Heterogeneity (&lt;70% Uniformity)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Poor feeder space during the growing stage creates a mixed flock where 40% of birds are underweight runts. Because underweight birds lack sufficient calcium storage in medullary bone, they suffer fatal egg prolapse (egg-bound hens) the moment they attempt to lay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. WHY MOST PREPARED LAYER ENTERPRISES MISS PEAK YIELDS
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-700 bg-slate-100 px-4 py-1.5 rounded-full">
                Management Diagnosis
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                Why Unprepared Layer Enterprises Miss Peak Egg Yields
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Even with healthy 16-week pullets, four critical operational mistakes during the first 14 days post-placement can permanently suppress peak lay percentages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold font-heading text-base">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Mistake 1: Abrupt Feed Switch to Layer Mash
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Layer mash contains 3.8% to 4.2% calcium. Feeding high-calcium layer mash immediately to immature 16-week pullets causes severe kidney damage, visceral gout, and watery diarrhea. Pullets need Grower or Pre-Lay mash until 5% of the pen begins laying.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold font-heading text-base">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Mistake 2: Light Stimulation Before Target Weight
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Increasing light duration to 16 hours before birds reach 1.45kg body weight triggers premature sexual maturity. The result is a surge of tiny, unsellable pullet eggs and permanent flock stunting with peak lay never surpassing 78%.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold font-heading text-base">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Mistake 3: Midday Transit in Direct Sunlight
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Moving fully-feathered mature pullets during hot afternoon hours causes hyperthermia, heat stroke, and acute respiratory acidosis. Birds must be crated and driven exclusively during evening or dawn hours.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold font-heading text-base">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Mistake 4: Missing Anti-Stress Electrolyte Flush
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Caging shock and vehicle vibration deplete electrolytes. Failing to administer water-soluble vitamins and electrolytes for the first 3 days post-delivery prolongs pen adaptation and delays oviduct development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. THE D-AMINGROW BIOSECURE REARING STANDARD
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              The D-AminGrow Protocol
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The Biosecure Rearing Standard: Certified 16–18 Weeks Pullets
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Every point-of-lay batch reared under our partner breeding facilities adheres to precise clinical standards designed to safeguard your capital investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Scale,
                title: '1.45kg–1.60kg Certified Weight',
                desc: 'Flock weight sampling confirms 85%+ uniformity before any batch is cleared for dispatch. No underweight runts allowed.',
              },
              {
                icon: Syringe,
                title: 'Complete 8-Phase Prophylaxis',
                desc: 'Full viral schedule completed under veterinary oversight, including Marek’s, Gumboro, Fowl Pox, Coryza, and pre-lay EDS boosters.',
              },
              {
                icon: Truck,
                title: '10-Bird Crate Integrity',
                desc: 'Transported exclusively in ventilated plastic poultry crates holding 10 birds each to eliminate overcrowding and bone injury.',
              },
              {
                icon: FileSpreadsheet,
                title: 'Signed Veterinary Logbook',
                desc: 'Every dispatch includes an official vaccination certificate signed by our resident livestock veterinarian for your farm records.',
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-slate-50 border border-slate-200 p-6 space-y-4 hover:shadow-lg transition-all hover:-translate-y-1 group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. SERVICE DELIVERABLES & COMMERCIAL BREED CATALOG
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200" id="breed-catalog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
                Commercial Breeds &amp; Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Point-of-Lay Strains Available for Farm Reservation
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Review technical performance specifications and estimated rates for 16–18 week commercial brown and black layer pullets.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm shrink-0">
              <Egg className="h-4 w-4 text-emerald-700" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                Minimum Order: 50 Birds (5 Crates)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {POL_BREED_CATALOG.map((breed) => (
              <div
                key={breed.id}
                className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 space-y-5 flex flex-col justify-between hover:shadow-xl hover:border-emerald-300 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      {breed.ageBracket}
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                      {breed.badge}
                    </span>
                  </div>

                  <div className="w-full h-48 relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <Image
                      src={breed.image}
                      alt={`${breed.name} in nigeria`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {breed.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Strain: <span className="text-slate-800">{breed.strain}</span>
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      {breed.desc}
                    </p>
                  </div>

                  {/* Pricing Pill */}
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-emerald-900 font-semibold">Estimated Rate / Bird:</span>
                      <strong className="text-lg font-extrabold text-emerald-900 font-heading">
                        ₦{breed.estimatedRatePerBird.toLocaleString()}
                      </strong>
                    </div>
                    <div className="text-[11px] text-slate-500 pt-0.5">
                      Standard Crate: <strong className="text-slate-700">10 mature birds per crate</strong>
                    </div>
                  </div>

                  {/* Benchmark Specs */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Target Body Weight:</span>
                      <strong className="text-slate-900 font-semibold">{breed.targetWeight}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Egg Yield Potential:</span>
                      <strong className="text-slate-900 font-semibold">{breed.eggPotential}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Peak Lay Capacity:</span>
                      <strong className="text-slate-900 font-semibold">{breed.peakLayRate}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Layer Feed Intake:</span>
                      <strong className="text-slate-900 font-semibold">{breed.feedIntake}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <a
                    href="#booking-section"
                    onClick={() => setSelectedBreedId(breed.id)}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Select &amp; Estimate Batch</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Complete Vaccination History Accordion Card */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Full Clinical Prophylaxis
                </span>
                <h3 className="text-xl font-bold font-heading text-slate-900 mt-2">
                  Complete 16-Week Vaccination &amp; Medication History Log
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Administered under continuous cold-chain refrigeration and verified by our veterinary health officers.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-xl w-fit">
                8 Documented Rounds
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 uppercase font-bold text-[11px]">
                    <th className="py-3 px-4">Disease Prophylaxis</th>
                    <th className="py-3 px-4">Administration Age</th>
                    <th className="py-3 px-4">Administration Route</th>
                    <th className="py-3 px-4">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {VACCINATION_PROGRAM_LOG.map((vax, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{vax.disease}</td>
                      <td className="py-3 px-4 text-emerald-800 font-semibold">{vax.age}</td>
                      <td className="py-3 px-4 text-slate-600">{vax.route}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-3 w-3" />
                          {vax.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. PROCESS BREAKDOWN: 5-STEP BOOKING & CRATE DELIVERY TIMELINE
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Transparent Logistics
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              The 5-Step Farm Inspection, Reservation &amp; Crate Delivery Timeline
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              From pen capacity confirmation to evening vehicle transit, here is our standardized delivery workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Inquiry & Pen Audit',
                desc: 'Select breed, required bird count (min 50 birds), and confirm battery cage or deep-litter pen readiness with our desk.',
                icon: Layers,
              },
              {
                step: '02',
                title: '50% Commitment Deposit',
                desc: 'Transfer 50% reservation deposit to Zenith Bank (1017894562, D-AminGrow Agric Ltd) to lock your crates on the rearing schedule.',
                icon: DollarSign,
              },
              {
                step: '03',
                title: 'Pre-Transit Pelvic Weight Audit',
                desc: 'Birds undergo weight sampling and individual pelvic bone checks. Any bird falling under 1.40kg is excluded from the batch.',
                icon: Scale,
              },
              {
                step: '04',
                title: 'Evening 10-Bird Crate Loading',
                desc: 'Birds are crated 10 per ventilated box during cool evening hours to eliminate heat stress during road transit.',
                icon: Truck,
              },
              {
                step: '05',
                title: 'Farm Gate Handover & Hydration',
                desc: 'Birds arrive at your farm. Conduct uncrating inspection, administer anti-stress electrolyte water, and begin pre-lay feeding.',
                icon: Egg,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-slate-50 border border-slate-200 p-6 space-y-4 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-extrabold font-heading text-emerald-700/80">
                        {item.step}
                      </span>
                      <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. 3 UNIQUE INFORMATION GAIN SECTIONS
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-[#041008] text-white border-b border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-4 py-1.5 rounded-full">
              Field Veterinary Intel
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              3 Information Gain Protocols for Point-of-Lay Buyers
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Standard middlemen omit these biological realities. Here is what commercial layer managers inspect prior to caging.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Gain 1 */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-7 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Scale className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">
                  The Pelvic Pin-Bone &amp; Vent Elasticity Audit
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Never accept a point-of-lay pullet by feathers alone. Place your fingers between the pubic pin bones beneath the vent. An immature bird measures barely 1 finger width (rigid and tight). A true 16–18 week pullet ready for egg development accommodates 2 to 2.5 fingers, and 3 fingers at first lay. The vent should appear large, moist, and oval—not dry, puckered, or small.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-emerald-300">
                <strong>Field Test:</strong> Sample 10 random birds upon uncrating. If more than 2 show a tight 1-finger gap, the batch is younger than 15 weeks.
              </div>
            </div>

            {/* Info Gain 2 */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-7 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">
                  Cost-Benefit: Day-Old vs Direct POL Placement
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Raising a day-old chick to 18 weeks consumes approximately 6.5kg–7.0kg of starter and grower feed (₦6,200–₦7,000 in feed alone), plus ₦3,500 initial chick cost, ₦1,200 vaccines/biosecurity, and 12% average brooding mortality. The true realized cost of self-reared pullets reaches ₦13,000–₦14,500 per surviving bird—without factoring in 18 weeks of labor and electricity. Purchasing POL transfers all rearing risk to the breeder.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-amber-300">
                <strong>Financial Reality:</strong> Point-of-lay eliminates 120 days of non-revenue overhead, putting you into egg profits immediately.
              </div>
            </div>

            {/* Info Gain 3 */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-7 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">
                  The 14-Day Nutritional &amp; Lighting Synchronization
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Maintain the rearing pen lighting schedule (typically 12 hours) for the first 7 days after arrival to avoid premature oviduct stimulation while birds adjust to new cages. Once birds reach 1.50kg average weight, increase lighting by 30 minutes weekly until reaching 16 hours daily. Introduce oyster shell grit or Pre-Lay mash (2.0%–2.5% calcium) only when comb and wattle redness brightens.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-blue-300">
                <strong>Critical Rule:</strong> Never decrease day length during the egg laying cycle; even a 1-hour drop triggers flock molting and stops lay.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. "WE MAY NOT BE RIGHT FOR YOU IF..." (HONEST QUALIFICATION)
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-4 py-1.5 rounded-full">
                Expectation Setting
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                When D-AminGrow Point-of-Lay Pullets May Not Be Right for You
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                To guarantee zero disease transfer, verified pubic bone maturity, and 100% vaccination compliance, we adhere to commercial standards that do not fit every casual buyer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'If You Need Retail Quantities Below 50 Birds',
                  desc: 'We do not sell 5, 10, or 20 loose birds. Mature pullets require specialized 10-bird plastic crates and dedicated transport compartment spacing to prevent heat mortality.',
                },
                {
                  title: 'If You Require Unreserved Pay-on-Delivery (POD)',
                  desc: 'Rearing farms cannot crate and dispatch live, highly-vaccinated mature pullets on credit. All bookings require a verified 50% commitment deposit to Zenith Bank before crate loading.',
                },
                {
                  title: 'If Your Pen or Cages Are Not Disinfected and Ready',
                  desc: 'Point-of-lay pullets cannot wait in crates while you clean cages. Housing must be disinfected and drinkers tested at least 48 hours prior to vehicle arrival.',
                },
                {
                  title: 'If You Are Looking for Cheap Off-Grade Culls',
                  desc: 'We supply exclusively certified first-generation ISA Brown and Hy-Line lineages with documented weights. We do not trade in exhausted spent layers or mixed runts.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-rose-50/50 border border-rose-200/70">
                  <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 font-heading">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. CASE STUDY & VERIFIED COMMERCIAL LAYER RESULTS
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Field Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Verified Production Records From Nigerian Commercial Layer Operators
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Read verified layer farm reports detailing peak lay ramp-up, daily egg crate yields, and crate delivery reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLIENT_FARMS.map((farm) => {
              const flockBadge = (farm.flockType ?? '').split('&')[0]?.trim() ?? farm.flockType;
              return (
                <div
                  key={farm.id}
                  className="rounded-3xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-300 hover:bg-white transition-all group hover:shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                        {flockBadge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{farm.relationshipYears}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors">
                      {farm.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{farm.location}</span>
                    </p>
                    <p className="text-xs text-slate-600 italic leading-relaxed pt-2 border-t border-slate-200">
                      &ldquo;{farm.testimonialSnippet}&rdquo;
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span>Pen Capacity</span>
                    <strong className="text-slate-800 font-bold">{farm.flockCapacity}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <span>Explore full farmer testimonials and verified harvest reviews</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          11. EMBEDDED INTERACTIVE POINT-OF-LAY RESERVATION FORM
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-100/80 border-b border-slate-200" id="booking-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Live Allocation Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Submit Your Point-of-Lay Crate Reservation
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Calculate crate counts, select your preferred brown or white layer breed, and lock in your delivery slot with verified 50% commitment deposit protection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Quick Batch Calculator & Allotment Estimator */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold font-heading text-slate-900">
                    Flock Batch Estimator
                  </h3>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                    10 Birds / Crate
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="breed-select" className="text-xs font-bold text-slate-700 block mb-2">Select Layer Strain</label>
                    <select
                      id="breed-select"
                      value={selectedBreedId}
                      onChange={(e) => setSelectedBreedId(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900 bg-slate-50 focus:border-emerald-500 focus:bg-white transition-all"
                    >
                      {POL_BREED_CATALOG.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} (₦{b.estimatedRatePerBird.toLocaleString()} / bird)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="bird-count" className="text-xs font-bold text-slate-700 block mb-2">Number of Birds Needed (Min 50)</label>
                    <input
                      id="bird-count"
                      type="number"
                      min="50"
                      step="10"
                      value={birdCount}
                      onChange={(e) => setBirdCount(Math.max(50, parseInt(e.target.value) || 50))}
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900 bg-slate-50 focus:border-emerald-500 focus:bg-white transition-all"
                    />
                    <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                      <span>Requires: <strong>{cratesCount} Plastic Crates</strong></span>
                      <span>Target Weight: <strong>1.45kg–1.60kg</strong></span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-400">Estimated Total Cost:</span>
                      <strong className="text-lg font-bold text-white font-heading">
                        ₦{estimatedCost.toLocaleString()}
                      </strong>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                      <span className="text-xs text-emerald-400 font-semibold">50% Commitment Deposit:</span>
                      <strong className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-heading">
                        ₦{depositRequired.toLocaleString()}
                      </strong>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1">
                      Balance cleared on delivery day prior to vehicle offloading.
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Card */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <MessageCircle className="h-4 w-4 text-emerald-700" />
                  <span>Prefer Direct WhatsApp Coordination?</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Message our livestock sales desk directly with your farm location and desired delivery week.
                </p>
                <a
                  href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20book%20${birdCount}%20Point-of-Lay%20pullets%20(${selectedBreed.name}).%20Required%20deposit%20is%20NGN%20${depositRequired.toLocaleString()}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat With Farm Manager Now</span>
                </a>
              </div>
            </div>

            {/* Right: Embedded Interactive PolBookingForm */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl">
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Official Reservation Engine
                  </span>
                  <h3 className="text-xl font-bold font-heading text-slate-900 mt-0.5">
                    Point-of-Lay Allocation Form
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out your crate requirements, preferred strain, and delivery state for instant proforma confirmation.
                  </p>
                </div>
                <PolBookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          12. FAQ ACCORDION (SCHEMA SYNCHRONIZED)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200" id="faqs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions About Point-of-Lay Birds in Nigeria
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Transparent answers regarding age verification, vaccination cards, crate transport, and egg laying timelines.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? 'border-emerald-500 bg-emerald-50/20 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-emerald-700 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          13. SOFT CLOSING CTA & CORPORATE BANK ALLOTMENT CARD
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-[#06170d] to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-4 py-1.5 rounded-full">
                Locked Crate Allocation
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
                Lock Your 16–18 Weeks Point-of-Lay Allotment &amp; Begin Egg Cashflow
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Connect directly with our commercial livestock desk. We confirm available batch dates, verify crate quantities across Oyo, Ogun, Osun, Lagos, and Abuja, and coordinate your farm gate delivery.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20am%20ready%20to%20lock%20my%20Point-of-Lay%20birds%20booking%20and%20transfer%20my%2050%25%20commitment%20deposit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl text-base shadow-xl shadow-[#25D366]/20 hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp Booking Desk</span>
                </a>
                <a
                  href="tel:+2348139169402"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 hover:-translate-y-0.5 transition-all text-sm"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call +234 813 916 9402</span>
                </a>
              </div>
            </div>

            {/* Corporate Bank Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white/10 border border-white/15 p-6 sm:p-8 space-y-4 backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Official Corporate Account
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">Zenith Bank Plc</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Account Number</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-wider">
                      1017894562
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyBank}
                      className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/20 hover:bg-emerald-500/30 px-3 py-1.5 rounded-lg border border-emerald-500/40 transition-all"
                    >
                      {copiedBank ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedBank ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
                <div className="text-xs text-slate-300 pt-2 border-t border-white/10 space-y-1">
                  <div>Account Name: <strong className="text-white">D-AminGrow Agric Ltd</strong></div>
                  <div>Branch: <span className="text-slate-300">Commercial Agribusiness Division</span></div>
                  <div className="text-amber-300 text-[11px] pt-1">
                    * Please specify your farm name and crate count in payment narration.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          14. INTERNAL LINKING & TECHNICAL RESOURCES HUB
          ==================================================================== */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-base font-bold font-heading text-slate-900">
                Explore Commercial Poultry Operations
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Access calibrated brooding guides, layer egg calculators, and day-old chick booking hubs.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/day-old-chicks/pullets"
                className="text-xs font-semibold text-slate-700 bg-white hover:text-emerald-700 hover:border-emerald-300 border border-slate-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Day-Old Pullets Price
              </Link>
              <Link
                href="/day-old-chicks/broilers"
                className="text-xs font-semibold text-slate-700 bg-white hover:text-emerald-700 hover:border-emerald-300 border border-slate-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Commercial Broilers
              </Link>
              <Link
                href="/day-old-chicks"
                className="text-xs font-semibold text-slate-700 bg-white hover:text-emerald-700 hover:border-emerald-300 border border-slate-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Day-Old Chicks Hub
              </Link>
              <Link
                href="/vaccination-program"
                className="text-xs font-semibold text-slate-700 bg-white hover:text-emerald-700 hover:border-emerald-300 border border-slate-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Vaccination Calendar
              </Link>
              <Link
                href="/reviews"
                className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 border border-emerald-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Farmer Testimonials
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
