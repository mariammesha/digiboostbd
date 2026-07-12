import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { loadEnvConfig } from '@next/env';

// Load variables from .env.local
loadEnvConfig(process.cwd());

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('❌ Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment variables.');
    process.exit(1);
  }

  const passwordHash = await hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      role: 'ADMIN',
      // We don't want to blindly overwrite the password if they already exist, 
      // but we do ensure they have the ADMIN role.
    },
    create: {
      name: 'System Admin',
      email,
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log(`✅ Admin user created/updated successfully: ${admin.email}`);

  const settings = await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      whatsappNumber: '8801700000000',
      contactEmail: 'hello@digiboostbd.com',
      contactAddress: 'Dhaka, Bangladesh',
      accentColor: 'orange',
    },
  });

  console.log(`✅ SiteSettings ensured successfully.`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
