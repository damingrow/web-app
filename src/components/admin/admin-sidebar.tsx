'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  ShieldAlert,
  Settings,
  ArrowLeft,
  LogOut,
  AlignJustify,
  X,
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
    badgeClass: 'bg-[#1a3d2b] text-emerald-300 border border-emerald-700/50',
  },
  {
    num: '02.',
    name: 'Chick Bookings',
    href: '/admin/bookings',
    icon: CalendarCheck,
    badge: 'LIVE',
    badgeClass: 'bg-emerald-500 text-white border-0',
  },
  {
    num: '',
    name: 'Enquiries Inbox',
    href: '/admin/enquiries',
    icon: Inbox,
    badge: 'ACTIVE',
    badgeClass: 'bg-[#2d2000] text-amber-300 border border-amber-700/50',
  },
  {
    num: '05.',
    name: 'Farmer CRM',
    href: '/admin/crm',
    icon: Users,
    badge: 'VIP Tiers',
    badgeClass: 'bg-[#1e1030] text-purple-300 border border-purple-700/50',
  },
];

const COMMERCE_ITEMS = [
  {
    num: '',
    name: 'Products & Stock',
    href: '/admin/products',
    icon: Package,
    badge: 'NAFDAC',
    badgeClass: 'bg-[#002233] text-cyan-300 border border-cyan-700/50',
  },
  {
    num: '',
    name: 'Chick Price Sync',
    href: '/admin/chicks-pricing',
    icon: TrendingUp,
    badge: 'Rates',
    badgeClass: 'bg-[#1a1f1b] text-slate-400 border border-slate-700/50',
  },
  {
    num: '04.',
    name: 'Clinical Services',
    href: '/admin/services',
    icon: Stethoscope,
    badge: 'VCN Vet',
    badgeClass: 'bg-[#2d0a0a] text-rose-300 border border-rose-700/50',
  },
];

const UTILITY_ITEMS = [
  { name: 'Staff Portal / Switch User', href: '/admin/login', icon: LogOut },
  { name: 'Return to Storefront', href: '/', icon: ArrowLeft },
];



