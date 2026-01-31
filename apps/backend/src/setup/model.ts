import { t } from 'elysia';

const HttpError = t.Object(
  {
    errorCode: t.Literal('HttpError'),
    reasonCode: t.Optional(t.String()),
    message: t.String(),
  },
  { title: 'HttpError' },
);

const LogicValidationError = t.Object(
  {
    errorCode: t.Literal('LogicValidationError'),
    reasonCode: t.Optional(t.String()),
    errors: t.Array(t.String()),
  },
  { title: 'LogicValidationError' },
);

const FieldsValidationError = t.Object(
  {
    errorCode: t.Literal('FieldsValidationError'),
    errors: t.Array(t.Object({ field: t.String(), message: t.String() })),
  },
  { title: 'FieldsValidationError' },
);

export const SetupModel = {
  BadRequestError: t.Union([HttpError, LogicValidationError]),
  FieldsValidationError,
};
