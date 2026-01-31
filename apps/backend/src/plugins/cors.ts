import { cors as elysiaCors } from '@elysiajs/cors';
import { env } from '@/env';

export const cors = elysiaCors({
  credentials: true,
  origin: env.TRUSTED_ORIGINS,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});
