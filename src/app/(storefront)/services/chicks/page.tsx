import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';
import {
  Feather,
  Truck,
  ShieldCheck,
  Thermometer,
  CheckCircle2,
  MessageCircle,
  Phone,
  ArrowRight,
  ChevronRight,
  Star,
  Clock,
  Calendar,
  Package,
  MapPin,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Day-Old Chick Booking Service Nigeria — Broilers, Pullets, Turkeys | D-AminGrow',
  description:
    'Book day-old chicks in Nigeria from D-AminGrow. Commercial broilers, Zartech pullets, hybrid & local turkeys, noiler, and cockerels. Nationwide dispatch every Monday and Thursday from certified hatcheries.',
  openGraph: {
    title: 'Day-Old Chick Booking — Nationwide Monday & Thursday Dispatch | D-AminGrow',
    description: 'Book commercial broilers, Zartech pullets, hybrid & local turkeys, and noiler chicks. Nationwide dispatch every Monday and Thursday.',
  },
};

const CHICK_BREEDS = [
  {
    name: 'Commercial Broilers',
    strain: 'Cobb 500 / Arbor Acres / Ross 308',
    harvest: '2.2kg–2.8kg at 6–7 weeks',
    fcr: '1.60–1.75',
    pack: '50 chicks per carton · ₦2,000/chick (₦100,000/carton)',
    emoji: '🐔',
    color: 'border-amber-200 bg-amber-50/50',
  },
  {
    name: 'Zartech Pullet',
    strain: 'ISA Brown / Zartech Certified Strains',
    harvest: '310–325 eggs per hen to 72 weeks',
    fcr: 'Peak lay 94%–96%',
    pack: '50 pullets per carton · ₦2,700/chick (₦135,000/carton)',
    emoji: '🥚',
    color: 'border-yellow-200 bg-yellow-50/50',
  },
  {
    name: 'Hybrid Turkey',
    strain: 'Broad-Breasted White Commercial Keets',
    harvest: '6kg–9kg at 16–20 weeks',
    fcr: '2.3–2.8 FCR',
    pack: '30 poults in carton · ₦5,500/poult (₦165,000/carton)',
    emoji: '🦃',
    color: 'border-orange-200 bg-orange-50/50',
  },
  {
    name: 'Local Turkey',
    strain: 'Improved Indigenous Hardy Turkey Stock',
    harvest: '4.5kg–7kg festive market yield',
    fcr: 'High foraging resilience',
    pack: '30 in a carton · ₦2,300/poult (₦69,000/carton)',
    emoji: '🦃',
    color: 'border-emerald-200 bg-emerald-50/50',
  },
  {
    name: 'Noiler',
    strain: 'Dual-Yield Meat & Egg Hybrid',
    harvest: '1.8kg–2.3kg meat + 150-180 eggs/yr',
    fcr: '2.1–2.5 FCR',
    pack: '50 in a carton · ₦750/chick (₦37,500/carton)',
    emoji: '🐓',
    color: 'border-green-200 bg-green-50/50',
  },
  {
    name: 'Cockerel',
    strain: 'Commercial Hardy Grower Cockerels',
    harvest: '2.0kg–2.5kg at 20–24 weeks',
    fcr: 'Low mortality, high holiday margins',
    pack: '50 in a carton · ₦100/chick (₦5,000/carton)',
    emoji: '🐓',
    color: 'border-purple-200 bg-purple-50/50',
  },
];

const HATCHERIES = [
  'Amo Farm (Arbor Acres / Noiler)',
  'Zartech Nigeria (Cobb 500 / ISA Brown)',
  'Chi Farms (Arbor Acres Plus)',
  'Sayed Farms (Ross 308)',
];

const BOOKING_STEPS = [
  {
    step: '01',
    icon: MessageCircle,
    title: 'Contact Us',
    desc: 'WhatsApp or call to tell us your breed, quantity (cartons), and preferred dispatch day (Monday or Thursday).',
  },
  {
    step: '02',
    icon: CheckCircle2,
    title: 'Confirm & Price',
    desc: 'We confirm current weekly price, carton availability, and your delivery motor park destination.',
  },
  {
    step: '03',
    icon: Calendar,
    title: 'Pay & Schedule Dispatch',
    desc: 'Secure your cartons with payment. Dispatch scheduled for the confirmed Monday or Thursday pickup.',
  },
  {
    step: '04',
    icon: Truck,
    title: 'Track & Receive',
    desc: 'We send your waybill number and motor park details. Your chicks arrive in climate-monitored ventilated cartons.',
  },
];

const DISPATCH_FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Certified Breeder Sources',
    desc: 'All chicks sourced from biosecure parent-stock breeding farms with documented veterinary health certificates.',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: Feather,
    title: 'Marek\'s Vaccinated at Hatch',
    desc: 'Every chick pre-vaccinated against Marek\'s Disease (HVT strain) at day 1 before packaging.',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Package,
    title: '51 Chicks Guaranteed Per Carton',
    desc: 'Every carton contains 50 + 1 bonus chick in ventilated, moisture-retaining cardboard cartons.',
    color: 'bg-cyan-100 text-cyan-700',
  },
  {
    icon: Thermometer,
    title: 'Climate-Monitored Transport',
    desc: 'Insulated packaging with moisture pads maintains optimal chick microclimate during transit.',
    color: 'bg-violet-100 text-violet-700',
  },
  {
    icon: Calendar,
    title: 'Monday & Thursday Dispatch',
    desc: 'Nationwide dispatch on Mondays and Thursdays only. Order cut-off is 48 hours before hatch day.',
    color: 'bg-rose-100 text-rose-700',
  },
  {
    icon: MapPin,
    title: 'All 36 States Covered',
    desc: 'Motor park depot delivery to major commercial hubs in every Nigerian state and FCT Abuja.',
    color: 'bg-lime-100 text-lime-700',
  },
];

