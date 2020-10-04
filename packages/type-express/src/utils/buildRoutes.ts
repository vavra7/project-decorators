import { Router } from 'express';
import { getMetadataStorage } from '../metadata';
import { RoutesGenerator } from '../routes';
import { BuildRoutesOptions } from '../types';

export async function buildRoutes(options: BuildRoutesOptions): Promise<Router> {
  getMetadataStorage().build();
  const routesGenerator = new RoutesGenerator(options);
  await routesGenerator.generateFromMetadata();
  return routesGenerator.router;
}
