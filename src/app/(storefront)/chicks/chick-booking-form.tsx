'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import {
  Truck,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  Copy,
  Check,
  AlertCircle,
} from 'lucide-react';
import { getUpcomingDispatchDates, UpcomingDispatchDate } from '@/lib/booking/booking-service';

const HATCHERY_BRANDS = [
  { code: 'CHI', name: 'CHI Farms Limited (Arbor Acres Plus / ISA Brown)', location: 'Ajanla, Ibadan' },
  { code: 'AMO', name: 'Amo Farm Sieberer Ltd (Broilers / Noiler)', location: 'Awe / Oyo' },
  { code: 'ZAR', name: 'Zartech Farms Limited (Cobb 500 / Black & Brown Pullets)', location: 'Oluyole, Ibadan' },
  { code: 'SUP', name: 'Supreme Poultry Farms (Supreme Broilers & Pullets)', location: 'Oyo / Ogun Corridor' },
];

const CHICK_BREEDS = [
  { id: 'broiler', name: 'Commercial Broilers', rule: '50 per carton', ratePerCarton: 100000, pricePerBird: 2000, birdsPerBox: 50 },
  { id: 'pullet', name: 'Zartech Pullet', rule: '50 per carton', ratePerCarton: 135000, pricePerBird: 2700, birdsPerBox: 50 },
  { id: 'hybrid-turkey', name: 'Hybrid Turkey', rule: '30 in carton', ratePerCarton: 165000, pricePerBird: 5500, birdsPerBox: 30 },
  { id: 'local-turkey', name: 'Local Turkey', rule: '30 in a carton', ratePerCarton: 69000, pricePerBird: 2300, birdsPerBox: 30 },
  { id: 'noiler', name: 'Noiler', rule: '50 in a carton', ratePerCarton: 37500, pricePerBird: 750, birdsPerBox: 50 },
  { id: 'cockerel', name: 'Cockerel', rule: '50 in a carton', ratePerCarton: 5000, pricePerBird: 100, birdsPerBox: 50 },
  { id: 'duckling', name: 'Commercial Day-Old Ducklings (Keets)', rule: '50 per carton', ratePerCarton: 45000, pricePerBird: 900, birdsPerBox: 50 },
  { id: 'pol', name: 'Point-of-Lay Birds (17–18 Weeks Old)', rule: '10 birds per specialized crate', ratePerCarton: 140000, pricePerBird: 14000, birdsPerBox: 10 },
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
  const [upcomingDates, setUpcomingDates] = useState<UpcomingDispatchDate[]>([]);
  const [selectedBreedId, setSelectedBreedId] = useState<string>('broiler');
  const [selectedHatcheryCode, setSelectedHatcheryCode] = useState<string>('CHI');
  const [selectedDateObj, setSelectedDateObj] = useState<UpcomingDispatchDate | null>(null);
  const [cartonCount, setCartonCount] = useState<number>(10);
  const [deliveryState, setDeliveryState] = useState<string>('Oyo');
  const [deliveryCity, setDeliveryCity] = useState<string>('Ibadan (Bodija Depot)');
  const [farmerName, setFarmerName] = useState<string>('');
  const [farmerPhone, setFarmerPhone] = useState<string>('');
  const [farmName, setFarmName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [quotaWarning, setQuotaWarning] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);

  useEffect(() => {
    // Generate the next 6 upcoming Monday/Thursday dates
    const dates = getUpcomingDispatchDates(6);
    setUpcomingDates(dates);
    if (dates.length > 0) {
      setSelectedDateObj((prev) => prev || dates[0] || null);
    }
  }, []);

  const safeCartons = Math.max(1, cartonCount || 1);
  const selectedBreedObj = CHICK_BREEDS.find((b) => b.id === selectedBreedId) ?? CHICK_BREEDS[0]!;
  const birdsPerBox = selectedBreedObj.birdsPerBox;
  const totalChicks = safeCartons * birdsPerBox;
  const estimatedTotal = safeCartons * selectedBreedObj.ratePerCarton;
  const requiredDeposit = Math.round(estimatedTotal * 0.5);

  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuotaWarning(null);

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
          dispatchDate: selectedDateObj?.date,
          notes: `Preferred Dispatch Date: ${selectedDateObj?.formattedDate || 'Upcoming Monday'}. Notes: ${notes}`,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setConfirmation(data);
      } else if (response.status === 409) {
        // Concurrency quota exceeded
        setQuotaWarning(
          data.message ||
            `Requested ${safeCartons} cartons exceed available allocation for this dispatch run. Please reduce cartons or pick another departure date.`
        );
      } else {
        // Fallback directly to WhatsApp deep link if reservation API returns an advisory
        const fallbackRef = `DOC-${Date.now().toString(36).toUpperCase()}`;
        const waMsg = encodeURIComponent(
          `🐣 *DAY-OLD CHICK DIRECT RESERVATION — D-AMINGROW*\n\n` +
          `*Ref:* ${fallbackRef}\n` +
          `*Farmer:* ${farmerName.trim()} (${farmerPhone.trim()})\n` +
          `*Breed:* ${selectedBreedId.toUpperCase()}\n` +
          `*Supplier:* ${selectedHatcheryCode}\n` +
          `*Quantity:* ${safeCartons} Cartons (~${totalChicks} Chicks)\n` +
          `*Destination:* ${deliveryState} (${deliveryCity})\n` +
          `*Dispatch Date:* ${selectedDateObj?.formattedDate || 'Upcoming Run'}\n\n` +
          `Please confirm carton allocation and payment account.`
        );
        window.open(`https://wa.me/2348139169402?text=${waMsg}`, '_blank');
      }
    } catch (err) {
      console.error('Reservation submission error:', err);
      const fallbackUrl = `https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20wish%20to%20book%20${safeCartons}%20cartons%20of%20${selectedBreedId}%20chicks.%20My%20name%20is%20${encodeURIComponent(farmerName)}%20(${encodeURIComponent(farmerPhone)}).`;
      window.open(fallbackUrl, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl relative overflow-hidden font-body">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-7">
        {/* Header */}
        <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-3 py-1 rounded-full mb-2">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Transactional Hatchery Quota Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Day-Old Chick Booking Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select verified grandparent hatcheries, reserve your cartons with concurrency protection, and lock in Monday/Thursday nationwide dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-amber-50 border border-amber-200/80 px-4 py-2 text-xs text-amber-900 shrink-0">
            <Clock className="h-4 w-4 text-amber-700 shrink-0" />
            <span>Bookings close 48hrs prior to hatch</span>
          </div>
        </div>

        {/* Quota Concurrency Warning Banner */}
        {quotaWarning && (
          <div className="rounded-2xl bg-amber-50 border border-amber-300 p-4 flex items-start gap-3 animate-in fade-in">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900 font-heading">Allocation Adjustment Required</h4>
              <p className="text-xs text-amber-800 mt-0.5">{quotaWarning}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* 1. Breed Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Select Chick Variety & Breed
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                    <div className="text-[11px] font-semibold text-emerald-700 mt-1">
                      ~₦{breed.ratePerCarton.toLocaleString()} / carton
                    </div>
                  </div>
                  {selectedBreedId === breed.id && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 ml-2 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Bird Supplier Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              2. Select Bird Supplier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {HATCHERY_BRANDS.map((brand) => (
                <button
                  key={brand.code}
                  type="button"
                  onClick={() => setSelectedHatcheryCode(brand.code)}
                  className={`text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between ${
                    selectedHatcheryCode === brand.code
                      ? 'border-emerald-600 bg-emerald-50/70 text-slate-900 shadow-sm ring-1 ring-emerald-600'
                      : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md inline-block mb-1">
                      {brand.code} Certified
                    </span>
                    <div className="text-xs font-bold leading-tight text-slate-900">{brand.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{brand.location}</div>
                  </div>
                  {selectedHatcheryCode === brand.code && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 ml-2 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Live Dispatch Calendar Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                3. Choose Upcoming Dispatch Date (Monday / Thursday Runs)
              </label>
              <span className="text-[11px] text-slate-500">Pick next available hatch day</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {upcomingDates.map((dt) => {
                const isSelected = selectedDateObj?.date === dt.date;
                return (
                  <button
                    key={dt.date}
                    type="button"
                    onClick={() => setSelectedDateObj(dt)}
                    className={`text-left p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-md ring-1 ring-emerald-600'
                        : 'border-slate-200 bg-slate-50/70 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md inline-block mb-1 ${
                        isSelected ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-800'
                      }`}>
                        {dt.dayOfWeek}
                      </span>
                      <div className="text-xs font-bold mt-0.5 leading-tight">
                        {dt.formattedDate.split(',')[1]}
                      </div>
                    </div>
                    <div className={`text-[10px] mt-2 pt-1 border-t ${
                      isSelected ? 'border-emerald-500 text-emerald-100' : 'border-slate-200 text-slate-500'
                    }`}>
                      {dt.isBookingOpen ? '✓ Booking Open' : 'Closed (48h Cutoff)'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Quantity, Packaging Calculation & Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
            <div>
              <Input
                label={`Number of Cartons (${birdsPerBox} chicks/box)`}
                type="number"
                min={1}
                max={500}
                value={cartonCount}
                onChange={(e) => setCartonCount(Number(e.target.value))}
                helperText={`Yield: ${totalChicks.toLocaleString()} live birds total`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Destination State
              </label>
              <select
                value={deliveryState}
                onChange={(e) => setDeliveryState(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 bg-white p-3 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {NIGERIAN_STATES.map((state) => (
                  <option key={state} value={state}>{state} State</option>
                ))}
              </select>
            </div>

            <div>
              <Input
                label="Pickup Depot / Motor Park"
                placeholder="e.g. Bodija Depot, Kano Luxury Bus Park, Oshodi"
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
                helperText="Official designated collection terminal"
              />
            </div>
          </div>

          {/* Real-Time Pricing & 50% Commitment Deposit Summary */}
          <div className="rounded-2xl bg-emerald-950 text-white p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 border border-emerald-800/40">
            <div>
              <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">Estimated Total Value</div>
              <div className="text-xl sm:text-2xl font-extrabold font-heading text-white mt-0.5">
                ₦{estimatedTotal.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Subject to confirmed weekly hatch rate</div>
            </div>

            <div>
              <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">Required Commitment Deposit (50%)</div>
              <div className="text-xl sm:text-2xl font-extrabold font-heading text-amber-300 mt-0.5">
                ₦{requiredDeposit.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Locks quota with partner hatchery</div>
            </div>

            <div>
              <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">Dispatch Run</div>
              <div className="text-sm font-bold text-white mt-1">
                {selectedDateObj?.formattedDate || 'Upcoming Monday'}
              </div>
              <div className="text-[10px] text-slate-300 mt-0.5">Temperature-monitored vehicle waybill</div>
            </div>
          </div>

          {/* 5. Farmer Contact Details */}
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
                {isSubmitting ? 'Placing Booking Request...' : `Reserve ${safeCartons} Cartons for ${selectedDateObj?.formattedDate || 'Upcoming Run'}`}
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
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 50+1 Bonus Chick Standard
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
