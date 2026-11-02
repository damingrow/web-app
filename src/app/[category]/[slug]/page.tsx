import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { Badge } from '@/components/ui/badge';
import { ProductDetailClientActions } from './product-client-actions';
import {
  ShieldCheck,
  Thermometer,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
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
    title: `${product.name} | D-AminGrow Nigeria`,
    description: `${product.shortDescription} Inquire for current market rate and booking.`,
    openGraph: {
      title: `${product.name} | D-AminGrow Nigeria`,
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

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <Link href={`/${product.category}`} className="hover:text-emerald-700">
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          {/* Gallery View */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-100">
              <Image
                src={product.primaryImage}
                alt={product.name}
                fill
                priority
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Overlays */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.compliance.coldChainRequired && (
                  <Badge variant="coldchain" className="shadow-sm">
                    <Thermometer className="h-3.5 w-3.5 mr-1" />
                    2°C–8°C Cold-Chain Verified
                  </Badge>
                )}
                {product.compliance.nafdacNumber && (
                  <Badge variant="nafdac" className="shadow-sm">
                    <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                    NAFDAC Reg: {product.compliance.nafdacNumber}
                  </Badge>
                )}
                {product.category === 'chicks' && (
                  <Badge variant="chick" className="shadow-sm">
                    🐣 Marek&apos;s Disease Vaccinated
                  </Badge>
                )}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {product.galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-emerald-500 bg-slate-50"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Meta & Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  {product.categoryName} • SKU: {product.sku}
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  {product.stockStatus === 'in_stock' ? 'In Stock' : 'Pre-Order Only'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 font-heading leading-tight">
                {product.name}
              </h1>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-heading">
                    Current Market Pricing Policy
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                    Packaging: {product.unit}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Prices for livestock supplies and day-old chicks fluctuate based on weekly hatchery input costs, feed grain rates, and batch availability. <strong>Contact our sales desk on WhatsApp to confirm today&apos;s live price and arrange delivery.</strong>
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Compliance Alerts */}
              {product.compliance.withdrawalPeriod && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Withdrawal Period Notice:</span>
                    Strictly withhold meat or eggs for <strong>{product.compliance.withdrawalPeriod}</strong> after last dose to ensure safe food residues.
                  </div>
                </div>
              )}

              {product.compliance.amrWarning && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-900 flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Antimicrobial Stewardship:</span>
                    Administer for diagnosed bacterial infections under veterinary direction. Not for routine growth promotion.
                  </div>
                </div>
              )}

              {product.dispatchDays && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Hatchery Dispatch Schedule:</span>
                    Nationwide motor park waybill departures occur every <strong>{product.dispatchDays.join(' and ')}</strong>. Pre-order 48h prior.
                  </div>
                </div>
              )}

              {/* Key Features Bullet List */}
              <div className="pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Key Advantages:</h3>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Client Actions (Cart + Direct WhatsApp) */}
            <div className="pt-6 border-t border-slate-100">
              <ProductDetailClientActions product={product} />
            </div>
          </div>
        </div>

        {/* Technical Specifications Table */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              Technical & Regulatory Specifications
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified clinical and engineering specifications for {product.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="flex justify-between py-2 border-b border-slate-100 text-xs sm:text-sm">
                <span className="font-medium text-slate-500">{key}</span>
                <span className="font-semibold text-slate-900 text-right">{val}</span>
              </div>
            ))}

            {product.compliance.nafdacNumber && (
              <div className="flex justify-between py-2 border-b border-slate-100 text-xs sm:text-sm">
                <span className="font-medium text-slate-500">NAFDAC Reg. Number</span>
                <span className="font-semibold text-slate-900">{product.compliance.nafdacNumber}</span>
              </div>
            )}

            {product.compliance.storageTemp && (
              <div className="flex justify-between py-2 border-b border-slate-100 text-xs sm:text-sm">
                <span className="font-medium text-slate-500">Storage Protocol</span>
                <span className="font-semibold text-slate-900">{product.compliance.storageTemp}</span>
              </div>
            )}

            {product.compliance.activeIngredients && (
              <div className="flex justify-between py-2 border-b border-slate-100 text-xs sm:text-sm">
                <span className="font-medium text-slate-500">Active Formulation</span>
                <span className="font-semibold text-slate-900">{product.compliance.activeIngredients}</span>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900 font-heading">Related in {product.categoryName}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Frequently paired items by commercial farmers</p>
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
