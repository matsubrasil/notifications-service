import { Notification } from '@application/entities/notification';

export abstract class NotificationsRespository {
  abstract create(notification: Notification): Promise<void>;
}
