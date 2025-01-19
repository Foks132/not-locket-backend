/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export enum UserGender {
    MALE = 'male',
    FEMALE = 'female',
  }

export class ReadUserDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  @Length(1, 150)
  username: string;

  @IsString()
  @Length(1, 150)
  email: string;

  @IsString()
  @Length(1, 150)
  firstname: string;

  @IsString()
  @Length(1, 150)
  lastname: string;

  @IsString()
  gender: UserGender;

  @IsString()
  password: string;

  @IsOptional()
  accessToken?: string;
}
