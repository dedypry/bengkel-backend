import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 10);

    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'string') {
          return {
            message: data,
          };
        }

        if (
          data &&
          typeof data === 'object' &&
          'results' in data &&
          'total' in data
        ) {
          const total = parseInt(data.total);
          const lastPage = Math.ceil(total / pageSize);
          const from = page * pageSize + 1 - pageSize;

          return {
            message: 'Success',
            data: data.results,
            meta: {
              total: total,
              page: page,
              pageSize: pageSize,
              lastPage: lastPage || 1,
              from: from,
              to: Math.min(page * pageSize, total),
            },
            stats: data.stats,
          };
        }
        return data;
      }),
    );
  }
}
