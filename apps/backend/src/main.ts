import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HandleExceptionFilter } from 'utils/exceptions/handle.exception';
import { ResponseInterceptor } from 'utils/interceptors/response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HandleExceptionFilter());
  app.enableCors({
    origin: '*',
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useStaticAssets(join(process.cwd(), 'public'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
