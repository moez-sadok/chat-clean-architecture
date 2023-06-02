/******** Abstraction of mediator pattern */

import { IChatroom } from './chatroom';
import { IMessage } from './message';

// Colleagues // Mediator in chat room
export interface IParticpant {
  getUserName(): string;
  getUserId(): number;
  getchatRoom(): IChatroom;

  send(message: string): void;
  receive(message: IMessage): void;
  enterChatRoom(chatroom: IChatroom): void;
  leaveChatRoom(): void;
  //likeMessage(message:MessageDto) :void;
}

