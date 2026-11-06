import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Calendar,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Building2,
  MessageCircle,
} from 'lucide-react';
import { getNextDispatchDate } from '@/lib/booking/booking-service';

interface BreedDetail {
  slug: string;
  bookingParam: string;
  title: string;
  seoTitle: string;
  subTitle: string;
  metaDesc: string;
  image: string;
  targetHarvest: string;
  fcr: string;
  broodingTemp: string;
  vaccination: string;
  packagingRule: string;
  dispatchDays: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  feedingAdvice: string;
}

const BREED_DATA: Record<string, BreedDetail> = {
  broilers: {
    slug: 'broilers',
    bookingParam: 'broiler',
    title: 'Commercial Broilers',
    seoTitle: 'Day-Old Broiler Chicks Price in Nigeria | Ross 308 & Cobb 500 - D-AminGrow',
    subTitle: 'Ross 308, Cobb 500 & Arbor Acres Plus · Rapid 2.2kg–2.8kg Weight Deposition',
    metaDesc:
      'Order commercial broilers in Nigeria. High livability, FCR 1.60-1.75, 2.2kg-2.8kg at 6-7 weeks. Dispatched nationwide every Monday & Thursday.',
    image: '/products/Chicks/day old broiler.jpeg',
    targetHarvest: '2.2kg – 2.8kg at 6 to 7 weeks',
    fcr: '1.60 – 1.75 Feed Conversion Ratio',
    broodingTemp: '32°C – 35°C on Day 1, reduce 2.5°C weekly',
    vaccination: 'Marek’s Disease (HVT) vaccinated at day 1',
    packagingRule: '50 birds per carton · ₦2,000 / chick (₦100,000 / carton)',
    dispatchDays: 'Every Monday & Thursday nationwide',
    description:
      'Our commercial broiler chicks originate exclusively from biosecure, certified parent-stock farms across Nigeria (Chi, Amo, Zartech, Supreme). Bred specifically for exceptional tropical hardiness, early frame development, and rapid muscle deposition. Inspected for uniform weight and navel closure prior to climate-controlled vehicle loading.',
    highlights: [
      'Certified Cobb 500 and Ross 308 first-generation commercial parent lineages',
      'Pre-vaccinated against Marek’s Disease with bio-monitored titre levels',
      '50 chicks per carton standard packaging',
      'Coordinated motor park transfer via trusted interstate transport routes',
    ],
    specs: [
      { label: 'Target Harvest Weight', value: '2.2kg – 2.8kg (42–49 days)' },
      { label: 'Feed Conversion (FCR)', value: '1.60 – 1.75' },
      { label: 'Brooding Temperature', value: '33°C – 35°C (Week 1)' },
      { label: 'Day 1 Vaccination', value: 'Marek’s Disease (HVT Subcutaneous)' },
      { label: 'Carton Packaging', value: 'Ventilated Cardboard Carton of 50 chicks' },
      { label: 'Stocking Density', value: '10 – 12 birds / m² in open-sided tropical pens' },
    ],
    feedingAdvice:
      'Feed high-protein Broiler Starter Crumble (22%–23% Crude Protein) from Day 1 to Day 21, transitioning to Broiler Finisher Pellets (19%–20% CP) to harvest. Ensure clean, cool water with oral rehydration glucose/vitamins on arrival.',
  },
  pullets: {
    slug: 'pullets',
    bookingParam: 'pullet',
    title: 'Commercial Pullets (Layers)',
    seoTitle: 'Day-Old Pullets Price in Nigeria | High-Yield Commercial Layers - D-AminGrow',
    subTitle: 'ISA Brown, Zartech & Hy-Line Brown Layers · 310–325 Eggs/Hen Potential',
    metaDesc:
      'Book Zartech pullets in Nigeria. Peak egg production 94-96%, superior brown shell strength, docile temperament. Monday & Thursday dispatch runs.',
    image: '/products/Chicks/Pullet day old.jpeg',
    targetHarvest: 'Point-of-Lay at 18–19 weeks; Peak lay to 72+ weeks',
    fcr: 'Low feed consumption (105g–115g/hen/day at peak)',
    broodingTemp: '33°C – 35°C on Day 1, strictly controlled lighting',
    vaccination: 'Marek’s Disease (HVT) vaccinated at hatch',
    packagingRule: '50 birds per carton · ₦2,700 / chick (₦135,000 / carton)',
    dispatchDays: 'Every Monday & Thursday nationwide',
    description:
      'Our Zartech pullets feature world-class lineage genetics. Known for docile behavior in both cage systems and deep litter pens, early sexual maturity, high persistence of lay beyond 80 weeks, and uniform, strong-shelled brown eggs with exceptional market appeal in Nigerian food markets.',
    highlights: [
      'Documented potential of 310 to 325 marketable eggs per hen housed',
      'Peak lay efficiency consistently exceeding 94% under proper nutrition',
      'Docile temperament minimizing feather-pecking and flock stress',
      'Supplied with suggested 20-week layer vaccination & lighting schedule',
    ],
    specs: [
      { label: 'Egg Production Potential', value: '310 – 325 eggs / hen (to 72 weeks)' },
      { label: 'Peak Lay Rate', value: '94% – 96%' },
      { label: 'Egg Shell Colour', value: 'Rich Uniform Brown' },
      { label: 'Feed Consumption at Peak', value: '110g – 115g / bird / day' },
      { label: 'Carton Packaging', value: '50 pullets per carton' },
      { label: 'Expected First Egg', value: 'Week 18 – Week 20' },
    ],
    feedingAdvice:
      'Feed Chick Starter Mash (20% CP) for 0–8 weeks, transition to Grower Mash (15%–16% CP) until 17 weeks. Introduce Layer Phase 1 Mash with 3.8% Calcium when flock reaches 5% daily egg production.',
  },
  turkeys: {
    slug: 'turkeys',
    bookingParam: 'turkey',
    title: 'Hybrid Turkey',
    seoTitle: 'Hybrid Turkey Poults in Nigeria (Broad-Breasted White) | D-AminGrow',
    subTitle: 'Heavy Commercial Meat Poults · 6kg–9kg Carcass Weight at 16–20 Weeks',
    metaDesc:
      'Order vigorous commercial broad-breasted hybrid turkey poults in Nigeria. 30 in carton standard. High meat conversion for commercial and festive markets.',
    image: '/products/Chicks/Day old Turkey.jpeg',
    targetHarvest: '6kg – 9kg at 16 to 20 weeks',
    fcr: '2.40 – 2.70 Feed Conversion',
    broodingTemp: '35°C – 37°C on Day 1 (higher heat required than chicks)',
    vaccination: 'Marek’s Disease pre-treated; Newcastle schedule advised',
    packagingRule: '30 poults per carton · ₦5,500 / poult (₦165,000 / carton)',
    dispatchDays: 'Mondays & Thursdays (Batch allocations)',
    description:
      'High-performance hybrid turkey poults sourced from specialized parent-stock farms. Turkeys require intensive early brooding temperature (35°C–37°C) and higher protein starter rations (28% Crude Protein). Broad-breasted genetics ensure rapid breast meat and thigh development for high-margin festive and hotel markets.',
    highlights: [
      'Heavy broad-breasted genetics capable of reaching 8kg+ live weight',
      'Carefully packed in specialized 30-capacity ventilated cardboard boxes',
      'Inspected for robust navels, leg strength, and alertness prior to dispatch',
      'Includes specialized turkey brooding advisory sheet with every booking',
    ],
    specs: [
      { label: 'Harvest Weight (Toms)', value: '8kg – 11kg at 18–22 weeks' },
      { label: 'Harvest Weight (Hens)', value: '5.5kg – 7.5kg at 16–18 weeks' },
      { label: 'Brooding Temperature', value: '35°C – 37°C (Week 1)' },
      { label: 'Carton Packaging', value: '30 poults per carton' },
      { label: 'Starter Protein Level', value: '28% Crude Protein Starter Crumble' },
      { label: 'Key Disease Risk', value: 'Newcastle & Blackhead (Histomoniasis)' },
    ],
    feedingAdvice:
      'Turkeys require high-protein Turkey Pre-Starter / Starter (28% CP) for the first 4 weeks, with extra Biotin and Methionine for leg strength. Never brood turkeys on slippery paper; use wood shavings with feeding trays.',
  },
  cockerels: {
    slug: 'cockerels',
    bookingParam: 'cockerel',
    title: 'Cockerel',
    seoTitle: 'Commercial Day-Old Cockerels Nigeria | D-AminGrow',
    subTitle: 'Hardy Low-Mortality Commercial Growers · Highly Demanded for Festive Sales',
    metaDesc:
      'Buy day-old cockerels in Nigeria. Extremely low early mortality, hardy natural immunity, low medication cost. Perfect for rural & peri-urban festive poultry farming.',
    image: '/products/Chicks/day old pullet.jpeg',
    targetHarvest: '2.0kg – 2.5kg at 20 to 24 weeks',
    fcr: 'Low feed cost grower model',
    broodingTemp: '32°C – 34°C on Day 1',
    vaccination: 'Marek’s Disease pre-vaccinated',
    packagingRule: '50 birds per carton · ₦100 / chick (₦5,000 / carton)',
    dispatchDays: 'Every Monday & Thursday nationwide',
    description:
      'Commercial day-old cockerels are the premier low-risk poultry farming option in Nigeria. Known for rugged physical hardiness, cockerels tolerate temperature fluctuations and rural housing conditions far better than broilers, making them ideal for budget-conscious farmers targeting Christmas, Easter, and festive season live-bird markets.',
    highlights: [
      'Exceptional natural livability (>96% survival rates with basic brooding)',
      'Significantly lower medication and biosecurity expenses than broilers',
      'Premium live-weight pricing in traditional Nigerian open markets',
      'Packed in 50-count sturdy cardboard boxes for secure transit',
    ],
    specs: [
      { label: 'Target Harvest Weight', value: '2.0kg – 2.5kg at 20–24 weeks' },
      { label: 'Brooding Temperature', value: '32°C – 34°C (Week 1)' },
      { label: 'Carton Packaging', value: '51 cockerels per carton' },
      { label: 'Production Cycle', value: '5 to 6 months for festive marketing' },
      { label: 'Livability Expectation', value: '95%+ with routine Lasota vaccination' },
      { label: 'Housing Compatibility', value: 'Deep litter, semi-free range, or yard' },
    ],
    feedingAdvice:
      'Brood on Chick Starter (20% CP) for 4 weeks, then transition to economical Grower Mash / Finisher with grain supplementation. Routine Newcastle (Lasota) and Gumboro vaccinations are essential.',
  },
};

