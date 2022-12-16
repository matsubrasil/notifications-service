import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationsRespository } from '@application/repositories/notifications.repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification.mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRespository {
  constructor(private readonly prisma: PrismaService) {}

  //
  async findById(notificationId: string): Promise<Notification | null> {
    const notificationRaw = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notificationRaw) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notificationRaw);
  }

  //
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  //
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  //
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }

  //
  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    // console.log('save-raw: ', raw);

    await this.prisma.notification.update({
      where: { id: raw.id },
      data: raw,
    });
  }
}
