import { Controller, Post, Body } from '@nestjs/common';
import { PostingsService } from './postings.service';
import { CreatePostingDto } from './dto/create-posting.dto';

@Controller('postings')
export class PostingsController {
  constructor(private readonly postingsService: PostingsService) {}

  @Post('create')
  create(@Body() createPostingDto: CreatePostingDto) {
    return this.postingsService.create(createPostingDto);
  }
}
