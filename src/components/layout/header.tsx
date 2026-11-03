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

const PRODUCTS_MENU = [
  { icon: Feather, label: 'Day-Old Chicks', desc: 'Broilers, layers, turkeys, cockerels', href: '/chicks', color: 'text-amber-600 bg-amber-50' },
  { icon: Egg, label: 'Point-of-Lay Birds', desc: 'Ready-to-produce ISA Brown & Lohmann', href: '/point-of-lay', color: 'text-yellow-600 bg-yellow-50' },
  { icon: Syringe, label: 'Livestock Vaccines', desc: 'Cold-chain guaranteed (2°C–8°C)', href: '/vaccines', color: 'text-cyan-600 bg-cyan-50' },
  { icon: Pill, label: 'Veterinary Drugs', desc: 'Antibiotics, anticoccidials & vitamins', href: '/drugs', color: 'text-red-600 bg-red-50' },
  { icon: HomeIcon, label: 'Farm Equipment', desc: 'Cages, feeders, drinkers & housing', href: '/accessories', color: 'text-slate-600 bg-slate-100' },
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
  trigger: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  align?: 'left' | 'right';
}

function Dropdown({ trigger, children, width = 'w-72', align = 'left' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {trigger}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className={`absolute top-full mt-2 ${width} ${
            align === 'right' ? 'right-0' : 'left-0'
          } z-50 rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-200/60 ring-1 ring-slate-100 overflow-hidden`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {children}
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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSection(null);
  }, [pathname]);

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
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">

            {/* SERVICES dropdown */}
            <Dropdown
              width="w-[680px]"
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

            {/* PRODUCTS dropdown */}
            <Dropdown
              width="w-72"
              trigger={
                <span className={navLinkClass(
                  isActive('/chicks') || isActive('/vaccines') || isActive('/drugs') ||
                  isActive('/accessories') || isActive('/point-of-lay')
                )}>
                  Products
                </span>
              }
            >
              <div className="p-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-2 pt-1">
                  Our Product Range
                </div>
                <div className="space-y-0.5">
                  {PRODUCTS_MENU.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-slate-50 group transition-colors"
                      >
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">
                            {item.label}
                          </div>
                          <div className="text-xs text-slate-500 leading-tight">{item.desc}</div>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-emerald-500 ml-auto shrink-0 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Dropdown>

            {/* CALCULATORS dropdown */}
            <Dropdown
              width="w-72"
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
              width="w-64"
              align="right"
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

            {/* Section: Products */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === 'products' ? null : 'products')}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Feather className="h-4 w-4 text-amber-500" />
                  Products
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${mobileSection === 'products' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'products' && (
                <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-amber-100 pl-4">
                  {PRODUCTS_MENU.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-slate-50 text-sm text-slate-700 font-medium transition-colors"
                      >
                        <Icon className="h-4 w-4 text-slate-500 shrink-0" />
                        {item.label}
                      </Link>
                    );
                  })}
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
