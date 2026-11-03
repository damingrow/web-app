import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';
import { Badge } from '@/components/ui/badge';
import { ProductDetailClientActions } from './product-client-actions';
import {
  ShieldCheck,
  Thermometer,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Package,
  Truck,
  FileCheck2,
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | D-AminGrow',
    };
  }

  return {
    title: `${product.name} — Current Price & Specs | D-AminGrow Nigeria`,
    description: `${product.shortDescription} Verified NAFDAC/Hatchery quality. Inquire for today's market rate and nationwide dispatch.`,
    openGraph: {
      title: `${product.name} | D-AminGrow Agro-Allied Nigeria`,
      description: product.shortDescription,
      images: [{ url: product.primaryImage }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.category !== category) {
    notFound();
  }

  const related = getRelatedProducts(product, 3);

  // Structured Data Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `https://damingrow.com${product.primaryImage}`,
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'D-AminGrow',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'NGN',
      price: product.price,
      priceValidUntil: '2026-12-31',
      availability:
        product.stockStatus === 'in_stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: 'D-AminGrow Agro-Allied Co.',
      },
    },
  };

  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: product.category.replace(/-/g, ' '), url: `/${product.category}` },
    { name: product.name, url: `/${product.category}/${product.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap pb-1">
          <Link href="/" className="hover:text-emerald-700 transition-colors font-medium">Home</Link>
          <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
          <Link href={`/${product.category}`} className="hover:text-emerald-700 transition-colors font-medium">
            {product.categoryName}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/50">
          {/* Gallery View (Left) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/80 p-6 flex items-center justify-center">
              <Image
                src={product.primaryImage}
                alt={product.name}
                fill
                priority
                className="object-contain p-6 transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />

              {/* Overlays / Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                {product.compliance.coldChainRequired && (
                  <Badge variant="coldchain" className="shadow-md backdrop-blur-md bg-cyan-900/95 text-cyan-200 border-cyan-700/60 text-xs py-1 px-3">
                    <Thermometer className="h-3.5 w-3.5 mr-1.5 text-cyan-300" />
                    2°C–8°C Cold-Chain Guaranteed
                  </Badge>
                )}
                {product.compliance.regulatoryStatus === 'nafdac_registered' && product.compliance.nafdacNumber && (
                  <Badge variant="nafdac" className="shadow-md backdrop-blur-md bg-emerald-900/95 text-emerald-200 border-emerald-700/60 text-xs py-1 px-3">
                    <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-300" />
                    NAFDAC: {product.compliance.nafdacNumber}
                  </Badge>
                )}
                {product.category === 'chicks' && (
                  <span className="inline-flex items-center rounded-full bg-amber-500 text-white px-3 py-1 text-xs font-bold shadow-md">
                    🐣 Marek&apos;s Disease Vaccinated
                  </span>
                )}
                {product.category === 'point-of-lay' && (
                  <span className="inline-flex items-center rounded-full bg-teal-600 text-white px-3 py-1 text-xs font-bold shadow-md">
                    🥚 Ready to Lay (17–20 Wks)
                  </span>
                )}
              </div>

              {/* Packaging unit floating tag */}
              <div className="absolute bottom-4 right-4 z-10">
                <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-slate-800 shadow-md border border-slate-200">
                  <Package className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                  {product.unit}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {product.galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-emerald-500 bg-slate-50 p-2"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} preview ${idx + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Quick logistics reassurance */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Truck className="h-4 w-4 text-emerald-600" />
                Dispatch & Logistics Coverage
              </div>
              <p className="leading-relaxed">
                Direct interstate bus/park waybill transport across all 36 Nigerian States and the FCT. Live animals packed in ventilated transport cartons.
              </p>
            </div>
          </div>

          {/* Product Meta & Actions (Right) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  {product.categoryName}
                </span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400">SKU: <strong className="text-slate-700">{product.sku}</strong></span>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 font-bold text-emerald-800">
                    {product.stockStatus === 'in_stock' ? 'In Stock' : 'Pre-Order Only'}
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-heading leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Dynamic Market Pricing Policy Card */}
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 p-5 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-900 font-heading">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Current Market Pricing Policy
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                    Standard Unit: {product.unit}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Due to variable grain feed prices, hatchery production cycles, and cold-chain transport costs, product rates are refreshed weekly. <strong>Contact our veterinary sales desk on WhatsApp for today&apos;s confirmed rate and availability.</strong>
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Regulatory Notices Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {product.compliance.withdrawalPeriod && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-900 flex items-start space-x-2.5">
                    <Clock className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Withdrawal Notice:</span>
                      Withhold meat/eggs for <strong>{product.compliance.withdrawalPeriod}</strong> after treatment.
                    </div>
                  </div>
                )}

                {product.compliance.amrWarning && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-3.5 text-xs text-rose-900 flex items-start space-x-2.5">
                    <AlertTriangle className="h-4 w-4 text-rose-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">AMR Stewardship:</span>
                      Administer solely under licensed veterinary guidance.
                    </div>
                  </div>
                )}

                {product.dispatchDays && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs text-emerald-900 flex items-start space-x-2.5 sm:col-span-2">
                    <Calendar className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Hatchery Dispatch Schedule:</span>
                      Nationwide dispatch departures every <strong>{product.dispatchDays.join(' and ')}</strong>. Please place reservations at least 48h in advance.
                    </div>
                  </div>
                )}
              </div>

              {/* Key Features Bullet List */}
              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-heading">
                  Key Technical Advantages:
                </h3>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Client Actions */}
            <div className="pt-6 border-t border-slate-100">
              <ProductDetailClientActions product={product} />
            </div>
          </div>
        </div>

        {/* Technical Specifications Table */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                Technical & Clinical Specifications
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Verified clinical parameters and regulatory records for {product.name}
              </p>
            </div>
            <FileCheck2 className="h-6 w-6 text-emerald-600 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-xs sm:text-sm">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="flex justify-between py-2.5 border-b border-slate-100">
                <span className="font-medium text-slate-500">{key}</span>
                <span className="font-bold text-slate-900 text-right">{val}</span>
              </div>
            ))}

            {product.compliance.nafdacNumber && (
              <div className="flex justify-between py-2.5 border-b border-slate-100">
                <span className="font-medium text-slate-500">NAFDAC Reg. Number</span>
                <span className="font-bold text-emerald-700">{product.compliance.nafdacNumber}</span>
              </div>
            )}

            {product.compliance.storageTemp && (
              <div className="flex justify-between py-2.5 border-b border-slate-100">
                <span className="font-medium text-slate-500">Storage & Cold-Chain Protocol</span>
                <span className="font-bold text-slate-900">{product.compliance.storageTemp}</span>
              </div>
            )}

            {product.compliance.activeIngredients && (
              <div className="flex justify-between py-2.5 border-b border-slate-100">
                <span className="font-medium text-slate-500">Active Formulation</span>
                <span className="font-bold text-slate-900">{product.compliance.activeIngredients}</span>
              </div>
            )}

            <div className="flex justify-between py-2.5 border-b border-slate-100">
              <span className="font-medium text-slate-500">Origin & Quality Control</span>
              <span className="font-bold text-slate-900">Certified Veterinary Supplier</span>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                  Related Products in {product.categoryName}
                </h2>
                <p className="text-xs text-slate-500 mt-1">Frequently paired inputs for optimal livestock health</p>
              </div>
              <Link
                href={`/${product.category}`}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
