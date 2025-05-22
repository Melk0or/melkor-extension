import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addServer('/api/v1')
    .setVersion('1.0')
    .setTitle('Block list')
    .setDescription('Block list API')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  app.use(cookieParser());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT;

  await app.listen(PORT ?? 3000);
}
bootstrap();
