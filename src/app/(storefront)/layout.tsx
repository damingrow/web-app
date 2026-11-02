import React from 'react';
import { CartProvider } from '@/context/cart-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { CartFloatingButton } from '@/components/cart/cart-floating-button';
import { ConsentBanner } from '@/components/compliance/consent-banner';

/**
 * Storefront Layout
 *
 * Applies strictly to the public consumer storefront routes.
 * Contains the customer navigation header, footer, shopping cart drawer,
 * floating WhatsApp/inquiry trigger, and NDPA compliance consent banner.
 *
 * Administrative (/admin/*) and authentication routes are completely
 * isolated from this layout via Next.js Route Groups.
 */
export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <CartFloatingButton />
      <ConsentBanner />
    </CartProvider>
  );
}
