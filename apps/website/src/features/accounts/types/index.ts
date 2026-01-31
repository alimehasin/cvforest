import type { GetRequestBody, GetResponseBody } from '@/types/server/helpers';

export type SendOtpRequestBody = GetRequestBody<
  '/user/accounts/send-otp',
  'post'
>;
export type SendOtpResponseBody = GetResponseBody<
  '/user/accounts/send-otp',
  'post'
>;

export type VerifyOtpRequestBody = GetRequestBody<
  '/user/accounts/verify-otp',
  'post'
>;
export type VerifyOtpResponseBody = GetResponseBody<
  '/user/accounts/verify-otp',
  'post'
>;
