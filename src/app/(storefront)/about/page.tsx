import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { HATCHERY_PARTNERS, CLIENT_FARMS } from '@/data/partners-and-clients';
import {
  Target,
  Compass,
  Globe2,
  Award,
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Building,
  HelpCircle,
  Feather,
  Syringe,
  ChevronRight,
  TrendingUp,
  MessageCircle,
  Star,
  HeartHandshake,
  Leaf,
  MapPin,
  Building2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About D-AminGrow — Goal, Aim, Vision & Our Story | Agro-Allied Company Nigeria',
  description:
    'D-AminGrow is Nigeria\'s specialized agro-allied company for livestock vaccines, veterinary drugs, day-old chicks, and farm consultation. Dedicated to improving Africa\'s livestock sector.',
  openGraph: {
    title: 'About D-AminGrow — Your Satisfaction Is Our Priority',
    description:
      'Building communities of healthy livestock and healthy living across Nigeria and Africa through certified inputs and professional advisory.',
    type: 'website',
  },
};

const SERVICES = [
  { title: 'Day-Old Chicks Sales & Distribution', icon: Feather, link: '/chicks', color: 'bg-amber-100 text-amber-700' },
  { title: 'Livestock Vaccine Sales & Distribution', icon: Syringe, link: '/vaccines', color: 'bg-cyan-100 text-cyan-700' },
  { title: 'Antibiotics, Probiotics & Supplements', icon: Stethoscope, link: '/drugs', color: 'bg-emerald-100 text-emerald-700' },
  { title: 'Livestock Housing & Rearing Equipment', icon: Building, link: '/accessories', color: 'bg-slate-100 text-slate-700' },
  { title: 'Livestock Technical Services', icon: ShieldCheck, link: '/services', color: 'bg-teal-100 text-teal-700' },
  { title: 'Agricultural Consultation Services', icon: HelpCircle, link: '/services', color: 'bg-violet-100 text-violet-700' },
];

