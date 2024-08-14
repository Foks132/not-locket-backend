/* eslint-disable prettier/prettier */
import { IsString, Length } from 'class-validator';

export class FindUserDto {
  @IsString()
  @Length(1, 150)
  username?: string;

  @IsString()
  @Length(1, 150)
  email?: string;
}
