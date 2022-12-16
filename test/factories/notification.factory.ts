import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotificationFactory(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Você tem uma nova solicitação de amizade'),
    recipientId: 'fake-recipient-id-Two',
    ...override,
  });
}
