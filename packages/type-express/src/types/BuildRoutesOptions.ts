import { Router } from 'express';
import { AuthChecker } from './AuthChecker';
import { BodyParser } from './BodyParser';
import { Container } from './Container';
import { NonEmptyArray } from './NonEmptyArray';

export interface BuildRoutesOptions {
  controllers: NonEmptyArray<Function>;
  router: Router;
  authChecker?: AuthChecker;
  container?: Container;
  bodyParser?: BodyParser;
}
