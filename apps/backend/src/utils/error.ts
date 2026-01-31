export class HttpError extends Error {
  statusCode: number;
  reasonCode?: string;

  constructor({
    statusCode = 400,
    message = 'Bad Request',
    reasonCode,
  }: { statusCode?: number; message?: string; reasonCode?: string }) {
    super(message);
    this.statusCode = statusCode;
    this.reasonCode = reasonCode;
  }
}

export class LogicValidationError extends Error {
  statusCode: number;
  reasonCode?: string;
  errors: string[];

  constructor({
    statusCode = 400,
    message = 'Validation Error',
    reasonCode,
    errors = [],
  }: {
    statusCode?: number;
    message?: string;
    reasonCode?: string;
    errors?: string[];
  }) {
    super(message);
    this.statusCode = statusCode;
    this.reasonCode = reasonCode;
    this.errors = errors;
  }
}
