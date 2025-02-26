import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe(
      {
        whitelist: true, // Removes extra fields
        forbidNonWhitelisted: true,
      }, // Rejects extra fields}
    ),
  );
  await app.listen(process.env.SERVER_PORT ?? 3000);
}

bootstrap();