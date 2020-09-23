import { IsEmail, Length } from 'class-validator';
import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class RegisterUserInput {
  @Length(5, 100)
  @IsEmail()
  @Field(() => String)
  email: string;

  @Length(2, 100)
  @Field(() => String)
  firstName: string;

  @Length(2, 100)
  @Field(() => String)
  lastName: string;

  @Length(5, 100)
  @Field(() => String)
  password: string;
}
