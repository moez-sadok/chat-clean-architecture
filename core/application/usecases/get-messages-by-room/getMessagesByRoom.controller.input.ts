import { GetRoomMessagesInputData } from "../../../dtos/input.chat.data";
import { MessageOutputData } from "../../../dtos/output.chat.data";

export interface IGetMessagesByRoomInput {
  getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<MessageOutputData[]>;
}
