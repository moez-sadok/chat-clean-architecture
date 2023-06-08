export interface ChatDataViewModelDto {
  rooms?: RoomViewModel[];

  activeRoom: RoomViewModel;
  activeRoomMessages?: MessageViewModel[];

  inputMessage?: string;
  sendButtonLabel: string;
  menuItemLeaveRoomLabel: string;
  menuItemAddParticipantLabel: string;
}

export interface MessageViewModel {
  roomId: number;
  content: string;
  participantName: string;
}

export interface RoomViewModel {
  roomId: number;
  name: string;
  participantNames?: string[];
}
