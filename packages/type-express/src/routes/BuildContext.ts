import { AuthChecker, BuildRoutesOptions } from '../interfaces';

export class BuildContext {
  public static authChecker?: AuthChecker;

  public static create(options: BuildRoutesOptions): void {
    if (options.authChecker) {
      this.authChecker = options.authChecker;
    }
  }
}
