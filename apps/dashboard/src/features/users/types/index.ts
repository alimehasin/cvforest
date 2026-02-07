import type { GetRequestQuery, GetResponseBody } from '@/types/server/helpers';

export type UsersList = GetResponseBody<'/admin/users/', 'get'>;
export type UsersListQuery = GetRequestQuery<'/admin/users/', 'get'>;
export type User = UsersList['data'][number];
