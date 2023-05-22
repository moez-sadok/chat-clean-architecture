import { MessageOutputData, RoomOutputData } from "@chat-clean-architecture/chat/application-business-rules/interactor";

export interface IChatApiController {
  initUserConnection(userId: number):Promise<boolean>;
  getUserRooms(userId: number): Promise<RoomOutputData[]>;
  getRoomMessages(roomId: number, roomName: string, userId: number): Promise<MessageOutputData[]>;
  sendMessage(roomId: number, userId: number, message: string): void;
}
