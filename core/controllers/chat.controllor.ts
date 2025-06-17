import { IChatClient } from "../gateways";
import { UserOutputData, GetMessagesOutputData } from "../dtos/output.chat.data";

export interface IChatHttpController {
  getUserById(userId: number): Promise<UserOutputData | null>;
  getRoomMessages(roomId: number, userId: number): Promise<GetMessagesOutputData>;
  sendMessage(roomId: number, userId: number, message: string): void;
  // getUserRooms(userId: number): Promise<GetRoomsByUserResponseData[]>;
}

export interface IChatWsController {
  connectClient(client: IChatClient | number | any, prsenter?:any):Promise<boolean>;
  disconnectClient(userId: number):Promise<boolean>;
}
