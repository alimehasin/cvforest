import { Gender } from '@db/gen/prisma/client';
import { __nullable__ } from '@db/gen/prismabox/__nullable__';
import { AccountPlain } from '@db/gen/prismabox/Account';
import { CvPlain } from '@db/gen/prismabox/Cv';
import { FilePlain } from '@db/gen/prismabox/File';
import { SessionPlain } from '@db/gen/prismabox/Session';
import { UserPlain } from '@db/gen/prismabox/User';
import { t } from 'elysia';
import { IraqiPhoneNumberSchema, StrongPasswordSchema } from '@/utils/schemas';

export const UserAccountsModel = {
  // Sign up
  UserAccountsSignUpBody: t.Object({
    // Required fields
    name: t.String(),
    email: t.String({ format: 'email' }),
    phoneNumber: t.Optional(IraqiPhoneNumberSchema),
    gender: t.Optional(t.Enum(Gender)),
    birthDate: t.Optional(t.Date()),
    avatarId: t.Optional(t.String({ format: 'uuid' })),
    password: StrongPasswordSchema,
  }),
  UserAccountsSignUpResponse: t.Object({
    message: t.String(),
    user: t.Object({
      id: t.String(),
      name: t.String(),
      email: t.String({ format: 'email' }),
    }),
  }),

  // Sign in
  UserAccountsSignInBody: t.Object({
    email: t.String({ format: 'email' }),
    password: t.String(),
  }),
  UserAccountsSignInResponse: t.Any(),

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
      avatar: __nullable__(t.Object({ id: t.String(), key: t.String() })),
      cv: __nullable__(CvPlain),
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

  // Verify email (link callback)
  VerifyEmailQuery: t.Object({
    token: t.String(),
  }),
};
