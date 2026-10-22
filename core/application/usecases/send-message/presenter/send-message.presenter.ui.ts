import { SendMessageOutputData } from "../send-message.response";
import { ISendMessagePresenterOutput } from "../send-message.output";
import { ISendMessageView } from "./send-message.view";

export class SendMessagePresenterUi implements ISendMessagePresenterOutput {

  constructor(private view: ISendMessageView) {}

  receiveNewMessage(message: SendMessageOutputData): SendMessageOutputData {
    this.view.display(message);
    return message;
  }
}
