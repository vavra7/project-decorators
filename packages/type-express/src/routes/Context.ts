import { Router } from 'express';
import { AuthChecker, BodyParser, BuildRoutesOptions, NonEmptyArray } from '../types';
import { IOCContainer } from '../utils/container';

export class Context implements BuildRoutesOptions {
  public controllers: NonEmptyArray<Function>;
  public router: Router;
  public authChecker?: AuthChecker;
  public container = new IOCContainer();
  public bodyParser?: BodyParser;

  constructor(options: BuildRoutesOptions) {
    this.controllers = options.controllers;
    this.router = options.router;
    if (options.authChecker) {
      this.authChecker = options.authChecker;
    }
    if (options.container) {
      this.container = new IOCContainer(options.container);
    }
    if (options.bodyParser) {
      this.bodyParser = options.bodyParser;
    }
  }
}
