import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '@infra/http/dtos/create-notification-body';
import { NotificationViewModel } from '../view-model/notification.view-model';

import { SendNotificationUseCase } from '@application/use-cases/send-notification.usecase';
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification.usecase';
import { ReadNotificationUseCase } from '@application/use-cases/read-notifications.usecase';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notifications.usecase';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications.usecase';
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications.usecase';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    private readonly cancelNotificationUseCase: CancelNotificationUseCase,
    private readonly readNotificationUseCase: ReadNotificationUseCase,
    private readonly unreadNotificationUseCase: UnreadNotificationUseCase,
    private readonly countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
    private readonly getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase,
  ) {}

  //
  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    return { count };
  }

  //
  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.getRecipientNotificationsUseCase.execute({
        recipientId,
      });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  //
  @Patch('/:id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({
      notificationId: id,
    });
  }

  //
  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({
      notificationId: id,
    });
  }

  //
  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({ notificationId: id });
  }

  //
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;
    // console.log(recipientId, content, category);

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
