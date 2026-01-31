import { prisma } from '@db/client';
import type { Prisma } from '@db/gen/prisma/client';
import { parsePaginationProps, parseSortingProps } from '@/utils/helpers';
import type { AdminGovernoratesModel } from './governorates.admin.model';

export const adminGovernoratesService = {
  async list(
    query: typeof AdminGovernoratesModel.AdminGovernoratesListQuery.static,
  ) {
    const where: Prisma.GovernorateWhereInput = {
      name: { contains: query.search, mode: 'insensitive' },
    };

    const total = await prisma.governorate.count({ where });
    const data = await prisma.governorate.findMany({
      ...parsePaginationProps(query),
      ...parseSortingProps(query),

      where,
    });

    return { total, data };
  },

  async create(
    body: typeof AdminGovernoratesModel.AdminGovernoratesCreateBody.static,
  ) {
    return prisma.governorate.create({ data: body });
  },

  async update(
    params: typeof AdminGovernoratesModel.AdminGovernoratesUpdateParams.static,
    body: typeof AdminGovernoratesModel.AdminGovernoratesUpdateBody.static,
  ) {
    return prisma.governorate.update({ where: params, data: body });
  },

  async delete(
    params: typeof AdminGovernoratesModel.AdminGovernoratesDeleteParams.static,
  ) {
    return prisma.governorate.delete({ where: params });
  },
};
