import { Body, Controller, Get, Params, Post } from '@project-decorators/type-express';
import { User } from '../entities';
import { UserHandler } from '../handlers';
import { RegisterUserInput } from '../model';

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
  public registerUser(
    @Body() registerUserInput: RegisterUserInput,
    @Params() params: any
  ): Promise<User> {
    registerUserInput.hashPassword();
    return this.handler.registerUser(registerUserInput);
  }
}
