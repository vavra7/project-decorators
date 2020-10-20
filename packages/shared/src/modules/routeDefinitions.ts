import { RoutesDefinition } from '@project-decorators/router-next-express';
import { Language, Route } from '../enums';

export const routesDefinition: RoutesDefinition<Language> = [
  {
    name: Route.Home,
    pathname: {
      cs: '/',
      en: '/en'
    },
    page: '/home'
  },
  {
    name: Route.Login,
    pathname: {
      cs: '/prihlaseni',
      en: '/en/login'
    },
    page: '/login'
  },
  {
    name: Route.ConfirmEmail,
    pathname: {
      cs: '/potvrdit-email/:token',
      en: '/en/confirm-email/:token'
    },
    page: '/confirm-email'
  }
];
