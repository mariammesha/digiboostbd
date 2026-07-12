import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, ownerName, phone, businessType, websiteOrPage, marketingChallenge } = body;

    // Validate required fields
    if (!businessName || !ownerName || !phone || !businessType || !marketingChallenge) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create AuditRequest in DB
    const auditRequest = await prisma.auditRequest.create({
      data: {
        businessName,
        ownerName,
        phone,
        businessType,
        websiteOrPage,
        marketingChallenge,
        status: 'NEW',
      },
    });

    return NextResponse.json({ success: true, data: auditRequest }, { status: 201 });
  } catch (error: any) {
    console.error('Audit request creation error:', error);
    return NextResponse.json(
      { error: 'Failed to submit audit request' },
      { status: 500 }
    );
  }
}
