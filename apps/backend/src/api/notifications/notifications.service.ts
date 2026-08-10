import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NotificationsModel } from 'models/notifications.model';
import { IAuth } from 'utils/interfaces/IAuth';
import {
  CreateNotificationDto,
  QueryNotificationDto,
} from './dto/notifications.dto';
import { PusherService } from './pusher.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly pusherService: PusherService) {}

  async list(query: QueryNotificationDto, auth: IAuth) {
    return NotificationsModel.query()
      .where('user_id', auth.id)
      .where('company_id', auth.company_id)
      .orderBy('id', 'desc')
      .page(query.page ?? 0, query.pageSize ?? 10);
  }

  async unreadCount(auth: IAuth) {
    const count = await NotificationsModel.query()
      .where('user_id', auth.id)
      .where('company_id', auth.company_id)
      .whereNull('read_at')
      .resultSize();

    return { count };
  }

  async markAsRead(id: number, auth: IAuth) {
    const notification = await this.findOwned(id, auth);

    await notification.$query().patch({
      read_at: new Date().toISOString(),
    });

    return 'Notifikasi ditandai sudah dibaca';
  }

  async markAllAsRead(auth: IAuth) {
    await NotificationsModel.query()
      .where('user_id', auth.id)
      .where('company_id', auth.company_id)
      .whereNull('read_at')
      .patch({
        read_at: new Date().toISOString(),
      });

    return 'Semua notifikasi ditandai sudah dibaca';
  }

  async create(body: CreateNotificationDto, auth: IAuth) {
    if (body.company_id !== auth.company_id) {
      throw new ForbiddenException('Company tidak valid');
    }

    const notification = await NotificationsModel.query().insert({
      user_id: body.user_id,
      company_id: body.company_id,
      type: body.type,
      title: body.title,
      body: body.body ?? null,
      data: body.data ?? null,
    });

    await this.pusherService.notifyUser(
      body.user_id,
      'notification.created',
      notification,
    );

    return notification;
  }

  authenticatePusher(socketId: string, channelName: string, auth: IAuth) {
    if (auth.type === 'cs') {
      throw new ForbiddenException('Akses ditolak');
    }

    return this.pusherService.authenticate(socketId, channelName, auth.id);
  }

  private async findOwned(id: number, auth: IAuth) {
    const notification = await NotificationsModel.query().findById(id);

    if (
      !notification ||
      notification.user_id !== auth.id ||
      notification.company_id !== auth.company_id
    ) {
      throw new NotFoundException('Notifikasi tidak ditemukan');
    }

    return notification;
  }
}
