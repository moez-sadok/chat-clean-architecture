import { GetRoomMessagesInputData } from "../../../../dtos/input.chat.data";
import { GetMessagesOutputData } from "./getMessagesByRoom.response.data";

export interface IGetMessagesByRoomInput {
  // getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<MessageOutputData[]>;
  getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<GetMessagesOutputData>;
  
}
