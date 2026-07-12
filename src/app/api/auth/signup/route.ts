import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, businessName, phone } = body;

    // ── Validation ────────────────────────────────────────────────────────────
    if (!name || !email || !password || !businessName || !phone) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // ── Duplicate check ───────────────────────────────────────────────────────
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    // ── Create User + Client in a transaction ─────────────────────────────────
    const passwordHash = await hash(password, 12);

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: 'CLIENT',
        },
      });

      await tx.client.create({
        data: {
          userId: user.id,
          businessName,
          phone,
          packageTier: 'BASIC',
        },
      });
    });

    return NextResponse.json(
      { message: 'Account created successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[SIGNUP ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
