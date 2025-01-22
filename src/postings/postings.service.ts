import { Injectable, OnModuleInit } from "@nestjs/common";
import { CreatePostingDto } from "./dto/create-posting.dto";
import { S3Service } from "../services/s3.service";
import { Repository } from "typeorm";
import { Posting } from "./entities/posting.entity";
import { ReadPostingDto } from "./dto/read-posting.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BucketService } from "src/bucket/bucket.service";
import { extname } from "path";

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
    const queryRunner =
      this.postingsRepository.manager.connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const date = new Date();
      const formattedDate = date.toISOString().replace(/:/g, "-");
      const fileNameExtension = extname(file.originalname);
      const fileName = `userId:${userId} date:${formattedDate}${fileNameExtension}`;

      const post: CreatePostingDto = {
        bucketId: 1,
        userId: userId,
        name: fileName,
        description: null,
        size: file.size,
      };

      const savedPost = await queryRunner.manager.save(
        this.postingsRepository.target,
        post,
      );

      const bucket = await this.bucketService.findOne(post.bucketId);

      const metaData = {
        "Content-Type": "multipart/form-data",
        "X-Amz-Meta-Name": post.name,
        "X-Amz-Meta-Id": post.id,
        "X-Amz-Meta-Userid": post.userId,
        "Cache-Control": "public, max-age=31536000",
      };

      await this.s3Service.uploadSFile(
        bucket.name,
        savedPost.name,
        file.buffer,
        file.size,
        metaData,
      );

      await queryRunner.commitTransaction();

      return {
        id: post.id,
        name: post.name,
        description: post.description,
        userId: userId,
      };
    } catch (error) {
      console.error("Error creating posting:", error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
