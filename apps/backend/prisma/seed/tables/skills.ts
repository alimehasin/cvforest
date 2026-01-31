import type { PrismaClient } from '@db/gen/prisma/client';
import { skills } from '@db/seed/data/skills';
import { logSeedTable } from '@db/seed/utils/helpers';

export async function seedSkills(prisma: PrismaClient) {
  logSeedTable('skills');

  await prisma.skill.createMany({
    data: skills.map((name) => ({ name })),
  });
}
