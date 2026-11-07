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
  Layers,
  Thermometer,
  XCircle,
  Copy,
  Check,
  Scale,
  DollarSign,
  ChevronDown,
  Syringe,
  FileSpreadsheet,
} from 'lucide-react';
import { HATCHERY_PARTNERS, CLIENT_FARMS } from '@/data/partners-and-clients';
import ChickBookingForm from './chick-booking-form';

export interface ChicksClientProps {
  nextMonday: string;
  nextThursday: string;
}

interface BreedOverview {
  id: string;
  title: string;
  category: string;
  badge: string;
  image: string;
  href: string;
  popularStrains: string;
  targetMetric: string;
  broodingPeriod: string;
  moq: string;
  description: string;
  highlights: string[];
}

const BREED_CATALOG: BreedOverview[] = [
  {
    id: 'broilers',
    title: 'Commercial Broiler Chicks',
    category: 'Rapid Meat Production',
    badge: 'Fastest 6-Week Growth',
    image: '/products/Chicks/day old broiler.jpeg',
    href: '/day-old-chicks/broilers',
    popularStrains: 'Ross 308, Cobb 500, Arbor Acres Plus',
    targetMetric: '2.2kg – 2.8kg harvest weight at 42–49 days',
    broodingPeriod: '3–4 weeks brooding; 6–7 weeks slaughter',
    moq: '1 carton (50 + 1 bonus chick)',
    description:
      'Premier heavy-yield commercial broilers selected for superior feed conversion ratio (1.60–1.75 FCR), high breast meat yield, and proven tropical heat tolerance.',
    highlights: [
      '50+1 packaging livability buffer',
      'Pre-vaccinated for Marek’s Disease (HVT)',
      'Sub-1.75 commercial feed conversion',
      'Direct Chi, Amo & Zartech allocations',
    ],
  },
  {
    id: 'pullets',
    title: 'Commercial Layer Pullets',
    category: 'Egg Production',
    badge: '310–325 Eggs / Hen / Cycle',
    image: '/products/Chicks/Pullet day old.jpeg',
    href: '/day-old-chicks/pullets',
    popularStrains: 'ISA Brown, Hy-Line Brown, Zartech Black Shaver',
    targetMetric: '94%–96% peak egg production at 26–30 weeks',
    broodingPeriod: '6–8 weeks brooding; 17–18 weeks to point-of-lay',
    moq: '1 carton (50 + 1 bonus chick)',
    description:
      'First-generation commercial layer pullets engineered for prolonged persistence, strong brown eggshell density, calm pen temperament, and exceptional 72-week lay cycles.',
    highlights: [
      '98%+ vent sexing accuracy guarantee',
      'Point-of-lay entry from 18th week',
      'High persistence above 80% past 60 weeks',
      'Low body maintenance feed requirement',
    ],
  },
  {
    id: 'turkeys',
    title: 'Foreign Hybrid & Local Turkeys',
    category: 'High-Value Festive Meat',
    badge: 'Heavyweight Festive Sizing',
    image: '/products/Chicks/Day old Turkey.jpeg',
    href: '/day-old-chicks/turkeys',
    popularStrains: 'Nicholas White, Hybrid Converter, Local Foreign',
    targetMetric: '12kg – 18kg toms at 18–22 weeks',
    broodingPeriod: '5–6 weeks intensive temperature brooding',
    moq: '1 carton (30 vigorous poults)',
    description:
      'Robust day-old turkey poults with thick bone structure, wide breast development, and high commercial weight return for festive Easter and Christmas market cycles.',
    highlights: [
      'Rigid 30-poult carton configuration',
      'Strict navel closure audit before box seal',
      'Massive 14kg–18kg mature tom potential',
      'High meat-to-bone harvest ratio',
    ],
  },
  {
    id: 'noilers-cockerels',
    title: 'Dual-Purpose Noilers & Cockerels',
    category: 'Free-Range & Hardy Rural Farming',
    badge: 'Extreme Tropical Hardiness',
    image: '/products/Chicks/Day old duck.jpeg',
    href: '/day-old-chicks',
    popularStrains: 'AMO Noiler, White & Black Cockerels',
    targetMetric: '2.5kg – 3.2kg meat or persistent backyard eggs',
    broodingPeriod: '3–4 weeks brooding; high forage scavenging',
    moq: '1 carton (50 + 1 bonus chick)',
    description:
      'Rugged, climate-resistant dual-purpose poultry perfectly adapted for semi-intensive systems, scavenging conditions, and low-input backyard rural operations.',
    highlights: [
      'Outstanding tropical disease resistance',
      'Superior scavenging and forage ability',
      'Rich indigenous-flavor firm meat',
      'Economical alternative to broilers',
    ],
  },
];

