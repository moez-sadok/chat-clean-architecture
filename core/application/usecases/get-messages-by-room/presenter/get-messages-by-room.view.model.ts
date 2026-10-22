export interface RoomMessagesViewModel {
  messages: MessageViewModel[];
  roomName: string;
  roomId: number;
}


export interface MessageViewModel {
  roomId: number;
  content: string;
  participantName: string;
}