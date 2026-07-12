import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { markInvoicePaid, createReport } from '../../actions';

export default async function ClientDetail({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      invoices: { orderBy: { createdAt: 'desc' } },
      reports: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!client) {
    notFound();
  }

  // Define the server action wrappers that bind the ID to the form submission
  const addReport = async (formData: FormData) => {
    'use server';
    const title = formData.get('title') as string;
    const fileUrl = formData.get('fileUrl') as string;
    if (title && fileUrl) {
      await createReport(client.id, title, fileUrl);
    }
  };

  const markPaid = async (formData: FormData) => {
    'use server';
    const invoiceId = formData.get('invoiceId') as string;
    if (invoiceId) {
      await markInvoicePaid(invoiceId);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <Link href="/admin/clients" className="text-sm text-slate-400 hover:text-white transition-colors">
          ← Back to Clients
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{client.businessName}</h1>
          <p className="text-slate-400 mt-1">Client ID: {client.id}</p>
        </div>
        <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-4 py-2 rounded-lg font-semibold tracking-wider">
          {client.packageTier}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Client Info & Reports */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Client Info Card */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-slate-700 pb-2">Contact Info</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 mb-1">Owner Name</p>
                <p className="font-medium text-slate-200">{client.user.name}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Email</p>
                <p className="font-medium text-slate-200">{client.user.email}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Phone</p>
                <p className="font-medium text-slate-200">{client.phone}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Joined</p>
                <p className="font-medium text-slate-200">{client.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Reports Section */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-slate-700 pb-2">Reports</h2>
            
            {client.reports.length === 0 ? (
              <p className="text-slate-500 text-sm mb-6">No reports uploaded yet.</p>
            ) : (
              <div className="space-y-3 mb-6">
                {client.reports.map(report => (
                  <div key={report.id} className="flex justify-between items-center bg-slate-900 p-3 rounded-lg border border-slate-700">
                    <div>
                      <p className="font-medium text-slate-200">{report.title}</p>
                      <p className="text-xs text-slate-500">{report.createdAt.toLocaleDateString()}</p>
                    </div>
                    <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                      View Report ↗
                    </a>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <h3 className="font-medium text-sm text-slate-300 mb-3">Add New Report</h3>
              <form action={addReport} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Report Title (e.g., July SEO Audit)"
                  required
                  className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                />
                <input
                  type="url"
                  name="fileUrl"
                  placeholder="File URL (Google Drive, PDF link, etc.)"
                  required
                  className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                />
                <button type="submit" className="bg-orange-600 hover:bg-orange-500 text-white font-medium py-2 rounded text-sm transition-colors mt-1">
                  Upload Report
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Right Column: Invoices */}
        <div className="space-y-8">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-slate-700 pb-2">Invoices</h2>
            
            {client.invoices.length === 0 ? (
              <p className="text-slate-500 text-sm">No invoices generated.</p>
            ) : (
              <div className="space-y-3">
                {client.invoices.map(invoice => (
                  <div key={invoice.id} className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-200">৳{invoice.amountBDT.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">{invoice.createdAt.toLocaleDateString()}</p>
                      </div>
                      {invoice.isPaid ? (
                        <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded text-xs font-semibold">
                          PAID
                        </span>
                      ) : (
                        <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded text-xs font-semibold">
                          UNPAID
                        </span>
                      )}
                    </div>
                    
                    {!invoice.isPaid && (
                      <form action={markPaid} className="mt-1 border-t border-slate-800 pt-3">
                        <input type="hidden" name="invoiceId" value={invoice.id} />
                        <button type="submit" className="w-full text-center bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-sm font-medium py-1.5 rounded transition-colors">
                          Mark as Paid
                        </button>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Note: Generating an invoice would usually happen on a schedule or manual trigger, simplified here for the dashboard view */}
          </div>
        </div>
      </div>
    </div>
  );
}
