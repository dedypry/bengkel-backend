import { ForbiddenException, Injectable } from '@nestjs/common';
import Pusher from 'pusher';

@Injectable()
export class PusherService {
  private readonly pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.PUSHER_CLUSTER!,
      useTLS: true,
    });
  }

  userChannel(userId: number) {
    return `private-user-${userId}`;
  }

  companyQueueChannel(companyId: number) {
    return `queue-company-${companyId}`;
  }

  authenticate(socketId: string, channel: string, userId: number) {
    if (channel !== this.userChannel(userId)) {
      throw new ForbiddenException('Channel tidak valid');
    }

    return this.pusher.authorizeChannel(socketId, channel);
  }

  async notifyUser(userId: number, event: string, payload: unknown) {
    await this.pusher.trigger(this.userChannel(userId), event, payload);
  }

  async notifyCompanyQueue(
    companyId: number,
    event: string,
    payload: unknown,
  ) {
    await this.pusher.trigger(
      this.companyQueueChannel(companyId),
      event,
      payload,
    );
  }
}