// Hidden extended sections (accessible via expanded view)
const EXTENDED_SECTIONS = [
  {
    title: 'Governance & Analytics',
    items: [
      { num: '06.', name: '6-Pillar & VCN Library', href: '/admin/content', icon: BookOpen, badge: '500K Traffic', badgeClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-700/40' },
      { num: '07.', name: 'Marketing & Leads', href: '/admin/marketing', icon: Megaphone, badge: 'Attribution', badgeClass: 'bg-[#1a1f1b] text-slate-400 border border-slate-700/50' },
      { num: '08.', name: 'Farm Calculators', href: '/admin/tools', icon: Calculator, badge: 'Bio Math', badgeClass: 'bg-[#1a1f1b] text-slate-400 border border-slate-700/50' },
      { num: '09.', name: 'Post-Dispatch Support', href: '/admin/support', icon: LifeBuoy, badge: 'Cold Chain', badgeClass: 'bg-[#1a1f1b] text-slate-400 border border-slate-700/50' },
      { num: '10.', name: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3, badge: 'Financials', badgeClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-700/40' },
      { num: '11.', name: 'Staff Audit Logs', href: '/admin/audit', icon: ShieldAlert, badge: 'Zero-Trust', badgeClass: 'bg-[#1a1f1b] text-slate-400 border border-slate-700/50' },
      { num: '12.', name: 'Platform Settings', href: '/admin/settings', icon: Settings, badge: 'Zenith API', badgeClass: 'bg-[#1a1f1b] text-slate-400 border border-slate-700/50' },
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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[168px] flex flex-col shrink-0 md:static md:h-screen md:sticky md:top-0 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ background: 'linear-gradient(180deg, #0a1f0f 0%, #061409 100%)' }}
      >
        {/* Logo Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/5 shrink-0">
          <Link href="/admin" className="flex items-center gap-2 group">
            {/* Logo mark */}
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-[#d4ff4a] flex items-center justify-center shadow-md">
              <Image
                src="/Brand identity/damingrow logo.png"
                alt="D-AminGrow"
                fill
                className="object-contain p-0.5"
                sizes="32px"
                priority
              />
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-extrabold text-white leading-none tracking-tight">
                D-Amin<span className="text-[#a3e635]">Grow</span>
              </div>
              <div className="text-[8px] font-bold uppercase tracking-widest text-slate-500 mt-0.5">
                Operations Centre
              </div>
            </div>
          </Link>

          {/* Menu toggle / close */}
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition-colors p-0.5 md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="hidden md:flex text-slate-600 hover:text-slate-400 cursor-pointer transition-colors">
            <AlignJustify className="h-4 w-4" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-hide py-3 space-y-1">
          {/* Operations Desk */}
          <div className="px-3 pt-1 pb-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
              Operations Desk
            </span>
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
                className={`flex items-center justify-between mx-2 rounded-lg px-2.5 py-2 text-[11px] font-semibold transition-all group ${
                  isActive
                    ? 'bg-[#0d3320] text-white border-l-2 border-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon
                    className={`h-3.5 w-3.5 shrink-0 ${
                      isActive ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  />
                  <span className="truncate leading-none">
                    {item.num && (
                      <span className={`mr-0.5 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {item.num}{' '}
                      </span>
                    )}
                    {item.name}
                  </span>
                </div>
                {item.badge && (
                  <span className={`ml-1.5 shrink-0 rounded px-1.5 py-0.5 text-[8px] font-bold leading-none ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Commerce & Advisory */}
          <div className="px-3 pt-3 pb-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
              Commerce &amp; Advisory
            </span>
          </div>

          {COMMERCE_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose && onClose()}
                className={`flex items-center justify-between mx-2 rounded-lg px-2.5 py-2 text-[11px] font-semibold transition-all group ${
                  isActive
                    ? 'bg-[#0d3320] text-white border-l-2 border-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon
                    className={`h-3.5 w-3.5 shrink-0 ${
                      isActive ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  />
                  <span className="truncate leading-none">
                    {item.num && (
                      <span className={`mr-0.5 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {item.num}{' '}
                      </span>
                    )}
                    {item.name}
                  </span>
                </div>
                {item.badge && (
                  <span className={`ml-1.5 shrink-0 rounded px-1.5 py-0.5 text-[8px] font-bold leading-none ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Growth & Content (Staff utilities) */}
          <div className="px-3 pt-3 pb-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
              Growth &amp; Content
            </span>
          </div>

          {UTILITY_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose && onClose()}
                className="flex items-center gap-2 mx-2 rounded-lg px-2.5 py-2 text-[11px] font-medium text-slate-500 hover:bg-white/5 hover:text-slate-300 transition-all group"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-slate-600 group-hover:text-slate-400" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}

          {/* Hidden extended sections */}
          {EXTENDED_SECTIONS.map((section) => (
            <div key={section.title}>
              <div className="px-3 pt-3 pb-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-700">
                  {section.title}
                </span>
              </div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => onClose && onClose()}
                    className={`flex items-center justify-between mx-2 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition-all group ${
                      isActive
                        ? 'bg-[#0d3320] text-white border-l-2 border-emerald-400'
                        : 'text-slate-600 hover:bg-white/5 hover:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className={`h-3 w-3 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-700'}`} />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`ml-1 shrink-0 rounded px-1 py-0.5 text-[7px] font-bold leading-none ${item.badgeClass}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Grow Together Card */}
        <div className="mx-2 mb-2 mt-1 shrink-0">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0f3320] to-[#061a0d] border border-emerald-900/60 p-3.5">
            {/* Farm image background */}
            <div
              className="absolute inset-0 opacity-20 bg-cover bg-center rounded-xl"
              style={{ backgroundImage: "url('/images/farm-bg.jpg')" }}
            />
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-emerald-500/30 flex items-center justify-center">
                  <span className="text-emerald-400 text-[10px]">🌱</span>
                </div>
                <span className="text-[11px] font-extrabold text-white">Grow Together</span>
              </div>
              <p className="text-[9px] text-slate-400 leading-relaxed">
                Building a more productive agricultural future.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>

        {/* Footer version */}
        <div className="px-4 py-2.5 border-t border-white/5 shrink-0">
          <div className="text-[8px] font-semibold text-slate-700">D-AminGrow v2.8.0</div>
          <div className="text-[8px] text-slate-700">© 2025. All rights reserved.</div>
        </div>
      </aside>
    </>
  );
}
