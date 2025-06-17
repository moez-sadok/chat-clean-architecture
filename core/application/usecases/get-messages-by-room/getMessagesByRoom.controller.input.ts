import { GetRoomMessagesInputData } from "../../../dtos/input.chat.data";
import { GetMessagesOutputData } from "../../../dtos/output.chat.data";

export interface IGetMessagesByRoomInput {
  // getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<MessageOutputData[]>;
  getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<GetMessagesOutputData>;
  
}
