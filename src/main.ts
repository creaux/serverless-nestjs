import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Builder } from '@creaux/lib-common';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import {
  MicroserviceOptions,
  RedisOptions,
  Transport,
} from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    Builder<RedisOptions & NestMicroserviceOptions>()
      .transport(Transport.REDIS)
      .options({ host: process.env.MICROSERVICE_HOST })
      .logger(['error', 'warn', 'log', 'verbose', 'debug'])
      .build(),
  );

  await app.listen(() => {
    logger.log('Microservice is listening...');
  });
}

bootstrap();
