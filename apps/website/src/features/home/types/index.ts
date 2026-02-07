import type { GetRequestQuery, GetResponseBody } from '@/types/server/helpers';

export type UserListResponse = GetResponseBody<'/user/users/', 'get'>;
export type UserListQuery = GetRequestQuery<'/user/users/', 'get'>;
export type UserListItem = UserListResponse['data'][number];
