/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';
import { Posting } from 'src/postings/entities/posting.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'set',
    enum: UserGender,
    default: [UserGender.MALE],
  })
  gender: UserGender;

  @Column({ type: 'nvarchar', length: 150 })
  firstname: string;

  @Column({ type: 'nvarchar', length: 150 })
  lastname: string;

  @Column({ type: 'nvarchar', length: 150 })
  username: string;

  @Column({ type: 'nvarchar', select: false })
  email: string

  @Column({ type: 'nvarchar', select: true })
  password: string

  @Column({ type: 'nvarchar', select: false, nullable: true })
  @IsOptional()
  accessToken?: string

  @Column({ type: 'nvarchar', select: false, nullable: true })
  @IsOptional()
  refreshToken?: string

  @OneToMany(() => Posting, (posting) => posting.user, { cascade: true })
  postings: Posting[];
}