import { Module } from "@nestjs/common";
import { PostingsService } from "./postings.service";
import { PostingsController } from "./postings.controller";
import { S3Service } from "src/services/s3.service";
import { Posting } from "./entities/posting.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BucketService } from "src/bucket/bucket.service";
import { Bucket } from "src/bucket/entities/bucket.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Posting, Bucket])],
  controllers: [PostingsController],
  providers: [PostingsService, BucketService, S3Service],
})
export class PostingsModule {}
