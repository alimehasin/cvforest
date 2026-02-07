import type { GetRequestBody } from '@/types/server/helpers';

export type LoginRequestBody = GetRequestBody<'/user/accounts/login', 'post'>;
