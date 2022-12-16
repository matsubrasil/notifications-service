import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { NotificationNotFoundError } from './errors/notification-not-found.error';
import { makeNotificationFactory } from '@test/factories/notification.factory';
import { ReadNotificationUseCase } from './read-notifications.usecase';

describe('Read Notification Use Case', () => {
  it('should be able to mark an one notification as read', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotificationFactory();

    // console.log('notification', notification);

    await notificationsRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read an non existing notification.', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotificationUseCase(
      notificationsRepository,
    );

    expect(() =>
      readNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
