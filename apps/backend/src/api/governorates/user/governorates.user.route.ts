import { Elysia } from 'elysia';
import { init } from '@/init';
import { UserGovernoratesModel } from './governorates.user.model';
import { userGovernoratesService } from './governorates.user.service';

export const governorates = new Elysia({ prefix: '/governorates' })
  .use(init)
  .model(UserGovernoratesModel)

  .get(
    '/',
    async () => {
      return userGovernoratesService.list();
    },
    {
      response: {
        200: 'UserGovernoratesListResponse',
      },
    },
  );
