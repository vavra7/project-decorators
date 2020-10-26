import { RegisterUserBase } from '@project-decorators/shared';
import { Field, InputType } from 'type-graphql';
import { GqlLanguage, Language } from '../enums';
import { IsUserEmailUnique } from '../validations';

@InputType()
export class RegisterUserInput extends RegisterUserBase {
  @IsUserEmailUnique()
  @Field(() => String)
  public email: string;

  @Field(() => String)
  public firstName: string;

  @Field(() => String)
  public lastName: string;

  @Field(() => String)
  public password: string;

  @Field(() => GqlLanguage, { nullable: true, description: "User's preferred language." })
  public preferredLanguage?: Language;
}
