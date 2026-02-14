import { Elysia } from 'elysia';
import { init } from '@/init';
import { mustBeUser } from '@/plugins/better-auth';
import { sendMessageToChannel } from '@/utils/telegram';
import { trackCvView } from '../cv.helpers';
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
    async ({ t, params: { id } }) => {
      return userCvsService.getById(id, t);
    },
    {
      afterHandle: async ({ params: { id }, request, server }) => {
        await trackCvView(id, request, server);
      },
      response: {
        200: 'UserCvsGetResponse',
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
      afterResponse: async ({ user }) => {
        await sendMessageToChannel(
          `📝 CV updated\n<b>${user.name}</b>\n${user.email}`,
        );
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
      afterResponse: async ({ user }) => {
        await sendMessageToChannel(
          `✨ New CV created\n<b>${user.name}</b>\n${user.email}`,
        );
      },
    },
  );
