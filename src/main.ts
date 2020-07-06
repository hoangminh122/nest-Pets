import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as rateLimit from 'fastify-rate-limit';
import 'reflect-metadata';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const fAdapt = new FastifyAdapter();

fAdapt.register(rateLimit, {
  timeWindow: process.env.RATE_LIMIT_TIME_WINDOW,
  max: process.env.RATE_LIMIT_MAX,
});

async function bootstrap(): Promise<any> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fAdapt
  );

  const options = new DocumentBuilder().setTitle('school API')
  .setDescription('demo schoool  API')
  .setVersion('1.0')
  .addTag('demo_school')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('doc',app,document)

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
