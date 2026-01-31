import { GovernoratePlain } from '@db/gen/prismabox/Governorate';
import { t } from 'elysia';
import { paginationSchema, sortingSchema } from '@/utils/schemas';

export const AdminGovernoratesModel = {
  // List
  AdminGovernoratesListQuery: t.Object({
    ...paginationSchema,
    ...sortingSchema,

    // Filters
    search: t.Optional(t.String()),
  }),
  AdminGovernoratesListResponse: t.Object({
    total: t.Number(),
    data: t.Array(GovernoratePlain),
  }),

  // Create
  AdminGovernoratesCreateBody: t.Object({
    name: t.String(),
  }),
  AdminGovernoratesCreateResponse: GovernoratePlain,

  // Update
  AdminGovernoratesUpdateParams: t.Object({
    id: t.String({ format: 'uuid' }),
  }),
  AdminGovernoratesUpdateBody: t.Object({
    name: t.String(),
  }),
  AdminGovernoratesUpdateResponse: GovernoratePlain,

  // Delete
  AdminGovernoratesDeleteParams: t.Object({
    id: t.String({ format: 'uuid' }),
  }),
  AdminGovernoratesDeleteResponse: t.Any(),
};
