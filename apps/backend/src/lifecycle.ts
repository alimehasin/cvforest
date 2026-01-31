import { Elysia } from 'elysia';

export const lifecycle = new Elysia({ name: 'lifecycle' })

  // OnStartup
  .onStart(() => {});
