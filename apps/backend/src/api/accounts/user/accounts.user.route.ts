import { Elysia } from 'elysia';
import { init } from '@/init';
import { mustBeAuthed } from '@/plugins/better-auth';
import { auth } from '@/utils/auth';
import { HttpError } from '@/utils/error';
import { UserAccountsModel } from './accounts.user.model';
import { userAccountsService } from './accounts.user.service';

export const accounts = new Elysia({ prefix: '/accounts' })
  .use(init)
  .model(UserAccountsModel)

  .post(
    '/register',
    async ({ body, t }) => {
      const result = await userAccountsService.registerUser(t, body);

      return {
        message: t({
          en: 'Registration successful. Please check your email for verification code.',
          ar: 'تم التسجيل بنجاح. يرجى التحقق من بريدك الإلكتروني للحصول على رمز التحقق.',
        }),
        user: {
          id: result.id,
          name: result.name,
          email: result.email,
        },
      };
    },
    {
      body: 'UserAccountsRegisterBody',
      response: {
        201: 'UserAccountsRegisterResponse',
      },
    },
  )

  .post(
    '/verify-email-otp',
    async ({ t, body: { email, otp } }) => {
      // Verify OTP using Better Auth
      const result = await auth.api.verifyEmailOTP({
        body: {
          email,
          otp,
        },
      });

      if (!result || !result.user) {
        throw new HttpError({
          statusCode: 400,
          message: t({
            en: 'Invalid or expired verification code',
            ar: 'رمز التحقق غير صالح أو منتهي الصلاحية',
          }),
        });
      }

      return {
        success: true,
        userId: result.user.id,
        email: result.user.email,
      };
    },
    {
      body: 'UserAccountsVerifyOtpBody',
      response: {
        200: 'UserAccountsVerifyOtpResponse',
      },
    },
  )

  .post(
    '/set-password',
    async ({ t, body: { email, password } }) => {
      const prisma = (await import('@db/client')).prisma;

      // Verify user exists and email is verified
      const user = await prisma.user.findUnique({
        where: { email },
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

      if (!user.emailVerified) {
        throw new HttpError({
          statusCode: 400,
          message: t({
            en: 'Email not verified',
            ar: 'البريد الإلكتروني غير مُحقق',
          }),
        });
      }

      // Check if account already exists
      const existingAccount = await prisma.account.findFirst({
        where: { userId: user.id },
      });

      if (existingAccount) {
        throw new HttpError({
          statusCode: 409,
          message: t({
            en: 'Password already set',
            ar: 'تم تعيين كلمة المرور بالفعل',
          }),
        });
      }

      // Use Bun's built-in password hashing
      const hashedPassword = await Bun.password.hash(password, {
        algorithm: 'bcrypt',
        cost: 10,
      });

      await prisma.account.create({
        data: {
          userId: user.id,
          accountId: user.email,
          providerId: 'credential',
          password: hashedPassword,
        },
      });

      return {
        success: true,
        message: t({
          en: 'Password set successfully',
          ar: 'تم تعيين كلمة المرور بنجاح',
        }),
      };
    },
    {
      body: 'UserAccountsSetPasswordBody',
      response: {
        200: 'UserAccountsSetPasswordResponse',
      },
    },
  )

  .use(mustBeAuthed)

  .get(
    '/session',
    async ({ t, headers }) => {
      const res = await auth.api.getSession({
        headers: headers as HeadersInit,
      });

      if (!res) {
        throw new HttpError({
          statusCode: 401,
          message: t({
            en: 'Unable to fetch your session',
            ar: 'فشل جلب تفاصيل جلستك',
          }),
        });
      }

      return res;
    },
    {
      response: {
        200: 'UserAccountsSessionResponse',
      },
    },
  )

  .get(
    '/profile',
    async ({ t, user }) => {
      return userAccountsService.getProfile(t, user.id);
    },
    {
      response: {
        200: 'UserAccountsProfileResponse',
      },
    },
  )

  .patch(
    '/profile',
    async ({ body, user }) => {
      return userAccountsService.updateProfile(user.id, body);
    },
    {
      body: 'UserAccountsProfileUpdateBody',
      response: {
        200: 'UserAccountsProfileUpdateResponse',
      },
    },
  )

  .post(
    '/sign-out',
    async ({ headers }) => {
      const res = await auth.api.signOut({
        asResponse: true,
        headers: headers as HeadersInit,
      });

      return res;
    },
    {},
  )

  .post(
    'revoke-session',
    async ({ t, headers, body: { token } }) => {
      await auth.api.revokeSession({
        headers: headers as HeadersInit,
        body: { token },
      });

      return {
        message: t({
          en: 'Session revoked successfully',
          ar: 'تم إلغاء الجلست بنجاح',
        }),
      };
    },
    {
      body: 'UserAccountsRevokeSessionBody',
      response: {
        200: 'UserAccountsRevokeSessionResponse',
      },
    },
  )

  .post(
    '/revoke-other-sessions',
    async ({ t, headers }) => {
      await auth.api.revokeOtherSessions({
        headers: headers as HeadersInit,
      });

      return {
        message: t({
          en: 'Other sessions revoked successfully',
          ar: 'تم إلغاء الجلسات الأخرى بنجاح',
        }),
      };
    },
    {
      response: {
        200: 'UserAccountsRevokeOtherSessionsResponse',
      },
    },
  );
