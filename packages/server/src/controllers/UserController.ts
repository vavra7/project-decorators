import {
  Authorized,
  Controller,
  Get,
  Post,
  UseMiddleware
} from '@project-decorators/express-decorators';
import { Request } from 'express';
import { UserHandler } from '../handlers';
import { bodyJson } from '../middlewares/expressMiddlewares';
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

  @Post('/')
  @Authorized()
  @UseMiddleware(bodyJson)
  public createUser(req: Request): User {
    const user = req.body;

    return this.handler.createUser(user);
  }
}
