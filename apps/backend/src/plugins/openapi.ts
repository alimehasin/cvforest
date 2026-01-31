import { openapi as elysiaOpenapi } from '@elysiajs/openapi';
import { env } from '../env';

export const openapi = elysiaOpenapi({
  path: '/docs',
  enabled: env.OPENAPI_ACCESS_MODE === 'public',
});
