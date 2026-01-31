import { Elysia } from 'elysia';
import { init } from '@/init';
import { UserSkillsModel } from './skills.user.model';
import { userSkillsService } from './skills.user.service';

export const skills = new Elysia({ prefix: '/skills' })
  .use(init)
  .model(UserSkillsModel)

  .get(
    '/',
    async () => {
      return userSkillsService.list();
    },
    {
      response: {
        200: 'UserSkillsListResponse',
      },
    },
  );
