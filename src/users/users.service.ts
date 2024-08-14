/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadUserDto } from './dto/read-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
  
    async findAll(): Promise<ReadUserDto[]> {
        return await this.userRepository.find();
    }
    
    async findOne(id: number): Promise<ReadUserDto | null> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new HttpException('User not found 1', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async findByUsername(username: string): Promise<ReadUserDto | null> {
        const user = await this.userRepository.findOneBy({ username });
        if (!user) {
            throw new HttpException('User not found 2', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async create(dto: User, manager: EntityManager = this.userRepository.manager): Promise<User | null> {
        return manager.save(User, dto)
    }

    async findByEmail(email: string): Promise<ReadUserDto | null> {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new HttpException('User not found 3', HttpStatus.NOT_FOUND)
        }
        return user
    }

    async emailExists(email: string): Promise<boolean> {
        return this.userRepository.existsBy({ email })
    }

    async usernameExists(username: string): Promise<boolean> {
        return this.userRepository.existsBy({ username })
    }
}
