import {
  AvailabilityType,
  Currency,
  WorkLocationType,
} from '@db/gen/prisma/client';
import { CvPlain } from '@db/gen/prismabox/Cv';
import { FilePlain } from '@db/gen/prismabox/File';
import { GovernoratePlain } from '@db/gen/prismabox/Governorate';
import { SkillPlain } from '@db/gen/prismabox/Skill';
import { UserPlain } from '@db/gen/prismabox/User';
import { t } from 'elysia';
import { paginationSchema, sortingSchema } from '@/utils/schemas';

// User response with relations
const UserWithRelations = t.Composite([
  UserPlain,
  t.Object({
    avatar: t.Union([FilePlain, t.Null()]),
    governorate: t.Union([GovernoratePlain, t.Null()]),
  }),
]);

// UserSkill with nested skill
const UserSkillWithSkill = t.Object({
  id: t.String(),
  cvId: t.String(),
  skillId: t.String(),
  skill: SkillPlain,
});

// CV with relations
const CvWithRelations = t.Composite([
  CvPlain,
  t.Object({
    user: UserWithRelations,
    userSkills: t.Array(UserSkillWithSkill),
  }),
]);

export const UserCvsModel = {
  // List
  UserCvsListQuery: t.Object({
    ...paginationSchema,
    ...sortingSchema,

    // Filters
    search: t.Optional(t.String()),
    skillIds: t.Optional(t.Union([t.Array(t.String()), t.String()])),
    governorateId: t.Optional(t.String({ format: 'uuid' })),
    availabilityType: t.Optional(t.Enum(AvailabilityType)),
    workLocationType: t.Optional(t.Enum(WorkLocationType)),
    experienceMin: t.Optional(t.Number({ minimum: 0 })),
    experienceMax: t.Optional(t.Number({ minimum: 0 })),
    salaryMin: t.Optional(t.Number({ minimum: 0 })),
    salaryMax: t.Optional(t.Number({ minimum: 0 })),
    salaryCurrency: t.Optional(t.Enum(Currency)),
    availableForHire: t.Optional(t.Boolean()),
  }),
  UserCvsListResponse: t.Object({
    total: t.Number(),
    data: t.Array(CvWithRelations),
  }),

  // Get
  UserCvsGetResponse: CvWithRelations,
};
