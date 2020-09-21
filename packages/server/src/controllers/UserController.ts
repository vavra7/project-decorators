import { Controller, Get, Post } from '@project-decorators/express-decorators';
import { User, UserHandler } from '../handlers';

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

  @Post('/')
  public createUser(): User {
    return this.handler.createUser({
      firstName: 'Pepa',
      lastName: 'Drozd'
    });
  }
}
