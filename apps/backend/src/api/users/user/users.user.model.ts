import { FilePlain } from '@db/gen/prismabox/File';
import { GovernoratePlain } from '@db/gen/prismabox/Governorate';
import { SkillPlain } from '@db/gen/prismabox/Skill';
import { UserPlain } from '@db/gen/prismabox/User';
import { UserSkillPlain } from '@db/gen/prismabox/UserSkill';
import { t } from 'elysia';
import { paginationSchema, sortingSchema } from '@/utils/schemas';

// User response with relations
const UserWithRelations = t.Composite([
  UserPlain,
  t.Object({
    avatar: t.Union([FilePlain, t.Null()]),
    governorate: t.Union([GovernoratePlain, t.Null()]),
    userSkills: t.Array(
      t.Composite([UserSkillPlain, t.Object({ skill: SkillPlain })]),
    ),
  }),
]);

export const UserUsersModel = {
  // List
  UserUsersListQuery: t.Object({
    ...paginationSchema,
    ...sortingSchema,

    // Filters
    search: t.Optional(t.String()),
    governorateId: t.Optional(t.String()),
    skillIds: t.Optional(t.Union([t.Array(t.String()), t.String()])),
    availabilityType: t.Optional(t.String()),
    workLocationType: t.Optional(t.String()),
    experienceMin: t.Optional(t.Number()),
    experienceMax: t.Optional(t.Number()),
  }),
  UserUsersListResponse: t.Object({
    total: t.Number(),
    data: t.Array(UserWithRelations),
  }),

  // Get
  UserUsersGetParams: t.Object({
    id: t.String({ format: 'uuid' }),
  }),
  UserUsersGetResponse: UserWithRelations,
};
