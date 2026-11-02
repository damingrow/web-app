import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, ArrowLeft, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & NDPA Compliance | D-AminGrow',
  description:
    'Our commitment to data protection under the Nigeria Data Protection Act (NDPA) 2023. Transparent policies for customer enquiries, livestock dispatch records, and WhatsApp data handoff.',
  openGraph: {
    title: 'Privacy Policy & NDPA Compliance | D-AminGrow',
    description:
      'Information on how D-AminGrow collects, protects, and handles livestock customer data in compliance with Nigerian statutes.',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 font-body">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-700 flex items-center">
            <ArrowLeft className="h-3 w-3 mr-1" />
            <span>Storefront</span>
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Privacy Policy</span>
        </div>

        {/* Header Hero */}
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
              <ShieldCheck className="h-4 w-4" />
              <span>NDPA 2023 Compliant</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
              Privacy Policy & Data Protection
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Effective Date: November 2, 2026 • Governing Statute: Nigeria Data Protection Act (NDPA) 2023
            </p>
          </div>
        </div>

        {/* Content Document */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              1. Identity of the Data Controller
            </h2>
            <p>
              D-AminGrow (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates as a registered Nigerian agro-allied enterprise specializing in the supply of day-old chicks, livestock veterinary drugs, biological vaccines, brooding equipment, and veterinary consultation services.
            </p>
            <p>
              As the Data Controller under the <strong>Nigeria Data Protection Act (NDPA) 2023</strong>, we determine the purposes and means of processing personal data collected via our website (<code>damingrow.com</code>), quotation engines, and customer support channels.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              2. Categories of Personal Data Collected
            </h2>
            <p>We collect and process only the minimum data required to facilitate livestock trade and veterinary consultation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Customer Contact Identifiers:</strong> Name, phone number (standard Nigerian format / WhatsApp number), and email address (when submitted via consultation forms).
              </li>
              <li>
                <strong>Logistical & Delivery Details:</strong> Target Nigerian State, Local Government Area (LGA), farm address, or designated interstate motor-park/hub collection point.
              </li>
              <li>
                <strong>Livestock Management Parameters:</strong> Flock size, intended bird breed (broilers, layers, cockerels), brooding dimensions, and clinical inquiry descriptions.
              </li>
              <li>
                <strong>Local Device Storage:</strong> We use browser <code>localStorage</code> solely to preserve your active shopping cart items between sessions. We do not place third-party tracking or advertising cookies.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              3. Lawful Bases for Processing (NDPA Section 25)
            </h2>
            <p>Under the NDPA 2023, every data processing activity carried out by D-AminGrow is grounded in a specific lawful basis:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-1.5">
                <span className="font-bold text-slate-900 text-xs">Contractual Performance</span>
                <p className="text-xs text-slate-600">
                  Processing your delivery location, phone number, and chick allocation to generate quotations, reserve hatchery batches, and organize interstate courier dispatch.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-1.5">
                <span className="font-bold text-slate-900 text-xs">Legal & Regulatory Obligation</span>
                <p className="text-xs text-slate-600">
                  Complying with NAFDAC reporting, veterinary prescription record retention, and FMARD interstate animal transit guidelines.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-1.5">
                <span className="font-bold text-slate-900 text-xs">Legitimate Interests</span>
                <p className="text-xs text-slate-600">
                  Protecting our platform from abusive quotation spam, monitoring system errors, and recording security audit trails for price adjustments.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-1.5">
                <span className="font-bold text-slate-900 text-xs">Freely Given Consent (NDPA §26)</span>
                <p className="text-xs text-slate-600">
                  Active user submission of veterinary advisory requests, farm feasibility inquiries, or subscription to flock vaccination bulletins.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              4. WhatsApp Order Handoff Transparency
            </h2>
            <p>
              When you finalize your cart and click <strong>&quot;Send Order via WhatsApp&quot;</strong> or <strong>&quot;Request Quote on WhatsApp&quot;</strong>, our platform formats an encrypted deep link routing your itemized order, name, and delivery city to our official business WhatsApp desk (<code>+2348139169402</code>).
            </p>
            <p className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900">
              <strong>Notice:</strong> Communication over WhatsApp is subject to WhatsApp&apos;s End-to-End Encryption and Meta Platforms&apos; Privacy Policy. D-AminGrow does not transmit your personal data to unauthorized third-party marketing brokers.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              5. Data Retention & Erasure Schedule
            </h2>
            <p>
              We enforce strict storage limitation principles. Completed order financial records are maintained for the statutory period required by Nigerian tax and commerce laws. Uncompleted quotation inquiries and draft consultation tickets stored in our administrative database are automatically purged after <strong>180 days</strong>.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              6. Your Rights Under the NDPA 2023
            </h2>
            <p>As a Nigerian data subject, you possess enforceable legal rights regarding your personal information:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Right of Access:</strong> Request a confirmation and copy of all personal data D-AminGrow holds concerning your farm.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate phone numbers, names, or delivery addresses.</li>
              <li><strong>Right to Erasure:</strong> Request permanent deletion of your inquiry history, subject to statutory retention obligations.</li>
              <li><strong>Right to Restrict or Object:</strong> Object to processing of your contact details for routine operational updates.</li>
              <li><strong>Right to Lodge a Complaint:</strong> You have the right to lodge a formal complaint with the <em>Nigeria Data Protection Commission (NDPC)</em> at <code>info@ndpc.gov.ng</code> if you believe your data privacy rights have been infringed.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              7. Data Protection Contact & Inquiries
            </h2>
            <p>
              For all data privacy inquiries, access requests, or rectification demands, reach our designated Privacy Officer:
            </p>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs">
              <div className="font-bold text-slate-900">D-AminGrow Data Protection Desk</div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Mail className="h-4 w-4 text-emerald-600" />
                <span>privacy@damingrow.com</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Phone className="h-4 w-4 text-emerald-600" />
                <span>+234 813 916 9402</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
