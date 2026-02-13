import {
  AvailabilityType,
  Currency,
  CvStatus,
  type PrismaClient,
  WorkLocationType,
} from '@db/gen/prisma/client';
import { logSeedTable, runInBatches } from '@db/seed/utils/helpers';
import { dunna } from 'dunna';
import { bios } from '../data/bios';
import { jobTitles } from '../data/jobTitles';

export async function seedCvs(prisma: PrismaClient) {
  logSeedTable('cvs');

  const users = await prisma.user.findMany();
  const skills = await prisma.skill.findMany();

  const promises = [];

  for (const user of users) {
    if (dunna.basic.boolean({ likelihood: 25 })) {
      continue;
    }

    const promise = prisma.cv.create({
      data: {
        userId: user.id,
        jobTitle: dunna.basic.choice(jobTitles),
        experienceInYears: dunna.basic.integer({ min: 0, max: 10 }),
        expectedSalaryMin: dunna.basic.integer({ min: 0, max: 100000 }),
        expectedSalaryMax: dunna.basic.integer({ min: 0, max: 100000 }),
        expectedSalaryCurrency: dunna.basic.choice(Object.values(Currency)),
        availabilityTypes: dunna.basic.pick(
          dunna.basic.integer({ min: 1, max: 3 }),
          Object.values(AvailabilityType),
        ),
        workLocationTypes: dunna.basic.pick(
          dunna.basic.integer({ min: 1, max: 3 }),
          Object.values(WorkLocationType),
        ),
        availableForHire: dunna.basic.boolean(),
        bio: dunna.basic.choice(bios),
        githubUrl: 'https://github.com/alimehasin',
        linkedinUrl: 'https://linkedin.com/alimehasin',
        portfolioUrl: 'https://alimehasin.com',

        status: dunna.basic.boolean()
          ? 'Approved'
          : dunna.basic.choice(Object.values(CvStatus)),

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
