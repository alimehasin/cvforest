import { Elysia } from 'elysia';
import { init } from '@/init';
import { AdminJoinRequestsModel } from './join-requests.admin.model';
import { adminJoinRequestsService } from './join-requests.admin.service';

export const joinRequests = new Elysia({ prefix: '/join-requests' })
  .use(init)
  .model(AdminJoinRequestsModel)

  .get(
    '/',
    async ({ query }) => {
      return adminJoinRequestsService.list(query);
    },
    {
      query: 'AdminJoinRequestsListQuery',
      response: {
        200: 'AdminJoinRequestsListResponse',
      },
    },
  )

  .get(
    '/:id',
    async ({ params: { id }, t }) => {
      return adminJoinRequestsService.getById(id, t);
    },
    {
      response: {
        200: 'AdminJoinRequestsGetResponse',
      },
    },
  )

  .patch(
    '/:id/approve',
    async ({ params: { id }, t }) => {
      return adminJoinRequestsService.approve(id, t);
    },
    {
      response: {
        200: 'AdminJoinRequestsApproveResponse',
      },
    },
  );
