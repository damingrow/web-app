'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import {
  Calendar,
  Truck,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  Copy,
  Check,
} from 'lucide-react';

const HATCHERY_BRANDS = [
  { code: 'CHI', name: 'Chi Hatchery Ltd (Arbor Acres Plus)' },
  { code: 'ZAR', name: 'Zartech Farms (Cobb 500 / ISA Brown)' },
  { code: 'AMO', name: 'Amo Farm Hatchery (Arbor Acres / Noiler)' },
  { code: 'SAY', name: 'Sayed Farms Hatchery (Ross 308)' },
  { code: 'VAL', name: 'Valentine Chicks Hatchery (Commercial Hybrids)' },
];

const CHICK_BREEDS = [
  { id: 'broiler', name: 'Commercial Day-Old Broilers (Cobb 500 / Ross 308)', rule: '50 + 1 chick bonus per box' },
  { id: 'pullet', name: 'Commercial Day-Old Layer Pullets (ISA Brown / Novogen)', rule: '50 + 1 chick bonus per box' },
  { id: 'turkey', name: 'Commercial Day-Old Turkey Poults (Broad-Breasted)', rule: '25 poults per box' },
  { id: 'duckling', name: 'Commercial Day-Old Ducklings (Keets)', rule: '50 + 1 duckling bonus per box' },
  { id: 'pol', name: 'Point-of-Lay Birds (17–18 Weeks Old)', rule: 'Dispatched in specialized transport crates' },
];

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

interface BookingConfirmation {
  bookingRef: string;
  cartonsCount: number;
  totalBirdsCount: number;
  birdsPerCarton: number;
  estimatedTotalNgn: number;
  requiredDepositNgn: number;
  heldUntil: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    narration: string;
  };
  whatsappConfirmationUrl: string;
}

