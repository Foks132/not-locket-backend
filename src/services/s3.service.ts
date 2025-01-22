/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as Minio from "minio";
import { BucketService } from "src/bucket/bucket.service";

@Injectable()
export class S3Service {
  public s3Client: Minio.Client;

  constructor(private configService: ConfigService, private bucketService: BucketService) {
    this.s3Client = new Minio.Client({
      endPoint: this.configService.get("S3_HOST"),
      port: 9000,
      useSSL: false,
      accessKey: this.configService.get("S3_ACCESSKEY"),
      secretKey: this.configService.get("S3_SECRETKEY"),
    });
  }

  async createBucketIfNotExists(name: string): Promise<void> {
    const bucketExists = await this.s3Client.bucketExists(name);
    if (!bucketExists) {
      await this.s3Client.makeBucket(name);
      await this.bucketService.create({ name });
    }
  }

  async uploadFile(
    bucket: string,
    objectName: string,
    filePath: string,
    metaData: object,
  ): Promise<void> {
    await this.s3Client.fGetObject(bucket, objectName, filePath, metaData);
  }

  async uploadSFile(
    bucket: string,
    objectName: string,
    stream: Buffer,
    size: number,
    metaData: Minio.ItemBucketMetadata,): Promise<void> {
    await this.s3Client.putObject(bucket, objectName, stream, size, metaData)
  }
}
