import { Elysia, status } from 'elysia';
import { HttpError, LogicValidationError } from '@/utils/error';
import { prettifyValidationErrors } from './prettify-validation-error';

export const errorHandler = new Elysia({ name: 'error-handler' })

  // Error Handler
  .error({ HttpError, LogicValidationError })

  .onError(({ code, error }) => {
    if (code === 'HttpError') {
      return status(error.statusCode, {
        errorCode: 'HttpError',
        reasonCode: error.reasonCode,
        message: error.message,
      });
    }

    if (code === 'LogicValidationError') {
      return status(error.statusCode, {
        errorCode: 'LogicValidationError',
        reasonCode: error.reasonCode,
        errors: error.errors,
      });
    }

    if (code === 'VALIDATION') {
      return status(422, {
        errorCode: 'FieldsValidationError',
        errors: prettifyValidationErrors(error),
      });
    }
  })

  // Global
  .as('global');
