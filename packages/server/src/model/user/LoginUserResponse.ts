import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class LoginUserResponse {
  @Field(() => String)
  public accessToken: string;

  @Field(() => Int)
  public expiresIn: number;
}
