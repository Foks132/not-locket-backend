/* eslint-disable prettier/prettier */
import { IsString, Length } from 'class-validator';

export enum UserGender {
    MALE = 'male',
    FEMALE = 'female',
  }

export class ReadUserDto {
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
}
