import { ErrorCode } from '@project-decorators/shared';
import { ErrorInterface } from '../types';

export class NotAuthenticatedError extends Error implements ErrorInterface {
  constructor() {
    super('User is not authenticated or authentication expired');
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public getCode(): ErrorCode {
    return ErrorCode.NotAuthenticated;
  }

  public getStatus(): number {
    return 401;
  }
}
