import { Injectable, OnModuleInit } from "@nestjs/common";
import { CreatePostingDto } from "./dto/create-posting.dto";
import { S3Service } from "../services/s3.service";
import { Repository } from "typeorm";
import { Posting } from "./entities/posting.entity";
import { ReadPostingDto } from "./dto/read-posting.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BucketService } from "src/bucket/bucket.service";

@Injectable()
export class PostingsService implements OnModuleInit {
  constructor(
    @InjectRepository(Posting)
    private postingsRepository: Repository<Posting>,
    private bucketService: BucketService,
    private s3Service: S3Service,
  ) {}

  async onModuleInit() {
    await this.s3Service.createBucketIfNotExists("images");
  }

  async create(
    file: Express.Multer.File,
    userId: number,
  ): Promise<ReadPostingDto | null> {
    try {
      const post: CreatePostingDto = {
        bucketId: 1,
        userId: userId,
        name: file.originalname,
        description: null,
        size: file.size,
      };
      const posting = await this.postingsRepository.save(post);
      const bucket = await this.bucketService.findOne(post.bucketId);

      const metaData = {
        "Content-Type": "multipart/form-data",
        "X-Amz-Meta-Name": file.fieldname,
        Id: post.id,
        UserId: userId,
      };

      await this.s3Service.uploadSFile(
        bucket.name,
        posting.name,
        file.buffer,
        file.size,
        metaData,
      );

      return {
        id: posting.id,
        name: posting.name,
        description: posting.description,
        userId: userId,
      };
    } catch (error) {
      console.error("Error creating posting:", error);
      throw error;
    }
  }
}
