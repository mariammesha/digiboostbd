import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DigiBoost BD — Account',
  description: 'Sign in or create your DigiBoost BD account.',
};

/**
 * Isolated layout for auth pages (/login, /signup) and the client dashboard.
 * Intentionally omits the public marketing Navbar and Footer.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} min-h-screen`}>
      {children}
    </div>
  );
}
