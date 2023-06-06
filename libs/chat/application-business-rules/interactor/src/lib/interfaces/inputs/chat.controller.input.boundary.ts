import { GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData } from '../../dtos/input.chat.data';
import { MessageOutputData, RoomOutputData, UserOutputData } from '../../dtos/output.chat.data';
import { IChatClient } from '../network/chat-client.port';
export interface IChatControllerInputBoundary {
  connectUser(userId: number):Promise<UserOutputData | null> ;
  connectClient(client: IChatClient):Promise<UserOutputData | null>;
  disconnectClient(userId: number):Promise<boolean>;
  getRoomsByUser(user: GetRoomsByUserInputData): Promise<RoomOutputData[]>;
  getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<MessageOutputData[]>;
  sendMessage(message: SendMessageInputData): void;
}
