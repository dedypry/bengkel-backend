import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LogsService } from './logs.service';
import { AuthGuard } from 'utils/guards/auth.guard';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { LogsQueryDto } from './dto/logs.dto';

@UseGuards(AuthGuard)
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get('login-sessions')
  listLoginSessions(
    @Query(new PaginationPipe()) query: LogsQueryDto,
    @Auth() auth: IAuth,
  ) {
    return this.logsService.listLoginSessions(query, auth);
  }

  @Get('activities/options')
  getActivityFilterOptions(@Auth() auth: IAuth) {
    return this.logsService.getActivityFilterOptions(auth);
  }

  @Get('activities')
  listActivities(
    @Query(new PaginationPipe()) query: LogsQueryDto,
    @Auth() auth: IAuth,
  ) {
    return this.logsService.listActivities(query, auth);
  }
}
