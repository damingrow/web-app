import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/design-tokens.css';
import { CartProvider } from '@/context/cart-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { CartFloatingButton } from '@/components/cart/cart-floating-button';
import { ConsentBanner } from '@/components/compliance/consent-banner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-body',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-family-heading',
});

export const metadata: Metadata = {
  title: 'D-AminGrow | Quality Day-Old Chicks, Vaccines, Drugs & Farm Equipment',
  description:
    'D-AminGrow is your trusted Nigerian partner for commercial day-old chicks, cold-chain poultry vaccines, NAFDAC registered veterinary drugs, and modern farm equipment. Your Satisfaction Is Our Priority.',
  metadataBase: new URL('https://damingrow.com'),
  openGraph: {
    title: 'D-AminGrow — Your Satisfaction Is Our Priority',
    description:
      'High-yield Day-Old Chicks, Veterinary Pharmaceuticals, Cold-Chain Vaccines, and Modern Livestock Housing in Nigeria.',
    url: 'https://damingrow.com',
    siteName: 'D-AminGrow',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="min-h-screen bg-slate-50 font-body text-slate-900 flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <CartFloatingButton />
          <ConsentBanner />
        </CartProvider>
      </body>
    </html>
  );
}
