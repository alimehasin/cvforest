import { Elysia } from 'elysia';
import { init } from '@/init';
import { AdminHomeModel } from './home.admin.model';
import { adminHomeService } from './home.admin.services';

export const home = new Elysia({ prefix: '/home' })
  .use(init)
  .model(AdminHomeModel)

  .get(
    '/',
    async () => {
      return adminHomeService.getHome();
    },
    {
      response: {
        200: 'AdminHomeResponse',
      },
    },
  );
