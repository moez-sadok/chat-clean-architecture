

export interface INotifier {
  notify(userId: number, msg: string, description?: string): void;
}
