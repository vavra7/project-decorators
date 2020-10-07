import { ErrorCode } from '@project-decorators/shared';
import { ErrorInterface } from './interfaces';

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
