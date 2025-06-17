export interface RoomMessageViewModelDto {
  roomName: string;
  roomMessages: MessageViewModel[];
  // activeRoom: RoomViewModel;
}

export interface MessageViewModel {
  roomId: number;
  content: string;
  participantName: string;
}