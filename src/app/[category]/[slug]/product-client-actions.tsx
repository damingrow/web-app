'use client';

import React, { useState } from 'react';
import { ProductItem } from '@/types/catalog';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { generateWhatsAppOrderLink } from '@/lib/whatsapp';
import { Plus, Minus, ShoppingBag, Phone, Check } from 'lucide-react';

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
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleInstantWhatsApp = () => {
    const orderRef = `DAG-INQ-${Date.now().toString(36).toUpperCase()}`;
    const url = generateWhatsAppOrderLink({
      orderRef,
      customerName: 'Customer Inquiry',
      deliveryCity: 'Pending Destination',
      deliveryState: 'Nigeria',
      items: [
        {
          name: product.name,
          quantity,
          packagingUnit: product.unit,
        },
      ],
      userNotes: "Please confirm today's market price, batch availability, and delivery dispatch schedule.",
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">Quantity:</span>
        <div className="flex items-center border border-slate-300 rounded-xl bg-white shadow-sm overflow-hidden">
          <button
            onClick={() => setQuantity((prev) => Math.max(minQty, prev - 1))}
            className="p-2.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
            disabled={quantity <= minQty}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center text-sm font-bold text-slate-900">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="p-2.5 text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {minQty > 1 && (
          <span className="text-xs text-slate-500 font-medium">
            (Minimum order: {minQty} {product.unit})
          </span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="whatsapp"
          size="lg"
          onClick={handleInstantWhatsApp}
          className="flex-1 justify-center py-3.5 shadow-md"
        >
          <Phone className="h-5 w-5 mr-2" />
          <span>Inquire Today&apos;s Price on WhatsApp</span>
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleAddToCart}
          className="flex-1 justify-center py-3.5"
        >
          {justAdded ? (
            <>
              <Check className="h-5 w-5 mr-2 text-emerald-600" />
              <span>Added to Inquiry List!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5 mr-2" />
              <span>Add to Inquiry List</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
