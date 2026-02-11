import { prisma } from '@db/client';
import type { Prisma } from '@db/gen/prisma/client';
import { userAccountsService } from '@/api/accounts/user/accounts.user.service';
import type { TranslationFn } from '@/types';
import { HttpError } from '@/utils/error';
import { parsePaginationProps, parseSortingProps } from '@/utils/helpers';
import type { UserCvsModel } from './cvs.user.model';

export const userCvsService = {
  async list(query: typeof UserCvsModel.UserCvsListQuery.static) {
    // Normalize skillIds to array
    const skillIdsArray =
      query.skillIds === undefined
        ? undefined
        : Array.isArray(query.skillIds)
          ? query.skillIds
          : [query.skillIds];

    const where: Prisma.CvWhereInput = {
      status: 'Approved',

      ...(query.search && {
        OR: [
          { jobTitle: { contains: query.search, mode: 'insensitive' } },
          {
            user: {
              OR: [
                { name: { contains: query.search, mode: 'insensitive' } },
                { email: { contains: query.search, mode: 'insensitive' } },
              ],
            },
          },
        ],
      }),

      ...(skillIdsArray &&
        skillIdsArray.length > 0 && {
          AND: skillIdsArray.map((skillId) => ({
            userSkills: { some: { skillId } },
          })),
        }),

      // Filter by governorate (through user relation)
      ...(query.governorateId && {
        user: { governorateId: query.governorateId },
      }),

      // Filter by availability type
      ...(query.availabilityType && {
        availabilityType: query.availabilityType,
      }),

      // Filter by work location type
      ...(query.workLocationType && {
        workLocationType: query.workLocationType,
      }),

      // Filter by experience range
      ...(query.experienceMin !== undefined && {
        experienceInYears: {
          gte: query.experienceMin,
        },
      }),

      ...(query.experienceMax !== undefined && {
        experienceInYears: {
          lte: query.experienceMax,
        },
      }),

      // Filter by expected salary currency
      ...(query.salaryCurrency && {
        expectedSalaryCurrency: query.salaryCurrency,
      }),

      // Filter by available for hire
      ...(query.availableForHire !== undefined && {
        availableForHire: query.availableForHire,
      }),
    };

    const total = await prisma.cv.count({ where });

    const data = await prisma.cv.findMany({
      ...parsePaginationProps(query),
      ...parseSortingProps(query),

      where,
      include: {
        userSkills: { include: { skill: true } },
        user: { include: { avatar: true, governorate: true } },
      },
    });

    return { total, data };
  },

  async getById(
    id: string,
    t: TranslationFn,
  ): Promise<typeof UserCvsModel.UserCvsGetResponse.static> {
    const cv = await prisma.cv.findUnique({
      where: { id },
      include: {
        userSkills: { include: { skill: true } },
        user: { include: { avatar: true, governorate: true } },
      },
    });

    if (!cv) {
      throw new HttpError({
        statusCode: 404,
        message: t({
          en: 'CV not found',
          ar: 'السيرة الذاتية غير موجودة',
        }),
      });
    }

    if (cv.status !== 'Approved') {
      throw new HttpError({
        statusCode: 404,
        message: t({
          en: 'CV not found',
          ar: 'السيرة الذاتية غير موجودة',
        }),
      });
    }

    return cv;
  },

  async create(
    t: TranslationFn,
    userId: string,
    body: typeof UserCvsModel.UserCvsCreateBody.static,
  ): Promise<typeof UserCvsModel.UserCvsCreateResponse.static> {
    const { profile, ...cvBody } = body;

    if (
      cvBody.expectedSalaryMin !== undefined &&
      cvBody.expectedSalaryMax !== undefined &&
      cvBody.expectedSalaryMin > cvBody.expectedSalaryMax
    ) {
      throw new HttpError({
        statusCode: 400,
        message: t({
          en: 'Min salary must be less than or equal to max salary.',
          ar: 'الحد الأدنى للراتب يجب أن يكون أقل من أو يساوي الحد الأقصى.',
        }),
      });
    }

    const existing = await prisma.cv.findUnique({
      where: { userId },
    });

    if (existing) {
      throw new HttpError({
        statusCode: 409,
        message: t({
          en: 'You already have a CV. Each account can have only one CV.',
          ar: 'لديك سيرة ذاتية بالفعل. يمكن أن يكون لكل حساب سيرة ذاتية واحدة فقط.',
        }),
      });
    }

    if (profile && Object.keys(profile).length > 0) {
      await userAccountsService.updateProfile(userId, profile);
    }

    const cv = await prisma.cv.create({
      data: {
        userId,
        jobTitle: cvBody.jobTitle,
        experienceInYears: cvBody.experienceInYears,
        expectedSalaryMin: cvBody.expectedSalaryMin,
        expectedSalaryMax: cvBody.expectedSalaryMax,
        expectedSalaryCurrency: cvBody.expectedSalaryCurrency,
        availabilityType: cvBody.availabilityType,
        workLocationType: cvBody.workLocationType,
        bio: cvBody.bio,
        githubUrl: cvBody.githubUrl,
        linkedinUrl: cvBody.linkedinUrl,
        portfolioUrl: cvBody.portfolioUrl,
        availableForHire: cvBody.availableForHire,
        userSkills: { create: cvBody.skillIds.map((skillId) => ({ skillId })) },
      },
      include: {
        userSkills: { include: { skill: true } },
        user: { include: { avatar: true, governorate: true } },
      },
    });

    return cv;
  },
};
