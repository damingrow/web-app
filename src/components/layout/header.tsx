'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Menu,
  X,
  MessageCircle,
  HeartHandshake,
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-xl border-b border-slate-100 shadow-sm'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      {/* Top Trust Bar */}
      <div className="bg-[#050E08] text-slate-300 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2 text-[11px]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-slate-300 font-medium">Biosecure Livestock Solutions — Nigeria & West Africa</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-5">
            <span className="text-slate-500">Cold-Chain Guaranteed (2°C–8°C)</span>
            <span className="text-slate-700">|</span>
            <a
              href="https://wa.me/2348139169402"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <Phone className="h-3 w-3" />
              <span>+234 813 916 9402</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[76px] items-center justify-between gap-4">

          {/* Logo — Custom Brand Header Logo */}
          <Link href="/" className="flex items-center group shrink-0" aria-label="D-AminGrow Home">
            <div className="relative h-11 w-44 sm:h-12 sm:w-52 md:h-13 md:w-56 overflow-hidden group-hover:opacity-95 transition-opacity">
              <Image
                src="/Brand identity/damingrow-header-logo.png"
                alt="D-AminGrow — Your Satisfaction Is Our Priority"
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 176px, 224px"
              />
            </div>
          </Link>

          {/* Desktop Nav: Direct, Professional Top-Bar Menu Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {[
              { name: 'Services', href: '/services' },
              { name: 'Chicks', href: '/chicks' },
              { name: 'Drugs', href: '/drugs' },
              { name: 'Vaccines', href: '/vaccines' },
              { name: 'Accessories', href: '/accessories' },
              { name: 'Insights', href: '/knowledge' },
              { name: 'About Us', href: '/about' },
              { name: 'Contact', href: '/contact' },
            ].map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-xl transition-all duration-150 ${
                    active
                      ? 'text-emerald-700 bg-emerald-50/90 font-semibold shadow-xs'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/services#consultation"
              className="hidden lg:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <HeartHandshake className="h-4 w-4" />
              Book Consultation
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
              Menu
            </div>
            {[
              { name: 'Services', href: '/services' },
              { name: 'Chicks (Day-Old Chicks)', href: '/chicks' },
              { name: 'Drugs (Veterinary)', href: '/drugs' },
              { name: 'Vaccines (Cold-Chain)', href: '/vaccines' },
              { name: 'Poultry Accessories & Equipment', href: '/accessories' },
              { name: 'Point-of-Lay Birds', href: '/point-of-lay' },
              { name: 'Insights & Clinical Guides', href: '/knowledge' },
              { name: 'About D-AminGrow', href: '/about' },
              { name: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <Link
                href="/services#consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold px-4 py-3 rounded-xl transition-colors shadow-sm"
              >
                <HeartHandshake className="h-5 w-5" />
                Book Consultation
              </Link>
              <a
                href="https://wa.me/2348139169402"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                Chat on WhatsApp — +234 813 916 9402
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
