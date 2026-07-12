import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  // Only admins can upload reports
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const clientId = formData.get('clientId') as string;
  const title = formData.get('title') as string;
  const file = formData.get('file') as File | null;

  if (!clientId || !title || !file) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Validate file type
  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
  }

  // Validate file size (max 20 MB)
  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json({ error: 'File size must be under 20 MB' }, { status: 400 });
  }

  // Verify client exists
  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 });
  }

  // Generate a unique filename to avoid collisions
  const ext = '.pdf';
  const uniqueName = `${randomUUID()}${ext}`;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save to /public/reports/
  const savePath = join(process.cwd(), 'public', 'reports', uniqueName);
  await writeFile(savePath, buffer);

  // The public URL accessible from the browser
  const fileUrl = `/reports/${uniqueName}`;

  // Save record in DB
  const report = await prisma.report.create({
    data: {
      clientId,
      title,
      fileUrl,
    },
  });

  return NextResponse.json({ success: true, report });
}
