'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import {
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Flame,
} from 'lucide-react';

interface SymptomOption {
  id: string;
  label: string;
  syndrome: 'gastro' | 'respiratory' | 'neuro' | 'general';
  isAcute: boolean;
  differentialHint: string;
}

const SYMPTOM_OPTIONS: SymptomOption[] = [
  {
    id: 'bloody_droppings',
    label: 'Bloody / Mucoid Droppings',
    syndrome: 'gastro',
    isAcute: true,
    differentialHint: 'Suspect Acute Coccidiosis (Eimeria tenella / necatrix)',
  },
  {
    id: 'greenish_watery_droppings',
    label: 'Greenish / Bright Yellow Watery Diarrhea',
    syndrome: 'gastro',
    isAcute: true,
    differentialHint: 'Suspect Velogenic Newcastle Disease or Fowl Typhoid',
  },
  {
    id: 'whitish_vent_pasting',
    label: 'Chalky Whitish Diarrhea & Vent Pasting',
    syndrome: 'gastro',
    isAcute: false,
    differentialHint: 'Suspect Infectious Bursal Disease (Gumboro) or Pullorum',
  },
  {
    id: 'gasping_respiratory_distress',
    label: 'Gasping, Rales, Neck-Stretching Breathing',
    syndrome: 'respiratory',
    isAcute: true,
    differentialHint: 'Suspect Newcastle (Pneumotropic), Infectious Laryngotracheitis (ILT), or Aspergillosis',
  },
  {
    id: 'swollen_head_facial_edema',
    label: 'Swollen Eyes, Facial Sinuses, Nasal Discharge',
    syndrome: 'respiratory',
    isAcute: false,
    differentialHint: 'Suspect Infectious Coryza (Avibacterium) or Swollen Head Syndrome',
  },
  {
    id: 'twisted_neck_torticollis',
    label: 'Twisted Neck (Torticollis) / Leg Paralysis',
    syndrome: 'neuro',
    isAcute: true,
    differentialHint: 'Suspect Neurotropic Newcastle Disease or Marek’s Disease (Neural form)',
  },
  {
    id: 'huddling_severe_depression',
    label: 'Huddling Under Brooder, Feathers Ruffled, Shivering',
    syndrome: 'general',
    isAcute: false,
    differentialHint: 'Suspect Brooder hypothermia, Gumboro onset, or early Septicemia',
  },
  {
    id: 'sudden_unexplained_death',
    label: 'Sudden Unexplained Mortality in Healthy-Looking Birds',
    syndrome: 'general',
    isAcute: true,
    differentialHint: 'Suspect Acute Newcastle, Sudden Death Syndrome (SDS), or Ascites / Heat Stroke',
  },
];

const FLOCK_TYPES = [
  'Commercial Broilers',
  'Commercial Layers',
  'Point-of-Lay Pullets',
  'Commercial Cockerels',
  'Turkey Poults / Growers',
  'Noiler / Dual-Purpose Indigenous',
];

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

interface TriageResult {
  level: 'critical' | 'high' | 'normal';
  title: string;
  description: string;
  recommendedAction: string;
  differentials: string[];
}

