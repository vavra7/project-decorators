import { Language, Route } from '@project-decorators/shared';
import { SingletonRouter, withRouter } from 'next/router';
import { Component, ReactElement } from 'react';
import { Link } from '../components/commons';
import { BindThis, i18n } from '../utils';

interface State {
  number: number;
}

class Index extends Component<SingletonRouter, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      number: 0
    };
  }

  @BindThis()
  private handleClick(): void {
    console.log(this.state.number);
    this.props.router?.push('/en');
  }

  @BindThis()
  private handleClick2(): void {
    this.props.router?.push('/');
  }

  public render(): ReactElement {
    return (
      <div>
        <div>{i18n.locale}</div>
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

export default withRouter(Index as any);
