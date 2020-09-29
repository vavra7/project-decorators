import { AuthChecker, BuildRoutesOptions } from '../interfaces';
import { IOCContainer } from '../utils/container';

export class Context {
  public static authChecker?: AuthChecker;
  public static container = new IOCContainer();

  public static create(options: BuildRoutesOptions): void {
    if (options.authChecker) {
      this.authChecker = options.authChecker;
    }
    if (options.container) {
      this.container = new IOCContainer(options.container);
    }
  }
}
