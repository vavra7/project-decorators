import { Language, Route } from '../enums';

export type RoutesDefinition<N, L extends string> = {
  name: N;
  pathname: Record<L, string>;
}[];

export const routesDefinition: RoutesDefinition<Route, Language> = [
  {
    name: Route.Home,
    pathname: {
      cs: '/',
      en: '/en'
    }
  },
  {
    name: Route.Login,
    pathname: {
      cs: '/prihlaseni',
      en: '/en/login'
    }
  },
  {
    name: Route.Register,
    pathname: {
      cs: '/registrace',
      en: '/en/register'
    }
  },
  {
    name: Route.ConfirmEmail,
    pathname: {
      cs: '/potvrdit-email/[token]',
      en: '/en/confirm-email/[token]'
    }
  },
  {
    name: Route.UserProfile,
    pathname: {
      cs: '/muj-ucet',
      en: '/en/profile'
    }
  }
];
