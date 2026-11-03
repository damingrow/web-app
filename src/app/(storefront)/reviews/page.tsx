import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Star,
  ShieldCheck,
  MessageCircle,
  Building2,
  MapPin,
  ThumbsUp,
  Award,
  ChevronRight,
  TrendingUp,
  Stethoscope,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Farmer Reviews & Verified Testimonials | D-AminGrow Nigeria',
  description:
    'Read verified reviews and farm case studies from commercial poultry and livestock farmers across Nigeria who trust D-AminGrow for Day-Old Chicks, cold-chain vaccines, and veterinary advisory.',
  openGraph: {
    title: 'Farmer Reviews & Verified Testimonials | D-AminGrow Nigeria',
    description:
      'Over 98% flock survival rates reported by verified commercial broiler and layer farmers in Oyo, Ogun, Lagos, Kaduna, and across Nigeria.',
  },
};

interface ReviewItem {
  id: string;
  name: string;
  farmName: string;
  location: string;
  flockType: string;
  flockSize: string;
  rating: number;
  date: string;
  verified: boolean;
  highlight: string;
  review: string;
  category: 'chicks' | 'vaccines' | 'drugs' | 'consultation' | 'equipment';
}

const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-01',
    name: 'Alhaji Rasheed Adebayo',
    farmName: 'Bayo Agro Farms Ltd',
    location: 'Afijio / Oyo Road, Oyo State',
    flockType: 'Arbor Acres Plus Broilers',
    flockSize: '4,500 Birds',
    rating: 5,
    date: 'October 2026',
    verified: true,
    highlight: '98.8% First-Week Brooding Survival & Uniform Weights',
    review:
      'We booked 4,500 day-old broilers through D-AminGrow. The delivery arrived at our farm gate exactly at 6:30 AM in well-ventilated cartons with full bonus chicks. Brooding mortality at Day 7 was under 1.2%. At week 6, our average live weight reached 2.45 kg. Their booking transparency and market updates are the best in the South-West.',
    category: 'chicks',
  },
  {
    id: 'rev-02',
    name: 'Dr. (Mrs.) Funke Olawale',
    farmName: 'Sunrise Commercial Layers',
    location: 'Epe Expressway, Lagos State',
    flockType: 'ISA Brown Point-of-Lay',
    flockSize: '3,200 Pullets',
    rating: 5,
    date: 'September 2026',
    verified: true,
    highlight: 'Cold-Chain Vaccines Arrived with Solid Ice Packs',
    review:
      'Vaccine integrity is our biggest headache with commercial layers in Nigeria. D-AminGrow shipped our Newcastle LaSota and Gumboro Intermediate Plus vaccines in insulated styrofoam boxes with intact gel ice packs. Temperature was measured at 3.5°C on receipt. Peak egg production hit 94.2% with zero disease breakthrough.',
    category: 'vaccines',
  },
  {
    id: 'rev-03',
    name: 'Pastor Emmanuel Eze',
    farmName: 'Gracefield Livestock Enterprise',
    location: 'Sagamu Interchange, Ogun State',
    flockType: 'Broilers & Cockerels',
    flockSize: '2,000 Birds',
    rating: 5,
    date: 'October 2026',
    verified: true,
    highlight: 'Emergency Veterinary Triage Saved Our Flock from Coccidiosis',
    review:
      'At week 4, our broiler flock showed bloody droppings and huddled feathers. I called the D-AminGrow veterinary desk. Dr. Adeleke conducted a video diagnosis within 20 minutes, prescribed Amprolium with Vitamin K, and dispatched the exact NAFDAC-certified medication same day. Mortality stopped in 48 hours.',
    category: 'consultation',
  },
  {
    id: 'rev-04',
    name: 'Engr. Bello Garba',
    farmName: 'Arewa Prime Farms',
    location: 'Zaria / Kaduna Corridor, Kaduna State',
    flockType: 'Cobb 500 Broilers',
    flockSize: '6,000 Broilers',
    rating: 5,
    date: 'September 2026',
    verified: true,
    highlight: 'Reliable Inter-State Dispatch to Northern Terminals',
    review:
      'Waybill dispatch from Ibadan to Kaduna was handled professionally with real-time driver tracking. All 60 cartons arrived with zero transit crushing. The chicks were energetic and began feeding immediately upon placement.',
    category: 'chicks',
  },
  {
    id: 'rev-05',
    name: 'Chief Michael Nnamdi',
    farmName: 'Evergreen Integrated Agribusiness',
    location: 'Oredo, Edo State',
    flockType: 'Commercial Layers & Broilers',
    flockSize: '5,000 Layers',
    rating: 5,
    date: 'August 2026',
    verified: true,
    highlight: 'Hot-Dip Galvanized Battery Cages Built to Last',
    review:
      'Installed 16 units of D-AminGrow 120-bird 3-tier A-type galvanized layer cages with automatic nipple drinkers. Zero rust after two heavy rainy seasons. The egg roll-out slope reduced cracked eggs from 6% down to less than 0.8%.',
    category: 'equipment',
  },
  {
    id: 'rev-06',
    name: 'Mrs. Folashade Adelekan',
    farmName: 'Oyo Heritage Farms',
    location: 'Oluyole Extension, Ibadan, Oyo State',
    flockType: 'Black Cockerels & Turkeys',
    flockSize: '1,500 Birds',
    rating: 5,
    date: 'October 2026',
    verified: true,
    highlight: 'Genuine NAFDAC Veterinary Drugs — No Counterfeits',
    review:
      'In a market flooded with fake antibiotics and weak vitamins, D-AminGrow gives us peace of mind. Every bottle and sachet carries valid NAFDAC registration numbers and verifiable manufacturer batch stamps. Their dosage advisory is clear and accurate.',
    category: 'drugs',
  },
];

