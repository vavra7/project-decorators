import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { AuthHandler } from '../handlers';
import { LoginAuthResponse } from '../model';
import { ResolverContext } from '../types';

@Resolver()
export class AuthResolver {
  @Inject()
  private readonly handler: AuthHandler;

  @Mutation(() => LoginAuthResponse)
  public loginAuth(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: ResolverContext
  ): Promise<LoginAuthResponse> {
    console.log('context', ctx.req.context);
    return this.handler.loginAuth(email, password);
  }
}
