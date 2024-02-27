export interface ChatDataViewModelDto {
  rooms?: RoomViewModel[];

  activeRoom: RoomViewModel;
  activeUser: UserViewModel;
  activeRoomMessages: MessageViewModel[];

  inputMessage?: string;
  sendButtonLabel: string;
  menuItemLeaveRoomLabel: string;
  menuItemAddParticipantLabel: string;

  defaultView ?: 'native' | 'material';
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
  newMessagesNotif?: number;
}

export interface UserViewModel {
  id: number;
  name: string;
}
