import { Arg, Mutation, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { AuthHandler } from '../handlers';
import { LoginAuthResponse } from '../model';

@Resolver()
export class AuthResolver {
  @Inject()
  private readonly handler: AuthHandler;

  @Mutation(() => LoginAuthResponse)
  public loginAuth(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<LoginAuthResponse> {
    return this.handler.loginAuth(email, password);
  }
}
