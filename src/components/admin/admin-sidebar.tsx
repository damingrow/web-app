'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  Inbox,
  Users,
  Package,
  TrendingUp,
  Stethoscope,
  BookOpen,
  Megaphone,
  Calculator,
  LifeBuoy,
  BarChart3,
  Settings,
  AlignJustify,
  X,
  Sprout,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const OPS_ITEMS = [
  {
    num: '01',
    name: 'Executive Overview',
    href: '/admin',
    icon: LayoutDashboard,
    badge: 'HQ',
    badgeClass: 'bg-[#124027] text-emerald-300 border border-emerald-500/40',
  },
  {
    num: '02.',
    name: 'Chick Bookings',
    href: '/admin/bookings',
    icon: CalendarCheck,
    badge: 'LIVE',
    badgeClass: 'bg-[#00c950] text-white font-bold',
  },
  {
    num: '03.',
    name: 'Enquiries Inbox',
    href: '/admin/enquiries',
    icon: Inbox,
    badge: '12',
    badgeClass: 'bg-[#ea580c] text-white font-extrabold rounded-full px-2 py-0.5 text-[10px]',
  },
  {
    num: '05.',
    name: 'Farmer CRM',
    href: '/admin/crm',
    icon: Users,
    badge: 'VIP Tiers',
    badgeClass: 'bg-[#24133b] text-[#c084fc] border border-[#c084fc]/40',
  },
];

const COMMERCE_ITEMS = [
  {
    num: '03.',
    name: 'Products & Stock',
    href: '/admin/products',
    icon: Package,
    badge: 'NAFDAC',
    badgeClass: 'bg-[#0b2b3a] text-[#38bdf8] border border-[#38bdf8]/40',
  },
  {
    num: '',
    name: 'Chick Price Sync',
    href: '/admin/chicks-pricing',
    icon: TrendingUp,
    badge: 'Rates',
    badgeClass: 'bg-[#1a2920] text-[#94a3b8] border border-[#94a3b8]/40',
  },
  {
    num: '04.',
    name: 'Clinical Services',
    href: '/admin/services',
    icon: Stethoscope,
    badge: 'VCN Vet',
    badgeClass: 'bg-[#3a131b] text-[#fb7185] border border-[#fb7185]/40',
  },
];

