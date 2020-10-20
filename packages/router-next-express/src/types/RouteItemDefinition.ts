export type RouteItemDefinition<T extends string> = {
  name: string;
  pathname: Record<T, string>;
  page: string;
};
