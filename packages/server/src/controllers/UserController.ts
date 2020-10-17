import { Authorized, Body, Controller, Ctx, Get, Post } from '@project-decorators/type-express';
import { Inject } from 'typedi';
import { User } from '../entities';
import { UserHandler } from '../handlers';
import { RegisterUserInput } from '../models';

@Controller('/user')
export class UserController {
  @Inject()
  private readonly handler: UserHandler;

  @Get('/')
  @Authorized()
  public getUser(@Ctx() ctx: any): string {
    console.log('ctx', ctx.req);
    return this.handler.getUser();
  }

  @Post('/')
  public registerUser(@Body() registerUserInput: RegisterUserInput): Promise<User> {
    return this.handler.registerUser(registerUserInput);
  }
}
