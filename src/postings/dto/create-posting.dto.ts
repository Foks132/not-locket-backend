import { IsNumber, IsString } from 'class-validator';

export class CreatePostingDto {
  @IsNumber()
  id?: number;

  @IsString()
  bucket: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  size: number;

  @IsString()
  sourceFile: string;
}
