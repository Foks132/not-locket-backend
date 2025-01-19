/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { isEmpty } from 'class-validator';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  async findUser(@Body() dto : FindUserDto) {
    if (isEmpty(dto.email)) {
      return await this.usersService.findByUsername(dto.username);
    }
    if (isEmpty(dto.username)) {
      return await this.usersService.findByEmail(dto.email);
    }
  }
}
