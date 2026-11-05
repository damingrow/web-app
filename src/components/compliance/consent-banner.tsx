'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CONSENT_STORAGE_KEY = 'damingrow_ndpa_consent_v1';

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been recorded
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) {
        // Small delay so layout doesn't jump abruptly on first paint
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access restricted or unavailable
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ consent: 'all', timestamp: new Date().toISOString() }));
    } catch {
      // fallback
    }
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ consent: 'essential', timestamp: new Date().toISOString() }));
    } catch {
      // fallback
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      role="region"
      aria-label="Privacy and data protection consent notice"
      className="fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] sm:w-80 max-w-[340px] animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 shadow-xl space-y-2.5 text-slate-800">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5 text-emerald-800 font-extrabold text-[11px] uppercase tracking-wider font-heading">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">NDPA 2023 Data Protection Notice</span>
          </div>

          <button
            type="button"
            onClick={handleEssentialOnly}
            aria-label="Dismiss consent banner"
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-lg transition-colors shrink-0"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <p className="text-[11px] text-slate-600 leading-snug">
          D-AminGrow complies with the <strong>NDPA 2023</strong>. Local storage is used for cart & quotes. No third-party ad tracking.
        </p>

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleAccept}
              className="h-7 px-2.5 text-[11px] font-bold rounded-lg"
            >
              Accept
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleEssentialOnly}
              className="h-7 px-2 text-[11px] font-medium rounded-lg text-slate-600"
            >
              Essential
            </Button>
          </div>

          <Link
            href="/policies/privacy"
            className="text-[10px] text-slate-500 hover:text-emerald-700 underline shrink-0"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </aside>
  );
}
