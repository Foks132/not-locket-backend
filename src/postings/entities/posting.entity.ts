import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Postings' })
export class Posting {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'nvarchar', length: 150 })
  bucket: string;

  @Column({ type: 'nvarchar', length: 150 })
  name: string;

  @Column({ type: 'nvarchar', length: 100 })
  description: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'int' })
  size: number;
}