export default function ReviewsPage() {
  return (
    <div className="font-body bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-mesh overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Farmer Reviews & Testimonials</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-full mb-6">
              <Award className="h-3.5 w-3.5" />
              Verified Farmer Satisfaction
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight mb-6">
              Trusted by Over <span className="text-gradient-green">1,200+ Commercial Farmers</span> Across Nigeria
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Read real performance outcomes, livability reports, and disease control experiences from commercial broiler, layer, and livestock managers who depend on D-AminGrow.
            </p>

            {/* Quick Stat Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">98.4%</div>
                <div className="text-xs text-emerald-400 font-medium mt-1">Average Livability</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">2°C–8°C</div>
                <div className="text-xs text-emerald-400 font-medium mt-1">Cold-Chain Guaranteed</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">36 States</div>
                <div className="text-xs text-emerald-400 font-medium mt-1">Nationwide Dispatch</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">4.9 / 5.0</div>
                <div className="text-xs text-emerald-400 font-medium mt-1">Farmer Trust Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="section-label w-fit mb-3">
                <ThumbsUp className="h-3.5 w-3.5" />
                Verified Testimonials
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Commercial Farm Results & Experiences
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                All reviews are collected from active livestock operations with verified purchase orders.
              </p>
            </div>

            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20would%20like%20to%20share%20a%20review%20of%20my%20recent%20flock%20experience."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all shadow-sm hover:shadow"
            >
              <MessageCircle className="h-4 w-4" />
              Submit Your Farm Review
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REVIEWS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating + Verification */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {item.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        Verified Farm
                      </span>
                    )}
                  </div>

                  {/* Highlight */}
                  <h3 className="text-base font-bold text-slate-900 font-heading mb-3 leading-snug">
                    &ldquo;{item.highlight}&rdquo;
                  </h3>

                  {/* Body */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.review}
                  </p>
                </div>

                {/* Farmer Info Footer */}
                <div className="pt-5 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{item.farmName}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-emerald-600" />
                      {item.flockSize}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#050E08] to-emerald-950 p-8 sm:p-10 border border-emerald-500/20 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold font-heading">
                Experience the D-AminGrow Quality Standard
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                Whether you need top-tier day-old chicks, guaranteed cold-chain vaccines, or urgent veterinary consultation, our technical desk is ready to support your farm.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                href="/services/consultation"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition-all text-sm shadow-md"
              >
                <Stethoscope className="h-4 w-4" />
                Book Consultation
              </Link>
              <Link
                href="/chicks"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-6 py-3.5 rounded-xl transition-all text-sm"
              >
                Check Chick Rates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
