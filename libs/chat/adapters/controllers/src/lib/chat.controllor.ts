import { MessageOutputData, RoomOutputData, UserOutputData } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { IChatClient } from "@chat-clean-architecture/chat/entreprise-business-rules/notifiyer";

export interface IChatHttpController {
  getUserById(userId: number): Promise<UserOutputData | null>;
  getUserRooms(userId: number): Promise<RoomOutputData[]>;
  getRoomMessages(roomId: number, roomName: string, userId: number): Promise<MessageOutputData[]>;
  sendMessage(roomId: number, userId: number, message: string): void;
}

export interface IChatWsController {
  connectClient(client: IChatClient | number | any):Promise<boolean>;
  disconnectClient(userId: number):Promise<boolean>;
}
