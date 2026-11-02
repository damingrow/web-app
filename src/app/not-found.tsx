import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Phone,
  Package,
  BookOpen,
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Status Badge & Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-700 mb-2 border border-emerald-100 shadow-sm">
          <Compass className="h-10 w-10 animate-spin-slow" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Error 404 — Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-heading">
            Looking for Livestock Supplies?
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            The link you followed may have moved or expired. Explore our verified poultry supplies, certified day-old chicks, or technical consultation desks below.
          </p>
        </div>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <Link
            href="/chicks"
            className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all space-y-2"
          >
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Package className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
              Day-Old Chicks
            </h3>
            <p className="text-xs text-slate-500">
              Commercial broilers, pullets & cockerels from certified primary hatcheries.
            </p>
          </Link>

          <Link
            href="/drugs"
            className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all space-y-2"
          >
            <div className="h-9 w-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">
              Veterinary Drugs
            </h3>
            <p className="text-xs text-slate-500">
              NAFDAC-registered antibiotics, vitamins, and antiprotozoals.
            </p>
          </Link>

          <Link
            href="/knowledge"
            className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all space-y-2"
          >
            <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors">
              Knowledge Hub
            </h3>
            <p className="text-xs text-slate-500">
              Vaccination timetables, brooding guides, and disease prevention manuals.
            </p>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Return to Homepage
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>

          <a
            href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20could%20not%20find%20a%20specific%20product%20on%20your%20website.%20Can%20you%20help?"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
              <Phone className="h-4 w-4 mr-2" />
              Ask on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
