import type {
  GetRequestBody,
  GetRequestQuery,
  GetResponseBody,
} from '@/types/server/helpers';

export type GovernoratesList = GetResponseBody<'/admin/governorates/', 'get'>;
export type GovernoratesListQuery = GetRequestQuery<
  '/admin/governorates/',
  'get'
>;
export type GovernoratesCreateBody = GetRequestBody<
  '/admin/governorates/',
  'post'
>;
export type GovernoratesUpdateBody = GetRequestBody<
  '/admin/governorates/{id}',
  'patch'
>;

export type Governorate = GovernoratesList['data'][number];
