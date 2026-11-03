'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Command,
  Bell,
  MessageCircle,
  CalendarCheck,
  Package,
  Users,
  Inbox,
  ArrowRight,
  TrendingUp,
  X,
  Menu,
} from 'lucide-react';

interface AdminTopbarProps {
  onToggleSidebar?: () => void;
}

export function AdminTopbar({ onToggleSidebar }: AdminTopbarProps) {
  const router = useRouter();
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' WAT'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcut listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandOpen(false);
        setNotificationsOpen(false);
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
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 sm:px-6 backdrop-blur-xl transition-all shadow-xs">
        {/* Left: Mobile Toggle & Global Search Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Command Palette Trigger Pill */}
          <button
            onClick={() => setCommandOpen(true)}
            className="group flex items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-slate-50/70 hover:bg-white hover:border-emerald-500/50 px-3.5 py-1.5 text-xs text-slate-500 hover:text-slate-900 transition-all shadow-2xs hover:shadow-sm"
          >
            <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            <span className="hidden sm:inline font-medium">Quick Command or Farmer Lookup...</span>
            <span className="sm:hidden font-medium">Search...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-lg border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-500 shadow-2xs">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* Center: Live System Status & Regional Clock */}
        <div className="hidden lg:flex items-center gap-3 text-xs">
          {/* Edge Health Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/70 px-3 py-1 text-[11px] font-semibold text-emerald-800 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span>Cloudflare Edge: Active</span>
            <span className="text-emerald-400">·</span>
            <span>Supabase RLS: Armed</span>
          </div>

          {/* Real-time WAT Clock */}
          {currentTime && (
            <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-mono font-semibold text-slate-600 shadow-2xs">
              {currentTime}
            </div>
          )}
        </div>

        {/* Right: Actions, Notifications & Account Badge */}
        <div className="flex items-center gap-2.5">
          {/* WhatsApp Direct Hotline */}
          <a
            href="https://wa.me/2348139169402"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-2xs"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span>WhatsApp Desk</span>
          </a>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen((prev) => !prev)}
              className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white ring-2 ring-white">
                3
              </span>
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl z-50 text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900 font-heading">Operational Alerts</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    3 unread
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="rounded-xl bg-slate-50 p-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Chi Hatchery Quota Alert</span>
                      <span className="text-[10px] text-slate-400">12m ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Tuesday broiler allocation at 84% capacity. Only 160 cartons unreserved.
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-800">Deposit Received</span>
                      <span className="text-[10px] text-slate-400">45m ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Zenith Bank: ₦480,000 verified for Ref POL-DEMO01 (Afolabi Layers).
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-800">Cold Chain Monitor</span>
                      <span className="text-[10px] text-slate-400">2h ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Ibadan Central Vaccine Depot: +4.2°C (Optimal safe window 2°C–8°C).
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Staff Badge */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 font-bold text-white text-xs shadow-xs">
              AD
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-1.5 ring-white" />
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">Admin Operations</div>
              <div className="text-[10px] text-slate-400 font-semibold">Super Admin · Level 3</div>
            </div>
          </div>
        </div>
      </header>

      {/* Global Command Palette Modal (Cmd+K) */}
      {commandOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-150">
          <div
            className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center border-b border-slate-100 px-4 py-3.5">
              <Search className="h-4 w-4 text-emerald-600 mr-3" />
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

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span>Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">ESC</kbd> to exit</span>
                <span>Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">↵</kbd> to select</span>
              </div>
              <span className="font-bold text-emerald-700">D-AminGrow Command Hub</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
