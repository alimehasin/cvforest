import { Elysia } from 'elysia';
import { auth } from '@/utils/auth';

export const betterAuth = new Elysia({ name: 'better-auth' })

  // Macros
  .macro({
    maybeAuthed: {
      async resolve({ request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) {
          return {
            user: null,
            session: null,
          };
        }

        return {
          user: session.user,
          session: session.session,
        };
      },
    },

    mustBeAuthed: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) {
          return status(401);
        }

        return {
          user: session.user,
          session: session.session,
        };
      },
    },

    mustBeAdmin: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session || session.user.role !== 'admin') {
          return status(401);
        }

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });

export const maybeAuthed = new Elysia({ name: 'maybe-authed' })
  .use(betterAuth)
  .guard({ maybeAuthed: true })
  .as('scoped');

export const mustBeAuthed = new Elysia({ name: 'must-be-authed' })
  .use(betterAuth)
  .guard({ mustBeAuthed: true })
  .as('scoped');

export const mustBeAdmin = new Elysia({ name: 'must-be-admin' })
  .use(betterAuth)
  .guard({ mustBeAdmin: true })
  .as('scoped');
