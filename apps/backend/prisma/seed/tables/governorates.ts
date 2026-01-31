import type { PrismaClient } from '@db/gen/prisma/client';
import { governorates } from '@db/seed/data/governorate';
import { logSeedTable } from '@db/seed/utils/helpers';

export async function seedGovernorates(prisma: PrismaClient) {
  logSeedTable('governorates');

  await prisma.governorate.createMany({
    data: governorates.map((name) => ({ name })),
  });
}
