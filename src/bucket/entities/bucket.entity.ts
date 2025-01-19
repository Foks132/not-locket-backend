import { Posting } from "src/postings/entities/posting.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Bucket" })
export class Bucket {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "nvarchar", length: 150 })
  name: string;

  @OneToMany(() => Posting, (posting) => posting.bucket, { cascade: true })
  postings: Posting[];
}
