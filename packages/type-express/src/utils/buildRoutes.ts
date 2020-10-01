import { Router } from 'express';
import { BuildRoutesOptions } from '../types';
import { getMetadataStorage } from '../metadata';
import { RoutesGenerator } from '../routes';

export async function buildRoutes(options: BuildRoutesOptions): Promise<Router> {
  getMetadataStorage().build();
  const routesGenerator = new RoutesGenerator(options);
  await routesGenerator.generateFromMetadata();
  return routesGenerator.router;
}
