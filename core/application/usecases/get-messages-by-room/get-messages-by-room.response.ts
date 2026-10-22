export interface GetMessagesOutputData {
  messages: MessageOutputData[];
  roomName: string;
  roomId: number;
}

export interface MessageOutputData {
  authorName: string;
  message: string;
  chatRoomId: number;
  authorId : number;
}

// the room the messages belong to, as this use case presents it
export interface RoomOutputData {
  roomId: number;
  roomName: string;
  participantsNames?: string[];
}
