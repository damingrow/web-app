import type { Metadata } from 'next';
import './globals.css';
import { generateLocalBusinessSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'D-AminGrow | Quality Day-Old Chicks, Vaccines, Drugs & Farm Equipment',
  description:
    'D-AminGrow is your trusted Nigerian partner for commercial day-old chicks, cold-chain poultry vaccines, NAFDAC registered veterinary drugs, and modern farm equipment. Your Satisfaction Is Our Priority.',
  metadataBase: new URL('https://damingrow.com'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
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
  const localBusinessJsonLd = generateLocalBusinessSchema();

  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-slate-50 font-body text-slate-900 flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
