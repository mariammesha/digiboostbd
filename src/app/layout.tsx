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
  openGraph: {
    title: 'DigiBoost BD — Digital Marketing for Bangladeshi SMEs',
    description: 'Affordable, transparent digital marketing built for Bangladesh small businesses.',
    locale: 'bn_BD',
    type: 'website',
  },
};

const ACCENT_COLORS_RGB: Record<string, string> = {
  orange: '232 101 26', // #E8651A
  blue: '37 99 235', // #2563EB
  green: '22 163 74', // #16A34A
  purple: '147 51 234', // #9333EA
};

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
  
  const whatsappNumber = settings?.whatsappNumber || '8801700000000';
  const contactEmail = settings?.contactEmail || 'hello@digiboostbd.com';
  const contactAddress = settings?.contactAddress || 'Dhaka, Bangladesh';
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
          <Footer phone={whatsappNumber} email={contactEmail} address={contactAddress} />
          <WhatsAppButton phone={whatsappNumber} />
        </NextAuthProvider>
      </body>
    </html>
  );
}
