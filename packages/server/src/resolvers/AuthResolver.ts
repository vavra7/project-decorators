import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { NotAuthenticatedError } from '../errors';
import { AuthHandler } from '../handlers';
import { AccessTokenAuthResponse } from '../models';
import { ResolverContext } from '../types';

@Resolver()
export class AuthResolver {
  private readonly cookieRefreshToken = 'refresh_token';

  @Inject()
  private readonly handler: AuthHandler;

  @Mutation(() => AccessTokenAuthResponse, { name: 'loginAuth' })
  public async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: ResolverContext
  ): Promise<AccessTokenAuthResponse> {
    const { accessTokenData, refreshTokenData } = await this.handler.login(email, password);
    ctx.res.cookie(this.cookieRefreshToken, refreshTokenData.token, { httpOnly: true });
    return Object.assign(new AccessTokenAuthResponse(), {
      accessToken: accessTokenData.token,
      expiresIn: accessTokenData.expiresIn
    });
  }

  @Mutation(() => AccessTokenAuthResponse, { name: 'refreshTokenAuth' })
  public refreshToken(@Ctx() ctx: ResolverContext): Promise<AccessTokenAuthResponse> {
    const refreshToken: string | undefined = ctx.req.cookies[this.cookieRefreshToken];
    if (!refreshToken) throw new NotAuthenticatedError();
    return this.handler.refreshToken(refreshToken);
  }

  @Mutation(() => Boolean, { name: 'logoutAuth' })
  public logout(@Ctx() ctx: ResolverContext): true {
    const refreshToken: string | undefined = ctx.req.cookies.refresh_token;
    ctx.res.clearCookie(this.cookieRefreshToken);
    return this.handler.logout(refreshToken);
  }
}
