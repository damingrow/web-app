import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  Syringe,
  Stethoscope,
  Wheat,
  TrendingUp,
  CheckCircle2,
  MessageCircle,
  Phone,
  ArrowRight,
  ChevronRight,
  Star,
  Clock,
  Users,
  HeartHandshake,
  ClipboardList,
  PhoneCall,
  MapPin,
  FileText,
} from 'lucide-react';
import { VeterinaryTriageForm } from '@/components/forms/veterinary-triage-form';

export const metadata: Metadata = {
  title: 'Poultry Farm Consultation Services Nigeria — Housing, Health & Business Planning | D-AminGrow',
  description:
    'D-AminGrow offers expert poultry farm consultation: housing design, custom vaccination schedules, flock health diagnostics, feed program optimization, and farm business ROI planning across Nigeria.',
  openGraph: {
    title: 'Poultry Farm Consultation Services | D-AminGrow Nigeria',
    description:
      'Expert farm advisory for housing design, vaccination programs, disease diagnostics, nutrition, and financial planning for poultry businesses in Nigeria.',
  },
};

const CONSULTATION_AREAS = [
  {
    icon: Building2,
    title: 'Poultry Housing & Pen Construction Design',
    desc: 'Turnkey engineering advisory for open-sided tropical pens, closed-house ventilation broiler sheds, and multi-tier layer battery cage infrastructure. Includes material cost estimation, ventilation design, and equipment specification.',
    color: 'bg-amber-100 text-amber-700',
    deliverables: ['Pen layout blueprint', 'Material cost estimation', 'Ventilation design spec', 'Equipment list'],
    href: '/services/consultation/farm-setup',
    ctaText: 'Launch Farm Setup Blueprint Tool',
  },
  {
    icon: Stethoscope,
    title: 'Emergency Flock Health Diagnostics & Triage',
    desc: 'Systematic clinical scoring for acute mortality, post-mortem necropsy protocols, and urgent viral challenge escalation directly to our duty VCN-certified veterinary clinicians.',
    color: 'bg-red-100 text-red-700',
    deliverables: ['Emergency triage score', 'Differential diagnosis', 'Treatment protocol', 'Direct VCN escalation'],
    href: '/services/consultation/disease-triage',
    ctaText: 'Start Emergency Disease Triage',
  },
  {
    icon: Wheat,
    title: 'Feed & Nutrition Program Optimization',
    desc: 'Analysis of current feed program, raw material quality, and Pearson Square Crude Protein formulation. Identifies amino acid gaps (Lysine, Methionine) and calcium balance to reduce production cost.',
    color: 'bg-lime-100 text-lime-700',
    deliverables: ['Pearson square calculation', 'Feed program revision', 'Cost-per-kg feed review', 'FCR improvement targets'],
    href: '/services/consultation/feed-formulation',
    ctaText: 'Open Feed Formulation Tool',
  },
  {
    icon: Syringe,
    title: 'Farm Biosecurity & Viral Disease Defence Audit',
    desc: '10-point barrier assessment evaluating perimeter fencing, disinfectant footbaths, water chlorination, and wild bird exclusion to eliminate viral breach risks.',
    color: 'bg-cyan-100 text-cyan-700',
    deliverables: ['10-point defence scorecard', 'Biosecurity index', 'Custom vaccination timetable', 'Barrier protocol'],
    href: '/services/consultation/biosecurity-audit',
    ctaText: 'Perform Biosecurity Audit',
  },
  {
    icon: TrendingUp,
    title: 'Poultry Business Financial Planning & ROI Modeling',
    desc: 'Full farm economic model including startup capital estimation, monthly operating costs, break-even analysis, projected revenue from eggs or meat, and sensitivity analysis for feed price fluctuations common in Nigeria.',
    color: 'bg-emerald-100 text-emerald-700',
    deliverables: ['Investment cost sheet', 'Break-even analysis', 'Monthly cash flow model', '12-month profit projection'],
    href: '#triage-form',
    ctaText: 'Request Financial Model',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    icon: MessageCircle,
    title: 'WhatsApp Enquiry',
    desc: 'Message us your farm type, size, location, and primary challenge. We respond within 2 hours with initial advice.',
  },
  {
    step: '02',
    icon: PhoneCall,
    title: 'Needs Assessment Call',
    desc: 'A 20–40 minute structured phone or video call with our senior consultant to understand your specific operational challenges and goals.',
  },
  {
    step: '03',
    icon: MapPin,
    title: 'Farm Visit or Remote Analysis',
    desc: 'Physical visit to your farm location for hands-on assessment, or a remote analysis based on photos, videos, and data you provide.',
  },
  {
    step: '04',
    icon: FileText,
    title: 'Deliverables Report & Ongoing Support',
    desc: 'Comprehensive written report with findings, recommendations, and action plan. Followed by 30-day WhatsApp support for implementation.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Alhaji Musa Garba',
    location: 'Kano State',
    role: 'Commercial Broiler Farmer (10,000 birds)',
    quote: 'D-AminGrow consultants redesigned our broiler pen ventilation and revised our feed program. Our FCR dropped from 2.1 to 1.75 in two cycles. That is money directly back into my pocket. Highly recommended.',
    avatar: 'MG',
  },
  {
    name: 'Mrs. Adaeze Okonkwo',
    location: 'Enugu State',
    role: 'Commercial Layer Farmer (5,000 birds)',
    quote: 'I was losing 3–5 birds daily from unexplained respiratory signs for 3 weeks. D-AminGrow\'s technician came to my farm within 48 hours, diagnosed Mycoplasma + IB complex, and gave me a treatment protocol. Mortality dropped to zero in 4 days.',
    avatar: 'AO',
  },
  {
    name: 'Mr. Biodun Adesanya',
    location: 'Oyo State',
    role: 'Startup Poultry Investor',
    quote: 'As a first-time poultry investor, I was confused about housing design, which breeds to choose, and how much capital I needed. D-AminGrow built me a full business plan and supervised my pen construction. My first batch of 2,000 broilers recorded 98% livability.',
    avatar: 'BA',
  },
];

