/******** Abstraction of mediator pattern */

import { MessageOutputData } from "../../dtos/output.chat.data";

//collegue
export interface IChatClient {
  getId(): number;
  emit(event: string, message: any): void;
  join(roomId: number): void;
  leave(roomId: number):void;  
  receive(message:MessageOutputData):void;
}