const FAQS = [
  {
    q: 'How do I book day-old chicks online through D-AminGrow?',
    a: 'You can book your chicks directly through our online Chick Allocation Form on this page or via our WhatsApp booking desk (+2348139169402). Simply select your preferred breed, specify your hatchery brand preference, indicate the number of cartons needed, and enter your delivery destination. You will receive an instant invoice summary detailing total costs and the 50% commitment deposit required to lock your hatch slot.',
  },
  {
    q: 'What is the minimum order quantity (MOQ) for day-old chicks?',
    a: 'The minimum order quantity is one (1) commercial carton. For broilers, layer pullets, cockerels, and Noilers, each carton contains 50 chicks plus 1 extra chick (51 total birds) as a certified livability buffer. For day-old turkeys, each carton contains 30 poults. We do not sell retail quantities below one carton because hatcheries package exclusively in tamper-evident, climate-ventilated commercial boxes.',
  },
  {
    q: 'How does the 50% commitment deposit payment work?',
    a: 'Commercial hatcheries operate strict advance incubation cycles: parent eggs are set 21 days before hatch day. To guarantee your carton allotment from partner hatcheries (CHI, Zartech, Amo, Supreme), a 50% commitment deposit is paid to our corporate account (Zenith Bank Plc, 1017894562, D-AminGrow Agric Ltd). The remaining 50% balance is cleared prior to waybill departure on the morning of dispatch.',
  },
  {
    q: 'Which days are chicks dispatched and what are the order cutoff times?',
    a: 'Nationwide dispatch occurs twice weekly: every Monday and Thursday morning. For Monday dispatches, bookings and commitment deposits close on Saturday at 12:00 PM. For Thursday dispatches, bookings close on Tuesday at 5:00 PM. Bookings submitted after these cutoffs roll automatically into the subsequent hatch cycle.',
  },
  {
    q: 'How do I collect my chicks from the motor park depot?',
    a: 'Upon dispatch from the hatchery corridor in Ibadan or Ogun State, our logistics desk sends you a Prompt Dispatch Notification containing the driver’s phone number, motor park depot name, waybill tracking receipt number, and bus registration number. You are advised to arrive at the designated motor park depot 15–30 minutes before bus arrival to minimize waiting time in fluctuating ambient temperatures.',
  },
  {
    q: 'What happens if I experience chick mortality during transit?',
    a: 'Every carton includes 1 bonus chick (51 chicks packed) to absorb ordinary transit stress. In the rare event of mortality exceeding this buffer due to vehicle delay or mechanical failure, you must record a clear, continuous 360-degree unboxing video at the motor park depot within 2 hours of arrival showing intact hatchery seals and dead birds. Send this video immediately to our WhatsApp desk for verification and compensatory credit.',
  },
  {
    q: 'Are the day-old chicks vaccinated against Marek’s Disease before dispatch?',
    a: 'Yes. All day-old broiler and layer pullet chicks allocated through D-AminGrow receive subcutaneous Marek’s Disease vaccine (HVT strain, 0.2 ml per chick) administered via automated hatchery injection systems immediately after hatch before carton crating. You will receive an official vaccination guide to continue subsequent Newcastle and Gumboro pen protocols.',
  },
  {
    q: 'What should I prepare in my brooding pen before the chicks arrive?',
    a: 'Your brooding pen must be thoroughly washed, disinfected, and pre-heated to 32°C–35°C at chick height at least 2 to 4 hours before carton arrival. Prepare clean drinkers with glucose anti-stress water (or electrolyte solution) at room temperature. Provide fresh wood shavings (never sawdust) and ensure proper ventilation without direct cold drafts.',
  },
];

