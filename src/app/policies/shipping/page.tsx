import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Truck, ArrowLeft, Thermometer, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Cold-Chain Delivery Policy | D-AminGrow Nigeria',
  description:
    'Detailed logistics protocol for day-old chick dispatch, cold-chain poultry vaccine transport (2°C–8°C), and farm equipment delivery across all Nigerian states.',
  openGraph: {
    title: 'Shipping & Cold-Chain Delivery Policy | D-AminGrow',
    description:
      'Official delivery guidelines, cold-chain temperature preservation, and state collection hub protocols for livestock supplies.',
    type: 'website',
  },
};

export default function ShippingPolicyPage() {
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
          <span className="text-slate-800 font-semibold">Shipping Policy</span>
        </div>

        {/* Header Hero */}
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-400/30">
              <Truck className="h-4 w-4" />
              <span>Nationwide Livestock Logistics</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
              Shipping & Cold-Chain Delivery Protocol
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nationwide delivery guidelines for day-old chicks, biological vaccines, and farm hardware across Nigeria.
            </p>
          </div>
        </div>

        {/* Content Document */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1 - Logistics Model */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              1. Specialized Multi-Tier Agricultural Logistics
            </h2>
            <p>
              Livestock inputs demand different handling requirements compared to standard consumer goods. D-AminGrow operates a specialized three-tier fulfillment system designed to preserve biological viability and prevent transport stress:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 space-y-1.5">
                <span className="font-bold text-emerald-950 text-xs">Live Day-Old Chicks</span>
                <p className="text-xs text-slate-600">
                  Direct express transport from certified primary hatcheries via specialized ventilated buses to state capital collection depots within 24–36 hours of hatching.
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50/50 p-4 space-y-1.5">
                <span className="font-bold text-cyan-950 text-xs">Biological Vaccines</span>
                <p className="text-xs text-slate-600">
                  Continuous <strong>2°C to 8°C</strong> cold-chain insulation in thick Styrofoam coolers with frozen gel coolants, dispatched strictly on scheduled days.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-1.5">
                <span className="font-bold text-slate-950 text-xs">Farm Equipment</span>
                <p className="text-xs text-slate-600">
                  Commercial interstate heavy freight for brooders, cages, defeathering machines, feeders, and egg crates to major interstate transit terminals.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 - Cold Chain Vaccine Protocol */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>2. Mandatory Vaccine Cold-Chain Protocol (2°C – 8°C)</span>
              <Thermometer className="h-5 w-5 text-cyan-600" />
            </h2>
            <div className="rounded-2xl border border-cyan-200 bg-cyan-50/60 p-4 space-y-2 text-xs text-cyan-950">
              <p className="font-bold">
                Why Temperature Integrity Cannot Be Compromised:
              </p>
              <p className="leading-relaxed text-slate-700">
                Live attenuated freeze-dried vaccines (e.g. Newcastle LaSota, Gumboro IBD) are sensitive biological viruses. Any exposure to ambient tropical temperatures above 8°C deactivates the viral particles, rendering the vaccine useless and exposing the flock to lethal field challenge.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 pt-1">
                <li>
                  <strong>Insulated Packaging:</strong> All vaccine shipments are sealed inside thermal expanded polystyrene (EPS) insulated coolers packed with frozen phase-change gel ice packs.
                </li>
                <li>
                  <strong>Scheduled Dispatch Windows:</strong> Vaccine orders are dispatched strictly on <strong>Mondays, Tuesdays, and Wednesdays</strong>. This eliminates the risk of courier depot stagnation over the weekend.
                </li>
                <li>
                  <strong>Mandatory Customer Standby:</strong> The purchasing farmer must be on standby at the collection terminal to receive the package immediately upon the bus or driver&apos;s arrival, and transfer vials into a farm refrigerator (2°C–8°C) without delay.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 - Day-Old Chicks Delivery Hubs */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              3. Day-Old Chick Dispatch Schedule & Interstate Hubs
            </h2>
            <p>
              Day-old chicks are hatched and dispatched on fixed weekly days: <strong>Tuesdays and Thursdays</strong>. Shipments arrive at designated major collection depots across the country:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-1">
                <span className="font-bold text-slate-900 flex items-center">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 mr-1" />
                  South-West & Central Corridor
                </span>
                <p className="text-slate-600">Lagos (Ojota, Berger, Ikorodu), Ibadan, Abeokuta, Osogbo, Akure, Ado-Ekiti.</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-1">
                <span className="font-bold text-slate-900 flex items-center">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 mr-1" />
                  North-Central & FCT Corridor
                </span>
                <p className="text-slate-600">Abuja (Utako, Mararaba), Ilorin, Minna, Jos, Makurdi, Lafia, Lokoja.</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-1">
                <span className="font-bold text-slate-900 flex items-center">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 mr-1" />
                  North-West Corridor
                </span>
                <p className="text-slate-600">Kano, Kaduna, Katsina, Sokoto, Zaria, Gusau.</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-1">
                <span className="font-bold text-slate-900 flex items-center">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 mr-1" />
                  South-East & South-South Corridor
                </span>
                <p className="text-slate-600">Port Harcourt, Benin City, Enugu, Asaba, Owerri, Warri, Calabar, Uyo.</p>
              </div>
            </div>
          </section>

          {/* Section 4 - Transport Fees */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              4. Interstate Transport Fares & Waybill Charges
            </h2>
            <p>
              Product prices listed on the storefront are ex-depot/hatchery rates and do not include interstate road waybill charges. Transport fees vary depending on the destination state, volume of cartons, and current motor-park union tariffs:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Our sales desk provides an exact transport quote upon reviewing your order city and carton quantity.</li>
              <li>Depending on the route, waybill fares can either be paid alongside your product invoice or settled directly with the transport driver at the collection park.</li>
            </ul>
          </section>

          {/* Section 5 - ECOWAS Regional Notice */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading border-b border-slate-100 pb-2">
              5. Regional & ECOWAS Cross-Border Shipments
            </h2>
            <p>
              Our online shopping cart and automated booking engine are calibrated for domestic delivery within Nigeria. For commercial agricultural orders bound for Ghana, Benin, Cameroon, Togo, or other ECOWAS nations:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Live bird and pharmaceutical export requires mandatory <strong>FMARD Veterinary International Health Certificates</strong> and import approval from the destination country&apos;s Ministry of Agriculture.</li>
              <li>Please contact our international desk directly via our <Link href="/services" className="text-emerald-700 font-semibold hover:underline">Consultation Desk</Link> to initiate cross-border documentation and air cargo logistics.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
