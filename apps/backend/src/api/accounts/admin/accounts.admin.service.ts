import { prisma } from '@db/client';
import type { TranslationFn } from '@/types';
import { HttpError } from '@/utils/error';
import type { AdminAccountsModel } from './accounts.admin.model';

export const adminAccountsService = {
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
    data: typeof AdminAccountsModel.AdminAccountsProfileUpdateBody.static,
  ) {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  },
};