export default function ServiceChicksPage() {
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
            <span className="text-slate-900 font-medium">Day-Old Chick Booking</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#050E08] via-amber-950/30 to-[#050E08] pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/3" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-6">
                <Calendar className="h-4 w-4" />
                Nationwide Dispatch — Every Monday &amp; Thursday
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight mb-6">
                Day-Old Chick{' '}
                <span className="text-amber-400">Booking Service</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl">
                Book commercial broilers, layer pullets, turkey poults, noiler, and ducklings from certified hatcheries. Pre-vaccinated, climate-packed, and dispatched nationwide every Monday and Thursday.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20book%20day-old%20chicks.%20Breed%3A%20%5BBREED%5D%2C%20Quantity%3A%20%5BQTY%5D%20cartons.%20Preferred%20dispatch%3A%20%5BMONDAY%2FTHURSDAY%5D.%20State%3A%20%5BSTATE%5D."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-7 py-4 rounded-2xl transition-all text-sm shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Book Chicks via WhatsApp
                </a>
                <Link
                  href="/chicks"
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-semibold px-7 py-4 rounded-2xl border border-white/15 hover:border-white/30 transition-all text-sm"
                >
                  View All Chick Products <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right: Live Chicks Delivery Video */}
            <div className="lg:col-span-5">
              <MediaVideoPlayer
                src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/supreme%20pullets%20inside%20cartons.mp4"
                poster="/products/Chicks/day old broiler.jpeg"
                title="Hatchery Dispatch Cartons & Live Chicks"
                badge="Mon & Thu Waybill"
                caption="Ventilated 50+1 packaging with verified livability before interstate motor park departure"
                aspectRatio="portrait"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dispatch Features */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full">
              <Star className="h-3.5 w-3.5" />
              Our Quality Commitments
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              What Makes Our Chicks Different
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISPATCH_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="rounded-3xl bg-slate-50 border border-slate-200 p-6 space-y-3 hover:shadow-lg transition-all">
                  <div className={`h-12 w-12 rounded-xl ${f.color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Available Breeds */}
      <section className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full">
              <Feather className="h-3.5 w-3.5" />
              Available Varieties
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Available Chick Breeds
            </h2>
            <p className="text-slate-600">All breeds are pre-vaccinated, temperature-managed, and dispatched in ventilated cartons.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHICK_BREEDS.map((breed, i) => (
              <div key={i} className={`rounded-3xl border p-6 space-y-4 hover:shadow-lg transition-all ${breed.color}`}>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{breed.emoji}</span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">{breed.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{breed.strain}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Performance</span>
                    <span className="text-slate-800 font-semibold">{breed.harvest}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">FCR / Rate</span>
                    <span className="text-slate-800 font-semibold">{breed.fcr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Pack Unit</span>
                    <span className="text-slate-800 font-semibold">{breed.pack}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 bg-white/70 px-3 py-2 rounded-xl">
                  <span>Current Price on Request</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Hatcheries */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Certified Partner Hatcheries</p>
            <div className="flex flex-wrap justify-center gap-3">
              {HATCHERIES.map((h, i) => (
                <span key={i} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-full">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Book */}
      <section className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full">
              <Clock className="h-3.5 w-3.5" />
              Simple 4-Step Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              How to Book Your Chicks
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BOOKING_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="rounded-3xl bg-white border border-slate-200 p-7 space-y-4 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-4xl font-extrabold text-slate-100 font-heading">{step.step}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#050E08] to-amber-950/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4">
            Ready to Book Your Next Batch?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Contact us for today&apos;s confirmed live chick price and to reserve your cartons for Monday or Thursday dispatch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20book%20day-old%20chicks.%20Breed%3A%20%5BBREED%5D%2C%20Quantity%3A%20%5BQTY%5D%20cartons.%20Preferred%20dispatch%3A%20%5BMONDAY%2FTHURSDAY%5D.%20State%3A%20%5BSTATE%5D."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-2xl transition-all text-sm"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp — Book Now
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
            <h3 className="text-sm font-bold text-slate-900 font-heading">Related Pages</h3>
            <p className="text-xs text-slate-500 mt-1">Brooder setup, vaccination schedules, and more</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/chicks" className="flex items-center gap-2 text-amber-700 font-semibold text-sm bg-amber-50 border border-amber-200 px-5 py-2.5 rounded-xl hover:bg-amber-100 transition-all">
              Full Chick Catalog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/calculators/brooder" className="flex items-center gap-2 text-slate-700 font-semibold text-sm bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:border-slate-300 transition-all">
              Brooder Calculator <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="flex items-center gap-2 text-slate-700 font-semibold text-sm bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:border-slate-300 transition-all">
              All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
