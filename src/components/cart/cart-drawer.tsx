'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { generateWhatsAppOrderLink, WhatsAppOrderPayload } from '@/lib/whatsapp';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Thermometer, Calendar } from 'lucide-react';

export function CartDrawer() {
  const {
    items,
    itemCount,
    totalAmount,
    hasChicks,
    hasVaccines,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryState, setDeliveryState] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [farmName, setFarmName] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [userNotes, setUserNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isDrawerOpen) return null;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !deliveryState.trim() || !deliveryCity.trim()) {
      setFormError('Please complete all required fields (Name, Phone, State, and City/LGA).');
      return;
    }
    setFormError(null);
    setIsSubmitting(true);

    const orderRef = `DAG-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const payload: WhatsAppOrderPayload = {
      orderRef,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      farmName: farmName.trim() || undefined,
      deliveryCity: deliveryCity.trim(),
      deliveryState: deliveryState.trim(),
      preferredDeliveryDate: preferredDate.trim() || undefined,
      items: items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        packagingUnit: i.product.unit,
        unitPriceNgn: i.product.price,
      })),
      estimatedTotalNgn: totalAmount,
      userNotes: userNotes.trim() || undefined,
    };

    // Attempt to persist enquiry in background
    try {
      fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: customerName,
          phone: customerPhone,
          state: deliveryState,
          city: deliveryCity,
          enquiryType: 'whatsapp_order',
          notes: `Ref: ${orderRef}. Items: ${items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}. Est: ₦${totalAmount.toLocaleString()}`,
          consentMarketing: true,
        }),
      }).catch(() => {});
    } catch {
      // Non-blocking
    }

    const whatsappUrl = generateWhatsAppOrderLink(payload);
    setIsSubmitting(false);
    setIsCheckoutModalOpen(false);
    closeDrawer();

    // Open WhatsApp order window
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform"
        role="dialog"
        aria-label="Order Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-slate-900 font-heading">
              Your Order ({itemCount})
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-base font-medium text-slate-900">Your order list is empty</h3>
              <p className="mt-1 text-sm text-slate-500 max-w-xs">
                Explore our livestock vaccines, day-old chicks, veterinary drugs, and accessories.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Link
                  href="/chicks"
                  onClick={closeDrawer}
                  className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  Day-Old Chicks
                </Link>
                <Link
                  href="/drugs"
                  onClick={closeDrawer}
                  className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  Veterinary Drugs
                </Link>
                <Link
                  href="/accessories"
                  onClick={closeDrawer}
                  className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  Farm Equipment
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Warnings for Special Regulated Lines */}
              {hasVaccines && (
                <div className="flex items-start space-x-2.5 rounded-lg border border-cyan-200 bg-cyan-50/80 p-3 text-xs text-cyan-900">
                  <Thermometer className="h-4 w-4 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Cold-Chain Vaccines Included:</span> Maintained at 2°C–8°C. Shipped with insulated ice gel packs. Dispatch confirmed via phone.
                  </div>
                </div>
              )}

              {hasChicks && (
                <div className="flex items-start space-x-2.5 rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-900">
                  <Calendar className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Live Day-Old Chicks:</span> Depart certified hatcheries every Tuesday & Thursday. 50% deposit required for allocation confirmation.
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="divide-y divide-slate-100">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex py-3.5 space-x-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      <Image
                        src={product.primaryImage}
                        alt={product.name}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium text-slate-900 line-clamp-1">{product.name}</h4>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-slate-400 hover:text-red-500 ml-2"
                            aria-label={`Remove ${product.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500">{product.unit}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-200 rounded-md">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-2 py-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                            disabled={quantity <= (product.minOrderQty || 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-slate-800">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="px-2 py-1 text-slate-500 hover:bg-slate-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">
                          ₦{(product.price * quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-red-500 transition-colors"
                >
                  Clear all items
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Estimated Total:</span>
              <span className="text-xl font-bold text-slate-900 font-heading">
                ₦{totalAmount.toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-slate-500">
              * Official prices exclude state delivery / logistics fee, confirmed directly via WhatsApp.
            </p>

            <Button
              variant="whatsapp"
              size="lg"
              className="w-full justify-center"
              onClick={() => setIsCheckoutModalOpen(true)}
            >
              <span>Continue to WhatsApp Order</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* WhatsApp Checkout Details Modal */}
      <Modal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        title="Complete Your WhatsApp Order"
        description="Provide your delivery destination and contact info. We will format a complete order ticket directly into WhatsApp (+2348139169402) for immediate fulfillment."
        maxWidth="md"
      >
        <form onSubmit={handleCheckoutSubmit} className="space-y-4 mt-2">
          {formError && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Full Name *"
              required
              placeholder="e.g. Alhaji Musa Ibrahim"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Input
              label="Phone Number (WhatsApp) *"
              required
              placeholder="e.g. 0803 123 4567"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Delivery State *"
              required
              placeholder="e.g. Oyo State"
              value={deliveryState}
              onChange={(e) => setDeliveryState(e.target.value)}
            />
            <Input
              label="City / Town / LGA *"
              required
              placeholder="e.g. Ibadan North / Bodija"
              value={deliveryCity}
              onChange={(e) => setDeliveryCity(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Farm / Enterprise Name (Optional)"
              placeholder="e.g. Baraka Poultry Farms"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
            />
            <Input
              label="Preferred Delivery Day"
              placeholder="e.g. Next Tuesday / Urgent"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
            />
          </div>

          <Input
            label="Special Instructions / Waybill Notes (Optional)"
            placeholder="e.g. Meet at motor park depot or deliver to farm gate"
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
          />

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Official WhatsApp Desk: <span className="font-semibold text-slate-700">+234 813 916 9402</span>
            </div>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsCheckoutModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="whatsapp"
                size="sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Opening WhatsApp...' : 'Send Order to WhatsApp'}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
