import { IHttpController } from "../../../../../controllers";
import { SendMessageInputData } from "../../interactor/send-message.request.data";
import { SendMessageOutputData } from "../../interactor/send-message.response.data";
import { ISendMessageInput } from "../../interactor/sendMessage.controller.input";

// The use case presents through its output port: the controller returns what it presented.
export class SendMessageApiHttpControllerAdapter implements IHttpController {

  constructor(public usecase: ISendMessageInput) {}

  handle(input: SendMessageInputData): Promise<SendMessageOutputData> {
    return this.usecase.sendMessage(input);
  }

}
