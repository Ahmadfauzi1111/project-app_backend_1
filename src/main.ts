import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  //set Global Prefix
  app.setGlobalPrefix('api');
  //set Global Validation
  app.useGlobalPipes(new ValidationPipe());
  //set Global Coookie Parser
  app.use(cookieParser());
  // app.enableCors();
  await app.listen(3000);
}
bootstrap();
