'use client';

import React from 'react';
import { useCart } from '@/context/cart-context';
import { ShoppingBag } from 'lucide-react';

export function CartFloatingButton() {
  const { itemCount, totalAmount, toggleDrawer } = useCart();

  if (itemCount === 0) return null;

  return (
    <aside aria-label="Order Cart" className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleDrawer}
        className="flex items-center space-x-3 rounded-full bg-slate-900 px-5 py-3.5 text-white shadow-xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
        aria-label={`View cart with ${itemCount} items totaling ₦${totalAmount.toLocaleString()}`}
      >
        <div className="relative">
          <ShoppingBag className="h-5 w-5 text-emerald-400" />
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold text-white shadow">
            {itemCount}
          </span>
        </div>
        <div className="text-left font-sans">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold leading-none">
            Your Order
          </div>
          <div className="text-sm font-bold text-white leading-tight">
            ₦{totalAmount.toLocaleString()}
          </div>
        </div>
      </button>
    </aside>
  );
}
