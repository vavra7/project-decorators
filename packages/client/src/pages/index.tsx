import { routes } from '@project-decorators/shared';
import Link from 'next/link';
import { Component, ReactElement } from 'react';
import { BindThis } from '../utils';

interface State {
  number: number;
}

class Index extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      number: 0
    };
  }

  @BindThis()
  private handleClick(): void {
    console.log(this.state.number);
  }

  private handleClick2(): void {
    console.log(this.state.number);
  }

  public render(): ReactElement {
    return (
      <div>
        <button onClick={this.handleClick} type="button">
          button
        </button>
        <button onClick={this.handleClick2} type="button">
          button2
        </button>
        <br />
        <Link href={{ pathname: routes.login.en }}>
          <a>EN LOGIN</a>
        </Link>
        <br />
        <Link href={{ pathname: routes.login.cs }}>
          <a>CZ LOGIN</a>
        </Link>
      </div>
    );
  }
}

export default Index;
