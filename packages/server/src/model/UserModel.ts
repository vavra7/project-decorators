import { Field, InputType } from '@project-decorators/type-graphql';
import { IsEmail, Length } from 'class-validator';

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
