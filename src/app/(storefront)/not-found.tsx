import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Package,
  BookOpen,
  Egg,
  MessageCircle,
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] relative hero-mesh bg-[#050E08] text-white flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full text-center space-y-8">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 section-label-dark mx-auto">
          <Compass className="h-4 w-4 text-emerald-400" />
          <span>Error 404 — Page Not Found</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-heading leading-tight">
            Looking for Livestock Supplies or <br />
            <span className="text-gradient-green">Technical Services?</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            The link you followed may have moved or expired. Choose a department below to explore verified livestock products, certified day-old chicks, or technical consultation desks.
          </p>
        </div>

        {/* Quick Nav Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left pt-2">
          <Link
            href="/chicks"
            className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/50 transition-all space-y-2 backdrop-blur-sm"
          >
            <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors font-heading">
              Day-Old Chicks
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Commercial broilers, pullets & turkeys from certified hatcheries.
            </p>
          </Link>

          <Link
            href="/point-of-lay"
            className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/50 transition-all space-y-2 backdrop-blur-sm"
          >
            <div className="h-10 w-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Egg className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors font-heading">
              Point-of-Lay Birds
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              17–20 week fully vaccinated pullets ready to start laying eggs.
            </p>
          </Link>

          <Link
            href="/drugs"
            className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/50 transition-all space-y-2 backdrop-blur-sm"
          >
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors font-heading">
              Veterinary Drugs
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              NAFDAC-registered antibiotics, vitamins, and antiprotozoals.
            </p>
          </Link>

          <Link
            href="/knowledge"
            className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/50 transition-all space-y-2 backdrop-blur-sm"
          >
            <div className="h-10 w-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors font-heading">
              Knowledge Hub
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vaccination timetables, brooding guides, and disease manuals.
            </p>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="lg" className="w-full sm:w-auto py-4 px-8 rounded-2xl font-bold">
              Return to Homepage
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>

          <a
            href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20could%20not%20find%20a%20specific%20product%20on%20your%20website.%20Can%20you%20help?"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-md text-sm w-full sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Ask Us on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
