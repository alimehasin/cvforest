import type { GetRequestBody } from '@/types/server/helpers';

export type SignInRequestBody = GetRequestBody<
  '/admin/accounts/sign-in',
  'post'
>;
