import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsUserEmailUnique } from '../validations';

@InputType()
export class RegisterUserInput {
  @Length(5, 100)
  @IsEmail()
  @IsUserEmailUnique()
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
