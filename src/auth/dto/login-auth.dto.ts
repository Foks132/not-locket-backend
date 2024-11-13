/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class LoginAuthDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
