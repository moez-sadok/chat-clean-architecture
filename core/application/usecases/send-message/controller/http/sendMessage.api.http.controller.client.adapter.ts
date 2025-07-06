
import { IHttpController } from "../../../../../controllers";
import { ISendMessagePresenterOutput } from "../../interactor/sendMessage.presenter.output";

export class SendMessageAPIHttpControllerClientAdapter implements IHttpController {

  constructor(public presenter: ISendMessagePresenterOutput) { }

  async handle(data: any): Promise<any> {
    this.presenter.receiveNewMessage(data);
  }

}
