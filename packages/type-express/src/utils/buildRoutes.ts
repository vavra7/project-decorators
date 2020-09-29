import { Router } from 'express';
import { BuildRoutesOptions } from '../interfaces';
import { getMetadataStorage } from '../metadata';
import { RoutesGenerator } from '../routes';
import { Context } from '../routes/Context';

export async function buildRoutes(options: BuildRoutesOptions): Promise<Router> {
  Context.create(options);
  getMetadataStorage().build();
  const routesGenerator = new RoutesGenerator(options);
  await routesGenerator.generateFromMetadata();
  return routesGenerator.router;
}
