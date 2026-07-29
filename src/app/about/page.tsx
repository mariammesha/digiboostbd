import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — DigiBoost BD',
  description:
    'Learn why DigiBoost BD was built specifically for Bangladeshi small businesses — transparent, affordable, and rooted in local market knowledge.',
};

const values = [
  {
    icon: '🤝',
    title: 'Transparency First',
    desc: 'No jargon, no smoke-and-mirrors. You\'ll always know exactly what we\'re doing, why we\'re doing it, and what it\'s costing you.',
  },
  {
    icon: '💡',
    title: 'Local Knowledge',
    desc: 'We understand the Bangladeshi market — the culture, the platforms, the buying behaviour. That\'s a real competitive advantage for your campaigns.',
  },
  {
    icon: '📈',
    title: 'Results Over Vanity',
    desc: 'We don\'t chase likes or followers. We focus on metrics that matter: leads, sales, and revenue for your business.',
  },
  {
    icon: '❤️',
    title: 'Built for SMEs',
    desc: 'Every package, process, and price is designed with the realities of Bangladeshi small businesses in mind — not Fortune 500 companies.',
  },
];

const team = [
  {
    name: 'Rafiq Hossain',
    role: 'Founder & Strategy Lead',
    bio: '8 years in digital marketing across Bangladeshi and regional brands. Former agency lead who saw firsthand how SMEs were being overcharged.',
    initials: 'RH',
  },
  {
    name: 'Nadia Akter',
    role: 'Head of Content & Creative',
    bio: 'Award-winning content creator and copywriter with deep expertise in Bangla and English content that resonates with Bangladeshi audiences.',
    initials: 'NA',
  },
  {
    name: 'Karim Uddin',
    role: 'Paid Ads & SEO Specialist',
    bio: 'Certified Google Ads and Meta Ads specialist. Has managed over ৳2 crore in ad spend across Bangladesh and South Asia.',
    initials: 'KU',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-cream via-brand-orange-pale/20 to-brand-cream section-pad border-b border-brand-cream-dark">
        <div className="container-max text-center">
          <span className="inline-block bg-brand-orange-pale text-brand-orange font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-brown mb-4">
            Built for Bangladesh.<br />Built for You.
          </h1>
          <p className="text-brand-muted max-w-xl mx-auto text-lg">
            DigiBoost BD was born out of frustration — and a belief that small business owners in
            Bangladesh deserve better.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-pad bg-white">
        <div className="container-max max-w-3xl">
          <div className="space-y-6 text-brand-brown-mid leading-relaxed text-base md:text-lg">
            <p>
              In 2022, our founder Rafiq was working at a large digital marketing agency in Dhaka. Day
              after day, he watched small business owners — tailors, restaurant owners, boutique
              retailers, home tutors — pay huge retainers for generic campaigns that barely moved the
              needle.
            </p>
            <p>
              The problem wasn&apos;t that digital marketing doesn&apos;t work. It does. The problem was that
              the agencies weren&apos;t designed with Bangladeshi SMEs in mind. Their pricing, their
              reporting, and their strategies were built for multinationals — not for a clothing shop
              in Gazipur or a homemade food brand in Sylhet.
            </p>
            <p>
              So he left. He built DigiBoost BD from the ground up with one mission:{' '}
              <strong className="text-brand-orange">
                make professional digital marketing accessible and transparent for every Bangladeshi
                small business.
              </strong>
            </p>
            <p>
              Today, we work with 200+ businesses across Bangladesh — from solo entrepreneurs to
              growing teams. We handle their digital marketing so they can focus on what they do best:
              running their business.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-brand-cream">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-brown">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="card hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-200">
                <span className="text-3xl mb-3 block">{v.icon}</span>
                <h3 className="text-lg font-bold text-brand-brown mb-2">{v.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-brown">Meet the Team</h2>
            <p className="text-brand-muted mt-2">Real people. Real expertise. Real results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card text-center hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-200">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-bold text-brand-brown text-lg">{member.name}</h3>
                <p className="text-brand-orange text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-brand-muted leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-brown text-white section-pad">
        <div className="container-max text-center">
          <h2 className="text-3xl font-extrabold mb-4">
            Ready to Work With a Team That Actually Cares?
          </h2>
          <p className="text-brand-cream/70 mb-8 max-w-md mx-auto">
            Start with a free audit. No pressure, no commitment — just honest advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-audit"
              className="inline-block bg-brand-orange text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-brand-orange-dark transition-colors"
            >
              Get a Free Audit →
            </Link>
            <a
              href="https://wa.me/8801752993428?text=Hello%20DigiBoost%20BD!%20I%27d%20like%20to%20know%20more."
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
