import { ErrorCode } from '@project-decorators/shared';
import { ArgumentValidationError } from '@project-decorators/type-express';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from './types';

export function expressErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  let errorResponse: ErrorResponse;
  if (err.constructor === ArgumentValidationError) {
    errorResponse = {
      errors: [
        {
          code: ErrorCode.InvalidArguments,
          message: (err as any).message,
          extensions: {
            validationErrors: (err as any).validationErrors,
            stacktrace: (err as any).stack?.split('\n')
          }
        }
      ]
    };
    res.status(422).json(errorResponse);
  } else {
    const code =
      typeof (err as any).getCode === 'function'
        ? (err as any).getCode()
        : ErrorCode.InternalServerError;
    const status = typeof (err as any).getStatus === 'function' ? (err as any).getStatus() : 500;
    errorResponse = {
      errors: [
        {
          message: err.message,
          code,
          extensions: {
            stacktrace: err.stack?.split('\n')
          }
        }
      ]
    };
    res.status(status).json(errorResponse);
  }
}
