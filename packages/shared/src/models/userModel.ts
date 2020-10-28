import { Language } from '../enums';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MaxLength, MinLength } from '../validations';

export class RegisterUserBase {
  @MaxLength(100)
  @MinLength(5)
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @MaxLength(100)
  @MinLength(2)
  @IsNotEmpty()
  public firstName: string;

  @MaxLength(100)
  @MinLength(2)
  @IsNotEmpty()
  public lastName: string;

  @MaxLength(100)
  @MinLength(5)
  @IsNotEmpty()
  public password: string;

  @IsOptional()
  @IsEnum(Language)
  public preferredLanguage?: Language;
}
