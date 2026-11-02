'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Calendar,
  Truck,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

const HATCHERY_BRANDS = [
  'Amo Farm (Arbor Acres / Noiler)',
  'Zartech (Cobb 500 / ISA Brown)',
  'Chi Farms (Arbor Acres Plus)',
  'Sayed Farms (Ross 308)',
  'Agrited (Ross 308 / Novogen)',
  'Any Certified Tier-1 Hatchery',
];

const CHICK_BREEDS = [
  { id: 'broiler', name: 'Commercial Day-Old Broilers (Cobb 500 / Arbor Acres)', cartons: '50 + 2 chicks/carton' },
  { id: 'pullet', name: 'Commercial Day-Old Layer Pullets (ISA Brown / Lohmann)', cartons: '50 + 2 chicks/carton' },
  { id: 'turkey', name: 'Day-Old Turkey Poults (Nicholas / Hybrid White)', cartons: '50 + 2 chicks/carton' },
  { id: 'noiler', name: 'Dual-Purpose Hybrid Noiler Chicks', cartons: '50 + 2 chicks/carton' },
  { id: 'cockerel', name: 'Commercial White & Black Cockerels', cartons: '50 + 2 chicks/carton' },
];

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

export default function ChickBookingForm() {
  const [selectedBreed, setSelectedBreed] = useState<string>(CHICK_BREEDS[0]?.name ?? 'Commercial Day-Old Broilers (Cobb 500 / Arbor Acres)');
  const [selectedHatchery, setSelectedHatchery] = useState<string>(HATCHERY_BRANDS[0] ?? 'Amo Farm (Arbor Acres / Noiler)');
  const [cartonCount, setCartonCount] = useState<number>(10); // 10 cartons = 510 chicks
  const [deliveryState, setDeliveryState] = useState<string>('Oyo');
  const [deliveryCity, setDeliveryCity] = useState<string>('Ibadan');
  const [preferredDay, setPreferredDay] = useState<'Tuesday' | 'Thursday'>('Tuesday');
  const [farmerName, setFarmerName] = useState<string>('');
  const [farmerPhone, setFarmerPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const safeCartons = Math.max(1, cartonCount || 1);
  const totalChicks = safeCartons * 51; // 50 + 1 or 2 bonus

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !farmerPhone.trim()) {
      alert('Please provide your name and phone number so the dispatch team can contact you.');
      return;
    }

    setIsSubmitting(true);

    const bookingRef = `DOC-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    // Persist to backend Supabase
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: farmerName,
          phone: farmerPhone,
          state: deliveryState,
          city: deliveryCity,
          enquiryType: 'whatsapp_order',
          notes: `Ref: ${bookingRef} | DOC Booking: ${safeCartons} Cartons (${totalChicks} chicks) of ${selectedBreed}. Hatchery: ${selectedHatchery}. Preferred Dispatch: ${preferredDay}. Notes: ${notes}`,
          consentMarketing: true,
        }),
      });
    } catch {
      // Non-blocking
    }

    setIsSubmitting(false);

    // Generate Pre-Filled WhatsApp Booking Slip
    const waMessage = encodeURIComponent(
      `🐣 *DAY-OLD CHICK DISPATCH BOOKING — D-AMINGROW*\n\n` +
      `*Booking Ref:* ${bookingRef}\n` +
      `*Farmer Name:* ${farmerName.trim()}\n` +
      `*Phone Number:* ${farmerPhone.trim()}\n` +
      `*Breed Selected:* ${selectedBreed}\n` +
      `*Preferred Hatchery:* ${selectedHatchery}\n` +
      `*Quantity:* ${safeCartons} Cartons (~${totalChicks} Chicks)\n` +
      `*Delivery State / City:* ${deliveryState} State, ${deliveryCity}\n` +
      `*Preferred Dispatch Day:* ${preferredDay} Morning\n` +
      (notes ? `*Additional Notes:* ${notes}\n\n` : `\n`) +
      `Please confirm current hatch day price per carton and payment account for slot reservation.`
    );

    window.open(`https://wa.me/2348139169402?text=${waMessage}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-3 py-1 rounded-full mb-2">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Direct Hatchery Allocation Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Day-Old Chick Booking Slip
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Lock in your cartons for the upcoming Tuesday or Thursday nationwide dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-amber-50 border border-amber-200/80 px-4 py-2 text-xs text-amber-900 shrink-0">
            <Clock className="h-4 w-4 text-amber-700 shrink-0" />
            <span>Bookings close 48hrs before hatch</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Breed Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Select Chick Variety & Breed
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CHICK_BREEDS.map((breed) => (
                <button
                  key={breed.id}
                  type="button"
                  onClick={() => setSelectedBreed(breed.name)}
                  className={`text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between ${
                    selectedBreed === breed.name
                      ? 'border-emerald-600 bg-emerald-50/70 text-slate-900 shadow-sm'
                      : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold leading-tight">{breed.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{breed.cartons}</div>
                  </div>
                  {selectedBreed === breed.name && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 ml-2 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Hatchery & Day Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Preferred Hatchery Partner
              </label>
              <select
                value={selectedHatchery}
                onChange={(e) => setSelectedHatchery(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {HATCHERY_BRANDS.map((brand, i) => (
                  <option key={i} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                3. Preferred Dispatch Day
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Tuesday', 'Thursday'] as const).map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setPreferredDay(day)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      preferredDay === day
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{day} Morning</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Input
                label="Number of Cartons (50 chicks / box)"
                type="number"
                min={1}
                max={500}
                value={cartonCount}
                onChange={(e) => setCartonCount(Number(e.target.value))}
                helperText={`Yield: ~${totalChicks.toLocaleString()} live chicks (+bonus)`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Destination State
              </label>
              <select
                value={deliveryState}
                onChange={(e) => setDeliveryState(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {NIGERIAN_STATES.map((state) => (
                  <option key={state} value={state}>{state} State</option>
                ))}
              </select>
            </div>

            <div>
              <Input
                label="City / Nearest Motor Park Depot"
                placeholder="e.g. Sagamu, Kano Depot, Ikeja"
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
                helperText="Where you will pick up the waybill box"
              />
            </div>
          </div>

          {/* Farmer Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <Input
                label="Your Full Name / Farm Name"
                placeholder="e.g. Alhaji Musa Bello"
                required
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="WhatsApp / Phone Number"
                placeholder="e.g. 08012345678"
                type="tel"
                required
                value={farmerPhone}
                onChange={(e) => setFarmerPhone(e.target.value)}
                helperText="For SMS waybill tracking code & arrival alerts"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Special Handling / Brooding Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Include 2 vials of LaSota vaccine in cold box with chicks..."
              className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 font-normal text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="whatsapp"
              size="lg"
              disabled={isSubmitting}
              className="w-full justify-center shadow-xl text-base py-4"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              <span>
                {isSubmitting ? 'Processing Booking Slip...' : 'Generate WhatsApp Booking Slip & Get Confirmed Rate'}
              </span>
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 mt-3">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Marek&apos;s Pre-Vaccinated
              </span>
              <span className="flex items-center gap-1">
                <Truck className="h-3.5 w-3.5 text-emerald-600" /> 36 States Motor Park Transit
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 51 Chicks/Box Guarantee
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
