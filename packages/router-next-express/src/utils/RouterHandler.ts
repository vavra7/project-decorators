import NextRouter from 'next/router';
import { compile } from 'path-to-regexp';
import { RouteItemDefinition, Router, RouterHandlerOptions, RoutesDefinition } from '../types';

export class RouterHandler {
  public static routesDefinition: RoutesDefinition;
  public router: Router;

  constructor(routeOptions: RouterHandlerOptions) {
    RouterHandler.routesDefinition = routeOptions.routesDefinition;
    this.router = this.extendNextRouter(routeOptions.nextRouter);
  }

  private extendNextRouter(nextRouter: typeof NextRouter): Router {
    function push(to: string, params?: { [key: string]: string }): void {
      const routeItemDefinition = RouterHandler.getRouteItemDefByName(to);
      const page = routeItemDefinition.page;
      let pathnameAs = routeItemDefinition.pathname.en;
      if (params) {
        try {
          pathnameAs = compile(pathnameAs, { encode: encodeURIComponent })(params);
        } catch (err) {
          console.warn('URL compile error:', err);
        }
      }
      nextRouter.push({ pathname: page, query: params }, pathnameAs);
    }
    return {
      originalRouter: nextRouter,
      push
    };
  }

  private static getRouteItemDefByName(name: RouteItemDefinition['name']): RouteItemDefinition {
    const routeItemDefinition = RouterHandler.routesDefinition.find(item => item.name === name);
    if (!routeItemDefinition) {
      throw new Error(`Given route '${name}' was not found`);
    }
    return routeItemDefinition;
  }
}
