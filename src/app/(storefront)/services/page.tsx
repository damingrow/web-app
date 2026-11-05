'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { generateConsultationWhatsAppLink } from '@/lib/whatsapp';
import {
  Stethoscope,
  Building2,
  Syringe,
  Wheat,
  CheckCircle2,
  Send,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Star,
  Users,
  Clock,
  MapPin,
  ChevronRight,
  Feather,
  Pill,
  Home,
  HeartHandshake,
  TrendingUp,
  BookOpen,
  Egg,
} from 'lucide-react';

const SERVICE_PAGES = [
  {
    id: 'chicks',
    title: 'Day-Old Chicks Sales & Distribution',
    href: '/services/chicks',
    icon: Feather,
    description: 'Premium commercial broilers, Zartech pullets, turkeys, noilers and cockerels from certified breeding partners, dispatched nationwide every Monday and Thursday.',
    features: [
      'Pre-vaccinated against Marek\'s Disease at day 1',
      'Monday & Thursday nationwide dispatch',
      'Climate-monitored transport cartons',
      '50 chicks per carton standard guarantee',
      'Available: Broilers, Pullets, Turkeys, Noilers, Cockerels',
    ],
    badge: 'Mon & Thu Dispatch',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    gradient: 'from-amber-500/15 to-amber-600/5',
    borderColor: 'border-amber-200',
  },
  {
    id: 'vaccines',
    title: 'Livestock Vaccine Sales & Distribution',
    href: '/services/vaccines',
    icon: Syringe,
    description: 'Live freeze-dried viral and bacterial vaccines shipped under verified 2°C–8°C cold-chain with certified ice gel packs.',
    features: [
      'Continuous 2°C–8°C cold-chain guarantee',
      'Newcastle Disease (LaSota) vaccine',
      'Gumboro (IBD) Intermediate Plus vaccine',
      'Marek\'s Disease (HVT) vaccine',
      'Fowl Pox & other viral vaccines available',
    ],
    badge: '2°C–8°C Cold-Chain',
    badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-200',
    gradient: 'from-cyan-500/15 to-cyan-600/5',
    borderColor: 'border-cyan-200',
  },
  {
    id: 'drugs',
    title: 'Antibiotics, Probiotics & Supplements',
    href: '/services/drugs',
    icon: Pill,
    description: 'NAFDAC-registered broad-spectrum therapeutics, targeted anticoccidials, gut health probiotics, and anti-stress vitamin premixes.',
    features: [
      'NAFDAC-registered batch numbers on all products',
      'Oxytetracycline, Ciprofloxacin, Norfloxacin',
      'Cocci-Ton anticoccidial treatment',
      'Vitamin C anti-stress water-soluble powder',
      'DL-Methionine feed amino acid supplement',
    ],
    badge: 'NAFDAC Registered',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    gradient: 'from-emerald-500/15 to-emerald-600/5',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'accessories',
    title: 'Housing & Rearing Equipment',
    href: '/accessories',
    icon: Home,
    description: 'Heavy-duty commercial poultry equipment: gas brooders, battery cages, nipple drinkers, feeders, and defeathering machines.',
    features: [
      'Infrared radiant gas brooder heaters (LPG)',
      'Automated galvanized A-frame battery cages',
      '360° stainless steel nipple drinkers',
      'Commercial defeathering plucker machines',
      'Poultry transport crates & egg holding trays',
    ],
    badge: 'Heavy-Duty Commercial',
    badgeColor: 'text-slate-700 bg-slate-50 border-slate-200',
    gradient: 'from-slate-500/15 to-slate-600/5',
    borderColor: 'border-slate-200',
  },
  {
    id: 'point-of-lay',
    title: 'Sales & Distribution of Point-of-Lay Birds',
    href: '/services/point-of-lay',
    icon: Egg,
    description: 'Fully grown 17–20 week brown and white layer pullets with 100% completed vaccination timetables, ready to start laying eggs immediately.',
    features: [
      '17–20 weeks of age (point-of-lay ready)',
      '100% completed vaccination timetable',
      'Brown & White egg-laying genetics',
      'Begin daily egg income within 7–14 days',
      'Specialized crate dispatch across Nigeria',
    ],
    badge: 'Production-Ready',
    badgeColor: 'text-teal-700 bg-teal-50 border-teal-200',
    gradient: 'from-teal-500/15 to-teal-600/5',
    borderColor: 'border-teal-200',
  },
  {
    id: 'technical',
    title: 'Livestock Technical Services',
    href: '/services/technical',
    icon: ShieldCheck,
    description: 'On-farm clinical vaccination, biosecurity setup, post-mortem disease diagnostics, and automated equipment installation.',
    features: [
      'On-farm vaccination administration',
      'Nipple drinking line pressure calibration',
      'Gas brooder temperature regulation',
      'Flock health screening & post-mortem',
      'Biosecurity barrier design & sanitization',
    ],
    badge: 'Certified Technicians',
    badgeColor: 'text-violet-700 bg-violet-50 border-violet-200',
    gradient: 'from-violet-500/15 to-violet-600/5',
    borderColor: 'border-violet-200',
  },
];

