import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { PoService } from './po.service';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { CreatePoDto } from './dto/po.dto';
import { AuthGuard } from 'utils/guards/auth.guard';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { IQuery } from 'utils/interfaces/query';

@UseGuards(AuthGuard)
@Controller('po')
export class PoController {
  constructor(private readonly poService: PoService) {}

  @Get()
  list(@Query(new PaginationPipe()) query: IQuery, @Auth() auth: IAuth) {
    return this.poService.list(query, auth);
  }

  @Get(':id')
  detail(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.poService.detail(id, auth);
  }

  @Post()
  create(@Body() body: CreatePoDto, @Auth() auth: IAuth) {
    return this.poService.create(body, auth);
  }

  @Delete(':id')
  destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.poService.destroy(id, auth);
  }
}
