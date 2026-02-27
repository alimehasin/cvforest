import { CvStatus } from '@db/gen/prisma/client';
import { __nullable__ } from '@db/gen/prismabox/barrel';
import { CvPlain } from '@db/gen/prismabox/Cv';
import { FilePlain } from '@db/gen/prismabox/File';
import { GovernoratePlain } from '@db/gen/prismabox/Governorate';
import { SkillPlain } from '@db/gen/prismabox/Skill';
import { UserPlain } from '@db/gen/prismabox/User';
import { t } from 'elysia';
import { paginationSchema, sortingSchema } from '@/utils/schemas';

// User response with relations (reused from users model)
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
    file: __nullable__(t.Object({ key: t.String() })),
  }),
]);

export const AdminCvsModel = {
  // List
  AdminCvsListQuery: t.Object({
    ...paginationSchema,
    ...sortingSchema,

    // Filters
    status: t.Optional(t.Enum(CvStatus)),
    search: t.Optional(t.String()),
  }),
  AdminCvsListResponse: t.Object({
    total: t.Number(),
    data: t.Array(CvWithRelations),
  }),

  // Get
  AdminCvsGetResponse: CvWithRelations,

  // Approve
  AdminCvsApproveResponse: t.Object({
    message: t.String(),
  }),

  // Reject
  AdminCvsRejectResponse: t.Object({
    message: t.String(),
  }),
};
