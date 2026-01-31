import {
  AvailabilityType,
  Currency,
  Gender,
  WorkLocationType,
} from '@db/gen/prisma/client';
import { AccountPlain } from '@db/gen/prismabox/Account';
import { FilePlain } from '@db/gen/prismabox/File';
import { SessionPlain } from '@db/gen/prismabox/Session';
import { UserPlain } from '@db/gen/prismabox/User';
import { t } from 'elysia';
import { IraqiPhoneNumberSchema } from '@/utils/schemas';

export const UserAccountsModel = {
  // Register
  UserAccountsRegisterBody: t.Object({
    // Required fields
    name: t.String(),
    email: t.String({ format: 'email' }),
    jobTitle: t.String(),
    experienceInYears: t.Number({ minimum: 0 }),

    // Optional professional fields
    expectedSalaryMin: t.Optional(t.Number({ minimum: 0 })),
    expectedSalaryMax: t.Optional(t.Number({ minimum: 0 })),
    expectedSalaryCurrency: t.Optional(t.Enum(Currency)),
    availabilityType: t.Optional(t.Enum(AvailabilityType)),
    workLocationType: t.Optional(t.Enum(WorkLocationType)),
    bio: t.Optional(t.String()),
    availableForHire: t.Optional(t.Boolean()),

    // Optional social/portfolio fields
    githubUrl: t.Optional(t.String({ format: 'uri' })),
    linkedinUrl: t.Optional(t.String({ format: 'uri' })),
    portfolioUrl: t.Optional(t.String({ format: 'uri' })),

    // Optional profile fields
    phoneNumber: t.Optional(IraqiPhoneNumberSchema),
    username: t.Optional(t.String()),
    displayUsername: t.Optional(t.String()),
    gender: t.Optional(t.Enum(Gender)),
    governorateId: t.Optional(t.String({ format: 'uuid' })),
  }),
  UserAccountsRegisterResponse: t.Object({
    message: t.String(),
    user: t.Object({
      id: t.String(),
      name: t.String(),
      email: t.String({ format: 'email' }),
    }),
  }),

  // Session
  UserAccountsSessionResponse: t.Object({
    session: t.Object({
      id: t.String(),
      token: t.String(),
      expiresAt: t.Date(),
      userId: t.String(),
    }),
    user: t.Object({
      id: t.String(),
      name: t.String(),
      email: t.String({ format: 'email' }),
      role: t.Optional(t.Union([t.String(), t.Null()])),
    }),
  }),

  // Profile Get
  UserAccountsProfileResponse: t.Composite([
    UserPlain,
    t.Object({
      avatar: t.Union([FilePlain, t.Null()]),
      accounts: t.Array(AccountPlain),
      sessions: t.Array(SessionPlain),
    }),
  ]),

  // Profile Update
  UserAccountsProfileUpdateBody: t.Object({
    name: t.Optional(t.String()),
    email: t.Optional(t.String({ format: 'email' })),
    phoneNumber: t.Optional(IraqiPhoneNumberSchema),
    gender: t.Optional(t.Enum(Gender)),
    birthDate: t.Optional(t.Date()),
    avatarId: t.Optional(t.String({ format: 'uuid' })),
  }),
  UserAccountsProfileUpdateResponse: UserPlain,

  // Revoke Session
  UserAccountsRevokeSessionBody: t.Object({
    token: t.String(),
  }),
  UserAccountsRevokeSessionResponse: t.Object({
    message: t.String(),
  }),

  // Revoke Other Sessions
  UserAccountsRevokeOtherSessionsResponse: t.Object({
    message: t.String(),
  }),

  // Verify OTP
  UserAccountsVerifyOtpBody: t.Object({
    email: t.String({ format: 'email' }),
    otp: t.String({ minLength: 8, maxLength: 8 }),
  }),
  UserAccountsVerifyOtpResponse: t.Object({
    success: t.Boolean(),
    userId: t.String(),
    email: t.String({ format: 'email' }),
  }),

  // Set Password
  UserAccountsSetPasswordBody: t.Object({
    password: t.String({ minLength: 8 }),
  }),
  UserAccountsSetPasswordResponse: t.Object({
    success: t.Boolean(),
    message: t.String(),
  }),
};
