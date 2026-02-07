import { prisma } from '@db/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import {
  admin,
  emailOTP,
  openAPI,
  phoneNumber,
  username,
} from 'better-auth/plugins';
import { env } from '@/env';
import { sendEmail } from './email/helper';

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

  user: {
    additionalFields: {
      gender: { type: 'string', enum: ['Male', 'Female'] },
      avatarId: { type: 'string', required: false },
    },
  },

  plugins: [
    admin({}),
    username({}),

    openAPI({
      disableDefaultReference: true,
    }),

    emailOTP({
      otpLength: 8,

      sendVerificationOTP: async ({ email, otp, type }) => {
        await sendEmail({
          to: email,
          subject: 'CV Forest - Verification OTP',
          text: `Your verification OTP is ${otp} for ${type}`,
          html: `<p>Your verification OTP is <b>${otp}</b> for <b>${type}</b></p>`,
        });
      },
    }),

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
