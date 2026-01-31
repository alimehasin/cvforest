import { GovernoratePlain } from '@db/gen/prismabox/Governorate';
import { t } from 'elysia';

export const UserGovernoratesModel = {
  UserGovernoratesListResponse: t.Array(GovernoratePlain),
};
