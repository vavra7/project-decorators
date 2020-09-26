import { Router } from 'express';
import { BuildRoutesOptions } from '../interfaces';
import { RoutesGenerator } from '../routes';

export async function buildRoutes(options: BuildRoutesOptions): Promise<Router> {
  const routesGenerator = new RoutesGenerator(options);
  await routesGenerator.generateFromMetadata();
  return routesGenerator.router;
}
