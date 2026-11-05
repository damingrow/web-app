import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Truck,
  ShieldCheck,
  ArrowRight,
  Package,
  ChevronRight,
  Building2,
  MapPin,
} from 'lucide-react';
import { MediaVideoPlayer } from '@/components/ui/media-video-player';
import { getNextDispatchDate } from '@/lib/booking/booking-service';

export const metadata: Metadata = {
  title: 'Day-Old Chicks in Nigeria — Certified Booking & Live Prices | D-AminGrow',
  description:
    'Book healthy, biosecure day-old broiler chicks, Zartech pullets, hybrid & local turkey poults, noiler, and cockerels from accredited Nigerian farms. Nationwide dispatch every Monday & Thursday.',
  keywords: [
    'day old chicks nigeria',
    'day old broiler chicks ibadan',
    'chick price in nigeria today',
    'chi broiler chicks',
    'amo pullets booking',
    'zartech day old chicks',
    'turkey poults ibadan',
    'poultry farms nigeria',
  ],
};

const BREED_CHANNELS = [
  {
    slug: 'broilers',
    name: 'Commercial Broilers',
    subTitle: 'Cobb 500 · Ross 308 · Arbor Acres',
    desc: 'Bred for rapid muscle deposition and low FCR (1.60–1.75). Reaches 2.2kg–2.8kg harvest weight within 6–7 weeks.',
    packaging: '50 birds / carton · ₦2,000 / chick (₦100,000 / carton)',
    dispatch: 'Mondays & Thursdays',
    accentColor: 'from-emerald-900 to-slate-900',
    badge: '₦2,000 / Chick',
    image: '/products/Chicks/day old broiler.jpeg',
    href: '/day-old-chicks/broilers',
  },
  {
    slug: 'pullets',
    name: 'Commercial Pullet (Layers)',
    subTitle: 'ISA Brown, Zartech & Hy-Line Certified Strains',
    desc: 'Industry-standard brown egg layers. Yields 310–325 eggs per hen with high shell strength and low rearing feed intake.',
    packaging: '50 birds / carton · ₦2,700 / chick (₦135,000 / carton)',
    dispatch: 'Mondays & Thursdays',
    accentColor: 'from-amber-900 to-slate-900',
    badge: '₦2,700 / Chick',
    image: '/products/Chicks/Pullet day old.jpeg',
    href: '/day-old-chicks/pullets',
  },
  {
    slug: 'turkeys',
    name: 'Hybrid Turkey',
    subTitle: 'Broad-Breasted Commercial Meat Keets',
    desc: 'Heavy commercial hybrid turkey poults achieving 6kg–9kg carcass weight at 16–20 weeks under tropical Nigerian conditions.',
    packaging: '30 poults / carton · ₦5,500 / poult (₦165,000 / carton)',
    dispatch: 'Mondays & Thursdays (Batch runs)',
    accentColor: 'from-blue-900 to-slate-900',
    badge: '₦5,500 / Poult',
    image: '/products/Chicks/Day old Turkey.jpeg',
    href: '/day-old-chicks/turkeys',
  },
  {
    slug: 'local-turkeys',
    name: 'Local Turkey',
    subTitle: 'Indigenous Improved Hardy Keets',
    desc: 'Selected improved local turkey poults bred for climate hardiness, free-range survivability, and high natural disease resistance.',
    packaging: '30 poults / carton · ₦2,300 / poult (₦69,000 / carton)',
    dispatch: 'Mondays & Thursdays',
    accentColor: 'from-teal-900 to-slate-900',
    badge: '₦2,300 / Poult',
    image: '/products/Chicks/Day old Turkey1.jpeg',
    href: '/chicks',
  },
  {
    slug: 'noiler',
    name: 'Noiler',
    subTitle: 'Dual-Purpose Meat & Egg Hybrid',
    desc: 'Vigorous dual-yield Noiler chicks bred for Nigerian smallholder and commercial multi-purpose farming.',
    packaging: '50 birds / carton · ₦750 / chick (₦37,500 / carton)',
    dispatch: 'Mondays & Thursdays',
    accentColor: 'from-green-900 to-slate-900',
    badge: '₦750 / Chick',
    image: '/products/Chicks/day old pullet.jpeg',
    href: '/chicks',
  },
  {
    slug: 'cockerels',
    name: 'Cockerel',
    subTitle: 'White & Brown Hardy Grower Cockerels',
    desc: 'Exceptional natural disease resistance and low early mortality. Ideal for extensive deep litter and festive markets.',
    packaging: '50 birds / carton · ₦100 / chick (₦5,000 / carton)',
    dispatch: 'Mondays & Thursdays',
    accentColor: 'from-purple-900 to-slate-900',
    badge: '₦100 / Chick',
    image: '/products/Chicks/day old broiler.jpeg',
    href: '/day-old-chicks/cockerels',
  },
];

const HATCHERY_PARTNERS = [
  { name: 'CHI Farms Limited', code: 'CHI', hub: 'Ajanla, Ibadan', breedSpecialty: 'Cobb 500 Broilers & ISA Brown Pullets' },
  { name: 'AMO Farm Sieberer', code: 'AMO', hub: 'Awe, Oyo State', breedSpecialty: 'Amo Broilers & Commercial Pullets' },
  { name: 'Zartech Farms', code: 'ZAR', hub: 'Oluyole, Ibadan', breedSpecialty: 'Ross 308 Broilers & Breeder Stock' },
  { name: 'Supreme Poultry', code: 'SUP', hub: 'Ibadan Depot', breedSpecialty: 'Broilers & Commercial Layers' },
];

const CLIENT_FARMS = [
  'Ajila Farm',
  'Owenaze Farm',
  'Loveday Farm',
  'Dr Austin Farm',
  'Grace Farm',
  'Anita Farm',
  'Vivian Farm',
  'Taghini Farm',
];

