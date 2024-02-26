/******** Abstraction of mediator pattern */

import { MessageOutputData } from "../../../dtos/output.chat.data";

//collegue
export interface IChatClient {
  getId(): number;
  receive(message:MessageOutputData):void;
}