export async function generateStaticParams() {
  return [
    { breed: 'broilers' },
    { breed: 'pullets' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ breed: string }>;
}): Promise<Metadata> {
  const { breed } = await params;
  const data = BREED_DATA[breed];
  if (!data) return { title: 'Day-Old Chicks | D-AminGrow' };

  return {
    title: data.seoTitle,
    description: data.metaDesc,
    openGraph: {
      title: data.title,
      description: data.metaDesc,
      images: [data.image],
    },
  };
}

export default async function BreedBuyerIntentPage({
  params,
}: {
  params: Promise<{ breed: string }>;
}) {
  const { breed } = await params;
  const data = BREED_DATA[breed];

  if (!data) {
    notFound();
  }

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
            <Link href="/day-old-chicks" className="hover:text-emerald-700 transition-colors">
              Day-Old Chicks
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-slate-900 capitalize">{breed}</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white py-14 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
                <Building2 className="h-3.5 w-3.5" />
                <span>Certified Parent Lineage Direct</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                {data.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-medium">
                {data.subTitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                {data.description}
              </p>

              {/* Next Dispatch Date Bar */}
              <div className="grid grid-cols-2 gap-3 pt-2 max-w-md">
                <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">Next Monday Run</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">{nextMonday}</span>
                </div>
                <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block">Next Thursday Run</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">{nextThursday}</span>
                </div>
              </div>

              {/* Booking Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href={`/chicks?breed=${data.bookingParam}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book {data.title} Cartons</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20want%20to%20enquire%20about%20booking%20${encodeURIComponent(data.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>Chat With Veterinary Dispatcher</span>
                </a>
              </div>
            </div>

            {/* Right Column: Breed Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 shadow-2xl">
                <div className="relative h-72 sm:h-80 w-full">
                  <Image
                    src={data.image}
                    alt={data.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-400">Packaging Standard:</span>
                      <span className="font-semibold text-white">{data.packagingRule}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Grid */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Specs Table */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                Technical Specifications &amp; Production Benchmarks
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.specs.map((spec) => (
                  <div key={spec.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-semibold text-slate-500 block">{spec.label}</span>
                    <span className="text-sm font-bold text-slate-900 mt-1 block">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Feeding & Brooding Guidance */}
              <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-5 space-y-2">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                  Veterinary Nutrition &amp; Brooding Advisory
                </span>
                <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                  {data.feedingAdvice}
                </p>
              </div>
            </div>

            {/* Quality Highlights */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-bold font-heading text-slate-900">
                D-AminGrow Quality &amp; Biosecurity Assurances
              </h3>
              <div className="space-y-3">
                {data.highlights.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5 sticky top-24">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Instant Order Allocation
              </span>

              <h3 className="text-xl font-bold font-heading text-slate-900">
                Ready to Lock Your Quota?
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>Minimum Order:</span>
                  <span className="font-bold text-slate-900">1 Carton ({data.packagingRule.split(' ')[0]} birds)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>Required Deposit:</span>
                  <span className="font-bold text-emerald-700">50% Reservation Deposit</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>Designated Bank:</span>
                  <span className="font-bold text-slate-900">Zenith Bank (1017894562)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>Dispatch Points:</span>
                  <span className="font-bold text-slate-900">Ibadan / Lagos Depots</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/chicks?breed=${data.bookingParam}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Open Reservation Form</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="text-[11px] text-slate-500 text-center">
                Transparent market pricing confirmed 24–48 hours before hatch day.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
