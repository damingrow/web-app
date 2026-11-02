import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import { LayoutShell } from '@/components/layout/layout-shell';

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
    <html lang="en" className="antialiased">
      <head>
        {/* Preconnect to Google Fonts for performance (loads in browser, not server) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-slate-50 font-body text-slate-900 flex flex-col">
        <CartProvider>
          <LayoutShell>{children}</LayoutShell>
        </CartProvider>
      </body>
    </html>
  );
}
