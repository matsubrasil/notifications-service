import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { CountRecipientNotificationsUseCase } from './count-recipient-notifications.usecase';
import { makeNotificationFactory } from '@test/factories/notification.factory';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotificationsUseCase =
      new CountRecipientNotificationsUseCase(notificationsRepository);

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'fake-recipient-id-One' }),
    );

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'fake-recipient-id-Two' }),
    );

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'fake-recipient-id-One' }),
    );

    const { count } = await countRecipientNotificationsUseCase.execute({
      recipientId: 'fake-recipient-id-One',
    });

    // console.log('count : ', count);

    expect(count).toEqual(2);
  });
});
