import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Syringe,
  Stethoscope,
  ShieldCheck,
  Thermometer,
  Droplets,
  HeartPulse,
  CheckCircle2,
  MessageCircle,
  Phone,
  ArrowRight,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Award,
  Wrench,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Livestock Technical Services — On-Farm Vaccination, Diagnostics & Biosecurity | D-AminGrow Nigeria',
  description:
    'Certified D-AminGrow field technicians provide on-farm vaccination administration, post-mortem disease diagnostics, biosecurity audit and setup, gas brooder calibration, and nipple drinker flushing across all 36 Nigerian states.',
  openGraph: {
    title: 'On-Farm Livestock Technical Services | D-AminGrow Nigeria',
    description:
      'Certified technicians for on-farm vaccination, disease diagnostics, biosecurity audits, and equipment calibration across Nigeria.',
  },
};

const TECH_SERVICES = [
  {
    icon: Syringe,
    title: 'On-Farm Vaccination Administration',
    desc: 'Precision vaccination by trained field technicians using aseptic technique. Covers eye-drop, subcutaneous, intramuscular, spray, and drinking-water routes for Newcastle, Gumboro, Marek\'s, Fowl Pox, and combined killed vaccines.',
    color: 'bg-emerald-100 text-emerald-700',
    deliverables: ['Vaccination record sheet', 'Titer monitoring advice', 'Follow-up booster schedule'],
  },
  {
    icon: Stethoscope,
    title: 'Post-Mortem Disease Diagnostics',
    desc: 'Field necropsy and gross lesion evaluation to identify the primary cause of elevated flock mortality, production drop, or unusual clinical signs. Includes targeted specimen collection for laboratory confirmation.',
    color: 'bg-violet-100 text-violet-700',
    deliverables: ['Written necropsy report', 'Disease diagnosis + differential list', 'Treatment protocol recommendation'],
  },
  {
    icon: ShieldCheck,
    title: 'Biosecurity Audit & Farm Setup',
    desc: 'Comprehensive site visit evaluating visitor control points, disinfectant footbath stations, feed storage hygiene, dead bird disposal protocols, and vector entry risks. Includes written remediation priority list.',
    color: 'bg-cyan-100 text-cyan-700',
    deliverables: ['Biosecurity risk score report', 'Priority action remediation list', 'Disinfection protocol guide'],
  },
  {
    icon: Thermometer,
    title: 'Gas Brooder Calibration & Setup',
    desc: 'On-site inspection, gas pressure setting, and temperature zone mapping for infrared canopy and flat-deck gas brooders. Ensures optimal 32°C–35°C floor temperature for day-old chick reception and first-week livability.',
    color: 'bg-amber-100 text-amber-700',
    deliverables: ['Temperature map of brooding zone', 'Gas pressure settings sheet', 'Chick reception checklist'],
  },
  {
    icon: Droplets,
    title: 'Nipple Drinker Line Flushing & Calibration',
    desc: 'Full waterline flushing with organic acid treatment to eliminate bacterial biofilm and mineral scale. Pressure setting calibration to correct flow rate per bird age ensures optimal daily water intake.',
    color: 'bg-sky-100 text-sky-700',
    deliverables: ['Pre/post water quality comparison', 'System pressure setting log', 'Waterline maintenance schedule'],
  },
  {
    icon: HeartPulse,
    title: 'Flock Health Screening & Advisory',
    desc: 'Systematic clinical examination of random bird sample for early detection of respiratory signs, lameness, feather abnormalities, and comb discoloration. Generates an early intervention report before mortality peaks.',
    color: 'bg-rose-100 text-rose-700',
    deliverables: ['Clinical health score per flock', 'Risk-flagged birds list', 'Targeted intervention advice'],
  },
];

const BENEFITS = [
  {
    icon: Award,
    title: 'Certified & Experienced Technicians',
    desc: 'Our field team holds professional veterinary or animal science credentials and has hands-on experience across commercial broiler, layer, and turkey enterprises in Nigeria.',
  },
  {
    icon: MapPin,
    title: 'Nationwide Farm Reach',
    desc: 'Field technicians deployable to all 36 states and FCT. Scheduling confirmed within 24–48 hours for farms across Southwest, Southeast, North Central, and North West zones.',
  },
  {
    icon: Clock,
    title: 'Same-Day Emergency Response',
    desc: 'Sudden flock mortality events receive priority escalation. Emergency farm visits scheduled within hours for critical disease outbreak situations via our WhatsApp desk.',
  },
  {
    icon: ShieldCheck,
    title: 'Aseptic & Biosecure Protocol',
    desc: 'All technicians shower-in/out, use disposable PPE, and follow strict biosecurity crossing protocols to prevent cross-farm contamination between consecutive visits.',
  },
  {
    icon: Users,
    title: 'Full After-Visit Documentation',
    desc: 'Every technical visit is followed by a written report with findings, actions taken, and next-step recommendations delivered via WhatsApp within 24 hours.',
  },
  {
    icon: Wrench,
    title: 'Equipment & Drug Carrying Kits',
    desc: 'Our technicians arrive with calibrated vaccination equipment, sterile needles, syringes, cold-chain vaccine carriers, and first-response drug kits.',
  },
];

