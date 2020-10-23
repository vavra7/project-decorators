import { SingletonRouter, withRouter } from 'next/router';
import { Component, ReactElement } from 'react';
import { Link } from '../components/commons';
import { Language, Route } from '../enums';
import { i18n, t } from '../utils';

interface State {
  number: number;
}

class Home extends Component<SingletonRouter, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      number: 0
    };
  }

  public render(): ReactElement {
    return (
      <div>
        <h1>{t('views.home.title')}</h1>
        <div>{i18n.lang}</div>
        <Link locale={Language.En} to={Route.Home}>
          <button type="button">to en home</button>
        </Link>
        <br />
        <Link locale={Language.Cs} to={Route.Home}>
          <button type="button">to cz home</button>
        </Link>
        <br />
        <Link to={Route.Login}>
          <button type="button">to locale login</button>
        </Link>
        <br />
        <Link query={{ token: 'some-token' }} to={Route.ConfirmEmail}>
          <button type="button">to locale confirm</button>
        </Link>
        <br />
      </div>
    );
  }
}

export default withRouter(Home as any);
