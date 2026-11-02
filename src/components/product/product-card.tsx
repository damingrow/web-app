'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductItem } from '@/types/catalog';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Check,
  ShieldCheck,
  Thermometer,
  MessageCircle,
  Clock,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const existingInCart = items.find((i) => i.product.id === product.id);

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello D-AminGrow, I would like to inquire about today's live price and availability for: ${product.name} (${product.unit}). Please confirm delivery to my location.`
    );
    window.open(`https://wa.me/2348139169402?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/10 hover:border-emerald-300 hover:-translate-y-1">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-slate-50/80 to-slate-100/50 border-b border-slate-100">
          <Link href={`/${product.category}/${product.slug}`} className="block h-full w-full">
            <Image
              src={product.primaryImage}
              alt={product.name}
              fill
              className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-108"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>

          {/* Compliance Overlay Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.compliance.coldChainRequired && (
              <Badge variant="coldchain" className="shadow-sm backdrop-blur-md bg-cyan-900/90 text-cyan-200 border-cyan-700/50 text-[10px] py-0.5 px-2">
                <Thermometer className="h-3 w-3 mr-1 text-cyan-300" />
                2°C–8°C Cold-Chain
              </Badge>
            )}
            {product.compliance.regulatoryStatus === 'nafdac_registered' && product.compliance.nafdacNumber && (
              <Badge variant="nafdac" className="shadow-sm backdrop-blur-md bg-emerald-900/90 text-emerald-200 border-emerald-700/50 text-[10px] py-0.5 px-2">
                <ShieldCheck className="h-3 w-3 mr-1 text-emerald-300" />
                NAFDAC Reg.
              </Badge>
            )}
            {product.category === 'chicks' && (
              <span className="inline-flex items-center rounded-full bg-amber-500/90 text-white px-2 py-0.5 text-[10px] font-semibold shadow-sm backdrop-blur-md">
                🐣 Marek&apos;s Vaccinated
              </span>
            )}
            {product.category === 'point-of-lay' && (
              <span className="inline-flex items-center rounded-full bg-teal-600/90 text-white px-2 py-0.5 text-[10px] font-semibold shadow-sm backdrop-blur-md">
                🥚 Ready to Lay
              </span>
            )}
          </div>

          {/* Unit / Packaging Tag */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-800 shadow-sm border border-slate-200/80">
              {product.unit}
            </span>
          </div>

          {/* Hover Action Overlay Icon */}
          <Link
            href={`/${product.category}/${product.slug}`}
            className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white/90 text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all shadow-md hover:bg-emerald-600 hover:text-white"
            aria-label="View product details"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Product Details */}
        <div className="p-5 sm:p-6 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            <span>{product.categoryName}</span>
            <span className="text-slate-400 font-normal">SKU: {product.sku}</span>
          </div>

          <Link href={`/${product.category}/${product.slug}`} className="block">
            <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Micro badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.compliance.withdrawalPeriod && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-800 bg-amber-50/80 border border-amber-200/70 px-2 py-0.5 rounded-md">
                <Clock className="h-2.5 w-2.5" />
                Withdrawal: {product.compliance.withdrawalPeriod}
              </span>
            )}
            {product.dispatchDays && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-800 bg-emerald-50/80 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                <Calendar className="h-2.5 w-2.5" />
                Dispatch: {product.dispatchDays.join(' & ')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="border-t border-slate-100 bg-slate-50/70 p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Pricing Policy</div>
            <div className="text-xs font-semibold text-slate-900 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Current Price on Request
            </div>
          </div>
          {product.minOrderQty && product.minOrderQty > 1 && (
            <span className="text-[10px] text-slate-500 font-medium">
              Min: {product.minOrderQty} {product.unit}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button
            type="button"
            variant={existingInCart ? 'outline' : 'primary'}
            size="sm"
            onClick={() => addItem(product, product.minOrderQty || 1)}
            className="w-full text-xs py-2 h-auto font-semibold justify-center"
          >
            {existingInCart ? (
              <span className="flex items-center gap-1 truncate text-emerald-700">
                <Check className="h-3.5 w-3.5 shrink-0" />
                <span>Listed ({existingInCart.quantity})</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 truncate">
                <Plus className="h-3.5 w-3.5 shrink-0" />
                <span>Add Inquiry</span>
              </span>
            )}
          </Button>

          <button
            type="button"
            onClick={handleDirectWhatsApp}
            className="flex items-center justify-center gap-1 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold py-2 px-2 rounded-xl transition-all shadow-sm truncate"
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Ask Price</span>
          </button>
        </div>
      </div>
    </div>
  );
}
