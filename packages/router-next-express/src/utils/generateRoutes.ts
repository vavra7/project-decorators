import { Request, Response } from 'express';
import { parse } from 'url';
import { GenerateRoutesOptions } from '../types';

export function generateRoutes(requestHandlerOptions: GenerateRoutesOptions<any>): void {
  const { nextApp, expressApp, routesDefinition } = requestHandlerOptions;
  const nextHandle = nextApp.getRequestHandler();

  routesDefinition.forEach(definition => {
    Object.values(definition.pathname).forEach(pathname => {
      expressApp.get(pathname, (req: Request, res: Response) => {
        nextApp.render(req, res, definition.page, { ...req.query, ...req.params });
      });
    });
  });

  expressApp.all('*', (req: Request, res: Response) => {
    return nextHandle(req, res, parse(req.url, true));
  });
}
