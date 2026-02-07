import { prisma } from '@db/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin, phoneNumber, username } from 'better-auth/plugins';
import { env } from '@/env';
import { sendEmail } from './email';

export const auth = betterAuth({
  basePath: '/',
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_BASE_URL,
  trustedOrigins: env.TRUSTED_ORIGINS,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  advanced: {
    database: { generateId: false },
    crossSubDomainCookies: {
      enabled: true,
      domain: env.BETTER_AUTH_COOKIE_DOMAIN,
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const url = `${env.BETTER_AUTH_VERIFICATION_CALLBACK_URL}?token=${encodeURIComponent(token)}`;

      void sendEmail({
        to: user.email,
        subject: 'CV Forest - Verify your email',
        html: `<p>Click the link to verify your email: <a href="${url}">${url}</a></p>`,
      });
    },
  },

  user: {
    additionalFields: {
      gender: { type: 'string', enum: ['Male', 'Female'] },
      avatarId: { type: 'string', required: false },
    },
  },

  plugins: [
    admin({}),
    username({}),

    phoneNumber({
      sendOTP: async ({ code, phoneNumber }) => {
        console.log('======================== OTP =========================');
        console.log(code);
        console.log(phoneNumber);
        console.log('======================== OTP =========================');
      },

      signUpOnVerification: {
        getTempName: (phoneNumber) => `User ${phoneNumber}`,
        getTempEmail: (phoneNumber) => `${phoneNumber}@phone-auth.local`,
      },
    }),
  ],
});
