import { INotifier } from '@cca/core-domain';

export type LogLine = (line: string) => void;

// Adapter of the INotifier port that writes the notification to a log instead of pushing it.
export class LogPushNotifierAdapter implements INotifier {

  constructor(private log: LogLine = (line) => console.log(line)) {}

  notify(userId: number, msg: string, description?: string): void {
    this.log(`[push] to user ${userId}${description ? ` (${description})` : ''}: ${msg}`);
  }

}
