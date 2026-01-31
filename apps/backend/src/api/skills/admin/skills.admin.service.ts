import { prisma } from '@db/client';
import type { Prisma } from '@db/gen/prisma/client';
import { parsePaginationProps, parseSortingProps } from '@/utils/helpers';
import type { AdminSkillsModel } from './skills.admin.model';

export const adminSkillsService = {
  async list(query: typeof AdminSkillsModel.AdminSkillsListQuery.static) {
    const where: Prisma.SkillWhereInput = {
      name: { contains: query.search, mode: 'insensitive' },
    };

    const total = await prisma.skill.count({ where });
    const data = await prisma.skill.findMany({
      ...parsePaginationProps(query),
      ...parseSortingProps(query),

      where,
    });

    return { total, data };
  },

  async create(body: typeof AdminSkillsModel.AdminSkillsCreateBody.static) {
    return prisma.skill.create({ data: body });
  },

  async update(
    params: typeof AdminSkillsModel.AdminSkillsUpdateParams.static,
    body: typeof AdminSkillsModel.AdminSkillsUpdateBody.static,
  ) {
    return prisma.skill.update({ where: params, data: body });
  },

  async delete(params: typeof AdminSkillsModel.AdminSkillsDeleteParams.static) {
    return prisma.skill.delete({ where: params });
  },
};
