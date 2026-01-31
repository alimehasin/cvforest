import { Elysia } from 'elysia';
import { env } from './env';
import { lifecycle } from './lifecycle';
import { plugins } from './plugins';
import { routes } from './routes';
import { setup } from './setup';

export const app = new Elysia()

  // Setup
  .use(setup)

  // Plugins
  .use(plugins)

  // Routes
  .use(routes)

  // Lifecycle
  .use(lifecycle)

  .listen(env.PORT, ({ url }) => {
    console.log(`Server is running on ${url}`);
  });
