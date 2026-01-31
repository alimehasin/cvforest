import type { GetRequestBody, GetResponseBody } from '@/types/server/helpers';

export type SessionResponseBody = GetResponseBody<
  '/admin/accounts/session',
  'get'
>;
export type RevokeSessionResponseBody = GetRequestBody<
  '/admin/accounts/revoke-session',
  'post'
>;
export type RevokeOtherSessionsResponseBody = GetRequestBody<
  '/admin/accounts/revoke-other-sessions',
  'post'
>;
export type FileUploadBody = GetRequestBody<'/admin/files/upload', 'post'>;
export type FileUploadResponseBody = GetResponseBody<
  '/admin/files/upload',
  'post',
  201
>;

export type ProfileUpdateBody = GetRequestBody<
  '/admin/accounts/profile',
  'patch'
>;
export type ProfileResponseBody = GetResponseBody<
  '/admin/accounts/profile',
  'get'
>;
