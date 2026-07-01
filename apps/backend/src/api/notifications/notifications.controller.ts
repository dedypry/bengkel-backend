import {
  Body,
  Controller,
  Get,
  Param,
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
  CreateNotificationDto,
  PusherAuthDto,
  QueryNotificationDto,
} from './dto/notifications.dto';
import { NotificationsService } from './notifications.service';

@UseGuards(AuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  list(
    @Query(new PaginationPipe()) query: QueryNotificationDto,
    @Auth() auth: IAuth,
  ) {
    return this.notificationsService.list(query, auth);
  }

  @Get('unread-count')
  unreadCount(@Auth() auth: IAuth) {
    return this.notificationsService.unreadCount(auth);
  }

  @Post('pusher/auth')
  pusherAuth(@Body() body: PusherAuthDto, @Auth() auth: IAuth) {
    return this.notificationsService.authenticatePusher(
      body.socket_id,
      body.channel_name,
      auth,
    );
  }

  @Post()
  create(@Body() body: CreateNotificationDto, @Auth() auth: IAuth) {
    return this.notificationsService.create(body, auth);
  }

  @Patch('read-all')
  markAllAsRead(@Auth() auth: IAuth) {
    return this.notificationsService.markAllAsRead(auth);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.notificationsService.markAsRead(id, auth);
  }
}
