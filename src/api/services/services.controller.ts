import { Controller, Get, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { IQuery } from 'utils/interfaces/query';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  list(@Query(new PaginationPipe()) query: IQuery) {
    return this.servicesService.list(query);
  }
}
