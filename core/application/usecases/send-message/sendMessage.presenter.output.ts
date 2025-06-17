import { MessageOutputData } from "../get-messages-by-room";

export interface ISendMessagePresenterOutput {
    receiveNewMessage(message: MessageOutputData): MessageOutputData;
}