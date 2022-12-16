import { Injectable } from '@nestjs/common';
import { NotificationsRespository } from '@application/repositories/notifications.repository';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

interface UnreadNotificationRequest {
  notificationId: string;
}

// type ReadNotificationResponse = void;

@Injectable()
export class UnreadNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRespository,
  ) {}

  async execute(request: UnreadNotificationRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
