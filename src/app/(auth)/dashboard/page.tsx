import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import SignOutButton from './SignOutButton';
import Link from 'next/link';
import Logo from '@/components/Logo';
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

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const client = await prisma.client.findUnique({
    where: { userId: session.user.id },
    include: { user: true, reports: true },
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

  const reportCount = client.reports.length;

  return (
    <div className="dash-bg">
      {/* Top bar */}
      <header className="dash-header">
        <Logo size="md" />
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Link
            href="/dashboard"
            style={{
              fontSize: '0.875rem', fontWeight: 500,
              padding: '0.4rem 0.85rem', borderRadius: '0.5rem', textDecoration: 'none',
              background: 'rgba(245,158,11,0.12)', color: '#f59e0b',
            }}
          >
            Overview
          </Link>
          <Link
            href="/dashboard/reports"
            style={{
              fontSize: '0.875rem', fontWeight: 500, color: 'rgba(248,250,252,0.55)',
              padding: '0.4rem 0.85rem', borderRadius: '0.5rem', textDecoration: 'none',
            }}
          >
            Reports
          </Link>
        </nav>
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

        {/* Reports CTA */}
        <Link href="/dashboard/reports" style={{ textDecoration: 'none' }}>
          <div className="coming-soon" style={{ cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s' }}>
            <span className="cs-icon">📊</span>
            <div style={{ flex: 1 }}>
              <p className="cs-title">
                My Reports
                {reportCount > 0 && (
                  <span style={{
                    marginLeft: '0.6rem',
                    background: 'rgba(245,158,11,0.2)',
                    border: '1px solid rgba(245,158,11,0.4)',
                    borderRadius: '1rem',
                    padding: '0.1rem 0.55rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}>
                    {reportCount}
                  </span>
                )}
              </p>
              <p className="cs-body">
                {reportCount === 0
                  ? 'No reports yet — your account manager will upload campaign reports here.'
                  : `You have ${reportCount} report${reportCount === 1 ? '' : 's'} available. Click to view and download.`}
              </p>
            </div>
            <span style={{ color: '#f59e0b', fontSize: '1.2rem', flexShrink: 0 }}>→</span>
          </div>
        </Link>
      </main>
    </div>
  );
}
