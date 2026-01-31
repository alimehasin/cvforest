import { Elysia } from 'elysia';
import { init } from '@/init';
import { AdminGovernoratesModel } from './governorates.admin.model';
import { adminGovernoratesService } from './governorates.admin.service';

export const governorates = new Elysia({ prefix: '/governorates' })
  .use(init)
  .model(AdminGovernoratesModel)

  .get(
    '/',
    async ({ query }) => {
      return adminGovernoratesService.list(query);
    },
    {
      query: 'AdminGovernoratesListQuery',
      response: {
        200: 'AdminGovernoratesListResponse',
      },
    },
  )

  .post(
    '/',
    async ({ body }) => {
      return adminGovernoratesService.create(body);
    },
    {
      successStatus: 201,
      body: 'AdminGovernoratesCreateBody',
      response: {
        201: 'AdminGovernoratesCreateResponse',
      },
    },
  )

  .patch(
    '/:id',
    async ({ params, body }) => {
      return adminGovernoratesService.update(params, body);
    },
    {
      body: 'AdminGovernoratesUpdateBody',
      params: 'AdminGovernoratesUpdateParams',
      response: {
        200: 'AdminGovernoratesUpdateResponse',
      },
    },
  )

  .delete(
    '/:id',
    async ({ params }) => {
      return adminGovernoratesService.delete(params);
    },
    {
      successStatus: 204,
      params: 'AdminGovernoratesDeleteParams',
      response: {
        204: 'AdminGovernoratesDeleteResponse',
      },
    },
  );
