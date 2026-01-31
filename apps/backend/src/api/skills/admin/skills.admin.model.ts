import { SkillPlain } from '@db/gen/prismabox/Skill';
import { t } from 'elysia';
import { paginationSchema, sortingSchema } from '@/utils/schemas';

export const AdminSkillsModel = {
  // List
  AdminSkillsListQuery: t.Object({
    ...paginationSchema,
    ...sortingSchema,

    // Filters
    search: t.Optional(t.String()),
  }),
  AdminSkillsListResponse: t.Object({
    total: t.Number(),
    data: t.Array(SkillPlain),
  }),

  // Create
  AdminSkillsCreateBody: t.Object({
    name: t.String(),
  }),
  AdminSkillsCreateResponse: SkillPlain,

  // Update
  AdminSkillsUpdateParams: t.Object({
    id: t.String({ format: 'uuid' }),
  }),
  AdminSkillsUpdateBody: t.Object({
    name: t.String(),
  }),
  AdminSkillsUpdateResponse: SkillPlain,

  // Delete
  AdminSkillsDeleteParams: t.Object({
    id: t.String({ format: 'uuid' }),
  }),
  AdminSkillsDeleteResponse: t.Any(),
};
