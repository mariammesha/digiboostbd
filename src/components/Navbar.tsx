'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Logo from './Logo';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-cream-dark shadow-sm">
      <nav className="container-max flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo */}
        <Logo size="md" />

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-brand-brown-mid font-medium hover:text-brand-orange transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          {status === 'loading' ? (
            <div className="w-16 h-4 animate-pulse bg-brand-cream-dark rounded"></div>
          ) : session ? (
            <>
              {session.user?.role === 'ADMIN' && (
                <Link href="/admin" className="text-brand-brown-mid font-medium hover:text-brand-orange transition-colors duration-150">
                  Admin Panel
                </Link>
              )}
              <Link href="/dashboard" className="text-brand-brown-mid font-medium hover:text-brand-orange transition-colors duration-150">
                Dashboard
              </Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-brand-brown-mid font-medium hover:text-brand-orange transition-colors duration-150">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-brand-brown-mid font-medium hover:text-brand-orange transition-colors duration-150">
                Login
              </Link>
              <Link href="/signup" className="btn-outline text-sm px-4 py-2 shadow-sm">
                Sign Up
              </Link>
            </>
          )}
          <Link href="/free-audit" className="btn-primary text-sm">
            Free Audit →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          id="navbar-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-brand-brown transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-brown transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-brown transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-cream-dark px-4 py-4 flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-brand-brown-mid font-medium text-base hover:text-brand-orange transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-brand-cream-dark pt-4 mt-2 flex flex-col gap-4">
            {status === 'loading' ? (
              <div className="w-full h-10 animate-pulse bg-brand-cream-dark rounded-md"></div>
            ) : session ? (
              <>
                {session.user?.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="text-brand-brown-mid font-semibold text-center hover:text-brand-orange transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="text-brand-brown-mid font-semibold text-center hover:text-brand-orange transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="text-brand-brown-mid font-semibold text-center hover:text-brand-orange transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-brand-brown-mid font-medium text-center hover:text-brand-orange transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="btn-outline text-sm text-center w-full"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <Link
              href="/free-audit"
              onClick={() => setMenuOpen(false)}
              className="btn-primary text-sm text-center w-full"
            >
              Free Audit →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
