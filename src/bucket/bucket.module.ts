import { Module } from "@nestjs/common";
import { BucketService } from "./bucket.service";
import { BucketController } from "./bucket.controller";
import { Bucket } from "./entities/bucket.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Bucket])],
  controllers: [BucketController],
  providers: [BucketService],
  exports: [BucketService],
})
export class BucketModule {}
