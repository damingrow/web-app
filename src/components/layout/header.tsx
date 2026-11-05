'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Menu,
  X,
  MessageCircle,
  HeartHandshake,
  ChevronDown,
  Feather,
  Syringe,
  Pill,
  Home as HomeIcon,
  Egg,
  ShieldCheck,
  Stethoscope,
  Building2,
  Wheat,
  Calculator,
  Scale,
  Thermometer,
  BookOpen,
  Star,
  Users,
  HelpCircle,
  MapPin,
  FileText,
  ArrowRight,
  Zap,
  Truck,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES_MENU = [
  {
    section: 'Animal & Poultry Health',
    items: [
      {
        icon: Syringe,
        label: 'Vaccine Supply & Cold-Chain',
        desc: 'Certified 2°C–8°C cold-chain nationwide',
        href: '/services/vaccines',
      },
      {
        icon: Pill,
        label: 'Veterinary Drug Supply',
        desc: 'NAFDAC-registered antibiotics & probiotics',
        href: '/services/drugs',
      },
      {
        icon: Stethoscope,
        label: 'Veterinary Consultation',
        desc: 'Expert triage & treatment protocol advisory',
        href: '/services/consultation',
      },
    ],
  },
  {
    section: 'Livestock Supply',
    items: [
      {
        icon: Feather,
        label: 'Day-Old Chick Sales',
        desc: 'Broilers, layers & cockerels — verified hatcheries',
        href: '/services/chicks',
      },
      {
        icon: Egg,
        label: 'Point-of-Lay Birds',
        desc: 'Vaccinated pullets ready for production',
        href: '/services/point-of-lay',
      },
    ],
  },
  {
    section: 'Technical Services',
    items: [
      {
        icon: Building2,
        label: 'Farm Setup & Technical',
        desc: 'Housing design & equipment installation',
        href: '/services/technical',
      },
      {
        icon: Wheat,
        label: 'Feed & Nutrition Advisory',
        desc: 'FCR optimisation & amino acid formulation',
        href: '/services/consultation',
      },
      {
        icon: ShieldCheck,
        label: 'Biosecurity Planning',
        desc: 'Quarantine protocols & pathogen containment',
        href: '/services/technical#biosecurity',
      },
    ],
  },
];

const PRODUCTS_MEGA_MENU = {
  breeds: {
    section: 'Day-Old Poultry Breeds',
    viewAllHref: '/day-old-chicks',
    viewAllLabel: 'All Day-Old Chicks & Rates',
    items: [
      {
        icon: Feather,
        label: 'Commercial Broilers',
        desc: 'Cobb 500 & Ross 308 · 6–7 wks harvest',
        href: '/day-old-chicks/broilers',
        badge: 'Fast Meat',
        color: 'text-amber-600 bg-amber-50 group-hover:bg-amber-100',
      },
      {
        icon: Egg,
        label: 'Commercial Pullets',
        desc: 'ISA Brown & Black · 94%+ peak lay rate',
        href: '/day-old-chicks/pullets',
        badge: 'High Lay',
        color: 'text-yellow-600 bg-yellow-50 group-hover:bg-yellow-100',
      },
      {
        icon: ShieldCheck,
        label: 'Day-Old Cockerels',
        desc: 'Hardy white & heavy black festive strains',
        href: '/day-old-chicks/cockerels',
        badge: 'Low Risk',
        color: 'text-emerald-600 bg-emerald-50 group-hover:bg-emerald-100',
      },
      {
        icon: Scale,
        label: 'Hybrid Turkey Poults',
        desc: 'Nicholas White & bronze toms (10–14kg)',
        href: '/day-old-chicks/turkeys',
        badge: '11kg+ Toms',
        color: 'text-purple-600 bg-purple-50 group-hover:bg-purple-100',
      },
    ],
  },
  health: {
    section: 'Animal Health & Biosecurity',
    viewAllHref: '/drugs',
    viewAllLabel: 'NAFDAC Formulations',
    items: [
      {
        icon: Syringe,
        label: 'Livestock Vaccines',
        desc: 'Certified 2°C–8°C cold-chain verified defense',
        href: '/vaccines',
        color: 'text-cyan-600 bg-cyan-50 group-hover:bg-cyan-100',
      },
      {
        icon: Pill,
        label: 'Veterinary Drugs',
        desc: 'NAFDAC-approved antibiotics & vitamins',
        href: '/drugs',
        color: 'text-rose-600 bg-rose-50 group-hover:bg-rose-100',
      },
      {
        icon: Zap,
        label: 'Vaccination Programs',
        desc: 'Official broiler & layer immunization timetables',
        href: '/vaccination-program',
        color: 'text-amber-600 bg-amber-50 group-hover:bg-amber-100',
      },
    ],
  },
  stock: {
    section: 'Stock & Infrastructure',
    viewAllHref: '/accessories',
    viewAllLabel: 'Farm Accessories',
    items: [
      {
        icon: Egg,
        label: 'Point-of-Lay Birds',
        desc: '16–18 week vaccinated layers ready to lay',
        href: '/point-of-lay',
        color: 'text-emerald-600 bg-emerald-50 group-hover:bg-emerald-100',
      },
      {
        icon: HomeIcon,
        label: 'Farm Equipment',
        desc: 'Battery cages, automated feeders & drinkers',
        href: '/accessories',
        color: 'text-slate-600 bg-slate-100 group-hover:bg-slate-200',
      },
    ],
  },
};

