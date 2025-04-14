

export interface INotifiyer {
  notify(userId: number, msg: string, description?: string): void;
}
