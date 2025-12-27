import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Kita hanya ingin memproses object query
    if (metadata.type !== 'query') {
      return value;
    }

    const page = value.page ? parseInt(value.page, 10) : 1;
    const pageSize = value.pageSize ? parseInt(value.pageSize, 10) : 10;

    return {
      ...value,
      page: Math.max(0, page - 1),
      pageSize: Math.max(1, pageSize),
    };
  }
}
