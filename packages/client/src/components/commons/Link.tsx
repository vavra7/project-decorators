import { useRouter } from 'next/router';
import { FC, MouseEvent, ReactNode } from 'react';
import { Language, Route } from '../../enums';
import { i18n, routesDefinition } from '../../utils';

interface Props {
  children: ReactNode;
  to: Route;
  query?: { [key: string]: string };
  lang?: Language;
  className?: string;
}

export const Link: FC<Props> = props => {
  const { children, to, query, lang, className } = props;
  const router = useRouter();
  const routeDefinitionItem = routesDefinition.find(item => item.name === to)!;
  const pathname = routeDefinitionItem.pathname[lang || i18n.lang];
  let href = pathname;
  if (query) {
    for (const key in query) {
      href = href.replace(`[${key}]`, query[key]);
    }
  }
  const handleClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    router.push({ pathname, query: query });
    if (lang && lang !== i18n.lang) i18n.lang = lang;
  };
  return (
    <a className={className} href={href} onClick={handleClick}>
      {children}
    </a>
  );
};
