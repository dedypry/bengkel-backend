import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';
import {
  buildErrorResponseMessage,
  recordAuditLog,
  shouldSkipAudit,
} from 'utils/helpers/audit-log.helper';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = String(req.method || 'GET').toUpperCase();
    const path = req.originalUrl || req.url || '';
    const user = req.user;
    const contentType = String(req.headers?.['content-type'] || '');

    if (
      shouldSkipAudit(method, path, user) ||
      contentType.includes('multipart/form-data')
    ) {
      return next.handle();
    }

    return next.handle().pipe(
      tap({
        next: (response) => {
          void recordAuditLog(req, {
            status: 'success',
            response_message: response,
          });
        },
      }),
      catchError((error) => {
        void recordAuditLog(req, {
          status: 'error',
          response_message: buildErrorResponseMessage(error),
        });

        return throwError(() => error);
      }),
    );
  }
}
