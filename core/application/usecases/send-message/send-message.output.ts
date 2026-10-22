import { SendMessageOutputData } from "./send-message.response";

export interface ISendMessagePresenterOutput {
    receiveNewMessage(message: SendMessageOutputData): SendMessageOutputData;
}