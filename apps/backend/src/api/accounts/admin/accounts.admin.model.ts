import { Gender } from '@db/gen/prisma/client';
import { AccountPlain } from '@db/gen/prismabox/Account';
import { FilePlain } from '@db/gen/prismabox/File';
import { SessionPlain } from '@db/gen/prismabox/Session';
import { UserPlain } from '@db/gen/prismabox/User';
import { t } from 'elysia';
import { IraqiPhoneNumberSchema } from '@/utils/schemas';

export const AdminAccountsModel = {
  // SignIn
  AdminAccountsSignInBody: t.Object({
    email: t.String({ format: 'email' }),
    password: t.String(),
  }),
  AdminAccountsSignInResponse: t.Object({
    token: t.String(),
    user: t.Object({
      id: t.String(),
      name: t.String(),
      email: t.String({ format: 'email' }),
    }),
  }),

  // Session
  AdminAccountsSessionResponse: t.Object({
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
      branchId: t.Optional(t.Union([t.String(), t.Null()])),
    }),
  }),

  // Profile Get
  AdminAccountsProfileResponse: t.Composite([
    UserPlain,
    t.Object({
      avatar: t.Union([FilePlain, t.Null()]),
      accounts: t.Array(AccountPlain),
      sessions: t.Array(SessionPlain),
    }),
  ]),

  // Profile Update
  AdminAccountsProfileUpdateBody: t.Object({
    name: t.Optional(t.String()),
    email: t.Optional(t.String({ format: 'email' })),
    phoneNumber: t.Optional(IraqiPhoneNumberSchema),
    gender: t.Optional(t.Enum(Gender)),
    avatarId: t.Optional(t.String({ format: 'uuid' })),
  }),
  AdminAccountsProfileUpdateResponse: UserPlain,

  // Revoke Session
  AdminAccountsRevokeSessionBody: t.Object({
    token: t.String(),
  }),
  AdminAccountsRevokeSessionResponse: t.Object({
    message: t.String(),
  }),

  // Revoke Other Sessions
  AdminAccountsRevokeOtherSessionsResponse: t.Object({
    message: t.String(),
  }),
};
