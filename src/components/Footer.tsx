import Link from 'next/link';
import Logo from './Logo';

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
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Free Audit', href: '/free-audit' },
];

interface FooterProps {
  phone?: string;
  email?: string;
  address?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

export default function Footer({
  phone = '8801752993428',
  email = 'dgboostbd@gmail.com',
  address = 'Sylhet, Bangladesh',
  facebookUrl = 'https://www.facebook.com/share/1Dd569DHdW/',
  instagramUrl = 'https://www.instagram.com/dgboost.bd?igsh=a3U4Ynk5NG1yNzlr',
}: FooterProps) {
  return (
    <footer className="bg-brand-brown text-brand-cream">
      <div className="container-max px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo light size="md" />
            </div>
            <p className="text-sm text-brand-cream/70 leading-relaxed max-w-xs">
              Affordable, transparent digital marketing built specifically for Bangladeshi small
              businesses. No jargon. Just results.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-orange transition-colors flex items-center justify-center text-sm font-bold"
              >
                f
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-orange transition-colors flex items-center justify-center text-sm"
              >
                IG
              </a>
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
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
            <div className="text-sm text-brand-cream/60 space-y-1">
              <p>
                <a
                  href={`tel:+${phone.replace(/[^0-9]/g, '')}`}
                  className="hover:text-brand-orange transition-colors"
                >
                  📞 +{phone.replace(/[^0-9]/g, '').replace(/^88/, '88 ').replace(/(\d{4})(\d{3})(\d{4})$/, '$1-$2-$3')}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-brand-orange transition-colors"
                >
                  ✉️ {email}
                </a>
              </p>
              <p>
                <a
                  href="https://maps.google.com/?q=Sylhet,+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-orange transition-colors"
                >
                  📍 {address}
                </a>
              </p>
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
