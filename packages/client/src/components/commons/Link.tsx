import { routesDefinition } from '@project-decorators/shared';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { Language, Route } from '../../enums';
import { i18n } from '../../utils';

interface Props {
  children: ReactNode;
  to: Route;
  query?: { [key: string]: string };
  locale?: Language;
}

export const Link: FC<Props> = props => {
  const { children, to, query, locale } = props;
  const router = useRouter();
  const routeDefinitionItem = routesDefinition.find(item => item.name === to)!;
  const handleClick = (): void => {
    router.push({ pathname: routeDefinitionItem.pathname[locale || i18n.lang], query: query });
    if (locale && locale !== i18n.lang) i18n.lang = locale;
  };
  return <a onClick={handleClick}>{children}</a>;
};
