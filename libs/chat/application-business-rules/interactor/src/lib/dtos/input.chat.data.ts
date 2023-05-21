export interface GetRoomsByUserInputData {
  userId: number;
  name?: string;
}

export interface GetRoomMessagesInputData {
  roomId: number;
  roomName: string;
  userId: number;
}

export interface SendMessageInputData {
  userId: number;
  roomId: number;
  message: string;
}
