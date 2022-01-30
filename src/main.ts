import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './Common/Filters/exception.filter';
//import { ValidationPipe } from './Common/Pipes/validation.pipes';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './Config/Swagger/swagger';
import * as cookieParser from 'cookie-parser';
import { RolesGuards } from './Common/Guards/roles.guards';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true
  });
  SwaggerModule.setup('api', app, createDocument(app));
  //app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  //app.useGlobalGuards(new RolesGuards());
  await app.listen(3000);
}
bootstrap();