export default function ChicksClient({ nextMonday, nextThursday }: ChicksClientProps) {
  const [copiedBank, setCopiedBank] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopyBank = () => {
    navigator.clipboard.writeText('1017894562');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="font-body text-slate-800">
      {/* ====================================================================
          SECTION 1: HERO (2-COLUMN 12-GRID ARCHITECTURE)
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
            <span className="text-emerald-400 font-medium">Day-Old Chicks Online Booking</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: 7 Cols Conversion Engine */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-4 py-1.5 rounded-full">
                  <Feather className="h-3.5 w-3.5 text-emerald-400" />
                  Direct Hatchery Allocation &amp; Dispatch
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
                  <Truck className="h-3.5 w-3.5 text-amber-400" />
                  Monday &amp; Thursday Nationwide Waybill
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                Book Day-Old Chicks Online:{' '}
                <span className="text-gradient-green">Direct Hatchery Allocation</span> &amp; Dispatch
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Secure your commercial broiler, layer pullet, and turkey flock allotments directly from certified Nigerian parent-stock hatcheries. Complete our verified <strong className="text-white font-semibold">chick allocation form</strong> with a protected <strong className="text-white font-semibold">50% carton deposit payment</strong>, certified <strong className="text-white font-semibold">50+1 packaging</strong> guarantee, and <strong className="text-white font-semibold">prompt dispatch notification</strong> straight to your state motor park depot.
              </p>

              {/* Trust Signal Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {[
                  { label: "Marek's HVT Vaccinated", sub: "Pre-crating injection" },
                  { label: '50+1 Carton Buffer', sub: 'Guaranteed livability' },
                  { label: '36 States & FCT', sub: 'Direct park logistics' },
                  { label: 'Certified Parentage', sub: 'Chi, Amo, Zartech, Supreme' },
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
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20book%20day-old%20chicks%20online.%20Please%20share%20this%20week%27s%20hatchery%20rates%20and%20dispatch%20schedule."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl text-base shadow-xl shadow-[#25D366]/20 hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" />
                  <span>Book Via WhatsApp Desk</span>
                </a>
                <a
                  href="#booking-engine"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/15 hover:-translate-y-0.5 transition-all text-sm"
                >
                  <span>Fill Allocation Form</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Brand Slogan */}
              <p className="text-xs text-slate-400 italic">
                &ldquo;Your satisfaction is our priority&rdquo; &mdash; D-AminGrow Agro-Allied Solution Center
              </p>
            </div>

            {/* Right Column: 5 Cols Interactive Status & Schedule Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl bg-slate-900/90 border border-emerald-500/30 p-6 sm:p-7 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Live Hatch Reservation Window
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    Week 45 Cycle
                  </span>
                </div>

                <div className="space-y-4 my-5">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Next Monday Dispatch</div>
                      <div className="text-base font-extrabold text-white font-heading mt-0.5">
                        {nextMonday || 'Upcoming Monday Hatch'}
                      </div>
                      <div className="text-[11px] text-amber-400 mt-0.5">Booking closes Saturday at 12:00 PM</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                      Allocating
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Next Thursday Dispatch</div>
                      <div className="text-base font-extrabold text-white font-heading mt-0.5">
                        {nextThursday || 'Upcoming Thursday Hatch'}
                      </div>
                      <div className="text-[11px] text-amber-400 mt-0.5">Booking closes Tuesday at 5:00 PM</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                      Open
                    </span>
                  </div>
                </div>

                {/* Quick Bank Deposit Notice */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Official Bank Allotment Account:</span>
                    <span className="font-bold text-emerald-400">Zenith Bank Plc</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-xl border border-white/5">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Account Number</span>
                      <span className="font-mono text-base font-extrabold text-emerald-300">1017894562</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyBank}
                      className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30 transition-all"
                    >
                      {copiedBank ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedBank ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Account Name: <strong className="text-slate-200">D-AminGrow Agric Ltd</strong>
                  </div>
                </div>
              </div>

              {/* Direct Partner Lineage Strip */}
              <div className="rounded-2xl bg-white/5 border border-white/8 p-4 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Certified Breeding Partners:</span>
                <span className="text-emerald-400 font-medium">CHI &bull; Amo ByNG &bull; Zartech &bull; Supreme</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2: DISPATCH & CARE BENCHMARK STRIP
          ==================================================================== */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-4 py-1.5 rounded-full">
              Hatchery Logistics Guarantee
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-3">
              Standardized Hatchery-to-Pen Quality Protocols
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                title: 'Monday & Thursday Dispatch',
                desc: 'Nationwide shipments depart on fixed bi-weekly schedules to synchronize with Petersime hatch pull windows.',
                color: 'bg-emerald-100 text-emerald-800',
              },
              {
                icon: ShieldCheck,
                title: '50+1 Packaging Rule',
                desc: '51 active, verified chicks packed per carton. The extra chick covers unavoidable transit stress for zero loss.',
                color: 'bg-amber-100 text-amber-800',
              },
              {
                icon: Syringe,
                title: 'Marek’s Disease Vaccination',
                desc: 'Pre-vaccinated with subcutaneous HVT at hatch. Protects your flock against paralysis and immunosuppression.',
                color: 'bg-blue-100 text-blue-800',
              },
              {
                icon: Thermometer,
                title: '32°C–35°C Arrival Readiness',
                desc: 'Brooder heating must be initialized 2 hours before depot pickup to prevent hypothermia and yolk-sac retention.',
                color: 'bg-purple-100 text-purple-800',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-slate-200 p-6 space-y-3 hover:shadow-lg transition-all hover:-translate-y-1 group"
                >
                  <div className={`h-12 w-12 rounded-2xl ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: 50% COMMITMENT DEPOSIT BANNER (ZENITH BANK)
          ==================================================================== */}
      <section className="py-8 bg-amber-50/70 border-b border-amber-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 p-6 bg-white rounded-3xl border border-amber-300 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                <Building2 className="h-6 w-6 text-amber-800" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Hatchery Reservation Policy: 50% Commitment Deposit Required
                </h3>
                <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                  Hatcheries set eggs 21 days in advance. To protect farmers from speculative price spikes and secure firm crate allotments, all reservations require a 50% commitment deposit to{' '}
                  <strong className="text-slate-900 font-semibold">Zenith Bank Plc</strong> (Account:{' '}
                  <span className="font-mono font-bold text-emerald-700">1017894562</span>, Name:{' '}
                  <strong className="text-slate-900 font-semibold">D-AminGrow Agric Ltd</strong>). The remaining 50% balance clears prior to waybill departure.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={handleCopyBank}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold px-5 py-3 rounded-xl border border-slate-300 transition-all"
              >
                {copiedBank ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                <span>{copiedBank ? 'Account Copied' : 'Copy 1017894562'}</span>
              </button>
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20have%20transferred%20my%2050%25%20commitment%20deposit%20to%20Zenith%20Bank%201017894562.%20Here%20is%20my%20proof%20of%20payment."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Submit Deposit Slip</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 4: INTERACTIVE HATCHERY BOOKING ENGINE
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-slate-100/70 border-b border-slate-200" id="booking-engine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Real-Time Booking Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Complete Your Chick Allocation Form &amp; Hatch Date Reservation
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Calculate your exact batch requirement, select your preferred certified hatchery brand, and lock in your Monday or Thursday dispatch slot with instant commitment deposit calculation.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-4 sm:p-8">
            <ChickBookingForm />
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5: BREED SHOWCASE & COMMODITY MATRIX
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200" id="available-breeds">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
                Genetic Diversity
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                Commercial Day-Old Chick Breeds Available for Reservation
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Explore performance specifications, target harvest weights, and egg yield benchmarks across our primary commercial poultry categories.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 shrink-0">
              <Clock className="h-4 w-4 text-emerald-700" />
              <span className="text-sm text-emerald-900 font-semibold">Weekly rates updated every Sunday &amp; Wednesday</span>
            </div>
          </div>

          {/* Multi-Strain Independent Allocation Notice */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 sm:p-5 mb-8 text-left flex items-start gap-3.5">
            <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="text-slate-900 font-bold block mb-0.5">Independent Multi-Hatchery Distribution:</strong>
              D-AminGrow is an authorized primary distributor across all certified commercial breeds in Nigeria—broilers (Ross 308, Cobb 500, Arbor Acres Plus, Marshall), layers (ISA Brown, Hy-Line Brown, Dominant Black), turkeys (Nicholas White, Bronze hybrids), and dual-purpose birds (Amo Noiler, cockerels). We do not own proprietary breeding stock, nor do we prioritize one commercial breed over another. We source exclusively authentic first-generation parentage from Nigeria’s tier-1 accredited hatcheries (Zartech, Amo, Chi, Supreme, Sayed) based on your farm’s operational goals.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BREED_CATALOG.map((breed) => (
              <div
                key={breed.id}
                className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:shadow-xl hover:border-emerald-300 transition-all group"
              >
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full w-fit">
                      {breed.category}
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full w-fit">
                      {breed.badge}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="w-full sm:w-36 h-36 relative rounded-2xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                      <Image
                        src={breed.image}
                        alt={`${breed.title} day old chicks nigeria`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 150px"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {breed.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Popular Strains: <strong className="text-slate-800 font-semibold">{breed.popularStrains}</strong>
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {breed.description}
                      </p>
                    </div>
                  </div>

                  {/* Benchmark Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-500 block text-[11px]">Performance Target</span>
                      <strong className="text-slate-900 font-bold mt-0.5 block">{breed.targetMetric}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-500 block text-[11px]">Minimum Order Quantity</span>
                      <strong className="text-slate-900 font-bold mt-0.5 block">{breed.moq}</strong>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {breed.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <Link
                    href={breed.href}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>View Strain Comparison &amp; Prices</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#booking-engine"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    <span>Reserve Breed</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 6: 5-STEP HATCHERY ALLOCATION & DISPATCH JOURNEY
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Full Transparency Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              How Our Day-Old Chick Allocation &amp; Motor Park Dispatch Operates
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              From advance incubator egg-setting to interstate climate-ventilated waybill delivery, here is our 5-step operational chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Fill Allocation Form',
                desc: 'Select breed, carton quantity, destination depot, and preferred hatchery on our online portal or WhatsApp.',
                icon: Layers,
              },
              {
                step: '02',
                title: '50% Commitment Deposit',
                desc: 'Transfer 50% reservation deposit to Zenith Bank (1017894562) to formally lock your cartons with the hatchery.',
                icon: DollarSign,
              },
              {
                step: '03',
                title: 'Incubation & Hatch Pull',
                desc: 'Hatchery completes 21-day Petersime incubation, automated Marek’s injection, and 50+1 quality grading.',
                icon: Feather,
              },
              {
                step: '04',
                title: 'Prompt Dispatch Alert',
                desc: 'Receive driver phone number, bus registration plate, and park waybill manifest immediately upon interstate departure.',
                icon: Truck,
              },
              {
                step: '05',
                title: 'Depot Pickup & Brooding',
                desc: 'Receive cartons at your state motor park, perform navel closure inspection, and place birds into 32°C–35°C pens.',
                icon: Thermometer,
              },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 hover:shadow-lg transition-all relative group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-extrabold font-heading text-emerald-700/80">
                        {step.step}
                      </span>
                      <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 7: ACCREDITED GRANDPARENT HATCHERY PARTNERS
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Breeding Integrity
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Direct Hatchery Allocations From Nigeria&apos;s Accredited Breeders
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We eliminate intermediaries by partnering directly with primary grandparent and parent-stock breeding conglomerates across the Oyo and Ogun poultry corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HATCHERY_PARTNERS.map((hatchery) => {
              const locationCity = hatchery.location.split(',')[0]?.trim() ?? hatchery.location;
              return (
                <div
                  key={hatchery.id}
                  className="rounded-3xl bg-slate-50 border border-slate-200 p-6 space-y-4 hover:shadow-xl transition-all flex flex-col justify-between group hover:border-emerald-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        {hatchery.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{locationCity}</span>
                    </div>
                    <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {hatchery.name}
                    </h3>
                    <p className="text-xs text-emerald-700 font-semibold">
                      {hatchery.establishedRole}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {hatchery.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Specialty Breeds
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {hatchery.specialtyBreeds.map((breedName, bIdx) => (
                        <span
                          key={bIdx}
                          className="text-[11px] font-medium text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md"
                        >
                          {breedName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 8: UNIQUE INFORMATION GAIN (VETERINARY & LOGISTICS INTEL)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-[#041008] text-white border-b border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-4 py-1.5 rounded-full">
              Field Veterinary Intel
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              3 Critical Information Gain Protocols for Day-Old Chick Buyers
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Standard ecommerce stores omit these logistical and physiological realities. Here is what professional poultry operations inspect upon carton collection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Gain 1 */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-7 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">
                  The 50+1 Packaging Rule &amp; 2-Hour Video Protocol
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Every certified commercial carton contains exactly 51 birds (50 invoiced + 1 mortality buffer). During interstate transit, metabolic heat and road vibration may stress individual chicks. If transit mortality exceeds the +1 buffer, D-AminGrow honors compensation when a 360-degree unboxing video is recorded at the motor park depot within 2 hours of arrival showing unbroken hatchery seal tape.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-emerald-300">
                <strong>Field Tip:</strong> Never open cartons at home if claiming transit mortality; inspect inside the motor park office with the driver or clerk present.
              </div>
            </div>

            {/* Info Gain 2 */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-7 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Scale className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">
                  Navel Closure, Pasgar Score &amp; Day-Old Weight (38g–44g)
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  High livability begins with proper navel healing and yolk-sac absorption. Quality chicks weigh between 38g and 44g at box opening. A dry, closed navel free from black scabs or unabsorbed stringy yolk indicates ideal incubator humidity and temperature control. Chicks scoring above 9.0 on the Pasgar scale stand alert within 3 seconds of being turned on their backs.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-amber-300">
                <strong>Field Tip:</strong> Check 10 random chicks per carton. If more than 2 show wet navels, delay feed placement by 2 hours and increase brooder temperature to 35°C.
              </div>
            </div>

            {/* Info Gain 3 */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-7 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Thermometer className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">
                  First 24-Hour Hydration vs Feeding Timing
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Never introduce solid starter mash the instant chicks arrive. Dehydrated chicks require 60 to 90 minutes of lukewarm water enriched with glucose or anti-stress electrolytes first. This stimulates peristalsis and flushes accumulated uric acid from kidneys. Once 85%+ of chicks have drunk, spread starter crumbles on newspaper sheets under heat lamps.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-blue-300">
                <strong>Field Tip:</strong> Perform a crop fill check at hour 8. At least 80% of crops must feel soft and pliable like a water balloon, proving successful feed/water intake.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 9: TRANSPARENT QUALIFICATION ("WHO WE ARE NOT RIGHT FOR")
          ==================================================================== */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-4 py-1.5 rounded-full">
                Expectation Setting &amp; Clear Boundaries
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                When D-AminGrow May Not Be the Right Solution for Your Farm
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We believe in total transparency. To maintain 100% bio-security and reliable logistics, we adhere strictly to commercial standards that may not suit every buyer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'If You Need Retail Quantities Below 1 Full Carton',
                  desc: 'Hatcheries seal commercial cartons at 50/51 birds (or 30 turkeys). Opening boxes to count loose chicks introduces pathogen contamination and void transit guarantees.',
                },
                {
                  title: 'If You Require Unreserved Pay-on-Delivery',
                  desc: 'Primary breeders (Chi, Zartech, Amo) do not incubate or allocate parent-stock chicks without guaranteed deposits. We cannot dispatch live cargo on credit.',
                },
                {
                  title: 'If You Cannot Collect Within 2 Hours of Depot Arrival',
                  desc: 'Chicks left in motor park transit rooms endure temperature swings that cause dehydration and stunted gut development. Prompt collection is non-negotiable.',
                },
                {
                  title: 'If You Seek Cheap Uncertified Backyard Crosses',
                  desc: 'We supply exclusively certified first-generation grandparent parent-stock lines. We do not deal in local undocumented mixtures or off-grade hatchery culls.',
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
          SECTION 10: VERIFIED COMMERCIAL CLIENT FARMS & CASE STUDIES
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Field Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Trusted by Over 1,200+ Commercial Poultry Farmers Across Nigeria
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Read verified feedback and batch performance records from commercial brooders, layer operations, and integrated livestock enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLIENT_FARMS.map((farm) => {
              const flockBadge = farm.flockType.split('&')[0]?.trim() ?? farm.flockType;
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
          SECTION 11: VETERINARY VACCINATION PROGRAM BANNER
          ==================================================================== */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-[#051109] to-slate-950 border border-emerald-500/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl text-white">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-4 py-1.5 rounded-full">
                  <Syringe className="h-3.5 w-3.5" />
                  Included With Every Batch
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  Calibrated Day-by-Day Vaccination Program for Your Birds
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Every chick placement requires timely immunization against Newcastle Disease, Gumboro (IBD), and Infectious Bronchitis. Input your delivery date into our veterinary planner to generate a pen schedule with exact dates, pen directions, and a downloadable PDF chart.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/vaccination-program"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Generate Pen Schedule Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/calculators/brooder"
                    className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-5 py-3.5 rounded-xl border border-white/15 hover:border-white/25 transition-all text-sm hover:-translate-y-0.5"
                  >
                    <span>Brooder Heat &amp; Space Setup</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Veterinary Highlights</div>
                <div className="space-y-2.5 text-xs text-slate-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Marek&apos;s HVT 0.2ml verified pre-delivery</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Exact calendar dates calculated automatically</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Printable chart to pin directly in brooding pen</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp cold-chain pre-order integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 12: FAQ ACCORDION (SCHEMA COMPATIBLE)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200" id="faqs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions About Booking Day-Old Chicks in Nigeria
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Clear answers regarding payment, logistics, transit safety, and breed selections.
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
          SECTION 13: CLOSING CALL-TO-ACTION & DIRECT BANK DETAILS
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-[#06170d] to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-4 py-1.5 rounded-full">
                Guaranteed Monday &amp; Thursday Dispatch
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white tracking-tight leading-tight">
                Ready to Lock Your Day-Old Chick Allocation for This Week?
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Connect with our commercial livestock desk right now. We confirm current hatch prices, verify carton availability across Chi, Amo, Zartech, and Supreme, and coordinate your motor park delivery.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20am%20ready%20to%20reserve%20day-old%20chicks%20for%20the%20next%20hatch%20dispatch."
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

            {/* Bank Card */}
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
                  <div>Branch: <span className="text-slate-300">Commercial Banking Division</span></div>
                  <div className="text-amber-300 text-[11px] pt-1">
                    * Always specify your farm name and phone number in transfer narration.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 14: KNOWLEDGE & INTERNAL LINKING DIRECTORY
          ==================================================================== */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-base font-bold font-heading text-slate-900">
                New to Commercial Poultry Brooding in Nigeria?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Access our free veterinary guidelines, temperature charts, and feed conversion calculators.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/day-old-chicks/broilers"
                className="text-xs font-semibold text-slate-700 bg-white hover:text-emerald-700 hover:border-emerald-300 border border-slate-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Broiler Strains &amp; FCR
              </Link>
              <Link
                href="/day-old-chicks/pullets"
                className="text-xs font-semibold text-slate-700 bg-white hover:text-emerald-700 hover:border-emerald-300 border border-slate-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Layer Pullet Records
              </Link>
              <Link
                href="/day-old-chicks/turkeys"
                className="text-xs font-semibold text-slate-700 bg-white hover:text-emerald-700 hover:border-emerald-300 border border-slate-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Turkey Poults Guide
              </Link>
              <Link
                href="/calculators/brooder"
                className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 border border-emerald-300 px-4 py-2.5 rounded-xl transition-all"
              >
                Brooder Setup Tool
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
