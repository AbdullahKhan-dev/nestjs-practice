import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @MinLength(8)
  username: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message:
      'Password must contain minimum eight characters, at least one capital letter and one number:',
  }) //Minimum eight characters, at least one letter and one number:
  password: string;
}
