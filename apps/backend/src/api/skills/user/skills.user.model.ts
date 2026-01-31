import { SkillPlain } from '@db/gen/prismabox/Skill';
import { t } from 'elysia';

export const UserSkillsModel = {
  UserSkillsListResponse: t.Array(SkillPlain),
};
