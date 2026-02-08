import { Elysia } from 'elysia';
import { init } from '@/init';
import { mustBeAuthed } from '@/plugins/better-auth';
import { UserCvsModel } from './cvs.user.model';
import { userCvsService } from './cvs.user.service';

export const cvs = new Elysia({ prefix: '/cvs' })
  .use(init)
  .model(UserCvsModel)

  .get(
    '/',
    async ({ query }) => {
      return userCvsService.list(query);
    },
    {
      query: 'UserCvsListQuery',
      response: {
        200: 'UserCvsListResponse',
      },
    },
  )

  .get(
    '/:id',
    async ({ params: { id }, t }) => {
      return userCvsService.getById(id, t);
    },
    {
      response: {
        200: 'UserCvsGetResponse',
      },
    },
  )

  .use(mustBeAuthed)

  .post(
    '/',
    async ({ t, user, body }) => {
      return userCvsService.create(t, user.id, body);
    },
    {
      successStatus: 201,
      body: 'UserCvsCreateBody',
      response: {
        201: 'UserCvsCreateResponse',
      },
    },
  );
