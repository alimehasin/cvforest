import { APIError } from 'better-auth';
import { Elysia } from 'elysia';
import { init } from '@/init';
import { mustBeAuthed } from '@/plugins/better-auth';
import { auth } from '@/utils/auth';
import { HttpError } from '@/utils/error';
import { setBetterAuthHeaders } from '../accounts.helpers';
import { UserAccountsModel } from './accounts.user.model';
import { userAccountsService } from './accounts.user.service';

export const accounts = new Elysia({ prefix: '/accounts' })
  .use(init)
  .model(UserAccountsModel)

  .post(
    '/send-otp',
    async ({ t, set, body: { phoneNumber } }) => {
      const res = await auth.api
        .sendPhoneNumberOTP({
          returnHeaders: true,
          body: { phoneNumber },
        })
        .catch(() => {
          throw new HttpError({
            statusCode: 400,
            message: t({
              en: 'Failed to send OTP',
              ar: 'فشل إرسال رمز التحقق',
            }),
          });
        });

      setBetterAuthHeaders(set, res.headers);

      return {
        message: t({
          en: 'OTP sent successfully',
          ar: 'تم إرسال رمز التحقق بنجاح',
        }),
      };
    },
    {
      body: 'UserAccountsSendOtpBody',
      response: {
        200: 'UserAccountsSendOtpResponse',
      },
    },
  )

  .post(
    '/verify-otp',
    async ({ t, set, body: { phoneNumber, code } }) => {
      const res = await auth.api
        .verifyPhoneNumber({
          returnHeaders: true,
          body: { phoneNumber, code },
        })
        .catch((e) => {
          if (e instanceof APIError) {
            if (e.body?.code === 'INVALID_OTP') {
              throw new HttpError({
                statusCode: 400,
                message: t({
                  en: 'Invalid OTP',
                  ar: 'رمز التحقق غير صالح',
                }),
              });
            }

            if (e.body?.code === 'OTP_EXPIRED') {
              throw new HttpError({
                statusCode: 400,
                message: t({
                  en: 'Expired OTP',
                  ar: 'رمز التحقق قد انتهى',
                }),
              });
            }

            if (e.body?.code === 'OTP_NOT_FOUND') {
              throw new HttpError({
                statusCode: 400,
                message: t({
                  en: 'OTP not found',
                  ar: 'رمز التحقق غير موجود',
                }),
              });
            }

            if (e.body?.code === 'TOO_MANY_ATTEMPTS') {
              throw new HttpError({
                statusCode: 400,
                message: t({
                  en: 'OTP rate limit exceeded',
                  ar: 'تم تجاوز حد التحقق من رمز التحقق',
                }),
              });
            }
          }

          throw new HttpError({
            statusCode: 500,
            message: t({
              en: 'Something went wrong',
              ar: 'حدث خطأ ما',
            }),
          });
        });

      setBetterAuthHeaders(set, res.headers);

      return {
        message: t({
          en: 'OTP verified successfully',
          ar: 'تم تحقق رمز التحقق بنجاح',
        }),
      };
    },
    {
      body: 'UserAccountsVerifyOtpBody',
      response: {
        200: 'UserAccountsVerifyOtpResponse',
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
