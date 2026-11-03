'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import {
  Egg,
  Truck,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  Info,
  Phone,
} from 'lucide-react';

const POL_BREEDS = [
  {
    id: 'brown_layer',
    name: 'Commercial Brown Layer Pullets (ISA Brown / Dominant Black / Bovan)',
    desc: 'High lay rate (305–325 eggs/cycle), dark brown eggs with strong shell strength. Best for deep litter and battery cage setups.',
    recommendedAge: '17–18 Weeks',
    estimatedRatePerBird: 3950,
  },
  {
    id: 'white_layer',
    name: 'Commercial White Layer Pullets (Lohmann White / Dekalb)',
    desc: 'Superior feed conversion (95–110g feed/bird/day), high volume egg output (295–315 eggs/cycle). Ideal for battery cages.',
    recommendedAge: '18–20 Weeks',
    estimatedRatePerBird: 3800,
  },
];

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

interface PolBookingConfirmation {
  bookingRef: string;
  birdCount: number;
  cratesCount: number;
  breedName: string;
  estimatedTotalNgn: number;
  requiredDepositNgn: number;
  heldUntil: string;
  deliveryState: string;
  dispatchDay: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    narration: string;
  };
  whatsappConfirmationUrl: string;
}

export function PolBookingForm() {
  const [selectedBreed, setSelectedBreed] = useState<string>('brown_layer');
  const [selectedAge, setSelectedAge] = useState<string>('17-18_weeks');
  const [housingSystem, setHousingSystem] = useState<string>('cages');
  const [birdCount, setBirdCount] = useState<number>(100);
  const [deliveryState, setDeliveryState] = useState<string>('Oyo');
  const [deliveryCity, setDeliveryCity] = useState<string>('Ibadan (Bodija Depot / Farm Gate)');
  const [preferredDay, setPreferredDay] = useState<'Tuesday' | 'Thursday'>('Tuesday');
  const [farmerName, setFarmerName] = useState<string>('');
  const [farmerPhone, setFarmerPhone] = useState<string>('');
  const [farmName, setFarmName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<PolBookingConfirmation | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);

  const safeBirdCount = Math.max(50, birdCount || 50);
  const cratesCount = Math.ceil(safeBirdCount / 10); // 10 adult birds per ventilated crate
  const activeBreedObj = POL_BREEDS.find((b) => b.id === selectedBreed) || POL_BREEDS[0]!;
  const breedRate = activeBreedObj ? activeBreedObj.estimatedRatePerBird : 3950;
  const breedName = activeBreedObj ? activeBreedObj.name : 'Commercial Brown Layer Pullets';
  const estimatedTotalNgn = safeBirdCount * breedRate;
  const requiredDepositNgn = Math.round(estimatedTotalNgn * 0.5); // 50% commitment deposit

  const handleCopyAccount = () => {
    if (confirmation?.bankDetails) {
      navigator.clipboard.writeText(confirmation.bankDetails.accountNumber);
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName || !farmerPhone) {
      alert('Please enter your full name and active WhatsApp phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: farmerName,
          customerPhone: farmerPhone,
          farmName: farmName || 'Independent Farm',
          deliveryState,
          destinationHub: deliveryCity,
          breedType: 'pol',
          hatcheryCode: 'ZAR', // Primary verified POL rearing source partner
          cartonsCount: cratesCount,
          notes: `POL Pullet Order: ${safeBirdCount} birds (${cratesCount} crates). Breed: ${breedName}. Age: ${selectedAge.replace('_', ' ')}. Housing: ${housingSystem}. Dispatch: ${preferredDay}. ${notes ? `Notes: ${notes}` : ''}`,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setConfirmation({
          bookingRef: data.bookingRef,
          birdCount: safeBirdCount,
          cratesCount,
          breedName,
          estimatedTotalNgn,
          requiredDepositNgn,
          heldUntil: data.heldUntil || new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          deliveryState,
          dispatchDay: preferredDay,
          bankDetails: data.bankDetails || {
            bankName: 'Zenith Bank Plc',
            accountNumber: '1017894562',
            accountName: 'D-AminGrow Agro-Allied Services',
            narration: data.bookingRef,
          },
          whatsappConfirmationUrl: data.whatsappConfirmationUrl,
        });
      } else {
        alert(data.message || 'Unable to record reservation. Please contact our desk directly.');
      }
    } catch (err) {
      console.error('Booking submission failed:', err);
      alert('A network error occurred. Please contact our desk directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-[#050E08] via-emerald-950 to-slate-900 p-6 sm:p-8 text-white">
        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
          <Egg className="h-4 w-4" />
          <span>Direct Farm Sourcing & Batch Reservation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
          Point-of-Lay Pullets Order Desk
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
          Reserve uniform, fully vaccinated 17–20 week-old pullets. 50 birds minimum. Ventilated transport crates provided nationwide.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        {/* Step 1: Breed Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">1</span>
            Select Layer Breed
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POL_BREEDS.map((breed) => {
              const isSelected = selectedBreed === breed.id;
              return (
                <div
                  key={breed.id}
                  onClick={() => setSelectedBreed(breed.id)}
                  className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-heading font-bold text-slate-900 text-sm">{breed.name}</div>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 ml-2" />}
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{breed.desc}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="rounded-md bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5">
                      Rec. Age: {breed.recommendedAge}
                    </span>
                    <span className="rounded-md bg-slate-100 text-slate-700 font-medium px-2 py-0.5">
                      Est. ~₦{breed.estimatedRatePerBird.toLocaleString()} / bird
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Age & Housing System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">2</span>
              Target Age at Dispatch
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: '17-18_weeks', label: '17–18 Weeks', desc: 'Pre-lay adjustment' },
                { id: '18-20_weeks', label: '18–20 Weeks', desc: 'Imminent first egg' },
              ].map((age) => (
                <button
                  type="button"
                  key={age.id}
                  onClick={() => setSelectedAge(age.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedAge === age.id
                      ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-900 ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{age.label}</div>
                  <div className="text-[10px] text-slate-500">{age.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">3</span>
              Your Housing System
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'cages', label: 'Battery Cages', desc: 'Multi-tier layer cages' },
                { id: 'deep_litter', label: 'Deep Litter', desc: 'Floor wood shavings' },
              ].map((sys) => (
                <button
                  type="button"
                  key={sys.id}
                  onClick={() => setHousingSystem(sys.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    housingSystem === sys.id
                      ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-900 ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{sys.label}</div>
                  <div className="text-[10px] text-slate-500">{sys.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Quantity with Crates Calculation */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">4</span>
            Order Quantity (Birds) — Minimum 50 Birds
          </label>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {[50, 100, 200, 500, 1000].map((qty) => (
              <button
                type="button"
                key={qty}
                onClick={() => setBirdCount(qty)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  birdCount === qty
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {qty.toLocaleString()} Birds
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <Input
              type="number"
              min={50}
              step={10}
              value={birdCount}
              onChange={(e) => setBirdCount(Math.max(50, parseInt(e.target.value) || 50))}
              className="text-base font-bold text-slate-900 py-3"
            />
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 flex items-center space-x-3 text-xs text-emerald-900">
              <Truck className="h-5 w-5 text-emerald-700 shrink-0" />
              <div>
                <span className="font-bold">{cratesCount} Ventilated Transport Crates</span>
                <span className="text-[11px] text-emerald-700 block">
                  (10 birds per crate to prevent heat stress and suffocation)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Dispatch Logistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Destination State</label>
            <select
              value={deliveryState}
              onChange={(e) => setDeliveryState(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {NIGERIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st} State
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Preferred Dispatch Day</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Tuesday', 'Thursday'] as const).map((day) => (
                <button
                  type="button"
                  key={day}
                  onClick={() => setPreferredDay(day)}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                    preferredDay === day
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Delivery Depot / Farm Location</label>
            <Input
              type="text"
              placeholder="e.g. Ibadan Central Depot or Farm Address"
              value={deliveryCity}
              onChange={(e) => setDeliveryCity(e.target.value)}
              required
              className="text-xs"
            />
          </div>
        </div>

        {/* Step 5: Farmer Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Farmer / Contact Full Name</label>
            <Input
              type="text"
              placeholder="e.g. Alhaji Babatunde Adeleke"
              value={farmerName}
              onChange={(e) => setFarmerName(e.target.value)}
              required
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">WhatsApp Phone Number</label>
            <Input
              type="tel"
              placeholder="08031234567 or +234..."
              value={farmerPhone}
              onChange={(e) => setFarmerPhone(e.target.value)}
              required
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Farm / Enterprise Name (Optional)</label>
            <Input
              type="text"
              placeholder="e.g. Golden Crest Integrated Farm"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="text-xs"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Special Instructions / Housing Readiness</label>
          <textarea
            rows={2}
            placeholder="Specify any feeding equipment, cage readiness, or specific delivery timing requests..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Commitment Breakdown & Bank Notice */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs text-slate-500 block">Estimated Benchmark Total:</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                ~₦{estimatedTotalNgn.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 ml-1">
                ({safeBirdCount} birds @ ~₦{breedRate.toLocaleString()}/bird)
              </span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-bold text-emerald-800 block">Required 50% Commitment Deposit:</span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-700 font-heading">
                ₦{requiredDepositNgn.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500 block">Balance paid upon arrival confirmation</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 text-xs text-slate-600">
            <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              POL birds are conditioned livestock reserved specifically for your order. Submitting this form generates an official reservation reference. A 50% commitment deposit is required within 2 hours to finalize transport logistics and veterinary dispatch clearance.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <span>Generating Official Reservation Reference...</span>
            ) : (
              <>
                <Egg className="h-5 w-5 mr-1" />
                <span>Reserve Point-of-Lay Birds & Get Payment Reference</span>
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {confirmation && (
        <Modal
          isOpen={Boolean(confirmation)}
          onClose={() => setConfirmation(null)}
          title="Point-of-Lay Pullets Reservation Recorded"
          description={`Reference: ${confirmation.bookingRef}`}
          maxWidth="lg"
        >
          <div className="space-y-6 text-xs text-slate-700">
            {/* Status Strip */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1 text-emerald-900">
              <div className="flex items-center space-x-2 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Allocation Held for 2 Hours</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Your order for {confirmation.birdCount} {confirmation.breedName} ({confirmation.cratesCount} transport crates) has been registered. Complete the commitment deposit to lock your batch.
              </p>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800">
              <div>
                <span className="text-[11px] text-slate-500 block">Total Est. Amount:</span>
                <span className="font-extrabold text-sm sm:text-base text-slate-900 font-heading">
                  ₦{confirmation.estimatedTotalNgn.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-800 block">50% Deposit Due:</span>
                <span className="font-extrabold text-sm sm:text-base text-emerald-700 font-heading">
                  ₦{confirmation.requiredDepositNgn.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Dispatch Day:</span>
                <span className="font-bold text-xs">{confirmation.dispatchDay}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Destination:</span>
                <span className="font-bold text-xs">{confirmation.deliveryState} State</span>
              </div>
            </div>

            {/* Official Bank Account Details */}
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-emerald-400" />
                  <span className="font-bold text-xs uppercase tracking-wider text-emerald-400">
                    Official Settlement Account
                  </span>
                </div>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                  Zenith Bank Plc
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl border border-white/10">
                <div>
                  <span className="text-[10px] text-slate-400 block">Account Number:</span>
                  <span className="font-mono text-lg font-extrabold tracking-wider text-white">
                    {confirmation.bankDetails.accountNumber}
                  </span>
                  <span className="text-[10px] text-slate-300 block">
                    {confirmation.bankDetails.accountName}
                  </span>
                </div>
                <button
                  onClick={handleCopyAccount}
                  className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                >
                  {copiedAccount ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedAccount ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-300 flex items-center space-x-1.5">
                <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>
                  Narration: <strong className="text-white font-mono">{confirmation.bookingRef}</strong>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={confirmation.whatsappConfirmationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg transition-all text-xs sm:text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>Send Booking Reference to WhatsApp Desk</span>
              </a>

              <Button
                variant="outline"
                onClick={() => setConfirmation(null)}
                className="w-full text-xs text-slate-600 border-slate-300"
              >
                Close & Return to Catalog
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
