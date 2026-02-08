import type { GetRequestBody, GetResponseBody } from '@/types/server/helpers';

export type UserDetailResponse = GetResponseBody<'/user/cvs/{id}', 'get'>;

export type UserCvsCreateBody = GetRequestBody<'/user/cvs/', 'post'>;
export type UserCvsCreateResponseBody = GetResponseBody<
  '/user/cvs/',
  'post',
  201
>;

export type GovernorateListResponseBody = GetResponseBody<
  '/user/governorates/',
  'get'
>;

export type SkillListResponseBody = GetResponseBody<'/user/skills/', 'get'>;

export interface GithubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export type GithubHeatmapData = Record<string, number>;
