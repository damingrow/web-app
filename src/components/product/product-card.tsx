'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductItem } from '@/types/catalog';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Check, ShieldCheck, Thermometer } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const existingInCart = items.find((i) => i.product.id === product.id);

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-emerald-200">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-square w-full overflow-hidden bg-slate-50 border-b border-slate-100">
          <Link href={`/${product.category}/${product.slug}`} className="block h-full w-full">
            <Image
              src={product.primaryImage}
              alt={product.name}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>

          {/* Compliance Overlay Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.compliance.coldChainRequired && (
              <Badge variant="coldchain" className="shadow-sm">
                <Thermometer className="h-3 w-3 mr-1" />
                2°C–8°C Cold-Chain
              </Badge>
            )}
            {product.compliance.regulatoryStatus === 'nafdac_registered' && product.compliance.nafdacNumber && (
              <Badge variant="nafdac" className="shadow-sm">
                <ShieldCheck className="h-3 w-3 mr-1" />
                NAFDAC: {product.compliance.nafdacNumber}
              </Badge>
            )}
            {product.category === 'chicks' && (
              <Badge variant="chick" className="shadow-sm">
                🐣 Marek&apos;s Vaccinated
              </Badge>
            )}
          </div>

          {/* Stock Tag */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
              {product.unit}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
            {product.categoryName}
          </div>

          <Link href={`/${product.category}/${product.slug}`}>
            <h3 className="mt-1 text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {product.compliance.withdrawalPeriod && (
            <div className="mt-3 text-[11px] font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md inline-block">
              ⏱ Withdrawal: {product.compliance.withdrawalPeriod}
            </div>
          )}

          {product.dispatchDays && (
            <div className="mt-2 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
              📅 Hatchery Dispatch: {product.dispatchDays.join(' & ')}
            </div>
          )}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="border-t border-slate-100 bg-slate-50/50 p-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">Market Rate</div>
            <div className="text-xs font-medium text-slate-600">
              Contact for Today&apos;s Price
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={existingInCart ? 'outline' : 'primary'}
              size="sm"
              onClick={() => addItem(product, product.minOrderQty || 1)}
              className="flex items-center space-x-1"
            >
              {existingInCart ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>In List ({existingInCart.quantity})</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Add to Inquiry</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
