import { MessageOutputData, GetMessagesOutputData, RoomOutputData } from "./get-messages-by-room.response";

export interface IGetMessagesByRoomPresenterOutput {
    presentMessages(messages: MessageOutputData[], room: RoomOutputData): GetMessagesOutputData;
    presentNewMessage(message: MessageOutputData): MessageOutputData;
}
