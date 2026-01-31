import { UserPlain } from '@db/gen/prismabox/User';
import { t } from 'elysia';
import { paginationSchema, sortingSchema } from '@/utils/schemas';

export const AdminUsersModel = {
  // List
  AdminUsersListQuery: t.Object({
    ...paginationSchema,
    ...sortingSchema,

    // Filters
    search: t.Optional(t.String()),
  }),
  AdminUsersListResponse: t.Object({
    total: t.Number(),
    data: t.Array(UserPlain),
  }),
};
