import { Body, Controller, Post } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/application/use-cases/send-notification.usecase';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;
    console.log(recipientId, content, category);

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      content,
      category,
    });

    return { notification };
  }
}
