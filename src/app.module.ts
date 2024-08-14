/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3311,
        username: 'root',
        password: 'root',
        database: 'base',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TokensModule
  ],
})
export class AppModule {}
