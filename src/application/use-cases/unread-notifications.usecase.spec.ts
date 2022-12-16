import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { NotificationNotFoundError } from './errors/notification-not-found.error';
import { makeNotificationFactory } from '@test/factories/notification.factory';
import { ReadNotificationUseCase } from './read-notifications.usecase';
import { UnreadNotificationUseCase } from './unread-notifications.usecase';

describe('Unread Notification Use Case', () => {
  it('should be able to remark an one notification as unread', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotificationFactory({ readAt: new Date() });

    // console.log('notification', notification);

    await notificationsRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread an non existing notification.', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    expect(() =>
      unreadNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
