import type { GetRequestBody, GetResponseBody } from '@/types/server/helpers';

export type SignInRequestBody = GetRequestBody<
  '/user/accounts/sign-in',
  'post'
>;

export type SignUpRequestBody = GetRequestBody<
  '/user/accounts/sign-up',
  'post'
>;

export type SignUpResponseBody = GetResponseBody<
  '/user/accounts/sign-up',
  'post',
  201
>;

export type SessionResponseBody = GetResponseBody<
  '/user/accounts/session',
  'get'
>;
