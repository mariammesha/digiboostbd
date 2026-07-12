import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import SignOutButton from '../SignOutButton';
import '../dashboard.css';
import './reports.css';

interface ReportRecord {
  id: string;
  clientId: string;
  title: string;
  fileUrl: string;
  createdAt: Date;
}

export const metadata = {
  title: 'My Reports — DigiBoost BD',
  description: 'Download your marketing performance reports from DigiBoost BD.',
};

export const dynamic = 'force-dynamic';

export default async function ReportsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  // Only clients (non-admin) can access this page
  if (session.user.role === 'ADMIN') {
    redirect('/admin');
  }

  const client = await prisma.client.findUnique({
    where: { userId: session.user.id },
  });

  if (!client) {
    redirect('/login');
  }

  // Fetch only THIS client's reports, newest first
  const reports = await prisma.report.findMany({
    where: { clientId: client.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="dash-bg">
      {/* Top bar */}
      <header className="dash-header">
        <div className="dash-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">DigiBoost BD</span>
        </div>
        <nav className="dash-nav">
          <Link href="/dashboard" className="dash-nav-link">
            Overview
          </Link>
          <Link href="/dashboard/reports" className="dash-nav-link dash-nav-link--active">
            Reports
          </Link>
        </nav>
        <SignOutButton />
      </header>

      {/* Main content */}
      <main className="dash-main">
        <div className="reports-header">
          <div className="reports-icon">📊</div>
          <div>
            <h1 className="reports-title">My Reports</h1>
            <p className="reports-subtitle">
              Your latest marketing performance reports from DigiBoost BD
            </p>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="reports-empty">
            <div className="empty-icon">📭</div>
            <h2 className="empty-title">No reports yet — check back soon</h2>
            <p className="empty-body">
              Your account manager will upload your campaign performance reports here.
              You&apos;ll be able to view and download them as PDFs.
            </p>
          </div>
        ) : (
          <div className="reports-list">
            {reports.map((report: ReportRecord, index: number) => {
              const uploadDate = new Date(report.createdAt).toLocaleDateString('en-BD', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
              return (
                <div
                  key={report.id}
                  className="report-card"
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  <div className="report-pdf-icon">
                    <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                        fill="rgba(239,68,68,0.15)"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                      />
                      <polyline
                        points="14 2 14 8 20 8"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <text
                        x="12"
                        y="17"
                        textAnchor="middle"
                        fontSize="5"
                        fontWeight="bold"
                        fill="#ef4444"
                      >
                        PDF
                      </text>
                    </svg>
                  </div>

                  <div className="report-info">
                    <p className="report-name">{report.title}</p>
                    <p className="report-date">📅 Uploaded {uploadDate}</p>
                  </div>

                  <a
                    href={report.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="report-download-btn"
                    aria-label={`View or download ${report.title}`}
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View / Download
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
