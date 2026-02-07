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
          en: 'Registration successful. Please check your email for the verification link.',
          ar: 'تم التسجيل بنجاح. يرجى التحقق من بريدك الإلكتروني للحصول على رابط التحقق.',
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
    '/login',
    async ({ body: { email, password } }) => {
      const res = await auth.api.signInEmail({
        asResponse: true,
        body: { email, password },
      });

      return res;
    },
    {
      body: 'UserAccountsLoginBody',
      response: {
        200: 'UserAccountsLoginResponse',
      },
    },
  )

  .get(
    '/verify-email',
    async ({ t, query: { token } }) => {
      const res = await auth.api.verifyEmail({ query: { token } }).catch(() => {
        throw new HttpError({
          statusCode: 400,
          message: t({
            en: 'Invalid token',
            ar: 'الرمز غير صحيح',
          }),
        });
      });

      if (!res) {
        throw new HttpError({
          statusCode: 400,
          message: t({
            en: 'Invalid token',
            ar: 'الرمز غير صحيح',
          }),
        });
      }

      return {
        message: t({
          en: 'Email verified successfully',
          ar: 'تم التحقق من البريد الإلكتروني بنجاح',
        }),
      };
    },
    {
      query: 'VerifyEmailQuery',
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
