import { Route } from '@project-decorators/shared';
import { Component, ReactElement } from 'react';
import { BindThis, router } from '../utils';

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
    router.push(Route.Login);
  }

  private handleClick2(): void {
    router.push(Route.ConfirmEmail, { token: 'aaaaaaaaaaaa', bubu: 'eeeeeeeeeeee' });
  }

  public render(): ReactElement {
    return (
      <div>
        <button onClick={this.handleClick} type="button">
          button
        </button>
        <br />
        <button onClick={this.handleClick2} type="button">
          button
        </button>
        <br />
      </div>
    );
  }
}

export default Index;
