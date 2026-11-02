import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import {
  Target,
  Compass,
  Globe2,
  Award,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  Truck,
  Building,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Goal, Aim, Vision & Services | D-AminGrow',
  description:
    'D-AminGrow is an agro-allied company specialized in livestock vaccines, veterinary drugs, farm accessories, technical consultation, and day-old chicks across Nigeria and Africa.',
  openGraph: {
    title: 'About D-AminGrow — Your Satisfaction Is Our Priority',
    description:
      'Building communities of healthy livestock and healthy living across Nigeria and Africa through current information and healthy solutions.',
    type: 'website',
  },
};

export default function AboutPage() {
  const services = [
    {
      title: 'Day-Old Chicks Sales & Distribution',
      description:
        'Direct sourcing and distribution of high-performance commercial broiler chicks and brown layer pullets from biosecure, certified primary hatcheries.',
      icon: Sparkles,
      link: '/chicks',
    },
    {
      title: 'Livestock Vaccine Sales & Distribution',
      description:
        'Strict 2°C–8°C cold-chain logistics for live viral and freeze-dried vaccines (Marek’s, Newcastle, Gumboro, Fowl Pox) in thermal insulated containers.',
      icon: Truck,
      link: '/vaccines',
    },
    {
      title: 'Antibiotics, Probiotics & Supplements',
      description:
        'NAFDAC-registered therapeutic pharmaceuticals, fast-acting anticoccidials, gut health probiotics, and water-soluble anti-stress vitamin premixes.',
      icon: Stethoscope,
      link: '/drugs',
    },
    {
      title: 'Livestock Housing & Rearing Equipment',
      description:
        'Infrared radiant canopy gas brooders, automatic stainless steel nipple lines, automated battery cages, bell drinkers, and defeathering machines.',
      icon: Building,
      link: '/accessories',
    },
    {
      title: 'Livestock Technical Services',
      description:
        'On-site flock vaccination administration, drinker pressure calibration, brooder temperature regulation, and farm biosecurity audits.',
      icon: ShieldCheck,
      link: '/services',
    },
    {
      title: 'Agricultural Consultation Services',
      description:
        'Professional livestock business planning, commercial pen design, feed formulation balancing, and disease prevention advisory for commercial farms.',
      icon: HelpCircle,
      link: '/services',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-body py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">About D-AminGrow</span>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-14 shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-5">
            <span className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
              <Award className="h-4 w-4" />
              <span>Agro-Allied Solutions & Professional Advisory</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight">
              About <span className="text-emerald-400">D-AminGrow</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              D-AminGrow is a specialized agro-allied enterprise dedicated to empowering farmers through certified livestock vaccines, high-potency veterinary drugs, durable farm housing accessories, technical services, and day-old chicks.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-emerald-400 font-bold text-sm">
              <span className="uppercase tracking-widest text-xs text-slate-400">Our Motto:</span>
              <span className="text-white italic bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30 font-heading">
                &ldquo;Your Satisfaction Is Our Priority&rdquo;
              </span>
            </div>
          </div>
        </section>

        {/* Corporate Pillars: Goal, Aim, Vision & Motto */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading">
              Our Purpose & Driving Pillars
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Every chick dispatched, vaccine preserved, and consultation conducted is guided by our core mandate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Goal Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-4 hover:border-emerald-300 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 font-heading">Our Goal</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To help improve the livestock sector in Nigeria and Africa, by introducing the latest information, scientific management techniques, and healthy solutions to the livestock market.
              </p>
            </div>

            {/* Aim Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-4 hover:border-teal-300 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 font-heading">Our Aim</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To build vibrant communities of healthy livestock, which directly underpins food security, nutritional excellence, and the overall healthy living of our people.
              </p>
            </div>

            {/* Vision Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-4 hover:border-cyan-300 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 font-heading">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To see the African livestock market becoming significantly better, highly productive, and globally competitive across international agricultural standards.
              </p>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading">
              Our Professional Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We provide end-to-end technical support and verified input supplies for commercial poultry and livestock farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>
                  <Link
                    href={srv.link}
                    className="inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Dynamic Pricing & Quotation Policy */}
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 sm:p-10 space-y-4 text-emerald-950">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm font-heading">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>How We Operate: Dynamic Market Rates & Professional Quotations</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
            Because livestock supplies and day-old chicks are subject to weekly market variations influenced by grain feed costs, parent-stock genetics, and seasonal demands, we do not advertise static retail prices. Instead, our technical sales desk communicates today&apos;s confirmed prices directly to you, prepares transparent delivery waybills, and coordinates timely dispatch to your state.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20request%20today's%20chick%20rates."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="lg" className="shadow-md">
                <Phone className="h-4 w-4 mr-2" />
                <span>Contact Desk for Current Rates (+234 813 916 9402)</span>
              </Button>
            </a>
            <Link href="/services">
              <Button variant="outline" size="lg">
                <span>Book Farm Consultation</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
