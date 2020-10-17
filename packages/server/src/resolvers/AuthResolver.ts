import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { NotAuthenticatedError } from '../errors';
import { AuthHandler } from '../handlers';
import { AccessTokenAuthResponse } from '../models';
import { ResolverContext } from '../types';

@Resolver()
export class AuthResolver {
  private readonly refreshToken = 'refresh_token';

  @Inject()
  private readonly handler: AuthHandler;

  @Mutation(() => AccessTokenAuthResponse)
  public async loginAuth(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: ResolverContext
  ): Promise<AccessTokenAuthResponse> {
    const { accessTokenData, refreshTokenData } = await this.handler.loginAuth(email, password);
    ctx.res.cookie(this.refreshToken, refreshTokenData.token, { httpOnly: true });
    return Object.assign(new AccessTokenAuthResponse(), {
      accessToken: accessTokenData.token,
      expiresIn: accessTokenData.expiresIn
    });
  }

  @Mutation(() => AccessTokenAuthResponse)
  public refreshTokenAuth(@Ctx() ctx: ResolverContext): Promise<AccessTokenAuthResponse> {
    const refreshToken: string | undefined = ctx.req.cookies[this.refreshToken];
    if (!refreshToken) throw new NotAuthenticatedError();
    return this.handler.refreshTokenAuth(refreshToken);
  }

  @Mutation(() => Boolean)
  public logoutAuth(@Ctx() ctx: ResolverContext): true {
    const refreshToken: string | undefined = ctx.req.cookies.refresh_token;
    ctx.res.clearCookie(this.refreshToken);
    return this.handler.logoutAuth(refreshToken);
  }
}
