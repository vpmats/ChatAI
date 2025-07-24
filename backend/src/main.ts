import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permite chamadas do frontend
  app.enableCors({
    origin: 'http://localhost:3001',
  });

  await app.listen(3000);
}
bootstrap();
