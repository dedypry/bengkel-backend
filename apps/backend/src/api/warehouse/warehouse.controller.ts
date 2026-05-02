import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/warehouse.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { IQuery } from 'utils/interfaces/query';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';

@UseGuards(AuthGuard)
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  async create(@Body() body: CreateWarehouseDto, @Auth() auth: IAuth) {
    return await this.warehouseService.create(body, auth);
  }

  @Get()
  async list(@Query(new PaginationPipe()) query: IQuery, @Auth() auth: IAuth) {
    return await this.warehouseService.list(query, auth);
  }

  @Delete(':id')
  async destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    return await this.warehouseService.destroy(id, auth);
  }
}
