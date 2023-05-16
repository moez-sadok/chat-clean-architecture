/******** Abstraction of mediator pattern */

import { IChatroom } from './chatroom';
import { UserDto } from '@chat-clean-architecture/chat/entreprise-business-rules/dtos';
import { IMessage } from './message';

// Colleagues
export interface IParticpant {
  getUser(): UserDto;
  getchatRoom(): IChatroom;

  send(message: string): void;
  receive(message: IMessage): void;
  enterChatRoom(chatroom: IChatroom): void;
  leaveChatRoom(): void;
  //likeMessage(message:MessageDto) :void;
}
// Mediator in chat room
