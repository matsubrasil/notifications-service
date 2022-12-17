import { SendNotificationUseCase } from '@application/use-cases/send-notification.usecase';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from '@infra/messaging/kafka/controllers/notifications.controller';
import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotificationUseCase],
  controllers: [NotificationsController],
})
export class MessagingModule {}
