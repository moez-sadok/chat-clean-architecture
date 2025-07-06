import { IHttpController } from "../../../../../controllers";
import { SendMessageInputData } from "../../interactor/send-message.request.data";
import { SendMessageOutputData } from "../../interactor/send-message.response.data";
import { ISendMessageInput } from "../../interactor/sendMessage.controller.input";
import { ISendMessagePresenterOutput } from "../../interactor/sendMessage.presenter.output";

export class SendMessageApiHttpControllerAdapter implements IHttpController {

  constructor(
    public usecase: ISendMessageInput,//InputBoundary
    public presenterApi: ISendMessagePresenterOutput//OutputBoundary
  ) {}

  async handle(input: SendMessageInputData): Promise<SendMessageOutputData> {
    const res = await this.usecase.sendMessage(input);
    return this.presenterApi.receiveNewMessage(res);
  }


}
