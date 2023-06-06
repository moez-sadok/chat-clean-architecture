export interface GetRoomsByUserInputData {
  userId: number;
}

export interface GetRoomMessagesInputData {
  roomId: number;
  roomName: string;
}

export interface SendMessageInputData {
  userId: number;
  roomId: number;
  message: string;
}
