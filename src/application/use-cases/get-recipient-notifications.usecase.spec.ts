import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { makeNotificationFactory } from '@test/factories/notification.factory';
import { GetRecipientNotificationsUseCase } from './get-recipient-notifications.usecase';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotificationsUseCase =
      new GetRecipientNotificationsUseCase(notificationsRepository);

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'fake-recipient-id-One' }),
    );

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'fake-recipient-id-Two' }),
    );

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'fake-recipient-id-One' }),
    );

    const { notifications } = await getRecipientNotificationsUseCase.execute({
      recipientId: 'fake-recipient-id-One',
    });

    // console.log('count : ', count);

    expect(notifications).toHaveLength(2);

    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'fake-recipient-id-One' }),
        expect.objectContaining({ recipientId: 'fake-recipient-id-One' }),
      ]),
    );
  });
});
