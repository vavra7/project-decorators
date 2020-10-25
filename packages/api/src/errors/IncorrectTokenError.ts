import { ErrorCode } from '../enums';
import { ErrorInterface } from '../types';

export class IncorrectTokenError extends Error implements ErrorInterface {
  constructor() {
    super('Token is incorrect or has expired');
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public getCode(): ErrorCode {
    return ErrorCode.IncorrectToken;
  }

  public getStatus(): number {
    return 401;
  }
}
