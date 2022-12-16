import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { CancelNotificationUseCase } from './cancel-notification.usecase';
import { NotificationNotFoundError } from './errors/notification-not-found.error';
import { makeNotificationFactory } from '@test/factories/notification.factory';

describe('Cancel Notification Use Case', () => {
  it('should be able to cancel an one notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotificationUseCase(
      notificationsRepository,
    );

    // const notification = new Notification({
    //   content: new Content('Você tem uma nova solicitação de amizade.'),
    //   category: 'social',
    //   recipientId: 'example-recipientId',
    // });

    const notification = makeNotificationFactory();

    // console.log('notification', notification);

    await notificationsRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });
  it('should not be able to cancel an non existing notification.', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotificationUseCase(
      notificationsRepository,
    );

    expect(() =>
      cancelNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
