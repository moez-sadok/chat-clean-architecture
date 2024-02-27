/******** Abstraction of mediator pattern */

import { MessageOutputData } from "../../../dtos/output.chat.data";
import { ISendMessagePresenterOutput } from "../../../features/send-message/sendMessage.presenter.output";

//collegue
export interface IChatClient {
  presenter? :ISendMessagePresenterOutput;
  getId(): number;
  receive(message:MessageOutputData):void;
}
