/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';

@Entity({ name: 'Tokens' })
export class Token {
  @PrimaryColumn({ type: 'nvarchar', unique: true, nullable: false, length: 300 })
  token: string;

  @Column({ type: 'datetime' })
  exp: Date;

  @OneToOne(() => User, (u) => u.token)
  @JoinColumn()
  @Type(() => User)
  user?: User;
  @RelationId((t: Token) => t.user)
  @Column()
  userId: number;
}
