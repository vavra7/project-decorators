import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
}
