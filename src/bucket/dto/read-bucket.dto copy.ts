/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
export class ReadBucketDto {
  @IsString()
  name: string;
}
