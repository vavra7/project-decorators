import { ErrorCode } from '@project-decorators/shared';
import { ErrorInterface } from './interfaces';

export class IncorrectEmailOrPasswordError extends Error implements ErrorInterface {
  constructor() {
    super('Provided incorrect email or password');
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public getCode(): ErrorCode {
    return ErrorCode.IncorrectEmailOrPassword;
  }

  public getStatus(): number {
    return 401;
  }
}
