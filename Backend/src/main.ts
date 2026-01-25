import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  ConfigModule.forRoot({
      isGlobal: true,   
  }),
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors();
  app.setGlobalPrefix('api');

  const usersService = app.get(UsersService);

  await usersService.seedAdmin();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
