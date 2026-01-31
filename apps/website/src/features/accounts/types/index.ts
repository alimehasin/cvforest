import type { GetRequestBody } from '@/types/server/helpers';

export type VerifyEmailOtpRequestBody = GetRequestBody<
  '/user/accounts/verify-email-otp',
  'post'
>;
