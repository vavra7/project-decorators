import { routesDefinition as _routesDefinition } from '@project-decorators/shared';
import { NextRouter, SingletonRouter, useRouter as nextUseRouter, withRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { Component, ComponentType, ReactNode } from 'react';
import { Language, Route } from '../enums';
import { I18n, i18n } from './i18n';

type RouterToFce = (to: Route, query?: ParsedUrlQuery, lang?: Language) => void;

export interface InjectedRouter {
  router?: SingletonRouter & { to: RouterToFce };
}

export const routesDefinition = _routesDefinition;

/**
 * Returns 'to' function which can be added into native next router.
 * Function 'to' provides easier navigation.
 */
const getRouterToFce = (pushFce: NextRouter['push'], _i18n: I18n<Language>): RouterToFce => {
  return function to(to: Route, query?: ParsedUrlQuery, lang?: Language): void {
    const routeDefinitionItem = routesDefinition.find(item => item.name === to)!;
    const pathname = routeDefinitionItem.pathname[lang || i18n.lang];
    pushFce({ pathname, query });
    if (lang && lang !== _i18n.lang) _i18n.lang = lang;
  };
};

/**
 * Native Next.js hook 'useRouter' extended by 'to' function
 */
export function useRouter(): NextRouter & { to: RouterToFce } {
  const router = nextUseRouter();
  return {
    ...router,
    to: getRouterToFce(router!.push, i18n)
  };
}

/**
 * Decorator of native Next.js 'WithRouter' extended by 'to' function
 */
export function WithRouter(): any {
  return (WrappedTarget: ComponentType<InjectedRouter>) => {
    const WithRouterComponent = class extends Component<SingletonRouter> {
      public render(): ReactNode {
        const { router, ...restProps } = this.props;
        return (
          <WrappedTarget
            {...restProps}
            router={{ ...router, to: getRouterToFce(router!.push, i18n) } as any}
          />
        );
      }
    };
    return withRouter(WithRouterComponent as any);
  };
}
