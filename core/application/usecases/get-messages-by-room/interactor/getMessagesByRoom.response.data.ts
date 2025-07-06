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