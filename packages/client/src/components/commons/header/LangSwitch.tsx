import { SingletonRouter, withRouter } from 'next/router';
import { FC } from 'react';
import { Language } from '../../../enums';
import { i18n, routesDefinition } from '../../../utils';
import { Link } from '../Link';

interface Props {
  router: SingletonRouter;
}

const LangSwitch: FC<Props> = props => {
  const routeName = routesDefinition.find(
    route => route.pathname[i18n.lang] === props.router.pathname
  )?.name;
  if (!routeName) {
    return <></>;
  } else {
    return (
      <div>
        {Object.values(Language).map(lang => (
          <Link
            className="ml-1"
            key={lang}
            lang={lang}
            query={props.router.query as any}
            to={routeName}
          >
            {lang}
          </Link>
        ))}
      </div>
    );
  }
};

export default withRouter(LangSwitch);
