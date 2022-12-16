import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from '@application/use-cases/send-notification.usecase';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from '@infra/http/controllers/notifications.controller';
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications.usecase';
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification.usecase';
import { ReadNotificationUseCase } from '@application/use-cases/read-notifications.usecase';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notifications.usecase';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    GetRecipientNotificationsUseCase,
    CancelNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    CountRecipientNotificationsUseCase,
  ],
})
export class HttpModule {}
