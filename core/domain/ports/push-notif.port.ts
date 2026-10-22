// How a participant who is not connected is told about a message (R16).
// The domain decides when to notify; an adapter decides how (web push, mobile push, e-mail...).
export interface INotifier {
  notify(userId: number, msg: string, description?: string): void;
}
