/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ReadUserDto } from 'src/users/dto/read-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async create(dto: CreateAuthDto): Promise<ReadUserDto | null> {
    if (await this.userService.emailExists(dto.email)) {
      throw new HttpException('This email address is already in use', HttpStatus.CONFLICT);
    }
    if (await this.userService.usernameExists(dto.username)) {
      throw new HttpException('This user name is already in use', HttpStatus.CONFLICT);
    }
    const user = await this.userService.create(
      {
        firstname: dto.firstname,
        lastname: dto.lastname,
        username: dto.username,
        email: dto.email,
        password: dto.password,
        gender: dto.gender
      })
      if (!user) {
        throw new HttpException('User data is incorrect', HttpStatus.BAD_REQUEST);
      }
      return user;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
