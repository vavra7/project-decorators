import { PureComponent, ReactElement } from 'react';
import { Link } from '../';
import { Language, Route } from '../../../enums';
import { i18n, routesDefinition, WithRouter, WithRouterProps } from '../../../utils';

@WithRouter()
class LangSwitch extends PureComponent<WithRouterProps> {
  private getCurrentRouteName(): Route | undefined {
    return routesDefinition.find(route => route.pathname[i18n.lang] === this.props.router.pathname)
      ?.name;
  }

  public render(): ReactElement {
    const routeName = this.getCurrentRouteName();
    if (routeName) {
      return (
        <div>
          {Object.values(Language).map(lang => (
            <Link
              className="ml-1"
              key={lang}
              lang={lang}
              query={this.props.router.query}
              to={routeName}
            >
              {lang}
            </Link>
          ))}
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default LangSwitch;
