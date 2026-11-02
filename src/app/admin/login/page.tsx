'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { env } from '@/lib/env';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isPlaceholder = env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (isPlaceholder) {
        // In local development or preview without live Supabase credentials
        router.push('/admin');
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred during login.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Logo */}
        <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-2xl bg-white p-2 shadow-lg mb-4">
          <Image
            src="/Brand identity/damingrow logo.png"
            alt="D-AminGrow Logo"
            fill
            className="object-contain"
            sizes="64px"
          />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
          Staff Back-Office Portal
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Authorized personnel only. Secure role-based administration for D-AminGrow.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-800/20 space-y-6">
          {/* Hydration-safe placeholder alert banner */}
          {mounted && isPlaceholder && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold">
                <AlertCircle className="h-4 w-4 text-amber-700 shrink-0" />
                <span>Development / Preview Mode</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Supabase credentials have not yet been configured in <code>.env.local</code>. Click below to enter the staff back-office in preview mode.
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900 flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                label="Staff Email Address"
                type="email"
                required
                autoComplete="email"
                placeholder="staff@damingrow.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full justify-center shadow-md mt-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : mounted && isPlaceholder ? (
                <span>Enter Preview Staff Portal</span>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </Button>
          </form>

          {/* Security Features Notice */}
          <div className="border-t border-slate-100 pt-5 space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center space-x-2 text-slate-700 font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Protected Corporate Environment</span>
            </div>
            <p className="leading-relaxed">
              All logins, day-old chick price modifications, and customer enquiries are audited. Unauthorized access attempts are logged and flagged under Nigerian cybersecurity statutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
