import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  console.log({
    type: 'postgres',
    database: new ConfigService().get<string>('DB_DATABASE'),
    host: new ConfigService().get<string>('DB_HOST'),
    port: Number(new ConfigService().get<string>('DB_PORT')),
    password: new ConfigService().get<string>('DB_USERNAME'),
    username: new ConfigService().get<string>('DB_PASSWORD'),

    synchronize: true,
  });
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
