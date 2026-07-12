'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">DigiBoost BD</span>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your client dashboard</p>

        <form onSubmit={handleSubmit} className="auth-form" id="login-form">
          <div className="field-group">
            <label htmlFor="email" className="field-label">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field-input"
              placeholder="you@example.com"
            />
          </div>

          <div className="field-group">
            <label htmlFor="password" className="field-label">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-input"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="auth-error" role="alert">
              <span>⚠</span> {error}
            </div>
          )}

          <button
            type="submit"
            id="login-submit"
            disabled={loading}
            className="auth-btn"
          >
            {loading ? (
              <span className="btn-loading">
                <span className="spinner" />
                Signing in…
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="auth-link">
            Create one free
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
          max-width: 420px;
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
          margin-bottom: 1.75rem;
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
          margin: 0 0 2rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
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
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          color: #f8fafc;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          width: 100%;
          box-sizing: border-box;
        }

        .field-input::placeholder {
          color: rgba(248, 250, 252, 0.3);
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
          margin-top: 0.25rem;
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
          margin-top: 1.75rem;
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
      `}</style>
    </div>
  );
}
