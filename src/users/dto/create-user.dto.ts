/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsString, Length, MinLength } from 'class-validator';
import { UserGender } from './read-user.dto';


export class CreateUserDto {
  @IsString()
  @Length(1, 150)
  firstname: string;

  @IsString()
  @Length(1, 150)
  lastname: string;

  @IsString()
  @Length(1, 150)
  username: string;

  @IsEmail()
  @Length(1, 150)
  email: string;

  @IsString()
  @Length(1, 150)
  @MinLength(6, { message: 'The password must contain more than 6 characters' })
  password: string;

  @IsEnum(UserGender)
  gender: UserGender;
}
