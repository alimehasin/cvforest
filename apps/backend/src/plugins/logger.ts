import { logger as elysiaLogger } from '@bogeychan/elysia-logger';
import { env } from '@/env';

export const logger = elysiaLogger({
  enabled: env.NODE_ENV !== 'development',
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});
