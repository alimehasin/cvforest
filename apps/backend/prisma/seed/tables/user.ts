import {
  AvailabilityType,
  Currency,
  Gender,
  type PrismaClient,
  UserStatus,
  WorkLocationType,
} from '@db/gen/prisma/client';
import {
  genFullName,
  logSeedTable,
  runInBatches,
} from '@db/seed/utils/helpers';
import { dunna } from 'dunna';

export async function seedUsers(prisma: PrismaClient) {
  logSeedTable('users');

  const skills = await prisma.skill.findMany();
  const governorates = await prisma.governorate.findMany();

  const files = await prisma.file.findMany({
    where: { key: { startsWith: 'avatar-' } },
  });

  const promises = [];
  for (let i = 0; i < 10_000; i++) {
    const promise = prisma.user.create({
      data: {
        name: genFullName(Gender.Male),
        email: `user${i}@example.com`,
        status: dunna.basic.boolean()
          ? dunna.basic.choice(Object.values(UserStatus))
          : 'Approved',

        gender: dunna.basic.choice(Object.values(Gender)),
        bio: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        jobTitle: 'Software Engineer',
        avatarId: dunna.basic.choice(files).id,
        experienceInYears: dunna.basic.integer({ min: 0, max: 10 }),
        expectedSalaryMin: dunna.basic.integer({ min: 0, max: 100000 }),
        expectedSalaryMax: dunna.basic.integer({ min: 0, max: 100000 }),
        expectedSalaryCurrency: dunna.basic.choice(Object.values(Currency)),
        availabilityType: dunna.basic.choice(Object.values(AvailabilityType)),
        workLocationType: dunna.basic.choice(Object.values(WorkLocationType)),
        availableForHire: dunna.basic.boolean(),
        githubUrl: 'https://github.com/user',
        linkedinUrl: 'https://linkedin.com/user',
        portfolioUrl: 'https://user.com',
        governorateId: dunna.basic.choice(governorates).id,
        userSkills: {
          createMany: {
            data: dunna.basic
              .pick(dunna.basic.integer({ min: 3, max: 10 }), skills)
              .map((skill) => ({ skillId: skill.id })),
          },
        },
      },
    });

    promises.push(promise);
  }

  await runInBatches(promises);
}
