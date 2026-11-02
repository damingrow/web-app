import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Phone, HeartHandshake } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      {/* Trust & Guarantee Strip */}
      <div className="border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start space-x-3">
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-heading">NAFDAC Compliance</h4>
              <p className="mt-1 text-xs text-slate-400">
                100% genuine veterinary pharmaceuticals registered with authorized batch numbers.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
              <span className="text-lg">❄️</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-heading">Cold-Chain Guarantee</h4>
              <p className="mt-1 text-xs text-slate-400">
                Continuous 2°C–8°C thermal cold-box transit with ice-pack validation for all vaccines.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="rounded-lg bg-lime-500/10 p-2 text-lime-400">
              <span className="text-lg">🐣</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-heading">Certified Hatcheries</h4>
              <p className="mt-1 text-xs text-slate-400">
                Direct parent-stock broilers and layers pre-vaccinated against Marek’s disease.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-heading">Veterinary Support</h4>
              <p className="mt-1 text-xs text-slate-400">
                Free farm advisory and dosage guidance with our certified animal health consultants.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white p-0.5">
                <Image
                  src="/Brand identity/damingrow logo.png"
                  alt="D-AminGrow Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <span className="text-xl font-bold text-white font-heading">
                D-Amin<span className="text-emerald-400">Grow</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your Satisfaction Is Our Priority. Helping improve the livestock sector in Nigeria and across Africa through current information, biosecure inputs, and healthy agro-allied solutions.
            </p>
            <div className="pt-2">
              <div className="text-xs text-slate-400">Official Ordering WhatsApp Desk:</div>
              <a
                href="https://wa.me/2348139169402"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center space-x-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <Phone className="h-4 w-4" />
                <span>+234 813 916 9402</span>
              </a>
            </div>
          </div>

          {/* Catalog Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Products We Supply</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link href="/chicks" className="text-slate-400 hover:text-white transition-colors">
                  Day-Old Chicks (DOC)
                </Link>
              </li>
              <li>
                <Link href="/drugs" className="text-slate-400 hover:text-white transition-colors">
                  Livestock Drugs & Supplements
                </Link>
              </li>
              <li>
                <Link href="/vaccines" className="text-slate-400 hover:text-white transition-colors">
                  Livestock Vaccines (Cold-Chain)
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-slate-400 hover:text-white transition-colors">
                  Poultry Accessories & Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Guidance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Advisory & Services</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us (Goal, Aim & Vision)
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-white transition-colors">
                  Our Professional Services
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="text-slate-400 hover:text-white transition-colors">
                  Insights & Clinical Guides
                </Link>
              </li>
              <li>
                <Link href="/calculators/brooder" className="text-slate-400 hover:text-white transition-colors">
                  Brooder Space Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/vaccination" className="text-slate-400 hover:text-white transition-colors">
                  Poultry Vaccination Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Regulatory Notice */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Legal & Policies</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link href="/policies/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy (NDPA 2023)
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service & Mortality Claims
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="text-slate-400 hover:text-white transition-colors">
                  Cold-Chain & Delivery Protocol
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Staff Portal Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Strip */}
      <div className="border-t border-slate-800 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} D-AminGrow Agro-Allied Co. All rights reserved. Your Satisfaction Is Our Priority.
          </p>
          <div className="flex items-center space-x-4 text-[11px]">
            <Link href="/policies/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <span>•</span>
            <Link href="/policies/terms" className="hover:text-slate-300">Terms of Service</Link>
            <span>•</span>
            <Link href="/policies/shipping" className="hover:text-slate-300">Cold-Chain Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
