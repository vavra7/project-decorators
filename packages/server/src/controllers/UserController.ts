import { Controller } from '../decorators/controller';
import { Get } from '../decorators/routeDecorators';
import { UserHandler } from '../handlers';

@Controller('/user')
export class UserController {
  private handler: UserHandler;

  constructor() {
    this.handler = new UserHandler();
  }

  @Get('/test')
  public test(): string {
    return this.handler.getUser();
  }

  /**
   * Test decorated route
   */
  @Get('/')
  public getUser(): string {
    return this.handler.getUser();
  }
}
