import { Elysia } from 'elysia';
import { accounts } from '@/api/accounts/admin/accounts.admin.route';
import { files } from '@/api/files/admin/files.admin.route';
import { governorates } from '@/api/governorates/admin/governorates.admin.route';
import { skills } from '@/api/skills/admin/skills.admin.route';
import { users } from '@/api/users/admin/users.admin.route';
import { init } from '@/init';
import { mustBeAdmin } from '@/plugins/better-auth';

export const admin = new Elysia({ prefix: '/admin', tags: ['Admin'] })
  // Plugins
  .use(init)

  // Public Routes
  .use(accounts)

  // Guards
  .use(mustBeAdmin)

  // Private Routes
  .use(governorates)
  .use(skills)
  .use(files)
  .use(users);
