'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';

interface AdminTopbarProps {
  onToggleSidebar?: () => void;
}

export function AdminTopbar({ onToggleSidebar }: AdminTopbarProps) {
  const router = useRouter();
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
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

  // Click-outside to close dropdowns
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K)
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
      {/* ======================================================
          TOPBAR — exact match to design reference
          ====================================================== */}
      <header className="sticky top-0 z-30 flex h-[56px] w-full items-center justify-between bg-white border-b border-slate-200/80 px-4 sm:px-5 shadow-xs">

        {/* LEFT: Mobile toggle + Search pill */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleSidebar}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search / Command palette trigger */}
          <button
            onClick={() => setCommandOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-700 transition-all shadow-xs"
          >
            <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="hidden sm:inline text-[11px] font-medium text-slate-400">
              Quick Command or Farmer Lookup...
            </span>
            <span className="sm:hidden text-[11px]">Search...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-6 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[9px] text-slate-400 shadow-xs">
              <Command className="h-2 w-2" />K
            </kbd>
          </button>
        </div>

        {/* CENTER: Clock only */}
        <div className="hidden lg:flex items-center gap-2 text-xs">
          {currentTime && (
            <div className="text-right leading-tight">
              <div className="text-[13px] font-bold text-slate-800 font-mono tracking-tight">
                {currentTime}
              </div>
              <div className="text-[9px] font-bold text-slate-400 tracking-widest mt-px">
                {currentDate}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: WhatsApp Desk + Bell + Profile */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationsOpen((p) => !p)}
              className="relative rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 transition-colors shadow-xs"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[8px] font-extrabold text-white ring-2 ring-white">
                3
              </span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl z-50 text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900 text-sm">Operational Alerts</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    3 unread
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      title: 'Chi Hatchery Quota Alert',
                      time: '12m ago',
                      body: 'Tuesday broiler allocation at 84% capacity. Only 160 cartons unreserved.',
                      color: 'text-slate-900',
                    },
                    {
                      title: 'Deposit Received',
                      time: '45m ago',
                      body: 'Zenith Bank: ₦480,000 verified for Ref POL-DEMO01 (Afolabi Layers).',
                      color: 'text-emerald-800',
                    },
                    {
                      title: 'Cold Chain Monitor',
                      time: '2h ago',
                      body: 'Ibadan Central Vaccine Depot: +4.2°C (Optimal safe window 2°C–8°C).',
                      color: 'text-amber-800',
                    },
                  ].map((n) => (
                    <div key={n.title} className="rounded-xl bg-slate-50 p-2.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${n.color} text-xs`}>{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{n.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Staff avatar + name */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-teal-500 font-extrabold text-white text-xs shadow-xs shrink-0">
              AD
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-white" />
            </div>
            <div className="hidden xl:block leading-tight">
              <div className="text-[11px] font-bold text-slate-800">Admin Operations</div>
              <div className="text-[9px] font-semibold text-slate-400">Super Admin ▾</div>
            </div>
          </div>
        </div>
      </header>

      {/* =============================================
          GLOBAL COMMAND PALETTE (⌘K)
          ============================================= */}
      {commandOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/60 backdrop-blur-md"
          onClick={() => setCommandOpen(false)}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
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
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
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
                      className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-950 transition-all text-left group"
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
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] text-slate-500">
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
