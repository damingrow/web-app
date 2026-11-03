'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin Dashboard Caught Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] bg-slate-100 flex items-center justify-center p-6 font-body">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-lg text-center space-y-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Admin Module Encountered an Error
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            A temporary issue occurred while communicating with database services or rendering this administrative view.
          </p>
        </div>

        {error?.digest && (
          <div className="rounded-xl bg-slate-50 p-2 text-[10px] font-mono text-slate-400 border border-slate-200">
            Digest ID: {error.digest}
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

          <Link href="/admin" className="flex-1">
            <Button
              variant="outline"
              size="md"
              className="w-full justify-center gap-2 border-slate-300 text-slate-700"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
