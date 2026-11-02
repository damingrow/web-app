'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Menu, X, Phone, ShieldCheck } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Day-Old Chicks', href: '/chicks' },
  { name: 'Veterinary Drugs', href: '/drugs' },
  { name: 'Livestock Vaccines', href: '/vaccines' },
  { name: 'Farm Equipment', href: '/accessories' },
  { name: 'Knowledge Hub', href: '/knowledge' },
  { name: 'Calculators', href: '/calculators/brooder' },
  { name: 'Consultations', href: '/services' },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount, toggleDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
      {/* Top Biosecurity & Trust Banner */}
      <div className="bg-slate-900 text-slate-300 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-medium text-slate-200">
              Biosecure Livestock Solutions Across Nigeria & West Africa
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <span className="text-slate-400">Cold-Chain Logistics Guaranteed (2°C–8°C)</span>
            <span className="text-slate-600">|</span>
            <a
              href="https://wa.me/2348139169402"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
            >
              <Phone className="h-3 w-3" />
              <span>WhatsApp: +234 813 916 9402</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-white p-0.5 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform">
              <Image
                src="/Brand identity/damingrow logo.png"
                alt="D-AminGrow Logo"
                fill
                priority
                className="object-contain"
                sizes="44px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-950 font-heading leading-tight">
                D-Amin<span className="text-emerald-600">Grow</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                Your Satisfaction Is Our Priority
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50/80 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs: Cart Trigger & WhatsApp */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDrawer}
              className="relative rounded-lg p-2 text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label={`Open shopping cart (${itemCount} items)`}
            >
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold text-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            <div className="hidden lg:block">
              <Button
                variant="whatsapp"
                size="sm"
                onClick={() => window.open('https://wa.me/2348139169402', '_blank')}
              >
                <span>Direct WhatsApp</span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-6 space-y-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 text-base font-medium rounded-lg ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <Button
              variant="whatsapp"
              size="md"
              className="w-full justify-center"
              onClick={() => {
                setMobileMenuOpen(false);
                window.open('https://wa.me/2348139169402', '_blank');
              }}
            >
              <span>Chat with Veterinary Desk</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
