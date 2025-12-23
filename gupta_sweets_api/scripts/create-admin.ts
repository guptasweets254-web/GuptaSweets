import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? process.argv[2];
  const password = process.env.ADMIN_PASSWORD ?? process.argv[3];
  const name = process.env.ADMIN_NAME ?? 'Admin User';

  if (!email || !password) {
    console.error('Usage: ADMIN_EMAIL=... ADMIN_PASSWORD=... ts-node scripts/create-admin.ts');
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('A user with that email already exists:', existing.email);
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created:', { id: user.id, email: user.email });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
