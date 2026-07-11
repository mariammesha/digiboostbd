import Link from 'next/link';

const services = [
  'Social Media Marketing',
  'Facebook & Instagram Ads',
  'SEO Optimization',
  'Content Creation',
  'Email Marketing',
  'Website Promotion',
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About Us', href: '/about' },
  { label: 'Free Audit', href: '/free-audit' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-brown text-brand-cream">
      <div className="container-max px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white font-black text-sm">
                DB
              </span>
              <span className="font-bold text-lg">
                DigiBoost <span className="text-brand-orange">BD</span>
              </span>
            </div>
            <p className="text-sm text-brand-cream/70 leading-relaxed max-w-xs">
              Affordable, transparent digital marketing built specifically for Bangladeshi small
              businesses. No jargon. Just results.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-orange transition-colors flex items-center justify-center text-sm font-bold"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-orange transition-colors flex items-center justify-center text-sm"
              >
                IG
              </a>
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-orange transition-colors flex items-center justify-center text-sm"
              >
                WA
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-brand-cream mb-4 text-sm uppercase tracking-wider">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-sm text-brand-cream/70 hover:text-brand-orange transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-brand-cream mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 mb-6">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-cream/70 hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-sm text-brand-cream/60">
              <p>📞 +880 1700-000000</p>
              <p className="mt-1">✉️ hello@digiboostbd.com</p>
              <p className="mt-1">📍 Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-brand-cream/40">
          <p>© {new Date().getFullYear()} DigiBoost BD. All rights reserved.</p>
          <p>Built with ❤️ for Bangladeshi small businesses</p>
        </div>
      </div>
    </footer>
  );
}
