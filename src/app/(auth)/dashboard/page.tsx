import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import SignOutButton from './SignOutButton';
import './dashboard.css';

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
    </div>
  );
}
