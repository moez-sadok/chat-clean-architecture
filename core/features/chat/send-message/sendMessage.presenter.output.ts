import { MessageOutputData } from "../../../dtos/output.chat.data";

export interface ISendMessagePresenterOutput {
    receiveNewMessage(message: MessageOutputData): MessageOutputData;
}