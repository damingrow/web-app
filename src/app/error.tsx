'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime error to monitoring/console
    console.error('App Router Caught Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center py-16 px-4 font-body">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
            Something went wrong
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            An unexpected error occurred while loading this page. Our veterinary desk and technical systems have been alerted.
          </p>
        </div>

        {error?.digest && (
          <div className="rounded-xl bg-slate-50 p-2.5 text-[11px] font-mono text-slate-400 border border-slate-100">
            Error ID: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => reset()}
            className="flex-1 justify-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>

          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              size="md"
              className="w-full justify-center gap-2 border-slate-300 text-slate-700"
            >
              <Home className="h-4 w-4" />
              <span>Homepage</span>
            </Button>
          </Link>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <a
            href="https://wa.me/2348139169402?text=Hello%20D-AminGrow,%20I%20experienced%20a%20technical%20issue%20on%20your%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span>Report Issue via WhatsApp Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
