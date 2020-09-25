import { IsEmail, Length } from 'class-validator';
import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  public id: string;

  @Field()
  public email: string;

  @Field()
  public firstName: string;

  @Field()
  public lastName: string;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}

@InputType()
export class RegisterUserInput {
  @Length(5, 100)
  @IsEmail()
  @Field(() => String)
  public email: string;

  @Length(2, 100)
  @Field(() => String)
  public firstName: string;

  @Length(2, 100)
  @Field(() => String)
  public lastName: string;

  @Length(5, 100)
  @Field(() => String)
  public password: string;
}
