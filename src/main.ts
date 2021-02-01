import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Builder } from './builder';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    Builder<NestApplicationOptions>()
      .logger(['log', 'error', 'warn', 'debug', 'verbose'])
      .build(),
  );

  await app.listen(5002);
}

bootstrap();
