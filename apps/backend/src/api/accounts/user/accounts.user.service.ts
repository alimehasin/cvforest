import { prisma } from '@db/client';
import type { TranslationFn } from '@/types';
import { HttpError } from '@/utils/error';
import type { UserAccountsModel } from './accounts.user.model';

export const userAccountsService = {
  async getProfile(t: TranslationFn, userId: string) {
    const profile = await prisma.user.findUnique({
      where: { id: userId },
      include: { avatar: true, accounts: true, sessions: true },
    });

    if (!profile) {
      throw new HttpError({
        statusCode: 404,
        message: t({
          en: 'Profile not found',
          ar: 'الحساب غير موجود',
        }),
      });
    }

    return profile;
  },

  async updateProfile(
    userId: string,
    data: typeof UserAccountsModel.UserAccountsProfileUpdateBody.static,
  ) {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  },
};
