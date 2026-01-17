import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HandleExceptionFilter } from 'utils/exceptions/handle.exception';
import { ResponseInterceptor } from 'utils/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HandleExceptionFilter());
  app.enableCors({
    origin: '*',
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
