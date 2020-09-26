import { Router } from 'express';
import { AuthChecker } from './AuthChecker';
import { NonEmptyArray } from './NonEmptyArray';

export interface BuildRoutesOptions {
  controllers: NonEmptyArray<Function>;
  router: Router;
  authChecker?: AuthChecker;
}
