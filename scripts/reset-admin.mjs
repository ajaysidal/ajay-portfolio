import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@buildwithai.digital';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error('ERROR: ADMIN_PASSWORD environment variable is required');
  process.exit(1);
}

async function resetAdmin() {
  try {
    const passwordHash = await hash(ADMIN_PASSWORD, 12);

    const user = await prisma.user.upsert({
      where: { email: ADMIN_EMAIL },
      update: { passwordHash },
      create: {
        email: ADMIN_EMAIL,
        name: 'Ajay Sidal',
        passwordHash,
        emailVerified: new Date(),
        role: 'ADMIN',
      },
    });

    console.log(`ADMIN RESET OK: ${user.email}`);
  } catch (error) {
    console.error('ADMIN RESET FAILED:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdmin();