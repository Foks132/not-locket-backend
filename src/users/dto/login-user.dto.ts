/* eslint-disable prettier/prettier */
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ReadUserDto } from './read-user.dto';
import { IsString } from 'class-validator';

export class LoginUserDto extends PartialType(
  OmitType(ReadUserDto, ['password'] as const),
) {
  @IsString()
  accessToken: string;
}
