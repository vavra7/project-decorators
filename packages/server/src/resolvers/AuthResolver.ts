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
  public async loginAuth(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: ResolverContext
  ): Promise<LoginAuthResponse> {
    const { accessTokenData, refreshTokenData } = await this.handler.loginAuth(email, password);
    ctx.res.cookie('refresh_token', refreshTokenData.token, { httpOnly: true });
    return Object.assign(new LoginAuthResponse(), {
      accessToken: accessTokenData.token,
      expiresIn: accessTokenData.expiresIn
    });
  }
}
