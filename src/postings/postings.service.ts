import { Injectable } from '@nestjs/common';
import { CreatePostingDto } from './dto/create-posting.dto';
import { S3FileManagement } from './utils/s3-fille-management';
import { Repository } from 'typeorm';
import { Posting } from './entities/posting.entity';
import { ReadPostingDto } from './dto/read-posting.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostingsService {
  constructor(
    @InjectRepository(Posting)
    private postingsRepository: Repository<Posting>,
    private s3FileManagement: S3FileManagement,
  ) {
    this.s3FileManagement.createBucketIfNotExists('images');
  }

  async create(
    createPostingDto: CreatePostingDto,
  ): Promise<ReadPostingDto | null> {
    const metaData = {
      'Content-Type': 'multipart/form-data',
      'X-Amz-Meta-Name': createPostingDto.name,
      id: createPostingDto.id,
    };
    await this.s3FileManagement.s3Client.fPutObject(
      createPostingDto.bucket,
      createPostingDto.name,
      createPostingDto.sourceFile,
      metaData,
    );
    const posting = await this.postingsRepository.save(createPostingDto);
    return {
      id: posting.id,
      name: posting.name,
      size: posting.size,
    };
  }
}