const EXTENDED_SECTIONS = [
  {
    title: 'Governance & Analytics',
    items: [
      { num: '06.', name: '6-Pillar & VCN Library', href: '/admin/content', icon: BookOpen, badge: '500K Traffic', badgeClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-700/40' },
      { num: '07.', name: 'Marketing & Leads', href: '/admin/marketing', icon: Megaphone, badge: 'Attribution', badgeClass: 'bg-[#1a1f1b] text-slate-400 border border-slate-700/50' },
      { num: '08.', name: 'Farm Calculators', href: '/admin/tools', icon: Calculator, badge: 'Bio Math', badgeClass: 'bg-[#1a1f1b] text-slate-400 border border-slate-700/50' },
      { num: '09.', name: 'Post-Dispatch Support', href: '/admin/support', icon: LifeBuoy, badge: 'Cold Chain', badgeClass: 'bg-[#1a1f1b] text-slate-400 border border-slate-700/50' },
      { num: '10.', name: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3, badge: 'Financials', badgeClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-700/40' },
      { num: '11.', name: 'Platform Settings', href: '/admin/settings', icon: Settings, badge: 'Zenith API', badgeClass: 'bg-[#1a1f1b] text-slate-400 border border-slate-700/50' },
    ],
  },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[240px] flex flex-col justify-between shrink-0 md:static md:h-screen md:sticky md:top-0 transition-transform duration-300 ease-in-out border-r border-[#0e2c1a] ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ background: 'linear-gradient(180deg, #051a0e 0%, #031209 100%)' }}
      >
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/5 shrink-0">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              {/* Sprout Icon in lime box */}
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#c8f742] to-[#99e622] flex items-center justify-center shadow-md shrink-0">
                <Sprout className="h-5 w-5 text-[#0a3818]" />
              </div>
              <div className="min-w-0">
                <div className="text-[15px] font-extrabold text-white leading-tight tracking-tight">
                  D-Amin<span className="text-[#2ee571]">Grow</span>
                </div>
                <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">
                  OPERATIONS CENTRE
                </div>
              </div>
            </Link>

            {/* Close button on mobile / align icon on desktop */}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white md:hidden p-1"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="hidden md:flex text-slate-400 hover:text-white cursor-pointer transition-colors p-1">
              <AlignJustify className="h-4 w-4" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-4">
            {/* Section 1: Operations Desk */}
            <div className="space-y-1">
              <div className="px-2.5 pb-1 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                OPERATIONS DESK
              </div>
              {OPS_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => onClose && onClose()}
                    className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-[#0c2f1d] text-white border border-emerald-500/40 shadow-xs'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          isActive ? 'text-[#2ee571]' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      <span className="truncate">
                        {item.num && (
                          <span className={isActive ? 'text-[#2ee571] font-bold' : 'text-slate-400'}>
                            {item.num}{' '}
                          </span>
                        )}
                        {item.name}
                      </span>
                    </div>
                    {item.badge && (
                      <span
                        className={`ml-1.5 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold leading-none ${
                          item.badgeClass
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Section 2: Commerce & Advisory */}
            <div className="space-y-1">
              <div className="px-2.5 pb-1 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                COMMERCE &amp; ADVISORY
              </div>
              {COMMERCE_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => onClose && onClose()}
                    className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-[#0c2f1d] text-white border border-emerald-500/40 shadow-xs'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          isActive ? 'text-[#2ee571]' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      <span className="truncate">
                        {item.num && (
                          <span className={isActive ? 'text-[#2ee571] font-bold' : 'text-slate-400'}>
                            {item.num}{' '}
                          </span>
                        )}
                        {item.name}
                      </span>
                    </div>
                    {item.badge && (
                      <span
                        className={`ml-1.5 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold leading-none ${
                          item.badgeClass
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Extended Governance links */}
            {EXTENDED_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-1 pt-1">
                <div className="px-2.5 pb-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  {section.title}
                </div>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => onClose && onClose()}
                      className={`flex items-center justify-between rounded-xl px-2.5 py-1.5 text-[11px] font-medium transition-all group ${
                        isActive
                          ? 'bg-[#0c2f1d] text-white border border-emerald-500/40'
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className={`ml-1 shrink-0 rounded px-1.5 py-0.5 text-[8px] font-bold leading-none ${item.badgeClass}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Section: Grow Together card & Copyright */}
        <div className="p-3 border-t border-white/5 space-y-3 shrink-0">
          {/* Grow Together Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0a2f18] via-[#072414] to-[#041a0e] border border-emerald-500/30 p-3.5 shadow-md">
            {/* Content */}
            <div className="relative z-10 space-y-1.5 pr-14">
              <div className="flex items-center gap-1.5">
                <Sprout className="h-4 w-4 text-[#2ee571]" />
                <span className="text-xs font-extrabold text-white">Grow Together</span>
              </div>
              <p className="text-[10px] text-slate-300 leading-tight">
                Building a more productive agricultural future.
              </p>
              <div className="pt-1">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-[#0e3a1f] hover:bg-[#124d29] border border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <span>Learn More</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Cute Yellow Baby Chicks Photo Overlay */}
            <div
              className="absolute bottom-1 right-1 w-20 h-16 bg-contain bg-no-repeat bg-right-bottom pointer-events-none rounded-br-xl"
              style={{ backgroundImage: "url('/images/sidebar-chicks.jpg')" }}
            />
          </div>

          {/* Footer Version Notice */}
          <div className="px-1 text-[9px] text-slate-400 leading-relaxed">
            <div className="font-semibold text-slate-400">D-AminGrow <span className="text-slate-400">v2.8.0</span></div>
            <div className="text-slate-400">© 2025. All rights reserved.</div>
          </div>
        </div>
      </aside>
    </>
  );
}