export default function ConsultationPage() {
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
            <span className="text-slate-900 font-medium">Farm Consultation</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#050E08] via-slate-900 to-emerald-950 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl translate-x-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">
              <HeartHandshake className="h-4 w-4" />
              Expert Farm Advisory
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-[1.05] mb-6">
              Poultry Farm Consultation{' '}
              <span className="text-emerald-400">Services</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-4 max-w-2xl">
              Whether you&apos;re building your first pen, troubleshooting an outbreak, or planning a 10,000-bird expansion, D-AminGrow is backed by over 20 years of combined agricultural leadership and veterinary expertise brought directly to your farm.
            </p>
            <p className="text-sm text-slate-500 mb-10">
              Serving commercial broiler, layer, turkey, and mixed livestock operations across all 36 states.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#clinical-triage"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-4 rounded-2xl transition-all text-sm shadow-lg shadow-emerald-950/40"
              >
                <Stethoscope className="h-5 w-5" />
                Start Clinical Triage
              </a>
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20a%20farm%20consultation.%20My%20type%20of%20farm%20is%20%5BTYPE%5D.%20Please%20guide%20me%20on%20the%20next%20steps."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-4 rounded-2xl transition-all text-sm shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                Book via WhatsApp
              </a>
              <a
                href="tel:+2348139169402"
                className="flex items-center gap-2 text-slate-300 hover:text-white font-semibold px-6 py-4 rounded-2xl border border-white/15 hover:border-white/30 transition-all text-sm"
              >
                <Phone className="h-5 w-5" />
                Direct Hotline
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Diagnostic Triage Section */}
      <section id="clinical-triage" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
              <Stethoscope className="h-3.5 w-3.5" />
              Emergency & Diagnostic Intake
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Interactive Clinical Health Triage
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Enter your flock size, age, mortality symptoms, and medication history. Receive an instant urgency score and connect directly with a qualified veterinary specialist.
            </p>
          </div>

          <VeterinaryTriageForm />
        </div>
      </section>

      {/* Consultation Areas */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
              <ClipboardList className="h-3.5 w-3.5" />
              Consultation Areas
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              5 Expert Advisory Areas
            </h2>
            <p className="text-slate-600 leading-relaxed">
              From pen construction to financial modelling — our consultants cover the full lifecycle of a profitable poultry operation.
            </p>
          </div>

          <div className="space-y-5">
            {CONSULTATION_AREAS.map((area, i) => {
              const Icon = area.icon;
              return (
                <div key={i} className="rounded-3xl bg-slate-50 border border-slate-200 p-7 sm:p-9 flex flex-col sm:flex-row gap-6 hover:shadow-lg hover:border-slate-300 transition-all">
                  <div className={`h-14 w-14 rounded-2xl ${area.color} flex items-center justify-center shrink-0`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-900 font-heading">{area.title}</h3>
                      {area.href && (
                        <Link
                          href={area.href}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-200 px-3 py-1.5 rounded-xl shadow-sm shrink-0 transition-colors w-fit"
                        >
                          <span>{area.ctaText}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{area.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.deliverables.map((d, j) => (
                        <span key={j} className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                          <CheckCircle2 className="h-3 w-3" />
                          {d}
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

      {/* How It Works */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full">
              <Star className="h-3.5 w-3.5" />
              Our Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              How a Consultation Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative rounded-3xl bg-white border border-slate-200 p-7 space-y-4 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-4xl font-extrabold text-slate-100 font-heading">{step.step}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 text-slate-300">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
              <Users className="h-3.5 w-3.5" />
              Client Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              What Farmers Say About D-AminGrow
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-3xl bg-slate-50 border border-slate-200 p-8 space-y-5 hover:shadow-lg transition-all">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                    <div className="text-xs text-emerald-600 font-medium">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#050E08] to-emerald-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">
            <Clock className="h-4 w-4" />
            Respond Within 2 Hours
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4">
            Ready to Transform Your Farm&apos;s Profitability?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Tell us your farm type, size, and biggest challenge. Our agricultural consultants will get back to you within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20a%20farm%20consultation.%20My%20type%20of%20farm%20is%20%5BTYPE%5D.%20Please%20guide%20me%20on%20the%20next%20steps."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-2xl transition-all text-sm"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp — Book Consultation
            </a>
            <Link
              href="/services/technical"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-sm"
            >
              View Technical Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Explore More Services</h3>
            <p className="text-xs text-slate-500 mt-1">Products, tools and advisory all in one place</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/services" className="flex items-center gap-2 text-slate-700 font-semibold text-sm bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:border-slate-300 transition-all">
              <ArrowRight className="h-4 w-4" /> All Services
            </Link>
            <Link href="/services/technical" className="flex items-center gap-2 text-emerald-700 font-semibold text-sm bg-emerald-50 border border-emerald-200 px-5 py-2.5 rounded-xl hover:bg-emerald-100 transition-all">
              Technical Services <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/knowledge" className="flex items-center gap-2 text-slate-700 font-semibold text-sm bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:border-slate-300 transition-all">
              Knowledge Centre <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
