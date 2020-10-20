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
    router.push('/login');
  }

  public render(): ReactElement {
    return (
      <div>
        <button onClick={this.handleClick} type="button">
          button
        </button>
        <br />
      </div>
    );
  }
}

export default Index;
