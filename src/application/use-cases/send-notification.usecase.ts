import { Injectable } from '@nestjs/common';
import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { NotificationsRespository } from '@application/repositories/notifications.repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRespository,
  ) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    // persistir esta notificação no banco de dados

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
