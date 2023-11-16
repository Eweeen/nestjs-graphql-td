import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { INestApplication } from '@nestjs/common';

config({ path: '.env' });

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}

bootstrap();
