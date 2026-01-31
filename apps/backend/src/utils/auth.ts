import { prisma } from '@db/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin, openAPI, phoneNumber, username } from 'better-auth/plugins';
import { env } from '@/env';

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
      gender: {
        type: 'string',
        enum: ['Male', 'Female'],
      },

      avatarId: {
        type: 'string',
        required: false,
      },

      // Professional Information
      jobTitle: {
        type: 'string',
        required: false,
      },
      experienceInYears: {
        type: 'number',
        required: false,
      },
      expectedSalaryMin: {
        type: 'number',
        required: false,
      },
      expectedSalaryMax: {
        type: 'number',
        required: false,
      },
      expectedSalaryCurrency: {
        type: 'string',
        required: false,
      },
      availabilityType: {
        type: 'string',
        enum: ['FullTime', 'PartTime', 'Freelance'],
        required: false,
      },
      workLocationType: {
        type: 'string',
        enum: ['OnSite', 'Remote', 'Hybrid'],
        required: false,
      },
      bio: {
        type: 'string',
        required: false,
      },
      githubUrl: {
        type: 'string',
        required: false,
      },
      linkedinUrl: {
        type: 'string',
        required: false,
      },
      portfolioUrl: {
        type: 'string',
        required: false,
      },
      availableForHire: {
        type: 'boolean',
        required: false,
      },

      // Contact & Profile
      phoneNumber: {
        type: 'string',
        required: false,
      },
      phoneNumberVerified: {
        type: 'boolean',
        required: false,
        input: false,
      },
      username: {
        type: 'string',
        required: false,
      },
      displayUsername: {
        type: 'string',
        required: false,
      },
      governorateId: {
        type: 'string',
        required: false,
      },

      // System fields
      accountVerified: {
        type: 'boolean',
        required: false,
        input: false,
      },
    },
  },

  plugins: [
    admin({}),
    username({}),

    openAPI({
      disableDefaultReference: true,
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