export const PRODUCTS_MENU = [
  ...PRODUCTS_MEGA_MENU.breeds.items,
  ...PRODUCTS_MEGA_MENU.health.items,
  ...PRODUCTS_MEGA_MENU.stock.items,
];

const CALCULATORS_MENU = [
  { icon: Scale, label: 'FCR Calculator', desc: 'Feed Conversion Ratio & performance', href: '/calculators/fcr' },
  { icon: Egg, label: 'Egg Production', desc: 'Layer production forecast & targets', href: '/calculators/egg-production' },
  { icon: Thermometer, label: 'Brooder Heat Setup', desc: 'Temperature curves for chick age', href: '/calculators/brooder' },
  { icon: Syringe, label: 'Vaccination Planner', desc: 'Dose calculator by flock size', href: '/calculators/vaccination' },
  { icon: Stethoscope, label: 'Symptom Checker', desc: 'AI-guided disease triage tool', href: '/calculators/symptom-checker' },
  { icon: Zap, label: 'Vaccination Programs', desc: 'Official broiler & layer schedules with calendar dates', href: '/vaccination-program' },
];

const MORE_MENU = [
  { icon: MapPin, label: 'Our Offices', desc: 'Ibadan & Lagos locations', href: '/about#offices' },
  { icon: FileText, label: 'Shipping Policy', desc: 'Delivery terms & waybill tracking', href: '/policies/shipping' },
  { icon: ShieldCheck, label: 'Privacy Policy', desc: 'How we protect your data', href: '/policies/privacy' },
  { icon: FileText, label: 'Terms of Service', desc: 'Service agreement & usage terms', href: '/policies/terms' },
  { icon: HelpCircle, label: 'FAQ & Support', desc: 'Common questions answered', href: '/contact#faq' },
];

// ─── Dropdown Component ───────────────────────────────────────────────────────

interface DropdownProps {
  id: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  align?: 'left' | 'right';
  activeDropdown: string | null;
  onOpen: (id: string) => void;
  onClose: () => void;
  onCloseImmediate: () => void;
  onToggle: (id: string) => void;
}

