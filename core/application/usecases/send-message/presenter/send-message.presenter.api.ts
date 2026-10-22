import { SendMessageOutputData } from "../send-message.response";
import { ISendMessagePresenterOutput } from "../send-message.output";

export class SendMessagePresenterApi implements ISendMessagePresenterOutput {
  receiveNewMessage(message: SendMessageOutputData): SendMessageOutputData {
    return message;
  }
}