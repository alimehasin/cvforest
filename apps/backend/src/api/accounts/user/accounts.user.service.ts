import { prisma } from '@db/client';
import type { TranslationFn } from '@/types';
import { auth } from '@/utils/auth';
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

  async registerUser(
    t: TranslationFn,
    data: typeof UserAccountsModel.UserAccountsRegisterBody.static,
  ) {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new HttpError({
        statusCode: 409,
        message: t({
          en: 'Email already registered',
          ar: 'البريد الإلكتروني مسجل بالفعل',
        }),
      });
    }

    // Check if phone number already exists (if provided)
    if (data.phoneNumber) {
      const existingPhone = await prisma.user.findUnique({
        where: { phoneNumber: data.phoneNumber },
      });

      if (existingPhone) {
        throw new HttpError({
          statusCode: 409,
          message: t({
            en: 'Phone number already registered',
            ar: 'رقم الهاتف مسجل بالفعل',
          }),
        });
      }
    }

    const { user } = await auth.api.createUser({
      body: {
        email: data.email,
        name: data.name,
        password: data.password,
        role: 'user',

        data: {
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          birthDate: data.birthDate,
          avatarId: data.avatarId,
        },
      },
    });

    await auth.api.sendVerificationEmail({
      body: { email: user.email },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
};
