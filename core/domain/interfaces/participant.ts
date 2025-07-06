/******** Abstraction of mediator pattern */
import { IChatClient } from '../ports/chat-client';
import { IChatroom } from './chatroom';
import { IMessage } from './message';

// Colleagues // Mediator in chat room
export interface IParticpant {
  getUserName(): string;
  getUserId(): number;
  getchatRoom(): IChatroom;
  getLastReceivedMessage(): IMessage;

  send(message: string): void;
  receive(message: IMessage): void;
  enterChatRoom(chatroom: IChatroom): void;
  leaveChatRoom(): void;
  //
  setClient(client: IChatClient):void;
  //likeMessage(message:MessageDto) :void;
}

