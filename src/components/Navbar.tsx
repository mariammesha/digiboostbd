'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-cream-dark shadow-sm">
      <nav className="container-max flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white font-black text-sm group-hover:scale-110 transition-transform">
            DB
          </span>
          <span className="font-bold text-lg text-brand-brown">
            DigiBoost <span className="text-brand-orange">BD</span>
          </span>
        </Link>

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
        <div className="hidden md:block">
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
          <Link
            href="/free-audit"
            onClick={() => setMenuOpen(false)}
            className="btn-primary text-sm text-center mt-2"
          >
            Free Audit →
          </Link>
        </div>
      )}
    </header>
  );
}
