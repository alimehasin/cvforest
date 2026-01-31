import { PrismaClient } from '@db/gen/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '@/env';
import { seedFiles } from './tables/files';
import { seedGovernorates } from './tables/governorates';
import { seedSkills } from './tables/skills';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL as string,
  }),
});

async function main() {
  if (env.NODE_ENV !== 'development') {
    return;
  }

  await seedFiles(prisma);
  await seedGovernorates(prisma);
  await seedSkills(prisma);
}

await main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
