import { Elysia } from 'elysia';
import { SetupModel } from './model';

export const setup = new Elysia({ name: 'setup' })

  // Models
  .model(SetupModel)

  // Guards
  .guard({
    response: {
      400: 'BadRequestError',
      422: 'FieldsValidationError',
    },
  })

  // Scope
  .as('scoped');
