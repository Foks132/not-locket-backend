/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";
export class CreateBucketDto {
  @IsNumber()
  id?: number;

  @IsString()
  name: string;
}
