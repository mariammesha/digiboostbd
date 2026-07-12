'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

/**
 * Ensures the caller is authenticated as an ADMIN.
 * Throws an error if not.
 */
async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  return session;
}

export async function markInvoicePaid(invoiceId: string) {
  await requireAdmin();

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { isPaid: true },
  });

  revalidatePath('/admin/clients/[id]', 'page');
  revalidatePath('/admin', 'page'); // Update total revenue
}

export async function createReport(clientId: string, title: string, fileUrl: string) {
  await requireAdmin();

  await prisma.report.create({
    data: {
      clientId,
      title,
      fileUrl,
    },
  });

  revalidatePath('/admin/clients/[id]', 'page');
}
