/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { log } from 'console';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const configService = new ConfigService();
  await app.listen(configService.get('APP_PORT'));
  log(`Server started: ${configService.get('APP_HOST')}:${configService.get('APP_PORT')}`)
}
bootstrap();
