import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: 'example-recipient-id',
      content: new Content('Você recebeu uma solicitação de amizade.'),
      category: 'social',
    });

    expect(notification).toBeTruthy();
  });
});
