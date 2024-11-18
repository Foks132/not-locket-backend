import { PartialType } from '@nestjs/mapped-types';
import { CreatePostingDto } from './create-posting.dto';

export class UpdatePostingDto extends PartialType(CreatePostingDto) {}
