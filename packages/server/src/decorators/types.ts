export enum MetadataKey {
  RoutePath = 'routePath',
  Routes = 'routes'
}

export interface RouteDefinition {
  routePath: string;
  httpMethod: 'get' | 'post' | 'delete' | 'options' | 'put';
  controllerMethodName: string;
}
