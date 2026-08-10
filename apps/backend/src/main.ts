import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HandleExceptionFilter } from 'utils/exceptions/handle.exception';
import { ResponseInterceptor } from 'utils/interceptors/response.interceptor';
import { AuditLogInterceptor } from 'utils/interceptors/audit-log.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Mesin absensi (ADMS) mengirim body teks polos / tab-separated, bukan JSON.
  // Middleware ini hanya aktif untuk rute /iclock, mengumpulkan raw body
  // menjadi string tanpa mengganggu body parser JSON pada API lain.
  app.use('/iclock', (req: any, _res: any, next: () => void) => {
    if (req.method !== 'POST' || req.readableEnded) {
      next();
      return;
    }

    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk: string) => (data += chunk));
    req.on('end', () => {
      req.body = data;
      next();
    });
    req.on('error', () => next());
  });
  app.useGlobalFilters(new HandleExceptionFilter());
  app.enableCors({
    origin: '*',
  });
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new AuditLogInterceptor(),
  );
  app.useStaticAssets(join(process.cwd(), 'public'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
