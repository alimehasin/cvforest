import { Elysia } from 'elysia';
import { init } from '@/init';
import { mustBeUser } from '@/plugins/better-auth';
import { UserFilesModel } from './files.user.model';
import { userFilesService } from './files.user.service';

export const files = new Elysia({ prefix: '/files' })
  .use(init)
  .use(mustBeUser)
  .model(UserFilesModel)

  .post(
    '/upload',
    async ({ t, user, body }) => {
      return userFilesService.upload(t, user.id, body);
    },
    {
      successStatus: 201,
      body: 'UserFilesCreateBody',
      response: {
        201: 'UserFilesCreateResponse',
      },
    },
  )

  .delete(
    '/:id',
    async ({ t, user, params: { id } }) => {
      await userFilesService.delete(t, id, user.id);
    },
    {
      successStatus: 204,
      response: {
        204: 'UserFilesDeleteResponse',
      },
    },
  );
