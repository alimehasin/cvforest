import { Elysia } from 'elysia';
import { init } from '@/init';
import { mustBeAdmin } from '@/plugins/better-auth';
import { auth } from '@/utils/auth';
import { HttpError } from '@/utils/error';
import { setBetterAuthHeaders } from '../accounts.helpers';
import { AdminAccountsModel } from './accounts.admin.model';
import { adminAccountsService } from './accounts.admin.service';

export const accounts = new Elysia({ prefix: '/accounts' })
  .use(init)
  .model(AdminAccountsModel)

  .post(
    '/sign-in',
    async ({ t, set, body: { email, password } }) => {
      const res = await auth.api
        .signInEmail({
          returnHeaders: true,
          body: { email, password },
        })
        .catch(() => {
          throw new HttpError({
            statusCode: 401,
            message: t({
              en: 'Invalid email or password',
              ar: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
            }),
          });
        });

      setBetterAuthHeaders(set, res.headers);

      return {
        token: res.response.token,
        user: res.response.user,
      };
    },
    {
      body: 'AdminAccountsSignInBody',
      response: {
        200: 'AdminAccountsSignInResponse',
      },
    },
  )

  .use(mustBeAdmin)

  .get(
    '/profile',
    async ({ t, user }) => {
      return adminAccountsService.getProfile(t, user.id);
    },
    {
      response: {
        200: 'AdminAccountsProfileResponse',
      },
    },
  )

  .patch(
    '/profile',
    async ({ body, user }) => {
      return adminAccountsService.updateProfile(user.id, body);
    },
    {
      body: 'AdminAccountsProfileUpdateBody',
      response: {
        200: 'AdminAccountsProfileUpdateResponse',
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
        200: 'AdminAccountsSessionResponse',
      },
    },
  )

  .get(
    '/sessions',
    async ({ t, headers }) => {
      const res = await auth.api.listSessions({
        headers: headers as HeadersInit,
      });

      if (!res) {
        throw new HttpError({
          statusCode: 401,
          message: t({
            en: 'Unable to fetch your sessions',
            ar: 'فشل جلب تفاصيل جلستك',
          }),
        });
      }

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
      body: 'AdminAccountsRevokeSessionBody',
      response: {
        200: 'AdminAccountsRevokeSessionResponse',
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
        200: 'AdminAccountsRevokeOtherSessionsResponse',
      },
    },
  );