export default function DayOldChicksHubPage() {
  const nextMonday = getNextDispatchDate('Monday');
  const nextThursday = getNextDispatchDate('Thursday');

  return (
    <div className="font-body bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-slate-900">Day-Old Chicks</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 text-xs font-bold text-emerald-300 mb-6">
                <Building2 className="h-4 w-4" />
                <span>Certified Primary Lineage · Standard Packaging</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight">
                Commercial Day-Old Chicks Sourcing &amp; Nationwide Dispatch
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Order vaccinated, vigorous Day-Old Broilers, Zartech Pullets, Hybrid &amp; Local Turkeys, Noilers, and Cockerels directly from
                Nigeria&apos;s leading accredited suppliers with guaranteed quota reservations and temperature-controlled
                interstate dispatch.
              </p>

              {/* Next Dispatch Runs Bar */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Next Monday Dispatch
                  </span>
                  <span className="text-lg font-extrabold text-white mt-0.5 block">{nextMonday}</span>
                  <span className="text-[11px] text-slate-300 block">Cutoff: 48h prior to hatch</span>
                </div>

                <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                    Next Thursday Dispatch
                  </span>
                  <span className="text-lg font-extrabold text-white mt-0.5 block">{nextThursday}</span>
                  <span className="text-[11px] text-slate-300 block">Cutoff: 48h prior to hatch</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/chicks"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Launch Live Booking Calendar</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#breeds"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                >
                  <span>Explore Breed Specifications</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Live Footage Video Player */}
            <div className="lg:col-span-5">
              <MediaVideoPlayer
                src="https://ullutbvytgllwechzfgx.supabase.co/storage/v1/object/public/videos/AMO%20pullets%20collections.mp4"
                poster="/products/Chicks/day old pullet.jpeg"
                title="Hatchery Pullet Allocation & Collection"
                badge="Active Hatchery Run"
                caption="Mon & Thu primary sorting & live chick transit boxes"
                aspectRatio="portrait"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Accredited Partner Hatcheries Strip */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Direct Supply From Nigeria&apos;s Institutional Hatcheries
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {HATCHERY_PARTNERS.map((hatch) => (
              <div
                key={hatch.code}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="flex items-center space-x-2">
                  <span className="h-6 w-6 rounded bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                    {hatch.code}
                  </span>
                  <span className="font-bold text-slate-900 text-xs truncate">{hatch.name}</span>
                </div>
                <div className="mt-2 text-[11px] text-slate-500 flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                  <span className="truncate">{hatch.hub}</span>
                </div>
                <div className="mt-1 text-[10px] font-semibold text-emerald-700 truncate">
                  {hatch.breedSpecialty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Breeds Section */}
      <section id="breeds" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Commercial Breed Inventory
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-3">
            Select Your Production Lineage
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Every carton is packed according to strict Nigerian poultry packaging standards with certified Marek&apos;s vaccination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BREED_CHANNELS.map((breed) => (
            <div
              key={breed.slug}
              className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header Image Strip */}
                <div className="relative h-48 w-full bg-slate-900">
                  <Image
                    src={breed.image}
                    alt={breed.name}
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-3 py-1">
                    {breed.badge}
                  </span>
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <span className="text-[11px] font-semibold text-emerald-300 block">{breed.subTitle}</span>
                    <h3 className="text-xl font-bold font-heading">{breed.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">{breed.desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Packaging Standard</span>
                      <span className="font-bold text-slate-900 mt-0.5 block">{breed.packaging}</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dispatch Schedule</span>
                      <span className="font-bold text-emerald-800 mt-0.5 block">{breed.dispatch}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                <Link
                  href={breed.href}
                  className="text-xs font-bold text-slate-700 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                >
                  <span>Detailed Specifications</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href={`/chicks?breed=${breed.slug === 'broilers' ? 'broiler' : breed.slug === 'pullets' ? 'pullet' : breed.slug === 'turkeys' ? 'turkey' : 'cockerel'}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                >
                  <span>Book Cartons</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Point-of-Lay Banner Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              Immediate Egg Production Alternative
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Looking for 16–18 Week Point-of-Lay Birds?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Skip brooding risks, heat lamp expenses, and 4 months of feed rearing. Our Point-of-Lay brown layer pullets are fully immunised against Newcastle, Gumboro, Fowl Pox, Marek&apos;s, and IB — ready to lay in 4–6 weeks.
            </p>
            <div className="pt-2">
              <Link
                href="/point-of-lay-birds"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                <span>View Point-of-Lay Birds &amp; Crate Logistics</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Commercial Client Farms */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Trusted By Commercial Producers</span>
            <h3 className="text-2xl font-bold font-heading text-slate-900 mt-1">
              Poultry Farms Powered By D-AminGrow Day-Old Sourcing
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Regular commercial stocking across Oyo, Lagos, Ogun, Edo, Delta, Kwara, and Rivers states.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CLIENT_FARMS.map((farm) => (
              <div
                key={farm}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center space-x-3"
              >
                <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                  {farm.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs block">{farm}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold uppercase">Commercial Account</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rigorous Dispatch & Financial Reassurance Strip */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Package className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm font-heading">50+1 Live Packaging Standard</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every day-old broiler and pullet carton contains 51 birds (50 counted birds + 1 extra free chick) to absorb any transit stress.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm font-heading">50% Zenith Bank Deposit Lock</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reservations are locked in institutional partner quotas upon 50% deposit confirmation into Zenith Bank (Account 1017894562).
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Truck className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm font-heading">Designated Motor Park Hubs</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dispatches via coordinated interstate driver manifests from central Ibadan (Iwo Road / Ojoo) and Lagos (Berger / Ojota) terminals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
