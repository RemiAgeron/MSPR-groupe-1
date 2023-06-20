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

  const Bambou = await prisma.plants.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Bambou',
      family: 'Bambusa',
    },
  });
  const Sapin = await prisma.plants.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Sapin',
      family: 'Abies',
    },
  });
  const Erable = await prisma.plants.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Erable',
      family: 'Acer',
    },
  });
  const Hetre = await prisma.plants.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Hetre',
      family: 'Fagus',
    },
  });
  console.log({ Bambou, Sapin, Erable, Hetre });
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