function Dropdown({
  id,
  trigger,
  children,
  width = 'w-72',
  align = 'left',
  activeDropdown,
  onOpen,
  onClose,
  onCloseImmediate,
  onToggle,
}: DropdownProps) {
  const isOpen = activeDropdown === id;

  return (
    <div
      className="relative"
      onMouseEnter={() => onOpen(id)}
      onMouseLeave={onClose}
    >
      <button
        onClick={() => onToggle(id)}
        className="flex items-center gap-1 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        {trigger}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full pt-2.5 ${width} ${
            align === 'right' ? 'right-0' : 'left-0'
          } z-50`}
          onMouseEnter={() => onOpen(id)}
          onMouseLeave={onClose}
        >
          {/* Invisible hover bridge spanning between trigger button and menu card */}
          <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent pointer-events-auto" />

          <div
            className="rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-200/60 ring-1 ring-slate-100 overflow-hidden"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest('a') || target.closest('button')) {
                onCloseImmediate();
              }
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const desktopNavRef = useRef<HTMLElement>(null);

  const handleOpenDropdown = (id: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleCloseDropdown = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  const handleCloseImmediate = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(null);
  };

  const handleToggleDropdown = (id: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown((curr) => (curr === id ? null : id));
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSection(null);
    handleCloseImmediate();
  }, [pathname]);

  // Handle outside click and Escape key on desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target as Node)) {
        handleCloseImmediate();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseImmediate();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  const navLinkClass = (active: boolean) =>
    `px-2.5 py-1.5 text-xs xl:text-sm font-medium rounded-lg transition-all duration-150 flex items-center gap-1 ${
      active
        ? 'text-emerald-700 bg-emerald-50 font-semibold'
        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md border-b border-slate-100' : 'border-b border-slate-100'
      }`}
    >
      {/* ── Top Trust Bar ───────────────────────────────────────────── */}
      <div className="bg-[#050E08] text-slate-300 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-1 text-[11px]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-slate-300 font-medium">
                Biosecure Livestock Solutions — Nigeria &amp; West Africa
              </span>
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

      {/* ── Main Navigation Bar ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-[58px] items-center justify-between gap-3">

          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0" aria-label="D-AminGrow Home">
            <div className="relative h-9 w-36 sm:h-10 sm:w-44 overflow-hidden group-hover:opacity-95 transition-opacity">
              <Image
                src="/Brand identity/damingrow-header-logo.png"
                alt="D-AminGrow — Your Satisfaction Is Our Priority"
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 144px, 176px"
              />
            </div>
          </Link>

          {/* ── Desktop Nav ─────────────────────────────────────────── */}
          <nav ref={desktopNavRef} className="hidden lg:flex items-center gap-0.5 xl:gap-1">

            {/* SERVICES dropdown */}
            <Dropdown
              id="services"
              width="w-[680px]"
              activeDropdown={activeDropdown}
              onOpen={handleOpenDropdown}
              onClose={handleCloseDropdown}
              onCloseImmediate={handleCloseImmediate}
              onToggle={handleToggleDropdown}
              trigger={
                <span className={navLinkClass(isActive('/services'))}>
                  Services
                </span>
              }
            >
              <div className="p-5">
                <div className="grid grid-cols-3 gap-5">
                  {SERVICES_MENU.map((section) => (
                    <div key={section.section}>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 px-1">
                        {section.section}
                      </div>
                      <div className="space-y-1">
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={`${item.href}-${item.label}`}
                              href={item.href}
                              className="flex items-start gap-3 px-2 py-2.5 rounded-xl hover:bg-emerald-50 group transition-colors"
                            >
                              <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-200 transition-colors mt-0.5">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">
                                  {item.label}
                                </div>
                                <div className="text-xs text-slate-500 mt-0.5 leading-tight">
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer CTA strip */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Need help choosing the right service?
                  </span>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    View all services <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Dropdown>

            {/* PRODUCTS MEGA MENU dropdown */}
            <Dropdown
              id="products"
              width="w-[740px]"
              activeDropdown={activeDropdown}
              onOpen={handleOpenDropdown}
              onClose={handleCloseDropdown}
              onCloseImmediate={handleCloseImmediate}
              onToggle={handleToggleDropdown}
              trigger={
                <span className={navLinkClass(
                  isActive('/day-old-chicks') || isActive('/chicks') || isActive('/vaccines') ||
                  isActive('/drugs') || isActive('/accessories') || isActive('/point-of-lay') ||
                  isActive('/vaccination-program')
                )}>
                  Products
                </span>
              }
            >
              <div className="p-5">
                <div className="grid grid-cols-12 gap-5">
                  {/* Column 1: Day-Old Poultry Breeds (5 cols) */}
                  <div className="col-span-5 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">
                      <span>{PRODUCTS_MEGA_MENU.breeds.section}</span>
                      <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Live Rates
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      {PRODUCTS_MEGA_MENU.breeds.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-start gap-2.5 px-2 py-2 rounded-xl hover:bg-slate-50 group transition-all"
                          >
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.color} transition-colors`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 leading-tight">
                                <span className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-1">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="pt-2 px-1">
                      <Link
                        href={PRODUCTS_MEGA_MENU.breeds.viewAllHref}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                      >
                        {PRODUCTS_MEGA_MENU.breeds.viewAllLabel} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Column 2: Health & Biosecurity (4 cols) */}
                  <div className="col-span-4 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">
                      {PRODUCTS_MEGA_MENU.health.section}
                    </div>
                    <div className="space-y-0.5">
                      {PRODUCTS_MEGA_MENU.health.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-start gap-2.5 px-2 py-2 rounded-xl hover:bg-slate-50 group transition-all"
                          >
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.color} transition-colors`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">
                                {item.label}
                              </div>
                              <div className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-1">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="pt-2 px-1">
                      <Link
                        href={PRODUCTS_MEGA_MENU.health.viewAllHref}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                      >
                        {PRODUCTS_MEGA_MENU.health.viewAllLabel} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Column 3: Stock & Equipment (3 cols) */}
                  <div className="col-span-3 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">
                      {PRODUCTS_MEGA_MENU.stock.section}
                    </div>
                    <div className="space-y-0.5">
                      {PRODUCTS_MEGA_MENU.stock.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-start gap-2.5 px-2 py-2 rounded-xl hover:bg-slate-50 group transition-all"
                          >
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.color} transition-colors`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">
                                {item.label}
                              </div>
                              <div className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-1">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Dispatch Guarantee Card */}
                    <div className="mt-2 p-3 rounded-xl bg-gradient-to-br from-[#0A192F] to-slate-900 border border-emerald-500/25 text-white">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Mon &amp; Thu Dispatch</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-100">
                        Hatchery Allocation Desk
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        48-hr clearing. Nationwide depot transit.
                      </p>
                      <Link
                        href="/day-old-chicks"
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <span>Book upcoming batch</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Mega Menu Footer Strip */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="flex items-center gap-1 text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Certified Parent Stock
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      All 36 States Dispatch
                    </span>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <span className="hidden sm:flex items-center gap-1 text-[11px]">
                      <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                      Zenith Bank Clearing
                    </span>
                  </div>
                  <Link
                    href="/day-old-chicks"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    <span>View all products</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </Dropdown>

            {/* CALCULATORS dropdown */}
            <Dropdown
              id="calculators"
              width="w-72"
              activeDropdown={activeDropdown}
              onOpen={handleOpenDropdown}
              onClose={handleCloseDropdown}
              onCloseImmediate={handleCloseImmediate}
              onToggle={handleToggleDropdown}
              trigger={
                <span className={navLinkClass(isActive('/calculators'))}>
                  Calculators
                </span>
              }
            >
              <div className="p-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-2 pt-1">
                  Farm Tools & Calculators
                </div>
                <div className="space-y-0.5">
                  {CALCULATORS_MENU.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-slate-50 group transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">
                            {item.label}
                          </div>
                          <div className="text-xs text-slate-500 leading-tight">{item.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 px-2">
                  <Link
                    href="/calculators"
                    className="flex items-center justify-between text-xs font-semibold text-emerald-700 hover:text-emerald-800 py-1 transition-colors"
                  >
                    <span>All farm tools & calculators</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Dropdown>

            {/* INSIGHTS — direct link */}
            <Link href="/knowledge" className={navLinkClass(isActive('/knowledge'))}>
              <BookOpen className="h-3.5 w-3.5" />
              Insights
            </Link>

            {/* REVIEWS — direct link */}
            <Link href="/reviews" className={navLinkClass(isActive('/reviews'))}>
              <Star className="h-3.5 w-3.5" />
              Reviews
            </Link>

            {/* ABOUT US — direct link */}
            <Link href="/about" className={navLinkClass(isActive('/about'))}>
              About Us
            </Link>

            {/* CONTACT US — direct link */}
            <Link href="/contact" className={navLinkClass(isActive('/contact'))}>
              Contact Us
            </Link>

            {/* MORE dropdown */}
            <Dropdown
              id="more"
              width="w-64"
              align="right"
              activeDropdown={activeDropdown}
              onOpen={handleOpenDropdown}
              onClose={handleCloseDropdown}
              onCloseImmediate={handleCloseImmediate}
              onToggle={handleToggleDropdown}
              trigger={
                <span className={navLinkClass(false)}>
                  More
                </span>
              }
            >
              <div className="p-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-2 pt-1">
                  Additional Pages
                </div>
                <div className="space-y-0.5">
                  {MORE_MENU.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-slate-50 group transition-colors"
                      >
                        <div className="h-7 w-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-slate-500 leading-tight">{item.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Dropdown>
          </nav>

          {/* ── Right CTAs ──────────────────────────────────────────── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Book Consultation CTA */}
            <Link
              href="/services/consultation"
              className="hidden lg:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs xl:text-sm font-semibold px-3.5 py-1.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5"
            >
              <HeartHandshake className="h-3.5 w-3.5" />
              Book Consultation
            </Link>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ───────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] sm:top-[82px] z-40 bg-white overflow-y-auto border-t border-slate-100 shadow-2xl">
          <div className="max-w-lg mx-auto px-4 py-5 pb-24 space-y-1">

            {/* Section: Services */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === 'services' ? null : 'services')}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-emerald-600" />
                  Services
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${mobileSection === 'services' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'services' && (
                <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-emerald-100 pl-4">
                  {SERVICES_MENU.flatMap((s) => s.items).map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={`${item.href}-${item.label}`}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-emerald-50 text-sm text-slate-700 font-medium transition-colors"
                      >
                        <Icon className="h-4 w-4 text-emerald-600 shrink-0" />
                        {item.label}
                      </Link>
                    );
                  })}
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-2 py-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    All Services <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Section: Products (Mobile Mega Drawer) */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === 'products' ? null : 'products')}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Feather className="h-4 w-4 text-emerald-600" />
                  Products &amp; Day-Old Chicks
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${mobileSection === 'products' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'products' && (
                <div className="ml-4 mt-1 space-y-3 border-l-2 border-emerald-100 pl-4 py-1">
                  {/* Group 1: Day-Old Poultry Breeds */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 px-2">
                      Day-Old Poultry Breeds
                    </div>
                    <div className="space-y-0.5">
                      {PRODUCTS_MEGA_MENU.breeds.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between px-2 py-2 rounded-xl hover:bg-slate-50 text-sm text-slate-700 font-medium transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="h-4 w-4 text-emerald-600 shrink-0" />
                              <span>{item.label}</span>
                            </div>
                            {item.badge && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                      <Link
                        href="/day-old-chicks"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                      >
                        <span>All Day-Old Chicks &amp; Rates</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Group 2: Animal Health & Infrastructure */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 px-2">
                      Health, Stock &amp; Equipment
                    </div>
                    <div className="space-y-0.5">
                      {[
                        ...PRODUCTS_MEGA_MENU.health.items,
                        ...PRODUCTS_MEGA_MENU.stock.items,
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-slate-50 text-sm text-slate-700 font-medium transition-colors"
                          >
                            <Icon className="h-4 w-4 text-slate-500 shrink-0" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section: Calculators */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === 'calc' ? null : 'calc')}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-violet-600" />
                  Calculators
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${mobileSection === 'calc' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'calc' && (
                <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-violet-100 pl-4">
                  {CALCULATORS_MENU.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-slate-50 text-sm text-slate-700 font-medium transition-colors"
                      >
                        <Icon className="h-4 w-4 text-violet-500 shrink-0" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct links */}
            {[
              { label: 'Insights & Clinical Guides', href: '/knowledge', Icon: BookOpen },
              { label: 'Farmer Reviews', href: '/reviews', Icon: Star },
              { label: 'About D-AminGrow', href: '/about', Icon: Users },
              { label: 'Contact Us', href: '/contact', Icon: HelpCircle },
            ].map(({ label, href, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="h-4 w-4 text-slate-400" />
                {label}
              </Link>
            ))}

            {/* More section */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === 'more' ? null : 'more')}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-slate-500" />
                  More
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${mobileSection === 'more' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'more' && (
                <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-slate-100 pl-4">
                  {MORE_MENU.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-slate-50 text-sm text-slate-700 font-medium transition-colors"
                      >
                        <Icon className="h-4 w-4 text-slate-400 shrink-0" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile CTAs */}
            <div className="pt-4 border-t border-slate-100 space-y-2 mt-4">
              <Link
                href="/services/consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold px-4 py-3.5 rounded-xl transition-colors shadow-sm"
              >
                <HeartHandshake className="h-5 w-5" />
                Book a Consultation
              </Link>
              <a
                href="https://wa.me/2348139169402"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp — +234 813 916 9402
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
