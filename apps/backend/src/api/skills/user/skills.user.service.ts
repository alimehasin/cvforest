import { prisma } from '@db/client';
import type { UserSkillsModel } from './skills.user.model';

export const userSkillsService = {
  async list(): Promise<typeof UserSkillsModel.UserSkillsListResponse.static> {
    return prisma.skill.findMany();
  },
};
