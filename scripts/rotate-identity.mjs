import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function rotateIdentity() {
  try {
    const tempPassword = 'SovereignInit2026!';
    const passwordHash = await hash(tempPassword, 12);

    // Create/update ajay@buildwithai.digital with mustChangePassword = true
    const ajay = await prisma.user.upsert({
      where: { email: 'ajay@buildwithai.digital' },
      update: {
        passwordHash,
        name: 'Ajay Sidal',
        mustChangePassword: true,
        role: 'ADMIN',
      },
      create: {
        email: 'ajay@buildwithai.digital',
        name: 'Ajay Sidal',
        passwordHash,
        role: 'ADMIN',
        mustChangePassword: true,
      },
    });

    // Permanently delete admin@buildwithai.digital
    const deleted = await prisma.user.deleteMany({
      where: { email: 'admin@buildwithai.digital' },
    });

    console.log('IDENTITY ROTATED:');
    console.log(`  Created/Updated: ${ajay.email} (mustChangePassword: ${ajay.mustChangePassword})`);
    console.log(`  Deleted: admin@buildwithai.digital (${deleted.count} record(s))`);
  } catch (error) {
    console.error('ROTATION FAILED:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

rotateIdentity();