export default function TechnicalServicesPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link href="/services" className="hover:text-emerald-600 transition-colors">Services</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 font-medium">Technical Services</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#050E08] via-emerald-950 to-[#050E08] pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">
              <Wrench className="h-4 w-4" />
              Certified Field Technical Services
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-[1.05] mb-6">
              On-Farm Technical Services{' '}
              <span className="text-emerald-400">Across Nigeria</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl">
              D-AminGrow deploys certified field technicians to your farm for hands-on vaccination, disease diagnostics, biosecurity audits, and equipment calibration. Your flock&apos;s health is managed by professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20to%20book%20a%20technical%20farm%20visit.%20My%20location%20is%20%5BLOCATION%5D.%20Please%20advise%20on%20availability%20and%20cost."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-2xl transition-all text-sm shadow-lg shadow-[#25D366]/20"
              >
                <MessageCircle className="h-5 w-5" />
                Book a Farm Visit
              </a>
              <a
                href="tel:+2348139169402"
                className="flex items-center gap-2 text-slate-300 hover:text-white font-semibold px-7 py-4 rounded-2xl border border-white/15 hover:border-white/30 transition-all text-sm"
              >
                <Phone className="h-5 w-5" />
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {[
              { value: '36', label: 'States Covered', sub: 'Nationwide reach' },
              { value: '24–48h', label: 'Scheduling', sub: 'Farm visit booking turnaround' },
              { value: '6+', label: 'Technical Services', sub: 'On-farm expertise areas' },
              { value: 'Same Day', label: 'Emergency Response', sub: 'Critical outbreak escalation' },
            ].map((stat, i) => (
              <div key={i} className="px-6 py-8 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-700">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-900 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Service Cards */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
              <Star className="h-3.5 w-3.5" />
              What We Do On-Site
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              6 Expert Technical Services
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Every service is delivered by a trained professional with aseptic equipment and followed by a written report and next-step plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="rounded-3xl bg-white border border-slate-200 p-7 space-y-5 hover:shadow-xl hover:border-slate-300 transition-all group">
                  <div className={`h-14 w-14 rounded-2xl ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading mb-2">{service.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{service.desc}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Deliverables</div>
                    {service.deliverables.map((d, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-600">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why D-AminGrow Technicians */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full">
              <Award className="h-3.5 w-3.5" />
              Why Choose Our Technicians
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Professional, Biosecure & Fully Documented
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="rounded-3xl bg-slate-50 border border-slate-200 p-6 space-y-3 hover:shadow-lg transition-all">
                  <div className="h-11 w-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-gradient-to-br from-[#050E08] to-emerald-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">
            <Clock className="h-4 w-4" />
            Respond Within 2 Hours
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4">
            Ready to Book a Technical Farm Visit?
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Tell us your location, farm size, and what technical service you need. Our team schedules within 24–48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20to%20book%20a%20technical%20farm%20visit.%20My%20location%20is%20%5BLOCATION%5D.%20Please%20advise%20on%20availability%20and%20cost."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-2xl transition-all text-sm shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp — Book Farm Visit
            </a>
            <a
              href="tel:+2348139169402"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-sm"
            >
              <Phone className="h-5 w-5" />
              +234 813 916 9402
            </a>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">Explore Related Services</h3>
              <p className="text-xs text-slate-500 mt-1">Use our diagnostic tools or book a full consultation</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/services" className="flex items-center gap-2 text-slate-700 font-semibold text-sm bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:border-slate-300 transition-all">
                <ArrowRight className="h-4 w-4" /> All Services
              </Link>
              <Link href="/calculators/symptom-checker" className="flex items-center gap-2 text-emerald-700 font-semibold text-sm bg-emerald-50 border border-emerald-200 px-5 py-2.5 rounded-xl hover:bg-emerald-100 transition-all">
                Disease Symptom Checker <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services/consultation" className="flex items-center gap-2 text-slate-700 font-semibold text-sm bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:border-slate-300 transition-all">
                Book Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
