import { prisma } from '@db/client';
import type { Prisma } from '@db/gen/prisma/client';
import { parsePaginationProps, parseSortingProps } from '@/utils/helpers';
import type { UserUsersModel } from './users.user.model';

export const userUsersService = {
  async list(query: typeof UserUsersModel.UserUsersListQuery.static) {
    const where: Prisma.UserWhereInput = {
      status: 'Approved',
      availableForHire: true,
      ...(query.search && {
        OR: [
          { name: { contains: query.search, mode: 'insensitive' } },
          { jobTitle: { contains: query.search, mode: 'insensitive' } },
        ],
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
};
