import { Component, ReactElement } from 'react';

interface State {
  number: number;
}

function BindThis(): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (!descriptor || typeof descriptor.value !== 'function') {
      throw new TypeError(
        `Only methods can be decorated with @BindThis(). <${propertyKey.toString()}> is not a method.`
      );
    }

    return {
      get(this) {
        return (descriptor.value as any).bind(this);
      }
    };
  };
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
      </div>
    );
  }
}

export default Index;
