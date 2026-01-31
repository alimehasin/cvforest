import type { GetRequestBody, GetResponseBody } from '@/types/server/helpers';

export type RegisterRequestBody = GetRequestBody<
  '/user/accounts/register',
  'post'
>;

export type RegisterResponseBody = GetResponseBody<
  '/user/accounts/register',
  'post',
  201
>;

export type GovernorateListResponseBody = GetResponseBody<
  '/user/governorates/',
  'get'
>;

export type SkillListResponseBody = GetResponseBody<'/user/skills/', 'get'>;
