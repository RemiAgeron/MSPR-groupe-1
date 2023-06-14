import { PrismaClient } from '@prisma/client';
import bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const dev = await prisma.users.upsert({
    where: { email: 'dev@dev.dev' },
    update: {},
    create: {
      isAdmin: true,
      firstname: 'dev',
      lastname: 'dev',
      email: 'dev@dev.dev',
      password: bcrypt.hashSync('dev', 10),
      phone: '0606060606',
      description: 'dev',
    },
  });
  const test = await prisma.users.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      firstname: 'test',
      lastname: 'test',
      password: bcrypt.hashSync('test', 10),
      phone: '0606060606',
    },
  });
  console.log({ dev, test });

  const botanist = await prisma.botanists.upsert({
    where: { userId: dev.id },
    update: {},
    create: {
      userId: dev.id,
      adress: 'dev',
      company_name: 'dev',
    },
  });
  console.log({ botanist });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
