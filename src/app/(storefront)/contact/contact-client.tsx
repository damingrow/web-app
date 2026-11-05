'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Feather,
  Syringe,
  Home,
  Stethoscope,
  ChevronRight,
  AlertTriangle,
  Building2,
  Calendar,
  Layers,
  Thermometer,
  Truck,
  Copy,
  Check,
  Zap,
  Users,
  BadgeCheck,
  XCircle,
} from 'lucide-react';

interface ContactReason {
  value: string;
  label: string;
  desk: string;
}

const CONTACT_REASONS: ContactReason[] = [
  { value: 'chick_pricing', label: 'Day-Old Chick Pricing & Quota Booking', desk: 'Commercial Booking Desk' },
  { value: 'vaccine_order', label: 'Vaccine Orders & Cold-Chain Dispatch', desk: 'Logistics & Cold-Chain Desk' },
  { value: 'veterinary_triage', label: 'Flock Health Emergency & Veterinary Triage', desk: 'Clinical Advisory Desk' },
  { value: 'equipment_order', label: 'Poultry Equipment, Cages & Feeders', desk: 'Commercial Booking Desk' },
  { value: 'pol_pullets', label: 'Point-of-Lay (17–20 Week) Pullet Reservation', desk: 'Commercial Booking Desk' },
  { value: 'consultation', label: 'Commercial Farm Setup & Biosecurity Audit', desk: 'Clinical Advisory Desk' },
  { value: 'waybill_tracking', label: 'Dispatch Tracking & Driver Waybill Check', desk: 'Logistics & Cold-Chain Desk' },
  { value: 'other', label: 'General Inquiry or Feedback', desk: 'Customer Care Desk' },
];

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Chick Booking & Rates',
    q: 'How do I get today\'s confirmed chick prices and lock my quota?',
    a: 'Day-old chick prices in Nigeria change weekly based on parent-stock availability, grain inputs, and operational costs. We do not publish speculative prices. Message our booking desk directly on WhatsApp (+234 813 916 9402) to get today\'s confirmed rates for broilers, pullets, or turkeys, and receive your allocation reference.',
  },
  {
    category: 'Hatch Runs & Cutoffs',
    q: 'What is the cutoff deadline for Monday and Thursday hatch runs?',
    a: 'Interstate hatch allocations require strict 48-hour pre-booking. For Monday dispatch, your reservation deposit must be verified before Saturday 2:00 PM WAT. For Thursday dispatch, booking closes Tuesday at 2:00 PM WAT. This ensures chicks move directly from the hatchers into temperature-controlled transit boxes without delay.',
  },
  {
    category: 'Bank Verification & Anti-Scam',
    q: 'How do I verify I am making payments to the official D-AminGrow account?',
    a: 'D-AminGrow strictly receives commercial deposits into our verified corporate bank account: Zenith Bank Plc, Account Number: 1017894562, Account Name: D-AminGrow Agric Ltd. We will never ask you to transfer funds to any personal account or fintech wallet. If you receive an alternative account from any source, contact our emergency desk immediately.',
  },
  {
    category: 'Interstate Waybill & Delivery',
    q: 'How does interstate motor park waybill dispatch work for day-old chicks?',
    a: 'On Monday and Thursday mornings, chicks leave primary sorting in Ibadan before the intense heat of the afternoon. Immediately upon loading, our logistics desk WhatsApps you the driver\'s phone number, vehicle plate number, and waybill receipt. You can call the driver directly while tracking estimated arrival at your city\'s registered motor park.',
  },
  {
    category: 'Vaccine Cold-Chain Guarantee',
    q: 'How do you guarantee cold-chain integrity (2°C–8°C) for vaccines sent to distant states?',
    a: 'Every biological shipment is packed inside high-density insulated foam containers with pre-chilled commercial ice gel packs and temperature indicator cards. We verify destination transit hours before dispatch to ensure viral viability remains 100% active upon collection at your local depot.',
  },
  {
    category: 'Pharmaceutical Integrity',
    q: 'Are your veterinary medications and supplements NAFDAC-approved?',
    a: 'Yes. As an authorized agro-allied distributor and reseller, we only source and distribute genuine, tested veterinary pharmaceuticals and premixes from licensed producers. We do not manufacture drugs; every product features verified manufacturer batch dossiers and clear withdrawal timelines.',
  },
  {
    category: 'Veterinary Emergency Support',
    q: 'Can I speak directly with a veterinary professional if my birds are dying?',
    a: 'Yes. Our clinical advisory desk is staffed in partnership with licensed Veterinary Council of Nigeria (VCN) professionals. If your flock experiences sudden mortality, unusual droppings, or respiratory distress, WhatsApp photos, videos, and flock history for immediate triage before field medication.',
  },
  {
    category: 'Minimum Order Quantities',
    q: 'What are the minimum order quantities for day-old chicks and vaccines?',
    a: 'For day-old chicks, the minimum allocation is 1 carton (50 chicks + 1 bonus chick). For Point-of-Lay birds, the minimum batch is 50 birds. For cold-chain vaccines and veterinary medications, we fulfill orders of any quantity, provided cold-pack transit conditions can be maintained.',
  },
];

