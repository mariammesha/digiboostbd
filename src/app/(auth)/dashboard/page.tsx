import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import SignOutButton from './SignOutButton';

const tierConfig: Record<string, { label: string; color: string; icon: string; description: string }> = {
  BASIC: {
    label: 'Basic',
    color: '#6b7280',
    icon: '🌱',
    description: 'Essential digital marketing tools to get you started.',
  },
  STANDARD: {
    label: 'Standard',
    color: '#3b82f6',
    icon: '🚀',
    description: 'Expanded reach with advanced campaign management.',
  },
  PREMIUM: {
    label: 'Premium',
    color: '#f59e0b',
    icon: '👑',
    description: 'Full-service digital marketing with priority support.',
  },
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const client = await prisma.client.findUnique({
    where: { userId: session.user.id },
    include: { user: true },
  });

  if (!client) {
    redirect('/login');
  }

  const tier = tierConfig[client.packageTier] ?? tierConfig.BASIC;
  const memberSince = new Date(client.createdAt).toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="dash-bg">
      {/* Top bar */}
      <header className="dash-header">
        <div className="dash-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">DigiBoost BD</span>
        </div>
        <SignOutButton />
      </header>

      {/* Main content */}
      <main className="dash-main">
        {/* Welcome hero */}
        <section className="welcome-section">
          <div className="welcome-avatar">
            {client.user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="welcome-label">Welcome back</p>
            <h1 className="welcome-name">{client.user.name}</h1>
            <p className="welcome-business">{client.businessName}</p>
          </div>
        </section>

        {/* Cards row */}
        <div className="cards-grid">
          {/* Package tier card */}
          <div className="info-card tier-card">
            <div className="card-icon" style={{ color: tier.color }}>
              {tier.icon}
            </div>
            <div className="card-body">
              <p className="card-label">Current Plan</p>
              <p className="card-value">
                <span
                  className="tier-badge"
                  style={{
                    background: `${tier.color}22`,
                    border: `1px solid ${tier.color}55`,
                    color: tier.color,
                  }}
                >
                  {client.packageTier}
                </span>
              </p>
              <p className="card-desc">{tier.description}</p>
            </div>
          </div>

          {/* Account info card */}
          <div className="info-card">
            <div className="card-icon">📧</div>
            <div className="card-body">
              <p className="card-label">Account Email</p>
              <p className="card-value email-val">{client.user.email}</p>
              <p className="card-label" style={{ marginTop: '0.75rem' }}>Phone</p>
              <p className="card-value">{client.phone}</p>
            </div>
          </div>

          {/* Member since card */}
          <div className="info-card">
            <div className="card-icon">📅</div>
            <div className="card-body">
              <p className="card-label">Member Since</p>
              <p className="card-value">{memberSince}</p>
              <p className="card-desc">
                More features and reports coming soon in Phase 4.
              </p>
            </div>
          </div>
        </div>

        {/* Coming soon banner */}
        <div className="coming-soon">
          <span className="cs-icon">🔧</span>
          <div>
            <p className="cs-title">Dashboard reports coming soon</p>
            <p className="cs-body">
              Campaign analytics, invoice history, and performance metrics will be available in the next release.
            </p>
          </div>
        </div>
      </main>

      <style jsx>{`
        .dash-bg {
          min-height: 100vh;
          background: linear-gradient(160deg, #0f0c29 0%, #1a1a4e 60%, #24243e 100%);
          font-family: 'Inter', 'Segoe UI', sans-serif;
          color: #f8fafc;
        }

        /* ── Header ─────────────────────────────────────── */
        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.04);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .dash-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-icon {
          font-size: 1.4rem;
          filter: drop-shadow(0 0 6px #f59e0b);
        }

        .logo-text {
          font-size: 1rem;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: 0.03em;
        }

        /* ── Main ───────────────────────────────────────── */
        .dash-main {
          max-width: 900px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem;
        }

        /* ── Welcome ────────────────────────────────────── */
        .welcome-section {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .welcome-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          flex-shrink: 0;
          box-shadow: 0 0 24px rgba(245, 158, 11, 0.35);
        }

        .welcome-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(248, 250, 252, 0.5);
          margin: 0 0 0.2rem;
        }

        .welcome-name {
          font-size: 2rem;
          font-weight: 700;
          color: #f8fafc;
          margin: 0 0 0.15rem;
          line-height: 1.15;
        }

        .welcome-business {
          font-size: 0.95rem;
          color: rgba(248, 250, 252, 0.55);
          margin: 0;
        }

        /* ── Cards ──────────────────────────────────────── */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2rem;
          animation: slideUp 0.5s ease 0.1s both;
        }

        .info-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }

        .info-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.18);
          transform: translateY(-2px);
        }

        .card-icon {
          font-size: 1.75rem;
          flex-shrink: 0;
          line-height: 1;
        }

        .card-body {
          flex: 1;
          min-width: 0;
        }

        .card-label {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(248, 250, 252, 0.45);
          margin: 0 0 0.3rem;
        }

        .card-value {
          font-size: 1rem;
          font-weight: 600;
          color: #f8fafc;
          margin: 0 0 0.3rem;
          word-break: break-word;
        }

        .email-val {
          font-size: 0.9rem;
        }

        .card-desc {
          font-size: 0.8rem;
          color: rgba(248, 250, 252, 0.45);
          margin: 0.25rem 0 0;
          line-height: 1.5;
        }

        .tier-badge {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          border-radius: 0.4rem;
          padding: 0.25rem 0.65rem;
        }

        /* ── Coming soon ────────────────────────────────── */
        .coming-soon {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background: rgba(245, 158, 11, 0.07);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 1rem;
          padding: 1.25rem 1.5rem;
          animation: slideUp 0.5s ease 0.2s both;
        }

        .cs-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .cs-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #f59e0b;
          margin: 0 0 0.25rem;
        }

        .cs-body {
          font-size: 0.85rem;
          color: rgba(248, 250, 252, 0.5);
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .dash-main { padding: 1.5rem 1rem; }
          .welcome-name { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
