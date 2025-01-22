/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";

export class ReadPostingDto {
  @IsNumber()
  id?: number;

  @IsNumber()
  userId?: number;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
