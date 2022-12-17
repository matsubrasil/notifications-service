import { SendNotificationUseCase } from '@application/use-cases/send-notification.usecase';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
  ) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotifications(@Payload() payload: SendNotificationPayload) {
    const { content, category, recipientId } = payload;
    console.log({
      content,
      category,
      recipientId,
    });

    await this.sendNotificationUseCase.execute({
      content,
      category,
      recipientId,
    });
  }
}
