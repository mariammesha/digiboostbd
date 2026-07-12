import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import NextAuthProvider from '@/components/NextAuthProvider';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="bg-brand-cream text-brand-brown font-sans antialiased">
        <NextAuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextAuthProvider>
      </body>
    </html>
  );
}
