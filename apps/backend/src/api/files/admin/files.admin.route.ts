import { Elysia } from 'elysia';
import { init } from '@/init';
import { mustBeAdmin } from '@/plugins/better-auth';
import { AdminFilesModel } from './files.admin.model';
import { adminFilesService } from './files.admin.service';

export const files = new Elysia({ prefix: '/files' })
  .use(init)
  .use(mustBeAdmin)
  .model(AdminFilesModel)

  .post(
    '/upload',
    async ({ t, user, body }) => {
      return adminFilesService.upload(t, user.id, body);
    },
    {
      successStatus: 201,
      body: 'AdminFilesCreateBody',
      response: {
        201: 'AdminFilesCreateResponse',
      },
    },
  )

  .delete(
    '/:id',
    async ({ t, params: { id } }) => {
      await adminFilesService.delete(t, id);
    },
    {
      successStatus: 204,
      response: {
        204: 'AdminFilesDeleteResponse',
      },
    },
  );
