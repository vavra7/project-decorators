import { Request, Response } from 'express';
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
  public test(req: Request, res: Response): string {
    return this.handler.getUser();
  }

  /**
   * Test decorated route
   */
  @Get('/')
  public getUser(req: Request, res: Response): string {
    return this.handler.getUser();
  }
}
