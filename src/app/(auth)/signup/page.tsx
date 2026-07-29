'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 1. Create the account
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Something went wrong.');
      setLoading(false);
      return;
    }

    // 2. Auto sign-in after successful signup
    const signInResult = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (signInResult?.error) {
      setError('Account created but could not sign in. Please go to the login page.');
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>

        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Start with a free Basic plan — upgrade any time</p>

        <form onSubmit={handleSubmit} className="auth-form" id="signup-form">
          <div className="field-row">
            <div className="field-group">
              <label htmlFor="name" className="field-label">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={handleChange}
                className="field-input"
                placeholder="Md. Rahim Uddin"
              />
            </div>
            <div className="field-group">
              <label htmlFor="phone" className="field-label">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={form.phone}
                onChange={handleChange}
                className="field-input"
                placeholder="01XXXXXXXXX"
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="businessName" className="field-label">Business Name</label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              required
              value={form.businessName}
              onChange={handleChange}
              className="field-input"
              placeholder="Your Business Name"
            />
          </div>

          <div className="field-group">
            <label htmlFor="email" className="field-label">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              className="field-input"
              placeholder="you@example.com"
            />
          </div>

          <div className="field-group">
            <label htmlFor="password" className="field-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={form.password}
              onChange={handleChange}
              className="field-input"
              placeholder="Min. 8 characters"
            />
          </div>

          {error && (
            <div className="auth-error" role="alert">
              <span>⚠</span> {error}
            </div>
          )}

          <div className="plan-badge">
            <span className="plan-icon">🎁</span>
            <span>You&apos;ll start on the <strong>Basic Plan</strong> — free to upgrade later</span>
          </div>

          <button
            type="submit"
            id="signup-submit"
            disabled={loading}
            className="auth-btn"
          >
            {loading ? (
              <span className="btn-loading">
                <span className="spinner" />
                Creating account…
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link href="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>

      <style jsx>{`
        .auth-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29 0%, #1a1a4e 50%, #24243e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          font-family: 'Inter', 'Segoe UI', sans-serif;
        }

        .auth-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 1.25rem;
          padding: 2.5rem 2rem;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .auth-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .logo-icon {
          font-size: 1.5rem;
          filter: drop-shadow(0 0 8px #f59e0b);
        }

        .logo-text {
          font-size: 1.1rem;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: 0.03em;
        }

        .auth-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #f8fafc;
          margin: 0 0 0.25rem;
          line-height: 1.2;
        }

        .auth-subtitle {
          font-size: 0.9rem;
          color: rgba(248, 250, 252, 0.55);
          margin: 0 0 1.75rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .field-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(248, 250, 252, 0.7);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .field-input {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 0.6rem;
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          color: #f8fafc;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          width: 100%;
          box-sizing: border-box;
        }

        .field-input::placeholder {
          color: rgba(248, 250, 252, 0.28);
        }

        .field-input:focus {
          border-color: #f59e0b;
          background: rgba(245, 158, 11, 0.08);
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
        }

        .auth-error {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.35);
          border-radius: 0.6rem;
          padding: 0.7rem 1rem;
          font-size: 0.875rem;
          color: #fca5a5;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .plan-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.25);
          border-radius: 0.6rem;
          padding: 0.65rem 0.9rem;
          font-size: 0.82rem;
          color: rgba(248, 250, 252, 0.7);
        }

        .plan-badge strong {
          color: #f59e0b;
        }

        .plan-icon {
          font-size: 1rem;
          flex-shrink: 0;
        }

        .auth-btn {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #1a1a1a;
          border: none;
          border-radius: 0.6rem;
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.35);
          margin-top: 0.1rem;
        }

        .auth-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 6px 25px rgba(245, 158, 11, 0.5);
        }

        .auth-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(26, 26, 26, 0.3);
          border-top-color: #1a1a1a;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .auth-switch {
          text-align: center;
          font-size: 0.875rem;
          color: rgba(248, 250, 252, 0.5);
          margin-top: 1.5rem;
        }

        .auth-link {
          color: #f59e0b;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .auth-link:hover {
          color: #fbbf24;
          text-decoration: underline;
        }

        @media (max-width: 420px) {
          .field-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
