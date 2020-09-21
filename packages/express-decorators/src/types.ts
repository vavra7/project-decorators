export enum MetadataKey {
  RoutePath = 'routePath',
  Routes = 'routes',
  SecureMethods = 'secureMethods'
}

export type SecureMethods = {
  [key: string]: boolean;
};

export interface RouteDefinition {
  routePath: string;
  httpMethod: 'get' | 'post' | 'delete' | 'options' | 'put';
  controllerMethodName: string;
}
