import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Truck,
  Star,
  Instagram,
  Twitter,
  Facebook,
} from 'lucide-react';

const TRUST_BADGES = [
  {
    icon: ShieldCheck,
    title: 'NAFDAC Compliance',
    desc: '100% genuine, registered veterinary pharmaceuticals with verified batch numbers.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: () => <span className="text-xl">❄️</span>,
    title: 'Cold-Chain Guarantee',
    desc: 'Continuous 2°C–8°C cold-box transit with ice-pack validation for all vaccines.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: () => <span className="text-xl">🐣</span>,
    title: 'Certified Hatcheries',
    desc: 'Direct parent-stock broilers and layers pre-vaccinated against Marek\'s disease.',
    color: 'text-lime-400',
    bg: 'bg-lime-500/10',
  },
  {
    icon: Truck,
    title: 'Nationwide Dispatch',
    desc: 'Motor park depot delivery across all 36 Nigerian states and FCT with waybill tracking.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
];

export function Footer() {
  return (
    <footer className="bg-[#050E08] text-slate-300">

      {/* Newsletter / CTA Strip */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-900/40 via-emerald-900/20 to-[#050E08] border border-emerald-500/20 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
                <Star className="h-3.5 w-3.5" /> Ready to Partner with D-AminGrow?
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-2">
                Contact Our Expert Desk Today
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Get confirmed current prices, book day-old chicks, request vaccines, or schedule a farm consultation. Our team responds within 2 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://wa.me/2348139169402?text=Hello%20D-AminGrow%2C%20I%20want%20to%20inquire%20about%20your%20products%20and%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-[#25D366]/20"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm border border-white/10"
              >
                Contact Form
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Strip */}
      <div className="border-b border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_BADGES.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={`rounded-xl ${badge.bg} p-2.5 shrink-0 mt-0.5`}>
                    <span className={badge.color}>
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-heading mb-1">{badge.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white/10 border border-white/10">
                <Image
                  src="/Brand identity/damingrow logo.png"
                  alt="D-AminGrow Logo"
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              </div>
              <div>
                <div className="text-lg font-bold text-white font-heading leading-none">
                  D-Amin<span className="text-emerald-400">Grow</span>
                </div>
                <div className="text-[10px] text-slate-500 tracking-wide mt-0.5">Agro-Allied Solutions</div>
              </div>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Helping improve the livestock sector in Nigeria and across Africa through certified inputs, biosecure solutions, and professional advisory services.
            </p>

            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 text-xs font-semibold text-emerald-400">
              <span>✦</span>
              &quot;Your Satisfaction Is Our Priority&quot;
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <a
                href="https://wa.me/2348139169402"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                +234 813 916 9402 (WhatsApp)
              </a>
              <a
                href="mailto:info@damingrow.com"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Mail className="h-4 w-4 text-emerald-500 shrink-0" />
                info@damingrow.com
              </a>
              <div className="flex items-start gap-2.5 text-xs text-slate-400">
                <MapPin className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-300 block">Ibadan Office:</span>
                  <span>12 Oluyole Extension, Ibadan, Oyo State</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-400">
                <MapPin className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-300 block">Lagos Office:</span>
                  <span>20 Simarch Street, Agric Bus Stop, Ojo, Lagos State</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              <a href="#" aria-label="Facebook" className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-500 hover:text-emerald-400 transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-500 hover:text-emerald-400 transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter/X" className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-500 hover:text-emerald-400 transition-all">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-5">Products</h4>
            <ul className="space-y-3">
              {[
                { name: 'Day-Old Chicks', href: '/chicks' },
                { name: 'Point-of-Lay Birds', href: '/point-of-lay' },
                { name: 'Livestock Drugs', href: '/drugs' },
                { name: 'Livestock Vaccines', href: '/vaccines' },
                { name: 'Poultry Accessories', href: '/accessories' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-5">Services</h4>
            <ul className="space-y-3">
              {[
                { name: 'Day-Old Chick Booking', href: '/chicks' },
                { name: 'Vaccine Distribution', href: '/vaccines' },
                { name: 'Technical Services', href: '/services' },
                { name: 'Farm Consultation', href: '/services#consultation' },
                { name: 'Knowledge Centre', href: '/knowledge' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-5">Resources</h4>
            <ul className="space-y-3">
              {[
                { name: 'Brooder Calculator', href: '/calculators/brooder' },
                { name: 'Vaccination Schedule', href: '/calculators/vaccination' },
                { name: 'Poultry Farming Blog', href: '/knowledge' },
                { name: 'Privacy Policy', href: '/policies/privacy' },
                { name: 'Terms of Service', href: '/policies/terms' },
                { name: 'Shipping Policy', href: '/policies/shipping' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>
            © {new Date().getFullYear()} D-AminGrow Agro-Allied Co. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/policies/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="/policies/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <span>·</span>
            <Link href="/policies/shipping" className="hover:text-slate-300 transition-colors">Shipping</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
