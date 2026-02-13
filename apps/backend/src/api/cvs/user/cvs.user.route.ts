import { Elysia } from 'elysia';
import { init } from '@/init';
import { mustBeUser } from '@/plugins/better-auth';
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

  .use(mustBeUser)

  .get(
    '/mine',
    async ({ user, t }) => {
      return userCvsService.getByUserId(user.id, t);
    },
    {
      response: {
        200: 'UserCvsGetResponse',
      },
    },
  )

  .patch(
    '/mine',
    async ({ user, t, body }) => {
      return userCvsService.update(user.id, t, body);
    },
    {
      body: 'UserCvsUpdateBody',
      response: {
        200: 'UserCvsUpdateResponse',
      },
    },
  )

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
  );
