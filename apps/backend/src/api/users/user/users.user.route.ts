import { Elysia } from 'elysia';
import { init } from '@/init';
import { UserUsersModel } from './users.user.model';
import { userUsersService } from './users.user.service';

export const users = new Elysia({ prefix: '/users' })
  .use(init)
  .model(UserUsersModel)

  .get(
    '/',
    async ({ query }) => {
      return userUsersService.list(query);
    },
    {
      query: 'UserUsersListQuery',
      response: {
        200: 'UserUsersListResponse',
      },
    },
  )

  .get(
    '/:id',
    async ({ params: { id }, t }) => {
      return userUsersService.getById(id, t);
    },
    {
      params: 'UserUsersGetParams',
      response: {
        200: 'UserUsersGetResponse',
      },
    },
  );
