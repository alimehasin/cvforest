import type { GetRequestBody } from '@/types/server/helpers';

export type SetPasswordRequestBody = GetRequestBody<
  '/user/accounts/set-password',
  'post'
>;

export type VerifyEmailOtpRequestBody = GetRequestBody<
  '/user/accounts/verify-email-otp',
  'post'
>;
