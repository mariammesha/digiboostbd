import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminClientList() {
  const clients = await prisma.client.findMany({
    include: {
      user: true,
      _count: {
        select: { invoices: true, reports: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Clients</h1>
      </div>
      
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-medium">Business Name</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Tier</th>
              <th className="px-6 py-4 font-medium">Invoices / Reports</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {clients.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No clients registered yet.
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-750 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{client.businessName}</div>
                    <div className="text-slate-500 text-xs mt-1">ID: {client.id.slice(0, 8)}...</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{client.user.name}</div>
                    <div className="text-slate-400 text-xs">{client.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2.5 py-1 rounded-md text-xs font-semibold tracking-wider">
                      {client.packageTier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {client._count.invoices} / {client._count.reports}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/clients/${client.id}`}
                      className="text-orange-500 hover:text-orange-400 font-medium text-sm"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