export default function ChickBookingForm() {
  const [selectedBreedId, setSelectedBreedId] = useState<string>('broiler');
  const [selectedHatcheryCode, setSelectedHatcheryCode] = useState<string>('CHI');
  const [cartonCount, setCartonCount] = useState<number>(10);
  const [deliveryState, setDeliveryState] = useState<string>('Oyo');
  const [deliveryCity, setDeliveryCity] = useState<string>('Ibadan (Bodija Depot)');
  const [preferredDay, setPreferredDay] = useState<'Tuesday' | 'Thursday'>('Tuesday');
  const [farmerName, setFarmerName] = useState<string>('');
  const [farmerPhone, setFarmerPhone] = useState<string>('');
  const [farmName, setFarmName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);

  const safeCartons = Math.max(1, cartonCount || 1);
  const isTurkey = selectedBreedId === 'turkey';
  const birdsPerBox = isTurkey ? 25 : 51;
  const totalChicks = safeCartons * birdsPerBox;

  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !farmerPhone.trim()) {
      alert('Please provide your name and phone number for the dispatch manifest.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: farmerName.trim(),
          customerPhone: farmerPhone.trim(),
          farmName: farmName.trim() || undefined,
          deliveryState,
          destinationHub: deliveryCity.trim() || `${deliveryState} Central Depot`,
          breedType: selectedBreedId,
          hatcheryCode: selectedHatcheryCode,
          cartonsCount: safeCartons,
          notes: `Preferred Dispatch: ${preferredDay} Morning. Notes: ${notes}`,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setConfirmation(data);
      } else {
        // Fallback directly to WhatsApp deep link if reservation API returns an advisory
        const fallbackRef = `DOC-${Date.now().toString(36).toUpperCase()}`;
        const waMsg = encodeURIComponent(
          `🐣 *DAY-OLD CHICK DIRECT RESERVATION — D-AMINGROW*\n\n` +
          `*Ref:* ${fallbackRef}\n` +
          `*Farmer:* ${farmerName.trim()} (${farmerPhone.trim()})\n` +
          `*Breed:* ${selectedBreedId.toUpperCase()}\n` +
          `*Hatchery:* ${selectedHatcheryCode}\n` +
          `*Quantity:* ${safeCartons} Cartons (~${totalChicks} Chicks)\n` +
          `*Destination:* ${deliveryState} (${deliveryCity})\n` +
          `*Dispatch:* ${preferredDay} Morning\n\n` +
          `Please confirm carton allocation and payment account.`
        );
        window.open(`https://wa.me/2348139169402?text=${waMsg}`, '_blank');
      }
    } catch (err) {
      console.error('Reservation submission error:', err);
      // Ensure the farmer is never stranded
      const fallbackUrl = `https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20wish%20to%20book%20${safeCartons}%20cartons%20of%20${selectedBreedId}%20chicks.%20My%20name%20is%20${encodeURIComponent(farmerName)}%20(${encodeURIComponent(farmerPhone)}).`;
      window.open(fallbackUrl, '_blank');
    } finally {
      setIsSubmitting(false);
    }
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
              Transactional reservation engine with live carton yield calculation and nationwide depot routing.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-amber-50 border border-amber-200/80 px-4 py-2 text-xs text-amber-900 shrink-0">
            <Clock className="h-4 w-4 text-amber-700 shrink-0" />
            <span>Bookings close 48hrs prior to hatch</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Breed Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Select Chick Variety & Breed
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {CHICK_BREEDS.map((breed) => (
                <button
                  key={breed.id}
                  type="button"
                  onClick={() => setSelectedBreedId(breed.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between ${
                    selectedBreedId === breed.id
                      ? 'border-emerald-600 bg-emerald-50/70 text-slate-900 shadow-sm ring-1 ring-emerald-600'
                      : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold leading-tight">{breed.name}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{breed.rule}</div>
                  </div>
                  {selectedBreedId === breed.id && (
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
                2. Select Partner Hatchery
              </label>
              <select
                value={selectedHatcheryCode}
                onChange={(e) => setSelectedHatcheryCode(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {HATCHERY_BRANDS.map((brand) => (
                  <option key={brand.code} value={brand.code}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                3. Preferred Dispatch Run
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
                    <span>{day} Departure</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Input
                label={`Number of Cartons (${birdsPerBox} chicks/box)`}
                type="number"
                min={1}
                max={500}
                value={cartonCount}
                onChange={(e) => setCartonCount(Number(e.target.value))}
                helperText={`Yield: ${totalChicks.toLocaleString()} total live birds`}
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
                placeholder="e.g. Bodija Depot, Kano Luxury Bus Park, Oshodi"
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
                helperText="Designated destination collection depot"
              />
            </div>
          </div>

          {/* Farmer Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div>
              <Input
                label="Farmer Full Name"
                placeholder="e.g. Alhaji Musa Bello"
                required
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="WhatsApp Phone Number"
                placeholder="e.g. 08012345678"
                type="tel"
                required
                value={farmerPhone}
                onChange={(e) => setFarmerPhone(e.target.value)}
                helperText="For arrival SMS & waybill code"
              />
            </div>

            <div>
              <Input
                label="Farm / Enterprise Name (Optional)"
                placeholder="e.g. Bello Integrated Farms Ltd"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Handling / Cold Pack Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Add 2 vials of Newcastle LaSota vaccine in cold shipper alongside chicks..."
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
                {isSubmitting ? 'Holding Hatchery Allocation...' : 'Lock In Hatchery Quota & Reserve Cartons'}
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
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 50+1 Chick Bonus Standard
              </span>
            </div>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {confirmation && (
        <Modal
          isOpen={Boolean(confirmation)}
          onClose={() => setConfirmation(null)}
          title="🎉 Hatchery Quota Reserved Successfully"
          description="Your cartons are held under a 2-hour reservation window."
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-slate-700">
            {/* Reservation Summary */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">Booking Reference:</span>
                <span className="text-sm font-mono font-extrabold text-emerald-950">
                  {confirmation.bookingRef}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-emerald-900 border-t border-emerald-200/60 pt-2">
                <span>Allocated Cartons:</span>
                <span className="font-bold">
                  {confirmation.cartonsCount} Cartons ({confirmation.totalBirdsCount.toLocaleString()} Live Birds)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-emerald-900">
                <span>Commitment Deposit Required (50%):</span>
                <span className="text-base font-extrabold text-emerald-900 font-heading">
                  ₦{confirmation.requiredDepositNgn.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Official Bank Account Details */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Building2 className="h-4 w-4 text-slate-600" />
                  Official Settlement Account
                </span>
                <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Hold Expires in 2 Hours
                </span>
              </div>
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Bank:</span>
                  <span className="font-bold text-slate-900">{confirmation.bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Account Number:</span>
                  <div className="flex items-center gap-1.5 font-mono font-extrabold text-slate-900 text-sm">
                    <span>{confirmation.bankDetails.accountNumber}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount(confirmation.bankDetails.accountNumber)}
                      className="text-emerald-700 hover:text-emerald-800 p-1"
                    >
                      {copiedAccount ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Account Name:</span>
                  <span className="font-bold text-slate-900">{confirmation.bankDetails.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Narration:</span>
                  <span className="font-mono text-emerald-700 font-bold">{confirmation.bookingRef}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 space-y-2">
              <a
                href={confirmation.whatsappConfirmationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                <span>Submit Deposit Evidence via WhatsApp Desk</span>
              </a>

              <p className="text-[11px] text-center text-slate-500">
                Our sales desk will verify your deposit on the banking portal and confirm your waybill manifest slot.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
