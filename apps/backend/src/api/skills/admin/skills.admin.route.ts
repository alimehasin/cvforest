import { Elysia } from 'elysia';
import { init } from '@/init';
import { AdminSkillsModel } from './skills.admin.model';
import { adminSkillsService } from './skills.admin.service';

export const skills = new Elysia({ prefix: '/skills' })
  .use(init)
  .model(AdminSkillsModel)

  .get(
    '/',
    async ({ query }) => {
      return adminSkillsService.list(query);
    },
    {
      query: 'AdminSkillsListQuery',
      response: {
        200: 'AdminSkillsListResponse',
      },
    },
  )

  .post(
    '/',
    async ({ body }) => {
      return adminSkillsService.create(body);
    },
    {
      successStatus: 201,
      body: 'AdminSkillsCreateBody',
      response: {
        201: 'AdminSkillsCreateResponse',
      },
    },
  )

  .patch(
    '/:id',
    async ({ params, body }) => {
      return adminSkillsService.update(params, body);
    },
    {
      body: 'AdminSkillsUpdateBody',
      params: 'AdminSkillsUpdateParams',
      response: {
        200: 'AdminSkillsUpdateResponse',
      },
    },
  )

  .delete(
    '/:id',
    async ({ params }) => {
      return adminSkillsService.delete(params);
    },
    {
      successStatus: 204,
      params: 'AdminSkillsDeleteParams',
      response: {
        204: 'AdminSkillsDeleteResponse',
      },
    },
  );
