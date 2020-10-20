import NextRouter from 'next/router';
import { RoutesDefinition } from './RoutesDefinition';

export interface RouterHandlerOptions {
  routesDefinition: RoutesDefinition<any>;
  nextRouter: typeof NextRouter;
}
