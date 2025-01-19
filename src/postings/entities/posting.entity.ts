import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { Bucket } from "src/bucket/entities/bucket.entity";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";

@Entity({ name: "Postings" })
export class Posting {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "nvarchar", length: 150 })
  name: string;

  @Column({ type: "nvarchar", length: 100, nullable: true })
  description: string;

  @Type(() => User)
  @IsOptional()
  @ManyToOne(() => User, (user) => user.postings, { onDelete: "CASCADE" })
  @JoinColumn()
  user?: User;
  @IsOptional()
  @RelationId((posting: Posting) => posting.user)
  @Column()
  userId?: number;

  @Type(() => Bucket)
  @IsOptional()
  @ManyToOne(() => Bucket, (bucket) => bucket.postings, { onDelete: "CASCADE" })
  @JoinColumn()
  bucket?: Bucket;
  @IsOptional()
  @RelationId((posting: Posting) => posting.bucket)
  @Column()
  bucketId?: number;

  @IsOptional()
  @Column({ type: "int" })
  size: number;

  @Type(() => Date)
  @IsOptional()
  @CreateDateColumn({
    type: "datetime",
  })
  createdAt?: Date;
}