export function VeterinaryTriageForm() {
  const [flockType, setFlockType] = useState<string>('Commercial Broilers');
  const [flockSize, setFlockSize] = useState<number>(1000);
  const [birdAge, setBirdAge] = useState<string>('3 Weeks');
  const [housingType, setHousingType] = useState<string>('Deep Litter');
  const [mortalityRate, setMortalityRate] = useState<string>('1-5'); // '0', '1-5', '6-20', '21-50', '50+'
  const [feedIntake, setFeedIntake] = useState<string>('mild_drop'); // 'normal', 'mild_drop', 'severe_drop', 'off_feed'
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [vaccinationStatus, setVaccinationStatus] = useState<string>('up_to_date');
  const [medicationsGiven, setMedicationsGiven] = useState<string>('none');
  const [farmerName, setFarmerName] = useState<string>('');
  const [farmerPhone, setFarmerPhone] = useState<string>('');
  const [farmName, setFarmName] = useState<string>('');
  const [farmState, setFarmState] = useState<string>('Oyo');
  const [farmLocation, setFarmLocation] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [triageModalData, setTriageModalData] = useState<{
    reference: string;
    triage: TriageResult;
    whatsappUrl: string;
  } | null>(null);

  // Compute Clinical Triage Score
  const calculateTriage = (): TriageResult => {
    const hasAcuteSymptom = selectedSymptoms.some((sId) => {
      const sym = SYMPTOM_OPTIONS.find((opt) => opt.id === sId);
      return sym?.isAcute;
    });

    const isHighMortality = mortalityRate === '21-50' || mortalityRate === '50+';
    const isMediumMortality = mortalityRate === '6-20';
    const isFeedCrash = feedIntake === 'severe_drop' || feedIntake === 'off_feed';

    const identifiedDifferentials = selectedSymptoms
      .map((sId) => SYMPTOM_OPTIONS.find((opt) => opt.id === sId)?.differentialHint)
      .filter((d): d is string => Boolean(d));

    if (isHighMortality || (isMediumMortality && hasAcuteSymptom) || (isFeedCrash && hasAcuteSymptom)) {
      return {
        level: 'critical',
        title: '🚨 CRITICAL: Potential Acute Epidemic Outbreak',
        description: 'High mortality or severe acute clinical signs detected. Requires immediate veterinary containment and biosecurity isolation within 1 hour.',
        recommendedAction: 'Immediate Farm Isolation: Separate affected pen, stop water sharing, keep 2–3 fresh carcasses cool (NOT frozen) for necropsy, and connect with our veterinary consultant immediately.',
        differentials: identifiedDifferentials.length > 0 ? identifiedDifferentials : ['Acute Viral Outbreak (Newcastle/Gumboro)', 'Acute Bacterial Septicemia'],
      };
    }

    if (isMediumMortality || isFeedCrash || hasAcuteSymptom) {
      return {
        level: 'high',
        title: '⚠️ HIGH: Active Clinical Disease Challenge',
        description: 'Active morbidity or noticeable mortality spike. Prompt differential diagnosis needed to prevent escalation into mass loss.',
        recommendedAction: 'Immediate Diagnostic Review: Avoid indiscriminate antibiotic use which masks pathology. Share flock video and droppings photos on WhatsApp for clinical differential evaluation.',
        differentials: identifiedDifferentials.length > 0 ? identifiedDifferentials : ['Subacute Respiratory Complex', 'Coccidiosis / Enteritis Challenge'],
      };
    }

    return {
      level: 'normal',
      title: '📋 ROUTINE / PREVENTIVE: Management & Advisory Triage',
      description: 'Low mortality index. Symptoms suggest early management challenge, nutritional deficit, or sub-clinical stress.',
      recommendedAction: 'Standard Veterinary Advisory: Review brooding temperature, litter moisture, ventilation airflow, and electrolyte supplementation.',
      differentials: identifiedDifferentials.length > 0 ? identifiedDifferentials : ['Environmental Brooding Stress', 'Nutritional / Electrolyte Imbalance'],
    };
  };

  const currentTriage = calculateTriage();

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName || !farmerPhone) {
      alert('Please provide your full name and active WhatsApp phone number for clinical follow-up.');
      return;
    }

    setIsSubmitting(true);
    try {
      const triage = calculateTriage();
      const priorityMap: Record<string, 'urgent' | 'high' | 'normal'> = {
        critical: 'urgent',
        high: 'high',
        normal: 'normal',
      };
      const apiPriority = priorityMap[triage.level];

      const symptomsReport = selectedSymptoms
        .map((sId) => SYMPTOM_OPTIONS.find((opt) => opt.id === sId)?.label)
        .join(', ') || 'No acute symptoms marked';

      const clinicalNotes = `[VETERINARY CLINICAL TRIAGE INTAKE]
Urgency Classification: ${triage.level.toUpperCase()}
Flock Profile: ${flockType} | Size: ${flockSize} birds | Age: ${birdAge} | Housing: ${housingType}
Mortality (24-48h): ${mortalityRate} birds | Feed Intake: ${feedIntake.replace('_', ' ')}
Clinical Symptoms Observed: ${symptomsReport}
Vaccination History: ${vaccinationStatus.replace(/_/g, ' ')}
Medication Administered: ${medicationsGiven}
Primary Differentials to Investigate:
${triage.differentials.map((d) => `• ${d}`).join('\n')}`;

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: farmerName,
          phone: farmerPhone,
          farmName: farmName || 'Independent Poultry Farm',
          state: farmState,
          city: farmLocation || farmState,
          enquiryType: 'veterinary_consultation',
          priority: apiPriority,
          notes: clinicalNotes,
          consentMarketing: true,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const ref = data.enquiryRef || data.referenceNumber;
        const encodedHandover = encodeURIComponent(
          `Hello D-AminGrow Veterinary Desk,\nI have submitted an urgent clinical diagnostic triage.\nRef: ${ref}\nUrgency: ${triage.level.toUpperCase()}\nFlock: ${flockSize} ${flockType} (${birdAge})\nMortality (24h): ${mortalityRate} birds\nPrimary Signs: ${symptomsReport}\nState: ${farmState} (${farmLocation})\nFarmer: ${farmerName} (${farmerPhone})\nPlease guide on immediate treatment and necropsy protocol.`
        );
        const whatsappUrl = `https://wa.me/2348139169402?text=${encodedHandover}`;

        setTriageModalData({
          reference: ref,
          triage,
          whatsappUrl,
        });
      } else {
        alert(data.message || 'Unable to record triage intake. Please contact our veterinary desk directly on WhatsApp.');
      }
    } catch (err) {
      console.error('Triage submission failed:', err);
      alert('A network issue occurred. Please connect directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-[#050E08] p-6 sm:p-8 text-white">
        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
          <Stethoscope className="h-4 w-4" />
          <span>Interactive Clinical Diagnostic Intake & Triage</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
          Poultry Flock Health Triage Desk
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          Experiencing mortality, drop in egg production, or sudden respiratory distress? Complete this triage for an instant risk evaluation and prioritized veterinary support from D-AminGrow.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        {/* Step 1: Flock Profile */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">1</span>
            Flock Demographics & Housing
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Flock Type</label>
              <select
                value={flockType}
                onChange={(e) => setFlockType(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {FLOCK_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Flock Size (Birds)</label>
              <Input
                type="number"
                min={10}
                value={flockSize}
                onChange={(e) => setFlockSize(Math.max(1, parseInt(e.target.value) || 100))}
                className="text-xs font-bold"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Flock Age (e.g. 14 Days / 22 Wks)</label>
              <Input
                type="text"
                value={birdAge}
                onChange={(e) => setBirdAge(e.target.value)}
                className="text-xs font-bold"
                placeholder="e.g. 3 Weeks"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Housing Type</label>
              <select
                value={housingType}
                onChange={(e) => setHousingType(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Deep Litter">Deep Litter (Wood Shavings)</option>
                <option value="Battery Cages">Battery Cages</option>
                <option value="Free Range / Semi-Intensive">Free Range / Semi-Intensive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Morbidity & Mortality Dynamics */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">2</span>
            Mortality Rate & Feed Appetite (Last 24–48 Hours)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-700">Mortality in Last 24 Hours:</div>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: '0', label: '0 Birds' },
                  { id: '1-5', label: '1–5' },
                  { id: '6-20', label: '6–20' },
                  { id: '21-50', label: '21–50' },
                  { id: '50+', label: '50+' },
                ].map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setMortalityRate(m.id)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border ${
                      mortalityRate === m.id
                        ? m.id === '50+' || m.id === '21-50'
                          ? 'border-red-600 bg-red-600 text-white shadow'
                          : m.id === '6-20'
                          ? 'border-amber-500 bg-amber-500 text-white shadow'
                          : 'border-emerald-600 bg-emerald-600 text-white shadow'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-700">Feed Consumption Change:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'normal', label: 'Normal' },
                  { id: 'mild_drop', label: '10–20% Drop' },
                  { id: 'severe_drop', label: '>30% Drop' },
                  { id: 'off_feed', label: 'Off Feed' },
                ].map((f) => (
                  <button
                    type="button"
                    key={f.id}
                    onClick={() => setFeedIntake(f.id)}
                    className={`py-2 px-1.5 text-center rounded-xl text-[11px] font-bold transition-all border ${
                      feedIntake === f.id
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Observed Symptoms Checklist */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">3</span>
            Select Observed Clinical Signs (Check all that apply)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SYMPTOM_OPTIONS.map((sym) => {
              const isChecked = selectedSymptoms.includes(sym.id);
              return (
                <div
                  key={sym.id}
                  onClick={() => toggleSymptom(sym.id)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all flex items-start space-x-3 ${
                    isChecked
                      ? sym.isAcute
                        ? 'border-red-500 bg-red-50/60 ring-1 ring-red-400'
                        : 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-500'
                      : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // Controlled by card click
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                      <span>{sym.label}</span>
                      {sym.isAcute && (
                        <span className="text-[10px] font-extrabold uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                          Acute
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">{sym.differentialHint}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 4: Medical History */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Flock Vaccination Status</label>
            <select
              value={vaccinationStatus}
              onChange={(e) => setVaccinationStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="up_to_date">Fully Vaccinated per Standard Schedule</option>
              <option value="missed_some">Missed 1 or 2 Vaccines</option>
              <option value="unvaccinated">Completely Unvaccinated</option>
              <option value="unknown">Unknown / Not Sure</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Medications Given Within Last 7 Days</label>
            <Input
              type="text"
              placeholder="e.g. Enrofloxacin, Amprolium, Vitamins, or None"
              value={medicationsGiven}
              onChange={(e) => setMedicationsGiven(e.target.value)}
              className="text-xs font-semibold"
            />
          </div>
        </div>

        {/* Live Triage Urgency Assessment Callout */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            currentTriage.level === 'critical'
              ? 'bg-red-50 border-red-300 text-red-950'
              : currentTriage.level === 'high'
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}
        >
          <div className="flex items-center space-x-2 font-bold text-sm mb-1.5">
            {currentTriage.level === 'critical' ? (
              <Flame className="h-5 w-5 text-red-600 animate-pulse" />
            ) : currentTriage.level === 'high' ? (
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            )}
            <span>{currentTriage.title}</span>
          </div>
          <p className="text-xs leading-relaxed mb-3">{currentTriage.description}</p>
          <div className="p-3 bg-white/80 rounded-xl border border-black/5 text-[11px] leading-relaxed">
            <strong>Immediate Biosecurity Action: </strong>
            {currentTriage.recommendedAction}
          </div>
        </div>

        {/* Step 5: Farmer Contact & Farm Location */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">4</span>
            Your Farm Details & WhatsApp Contact
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Farmer / Farm Manager Name</label>
              <Input
                type="text"
                placeholder="e.g. Dr. / Mr. Sunday Adeleke"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                required
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">WhatsApp Phone Number</label>
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
              <label className="text-xs font-semibold text-slate-700">Farm / Enterprise Name (Optional)</label>
              <Input
                type="text"
                placeholder="e.g. Apex Farms Ltd"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Farm State Location</label>
              <select
                value={farmState}
                onChange={(e) => setFarmState(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {NIGERIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st} State</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Farm LGA / Town / Landmark</label>
              <Input
                type="text"
                placeholder="e.g. Ido LGA, Ibadan, Oyo State"
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                className="text-xs"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all text-sm flex items-center justify-center space-x-2 text-white ${
              currentTriage.level === 'critical'
                ? 'bg-red-700 hover:bg-red-800 shadow-red-700/20'
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-700/20'
            }`}
          >
            {isSubmitting ? (
              <span>Submitting Clinical Triage Case...</span>
            ) : (
              <>
                <Stethoscope className="h-5 w-5 mr-1" />
                <span>Submit Clinical Triage & Connect to Emergency Vet</span>
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Triage Handover Modal */}
      {triageModalData && (
        <Modal
          isOpen={Boolean(triageModalData)}
          onClose={() => setTriageModalData(null)}
          title="Clinical Triage Intake Registered"
          description={`Reference Ticket: ${triageModalData.reference}`}
          maxWidth="lg"
        >
          <div className="space-y-5 text-xs text-slate-700">
            {/* Urgency Badge */}
            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                triageModalData.triage.level === 'critical'
                  ? 'bg-red-50 border-red-300 text-red-950'
                  : triageModalData.triage.level === 'high'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="font-extrabold text-sm flex items-center space-x-2">
                <span>{triageModalData.triage.title}</span>
              </div>
              <p className="text-xs leading-relaxed">{triageModalData.triage.description}</p>
            </div>

            {/* Differential guidance note */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">Differentials to Rule Out:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {triageModalData.triage.differentials.map((item, idx) => (
                  <li key={idx} className="font-medium">{item}</li>
                ))}
              </ul>
              <div className="pt-2 text-[11px] text-slate-500 italic">
                * Note: Definitive diagnosis requires necropsy and laboratory confirmation. Do not self-administer unverified antibiotics.
              </div>
            </div>

            {/* Emergency Handover Action */}
            <div className="space-y-3 pt-2">
              <a
                href={triageModalData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg transition-all text-xs sm:text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>Chat Directly with Veterinary Consultant on WhatsApp</span>
              </a>

              <Button
                variant="outline"
                onClick={() => setTriageModalData(null)}
                className="w-full text-xs text-slate-600 border-slate-300"
              >
                Done / Return to Services
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
