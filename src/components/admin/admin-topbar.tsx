'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Command,
  Bell,
  CalendarCheck,
  Package,
  Users,
  Inbox,
  ArrowRight,
  TrendingUp,
  X,
  Menu,
  ChevronDown,
  Plus,
  Shield,
  Settings,
  LogOut,
  ArrowUpRight,
  ExternalLink,
  Send,
} from 'lucide-react';

interface AdminTopbarProps {
  onToggleSidebar?: () => void;
}

export function AdminTopbar({ onToggleSidebar }: AdminTopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isEnquiriesPage = pathname?.startsWith('/admin/enquiries');
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('2:31:23 PM');
  const [currentDate, setCurrentDate] = useState('SAT, MAY 17');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Africa/Lagos',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          timeZone: 'Africa/Lagos',
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }).toUpperCase()
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Click-outside listener for popups
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const COMMAND_ITEMS = [
    { name: '01. Executive Overview & Operations', href: '/admin', icon: TrendingUp, category: 'Navigation' },
    { name: '02. Chick Bookings & Quotas', href: '/admin/bookings', icon: CalendarCheck, category: 'Revenue Desk' },
    { name: '03. Enquiries & WhatsApp Inbox', href: '/admin/enquiries', icon: Inbox, category: 'Revenue Desk' },
    { name: '04. Farmer CRM & Lifetime Accounts', href: '/admin/crm', icon: Users, category: 'Customer Base' },
    { name: '05. Products Catalog & NAFDAC Gate', href: '/admin/products', icon: Package, category: 'Commerce' },
    { name: '06. Live Chick Market Rates Sync', href: '/admin/chicks-pricing', icon: TrendingUp, category: 'Commerce' },
    { name: '07. 6-Pillar Editorial & Traffic Hub', href: '/admin/content', icon: Package, category: 'Growth & SEO' },
    { name: '08. Marketing & Lead Attribution', href: '/admin/marketing', icon: Package, category: 'Growth & SEO' },
    { name: '09. Executive Reports & Financials', href: '/admin/reports', icon: TrendingUp, category: 'Analytics' },
  ];

  const filteredCommands = COMMAND_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* ======================================================
          EXECUTIVE TOPBAR — Luxury, World-Standard Cockpit
          ====================================================== */}
      <header className="sticky top-0 z-30 flex h-[66px] w-full items-center justify-between bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 shadow-xs transition-all">

        {/* LEFT: Mobile toggle & Global Command Palette Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search Trigger Pill */}
          <button
            onClick={() => setCommandOpen(true)}
            className="group flex items-center justify-between rounded-2xl border border-slate-200/90 bg-slate-50/70 hover:bg-white hover:border-emerald-500/50 px-3.5 py-2 text-xs text-slate-500 hover:text-slate-800 transition-all duration-200 shadow-2xs hover:shadow-xs w-64 sm:w-80 lg:w-96"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Search className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
              <span className="truncate text-[12px] font-medium text-slate-400 group-hover:text-slate-600">
                {isEnquiriesPage ? 'Search enquiries, customers, or order details...' : 'Search farmers, bookings, hatcheries...'}
              </span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-500 group-hover:border-slate-300 shadow-2xs shrink-0">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* CENTER: WAT Regional Clock */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-full border border-slate-200/90 bg-gradient-to-r from-slate-50 via-white to-emerald-50/40 px-4 py-1.5 shadow-2xs">
            {/* WAT Time & Date Display */}
            <div className="flex items-center gap-2 text-xs">
              <span className="relative flex h-2 w-2 mr-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00a854]" />
              </span>
              <span className="font-mono font-extrabold text-slate-900 text-[13px] tracking-tight">
                {currentTime}
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md font-mono">
                WAT
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                · {currentDate}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Quick Action + Notifications + Executive Staff Avatar */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Action: New Enquiry on Enquiries page or New Booking */}
          {isEnquiriesPage ? (
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-new-enquiry'));
                }
              }}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#00a854] hover:bg-[#009249] text-white font-bold text-xs px-4 py-2 shadow-xs transition-all duration-200 hover:shadow-md"
            >
              <Send className="h-3.5 w-3.5" />
              <span>New Enquiry</span>
            </button>
          ) : (
            <Link
              href="/admin/bookings"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs px-4 py-2 shadow-xs transition-all duration-200 hover:shadow-md"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>New Booking</span>
            </Link>
          )}

          {/* Notification Center */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setNotificationsOpen((p) => !p);
                setProfileOpen(false);
              }}
              className="relative rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 p-2 text-slate-600 hover:text-slate-900 transition-all shadow-2xs"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-extrabold text-white ring-2 ring-white">
                3
              </span>
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2.5 w-84 sm:w-96 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl z-50 text-xs space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm font-heading">
                      Operational Alerts
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      3 unread
                    </span>
                  </div>
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="text-[11px] font-semibold text-slate-400 hover:text-slate-600"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {[
                    {
                      title: 'Chi Hatchery Quota Alert',
                      time: '12m ago',
                      body: 'Tuesday broiler allocation at 84% capacity. Only 160 cartons unreserved.',
                      color: 'text-slate-900',
                      bg: 'bg-amber-50/60 border-amber-200/70',
                      tag: 'Hatchery Capacity',
                    },
                    {
                      title: 'Deposit Received · Zenith Bank',
                      time: '45m ago',
                      body: 'Zenith Bank Acct 1017894562: ₦480,000 verified for Ref POL-DEMO01 (Afolabi Layers).',
                      color: 'text-emerald-900',
                      bg: 'bg-emerald-50/60 border-emerald-200/70',
                      tag: 'Auto-Cleared',
                    },
                    {
                      title: 'Cold Chain Transit Monitor',
                      time: '2h ago',
                      body: 'Ibadan Central Vaccine Depot: +4.2°C (Optimal safe window 2°C–8°C). All waybills in range.',
                      color: 'text-slate-800',
                      bg: 'bg-slate-50 border-slate-200/70',
                      tag: 'Cold Chain Safe',
                    },
                  ].map((n) => (
                    <div
                      key={n.title}
                      className={`rounded-2xl border p-3 space-y-1 transition-colors hover:shadow-2xs ${n.bg}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${n.color} text-xs`}>{n.title}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{n.body}</p>
                      <div className="pt-0.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-white/80 border border-slate-200 px-1.5 py-0.5 rounded">
                          {n.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-[11px]">
                  <Link
                    href="/admin/bookings"
                    onClick={() => setNotificationsOpen(false)}
                    className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>View all dispatches</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  <span className="text-slate-400 text-[10px]">Real-time Event Stream</span>
                </div>
              </div>
            )}
          </div>

          {/* Executive Staff Profile Trigger */}
          <div className="relative pl-1 sm:pl-2 border-l border-slate-200/90" ref={profileRef}>
            <button
              onClick={() => {
                setProfileOpen((p) => !p);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2.5 rounded-2xl p-1.5 sm:px-2 sm:py-1 hover:bg-slate-50 transition-colors group"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#063b1e] via-[#094d28] to-[#042413] font-extrabold text-white text-xs shadow-xs group-hover:shadow-sm shrink-0 border border-emerald-500/30">
                AD
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#00a854] ring-2 ring-white" />
              </div>
              <div className="hidden xl:block text-left leading-tight">
                <div className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-950 transition-colors">
                  Admin Operations
                </div>
                <div className="text-[10px] font-semibold text-slate-400 flex items-center gap-0.5">
                  <span>Super Admin</span>
                  <ChevronDown className="h-2.5 w-2.5 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
                </div>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2.5 w-64 rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl z-50 text-xs space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
                {/* User Info Header */}
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-600 shrink-0" />
                    <div className="font-extrabold text-slate-900 text-xs">
                      Super Admin Clearance
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    admin@damingrow.com
                  </div>
                  <div className="text-[10px] font-mono text-emerald-800 bg-emerald-100/70 rounded px-1.5 py-0.5 inline-block mt-1 font-bold">
                    Role: Level 3 Executive
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="space-y-0.5 pt-1">
                  <Link
                    href="/admin/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors font-medium"
                  >
                    <Settings className="h-4 w-4 text-slate-400" />
                    <span>Platform Settings</span>
                  </Link>
                  <Link
                    href="/"
                    target="_blank"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors font-medium"
                  >
                    <div className="flex items-center gap-2.5">
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                      <span>View Storefront</span>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                  </Link>
                </div>

                {/* Sign Out / Switch User */}
                <div className="border-t border-slate-100 pt-1">
                  <Link
                    href="/admin/login"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-semibold"
                  >
                    <LogOut className="h-4 w-4 text-rose-500" />
                    <span>Switch User / Log Out</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =============================================
          GLOBAL COMMAND PALETTE MODAL (⌘K)
          ============================================= */}
      {commandOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setCommandOpen(false)}
        >
          <div
            className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center border-b border-slate-100 px-4 py-3.5 gap-3">
              <Search className="h-4 w-4 text-emerald-600 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Type a module name, farmer phone, or action..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
              />
              <button
                onClick={() => setCommandOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close Command Palette"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-3 space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Operations &amp; Admin Modules
              </div>
              {filteredCommands.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No matching module or command found.
                </div>
              ) : (
                filteredCommands.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => {
                        setCommandOpen(false);
                        router.push(item.href);
                      }}
                      className="w-full flex items-center justify-between rounded-2xl px-3 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-950 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-emerald-900">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-slate-400">{item.category}</div>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span>
                  Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">ESC</kbd> to exit
                </span>
                <span>
                  Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">↵</kbd> to select
                </span>
              </div>
              <span className="font-bold text-emerald-700">D-AminGrow Command Hub</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
