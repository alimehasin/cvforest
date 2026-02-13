import { Elysia } from 'elysia';
import { env } from '@/env';
import { init } from '@/init';
import { mustBeUser } from '@/plugins/better-auth';
import { genRateLimit } from '@/plugins/rate-limit';
import { auth } from '@/utils/auth';
import { HttpError } from '@/utils/error';
import { setBetterAuthHeaders } from '../accounts.helpers';
import { UserAccountsModel } from './accounts.user.model';
import { userAccountsService } from './accounts.user.service';

export const accounts = new Elysia({ prefix: '/accounts' })
  .use(init)
  .model(UserAccountsModel)

  .group('', (app) => {
    return (
      app

        // Rate Limiter
        .use(genRateLimit({ max: 2, durationInSeconds: 60 }))

        .post(
          '/sign-up',
          async ({ body, t }) => {
            const result = await userAccountsService.signUpUser(t, body);

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
            body: 'UserAccountsSignUpBody',
            response: {
              201: 'UserAccountsSignUpResponse',
            },
          },
        )
    );
  })

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

      return res;
    },
    {
      body: 'UserAccountsSignInBody',
      response: {
        200: 'UserAccountsSignInResponse',
      },
    },
  )

  .get(
    '/verify-email',
    async ({ set, redirect, query: { token } }) => {
      try {
        const res = await auth.api.verifyEmail({
          returnHeaders: true,
          query: { token },
        });

        if (!res) {
          return redirect(env.BETTER_AUTH_VERIFICATION_CALLBACK_FAILED_URL);
        }

        setBetterAuthHeaders(set, res.headers);
        return redirect(env.BETTER_AUTH_VERIFICATION_CALLBACK_SUCCESS_URL);
      } catch {
        return redirect(env.BETTER_AUTH_VERIFICATION_CALLBACK_FAILED_URL);
      }
    },
    {
      query: 'VerifyEmailQuery',
    },
  )

  .use(mustBeUser)

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

      const user = await userAccountsService.getUser(t, res.session.userId);

      return {
        session: res.session,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          cv: user.cv,
        },
      };
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
