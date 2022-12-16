import { Injectable } from '@nestjs/common';
import { NotificationsRespository } from '@application/repositories/notifications.repository';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

interface ReadNotificationRequest {
  notificationId: string;
}

// type ReadNotificationResponse = void;

@Injectable()
export class ReadNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRespository,
  ) {}

  async execute(request: ReadNotificationRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
