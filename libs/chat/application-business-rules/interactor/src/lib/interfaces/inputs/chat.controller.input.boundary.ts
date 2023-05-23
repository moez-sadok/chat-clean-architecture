import { GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData } from '../../dtos/input.chat.data';
import { MessageOutputData, RoomOutputData } from '../../dtos/output.chat.data';
export interface IChatControllerInputBoundary {
  connectUser(userId: number):Promise<boolean> ;
  getRoomsByUser(user: GetRoomsByUserInputData): Promise<RoomOutputData[]>;
  getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<MessageOutputData[]>;
  sendMessage(message: SendMessageInputData): void;
}
