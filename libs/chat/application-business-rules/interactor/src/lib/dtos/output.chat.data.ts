export interface RoomOutputData {
  roomName: string;
  roomId: number;
  rommParticipantsNames?: string[];
}

export interface MessageOutputData {
  participantName: string;
  message: string;
  chatRoomId: number;
}