const CONSULTATION_SERVICES = [
  {
    icon: Building2,
    title: 'Poultry Housing & Pen Construction',
    description: 'Turnkey engineering advisory for open-sided tropical pens, closed-ventilation broiler sheds, and multi-tier layer battery cage infrastructure.',
    deliverables: ['Pen layout blueprint', 'Material cost estimation', 'Ventilation design', 'Equipment specification'],
  },
  {
    icon: Syringe,
    title: 'Flock Vaccination & Biosecurity Programs',
    description: 'Site-specific immunization programs aligned with endemic viral challenges in your agricultural zone (Newcastle, Gumboro, Marek\'s, Fowl Pox).',
    deliverables: ['Custom vaccination timetable', 'Disease risk assessment', 'Biosecurity protocols', 'Record-keeping templates'],
  },
  {
    icon: Stethoscope,
    title: 'Flock Health Diagnostics & Advisory',
    description: 'Field diagnostics, post-mortem lesion evaluation, and targeted clinical therapy to halt unexplained flock mortality and production drops.',
    deliverables: ['On-site field visit', 'Disease diagnosis report', 'Treatment protocol', 'Prevention strategy'],
  },
  {
    icon: Wheat,
    title: 'Feed Formulation & Nutrition Balancing',
    description: 'Nutritional ration balancing using local Nigerian grains, soybean meal, methionine, lysine, and enzymes for minimum cost per kg weight gain.',
    deliverables: ['Custom feed formula', 'Ingredient sourcing guide', 'FCR optimization plan', 'Seasonal adjustments'],
  },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(CONSULTATION_SERVICES[0]?.title ?? '');
  const [farmerName, setFarmerName] = useState('');
  const [phone, setPhone] = useState('');
  const [stateName, setStateName] = useState('');
  const [flockSize, setFlockSize] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !phone.trim() || !stateName.trim()) {
      setFormError('Please fill in your Name, Phone number, and Farm State.');
      return;
    }
    setFormError(null);
    setIsSubmitting(true);

    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: farmerName,
          phone,
          state: stateName,
          enquiryType: 'veterinary_consultation',
          notes: `Service: ${selectedService}. Flock Size: ${flockSize}. Notes: ${notes}`,
          consentMarketing: true,
        }),
      });
    } catch {
      // Non-blocking fallback
    }

    setIsSubmitting(false);
    setSubmitted(true);

    const waUrl = generateConsultationWhatsAppLink(selectedService, farmerName.trim(), flockSize.trim() || undefined);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="font-body">

      {/* ====================================================================
          HERO
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/8 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Services</span>
          </nav>

          <div className="max-w-4xl space-y-7">
            <div className="section-label-dark w-fit">
              <Stethoscope className="h-3.5 w-3.5" />
              Professional Services
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Complete Livestock Solutions{' '}
              <span className="text-gradient-green">for Nigerian Farmers</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
              From certified product distribution to on-farm veterinary consultation — D-AminGrow delivers end-to-end agricultural support that helps you build a profitable, biosecure livestock business.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                '✓ Certified Animal Health Specialists',
                '✓ On-Farm & Virtual Consultations',
                '✓ Practical Commercial Solutions',
                '✓ Serving All 36 States',
              ].map((item, i) => (
                <span key={i} className="text-sm text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ====================================================================
          PRODUCT SERVICES — 4 Cards
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <TrendingUp className="h-3.5 w-3.5" />
              Products & Distribution
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              What We Supply & Distribute
            </h2>
            <p className="text-base text-slate-600">
              All products available at dynamic market rates — contact us for confirmed current pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICE_PAGES.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  href={service.href}
                  className={`group relative rounded-3xl overflow-hidden border ${service.borderColor} bg-gradient-to-br ${service.gradient} p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className={`h-14 w-14 rounded-2xl bg-white border ${service.borderColor} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7 text-slate-700" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${service.badgeColor}`}>
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 group-hover:gap-3 transition-all">
                    View Products & Inquire Rates
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          TECHNICAL & CONSULTATION SERVICES
          ==================================================================== */}
      <section id="consultation" className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <HeartHandshake className="h-3.5 w-3.5" />
              Expert Advisory
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Technical & Consultation Services
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Evidence-based veterinary consultations, custom farm housing design, and flock disease control led by experienced livestock professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {CONSULTATION_SERVICES.map((srv, idx) => {
              const Icon = srv.icon;
              const isSelected = selectedService === srv.title;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedService(srv.title)}
                  className={`cursor-pointer rounded-3xl border p-7 transition-all duration-200 ${
                    isSelected
                      ? 'border-emerald-400 bg-white shadow-lg shadow-emerald-50 ring-2 ring-emerald-200'
                      : 'border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`rounded-2xl p-3.5 shrink-0 transition-all ${
                      isSelected ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-slate-900 font-heading">{srv.title}</h3>
                        {isSelected && (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            ✓ Selected
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{srv.description}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {srv.deliverables.map((d, i) => (
                          <span key={i} className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Consultation Form */}
          <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200 bg-white shadow-xl p-8 sm:p-12">
            <div className="border-b border-slate-100 pb-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                  <HeartHandshake className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-heading">Request a Consultation</h2>
                  <p className="text-xs text-slate-500">Free advisory · Response within 2 hours</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Submit your inquiry or reach our desk directly at{' '}
                <a href="https://wa.me/2348139169402" className="font-bold text-emerald-700 hover:text-emerald-800">
                  +234 813 916 9402
                </a>
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Consultation Request Sent!</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your consultation ticket has been logged. Our livestock consultant is awaiting your chat on WhatsApp to review your farm parameters.
                </p>
                <div className="pt-2">
                  <a
                    href={generateConsultationWhatsAppLink(selectedService, farmerName, flockSize)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Continue on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {formError && (
                  <div className="p-4 text-sm bg-red-50 border border-red-200 text-red-700 rounded-xl">
                    {formError}
                  </div>
                )}

                {/* Selected Service Display */}
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-1">Selected Service:</div>
                  <div className="text-sm font-semibold text-emerald-900">{selectedService}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Farmer / Enterprise Name *"
                    required
                    placeholder="e.g. Babatunde Adeyemi Farms"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                  />
                  <Input
                    label="WhatsApp Phone Number *"
                    required
                    placeholder="e.g. 0802 345 6789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Farm Location (State / LGA) *"
                    required
                    placeholder="e.g. Ogun State (Sagamu)"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                  />
                  <Input
                    label="Current Flock / Herd Size"
                    placeholder="e.g. 2,000 Broilers"
                    value={flockSize}
                    onChange={(e) => setFlockSize(e.target.value)}
                  />
                </div>

                <Input
                  label="Challenge or Service Request Details"
                  placeholder="e.g. Heat stress mortality in week 5 broilers, need pen ventilation advice"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="h-4 w-4" />
                    Direct Line: <strong className="text-slate-800">+234 813 916 9402</strong>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] disabled:opacity-60 text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? 'Submitting...' : 'Connect to Veterinary Desk'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          WHY OUR SERVICES
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-[#050E08] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-25" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="section-label-dark mx-auto w-fit">
              <Star className="h-3.5 w-3.5" />
              Our Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Why Farmers Trust D-AminGrow
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'Certified Products', desc: 'Every product is NAFDAC-registered with traceable batch numbers' },
              { icon: Users, title: 'Expert Team', desc: 'Trained animal health technicians with hands-on farm experience' },
              { icon: MapPin, title: 'Nationwide Reach', desc: 'Motor park dispatch to all 36 states with waybill tracking' },
              { icon: Clock, title: 'Fast Response', desc: 'We respond to all inquiries within 2 hours on WhatsApp' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="rounded-3xl bg-white/5 border border-white/8 p-7 text-center hover:bg-white/8 hover:border-emerald-500/25 transition-all group">
                  <div className="h-14 w-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-white font-heading mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20book%20a%20farm%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all text-base"
            >
              <MessageCircle className="h-5 w-5" />
              Book Free Consultation
            </a>
            <Link
              href="/knowledge"
              className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-base"
            >
              <BookOpen className="h-5 w-5" />
              Read Our Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
