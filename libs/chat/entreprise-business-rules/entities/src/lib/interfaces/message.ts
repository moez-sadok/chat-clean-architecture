/******** Abstraction of mediator pattern */

import { IParticpant } from './participant';
import { IChatroom } from './chatroom';

// Colleagues
export interface IMessage {
  getParticipant(): IParticpant;
  getchatRoom(): IChatroom;
  getcontent(): string;
}
// Mediator in chat room
