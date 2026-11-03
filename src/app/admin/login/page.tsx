'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  AlertCircle,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('Sign In to Console');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    setStatusText('Verifying credentials...');

    const cleanEmail = email.trim().toLowerCase();

    try {
      // 1. First attempt: Authenticate via our dedicated server endpoint with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      let serverSuccess = false;
      let serverErrorMsg = '';

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const data = await response.json();

        if (response.ok && data.success) {
          serverSuccess = true;
          setStatusText('Session verified! Redirecting...');
          // Full window redirect guarantees all freshly set cookies are sent with the HTTP request
          window.location.href = data.redirectTo || '/admin';
          return;
        } else {
          serverErrorMsg = data.message || 'Authentication failed. Please check your credentials.';
        }
      } catch (fetchErr: unknown) {
        clearTimeout(timeoutId);
        console.warn('Server auth endpoint unreachable, attempting client-side fallback:', fetchErr);
      }

      // 2. Client-side fallback via @supabase/ssr client if server route was bypassed
      if (!serverSuccess) {
        setStatusText('Checking Supabase Auth...');
        const supabase = createClient();
        const { error: clientError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (clientError) {
          let readable = clientError.message;
          if (readable.toLowerCase().includes('invalid login credentials')) {
            readable =
              'Invalid credentials. Please verify your email and password in your Supabase Auth dashboard (Authentication > Users).';
          } else if (readable.toLowerCase().includes('email not confirmed')) {
            readable =
              'Email unconfirmed. Please click "Confirm User" in your Supabase dashboard or disable email confirmations.';
          }
          setErrorMsg(readable || serverErrorMsg);
          setLoading(false);
          setStatusText('Sign In to Console');
          return;
        }

        setStatusText('Session established! Entering dashboard...');
        window.location.href = '/admin';
      }
    } catch (err: unknown) {
      console.error('Login exception:', err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Unable to reach authentication server. Please check your network connection.'
      );
      setLoading(false);
      setStatusText('Sign In to Console');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-body flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Top Mobile Brand Banner */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="relative h-8 w-8 rounded-lg overflow-hidden bg-white p-1">
            <Image
              src="/Brand identity/damingrow logo.png"
              alt="D-AminGrow Logo"
              fill
              className="object-contain"
              sizes="32px"
            />
          </div>
          <span className="font-heading font-bold text-white text-base">
            D-Amin<span className="text-emerald-400">Grow</span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-slate-400 hover:text-emerald-400 flex items-center space-x-1"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Storefront</span>
        </Link>
      </div>

      <div className="flex-1 grid lg:grid-cols-12">
        {/* Left Panel: Enterprise Brand, Security & Operations Showcase */}
        <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 border-r border-slate-800/80 p-12 flex-col justify-between relative overflow-hidden">
          {/* Subtle Agricultural Ambient Glow */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative h-12 w-12 rounded-2xl overflow-hidden bg-white p-1.5 shadow-xl shadow-emerald-900/30 ring-2 ring-emerald-500/20 group-hover:ring-emerald-400 transition-all">
                  <Image
                    src="/Brand identity/damingrow logo.png"
                    alt="D-AminGrow Logo"
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-xl text-white tracking-tight flex items-center space-x-1.5">
                    <span>D-Amin<span className="text-emerald-400">Grow</span></span>
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                      ENTERPRISE
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Agro-Allied Services Nigeria</p>
                </div>
              </Link>
            </div>

            <div className="space-y-3 pt-6">
              <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Central Operations Console</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white font-heading leading-tight tracking-tight">
                Powering Commercial Poultry & Livestock Operations Across Nigeria.
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Authorized staff access for day-old chick allocation quotas, cold-chain logistics, farmer CRM records, and VCN-accredited veterinary clinical triage.
              </p>
            </div>

            {/* Operational Pillars */}
            <div className="space-y-3.5 pt-4">
              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Hatchery Allocation Engine
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    Real-time quota management for CHI, Amo, Zartech, Agrited, and Sayed Farms with 51-bird box packaging logic.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400 shrink-0 mt-0.5">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Veterinary Clinical Triage
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    Real-time pathology classification (Critical, High, Routine) with automated biosecurity advisories.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <div className="rounded-xl bg-amber-500/10 p-2 text-amber-400 shrink-0 mt-0.5">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Zenith Bank 50% Reconciliations
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    Audit trail for commitment deposits to Account: 1017894562 with 2-hour hold release timers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Compliance Declaration */}
          <div className="relative z-10 border-t border-slate-800/80 pt-6 mt-8 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Zero-Trust Role-Based Access (RBAC)</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                NDPR Compliant
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Backed by over 20 years of combined agricultural leadership and veterinary expertise.
            </p>
          </div>
        </div>

        {/* Right Panel: Interactive Authentication Terminal */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative">
          {/* Top Navigation Links */}
          <div className="w-full max-w-md flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-900/60"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Storefront</span>
            </Link>

            <div className="flex items-center space-x-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[11px] font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SSL 256-Bit Encrypted</span>
            </div>
          </div>

          {/* Login Form Container Card */}
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                Staff Authentication
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Please enter your registered D-AminGrow administrative credentials to continue.
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-950/40 p-4 text-xs text-rose-200 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-start space-x-2.5">
                  <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1 font-medium leading-relaxed">{errorMsg}</div>
                </div>

                {errorMsg.toLowerCase().includes('supabase') || errorMsg.toLowerCase().includes('invalid credentials') ? (
                  <div className="pt-2 border-t border-rose-500/20 text-[11px] text-rose-300/80 space-y-1">
                    <p className="font-semibold text-rose-200">💡 Quick Troubleshooting Tip:</p>
                    <p>
                      Ensure this account is added in your Supabase project under{' '}
                      <span className="text-white font-mono bg-rose-900/60 px-1 py-0.5 rounded">
                        Authentication &gt; Users
                      </span>{' '}
                      with <span className="text-white font-semibold">Auto Confirm Email</span> toggled on.
                    </p>
                  </div>
                ) : null}
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleLogin} method="POST" action="/api/auth/login" className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Staff Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="admin@damingrow.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-700 bg-slate-900/90 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowHelpModal(true)}
                    className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Need assistance?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-11 py-3 text-sm rounded-xl border border-slate-700 bg-slate-900/90 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Workstation Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-slate-950"
                  />
                  <span className="text-xs text-slate-400 select-none">
                    Remember this workstation for 30 days
                  </span>
                </label>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 active:scale-[0.99] shadow-lg shadow-emerald-900/30 transition-all duration-150 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>{statusText}</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 text-emerald-200" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
            </form>

            {/* Legal / Security Footer */}
            <div className="pt-6 border-t border-slate-800/80 space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-slate-400 text-xs font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Protected Corporate Operations Environment</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                All logins, day-old chick price modifications, and customer enquiries are audited. Unauthorized access attempts are logged and flagged under Nigerian cybersecurity statutes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Access Assistance Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white font-heading">
                  Staff Login Assistance
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-white text-sm p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <p className="font-bold text-emerald-400 text-sm">How to Set Up Your Staff User:</p>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
                  <li>
                    Open your <strong className="text-white">Supabase Dashboard</strong>.
                  </li>
                  <li>
                    Navigate to <strong className="text-white">Authentication &gt; Users</strong>.
                  </li>
                  <li>
                    Click <strong className="text-white">&quot;Add User&quot; &gt; &quot;Create User&quot;</strong>.
                  </li>
                  <li>
                    Enter your email (<code className="text-emerald-300">damingrow@gmail.com</code>) and set a secure password.
                  </li>
                  <li>
                    Ensure <strong className="text-white">&quot;Auto Confirm User&quot;</strong> is checked.
                  </li>
                </ol>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-300 font-semibold">
                  <Phone className="h-4 w-4" />
                  <span>Immediate IT & Operations Desk</span>
                </div>
                <p className="text-slate-400">
                  For password resets or role assignments, message the central administration hotline directly on WhatsApp:
                </p>
                <a
                  href="https://wa.me/2348139169402?text=Hello%20IT%20Desk,%20I%20need%20assistance%20logging%20into%20the%20D-AminGrow%20Staff%20Console."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 font-bold text-emerald-400 hover:text-emerald-300 underline"
                >
                  <span>Chat with +234 813 916 9402</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
            >
              Close Assistance Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
