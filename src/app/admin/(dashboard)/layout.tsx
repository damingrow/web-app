import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Inbox,
  TrendingUp,
  Package,
  ShieldAlert,
  ArrowLeft,
  UserCheck,
  LogOut,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminNav = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Customer Enquiries', href: '/admin/enquiries', icon: Inbox },
    { name: 'Chick Price Sync', href: '/admin/chicks-pricing', icon: TrendingUp },
    { name: 'Product Inventory', href: '/admin/products', icon: Package },
    { name: 'Audit Events', href: '/admin/audit', icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-body">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-white p-0.5">
                <Image
                  src="/Brand identity/damingrow logo.png"
                  alt="D-AminGrow Logo"
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              <div>
                <span className="text-base font-bold text-white font-heading block leading-tight">
                  D-Amin<span className="text-emerald-400">Grow</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                  Staff Back-Office
                </span>
              </div>
            </div>

            {/* Active Staff Role Pill */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-800/80 p-2.5 text-xs">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4 text-emerald-400" />
                <span className="font-semibold text-slate-200">Staff Portal</span>
              </div>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Return to Public Site & Sign Out */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/admin/login"
            className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Staff Portal / Switch User</span>
          </Link>
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 sm:p-10">{children}</div>
      </main>
    </div>
  );
}
