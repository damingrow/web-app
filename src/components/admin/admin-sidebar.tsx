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
  X,
  Sparkles,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const navSections = [
    {
      title: 'Operations Desk',
      items: [
        {
          name: '01. Executive Overview',
          href: '/admin',
          icon: LayoutDashboard,
          badge: 'HQ',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        },
        {
          name: '02. Chick Bookings',
          href: '/admin/bookings',
          icon: CalendarCheck,
          badge: 'LIVE',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        },
        {
          name: 'Enquiries Inbox',
          href: '/admin/enquiries',
          icon: Inbox,
          badge: 'ACTIVE',
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        },
        {
          name: '05. Farmer CRM',
          href: '/admin/crm',
          icon: Users,
          badge: 'VIP Tiers',
          badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        },
      ],
    },
    {
      title: 'Commerce & Advisory',
      items: [
        {
          name: '03. Products & Stock',
          href: '/admin/products',
          icon: Package,
          badge: 'NAFDAC',
          badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        },
        {
          name: 'Chick Price Sync',
          href: '/admin/chicks-pricing',
          icon: TrendingUp,
          badge: 'Rates',
          badgeColor: 'bg-slate-700/60 text-slate-300 border-slate-600',
        },
        {
          name: '04. Clinical Services',
          href: '/admin/services',
          icon: Stethoscope,
          badge: 'VCN Vet',
          badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        },
      ],
    },
    {
      title: 'Growth & Content',
      items: [
        {
          name: '06. 6-Pillar & VCN Library',
          href: '/admin/content',
          icon: BookOpen,
          badge: '500K Traffic',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        },
        {
          name: '07. Marketing & Leads',
          href: '/admin/marketing',
          icon: Megaphone,
          badge: 'Attribution',
          badgeColor: 'bg-slate-700/60 text-slate-300 border-slate-600',
        },
        {
          name: '08. Farm Calculators',
          href: '/admin/tools',
          icon: Calculator,
          badge: 'Bio Math',
          badgeColor: 'bg-slate-700/60 text-slate-300 border-slate-600',
        },
      ],
    },
    {
      title: 'Governance & Analytics',
      items: [
        {
          name: '09. Post-Dispatch Support',
          href: '/admin/support',
          icon: LifeBuoy,
          badge: 'Cold Chain',
          badgeColor: 'bg-slate-700/60 text-slate-300 border-slate-600',
        },
        {
          name: '10. Reports & Analytics',
          href: '/admin/reports',
          icon: BarChart3,
          badge: 'Financials',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        },
        {
          name: '11. Staff Audit Logs',
          href: '/admin/audit',
          icon: ShieldAlert,
          badge: 'Zero-Trust',
          badgeColor: 'bg-slate-700/60 text-slate-300 border-slate-600',
        },
        {
          name: '12. Platform Settings',
          href: '/admin/settings',
          icon: Settings,
          badge: 'Zenith API',
          badgeColor: 'bg-slate-700/60 text-slate-300 border-slate-600',
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Obsidian Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#040906] text-slate-300 flex flex-col justify-between shrink-0 border-r border-emerald-950/40 md:static md:h-screen md:sticky md:top-0 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          {/* Header & Brand Identity */}
          <div className="p-5 border-b border-white/5 relative">
            {/* Close Button on Mobile */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:hidden rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <Link href="/admin" className="flex items-center space-x-3 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-white via-slate-100 to-slate-200 p-1 shrink-0 shadow-lg shadow-emerald-500/10 group-hover:scale-105 transition-transform">
                <Image
                  src="/Brand identity/damingrow logo.png"
                  alt="D-AminGrow Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                  priority
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold text-white font-heading tracking-tight block leading-tight">
                    D-Amin<span className="text-emerald-400">Grow</span>
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-400/30">
                    Pro
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mt-0.5">
                  Operations Centre
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links Grouped by Section */}
          <nav className="p-3 space-y-5">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1">
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>{section.title}</span>
                  <Sparkles className="h-2.5 w-2.5 text-slate-600" />
                </div>
                {section.items.map((item) => {
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
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent text-emerald-300 border-l-2 border-emerald-400 font-bold shadow-xs'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon
                          className={`h-4 w-4 shrink-0 transition-colors ${
                            isActive
                              ? 'text-emerald-400'
                              : 'text-slate-500 group-hover:text-slate-300'
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`ml-2 rounded-md border px-1.5 py-0.5 text-[9px] font-mono font-bold shrink-0 ${
                            item.badgeColor
                          }`}
                        >
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

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5 space-y-2 shrink-0 bg-[#030604]/90">
          <Link
            href="/admin/login"
            className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-400 hover:bg-white/5 hover:text-emerald-300 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0 text-slate-500" />
            <span>Staff Portal / Switch User</span>
          </Link>
          <Link
            href="/"
            className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 text-slate-500" />
            <span>Return to Storefront</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
