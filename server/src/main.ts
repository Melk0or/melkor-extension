import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestAPI')
    .setDescription('api documentation')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe())

  SwaggerModule.setup('api', app, document);

  const PORT = 3000;

  await app.listen(PORT);
}
bootstrap();
