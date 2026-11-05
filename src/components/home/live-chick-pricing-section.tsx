'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  MessageCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { ChickRateItem, BASELINE_CHICK_RATES, formatPriceItem } from '@/lib/chicks/pricing-store';

interface LiveChickPricingSectionProps {
  initialRates?: ChickRateItem[];
}

export function LiveChickPricingSection({ initialRates = BASELINE_CHICK_RATES }: LiveChickPricingSectionProps) {
  const [rates, setRates] = useState<ChickRateItem[]>(initialRates);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Live Synchronized');

  // Fetch latest rates from public API
  const fetchLiveRates = useCallback(async (showIndicator = false) => {
    if (showIndicator) setIsRefreshing(true);
    try {
      // 1. Check local storage first for zero-latency same-browser updates
      if (typeof window !== 'undefined') {
        const localCached = localStorage.getItem('damingrow_chick_rates');
        if (localCached) {
          try {
            const parsed = JSON.parse(localCached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const formatted = BASELINE_CHICK_RATES.map((base) => {
                const match = parsed.find(
                  (r: { id?: string; breed?: string; priceNgn?: number; status?: string }) =>
                    r.id === base.id || r.breed?.toLowerCase() === base.breed.toLowerCase()
                );
                if (match && typeof match.priceNgn === 'number') {
                  return formatPriceItem({
                    ...base,
                    priceNgn: match.priceNgn,
                    currentPriceNgn: match.priceNgn,
                    status: (match.status as ChickRateItem['status']) || base.status,
                  });
                }
                return base;
              });
              setRates(formatted);
            }
          } catch {
            // non-blocking
          }
        }
      }

      // 2. Query the live API endpoint without caching
      const res = await fetch('/api/chicks/pricing?t=' + Date.now(), {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.rates) && data.rates.length > 0) {
          setRates(data.rates);
          setLastUpdated('Updated ' + new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (err) {
      console.warn('Live rate synchronization warning:', err);
    } finally {
      if (showIndicator) {
        setTimeout(() => setIsRefreshing(false), 400);
      }
    }
  }, []);

  useEffect(() => {
    // Initial fetch on mount
    fetchLiveRates(false);

    // Listen to cross-tab or in-page admin price update events
    const handleStorageUpdate = () => {
      fetchLiveRates(true);
    };

    window.addEventListener('damingrow_chick_rates_updated', handleStorageUpdate);
    window.addEventListener('storage', (e) => {
      if (e.key === 'damingrow_chick_rates') {
        handleStorageUpdate();
      }
    });

    // Auto-poll every 25 seconds and on tab focus
    const interval = setInterval(() => fetchLiveRates(false), 25000);
    const handleFocus = () => fetchLiveRates(false);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('damingrow_chick_rates_updated', handleStorageUpdate);
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [fetchLiveRates]);

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="section-label w-fit">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Live Allotment Pricing
            </div>
            <button
              onClick={() => fetchLiveRates(true)}
              title="Refresh live rates from admin desk"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-2.5 py-1 rounded-full border border-slate-200 transition-colors"
            >
              <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
              <span>{lastUpdated}</span>
            </button>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Current Day-Old Chick & Poult Rates
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Clear pricing per bird and per carton. Nationwide collection points and direct farm-gate delivery available every <strong>Monday & Thursday</strong>.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rates.map((item) => {
            const isSoldOut = item.status === 'sold_out';
            const isLimited = item.status === 'limited_allocation';

            const whatsappMessage = isSoldOut
              ? `Hello D-AminGrow, I noticed ${item.breed} is sold out. Please add me to the priority waitlist for the next Monday/Thursday dispatch.`
              : `Hello D-AminGrow, I want to book ${item.breed} at today's rate (${item.rateFormatted} ${item.unitLabel}, ${item.cartonTotalFormatted} per carton) for the upcoming dispatch.`;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between transition-all hover:shadow-md ${
                  isSoldOut
                    ? 'border-red-200 bg-red-50/30 opacity-90'
                    : isLimited
                    ? 'border-amber-300 bg-amber-50/40'
                    : item.accent
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                        isSoldOut
                          ? 'bg-red-100 text-red-700 border-red-200'
                          : isLimited
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-white text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {isSoldOut ? 'Sold Out' : isLimited ? 'Limited Quota' : item.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{item.cartonQtyLabel}</span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-slate-900 mb-1">{item.breed}</h3>

                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-2xl font-extrabold text-slate-900 font-heading">
                      {item.rateFormatted}
                    </span>
                    <span className="text-xs text-slate-500">{item.unitLabel}</span>
                  </div>

                  <div className="text-xs text-slate-600 mb-4 bg-white/80 rounded-lg p-2 border border-slate-200/80 flex items-center justify-between">
                    <span>Carton Total:</span>
                    <strong className="text-slate-900 text-sm font-heading">{item.cartonTotalFormatted}</strong>
                  </div>
                </div>

                <a
                  href={`https://wa.me/2348139169402?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center font-semibold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm ${
                    isSoldOut
                      ? 'bg-slate-700 hover:bg-slate-800 text-white'
                      : 'bg-slate-900 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  {isSoldOut ? 'Join Waitlist on WhatsApp' : 'Book This Breed'}
                </a>
              </div>
            );
          })}
        </div>

        {/* Live Admin Connection Banner */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-amber-900">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-700 shrink-0" />
            <span>
              <strong>Dispatch Notice:</strong> Orders close Sunday 2:00 PM (for Monday) and Wednesday 2:00 PM (for Thursday). Rates synchronize live from the admin command desk.
            </span>
          </div>
          <Link
            href="/chicks"
            className="font-bold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1 shrink-0"
          >
            View Full Booking Calendar <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
