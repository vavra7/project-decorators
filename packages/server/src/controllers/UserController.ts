import { Body, Controller, Get, Post } from '@project-decorators/type-express';
import { Inject } from 'typedi';
import { User } from '../entities';
import { UserHandler } from '../handlers';
import { RegisterUserInput } from '../model';

@Controller('/user')
export class UserController {
  @Inject()
  private handler: UserHandler;

  @Get('/')
  public getUser(): string {
    return this.handler.getUser();
  }

  @Post('/')
  public registerUser(@Body() registerUserInput: RegisterUserInput): Promise<User> {
    return this.handler.registerUser(registerUserInput);
  }
}
