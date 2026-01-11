import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PromosService } from './promos.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import {
  CheckPromo,
  CreatePromoDto,
  QueryPromo,
  UpdatePromoDto,
} from './dto/promos.dto';

@UseGuards(AuthGuard)
@Controller('promos')
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @Get()
  list(@Auth() auth: IAuth, @Query() query: QueryPromo) {
    return this.promosService.list(auth, query);
  }

  @Get('check')
  checkPromo(@Query() body: CheckPromo, @Auth() auth: IAuth) {
    return this.promosService.checkCode(body, auth);
  }

  @Post()
  create(@Body() body: CreatePromoDto, @Auth() auth: IAuth) {
    return this.promosService.create(body, auth);
  }

  @Patch(':id')
  async updateStatus(
    @Param('id') id: number,
    @Body() body: UpdatePromoDto,
    @Auth() auth: IAuth,
  ) {
    await this.promosService.updateStatus(id, body, auth);
    return 'Promo Berhasil diupdate';
  }

  @Delete(':id')
  async destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    await this.promosService.destroy(id, auth);
    return 'Promo Berhasil dihapus';
  }
}
