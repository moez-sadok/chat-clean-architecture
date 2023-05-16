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

export interface LeaveRoomInputData {
  roomId: number;
  participantId: number;
}

export interface CreateChatRoomInputData {
  name: string;
  usersId: number[];
}
