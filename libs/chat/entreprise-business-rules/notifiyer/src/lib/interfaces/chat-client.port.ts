

export interface IChatClient {
  getId(): number;
  receive(msg: string, roomId: number, receiverId: number, receiverName: string): void;
}
