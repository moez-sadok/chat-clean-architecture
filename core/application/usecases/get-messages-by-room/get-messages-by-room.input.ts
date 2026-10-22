
import { GetRoomMessagesInputData } from "./get-messages-by-room.request";
import { GetMessagesOutputData } from "./get-messages-by-room.response";

export interface IGetMessagesByRoomInput {
  // getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<MessageOutputData[]>;
  getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<GetMessagesOutputData>;
  
}
