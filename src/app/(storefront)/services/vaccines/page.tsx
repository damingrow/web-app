import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';
import {
  Syringe,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  MessageCircle,
  Phone,
  ArrowRight,
  ChevronRight,
  Clock,
  HelpCircle,
  Package,
  Snowflake,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Livestock Vaccine Distribution Nigeria — Cold-Chain 2°C–8°C Guaranteed | D-AminGrow',
  description:
    'D-AminGrow distributes Newcastle, Gumboro, Mycoplasma, Coryza, ND+IB+EDS triple, and live vaccines across Nigeria under strict 2°C–8°C cold-chain with insulated thermal packaging.',
  openGraph: {
    title: "Nigeria's Trusted Cold-Chain Vaccine Distributor | D-AminGrow",
    description:
      'Live and killed poultry vaccines shipped under verified 2°C–8°C cold-chain with certified ice gel packs and temperature monitoring.',
  },
};

const VACCINES = [
  {
    name: 'Newcastle Disease (LaSota Strain) — Live',
    sku: 'VAC-ND-01',
    type: 'Live Freeze-Dried',
    route: 'Drinking water or coarse spray',
    age: 'Day 21–28 (booster after B1 prime)',
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    name: 'Gumboro (IBD) Intermediate Plus — Live',
    sku: 'VAC-IBD-02',
    type: 'Live Freeze-Dried',
    route: 'Drinking water with skimmed milk',
    age: 'Day 10–14, booster Day 18–21',
    color: 'bg-violet-50 border-violet-200',
  },
  {
    name: 'Newcastle Killed Oil-Emulsion (LaSota) — Injectable',
    sku: 'VAC-NDK-03',
    type: 'Inactivated / Oil-Emulsion',
    route: 'Subcutaneous or intramuscular',
    age: 'Week 16–18 (pre-lay)',
    color: 'bg-cyan-50 border-cyan-200',
  },
  {
    name: 'Infectious Coryza (A, B & C) — Killed',
    sku: 'VAC-COR-04',
    type: 'Inactivated / Oil-Emulsion',
    route: 'Intramuscular or subcutaneous',
    age: 'Week 10–12 + booster Week 16–18',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    name: 'Mycoplasma (MG) Killed — Injectable',
    sku: 'VAC-MYC-05',
    type: 'Inactivated Bacterin / Oil-Emulsion',
    route: 'Subcutaneous at lower neck',
    age: 'Week 12–14 + booster Week 18',
    color: 'bg-rose-50 border-rose-200',
  },
  {
    name: 'ND + IB + EDS Triple Killed — Injectable',
    sku: 'VAC-TRP-06',
    type: 'Inactivated Triple / Oil-Emulsion',
    route: 'Intramuscular (breast) or subcutaneous',
    age: 'Week 16–18 (2–4 weeks before lay)',
    color: 'bg-teal-50 border-teal-200',
  },
  {
    name: 'ND + IB H120 Bivalent — Live',
    sku: 'VAC-NDIB-07',
    type: 'Live Freeze-Dried Bivalent',
    route: 'Eye-drop, spray, or drinking water',
    age: 'Day 1–7 prime; booster per program',
    color: 'bg-lime-50 border-lime-200',
  },
];

const COLD_CHAIN_STEPS = [
  {
    icon: Snowflake,
    title: '1. Refrigerated Storage',
    desc: 'All vaccines are stored in dedicated 2°C–8°C biological refrigerators at our distribution facility. Temperature logged twice daily.',
    color: 'bg-cyan-100 text-cyan-700',
  },
  {
    icon: Package,
    title: '2. Insulated Thermal Packaging',
    desc: 'Vaccines are packed in polystyrene thermal boxes with certified gel ice packs maintaining 2°C–8°C for 24–48 hours transit.',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    icon: Thermometer,
    title: '3. Temperature Indicator Strips',
    desc: 'Every shipment includes a chemical temperature indicator strip confirming the package never exceeded 8°C during transit.',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: ShieldCheck,
    title: '4. Verified Delivery & Handover',
    desc: 'Final delivery confirmed with customer before unboxing. Cold-chain compliance checklist provided with each shipment.',
    color: 'bg-violet-100 text-violet-700',
  },
];

const FAQS = [
  {
    q: 'How do you guarantee the cold-chain during delivery?',
    a: 'We use certified polystyrene thermal boxes with gel ice packs rated for 24–48 hours at 2°C–8°C. All packages include a temperature indicator strip. Before dispatch, we photograph the packed box and verify temperature. We also do a phone confirmation with you before delivery.',
  },
  {
    q: 'Can vaccines be delivered to any Nigerian state?',
    a: 'Yes. We ship to all 36 states and FCT via fast courier services with next-day delivery to major cities. For remote locations, we use motor park dispatch with insulated packaging calibrated for the transit duration. Cold-chain integrity is always verified.',
  },
  {
    q: 'Do I need a veterinary prescription to order vaccines?',
    a: 'Yes. All live and killed biologicals require a veterinary prescription. You may purchase as a registered poultry farmer working with a vet, or we can connect you with our affiliated veterinary professionals. A prescription ensures the right product for your flock\'s disease history.',
  },
  {
    q: 'What happens if the vaccine arrives warm?',
    a: 'Do not use the vaccine if the temperature indicator strip has triggered or the gel packs have fully melted. Contact us immediately via WhatsApp with photos. We will arrange a replacement shipment. Never administer a vaccine of unknown thermal history.',
  },
];