export default function AboutPage() {
  return (
    <div className="font-body">

      {/* ====================================================================
          HERO — About
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">About D-AminGrow</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-7">
              <div className="section-label-dark w-fit">
                <Award className="h-3.5 w-3.5" />
                Our Story & Mission
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
                Transforming Africa&apos;s{' '}
                <span className="text-gradient-green">Livestock Sector</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed">
                D-AminGrow is a specialized agro-allied enterprise dedicated to empowering Nigerian and African farmers through certified livestock vaccines, high-potency veterinary drugs, durable farm accessories, and professional advisory services.
              </p>

              <div className="flex items-center gap-3 bg-white/5 border border-emerald-500/20 rounded-2xl px-5 py-4">
                <Award className="h-6 w-6 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm text-slate-300 font-medium italic">
                    &ldquo;Your Satisfaction Is Our Priority&rdquo;
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">Our Core Motto & Promise</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20learn%20more%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  Get In Touch
                </a>
                <Link
                  href="/services"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  Our Services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right: Logo & Stats */}
            <div className="space-y-6">
              {/* Logo Display */}
              <div className="relative h-64 rounded-3xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5" />
                <Image
                  src="/Brand identity/damingrow logo.png"
                  alt="D-AminGrow Logo"
                  width={240}
                  height={240}
                  className="relative z-10 object-contain drop-shadow-2xl"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '36+', label: 'States Served', icon: MapPin },
                  { value: '100%', label: 'NAFDAC Verified', icon: ShieldCheck },
                  { value: '2°–8°C', label: 'Cold-Chain', icon: Star },
                  { value: '2hrs', label: 'Response Time', icon: TrendingUp },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="rounded-2xl bg-white/5 border border-white/8 p-4 text-center">
                      <Icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                      <div className="text-xl font-extrabold text-white font-heading">{stat.value}</div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ====================================================================
          MISSION, AIM, VISION — Pillars
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Leaf className="h-3.5 w-3.5" />
              Our Foundation
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
              Purpose, Aim & Vision
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Every chick dispatched, every vaccine preserved, and every consultation delivered is guided by our core mandate to transform African agriculture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Goal */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-8 sm:p-10 space-y-5 group hover:shadow-xl hover:shadow-emerald-50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-100/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-5">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 mb-2">01 / Our Goal</div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-3">Drive Sector Growth</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To help improve the livestock sector in Nigeria and Africa, by introducing the latest information, scientific management techniques, and healthy solutions to the livestock market.
                </p>
              </div>
            </div>

            {/* Aim */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-50 to-white border border-teal-100 p-8 sm:p-10 space-y-5 group hover:shadow-xl hover:shadow-teal-50 transition-all duration-300 lg:mt-6">
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-100/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30 mb-5">
                  <Compass className="h-8 w-8 text-white" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-teal-600 mb-2">02 / Our Aim</div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-3">Healthy Communities</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To build vibrant communities of healthy livestock, which directly underpins food security, nutritional excellence, and the overall healthy living of our people across Africa.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-50 to-white border border-cyan-100 p-8 sm:p-10 space-y-5 group hover:shadow-xl hover:shadow-cyan-50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-100/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-5">
                  <Globe2 className="h-8 w-8 text-white" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-cyan-600 mb-2">03 / Our Vision</div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-3">Global Excellence</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To see the African livestock market becoming significantly better, highly productive, and globally competitive across international agricultural standards and best practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SERVICES OVERVIEW
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              What We Offer
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Our Professional Services
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              End-to-end technical support and verified input supplies for commercial poultry and livestock farmers across Nigeria and West Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={idx}
                  href={srv.link}
                  className="service-card group flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-7 hover:border-emerald-200 transition-all"
                >
                  <div className={`h-12 w-12 rounded-2xl ${srv.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                      {srv.title}
                    </h3>
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      Learn More <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          HOW WE OPERATE — Pricing Policy
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-200 p-8 sm:p-12 space-y-7">

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center shrink-0">
                <HeartHandshake className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mb-2">
                  How We Operate: Dynamic Market Rates
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Because livestock supplies and day-old chicks are subject to weekly market variations influenced by grain feed costs, parent-stock genetics, and seasonal demand — we do not advertise static retail prices. Instead, our technical sales desk communicates today&apos;s confirmed prices directly to you, prepares transparent delivery waybills, and coordinates timely dispatch to your state.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { step: '1', title: 'Contact Us', desc: 'Reach out via WhatsApp or our contact form with your product request.' },
                { step: '2', title: 'Get Confirmed Price', desc: 'Our team shares today\'s verified market rate and availability.' },
                { step: '3', title: 'Book & Dispatch', desc: 'Confirm your order and we coordinate dispatch to your location.' },
              ].map((step) => (
                <div key={step.step} className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20request%20today%27s%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm shadow-md"
              >
                <Phone className="h-4 w-4" />
                Contact Desk (+234 813 916 9402)
              </a>
              <Link
                href="/services"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
              >
                Book Farm Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          HATCHERY PARTNERSHIPS
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Building2 className="h-3.5 w-3.5" />
              Sourcing Integrity
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Hatcheries We Work With
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We collaborate with premier grandparent and parent-stock breeding centers across Nigeria to ensure commercial farmers receive genuine first-generation genetics with verified biosecurity and maternal immunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HATCHERY_PARTNERS.map((hatchery) => (
              <div
                key={hatchery.id}
                className="rounded-3xl bg-white border border-slate-200 p-7 space-y-4 hover:shadow-lg transition-shadow group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      {hatchery.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{hatchery.location.split(',')[0]}</span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {hatchery.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {hatchery.establishedRole}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {hatchery.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Breeds & Strains</div>
                  <div className="flex flex-wrap gap-1.5">
                    {hatchery.specialtyBreeds.map((breed, bIdx) => (
                      <span
                        key={bIdx}
                        className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md"
                      >
                        {breed}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          CLIENT FARMS & COMMERCIAL GROWERS
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Award className="h-3.5 w-3.5" />
              Commercial Clients
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Trusted by Leading Commercial Farms
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We proudly supply day-old chicks, cold-chain vaccines, high-potency veterinary inputs, and technical advice to commercial poultry operations across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLIENT_FARMS.map((farm) => (
              <div
                key={farm.id}
                className="rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-300 hover:bg-white transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                      {farm.flockType.split('&')[0]}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{farm.relationshipYears}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors">
                    {farm.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    {farm.location}
                  </p>
                  <p className="text-xs text-slate-600 italic leading-relaxed pt-2 border-t border-slate-200">
                    &ldquo;{farm.testimonialSnippet}&rdquo;
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>Capacity</span>
                  <span className="font-semibold text-slate-800">{farm.flockCapacity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/reviews"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
            >
              Read Verified Reviews & Case Studies
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/vaccination-program"
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium px-6 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all text-sm"
            >
              Explore Official Vaccination Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


