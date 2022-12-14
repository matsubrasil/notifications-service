import { randomUUID } from 'node:crypto';
import { Replace } from '@helpers/Replace';
import { Content } from '@application/entities/content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private _props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    this._id = randomUUID();
    this._props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  // id
  public get id(): string {
    return this._id;
  }

  // recipientId
  public set recipientId(recipientId: string) {
    this._props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this._props.recipientId;
  }

  // content
  public set content(content: Content) {
    this._props.content = content;
  }

  public get content(): Content {
    return this._props.content;
  }

  // category
  public set category(category: string) {
    this._props.category = category;
  }

  public get category(): string {
    return this._props.category;
  }

  // readAt
  public set readAt(readAt: Date | null | undefined) {
    this._props.readAt = readAt;
  }

  public get readAt(): Date | null | undefined {
    return this._props.readAt;
  }

  //  createdAt
  public get createdAt(): Date {
    return this._props.createdAt;
  }
}
