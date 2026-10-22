import { SendMessageOutputData } from "../interactor/send-message.response.data";
import { ISendMessagePresenterOutput } from "../interactor/sendMessage.presenter.output";
import { ISendMessageView } from "./sendMessage.view";

export class SendMessagePresenterUi implements ISendMessagePresenterOutput {

  constructor(private view: ISendMessageView) {}

  receiveNewMessage(message: SendMessageOutputData): SendMessageOutputData {
    this.view.display(message.message);
    return message;
  }
}
