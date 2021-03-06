import { ErrorCode } from '../enums';
import { ErrorInterface } from '../types';

export class DataNotFoundError extends Error implements ErrorInterface {
  constructor(what?: string) {
    super(`${what ?? 'Data'} was not found`);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public getCode(): ErrorCode {
    return ErrorCode.DataNotFound;
  }

  public getStatus(): number {
    return 404;
  }
}
