import type { GetResponseBody } from '@/types/server/helpers';

export type UserDetailResponse = GetResponseBody<'/user/cvs/{id}', 'get'>;

export interface GithubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export type GithubHeatmapData = Record<string, number>;
