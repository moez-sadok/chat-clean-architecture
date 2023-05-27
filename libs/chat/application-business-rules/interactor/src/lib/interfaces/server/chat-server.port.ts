/******** Abstraction of mediator pattern */
// Colleagues in IConnectedUser
//import { SendMessageInputData } from '../../dtos/input.chat.data';
import { MessageOutputData } from '../../dtos/output.chat.data';

// Mediator
export interface IChatServerPort {
  connectUser(user: IChatClient): void;
  disconnectUser(user: IChatClient): void;
  joinRoom(user: IChatClient,roomId: number):void;  
  leaveRoom(client: IChatClient , room: number):void;
  broadcast(message: MessageOutputData): void;
}
// Mediator in chat server

//collegue
export interface IChatClient {
  getId(): number;
  emit(event: string, message: MessageOutputData): void;
  join(roomId: number): void;
  leave(roomId: number):void;  
}
