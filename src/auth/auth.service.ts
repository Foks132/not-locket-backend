import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Token } from './types';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<ReadUserDto | null> {
    const user = await this.userService.findByEmail(email);
    console.log(user);
    const passwordIsMatch = await argon2.verify(user.password, password);
    if (user && passwordIsMatch) {
      return user;
    }
    throw new UnauthorizedException('User or password is incorrect');
  }

  async login(user: LoginAuthDto): Promise<Token | null> {
    const payload: JwtPayload = { id: user.id, email: user.email };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
