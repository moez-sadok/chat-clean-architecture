export interface RoomOutputData {
  roomName: string;
  roomId: number;
  participantsNames?: string[];
}

export interface MessageOutputData {
  authorName: string;
  message: string;
  chatRoomId: number;
}

export interface UserOutputData {
  id: number;
  name: string;
  // status?: string;
  // avatar?: string;
}

