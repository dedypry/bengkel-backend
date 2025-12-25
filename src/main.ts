import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HandleExceptionFilter } from 'utils/exceptions/handle.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HandleExceptionFilter());
  app.enableCors({
    origin: '*',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
