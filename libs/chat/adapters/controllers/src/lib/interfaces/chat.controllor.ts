import { IChatClient, MessageOutputData, RoomOutputData, UserOutputData } from "@chat-clean-architecture/chat/application-business-rules/interactor";

export interface IChatController {
  connectClient(client: IChatClient | number):Promise<boolean>;
  disconnectClient(userId: number):Promise<boolean>;
  getUserById(userId: number): Promise<UserOutputData | null>;
  getUserRooms(userId: number): Promise<RoomOutputData[]>;
  getRoomMessages(roomId: number, roomName: string, userId: number): Promise<MessageOutputData[]>;
  sendMessage(roomId: number, userId: number, message: string): void;
}
