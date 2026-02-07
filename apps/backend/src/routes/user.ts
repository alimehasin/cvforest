import { Elysia } from 'elysia';
import { accounts } from '@/api/accounts/user/accounts.user.route';
import { files } from '@/api/files/user/files.user.route';
import { governorates } from '@/api/governorates/user/governorates.user.route';
import { skills } from '@/api/skills/user/skills.user.route';
import { users } from '@/api/users/user/users.user.route';

export const user = new Elysia({ prefix: '/user', tags: ['User'] })

  // Routes
  .use(accounts)
  .use(governorates)
  .use(skills)
  .use(files)
  .use(users);
