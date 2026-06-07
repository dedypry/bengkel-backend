import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Auth } from 'utils/decorators/auth.decorator';
import { AuthGuard } from 'utils/guards/auth.guard';
import type { IAuth } from 'utils/interfaces/IAuth';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import {
  GenerateQueueDto,
  NextQueueDto,
  QueueCategoryDto,
  QueueQueryDto,
  UpdateQueueStatusDto,
} from './dto/queue.dto';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get('categories')
  categories(@Query('company_id') companyId: number) {
    return this.queueService.categories(Number(companyId));
  }

  @Post('generate')
  async generate(@Body() body: GenerateQueueDto) {
    const data = await this.queueService.generate(
      body.category_id,
      Number(body.company_id),
    );

    return {
      message: 'Nomor antrean berhasil dibuat',
      data,
    };
  }

  @Get('display')
  display(@Query('company_id') companyId: number) {
    return this.queueService.display(Number(companyId));
  }

  @UseGuards(AuthGuard)
  @Get()
  list(@Auth() auth: IAuth, @Query(new PaginationPipe()) query: QueueQueryDto) {
    return this.queueService.list(auth, query);
  }

  @UseGuards(AuthGuard)
  @Post('categories')
  async upsertCategory(@Body() body: QueueCategoryDto, @Auth() auth: IAuth) {
    const data = await this.queueService.upsertCategory(body, auth);

    return {
      message: 'Kategori antrean berhasil disimpan',
      data,
    };
  }

  @UseGuards(AuthGuard)
  @Get('next')
  nextGet(@Query('counter') counter: string, @Auth() auth: IAuth) {
    return this.queueService.next(auth, counter);
  }

  @UseGuards(AuthGuard)
  @Post('next')
  next(@Body() body: NextQueueDto, @Auth() auth: IAuth) {
    return this.queueService.next(auth, body.counter_number);
  }

  @UseGuards(AuthGuard)
  @Patch('status')
  async updateStatus(@Body() body: UpdateQueueStatusDto, @Auth() auth: IAuth) {
    const data = await this.queueService.updateStatus(body, auth);

    return {
      message: 'Status antrean berhasil diperbarui',
      data,
    };
  }

  @UseGuards(AuthGuard)
  @Post('reset')
  async reset(@Auth() auth: IAuth) {
    await this.queueService.resetDaily(auth.company_id);

    return 'Nomor antrean berhasil direset';
  }
}
