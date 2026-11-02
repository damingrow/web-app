import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { FileText, ArrowLeft, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service & Livestock Supply Agreement | D-AminGrow',
  description:
    'Commercial terms governing day-old chicks booking, live transit mortality protocols, veterinary drug stewardship, and farm equipment purchases with D-AminGrow Nigeria.',
  openGraph: {
    title: 'Terms of Service | D-AminGrow Nigeria',
    description:
      'Official commercial terms, booking deadlines, transit mortality claims, and veterinary compliance standards.',
    type: 'website',
  },
};

export default function TermsOfServicePage() {
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
          <span className="text-slate-800 font-semibold">Terms of Service</span>
        </div>

        {/* Header Hero */}
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
              <FileText className="h-4 w-4" />
              <span>Commercial Terms & Conditions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
              Terms of Service & Livestock Supply Agreement
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Effective Date: November 2, 2026 • Brand Promise: Your Satisfaction Is Our Priority
            </p>
          </div>
        </div>

        {/* Content Document */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              1. Commercial Relationship & Scope
            </h2>
            <p>
              These Terms of Service govern all quotations, orders, bookings, and technical advisory transactions between D-AminGrow (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;) and the customer (&quot;Buyer&quot;, &quot;Farmer&quot;). By requesting a quotation, booking day-old chicks, or ordering veterinary supplies via our website or official WhatsApp channel (<code>+2348139169402</code>), you agree to be bound by these terms.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              2. Day-Old Chicks (DOC) Booking & Allocation Policy
            </h2>
            <div className="space-y-2.5">
              <p>
                <strong>Weekly Price Volatility:</strong> Day-old chick prices in Nigeria reflect dynamic market movements based on breeder parent-stock production, grain costs, and hatchery allocations. Published prices on our website update weekly. The price applicable to your order is the confirmed rate at the time your deposit is verified by our sales desk.
              </p>
              <p>
                <strong>Booking & Payment Cycles:</strong> Chick allocations are strictly reserved on a first-paid, first-secured basis:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li><strong>Tuesday Dispatch:</strong> Orders and payment confirmations must be finalized by 12:00 PM Monday.</li>
                <li><strong>Thursday Dispatch:</strong> Orders and payment confirmations must be finalized by 12:00 PM Wednesday.</li>
              </ul>
              <p>
                <strong>Hatchery Extra Birds Allowance:</strong> Certified primary hatcheries (Amo, Zartech, Chi, etc.) pack <strong>50 + 1 or 50 + 2 chicks</strong> per carton to cover statistical transit stress. These additional birds constitute the agreed transit mortality buffer.
              </p>
            </div>
          </section>

          {/* Section 3 - Claims Protocol */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              3. Live Transit Mortality & Inspection Claims
            </h2>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 space-y-2 text-xs text-amber-950">
              <div className="flex items-center space-x-2 font-bold">
                <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
                <span>Strict 2-Hour Claims Notification Window:</span>
              </div>
              <p className="leading-relaxed">
                Because day-old chicks are vulnerable live animals whose health rapidly deteriorates if left unattended in motor parks or unventilated vehicles, all claims for mortality exceeding the standard hatchery buffer must strictly adhere to the following protocol:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                <li>Inspect all chick cartons immediately upon receiving them from the transport driver or collection depot.</li>
                <li>Report any excess mortality to our WhatsApp support line within <strong>two (2) hours of arrival</strong>.</li>
                <li>Provide clear, unedited video footage and photographs showing: (a) the original intact hatchery carton label and security seal, and (b) all dead birds arranged side-by-side for verified counting.</li>
              </ol>
              <p className="text-[11px] text-slate-500 italic">
                Claims submitted after the 2-hour collection window or after chicks have been transferred into the brooder pen cannot be verified against transit causes and are ineligible for hatchery credit.
              </p>
            </div>
          </section>

          {/* Section 4 - Veterinary Drugs & AMR */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              4. Veterinary Medicines & Antimicrobial Stewardship (AMR)
            </h2>
            <p>
              D-AminGrow strictly complies with <strong>NAFDAC</strong> directives, the <strong>Veterinary Council of Nigeria (VCN)</strong> guidelines, and the <strong>National Action Plan on Antimicrobial Resistance</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>No Clinical Veterinary Relationship:</strong> Product descriptions, dosages, and knowledge articles published on this platform are for technical reference only. They do not constitute an official veterinary diagnosis or a client-patient relationship.
              </li>
              <li>
                <strong>Zero Growth Promoter Policy:</strong> Under no circumstances should antibacterial medications (e.g. Oxytetracycline, Norfloxacin, Ciprofloxacin) be utilized as animal growth promoters (AGPs). Antibiotics must only be administered for diagnosed bacterial disease challenges under veterinary guidance.
              </li>
              <li>
                <strong>Mandatory Withdrawal Compliance:</strong> Farmers are legally and ethically obligated to observe the published <strong>Meat Withdrawal Period</strong> and <strong>Egg Withdrawal Period</strong> before sending birds or eggs into the human food supply chain.
              </li>
            </ul>
          </section>

          {/* Section 5 - Return Policy */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              5. Returns, Cancellations & Non-Returnable Goods
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4 space-y-1.5">
                <span className="font-bold text-rose-900 text-xs">Strictly Non-Returnable</span>
                <p className="text-xs text-slate-600">
                  <strong>Day-Old Chicks & Vaccines:</strong> Due to extreme biosecurity regulations and cold-chain integrity, live birds and biological vaccines are strictly non-returnable once they leave the hatchery or cold-storage depot.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 space-y-1.5">
                <span className="font-bold text-emerald-900 text-xs">Eligible for Exchange</span>
                <p className="text-xs text-slate-600">
                  <strong>Equipment & Hardware:</strong> Brooder heaters, feeders, drinkers, defeathering machines, and cages may be returned or replaced within <strong>48 hours</strong> of receipt if verified to have factory defects or transit damage.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 - Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              6. Limitation of Liability & Force Majeure
            </h2>
            <p>
              D-AminGrow shall not be held liable for delayed delivery or mortality resulting from acts of Force Majeure, including but not limited to: interstate highway blockages, civil unrest, severe weather extremes, or commercial transport carrier mechanical breakdowns beyond our reasonable operational control. In any event, our maximum aggregate liability shall not exceed the invoice purchase price of the affected products.
            </p>
          </section>

          {/* Section 7 - Governing Law */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              7. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the Laws of the Federal Republic of Nigeria. Any commercial disputes that cannot be settled amicably through good-faith negotiation shall be submitted to the exclusive jurisdiction of the competent courts of Nigeria.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
