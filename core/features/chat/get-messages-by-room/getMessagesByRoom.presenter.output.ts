import { MessageOutputData, RoomOutputData } from "../../../dtos/output.chat.data";

export interface IGetMessagesByRoomPresenterOutput {
    selectChatRoomsMessages(messages: MessageOutputData[],room:RoomOutputData): MessageOutputData[];
}