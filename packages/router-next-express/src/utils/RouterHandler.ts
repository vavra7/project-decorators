import NextRouter from 'next/router';
import { RouterHandlerOptions, RoutesDefinition } from '../types';

export class RouterHandler {
  private routesDefinition: RoutesDefinition<any>;
  public router: typeof NextRouter;

  constructor(routeOptions: RouterHandlerOptions) {
    this.routesDefinition = routeOptions.routesDefinition;
    this.router = this.extendNextRouter(routeOptions.nextRouter);
  }

  private extendNextRouter(nextRouter: typeof NextRouter): typeof NextRouter {
    return nextRouter;
  }
}
