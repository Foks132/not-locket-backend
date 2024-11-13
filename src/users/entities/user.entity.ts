/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { Token } from 'src/tokens/entities/token.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  RelationId,
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

  @OneToOne(() => Token, t => t.user)
  @JoinColumn()
  @Type(() => Token)
  token?: Token;
  @RelationId((u: User) => u.token)
  @Column({ nullable: true })
  tokenId?: number;
}