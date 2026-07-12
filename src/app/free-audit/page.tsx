'use client';

import { useState, FormEvent } from 'react';

// Metadata is exported from a separate file since this is a client component
// See: src/app/free-audit/metadata.ts
const businessTypes = [
  'Retail / E-commerce',
  'Restaurant / Food',
  'Fashion & Clothing',
  'Beauty & Wellness',
  'Education / Coaching',
  'Real Estate',
  'Healthcare',
  'Technology / SaaS',
  'Professional Services',
  'Manufacturing',
  'Other',
];

type FormData = {
  businessName: string;
  ownerName: string;
  phone: string;
  businessType: string;
  websiteOrPage: string;
  marketingChallenge: string;
};

const initialForm: FormData = {
  businessName: '',
  ownerName: '',
  phone: '',
  businessType: '',
  websiteOrPage: '',
  marketingChallenge: '',
};

export default function FreeAuditPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/audit-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border-2 border-brand-cream-dark bg-brand-cream focus:border-brand-orange focus:outline-none focus:ring-0 text-brand-brown placeholder-brand-muted/60 transition-colors duration-150 text-sm font-medium';
  const labelClass = 'block text-sm font-semibold text-brand-brown mb-1.5';

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center section-pad bg-brand-cream">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6 animate-fade-in">
            ✅
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-brown mb-3">
            Thank you, {form.ownerName || 'friend'}!
          </h1>
          <p className="text-brand-muted leading-relaxed mb-6">
            We&apos;ve received your audit request for{' '}
            <strong className="text-brand-brown">{form.businessName || 'your business'}</strong>. Our
            team will review your details and contact you within{' '}
            <strong className="text-brand-orange">24 hours</strong> to schedule your free audit call.
          </p>
          <div className="card text-left">
            <p className="text-xs text-brand-muted uppercase tracking-wider font-semibold mb-3">
              What Happens Next
            </p>
            {[
              '📞 We call you within 24 hours',
              '🔍 Free 30-min audit of your digital presence',
              '📋 Custom recommendation report — free',
              '🚀 You decide if you want to work with us',
            ].map((step) => (
              <div key={step} className="flex gap-2 text-sm text-brand-brown-mid mb-2">
                <span>{step}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm(initialForm);
            }}
            className="btn-outline mt-6 text-sm"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-cream via-brand-orange-pale/20 to-brand-cream section-pad border-b border-brand-cream-dark">
        <div className="container-max text-center">
          <span className="inline-block bg-brand-orange-pale text-brand-orange font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            100% Free — No Obligation
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-brown mb-4">
            Get Your Free Marketing Audit
          </h1>
          <p className="text-brand-muted max-w-xl mx-auto text-lg">
            Fill in the form below and our team will review your current digital presence and send you
            a personalised growth recommendation — completely free.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-pad bg-white">
        <div className="container-max max-w-2xl">
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              '✅ No spam, ever',
              '⏱️ Response within 24 hours',
              '🔒 Your data stays private',
            ].map((badge) => (
              <span
                key={badge}
                className="bg-brand-cream-dark text-brand-brown-mid text-xs font-semibold px-4 py-1.5 rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>

          <form
            id="free-audit-form"
            onSubmit={handleSubmit}
            noValidate
            className="card !p-8 space-y-5"
          >
            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className={labelClass}>
                Business Name <span className="text-brand-orange">*</span>
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                placeholder="e.g. Ahmed Fashions, Dhaka"
                value={form.businessName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Owner Name */}
            <div>
              <label htmlFor="ownerName" className={labelClass}>
                Owner / Contact Name <span className="text-brand-orange">*</span>
              </label>
              <input
                id="ownerName"
                name="ownerName"
                type="text"
                required
                placeholder="Your full name"
                value={form.ownerName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone Number <span className="text-brand-orange">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+880 1700-000000"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Business Type */}
            <div>
              <label htmlFor="businessType" className={labelClass}>
                Business Type <span className="text-brand-orange">*</span>
              </label>
              <select
                id="businessType"
                name="businessType"
                required
                value={form.businessType}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="" disabled>
                  Select your business type
                </option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Website / Facebook Page */}
            <div>
              <label htmlFor="websiteOrPage" className={labelClass}>
                Current Website or Facebook Page URL
              </label>
              <input
                id="websiteOrPage"
                name="websiteOrPage"
                type="url"
                placeholder="https://www.facebook.com/yourbusiness"
                value={form.websiteOrPage}
                onChange={handleChange}
                className={inputClass}
              />
              <p className="text-xs text-brand-muted mt-1">Optional — leave blank if you don&apos;t have one yet.</p>
            </div>

            {/* Biggest Marketing Challenge */}
            <div>
              <label htmlFor="marketingChallenge" className={labelClass}>
                Biggest Marketing Challenge <span className="text-brand-orange">*</span>
              </label>
              <textarea
                id="marketingChallenge"
                name="marketingChallenge"
                required
                rows={4}
                placeholder="Tell us what's not working. e.g. We get traffic but no sales. Our Facebook posts get no reach. We don't know where to start..."
                value={form.marketingChallenge}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit */}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            <button
              id="free-audit-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-base py-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                'Submit — Get My Free Audit →'
              )}
            </button>

            <p className="text-xs text-brand-muted text-center">
              By submitting, you agree to be contacted by DigiBoost BD. We never share your data.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
