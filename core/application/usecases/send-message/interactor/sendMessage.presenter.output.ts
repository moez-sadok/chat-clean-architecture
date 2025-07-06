import { SendMessageOutputData } from "./send-message.response.data";

export interface ISendMessagePresenterOutput {
    receiveNewMessage(message: SendMessageOutputData): SendMessageOutputData;
}