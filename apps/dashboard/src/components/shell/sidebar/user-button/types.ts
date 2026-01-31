import type { GetResponseBody } from '@/types/server/helpers';

export type ProfileResponseBody = GetResponseBody<
  '/admin/accounts/profile',
  'get'
>;
