import { Elysia } from 'elysia';
import { init } from '@/init';
import { AdminCvsModel } from './cvs.admin.model';
import { adminCvsService } from './cvs.admin.service';

export const cvs = new Elysia({ prefix: '/cvs' })
  .use(init)
  .model(AdminCvsModel)

  .get(
    '/',
    async ({ query }) => {
      return adminCvsService.list(query);
    },
    {
      query: 'AdminCvsListQuery',
      response: {
        200: 'AdminCvsListResponse',
      },
    },
  )

  .get(
    '/:id',
    async ({ params: { id }, t }) => {
      return adminCvsService.getById(id, t);
    },
    {
      response: {
        200: 'AdminCvsGetResponse',
      },
    },
  )

  .patch(
    '/:id/approve',
    async ({ params: { id }, t }) => {
      return adminCvsService.approve(id, t);
    },
    {
      response: {
        200: 'AdminCvsApproveResponse',
      },
    },
  )

  .patch(
    '/:id/reject',
    async ({ params: { id }, t }) => {
      return adminCvsService.reject(id, t);
    },
    {
      response: {
        200: 'AdminCvsRejectResponse',
      },
    },
  );