export function ContactClient() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    state: '',
    farmName: '',
    reason: 'chick_pricing',
    flockSize: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedBank, setCopiedBank] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'booking' | 'logistics' | 'veterinary'>('all');

  const selectedReasonMeta = CONTACT_REASONS.find((r) => r.value === formData.reason) || CONTACT_REASONS[0];

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('1017894562');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setError('Please provide your full name and WhatsApp contact number.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          state: formData.state,
          farmName: formData.farmName,
          enquiryType: formData.reason || 'general',
          flockSize: formData.flockSize ? Number(formData.flockSize) : undefined,
          notes: formData.message,
          consentMarketing: true,
        }),
      });
    } catch {
      // Graceful fallback: continue with WhatsApp direct handoff
    }

    setIsSubmitting(false);
    setSubmitted(true);

    const messagePayload = encodeURIComponent(
      `Hello D-AminGrow Support Center,\n\nI just submitted an inquiry on your website:\n• Name: ${formData.fullName}\n• Phone: ${formData.phone}\n• Farm: ${formData.farmName || 'Not specified'}\n• State / Town: ${formData.state || 'Not specified'}\n• Inquiry Desk: ${selectedReasonMeta?.desk}\n• Purpose: ${selectedReasonMeta?.label}\n• Flock Size: ${formData.flockSize ? `${formData.flockSize} birds` : 'N/A'}\n\nNotes:\n${formData.message || 'Please provide current pricing and next dispatch details.'}\n\nPlease confirm availability and next steps.`
    );

    window.open(`https://wa.me/2348139169402?text=${messagePayload}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="font-body bg-slate-50 text-slate-900 min-h-screen">

      {/* ====================================================================
          1. HERO SECTION (2-GRID COLUMNS LIKE HOMEPAGE)
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden min-h-[85vh] flex items-center bg-[#050E08] text-white">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left Column (7 cols): Benefit-Driven Copy, Hook, CTAs */}
            <div className="lg:col-span-7 space-y-7 text-left">

              {/* Credibility Tag */}
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Dedicated Agro-Allied Solution Center
                </div>
              </div>

              {/* Exact Primary H1 Directive */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
                  Contact D-AminGrow:{' '}
                  <span className="text-gradient-green">Fast Farm Support Center</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                  Stop losing sleep over unreachable hatcheries, unconfirmed waybills, and unverified drugs. Reach our specialized operations desk in Ibadan and Lagos for immediate chick quotas, 2°C–8°C cold-chain biological logistics, and clinical triage across Nigeria and all African markets.
                </p>
              </div>

              {/* Brand Motto Pill */}
              <div>
                <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs">
                  <span className="text-slate-400 font-medium uppercase tracking-wider">Our Commitment</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 font-bold italic">&ldquo;Your Satisfaction Is Our Priority&rdquo;</span>
                </div>
              </div>

              {/* Primary Action Zone — High Visual Weight */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20confirm%20today%27s%20chick%20rates%20and%20speak%20with%20your%20operations%20desk."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat With Operations Desk
                </a>

                <a
                  href="#contact-form-section"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
                >
                  Send Farm Inquiry
                  <ArrowRight className="h-5 w-5" />
                </a>

                <a
                  href="tel:+2348139169402"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-3 py-4 rounded-xl transition-all duration-200 text-sm hover:underline"
                >
                  <Phone className="h-4 w-4 text-emerald-400" />
                  +234 813 916 9402
                </a>
              </div>

              {/* Trust Assurances */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs text-slate-400 border-t border-white/10">
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>&lt; 15-Min WhatsApp Reply</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Mon &amp; Thu Waybill Tracking</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Official Zenith Bank Account</span>
                </div>
                <div className="flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>VCN-Affiliated Triaging</span>
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): Live Operational Support Cockpit Card */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md p-5 sm:p-7 shadow-2xl space-y-6">

                {/* Top Status Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">Live Desk Status</div>
                      <div className="text-[11px] text-emerald-400 font-semibold">Active &amp; Monitoring Dispatches</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                    WAT 08:00–18:00
                  </span>
                </div>

                {/* Dispatch Schedule Countdown Box */}
                <div className="rounded-2xl bg-slate-950/70 border border-white/10 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium flex items-center gap-1.5">
                      <Truck className="h-3.5 w-3.5 text-emerald-400" />
                      Interstate Route Schedule
                    </span>
                    <span className="text-emerald-400 font-bold font-mono">Mon &amp; Thu Strictly</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Monday Hatch Run</div>
                      <div className="text-white font-bold mt-0.5">Cutoff: Sat 2:00 PM</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Thursday Hatch Run</div>
                      <div className="text-white font-bold mt-0.5">Cutoff: Tue 2:00 PM</div>
                    </div>
                  </div>
                </div>

                {/* 1-Click Fast Routing Cards */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Direct Operational Routing
                  </div>

                  <a
                    href="https://wa.me/2348139169402?text=Hello%20Booking%20Desk%2C%20I%20want%20to%20confirm%20today%27s%20chick%20rates%20and%20quota%20availability."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                        <Feather className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          Day-Old Chick Booking Desk
                        </div>
                        <div className="text-[11px] text-slate-400">Broilers, Zartech Pullets, Turkeys &amp; Noilers</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </a>

                  <a
                    href="https://wa.me/2348139169402?text=Hello%20Logistics%20Desk%2C%20I%20am%20inquiring%20about%20cold-chain%20vaccines%20and%20waybill%20transit."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
                        <Thermometer className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          Cold-Chain &amp; Waybill Tracking Desk
                        </div>
                        <div className="text-[11px] text-slate-400">2°C–8°C Insulated Transit &amp; Driver Phones</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </a>

                  <a
                    href="https://wa.me/2348139169402?text=Hello%20Veterinary%20Desk%2C%20I%20have%20an%20urgent%20flock%20health%20question%20and%20need%20clinical%20triage."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-violet-500/15 text-violet-400 flex items-center justify-center shrink-0">
                        <Stethoscope className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          Veterinary Clinical Triage Desk
                        </div>
                        <div className="text-[11px] text-slate-400">Emergency Mortality &amp; Post-Arrival Care</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </a>
                </div>

                {/* Capital Protection Reminder */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Official Account: <strong className="text-white">Zenith Bank 1017894562</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="text-[10px] text-emerald-300 font-bold bg-emerald-500/20 hover:bg-emerald-500/30 px-2 py-1 rounded-md transition-all flex items-center gap-1"
                  >
                    {copiedBank ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedBank ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          2. PROBLEM EXPLANATION & WHY MOST BUSINESSES FAIL
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 border border-red-200 px-4 py-1.5 rounded-full">
              <AlertTriangle className="h-3.5 w-3.5" />
              The Farm Communication Breakdown
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Why Farm Customer Service in Nigeria Usually Fails You
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              When 1,000 day-old chicks are in transit or a flock starts gasping, every 30 minutes of supplier silence destroys working capital. Here is what Nigerian livestock farmers face with traditional suppliers:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-extrabold text-lg">
                01
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                The Disappearing Middleman
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Social media agents collect booking deposits into personal bank accounts. On dispatch morning, their phones switch off, allocations evaporate, and the farmer has empty brooders with heating costs already spent.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-extrabold text-lg">
                02
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                Zero Waybill Accountability
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Boxes are dumped at random motor parks without vehicle numbers or driver contacts. Chicks sit in suffocating boots under the afternoon sun, resulting in high arrival mortality and permanent stunt.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-extrabold text-lg">
                03
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                Silent Biological Compromise
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Vaccines sent without insulated boxes or ice gel arrive warm. Counter staff cannot answer basic reconstitution or titer questions, leaving the farmer with failed immunity and sudden Newcastle outbreaks.
              </p>
            </div>
          </div>

          {/* Practical Opinion Callout */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1 max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Practical Operational Opinion</div>
              <p className="text-sm sm:text-base font-semibold leading-relaxed">
                Never pay for day-old chicks or biologicals into an individual personal bank account. If a supplier cannot issue a corporate invoice under a registered bank account (like D-AminGrow&apos;s Zenith Bank: 1017894562) and supply traceable hatchery allotment records, your capital is unprotected.
              </p>
            </div>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20verify%20booking%20procedures%20and%20corporate%20payment%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm whitespace-nowrap shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              Verify Official Desk
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. NOBLE/D-AMINGROW APPROACH: 3-TIER RAPID TRIAGE FRAMEWORK
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-1.5 rounded-full">
              <Layers className="h-3.5 w-3.5" />
              The D-AminGrow Operational Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              The 3-Tier Rapid Triage &amp; Escalation Framework
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We do not use generic call-center scripts. Inquiries are routed immediately to one of three specialized functional desks based in our Oyo and Lagos operating facilities:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Tier 1 */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-7 sm:p-8 space-y-6 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                    Tier 1 Desk
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Response: &lt; 15 Mins</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Commercial Chick Allotment &amp; Booking Desk
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Dedicated strictly to weekly broiler, layer pullet, turkey, and cockerel allocations directly from Chi, Amo, Zartech, and Supreme hatcheries.
                </p>
                <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Real-time carton price confirmation per strain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Official allotment slot holding &amp; booking reference</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Zenith Bank escrow payment reconciliation</span>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/2348139169402?text=Hello%20Booking%20Desk%2C%20I%20want%20to%20inquire%20about%20chick%20allocation%20and%20weekly%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 rounded-xl transition-all text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Booking Desk
              </a>
            </div>

            {/* Tier 2 */}
            <div className="rounded-3xl bg-white/5 border border-emerald-500/30 p-7 sm:p-8 space-y-6 shadow-xl relative flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                Active On Dispatch Days
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full">
                    Tier 2 Desk
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Live Mon &amp; Thu</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Cold-Chain Logistics &amp; Driver Waybill Desk
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Monitors inter-state vehicle movements, thermal foam box seals, and motor park delivery handoffs across all 36 states and FCT.
                </p>
                <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Direct driver telephone &amp; vehicle registration dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>2°C–8°C thermal pack verification for all biologicals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Transit delay emergency routing before 2:00 PM</span>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/2348139169402?text=Hello%20Logistics%20Desk%2C%20I%20need%20to%20verify%20my%20waybill%20status%20or%20delivery%20route."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all text-sm"
              >
                <Truck className="h-4 w-4" />
                Track Waybill Or Cold-Chain
              </a>
            </div>

            {/* Tier 3 */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-7 sm:p-8 space-y-6 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-violet-400 uppercase tracking-widest bg-violet-400/10 border border-violet-400/20 px-3 py-1 rounded-full">
                    Tier 3 Desk
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Licensed VCN Network</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Technical &amp; Veterinary Clinical Triage Desk
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Affiliated veterinary clinicians providing diagnosis, vaccine scheduling, brooding calibration, and post-arrival anti-stress protocols.
                </p>
                <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Emergency symptom triaging via WhatsApp photos/video</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Flock vaccination calendar generation (ND, IBD, Pox)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>On-farm biosecurity audit and equipment guidance</span>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/2348139169402?text=Hello%20Veterinary%20Desk%2C%20I%20need%20clinical%20triage%20or%20flock%20health%20support."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 rounded-xl transition-all text-sm"
              >
                <Stethoscope className="h-4 w-4" />
                Consult Clinical Desk
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          4. INTERACTIVE FORM & DIRECT REGIONAL DEPOT DIRECTORY
          ==================================================================== */}
      <section id="contact-form-section" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Col (5 cols): Physical Facilities & Quick Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full mb-3">
                  <Building2 className="h-3.5 w-3.5" />
                  Operating Centers
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                  Direct Regional Facility Depots
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Visit or dispatch directly through our primary operations hubs in Oyo and Lagos states, or connect directly through phone and WhatsApp.
                </p>
              </div>

              {/* Ibadan Facility Card */}
              <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">
                        Ibadan Central Logistics &amp; Technical Headquarters
                      </h3>
                      <div className="text-[11px] text-emerald-600 font-semibold">Primary Hatchery Hub &amp; Cold Storage</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    Oyo State
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-700 space-y-1">
                  <div className="font-medium text-slate-900">12 Oluyole Extension, Ibadan, Oyo State</div>
                  <div className="text-slate-500 text-xs">Direct access to Chi, Amo, and Zartech primary breeding centers</div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Mon – Sat: 8:00 AM – 6:00 PM</span>
                  <a
                    href="https://wa.me/2348139169402?text=Hello%20Ibadan%20Hub%2C%20I%20want%20to%20inquire%20about%20order%20pickup%20or%20visit."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                  >
                    Ibadan Desk <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Lagos Operations Card */}
              <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">
                        Lagos Operations Hub &amp; Commercial Office
                      </h3>
                      <div className="text-[11px] text-teal-600 font-semibold">Coastlines, Equipment &amp; Export Routing</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    Lagos State
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-700 space-y-1">
                  <div className="font-medium text-slate-900">20 Simarch Street, Agric Bus Stop, Ojo, Lagos State</div>
                  <div className="text-slate-500 text-xs">Serving peri-urban poultry farms, equipment supply, and Southwest routes</div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Mon – Sat: 8:00 AM – 6:00 PM</span>
                  <a
                    href="https://wa.me/2348139169402?text=Hello%20Lagos%20Desk%2C%20I%20want%20to%20inquire%20about%20equipment%20and%20supplies."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-teal-600 hover:text-teal-700 inline-flex items-center gap-1"
                  >
                    Lagos Desk <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Official Corporate Account Card */}
              <div className="rounded-3xl bg-emerald-950 text-white p-6 space-y-4 shadow-xl border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <BadgeCheck className="h-5 w-5 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Official Capital Protection Account
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Verified Corporate Account</span>
                </div>
                <div className="space-y-1 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-xs text-slate-400">Bank Partner: <strong className="text-white">Zenith Bank Plc</strong></div>
                  <div className="text-lg sm:text-xl font-black font-mono text-emerald-400 tracking-wider">
                    1017894562
                  </div>
                  <div className="text-xs text-slate-300">Account Name: <strong className="text-white">D-AminGrow Agric Ltd</strong></div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Never pay to any personal account.</span>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1"
                  >
                    {copiedBank ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedBank ? 'Copied to Clipboard' : 'Copy Account'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Col (7 cols): The Conversion Farm Support Intake Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-7 sm:p-10">

                {submitted ? (
                  <div className="text-center py-12 space-y-5">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-2">
                        Inquiry Received &amp; Logged!
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        Your farm details have been registered on our central triage system. We have initiated a direct WhatsApp handoff to the appropriate operations desk.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 max-w-sm mx-auto text-left text-xs text-emerald-950 space-y-1">
                      <div>Assigned Desk: <strong>{selectedReasonMeta?.desk}</strong></div>
                      <div>Expected Reply: <strong>Under 15 Minutes</strong> (during operating hours)</div>
                      <div>Zenith Bank Account: <strong>1017894562</strong></div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 pt-3">
                      <a
                        href="https://wa.me/2348139169402"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm shadow-md"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Continue On WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-5 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                        <Zap className="h-3.5 w-3.5" />
                        Direct Triage Routing
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                        Send Your Farm Inquiry
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Fill in your farm details below. Our operations desk will review and reply within 15 minutes via WhatsApp.
                      </p>
                    </div>

                    {error && (
                      <div className="mb-6 p-4 text-xs sm:text-sm bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            required
                            placeholder="e.g. Babatunde Adeyemi"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                            WhatsApp Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="e.g. 0802 345 6789"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                            Farm Name (Optional)
                          </label>
                          <input
                            type="text"
                            name="farmName"
                            placeholder="e.g. Adeyemi Commercial Farms"
                            value={formData.farmName}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                            Delivery State / Town *
                          </label>
                          <input
                            type="text"
                            name="state"
                            required
                            placeholder="e.g. Ibadan, Oyo State / Warri, Delta"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                            Inquiry Category *
                          </label>
                          <select
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                          >
                            {CONTACT_REASONS.map((r) => (
                              <option key={r.value} value={r.value}>
                                {r.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                            Current Flock Capacity / Size
                          </label>
                          <input
                            type="number"
                            name="flockSize"
                            placeholder="e.g. 500, 1000, 5000 birds"
                            value={formData.flockSize}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Specific Inquiry or Message
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Tell us what you need — e.g. 'I want to book 100 cartons of Cobb 500 broilers for next Monday dispatch to Akure motor park. What is today's confirmed carton rate?'"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none"
                        />
                      </div>

                      {/* Desk Routing Badge */}
                      <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                        <span>Assigned Routing: <strong className="text-slate-900">{selectedReasonMeta?.desk}</strong></span>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                          WhatsApp Fast Handoff
                        </span>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                        <p className="text-[11px] text-slate-500">
                          We respect farm confidentiality. Your telephone is only used for direct order confirmation and waybill alerts.
                        </p>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 font-bold px-7 py-3.5 rounded-xl transition-all text-sm whitespace-nowrap shadow-lg shadow-emerald-500/20"
                        >
                          <Send className="h-4 w-4" />
                          <span>{isSubmitting ? 'Routing Inquiry...' : 'Submit Farm Inquiry'}</span>
                        </button>
                      </div>
                    </form>
                  </>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          5. PROCESS BREAKDOWN: FROM INQUIRY TO BROODER ARRIVAL
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Calendar className="h-3.5 w-3.5" />
              Transparent Protocol
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              What Happens When You Reach Out to D-AminGrow
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              From your first WhatsApp message to counting vigorous day-old chicks inside your brooder pen, here is our transparent 4-stage fulfillment cycle:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 relative">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-600 font-mono">Stage 01</div>
              <h3 className="text-lg font-bold font-heading text-slate-900">Live Rate Confirmation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You receive today&apos;s verified rates for your preferred breed and strain (Chi, Amo, Zartech, or Supreme) with confirmed hatch day allocations.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 relative">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-600 font-mono">Stage 02</div>
              <h3 className="text-lg font-bold font-heading text-slate-900">Zenith Bank Booking Escrow</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deposit commitment is paid strictly into Zenith Bank account (1017894562). An official booking invoice and quota reservation code are issued immediately.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 relative">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-600 font-mono">Stage 03</div>
              <h3 className="text-lg font-bold font-heading text-slate-900">Synchronized Early Dispatch</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                On Monday or Thursday morning, stock departs in climate-ventilated boxes. Driver details and waybill numbers are WhatsApped directly to you.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 relative">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-600 font-mono">Stage 04</div>
              <h3 className="text-lg font-bold font-heading text-slate-900">Brooder Reception Care</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our veterinary desk sends day-one anti-stress vitamin protocol and temperature checks to ensure minimum 98.4% brooding livability in your first week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. "WE MAY NOT BE RIGHT FOR YOU IF..." (INFORMATION GAIN QUALIFICATION)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full">
                <XCircle className="h-3.5 w-3.5 text-slate-500" />
                Honest Farm Qualification
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                We May Not Be The Right Agro-Allied Supplier For You If...
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                We value long-term commercial relationships over quick transactions. In order to uphold zero-counterfeit biological standards and high livability, we uphold non-negotiable operating rules:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>Unverified Backyard Strains</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you are shopping for undocumented backyard-hatched chicks without maternal antibody screening or Marek&apos;s vaccination at hatch, we do not supply them. We only allot certified commercial lineage.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>Uninsulated Vaccine Transit</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you want live viral vaccines sent via open passenger bus luggage without dedicated cold-foam packs and ice gels to save ₦1,500 on packaging, we will politely decline to protect your flock from vaccine failure.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>Tuesday &amp; Weekend Dispatches</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our interstate delivery schedules operate strictly on Mondays and Thursdays. We do not dispatch biologicals or day-old stock on Fridays or weekends to prevent cartons sitting trapped in transit depots.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>Unregulated Off-Label Drugs</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you are seeking banned antibiotics, unapproved veterinary concoctions, or unlabeled bulk powders without NAFDAC manufacturer dossiers, D-AminGrow strictly refuses to stock or distribute them.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <span>If you align with disciplined commercial biosecurity, we are built for you.</span>
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20reviewed%20your%20standards%20and%20want%20to%20partner%20with%20your%20desk."
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
              >
                Discuss Your Farm Setup <ChevronRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. VERIFIED COMMERCIAL CLIENTS CASE STUDIES
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Users className="h-3.5 w-3.5" />
              Real Nigerian Commercial Results
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Commercial Poultry Clients Who Rely on Our Support Desk
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              From commercial broilers in Oyo to brown layers in Delta and Ogun, here is how responsive logistics protects farm bottom lines:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 font-heading">Ajila Farm</span>
                  <span className="text-emerald-600 font-semibold font-mono">Oyo State</span>
                </div>
                <div className="text-xs text-amber-500">★★★★★ 5.0 Verified Client</div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  &ldquo;When you book 5,000 broilers, having direct phone contact with the waybill driver at 6:30 AM before heat builds up makes all the difference. D-AminGrow is the only distributor where the support desk actually stays on the line until the last carton is counted into the pen.&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                Flock: 5,000 Commercial Broilers · 98.6% 1st-Week Livability
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 font-heading">Loveday Farm</span>
                  <span className="text-emerald-600 font-semibold font-mono">Delta State</span>
                </div>
                <div className="text-xs text-amber-500">★★★★★ 5.0 Verified Client</div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  &ldquo;Shipping live vaccines to Warri used to give us constant failed titers. With D-AminGrow, the cold-pack boxes arrive still iced with indicator strips green. Their veterinary WhatsApp desk walked our pen manager through Newcastle LaSota administration on Day 21 without extra consultancy charges.&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                Flock: 2,500 ISA Brown Layers · Continuous 2°C–8°C Verified
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 font-heading">Dr Austin Farm</span>
                  <span className="text-emerald-600 font-semibold font-mono">Ogun State</span>
                </div>
                <div className="text-xs text-amber-500">★★★★★ 5.0 Verified Client</div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  &ldquo;The official corporate Zenith Bank account gives my investors 100% security. No personal account transfers, no stories. Booking allocations are sent with formal references and chicks arrive exactly on Thursday schedule.&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                Flock: 4,000 Broilers &amp; Turkeys · Scheduled Thursday Batching
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. FREQUENTLY ASKED QUESTIONS (ACCORDION)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Clock className="h-3.5 w-3.5" />
              Direct Answers
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Clear, practical operational facts for poultry and livestock producers.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold font-heading text-slate-900">
                    {item.q}
                  </span>
                  <ChevronRight
                    className={`h-5 w-5 text-emerald-600 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs sm:text-sm text-slate-500 mb-3">
              Have an urgent question that is not covered above?
            </p>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20have%20a%20specific%20question%20not%20covered%20in%20your%20FAQ."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:border-emerald-300 transition-all"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              Ask Our Operations Desk On WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. SOFT CONVERSION CTA SECTION
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-[#050E08] text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Your Satisfaction Is Our Priority
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Protect Your Farm Capital With A Direct Agro-Allied Partner
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stop gambling on anonymous booking syndicates and warm vaccine deliveries. Join hundreds of commercial poultry and livestock farmers across Nigeria who count on D-AminGrow every Monday and Thursday.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20am%20ready%20to%20discuss%20chick%20allocation%20and%20supplies%20for%20my%20farm."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Chat With Our Technical Operations Desk
            </a>

            <Link
              href="/chicks"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 text-base border border-white/15 hover:-translate-y-0.5"
            >
              View Day-Old Chicks Pricing
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Authorized Zenith Bank: 1017894562
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Mon &amp; Thu Synchronized Dispatch
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Zero Counterfeits Policy
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ContactClient;
