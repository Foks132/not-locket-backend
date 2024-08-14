/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from 'class-validator';

export enum UserGender {
    MALE = 'male',
    FEMALE = 'female',
  }

export class CreateAuthDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  gender: UserGender;
}
