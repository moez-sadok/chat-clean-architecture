import { INotifier } from "../../../../core/domain";

export interface SentNotification {
  userId: number;
  message: string;
  description?: string;
}

// Records the push notifications instead of sending them, for the scenarios to read.
export class NotifierMemoryImpl implements INotifier {

  sent: SentNotification[] = [];

  notify(userId: number, message: string, description?: string): void {
    this.sent.push({ userId, message, description });
  }

}
