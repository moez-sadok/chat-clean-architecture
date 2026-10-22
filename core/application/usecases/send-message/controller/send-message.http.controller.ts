import { IHttpController } from "../../../../controllers";
import { SendMessageInputData } from "../send-message.request";
import { SendMessageOutputData } from "../send-message.response";
import { ISendMessageInput } from "../send-message.input";

// The use case presents through its output port: the controller returns what it presented.
export class SendMessageApiHttpControllerAdapter implements IHttpController<SendMessageInputData, SendMessageOutputData> {

  constructor(public usecase: ISendMessageInput) {}

  handle(input: SendMessageInputData): Promise<SendMessageOutputData> {
    return this.usecase.sendMessage(input);
  }

}
