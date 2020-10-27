import { Language } from '../enums';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length } from '../validations';

export class RegisterUserBase {
  @Length(5, 100)
  @IsEmail()
  @IsNotEmpty()
  @IsEnum(Language)
  public email: string;

  @Length(2, 100)
  @IsNotEmpty()
  public firstName: string;

  @Length(2, 100)
  @IsNotEmpty()
  public lastName: string;

  @Length(5, 100)
  @IsNotEmpty()
  public password: string;

  @IsOptional()
  @IsEnum(Language)
  public preferredLanguage?: Language;
}
