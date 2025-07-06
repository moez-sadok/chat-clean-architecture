import { SendMessageOutputData } from "../interactor/send-message.response.data";
import { ISendMessagePresenterOutput } from "../interactor/sendMessage.presenter.output";

export class SendMessagePresenterApi implements ISendMessagePresenterOutput {
  receiveNewMessage(message: SendMessageOutputData): SendMessageOutputData {
    return message;
  }
}