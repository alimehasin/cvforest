import type { ValidationError } from 'elysia';

type FieldsValidationErrors = {
  field: string;
  message: string;
}[];

export function prettifyValidationErrors(
  error: Readonly<ValidationError>,
): FieldsValidationErrors {
  const errors = error.all as {
    path: string;
    message: string;
    schema?: { description?: string };
  }[];

  const seen = new Set<string>();

  return errors
    .map((err) => ({
      field: err.path.replace(/^\//, ''),
      message: err.schema?.description ?? err.message,
    }))
    .filter(({ field }) => {
      return !seen.has(field) && seen.add(field);
    });
}
