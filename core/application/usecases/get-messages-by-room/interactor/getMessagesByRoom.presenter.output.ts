import { GetRoomsByUserResponseData } from "../../get-rooms-by-user";
import { MessageOutputData, GetMessagesOutputData } from "./getMessagesByRoom.response.data";

export interface IGetMessagesByRoomPresenterOutput {
    // presentMessages(messages: MessageOutputData[],room:GetRoomsByUserResponseData): MessageOutputData[];
    presentMessages(messages: MessageOutputData[],room:GetRoomsByUserResponseData): GetMessagesOutputData;
    
}