import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DigiBoost BD — Affordable Digital Marketing for Bangladeshi SMEs',
  description:
    'Grow your Bangladeshi small business with affordable, transparent digital marketing. Social media, SEO, ads, and more — starting from ৳5,000/month.',
};

const services = [
  {
    icon: '📱',
    title: 'Social Media Marketing',
    desc: 'Build a loyal audience on Facebook, Instagram, and beyond with consistent, engaging content tailored to your brand.',
  },
  {
    icon: '🎯',
    title: 'Facebook & Instagram Advertising',
    desc: 'Run hyper-targeted ad campaigns that reach the right customers in Bangladesh at the lowest cost per result.',
  },
  {
    icon: '🔍',
    title: 'SEO',
    desc: 'Rank higher on Google searches so local customers can find your business before they find your competitors.',
  },
  {
    icon: '✍️',
    title: 'Content Creation',
    desc: 'Professional graphics, captions, videos, and blog posts that tell your brand story and drive engagement.',
  },
  {
    icon: '📧',
    title: 'Email Marketing',
    desc: 'Nurture leads and retain customers with automated, personalised email sequences that convert.',
  },
  {
    icon: '🌐',
    title: 'Website Promotion',
    desc: 'Drive quality traffic to your website through multi-channel campaigns and landing page optimisation.',
  },
];

const stats = [
  { value: '200+', label: 'SMEs Helped' },
  { value: '৳2Cr+', label: 'Ad Spend Managed' },
  { value: '40%', label: 'Avg. Lead Increase' },
  { value: '24/7', label: 'Support Available' },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-cream via-brand-orange-pale/30 to-brand-cream">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-brand-orange/8 blur-3xl pointer-events-none" />

        <div className="container-max section-pad relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-brand-orange-pale text-brand-orange font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
              🇧🇩 Made for Bangladeshi Businesses
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-brown leading-tight mb-6">
              Grow Your Business With{' '}
              <span className="text-brand-orange">Affordable</span>,{' '}
              <span className="relative">
                Transparent
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M0 5 Q100 0 200 5" stroke="#E8651A" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{' '}
              Digital Marketing
            </h1>

            <p className="text-lg md:text-xl text-brand-brown-mid leading-relaxed mb-8 max-w-2xl">
              Most agencies charge too much. Most freelancers are unreliable. DigiBoost BD is the
              affordable middle ground — built specifically for Bangladeshi small businesses that want
              real results, not empty promises.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/free-audit" className="btn-primary text-base text-center">
                Get a Free Audit →
              </Link>
              <Link href="/pricing" className="btn-outline text-base text-center">
                View Pricing
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-5 border border-brand-cream-dark"
              >
                <p className="text-2xl md:text-3xl font-extrabold text-brand-orange">{stat.value}</p>
                <p className="text-sm text-brand-muted mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="section-pad bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-brown mt-2">
              Everything Your Business Needs to Grow Online
            </h2>
            <p className="text-brand-muted mt-3 max-w-xl mx-auto">
              We handle the digital marketing so you can focus on running your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <div
                key={service.title}
                className="card group hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-200"
              >
                <span className="text-3xl mb-4 block">{service.icon}</span>
                <h3 className="text-lg font-bold text-brand-brown mb-2 group-hover:text-brand-orange transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="btn-outline text-sm">
              Explore All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Positioning Section ── */}
      <section className="section-pad bg-brand-cream">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-brand-orange to-brand-orange-dark rounded-3xl p-8 text-white shadow-2xl shadow-brand-orange/30">
                <p className="text-5xl font-black mb-2">৳5K</p>
                <p className="text-lg font-semibold opacity-90">Starting per month</p>
                <div className="mt-6 space-y-3">
                  {[
                    'No hidden fees',
                    'Clear monthly reports',
                    'Cancel anytime',
                    'Dedicated account manager',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-2 border border-brand-cream-dark">
                <p className="text-xs text-brand-muted">vs. Agencies</p>
                <p className="font-bold text-brand-brown text-sm">Save 60–80%</p>
              </div>
            </div>

            {/* Copy */}
            <div>
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
                Why DigiBoost BD
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-brown mt-2 mb-5 leading-tight">
                The Affordable Middle Ground Between Big Agencies & Unreliable Freelancers
              </h2>
              <p className="text-brand-brown-mid leading-relaxed mb-5">
                Expensive agencies are built for corporations. Freelancers can disappear overnight.
                DigiBoost BD gives Bangladeshi small businesses the best of both worlds — a
                professional team at a price that makes sense for your budget.
              </p>
              <ul className="space-y-3">
                {[
                  ['🏢 Agencies', 'Charge ৳50K–৳2L/month. Overkill for SMEs.'],
                  ['👤 Freelancers', 'Cheap, but inconsistent and hard to manage.'],
                  ['🚀 DigiBoost BD', 'Professional, affordable, and 100% transparent.'],
                ].map(([type, desc]) => (
                  <li key={type} className="flex gap-3">
                    <span className="font-bold text-brand-brown min-w-[120px]">{type}</span>
                    <span className="text-brand-muted text-sm">{desc}</span>
                  </li>
                ))}
              </ul>
              <Link href="/free-audit" className="btn-primary mt-8 inline-block">
                Get a Free Audit →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-brand-brown text-white">
        <div className="container-max px-4 md:px-8 py-14 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Grow Your Business Online?
          </h2>
          <p className="text-brand-cream/70 max-w-lg mx-auto mb-8">
            Book a free 30-minute audit call and we&apos;ll tell you exactly what&apos;s holding your digital
            presence back — and how to fix it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-audit"
              className="inline-block bg-brand-orange text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-brand-orange-dark transition-colors shadow-lg shadow-brand-orange/30"
            >
              Get Your Free Audit →
            </Link>
            <a
              href="https://wa.me/8801752993428?text=Hello%20DigiBoost%20BD!%20I%27d%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#25D366] text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-[#1ea855] transition-colors"
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
