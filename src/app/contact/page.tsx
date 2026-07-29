import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Contact Us — DigiBoost BD',
  description:
    'Get in touch with DigiBoost BD. Reach us by phone, WhatsApp, email, or visit us in Dhaka, Bangladesh.',
};

export default async function ContactPage() {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
  } catch {
    console.warn('Failed to fetch site settings on contact page, using defaults.');
  }

  const phone = settings?.whatsappNumber || '8801752993428';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const email = settings?.contactEmail || 'dgboostbd@gmail.com';
  const address = settings?.contactAddress || 'Sylhet, Bangladesh';
  const facebookUrl = settings?.facebookUrl || 'https://www.facebook.com/share/1Dd569DHdW/';
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/dgboost.bd?igsh=a3U4Ynk5NG1yNzlr';
  const mapUrl = 'https://maps.google.com/?q=Sylhet,+Bangladesh';

  const contactDetails = [
    {
      icon: '📞',
      label: 'Phone & WhatsApp',
      value: `+${cleanPhone}`,
      href: `tel:+${cleanPhone}`,
      actionLabel: 'Call Now',
    },
    {
      icon: '💬',
      label: 'WhatsApp Chat',
      value: 'Click to open WhatsApp',
      href: `https://wa.me/${cleanPhone}?text=Hello%20DigiBoost%20BD!`,
      actionLabel: 'Chat on WhatsApp',
      external: true,
    },
    {
      icon: '✉️',
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      actionLabel: 'Send Email',
    },
    {
      icon: '⏰',
      label: 'Business Hours',
      value: 'Sat–Thu: 9am – 7pm (BST)',
      href: null,
      actionLabel: null,
    },
    {
      icon: '📍',
      label: 'Office',
      value: address,
      href: mapUrl,
      actionLabel: 'Get Directions',
      external: true,
    },
    {
      icon: '📘',
      label: 'Facebook Page',
      value: 'DigiBoost BD Facebook',
      href: facebookUrl,
      actionLabel: 'Follow Us',
      external: true,
    },
    {
      icon: '📸',
      label: 'Instagram',
      value: '@dgboost.bd',
      href: instagramUrl,
      actionLabel: 'Follow Us',
      external: true,
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-cream via-brand-orange-pale/20 to-brand-cream section-pad border-b border-brand-cream-dark">
        <div className="container-max text-center">
          <span className="inline-block bg-brand-orange-pale text-brand-orange font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-brown mb-4">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-brand-muted max-w-xl mx-auto text-lg">
            Have a question? Ready to get started? We typically respond within a few hours during
            business hours.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section-pad bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-extrabold text-brand-brown mb-6">Contact Details</h2>
              <div className="space-y-4">
                {contactDetails.map((detail) => (
                  <div key={detail.label} className="card flex items-start gap-4 hover:border-brand-orange/40 transition-colors">
                    <span className="text-2xl flex-shrink-0">{detail.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-0.5">
                        {detail.label}
                      </p>
                      <p className="text-brand-brown font-medium text-sm break-all">{detail.value}</p>
                      {detail.href && detail.actionLabel && (
                        <a
                          href={detail.href}
                          target={detail.external ? '_blank' : undefined}
                          rel={detail.external ? 'noopener noreferrer' : undefined}
                          className="text-brand-orange font-semibold text-xs hover:underline mt-1 inline-block"
                        >
                          {detail.actionLabel} →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick CTA Panel */}
            <div className="space-y-5">
              {/* WhatsApp CTA */}
              <div className="rounded-3xl bg-gradient-to-br from-[#25D366] to-[#1a9e4e] text-white p-7 shadow-xl shadow-green-200/40">
                <p className="text-3xl mb-3">💬</p>
                <h3 className="text-xl font-bold mb-2">Fastest Reply: WhatsApp</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-5">
                  Most of our clients prefer reaching us on WhatsApp. Send us a message and we&apos;ll
                  get back to you within minutes during business hours.
                </p>
                <a
                  href={`https://wa.me/${cleanPhone}?text=Hello%20DigiBoost%20BD!%20I%27d%20like%20to%20know%20more.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-whatsapp-cta"
                  className="inline-block bg-white text-[#25D366] font-bold px-6 py-3 rounded-full text-sm hover:bg-brand-cream transition-colors"
                >
                  Chat on WhatsApp →
                </a>
              </div>

              {/* Free Audit CTA */}
              <div className="rounded-3xl bg-brand-cream border-2 border-brand-cream-dark p-7">
                <p className="text-3xl mb-3">🎯</p>
                <h3 className="text-xl font-bold text-brand-brown mb-2">
                  Not Sure What You Need?
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-5">
                  Book a free audit instead. We&apos;ll analyse your digital presence and tell you
                  exactly what will make the biggest difference for your business.
                </p>
                <Link href="/free-audit" className="btn-primary text-sm">
                  Get a Free Audit →
                </Link>
              </div>

              {/* Map placeholder */}
              <div className="rounded-3xl bg-brand-cream-dark h-40 flex items-center justify-center border-2 border-brand-cream-dark">
                <div className="text-center">
                  <p className="text-3xl mb-1">📍</p>
                  <p className="text-sm text-brand-muted font-medium">{address}</p>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-orange font-semibold hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom strip */}
      <section className="bg-brand-cream border-t border-brand-cream-dark py-8">
        <div className="container-max px-4 md:px-8 text-center">
          <p className="text-brand-muted text-sm">
            Prefer email?{' '}
            <a href={`mailto:${email}`} className="text-brand-orange font-semibold hover:underline">
              {email}
            </a>{' '}
            — we reply within 24 hours.
          </p>
        </div>
      </section>
    </>
  );
}
