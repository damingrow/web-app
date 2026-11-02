'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateConsultationWhatsAppLink } from '@/lib/whatsapp';
import {
  Stethoscope,
  Building2,
  Syringe,
  Wheat,
  CheckCircle2,
  Phone,
  Send,
} from 'lucide-react';

const SERVICES = [
  {
    icon: Building2,
    title: 'Poultry Housing & Pen Construction',
    description:
      'Turnkey engineering advisory for open-sided tropical pens, closed-ventilation broiler sheds, and multi-tier layer battery cage infrastructure.',
  },
  {
    icon: Syringe,
    title: 'Flock Vaccination & Biosecurity Protocols',
    description:
      'Site-specific immunization programs aligned with endemic viral challenges in your agricultural zone (Newcastle, Gumboro, Marek’s, Fowl Pox).',
  },
  {
    icon: Stethoscope,
    title: 'Flock Health Diagnostics & Autopsy',
    description:
      'Field diagnostics, post-mortem lesion evaluation, and targeted clinical therapy to halt unexplained flock mortality and feed drop.',
  },
  {
    icon: Wheat,
    title: 'On-Farm Feed Formulation & Compounding',
    description:
      'Nutritional ration balancing utilizing local Nigerian grains, soybean meal, methionine, lysine, and enzymes for minimum cost per kg weight gain.',
  },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(SERVICES[0]?.title ?? '');
  const [farmerName, setFarmerName] = useState('');
  const [phone, setPhone] = useState('');
  const [stateName, setStateName] = useState('');
  const [flockSize, setFlockSize] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !phone.trim() || !stateName.trim()) {
      setFormError('Please fill in your Name, Phone number, and Farm State.');
      return;
    }
    setFormError(null);
    setIsSubmitting(true);

    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: farmerName,
          phone,
          state: stateName,
          enquiryType: 'veterinary_consultation',
          notes: `Service: ${selectedService}. Flock Size: ${flockSize}. Notes: ${notes}`,
          consentMarketing: true,
        }),
      });
    } catch {
      // Non-blocking fallback
    }

    setIsSubmitting(false);
    setSubmitted(true);

    // Open WhatsApp with populated consultation message
    const waUrl = generateConsultationWhatsAppLink(
      selectedService,
      farmerName.trim(),
      flockSize.trim() || undefined
    );
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Consultations & Technical Services</span>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
              🩺 Livestock Health & Engineering Experts
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
              Livestock Technical Services & Advisory
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Elevate your agricultural venture with evidence-based veterinary consultations, custom farm housing design, and flock disease control led by experienced livestock professionals.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Certified Animal Health Specialists</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>On-Farm & Virtual Consultations</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Practical Commercial Solutions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            const isSelected = selectedService === srv.title;
            return (
              <div
                key={idx}
                onClick={() => setSelectedService(srv.title)}
                className={`cursor-pointer rounded-2xl border p-6 transition-all duration-200 ${
                  isSelected
                    ? 'border-emerald-500 bg-white ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`rounded-xl p-3 shrink-0 ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 font-heading">{srv.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>
                    <div className="pt-2">
                      <span className="text-xs font-semibold text-emerald-700">
                        {isSelected ? '✓ Selected for Inquiry' : 'Click to select this service →'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Consultation Request Form Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm max-w-3xl mx-auto">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              Request a Veterinary Consultation
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Submit your inquiry below or open direct consultation with our desk at{' '}
              <strong className="text-emerald-700">+234 813 916 9402</strong>.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">Consultation Ticket Opened!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your consultation request has been logged. Our livestock consultant is awaiting your chat on WhatsApp to review your farm parameters.
              </p>
              <div className="pt-4">
                <Button
                  variant="whatsapp"
                  size="md"
                  onClick={() =>
                    window.open(
                      generateConsultationWhatsAppLink(selectedService, farmerName, flockSize),
                      '_blank'
                    )
                  }
                >
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Resume WhatsApp Consultation</span>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {formError}
                </div>
              )}

              <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-700 border border-slate-200">
                <span className="font-semibold text-slate-900">Selected Service:</span>{' '}
                <span className="text-emerald-700 font-semibold">{selectedService}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Farmer / Enterprise Name *"
                  required
                  placeholder="e.g. Dr. Babatunde Adeyemi"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                />
                <Input
                  label="Phone Number (WhatsApp) *"
                  required
                  placeholder="e.g. 0802 345 6789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Farm Location (State / LGA) *"
                  required
                  placeholder="e.g. Ogun State (Sagamu)"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                />
                <Input
                  label="Current Flock / Herd Size (Approx.)"
                  placeholder="e.g. 2,000 Broilers, 500 Layers"
                  value={flockSize}
                  onChange={(e) => setFlockSize(e.target.value)}
                />
              </div>

              <Input
                label="Summary of Challenge or Service Request"
                placeholder="e.g. Need advice on heat stress mortality in week 5 broilers and pen ventilation"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Direct Line: <strong className="text-slate-800">+234 813 916 9402</strong>
                </div>
                <Button
                  type="submit"
                  variant="whatsapp"
                  size="md"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Connect to Veterinary Desk'}</span>
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
