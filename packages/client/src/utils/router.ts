import { RouterHandler } from '@project-decorators/router-next-express';
import { routesDefinition } from '@project-decorators/shared';
import NextRouter from 'next/router';

const routerHandler = new RouterHandler({
  nextRouter: NextRouter,
  routesDefinition
});

export const router = routerHandler.router;
