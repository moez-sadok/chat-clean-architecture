import { GetRoomsByUserResponseData } from "../../get-rooms-by-user";
import { MessageOutputData, GetMessagesOutputData } from "./getMessagesByRoom.response.data";

export interface IGetMessagesByRoomPresenterOutput {
    presentMessages(messages: MessageOutputData[],room:GetRoomsByUserResponseData): GetMessagesOutputData;
    presentNewMessage(message: MessageOutputData): MessageOutputData;
    
}