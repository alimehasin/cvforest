import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,

  server: {
    // Base
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),

    // CORS
    TRUSTED_ORIGINS: z
      .string()
      .transform((str) => str.split(',').map((s) => s.trim())),

    // Database
    DATABASE_URL: z.string(),

    // Better Auth
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_BASE_URL: z.string(),
    BETTER_AUTH_COOKIE_DOMAIN: z.string(),
    BETTER_AUTH_VERIFICATION_CALLBACK_URL: z.url(),
    BETTER_AUTH_VERIFICATION_CALLBACK_SUCCESS_URL: z.url(),
    // Storage
    STORAGE_REGION: z.string(),
    STORAGE_ENDPOINT: z.string(),
    STORAGE_ACCESS_KEY: z.string(),
    STORAGE_SECRET_KEY: z.string(),
    STORAGE_BUCKET_NAME: z.string(),

    // OpenApi
    OPENAPI_ACCESS_MODE: z.enum(['public', 'hidden']).default('hidden'),

    // Resend
    RESEND_API_KEY: z.string(),
    RESEND_FROM_ADDRESS: z.string(),
  },
});
