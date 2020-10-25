import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { User } from '../entities';
import { NotAuthenticatedError } from '../errors';
import { UserHandler } from '../handlers';
import { RegisterUserInput } from '../models';
import { ResolverContext } from '../types';

@Resolver()
export class UserResolver {
  @Inject()
  private readonly handler: UserHandler;

  @Authorized()
  @Query(() => User, { name: 'meUser' })
  public me(@Ctx() ctx: ResolverContext): Promise<User> {
    const userId = ctx.req.context.userId;
    if (!userId) throw new NotAuthenticatedError();
    return this.handler.me(userId);
  }

  @Mutation(() => User, { name: 'registerUser' })
  public register(
    @Arg('data')
    data: RegisterUserInput
  ): Promise<User> {
    return this.handler.register(data);
  }

  @Mutation(() => User, { name: 'confirmEmailUser' })
  public confirmEmail(@Arg('token') token: string): Promise<User> {
    return this.handler.confirmEmail(token);
  }
}
