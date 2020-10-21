export type RouteItemDefinition<T extends string = any> = {
  name: string;
  pathname: Record<T, string>;
  page: string;
};
