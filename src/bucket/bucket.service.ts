/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateBucketDto } from "./dto/create-bucket.dto";
import { Bucket } from "./entities/bucket.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ReadBucketDto } from "./dto/read-bucket.dto copy";

@Injectable()
export class BucketService {
  constructor(
    @InjectRepository(Bucket)
    private bucketRepostiory: Repository<Bucket>,
  ) {}

  async create(createBucketDto: CreateBucketDto) {
    return this.bucketRepostiory.save(createBucketDto);
  }

  async findOne(id: number): Promise<ReadBucketDto | null> {
    const bucket = await this.bucketRepostiory.findOneBy({ id });
    if (!bucket) {
      throw new HttpException("Bucket not found by id", HttpStatus.NOT_FOUND);
    }
    return bucket;
  }
}
