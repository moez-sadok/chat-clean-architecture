import { IHttpController } from "../../../../controllers";
import { ISendMessagePresenterOutput } from "../send-message.output";
import { SendMessageOutputData } from "../send-message.response";

// SPA side: the API response is handed to the UI presenter, which updates the view.
export class SendMessageAPIHttpControllerClientAdapter implements IHttpController<SendMessageOutputData, void> {

  constructor(public presenter: ISendMessagePresenterOutput) { }

  async handle(response: SendMessageOutputData): Promise<void> {
    this.presenter.receiveNewMessage(response);
  }

}
