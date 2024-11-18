/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class S3FileManagement {
  public s3Client: Minio.Client;
  constructor(private configService: ConfigService) { this.s3Client = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: this.configService.get('S3_ACCESSKEY'),
    secretKey: this.configService.get('S3_SECRETKEY'),
  });}
  
  async createBucketIfNotExists(name: string): Promise<void> {
    const bucketExists = await this.s3Client.bucketExists(name);
    if (!bucketExists) {
      await this.s3Client.makeBucket(name);
    }
  }
}

