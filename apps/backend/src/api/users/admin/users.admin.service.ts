import { prisma } from '@db/client';
import type { Prisma } from '@db/gen/prisma/client';
import { parsePaginationProps, parseSortingProps } from '@/utils/helpers';
import type { AdminUsersModel } from './users.admin.model';

export const adminUsersService = {
  async list(query: typeof AdminUsersModel.AdminUsersListQuery.static) {
    const where: Prisma.UserWhereInput = {
      name: { contains: query.search, mode: 'insensitive' },
    };

    const total = await prisma.user.count({ where });
    const data = await prisma.user.findMany({
      ...parsePaginationProps(query),
      ...parseSortingProps(query),

      where,
    });

    return { total, data };
  },
};
