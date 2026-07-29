import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import NextAuthProvider from '@/components/NextAuthProvider';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'DigiBoost BD — Affordable Digital Marketing for Bangladeshi Businesses',
  description:
    'DigiBoost BD offers transparent, affordable digital marketing for Bangladeshi small businesses — from social media and SEO to paid ads and content creation.',
  keywords: 'digital marketing Bangladesh, SME marketing, Facebook ads Bangladesh, SEO Bangladesh',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/logo-icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'DigiBoost BD — Digital Marketing for Bangladeshi SMEs',
    description: 'Affordable, transparent digital marketing built for Bangladesh small businesses.',
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'DigiBoost BD Logo',
      },
    ],
  },
};

const ACCENT_COLORS_RGB: Record<string, string> = {
  orange: '232 101 26', // #E8651A
  blue: '37 99 235', // #2563EB
  green: '22 163 74', // #16A34A
  purple: '147 51 234', // #9333EA
};

// Force layout to re-render on every request so footer contact info
// is always read fresh from the database, not baked into the static build.
export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
  } catch (e) {
    console.warn('Failed to fetch site settings during build, using defaults.', e);
  }

  const whatsappNumber = settings?.whatsappNumber || '8801752993428';
  const contactEmail = settings?.contactEmail || 'dgboostbd@gmail.com';
  const contactAddress = settings?.contactAddress || 'Sylhet, Bangladesh';
  const facebookUrl = settings?.facebookUrl || 'https://www.facebook.com/share/1Dd569DHdW/';
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/dgboost.bd?igsh=a3U4Ynk5NG1yNzlr';
  const accentColorKey = settings?.accentColor || 'orange';

  const colorRgb = ACCENT_COLORS_RGB[accentColorKey] || ACCENT_COLORS_RGB.orange;

  return (
    <html lang="bn">
      <body
        className="bg-brand-cream text-brand-brown font-sans antialiased"
        style={{ '--brand-accent-rgb': colorRgb } as React.CSSProperties}
      >
        <NextAuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer
            phone={whatsappNumber}
            email={contactEmail}
            address={contactAddress}
            facebookUrl={facebookUrl}
            instagramUrl={instagramUrl}
          />
          <WhatsAppButton phone={whatsappNumber} />
        </NextAuthProvider>
      </body>
    </html>
  );
}
