import type { GetRequestQuery, GetResponseBody } from '@/types/server/helpers';

export type CvListResponse = GetResponseBody<'/user/cvs/', 'get'>;
export type CvListQuery = GetRequestQuery<'/user/cvs/', 'get'>;
export type CvListItem = CvListResponse['data'][number];
export type UserListItem = CvListItem;
