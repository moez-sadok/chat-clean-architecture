/******** Abstraction of mediator pattern */

import { MessageOutputData } from "../../dtos/output.chat.data";

//collegue
export interface IChatClient {
  setName(name: string): void;
  getId(): number;
  getName(): string;
  receive(message:MessageOutputData):void;
}
