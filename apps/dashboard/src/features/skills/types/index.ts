import type {
  GetRequestBody,
  GetRequestQuery,
  GetResponseBody,
} from '@/types/server/helpers';

export type SkillsList = GetResponseBody<'/admin/skills/', 'get'>;
export type SkillsListQuery = GetRequestQuery<'/admin/skills/', 'get'>;
export type SkillsCreateBody = GetRequestBody<'/admin/skills/', 'post'>;
export type SkillsUpdateBody = GetRequestBody<'/admin/skills/{id}', 'patch'>;

export type Skill = SkillsList['data'][number];
