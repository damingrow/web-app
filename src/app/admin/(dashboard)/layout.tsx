import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  UserCheck,
  LogOut,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navSections = [
    {
      title: 'Operations Desk',
      items: [
        { name: '01. Overview', href: '/admin', icon: LayoutDashboard },
        { name: '02. Chick Bookings', href: '/admin/bookings', icon: CalendarCheck },
        { name: 'Enquiries Inbox', href: '/admin/enquiries', icon: Inbox },
        { name: '05. Farmer CRM', href: '/admin/crm', icon: Users },
      ],
    },
    {
      title: 'Commerce & Advisory',
      items: [
        { name: '03. Products & Stock', href: '/admin/products', icon: Package },
        { name: 'Chick Price Sync', href: '/admin/chicks-pricing', icon: TrendingUp },
        { name: '04. Clinical Services', href: '/admin/services', icon: Stethoscope },
      ],
    },
    {
      title: 'Growth & Content',
      items: [
        { name: '06. Content & VCN Library', href: '/admin/content', icon: BookOpen },
        { name: '07. Marketing & Leads', href: '/admin/marketing', icon: Megaphone },
        { name: '08. Farm Calculators', href: '/admin/tools', icon: Calculator },
      ],
    },
    {
      title: 'Governance & Support',
      items: [
        { name: '09. Post-Dispatch Support', href: '/admin/support', icon: LifeBuoy },
        { name: '10. Reports & Analytics', href: '/admin/reports', icon: BarChart3 },
        { name: '11. Staff Audit Logs', href: '/admin/audit', icon: ShieldAlert },
        { name: '12. Platform Settings', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-body">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800 md:h-screen md:sticky md:top-0">
        <div className="flex-1 overflow-y-auto">
          {/* Admin Header */}
          <div className="p-5 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-white p-0.5 shrink-0">
                <Image
                  src="/Brand identity/damingrow logo.png"
                  alt="D-AminGrow Logo"
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              <div className="min-w-0">
                <span className="text-base font-bold text-white font-heading block leading-tight truncate">
                  D-Amin<span className="text-emerald-400">Grow</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                  Operations Centre
                </span>
              </div>
            </div>

            {/* Active Staff Role Pill */}
            <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-800/80 p-2 text-xs">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-semibold text-slate-200 text-[11px]">Staff Back-Office</span>
              </div>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300">
                12 MODULES
              </span>
            </div>
          </div>

          {/* Navigation Links Grouped by Section */}
          <nav className="p-3 space-y-5">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1">
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {section.title}
                </div>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Return to Public Site & Sign Out */}
        <div className="p-4 border-t border-slate-800 space-y-2 shrink-0 bg-slate-900/95">
          <Link
            href="/admin/login"
            className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Staff Portal / Switch User</span>
          </Link>
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span>Return to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
