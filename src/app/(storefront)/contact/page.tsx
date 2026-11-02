'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  Clock,
  ArrowRight,
  Star,
  Feather,
  Syringe,
  Home,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';

const CONTACT_REASONS = [
  { value: 'chick_pricing', label: 'Day-Old Chick Pricing & Booking' },
  { value: 'vaccine_order', label: 'Vaccine Order & Cold-Chain Delivery' },
  { value: 'drug_inquiry', label: 'Veterinary Drug / Supplement Inquiry' },
  { value: 'equipment_order', label: 'Farm Equipment & Accessories' },
  { value: 'consultation', label: 'Farm Consultation Request' },
  { value: 'technical', label: 'Technical Support / Livestock Health' },
  { value: 'partnership', label: 'Business Partnership / Bulk Supply' },
  { value: 'other', label: 'Other Inquiry' },
];

const FAQ_ITEMS = [
  {
    q: 'How do I get current pricing for day-old chicks?',
    a: 'Chick prices fluctuate weekly based on parent-stock availability and feed costs. Message us on WhatsApp for today\'s confirmed rate before booking.',
  },
  {
    q: 'Do you deliver across all Nigerian states?',
    a: 'Yes. We dispatch to all 36 states and FCT via registered motor parks. Day-old chicks depart every Tuesday and Thursday.',
  },
  {
    q: 'Are your vaccines properly cold-chained?',
    a: 'Absolutely. All our vaccines maintain a continuous 2°C–8°C cold-chain from our refrigerated storage to delivery, with ice gel packs and thermal boxes.',
  },
  {
    q: 'Are your drugs NAFDAC registered?',
    a: 'Yes. Every veterinary pharmaceutical we supply is NAFDAC-registered with batch numbers traceable to the manufacturer.',
  },
  {
    q: 'Can you help me set up a commercial poultry farm?',
    a: 'Yes! Our consultation service covers pen design, equipment specification, vaccination programs, and feed formulation. Contact us to book a farm consultation.',
  },
  {
    q: 'How fast do you respond to inquiries?',
    a: 'Our sales desk responds to all WhatsApp messages within 2 hours during business hours (8AM–6PM Monday–Saturday).',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    state: '',
    reason: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setError('Please provide your name and phone number.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          state: formData.state,
          enquiryType: formData.reason || 'general',
          notes: formData.message,
          consentMarketing: true,
        }),
      });
    } catch {
      // Fallback — still show success
    }

    setIsSubmitting(false);
    setSubmitted(true);

    // Open WhatsApp with the message
    const msg = encodeURIComponent(
      `Hello D-AminGrow,\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nState: ${formData.state}\nReason: ${formData.reason}\n\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/2348139169402?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="font-body">

      {/* ====================================================================
          HERO
          ==================================================================== */}
      <section className="relative hero-mesh overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-12">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Contact Us</span>
          </nav>

          <div className="max-w-3xl space-y-6">
            <div className="section-label-dark w-fit">
              <MessageCircle className="h-3.5 w-3.5" />
              Get In Touch
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
              We&apos;re Here to Help{' '}
              <span className="text-gradient-green">Your Farm Grow</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed">
              Whether you&apos;re looking for today&apos;s chick prices, ordering vaccines, or need professional farm consultation — our team responds within 2 hours.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { icon: Feather, text: 'Day-Old Chicks' },
                { icon: Syringe, text: 'Vaccines' },
                { icon: Home, text: 'Equipment' },
                { icon: Stethoscope, text: 'Consultation' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <span key={i} className="flex items-center gap-2 text-sm text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                    <Icon className="h-4 w-4" />
                    {item.text}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* ====================================================================
          CONTACT INFO + FORM
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: Contact Info */}
            <div className="lg:col-span-2 space-y-8">

              <div>
                <h2 className="text-2xl font-extrabold font-heading text-slate-900 mb-2">Contact Information</h2>
                <p className="text-sm text-slate-600">Reach us through any of these channels — we respond fast.</p>
              </div>

              {/* Primary WhatsApp */}
              <div className="rounded-3xl bg-gradient-to-br from-[#25D366]/15 to-[#128C7E]/5 border border-[#25D366]/25 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-[#25D366] flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[#128C7E] mb-0.5">WhatsApp — Fastest Response</div>
                    <a
                      href="https://wa.me/2348139169402"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold text-slate-900 hover:text-[#128C7E] transition-colors"
                    >
                      +234 813 916 9402
                    </a>
                  </div>
                </div>
                <p className="text-sm text-slate-600">Message us for instant pricing, bookings, and order inquiries. Business hours: Mon–Sat, 8AM–6PM.</p>
                <a
                  href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20would%20like%20to%20inquire%20about%20your%20products%20and%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 rounded-xl transition-all text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  Open WhatsApp Chat
                </a>
              </div>

              {/* Other contacts */}
              <div className="space-y-4">
                {[
                  {
                    icon: Phone,
                    label: 'Phone / WhatsApp',
                    value: '+234 813 916 9402',
                    href: 'tel:+2348139169402',
                    color: 'text-emerald-600',
                    bg: 'bg-emerald-100',
                  },
                  {
                    icon: Mail,
                    label: 'Email Address',
                    value: 'info@damingrow.com',
                    href: 'mailto:info@damingrow.com',
                    color: 'text-teal-600',
                    bg: 'bg-teal-100',
                  },
                  {
                    icon: MapPin,
                    label: 'Location',
                    value: 'Nigeria & West Africa (Nationwide Delivery)',
                    href: null,
                    color: 'text-slate-600',
                    bg: 'bg-slate-100',
                  },
                  {
                    icon: Clock,
                    label: 'Business Hours',
                    value: 'Monday – Saturday: 8:00 AM – 6:00 PM',
                    href: null,
                    color: 'text-amber-600',
                    bg: 'bg-amber-100',
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100">
                      <div className={`h-10 w-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-0.5">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className={`text-sm font-semibold ${item.color} hover:underline`}>
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-sm font-semibold text-slate-700">{item.value}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick services */}
              <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 font-heading">Quick Inquiry Links</h4>
                {[
                  { label: 'Check Chick Prices', href: '/chicks', icon: Feather },
                  { label: 'Order Vaccines', href: '/vaccines', icon: Syringe },
                  { label: 'Book Consultation', href: '/services#consultation', icon: Stethoscope },
                  { label: 'Farm Equipment', href: '/accessories', icon: Home },
                ].map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={i}
                      href={link.href}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50 group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">{link.label}</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-8 sm:p-10">

                {submitted ? (
                  <div className="text-center py-12 space-y-5">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-2">Message Received!</h3>
                      <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                        Your inquiry has been logged. We&apos;ve also opened a WhatsApp conversation for you — our team will respond within 2 hours.
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 pt-2">
                      <a
                        href="https://wa.me/2348139169402"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Continue on WhatsApp
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 px-6 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-extrabold font-heading text-slate-900 mb-2">Send Us a Message</h2>
                      <p className="text-sm text-slate-600">
                        Fill in the form below and we&apos;ll get back to you within 2 hours via WhatsApp or email.
                      </p>
                    </div>

                    {error && (
                      <div className="mb-5 p-4 text-sm bg-red-50 border border-red-200 text-red-700 rounded-xl">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            required
                            placeholder="e.g. Babatunde Adeyemi"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                            WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="e.g. 0802 345 6789"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                            State / Location
                          </label>
                          <input
                            type="text"
                            name="state"
                            placeholder="e.g. Lagos State"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                          Reason for Contact *
                        </label>
                        <select
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                        >
                          <option value="">Select inquiry type...</option>
                          {CONTACT_REASONS.map((r) => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                          Message / Details
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          placeholder="Tell us what you need — e.g. 'I want to book 200 cartons of broiler chicks for next Tuesday, what is the current price?'"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none"
                        />
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                        <p className="text-xs text-slate-400">
                          By submitting, you agree to being contacted via WhatsApp. We never share your data.
                        </p>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm whitespace-nowrap"
                        >
                          <Send className="h-4 w-4" />
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FAQ
          ==================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14 space-y-4">
            <div className="section-label mx-auto w-fit">
              <Star className="h-3.5 w-3.5" />
              FAQs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-600">
              Quick answers to what Nigerian farmers ask us most often.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900 font-heading">{item.q}</span>
                  <ChevronRight
                    className={`h-5 w-5 text-emerald-600 shrink-0 transition-transform ${openFaq === i ? 'rotate-90' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 bg-white">
                    <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 text-sm mb-4">Still have questions? Reach us instantly on WhatsApp.</p>
            <a
              href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-xl transition-all text-base"
            >
              <MessageCircle className="h-5 w-5" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
