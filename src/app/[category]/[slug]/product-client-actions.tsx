'use client';

import React, { useState } from 'react';
import { ProductItem } from '@/types/catalog';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { generateWhatsAppOrderLink } from '@/lib/whatsapp';
import { Plus, Minus, ShoppingBag, MessageCircle, Check, PhoneCall, ShieldCheck } from 'lucide-react';

interface Props {
  product: ProductItem;
}

export function ProductDetailClientActions({ product }: Props) {
  const { addItem } = useCart();
  const minQty = product.minOrderQty || 1;
  const [quantity, setQuantity] = useState(minQty);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  const handleInstantWhatsApp = () => {
    const orderRef = `DAG-INQ-${Date.now().toString(36).toUpperCase()}`;
    const url = generateWhatsAppOrderLink({
      orderRef,
      customerName: 'Direct Customer Inquiry',
      deliveryCity: 'Pending Destination',
      deliveryState: 'Nigeria',
      items: [
        {
          name: product.name,
          quantity,
          packagingUnit: product.unit,
        },
      ],
      userNotes: "Please confirm today's live rate, batch expiry/hatch date, and motor park dispatch schedule to my state.",
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-5">
      {/* Quantity Selector Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Quantity ({product.unit}):
          </span>
          {minQty > 1 && (
            <span className="text-[11px] text-slate-500">
              Minimum order requirement: {minQty} {product.unit}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-slate-300 rounded-xl bg-white shadow-sm overflow-hidden">
            <button
              onClick={() => setQuantity((prev) => Math.max(minQty, prev - 1))}
              className="p-2.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
              disabled={quantity <= minQty}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-14 text-center text-base font-extrabold text-slate-900 font-heading">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="p-2.5 text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
            {product.unit}
          </span>
        </div>
      </div>

      {/* Primary Conversion CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleInstantWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-950/15 hover:shadow-emerald-950/25 text-sm sm:text-base"
        >
          <MessageCircle className="h-5 w-5 shrink-0" />
          <span>Inquire Today&apos;s Price on WhatsApp</span>
        </button>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleAddToCart}
          className="py-4 px-6 rounded-2xl border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-900 font-bold transition-all text-sm sm:text-base h-auto"
        >
          {justAdded ? (
            <span className="flex items-center gap-2 text-emerald-700">
              <Check className="h-5 w-5 shrink-0" />
              <span>Added to List!</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 shrink-0 text-emerald-600" />
              <span>Add to Inquiry List</span>
            </span>
          )}
        </Button>
      </div>

      {/* Trust reassurance strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-slate-500 border-t border-slate-100">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          Verified Authentic Input
        </span>
        <span className="flex items-center gap-1.5">
          <PhoneCall className="h-4 w-4 text-emerald-600" />
          Live Technical Support
        </span>
        <span>Nationwide State Dispatch</span>
      </div>
    </div>
  );
}
