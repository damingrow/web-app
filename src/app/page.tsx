import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const categories = [
    {
      title: 'Day-Old Chicks',
      slug: 'chicks',
      description: 'Vigorous commercial broilers and high-yielding layer pullets from verified hatcheries.',
      image: '/products/Chicks/day old broiler.jpeg',
      badge: 'Weekly Booking',
      badgeVariant: 'chick' as const,
    },
    {
      title: 'Veterinary Drugs',
      slug: 'drugs',
      description: 'NAFDAC-compliant antibiotics, coccidiostats, water-soluble vitamins, and ectoparasiticides.',
      image: '/products/Drugs/ascorbic acid vitamic c water soluble.jpeg',
      badge: 'NAFDAC Standard',
      badgeVariant: 'nafdac' as const,
    },
    {
      title: 'Livestock Vaccines',
      slug: 'vaccines',
      description: 'High-potency biologicals with verified 2°C – 8°C insulated cold-chain transit.',
      image: '/products/Acessories/automatic stringe.jpeg',
      badge: 'Cold-Chain 2°C - 8°C',
      badgeVariant: 'coldchain' as const,
    },
    {
      title: 'Accessories & Housing',
      slug: 'accessories',
      description: 'Infrared gas brooders, automated battery cages, bell drinkers, and transport crates.',
      image: '/products/Acessories/Gas brooder.jpeg',
      badge: 'Commercial Grade',
      badgeVariant: 'default' as const,
    },
  ];

  return (
    <main className="flex-1">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 overflow-hidden rounded-xl">
              <Image
                src="/Brand identity/damingrow logo.png"
                alt="D-AminGrow Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-xl font-bold font-heading text-slate-900 tracking-tight">
                D-AMIN<span className="text-[#00BF62]">GROW</span>
              </span>
              <p className="text-xs text-[#056782] font-medium hidden sm:block">
                Your Satisfaction Is Our Priority
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20would%20like%20to%20inquire%20about%20your%20livestock%20products."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="sm">
                Chat & Order on WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="success" className="mb-4">
            Official Nigerian Agro-Allied Storefront
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-slate-900 tracking-tight max-w-4xl mx-auto">
            Healthy Solutions & Modern Equipment for the{' '}
            <span className="text-[#056782]">African Livestock Sector</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-body">
            Empowering Nigerian poultry and livestock farmers with premium day-old chicks,
            cold-chain vaccines, verified veterinary drugs, and durable farm equipment.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20please%20send%20me%20today's%20Day-Old%20Chick%20prices."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="lg">
                Check Today&apos;s Chick Prices
              </Button>
            </Link>
            <Link
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20am%20interested%20in%20a%20Farm%20Setup%20and%20Equipment%20Consultation."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                Request Farm Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Pillars */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold font-heading text-slate-900">
            Core Livestock Divisions
          </h2>
          <p className="mt-2 text-slate-600">
            Engineered for biosecurity, commercial viability, and optimal flock performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Card key={cat.slug} className="flex flex-col justify-between group">
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant={cat.badgeVariant}>{cat.badge}</Badge>
                </div>
              </div>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-slate-600">{cat.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20am%20inquiring%20about%20your%20${encodeURIComponent(cat.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="teal" size="sm" className="w-full">
                      Inquire on WhatsApp
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust & Regulatory Highlights */}
      <section className="bg-white border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-50 text-[#00BF62]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 font-heading">NAFDAC & Veterinary Standards</h4>
              <p className="text-sm text-slate-600 mt-1">
                Every drug and vaccine complies with NAFDAC regulatory standards with zero tolerance for counterfeit inputs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-sky-50 text-[#056782]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 font-heading">Cold-Chain Guaranteed Transit</h4>
              <p className="text-sm text-slate-600 mt-1">
                Vaccines and biologicals are dispatched Monday–Wednesday in insulated thermal packaging with frozen coolant packs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-lime-50 text-[#7ED956]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 font-heading">Scheduled Hatchery Bookings</h4>
              <p className="text-sm text-slate-600 mt-1">
                Direct booking coordination with top hatcheries for healthy, vigorous chicks delivered to verified pickup hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold font-heading text-lg">D-AMINGROW</p>
            <p className="text-xs text-slate-500 mt-1">
              &copy; {new Date().getFullYear()} D-AminGrow. All rights reserved.
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Official WhatsApp Desk: +2348139169402
            </p>
          </div>
          <div className="text-xs text-slate-500 max-w-md text-center sm:text-right">
            <p>
              *Disclaimer: Veterinary pharmaceuticals and biologicals must be administered in accordance with approved label directions and under appropriate veterinary advice.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
