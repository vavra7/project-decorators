import { Controller, Get, Post } from '@project-decorators/type-express';
import { Request } from 'express';
import { User } from '../entities';
import { UserHandler } from '../handlers';
import { bodyJson } from '../middlewares/expressMiddlewares';

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

  // @UseMiddleware(bodyJson)
  @Post('/')
  public registerUser(req: Request): Promise<User> {
    // const user = req.body;
    // return this.handler.registerUser(user);
    return this.handler.registerUser({
      email: 'adsf@asdf.cz',
      firstName: 'Pepa2',
      lastName: 'Drozd2',
      password: 'asdfsdaf'
    });
  }
}
