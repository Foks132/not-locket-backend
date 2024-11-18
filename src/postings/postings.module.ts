import { Module } from '@nestjs/common';
import { PostingsService } from './postings.service';
import { PostingsController } from './postings.controller';
import { S3FileManagement } from './utils/s3-fille-management';
import { Posting } from './entities/posting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Posting])],
  controllers: [PostingsController],
  providers: [PostingsService, S3FileManagement],
})
export class PostingsModule {}
