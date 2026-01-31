import type { GetRequestBody, GetResponseBody } from '@/types/server/helpers';

export type SessionResponseBody = GetResponseBody<
  '/user/accounts/session',
  'get'
>;
export type RevokeSessionResponseBody = GetRequestBody<
  '/user/accounts/revoke-session',
  'post'
>;
export type RevokeOtherSessionsResponseBody = GetRequestBody<
  '/user/accounts/revoke-other-sessions',
  'post'
>;
export type FileUploadBody = GetRequestBody<'/user/files/upload', 'post'>;
export type FileUploadResponseBody = GetResponseBody<
  '/user/files/upload',
  'post',
  201
>;

export type ProfileUpdateBody = GetRequestBody<
  '/user/accounts/profile',
  'patch'
>;
export type ProfileResponseBody = GetResponseBody<
  '/user/accounts/profile',
  'get'
>;
