export interface ChatDataViewModelDto {
  rooms?: RoomDataViewModelDto[];

  activeRoom: RoomDataViewModelDto;
  activeRoomParticipants?: ParticipantDataViewModelDto[];
  activeRoomMessages?: MessageDataViewModelDto[];

  inputMessage?: string;
  sendButtonLabel: string;
  menuItemLeaveRoomLabel: string;
  menuItemAddParticipantLabel: string;
}

export interface MessageDataViewModelDto {
  roomId: number;
  content: string;
  participantName: string;
}

export interface RoomDataViewModelDto {
  roomId: number;
  name: string;
}

export interface ParticipantDataViewModelDto {
  id: number;
  name: string;
}
