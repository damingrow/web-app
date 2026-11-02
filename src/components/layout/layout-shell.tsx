'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { CartFloatingButton } from '@/components/cart/cart-floating-button';
import { ConsentBanner } from '@/components/compliance/consent-banner';

/**
 * Routes that render without the public site Header, Footer, Cart, and
 * Consent Banner — following industry-standard auth and back-office UX conventions.
 * Suppresses customer storefront chrome on /admin routes (/admin/login, /admin dashboard).
 */
const NO_CHROME_ROUTES = [
  '/admin',
];

interface LayoutShellProps {
  children: React.ReactNode;
}

export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();
  const showChrome = !NO_CHROME_ROUTES.some((route) => pathname?.startsWith(route));

  if (!showChrome) {
    // Auth / admin back-office pages: render children only — no storefront chrome
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <CartFloatingButton />
      <ConsentBanner />
    </>
  );
}
