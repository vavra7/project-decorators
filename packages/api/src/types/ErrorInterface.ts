import { ErrorCode } from '@project-decorators/shared';

export interface ErrorInterface {
  getCode(): ErrorCode;
  getStatus(): number;
}
