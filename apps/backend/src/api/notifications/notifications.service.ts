import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NotificationsModel } from 'models/notifications.model';
import { ProductsModel } from 'models/products.model';
import { UsersModel } from 'models/users.model';
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
    await this.syncLowStock(auth);

    return NotificationsModel.query()
      .where('user_id', auth.id)
      .where('company_id', auth.company_id)
      .orderBy('id', 'desc')
      .page(query.page ?? 0, query.pageSize ?? 10);
  }

  async unreadCount(auth: IAuth) {
    await this.syncLowStock(auth);

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

  async syncLowStock(auth: IAuth) {
    if (auth.type === 'cs') {
      return;
    }

    const lowStockProducts = await ProductsModel.query()
      .where('company_id', auth.company_id)
      .whereRaw('CAST(stock AS NUMERIC) <= CAST(min_stock AS NUMERIC)')
      .orderBy('stock', 'asc');

    const lowStockIds = new Set(lowStockProducts.map((product) => product.id));

    const existingUnread = await NotificationsModel.query()
      .where('user_id', auth.id)
      .where('company_id', auth.company_id)
      .where('type', 'low_stock')
      .whereNull('read_at');

    for (const notification of existingUnread) {
      const productId = Number(notification.data?.product_id);

      if (productId && !lowStockIds.has(productId)) {
        await notification.$query().patch({
          read_at: new Date().toISOString(),
        });
      }
    }

    const unreadProductIds = new Set(
      existingUnread
        .map((notification) => Number(notification.data?.product_id))
        .filter(Boolean),
    );

    for (const product of lowStockProducts) {
      if (unreadProductIds.has(product.id)) {
        continue;
      }

      await this.createLowStockNotification(product, auth.id);
    }
  }

  async notifyCompanyLowStock(product: ProductsModel) {
    if (!product.company_id) {
      return;
    }

    if (Number(product.stock) > Number(product.min_stock ?? 0)) {
      await this.resolveLowStock(product.id, product.company_id);
      return;
    }

    const users = await UsersModel.query()
      .where('company_id', product.company_id)
      .where('is_active', true)
      .whereNot('type', 'cs');

    for (const user of users) {
      const exists = await NotificationsModel.query()
        .where('user_id', user.id)
        .where('company_id', product.company_id)
        .where('type', 'low_stock')
        .whereNull('read_at')
        .whereRaw("(data->>'product_id')::int = ?", [product.id])
        .first();

      if (!exists) {
        await this.createLowStockNotification(product, user.id);
      }
    }
  }

  async resolveLowStock(productId: number, companyId: number) {
    await NotificationsModel.query()
      .where('company_id', companyId)
      .where('type', 'low_stock')
      .whereNull('read_at')
      .whereRaw("(data->>'product_id')::int = ?", [productId])
      .patch({
        read_at: new Date().toISOString(),
      });
  }

  private async createLowStockNotification(
    product: ProductsModel,
    userId: number,
  ) {
    const unit = product.unit ? ` ${product.unit}` : '';

    const notification = await NotificationsModel.query().insert({
      user_id: userId,
      company_id: product.company_id,
      type: 'low_stock',
      title: 'Stok Menipis',
      body: `${product.name} — sisa ${Number(product.stock ?? 0)}${unit}`.trim(),
      data: {
        product_id: product.id,
      },
    });

    await this.pusherService.notifyUser(
      userId,
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
