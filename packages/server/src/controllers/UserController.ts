import { Authorized, Controller, Get, Post } from '@project-decorators/express-decorators';
import { UserHandler } from '../handlers';
import { User } from '../model/User';

@Controller('/user')
export class UserController {
  private handler: UserHandler;

  constructor() {
    this.handler = new UserHandler();
  }

  @Get('/')
  public getUser(): string {
    return this.handler.getUser();
  }

  @Authorized()
  @Post('/')
  public createUser(): User {
    return this.handler.createUser({
      firstName: 'Pepa',
      lastName: 'Drozd'
    });
  }
}