export default function ServiceVaccinesPage() {
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
            <span className="text-slate-900 font-medium">Vaccine Distribution</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#050E08] via-cyan-950/30 to-[#050E08] pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/3" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-6">
                <Snowflake className="h-4 w-4" />
                2°C–8°C Cold-Chain Guaranteed
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight mb-6">
                Livestock Vaccine{' '}
                <span className="text-cyan-400">Distribution</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl">
                Nigeria&apos;s trusted cold-chain biological distributor. Live and killed vaccines shipped under strict 2°C–8°C temperature monitoring with certified gel ice packs and temperature indicator strips to your farm or lab.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20to%20order%20vaccines.%20Product%3A%20%5BVACCINE%20NAME%5D.%20Quantity%3A%20%5BDOSES%5D.%20My%20delivery%20state%3A%20%5BSTATE%5D.%20Please%20confirm%20cold-chain%20delivery%20procedure."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-2xl transition-all text-sm shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Order Vaccines via WhatsApp
                </a>
                <Link
                  href="/vaccines"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-semibold px-7 py-4 rounded-2xl border border-white/15 hover:border-white/30 transition-all text-sm"
                >
                  Full Vaccine Catalog <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right: Veterinary Presentation Video */}
            <div className="lg:col-span-5">
              <MediaVideoPlayer
                src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/Presentation%20on%20IBH%20vaccine.mp4"
                poster="/products/Vaccines/ND lasota.jpeg"
                title="Biological Presentation: Inclusion Body Hepatitis (IBH)"
                badge="Cold-Chain Certified"
                caption="Clinical veterinary overview on viral titer maintenance and cold storage transport"
                aspectRatio="video"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Prescription Warning */}
      <div className="bg-amber-50 border-b border-amber-200 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            <span className="font-bold">Prescription Required.</span> All live and killed biologicals require a valid veterinary prescription. Must be administered by a trained veterinarian or certified poultry technician. Improper use compromises flock immunity and may cause vaccine reactions.
          </p>
        </div>
      </div>

      {/* Cold-Chain Process */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-700 bg-cyan-50 border border-cyan-200 px-4 py-2 rounded-full">
              <Snowflake className="h-3.5 w-3.5" />
              Our Cold-Chain Commitment
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              How We Protect Your Vaccines
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Every step from our refrigerator to your farm door is designed to maintain 2°C–8°C biological integrity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLD_CHAIN_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="rounded-3xl bg-slate-50 border border-slate-200 p-7 space-y-4 hover:shadow-lg transition-all">
                  <div className={`h-12 w-12 rounded-2xl ${step.color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Available Vaccines */}
      <section className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full">
              <Syringe className="h-3.5 w-3.5" />
              Available Products
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              7 Vaccines in Stock
            </h2>
            <p className="text-slate-600">All products maintained at 2°C–8°C. Contact for current dose availability and price.</p>
          </div>
          <div className="space-y-4">
            {VACCINES.map((v, i) => (
              <div key={i} className={`rounded-2xl border p-5 sm:p-6 ${v.color} flex flex-col sm:flex-row sm:items-center gap-4`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-slate-900 font-heading">{v.name}</h3>
                    <span className="text-[10px] font-bold text-slate-500 bg-white/80 border border-slate-200 px-2 py-0.5 rounded-full">{v.sku}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-xs">
                    <span className="text-slate-600"><span className="font-semibold">Type:</span> {v.type}</span>
                    <span className="text-slate-600"><span className="font-semibold">Route:</span> {v.route}</span>
                    <span className="text-slate-600"><span className="font-semibold">Age:</span> {v.age}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-xs font-semibold text-slate-700 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200 whitespace-nowrap">
                    Price on Request
                  </div>
                  <a
                    href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20to%20order%20the%20${encodeURIComponent(v.name)}.%20Please%20confirm%20stock%20and%20cold-chain%20delivery%20to%20my%20state.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-xl transition-all whitespace-nowrap"
                  >
                    Order
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/vaccines"
              className="inline-flex items-center gap-2 text-cyan-700 font-bold text-sm bg-cyan-50 border border-cyan-200 px-6 py-3.5 rounded-xl hover:bg-cyan-100 transition-all"
            >
              View Full Vaccine Catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full">
              <HelpCircle className="h-3.5 w-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Cold-Chain & Delivery FAQs
            </h2>
          </div>
          <div className="space-y-5">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 border border-slate-200 p-7 space-y-3">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-cyan-600 shrink-0 mt-0.5" />
                  <h3 className="text-sm font-bold text-slate-900 font-heading">{faq.q}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#050E08] to-cyan-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-6">
            <Clock className="h-4 w-4" />
            Cold-Chain Dispatch Confirmed Before Shipping
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4">
            Order Your Vaccines Today
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Tell us the vaccine, quantity, and your delivery state. We confirm cold-chain availability and dispatch within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20need%20to%20order%20vaccines.%20Product%3A%20%5BVACCINE%20NAME%5D.%20Quantity%3A%20%5BDOSES%5D.%20My%20delivery%20state%3A%20%5BSTATE%5D.%20Please%20confirm%20cold-chain%20delivery%20procedure."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-2xl transition-all text-sm"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp — Order Vaccines
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

      {/* Related */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Explore Related Services</h3>
            <p className="text-xs text-slate-500 mt-1">Technical vaccination support and farm advisory</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/vaccines" className="flex items-center gap-2 text-cyan-700 font-semibold text-sm bg-cyan-50 border border-cyan-200 px-5 py-2.5 rounded-xl hover:bg-cyan-100 transition-all">
              Full Vaccine Catalog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services/technical" className="flex items-center gap-2 text-slate-700 font-semibold text-sm bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:border-slate-300 transition-all">
              On-Farm Vaccination Service <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/calculators/vaccination" className="flex items-center gap-2 text-slate-700 font-semibold text-sm bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:border-slate-300 transition-all">
              Vaccination Timetable <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
