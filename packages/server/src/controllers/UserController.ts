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

  // @UseMiddleware(bodyJson)
  @Post('/:hi')
  public registerUser(
    @Body() registerUserInput: RegisterUserInput,
    @Params() params: number
  ): Promise<User> {
    console.log('from controller', registerUserInput);
    // const user = req.body;
    // return this.handler.registerUser(user);
    return this.handler.registerUser(registerUserInput);
  }
}
