import { Notification } from 'src/application/entities/notification';
import { NotificationsRespository } from 'src/application/repositories/notifications.repository';

export class InMemoryNotificationsRepository
  implements NotificationsRespository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
