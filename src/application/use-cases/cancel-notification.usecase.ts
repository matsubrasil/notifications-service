import { Injectable } from '@nestjs/common';
import { NotificationsRespository } from '@application/repositories/notifications.repository';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

interface CancelNotificationRequest {
  notificationId: string;
}

// type CancelNotificationResponse = void;

@Injectable()
export class CancelNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRespository,
  ) {}

  async execute(request: CancelNotificationRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    // console.log('CancelNotificationUseCase', notification);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    // console.log('CancelNotificationUseCase - cancel ', notification);

    await this.notificationsRepository.save(notification);
  }
}
