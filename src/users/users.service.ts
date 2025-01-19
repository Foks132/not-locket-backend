/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserGender } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadUserDto } from './dto/read-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { promises } from 'dns';
import { JwtPayload, Token } from 'src/auth/types';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<LoginUserDto | null> {
        if (await this.emailExists(createUserDto.email)) {
            throw new BadRequestException('This email already exist!')
        }

        const token = this.jwtService.sign({ email: createUserDto.email })
        const user = await this.userRepository.save({
            gender: UserGender.MALE,
            firstname: createUserDto.firstname,
            lastname: createUserDto.lastname,
            username: createUserDto.username,
            email: createUserDto.email,
            password: await argon2.hash(createUserDto.password),
            accessToken: token
        })
        const { password, ...userWithoutPassword } = user;
        return { ...userWithoutPassword };
    }

    async updateToken(accessToken: string): Promise<Token | null> {
        const payload: JwtPayload = this.jwtService.verify(accessToken);
        const user = await this.userRepository.findOneBy({ id: payload.sub });
        if (!user) {
            throw new BadRequestException('User not found');
        }

        const newPayload: JwtPayload = {
            sub: user.id,
            email: user.email
        }
        const newAccessToken: string = this.jwtService.sign(newPayload);
        user.accessToken = newAccessToken;
        this.userRepository.save(user);
        console.log(newAccessToken)
        return { accessToken: newAccessToken };
    }

    async findAll(): Promise<ReadUserDto[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<ReadUserDto | null> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new HttpException('User not found by id', HttpStatus.NOT_FOUND);
        }
        console.log(user)
        return user;
    }

    async findByUsername(username: string): Promise<ReadUserDto | null> {
        const user = await this.userRepository.findOneBy({ username });
        if (!user) {
            throw new HttpException('User not found by username', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async findByEmail(email: string): Promise<ReadUserDto | null> {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new HttpException('User not found by email', HttpStatus.NOT_FOUND)
        }
        return user
    }

    async emailExists(email: string): Promise<boolean> {
        return this.userRepository.exists({ where: { email: email } })
    }

    async usernameExists(username: string): Promise<boolean> {
        return this.userRepository.exists({ where: { username: username } })
    }
}
