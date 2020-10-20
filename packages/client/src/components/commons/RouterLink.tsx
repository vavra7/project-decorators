import { Route, routesDefinition } from '@project-decorators/shared';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

type To = {
  name: Route;
  query?: { [key: string]: string };
};

interface Props {
  children: ReactNode;
  to: To;
}

export const RouterLink: FC<Props> = props => {
  const { children, to } = props;
  const router = useRouter();
  const routeDefinitionItem = routesDefinition.find(item => item.name === to.name)!;
  const handleClick = (): void => {
    // router.push(routeDefinitionItem.page, routeDefinitionItem.pathname.cs);
    router.push(
      { pathname: routeDefinitionItem.page, query: to.query },
      routeDefinitionItem.pathname.cs
    );
  };
  return <a onClick={handleClick}>{children}</a>;
};
