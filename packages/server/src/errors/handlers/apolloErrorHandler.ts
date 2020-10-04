import { ErrorCode } from '@project-decorators/shared';
import { GraphQLError } from 'graphql';
import { ArgumentValidationError } from 'type-graphql';
import { FormattedError } from './types';

export function apolloErrorHandler(err: GraphQLError): FormattedError {
  let formattedError: FormattedError;
  if (err.originalError?.constructor === ArgumentValidationError) {
    formattedError = {
      message: err.message,
      code: ErrorCode.InvalidArguments,
      extensions: {
        validationErrors: err.extensions?.exception.validationErrors,
        stacktrace: err.extensions?.exception.stacktrace
      }
    };
  } else {
    const code =
      typeof (err.originalError as any).getCode === 'function'
        ? (err.originalError as any).getCode()
        : ErrorCode.InternalServerError;
    const extensions = err.extensions?.exception;
    delete extensions.message;
    formattedError = {
      message: err.message,
      code,
      extensions
    };
  }
  return formattedError;
}
