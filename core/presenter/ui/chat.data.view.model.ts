//Refactoring ...
export interface UserViewModel {
  id: number;
  name: string;
}

export interface ChatDataViewModelDto {
  activeUser: UserViewModel;

  inputMessage?: string;
  sendButtonLabel: string;
  menuItemLeaveRoomLabel: string;
  menuItemAddParticipantLabel: string;

  defaultView ?: 'native' | 'material';

  // rooms?: RoomViewModel[];
  // activeRoom: RoomViewModel;
  // activeRoomMessages: MessageViewModel[];

}


// export interface MessageViewModel {
//   roomId: number;
//   content: string;
//   participantName: string;
// }

// export interface RoomViewModel {
//   roomId: number;
//   name: string;
//   participantNames?: string[];
//   newMessagesNotif?: number;
// }


