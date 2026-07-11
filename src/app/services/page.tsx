import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — DigiBoost BD',
  description:
    'Explore DigiBoost BD\'s full range of digital marketing services for Bangladeshi small businesses: social media, SEO, paid ads, content, email marketing, and website promotion.',
};

const services = [
  {
    icon: '📱',
    title: 'Social Media Marketing',
    tagline: 'Build Your Brand Where Your Customers Are',
    description:
      'Your customers are spending hours every day on Facebook and Instagram. We create and manage your social media presence end-to-end — from content calendars and post design to community management and engagement strategies. We grow your following with real, local Bangladeshi audiences who are genuinely interested in your products or services.',
    highlights: [
      'Daily/weekly content scheduling',
      'Professional graphic design for posts',
      'Community management & comment replies',
      'Audience growth strategy',
      'Monthly performance reporting',
    ],
  },
  {
    icon: '🎯',
    title: 'Facebook & Instagram Advertising',
    tagline: 'Reach the Right People at the Right Time',
    description:
      'Running Facebook ads without a strategy is like burning money. Our team designs targeted ad campaigns that speak directly to your ideal customer — whether you\'re selling clothes in Chittagong, running a restaurant in Dhaka, or offering services nationwide. We track every taka spent and optimise continuously for the best results.',
    highlights: [
      'Custom audience research & targeting',
      'Ad creative design & copywriting',
      'A/B testing for best performance',
      'Retargeting & lookalike audiences',
      'Weekly spend and ROI reports',
    ],
  },
  {
    icon: '🔍',
    title: 'SEO Optimization',
    tagline: 'Get Found on Google — Before Your Competitors',
    description:
      'When a Bangladeshi customer searches for your product or service online, are you showing up? Our SEO service improves your website\'s ranking on Google for search terms your customers are actually using. We handle everything from technical fixes to keyword strategy and local SEO so your business appears at the top when it matters most.',
    highlights: [
      'Keyword research in Bangla & English',
      'On-page SEO optimisation',
      'Local SEO for Bangladeshi cities',
      'Backlink building',
      'Monthly ranking reports',
    ],
  },
  {
    icon: '✍️',
    title: 'Content Creation',
    tagline: 'Content That Connects and Converts',
    description:
      'Great marketing starts with great content. Our creative team produces professional graphics, compelling copy, short-form videos, and blog articles that represent your brand authentically and drive real engagement. Every piece of content is crafted with your target audience and business goals in mind — not just for likes, but for leads and sales.',
    highlights: [
      'Social media graphics & banners',
      'Short video & Reels production',
      'Copywriting in Bangla & English',
      'Blog articles & website content',
      'Product photography direction',
    ],
  },
  {
    icon: '📧',
    title: 'Email Marketing',
    tagline: 'Stay Top-of-Mind With Your Customers',
    description:
      'Email is still one of the highest ROI marketing channels available. We set up and manage automated email sequences that welcome new leads, nurture prospects, and re-engage past customers — all on autopilot. From designing beautiful email templates to writing the copy and setting up the automation flows, we handle it all.',
    highlights: [
      'Email list building strategy',
      'Automated welcome & nurture sequences',
      'Promotional campaign design',
      'A/B testing of subject lines',
      'Open rate & conversion tracking',
    ],
  },
  {
    icon: '🌐',
    title: 'Website Promotion',
    tagline: 'Turn Your Website Into a Lead-Generating Machine',
    description:
      'Having a website is only half the battle — driving quality traffic to it is the other half. We run multi-channel promotion campaigns combining SEO, social media, and paid ads to bring the right visitors to your website. We also optimise your landing pages to ensure more of those visitors turn into paying customers.',
    highlights: [
      'Multi-channel traffic campaigns',
      'Landing page copywriting',
      'Conversion rate optimisation (CRO)',
      'Google Search & Display ads',
      'Traffic & conversion analytics',
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-brand-cream via-brand-orange-pale/20 to-brand-cream section-pad border-b border-brand-cream-dark">
        <div className="container-max text-center">
          <span className="inline-block bg-brand-orange-pale text-brand-orange font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-brown mb-4">
            Everything You Need to Win Online
          </h1>
          <p className="text-brand-muted max-w-xl mx-auto text-lg">
            Six core services designed to grow Bangladeshi small businesses — affordable, transparent,
            and results-driven.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-pad bg-white">
        <div className="container-max space-y-10">
          {services.map((service, idx) => (
            <article
              key={service.title}
              id={service.title.toLowerCase().replace(/\s+/g, '-')}
              className="card hover:border-brand-orange/40 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon + number */}
                <div className="flex-shrink-0 flex md:flex-col items-center md:items-start gap-3">
                  <span className="text-4xl">{service.icon}</span>
                  <span className="text-5xl font-black text-brand-cream-dark select-none">
                    0{idx + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h2 className="text-xl md:text-2xl font-extrabold text-brand-brown">
                        {service.title}
                      </h2>
                      <p className="text-brand-orange font-semibold text-sm mt-0.5">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-brand-brown-mid leading-relaxed mb-5">{service.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2 text-sm text-brand-muted">
                        <span className="w-4 h-4 rounded-full bg-brand-orange-pale text-brand-orange flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                          ✓
                        </span>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-brown text-white section-pad">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-brand-cream/70 mb-8 max-w-md mx-auto">
            Book a free audit and we&apos;ll recommend exactly what your business needs to grow.
          </p>
          <Link
            href="/free-audit"
            className="inline-block bg-brand-orange text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-brand-orange-dark transition-colors"
          >
            Get a Free Audit →
          </Link>
        </div>
      </section>
    </>
  );
}
