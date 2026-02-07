import { prisma } from '@db/client';
import type {
  AvailabilityType,
  Prisma,
  WorkLocationType,
} from '@db/gen/prisma/client';
import type { TranslationFn } from '@/types';
import { HttpError } from '@/utils/error';
import { parsePaginationProps, parseSortingProps } from '@/utils/helpers';
import type { UserUsersModel } from './users.user.model';

export const userUsersService = {
  async list(query: typeof UserUsersModel.UserUsersListQuery.static) {
    const skillIds = query.skillIds
      ? Array.isArray(query.skillIds)
        ? query.skillIds
        : [query.skillIds]
      : undefined;

    const where: Prisma.UserWhereInput = {
      status: 'Approved',
      availableForHire: true,

      ...(query.search && {
        OR: [
          { name: { contains: query.search, mode: 'insensitive' } },
          { jobTitle: { contains: query.search, mode: 'insensitive' } },
        ],
      }),

      ...(query.governorateId && {
        governorateId: query.governorateId,
      }),

      ...(skillIds && {
        userSkills: { some: { skillId: { in: skillIds } } },
      }),

      ...(query.availabilityType && {
        availabilityType: query.availabilityType as AvailabilityType,
      }),

      ...(query.workLocationType && {
        workLocationType: query.workLocationType as WorkLocationType,
      }),

      ...(query.experienceMin !== undefined && {
        experienceInYears: { gte: query.experienceMin },
      }),

      ...(query.experienceMax !== undefined && {
        experienceInYears: {
          ...(query.experienceMin !== undefined && {
            gte: query.experienceMin,
          }),
          lte: query.experienceMax,
        },
      }),
    };

    const total = await prisma.user.count({ where });

    const data = await prisma.user.findMany({
      ...parsePaginationProps(query),
      ...parseSortingProps(query),

      where,
      include: {
        avatar: true,
        governorate: true,
        userSkills: {
          include: {
            skill: true,
          },
        },
      },
    });

    return { total, data };
  },

  async getById(id: string, t: TranslationFn) {
    const user = await prisma.user.findUnique({
      where: { id, status: 'Approved' },
      include: {
        avatar: true,
        governorate: true,
        userSkills: { include: { skill: true } },
      },
    });

    if (!user) {
      throw new HttpError({
        statusCode: 404,
        message: t({
          en: 'User not found',
          ar: 'المستخدم غير موجود',
        }),
      });
    }

    return user;
  },
};
