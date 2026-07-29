import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — DigiBoost BD',
  description:
    'Transparent, affordable digital marketing pricing for Bangladeshi businesses. Plans from ৳5,000/month with no hidden fees.',
};

const tiers = [
  {
    id: 'basic',
    name: 'Basic',
    price: '৳5,000',
    period: '/month',
    tagline: 'Perfect for businesses just starting out online.',
    featured: false,
    cta: 'Get Started',
    deliverables: [
      'Baseline social media management',
      '2 targeted ad campaigns/month',
      'Monthly data summary report',
      'Basic graphic design for posts',
      'Email support',
    ],
    excluded: [
      'SEO optimization',
      'Daily content production',
      'Dedicated dashboard',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '৳10,000',
    period: '/month',
    tagline: 'Ideal for growing businesses ready to scale.',
    featured: true,
    cta: 'Most Popular — Start Now',
    deliverables: [
      'Everything in Basic',
      'Core SEO optimization',
      'Continuous copywriting assets',
      'Bi-weekly funnel performance audits',
      'Ad campaign management (4/month)',
      'Priority WhatsApp support',
    ],
    excluded: [
      'Daily content production',
      'Live data dashboard',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '৳20,000',
    period: '/month',
    tagline: 'For ambitious businesses that want maximum growth.',
    featured: false,
    cta: 'Go Premium',
    deliverables: [
      'Everything in Standard',
      'Full-funnel growth scaling strategy',
      'Daily content production',
      'Dedicated live data dashboard access',
      'Unlimited ad campaigns',
      'Weekly strategy calls',
      'Dedicated account manager',
    ],
    excluded: [],
  },
];

const faqs = [
  {
    q: 'Are there any hidden fees?',
    a: 'Absolutely not. The price you see is the price you pay. Ad spend is handled separately and transparently — you\'ll always see exactly where your money goes.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. We work on monthly agreements with no long-term lock-in. You can cancel with 30 days notice at any time.',
  },
  {
    q: 'What currency are the prices in?',
    a: 'All prices are in Bangladeshi Taka (BDT). Ad budgets are additional and are agreed upon separately based on your goals.',
  },
  {
    q: 'Can I upgrade my plan later?',
    a: 'Of course. Many of our clients start with Basic and upgrade once they see results. You can switch plans at the end of any billing month.',
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-cream via-brand-orange-pale/20 to-brand-cream section-pad border-b border-brand-cream-dark">
        <div className="container-max text-center">
          <span className="inline-block bg-brand-orange-pale text-brand-orange font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Transparent Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-brown mb-4">
            Simple, Honest Pricing
          </h1>
          <p className="text-brand-muted max-w-xl mx-auto text-lg">
            No hidden fees, no surprise invoices. Pick the plan that fits your business and budget.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-pad bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                id={`pricing-${tier.id}`}
                className={`relative rounded-3xl p-7 flex flex-col transition-all duration-200 ${
                  tier.featured
                    ? 'bg-gradient-to-b from-brand-orange to-brand-orange-dark text-white shadow-2xl shadow-brand-orange/30 scale-[1.03]'
                    : 'bg-white border-2 border-brand-cream-dark hover:border-brand-orange/50 hover:shadow-lg text-brand-brown'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-brown text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    ⭐ Most Popular
                  </div>
                )}

                {/* Tier name */}
                <div className="mb-5">
                  <p
                    className={`text-sm font-semibold uppercase tracking-widest mb-2 ${
                      tier.featured ? 'text-white/70' : 'text-brand-muted'
                    }`}
                  >
                    {tier.name}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl md:text-5xl font-black">{tier.price}</span>
                    <span
                      className={`text-sm mb-2 ${tier.featured ? 'text-white/70' : 'text-brand-muted'}`}
                    >
                      {tier.period}
                    </span>
                  </div>
                  <p
                    className={`text-sm mt-2 ${tier.featured ? 'text-white/80' : 'text-brand-muted'}`}
                  >
                    {tier.tagline}
                  </p>
                </div>

                {/* Deliverables */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {tier.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
                          tier.featured
                            ? 'bg-white/20 text-white'
                            : 'bg-brand-orange-pale text-brand-orange'
                        }`}
                      >
                        ✓
                      </span>
                      <span className={tier.featured ? 'text-white/90' : 'text-brand-brown-mid'}>
                        {item}
                      </span>
                    </li>
                  ))}
                  {tier.excluded.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm opacity-40">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 bg-gray-100 text-gray-400">
                        ✕
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/free-audit"
                  className={`block text-center font-bold py-3.5 px-6 rounded-full transition-all duration-200 ${
                    tier.featured
                      ? 'bg-white text-brand-orange hover:bg-brand-cream'
                      : 'bg-brand-orange text-white hover:bg-brand-orange-dark shadow-md'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-brand-muted mt-8">
            All plans include onboarding support. Ad spend is separate and agreed upon transparently.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-brand-cream">
        <div className="container-max max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-brown text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqs.map((faq, i) => (
              <div key={i} className="card">
                <h3 className="font-bold text-brand-brown mb-2">{faq.q}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-brown text-white section-pad">
        <div className="container-max text-center">
          <h2 className="text-3xl font-extrabold mb-4">Still Not Sure? Get a Free Audit First.</h2>
          <p className="text-brand-cream/70 mb-8 max-w-md mx-auto">
            We&apos;ll review your current digital presence for free and recommend the right plan for your
            specific business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-audit"
              className="inline-block bg-brand-orange text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-brand-orange-dark transition-colors"
            >
              Book Free Audit →
            </Link>
            <a
              href="https://wa.me/8801752993428?text=Hello%20DigiBoost%20BD!%20I%27d%20like%20to%20know%20more%20about%20pricing."
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
