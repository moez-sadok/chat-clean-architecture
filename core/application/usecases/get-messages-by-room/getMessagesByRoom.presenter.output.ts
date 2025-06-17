import { GetMessagesOutputData, MessageOutputData } from "../../../dtos/output.chat.data";
import { GetRoomsByUserResponseData } from "../get-rooms-by-user";

export interface IGetMessagesByRoomPresenterOutput {
    // selectChatRoomsMessages(messages: MessageOutputData[],room:GetRoomsByUserResponseData): MessageOutputData[];
    selectChatRoomsMessages(messages: MessageOutputData[],room:GetRoomsByUserResponseData): GetMessagesOutputData;
    
}