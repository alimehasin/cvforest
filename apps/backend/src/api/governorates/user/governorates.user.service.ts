import { prisma } from '@db/client';
import type { UserGovernoratesModel } from './governorates.user.model';

export const userGovernoratesService = {
  async list(): Promise<
    typeof UserGovernoratesModel.UserGovernoratesListResponse.static
  > {
    return prisma.governorate.findMany();
  },
};
