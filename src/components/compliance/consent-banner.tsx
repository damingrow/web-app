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
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-2xl space-y-4 text-slate-800">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider font-heading">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>NDPA 2023 Data Protection Notice</span>
          </div>

          <button
            type="button"
            onClick={handleEssentialOnly}
            aria-label="Dismiss consent banner"
            className="text-slate-400 hover:text-slate-600 p-1 -mr-1 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          D-AminGrow complies with the <strong>Nigeria Data Protection Act (NDPA) 2023</strong>. We use local device storage to preserve your active cart items and process your contact details solely to generate livestock quotes and arrange delivery. We do not deploy third-party advertising cookies.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleAccept}
              className="text-xs"
            >
              Accept & Continue
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleEssentialOnly}
              className="text-xs"
            >
              Essential Only
            </Button>
          </div>

          <Link
            href="/policies/privacy"
            className="text-[11px] text-slate-500 hover:text-emerald-700 underline text-center sm:text-right"
          >
            Read Privacy Policy →
          </Link>
        </div>
      </div>
    </aside>
  );
}
