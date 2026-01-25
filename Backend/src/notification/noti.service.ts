import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schema/noti.schema'

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notifModel: Model<NotificationDocument>,
  ) {}

  async create(notification: Partial<Notification>) {
    return this.notifModel.create(notification);
  }

  async getForUser(userId: string) {
    return this.notifModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean();
  }

  async markAllRead(userId: string) {
    return this.notifModel.updateMany({ userId }, { read: true });
  }
}
