import type { GetResponseBody } from '@/types/server/helpers';

export type HomeResponse = GetResponseBody<'/admin/home/', 'get'>;
