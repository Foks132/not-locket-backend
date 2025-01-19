import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePostingDto {
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumber()
  bucketId?: number;

  @IsOptional()
  @IsNumber()
  userId: number;

  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  size: number;
}
