import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  const categories = [
    {
      title: 'Day-Old Chicks',
      slug: 'chicks',
      description: 'First-generation commercial broilers and brown layer pullets from certified hatcheries.',
      image: '/products/Chicks/day old broiler.jpeg',
      badge: 'Tuesday & Thursday Dispatch',
      badgeVariant: 'chick' as const,
    },
    {
      title: 'Veterinary Drugs',
      slug: 'drugs',
      description: 'NAFDAC-compliant antibiotics, anticoccidials, amino acids, and water-soluble vitamins.',
      image: '/products/Drugs/oxytet drug.jpeg',
      badge: 'NAFDAC Batch Verified',
      badgeVariant: 'nafdac' as const,
    },
    {
      title: 'Livestock Vaccines',
      slug: 'vaccines',
      description: 'Live freeze-dried viral vaccines shipped in thermal containers with ice gel packs.',
      image: '/Brand identity/damingrow logo.png',
      badge: '2°C–8°C Cold-Chain',
      badgeVariant: 'coldchain' as const,
    },
    {
      title: 'Farm Accessories & Equipment',
      slug: 'accessories',
      description: 'Gas brooder heaters, plucker machines, nipple lines, bell drinkers, and transport crates.',
      image: '/products/Acessories/Gas brooder.jpeg',
      badge: 'Heavy-Duty Commercial',
      badgeVariant: 'default' as const,
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-800 border border-emerald-500/20 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Biosecure Livestock Inputs Across Nigeria</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-slate-950 tracking-tight max-w-4xl mx-auto leading-tight">
            Healthy Solutions & Modern Equipment for the{' '}
            <span className="text-emerald-600">African Livestock Sector</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-body leading-relaxed">
            Empowering poultry and livestock farmers with certified day-old chicks, cold-chain vaccines, NAFDAC-registered veterinary pharmaceuticals, and industrial farm machinery.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/chicks">
              <Button variant="primary" size="lg" className="shadow-lg shadow-emerald-600/20">
                <span>View Hatchery Chicks</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg">
                <span>Request Farm Consultation</span>
              </Button>
            </Link>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20would%20like%20to%20inquire%20about%20your%20livestock%20products."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="lg">
                <Phone className="h-4 w-4 mr-2" />
                <span>Order via WhatsApp</span>
              </Button>
            </a>
          </div>

          <div className="pt-6 flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Certified Hatchery Genetics</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>2°C–8°C Cold-Chain Guaranteed</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>NAFDAC Veterinary Compliance</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Nationwide Waybill Logistics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Category Hubs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Browse by Sector
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mt-1">
              Core Livestock Divisions
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md">
            Biosecure inputs, pharmaceuticals, and infrastructure built to withstand African farm conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-emerald-300"
            >
              <div>
                <div className="relative aspect-video sm:aspect-square w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={cat.badgeVariant}>{cat.badge}</Badge>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <span className="inline-flex items-center text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                  Explore Catalog <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              High-Demand Essentials
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mt-1">
              Popular Farm Inputs & Equipment
            </h2>
          </div>
          <Link
            href="/accessories"
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center"
          >
            <span>View All Products</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Consultation & Technical Advisory Lead Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
                🩺 Professional Agro-Allied Consultation
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
                Need Guidance on Flock Health or Pen Construction?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Our veterinary and livestock engineering team provides personalized flock vaccination schedules, commercial broiler pen design, feed formulation balancing, and disease diagnostics across Nigeria.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link href="/services" className="w-full">
                <Button variant="primary" size="lg" className="w-full justify-center">
                  <span>Book Farm Consultation</span>
                </Button>
              </Link>
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20am%20requesting%20a%20veterinary%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="whatsapp" size="lg" className="w-full justify-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Chat with Veterinary Desk</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
