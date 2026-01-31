import type { GetRequestQuery, GetResponseBody } from '@/types/server/helpers';

export type JoinRequestsList = GetResponseBody<'/admin/join-requests/', 'get'>;
export type JoinRequestsListQuery = GetRequestQuery<
  '/admin/join-requests/',
  'get'
>;

export type JoinRequest = JoinRequestsList['data'][number];
