import { Elysia } from 'elysia';
import { init } from '@/init';
import { AdminUsersModel } from './users.admin.model';
import { adminUsersService } from './users.admin.service';

export const users = new Elysia({ prefix: '/users' })
  .use(init)
  .model(AdminUsersModel)

  .get(
    '/',
    async ({ query }) => {
      return adminUsersService.list(query);
    },
    {
      query: 'AdminUsersListQuery',
      response: {
        200: 'AdminUsersListResponse',
      },
    },
  );
