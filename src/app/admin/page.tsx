import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminOverview() {
  const [totalClients, paidInvoices] = await Promise.all([
    prisma.client.count(),
    prisma.invoice.aggregate({
      _sum: { amountBDT: true },
      where: { isPaid: true },
    }),
  ]);

  const packageCounts = await prisma.client.groupBy({
    by: ['packageTier'],
    _count: { _all: true },
  });

  const totalRevenue = paidInvoices._sum.amountBDT || 0;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Total Clients</p>
          <p className="text-4xl font-bold">{totalClients}</p>
        </div>
        
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Total Revenue (Paid)</p>
          <p className="text-4xl font-bold text-green-400">
            ৳{totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold">Clients by Package Tier</h2>
        </div>
        <div className="p-6">
          {packageCounts.length === 0 ? (
            <p className="text-slate-400">No clients found.</p>
          ) : (
            <div className="space-y-4">
              {packageCounts.map((pkg) => (
                <div key={pkg.packageTier} className="flex justify-between items-center">
                  <span className="font-medium">{pkg.packageTier}</span>
                  <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">{pkg._count._all} clients</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <Link href="/admin/clients" className="inline-flex items-center text-orange-500 hover:text-orange-400 font-medium">
          View all clients →
        </Link>
      </div>
    </div>
  );
}
