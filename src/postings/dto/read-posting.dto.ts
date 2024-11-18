import { IsNumber, IsString } from 'class-validator';

export class ReadPostingDto {
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsNumber()
  size: number;
}
