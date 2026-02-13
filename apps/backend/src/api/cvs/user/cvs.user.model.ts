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
import { UserAccountsModel } from '@/api/accounts/user/accounts.user.model';
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
  t.Omit(CvPlain, [
    'expectedSalaryMin',
    'expectedSalaryMax',
    'expectedSalaryCurrency',
  ]),
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

  // Create
  UserCvsCreateBody: t.Object({
    profile: t.Optional(UserAccountsModel.UserAccountsProfileUpdateBody),
    jobTitle: t.String({ minLength: 1 }),
    experienceInYears: t.Number({ minimum: 0 }),
    expectedSalaryMin: t.Optional(t.Number({ minimum: 0 })),
    expectedSalaryMax: t.Optional(t.Number({ minimum: 0 })),
    expectedSalaryCurrency: t.Optional(t.Enum(Currency)),
    availabilityTypes: t.Array(t.Enum(AvailabilityType), { minItems: 1 }),
    workLocationTypes: t.Array(t.Enum(WorkLocationType), { minItems: 1 }),
    bio: t.String({ minLength: 64 }),
    githubUrl: t.Optional(t.String({ format: 'uri' })),
    linkedinUrl: t.Optional(t.String({ format: 'uri' })),
    portfolioUrl: t.Optional(t.String({ format: 'uri' })),
    availableForHire: t.Boolean(),
    skillIds: t.Array(t.String({ format: 'uuid' }), {
      minItems: 3,
      maxItems: 12,
    }),
  }),
  UserCvsCreateResponse: CvWithRelations,

  // Update (partial)
  UserCvsUpdateBody: t.Object({
    profile: t.Optional(UserAccountsModel.UserAccountsProfileUpdateBody),
    jobTitle: t.Optional(t.String({ minLength: 1 })),
    experienceInYears: t.Optional(t.Number({ minimum: 0 })),
    expectedSalaryMin: t.Optional(t.Number({ minimum: 0 })),
    expectedSalaryMax: t.Optional(t.Number({ minimum: 0 })),
    expectedSalaryCurrency: t.Optional(t.Enum(Currency)),
    availabilityTypes: t.Optional(
      t.Array(t.Enum(AvailabilityType), { minItems: 1 }),
    ),
    workLocationTypes: t.Optional(
      t.Array(t.Enum(WorkLocationType), { minItems: 1 }),
    ),
    bio: t.Optional(t.String({ minLength: 64 })),
    githubUrl: t.Optional(t.String({ format: 'uri' })),
    linkedinUrl: t.Optional(t.String({ format: 'uri' })),
    portfolioUrl: t.Optional(t.String({ format: 'uri' })),
    availableForHire: t.Optional(t.Boolean()),
    skillIds: t.Optional(
      t.Array(t.String({ format: 'uuid' }), {
        minItems: 3,
        maxItems: 12,
      }),
    ),
  }),
  UserCvsUpdateResponse: CvWithRelations,
};
