import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class AccessTokenAuthResponse {
  @Field(() => String)
  public accessToken: string;

  @Field(() => Int)
  public expiresIn: number;
}
