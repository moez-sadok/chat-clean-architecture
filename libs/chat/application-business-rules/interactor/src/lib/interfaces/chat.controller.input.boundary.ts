import {
  CreateChatRoomInputData,
  GetRoomMessagesInputData,
  GetRoomsByUserInputData,
  LeaveRoomInputData,
  SendMessageInputData,
} from '../dtos/input.chat.data';

export interface IChatControllerInputBoundary {
  connectUser(userId: number): void;
  getRoomsByUser(user: GetRoomsByUserInputData): void;
  getChatRoomsMessages(room: GetRoomMessagesInputData): void;

  createChatRoom(data: CreateChatRoomInputData): void;
  leaveChatRoom(data: LeaveRoomInputData): void;
  sendMessage(message: SendMessageInputData): void;
}
