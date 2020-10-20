import { Express } from 'express';
import { RoutesDefinition } from './RoutesDefinition';

export interface GenerateRoutesOptions<T extends string> {
  nextApp: any;
  expressApp: Express;
  routesDefinition: RoutesDefinition<T>;
}
