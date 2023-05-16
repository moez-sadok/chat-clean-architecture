/******** Abstraction of mediator pattern */
// Colleagues in IConnectedUser
import { SendMessageInputData } from '../dtos/input.chat.data';
import { IChatroom } from '@chat-clean-architecture/chat/entreprise-business-rules/entities';
import { IConnectedUser } from './connected-user';

// Mediator
export interface IChatServer {
  //getters
  getConnectetdUsers(): Record<string, IConnectedUser>;
  getRooms(): Record<string, IChatroom>;
  //methods
  initServer(): void;
  setRooms(rooms: Record<string, IChatroom>): void;
  connectUser(user: IConnectedUser): void;
  disconnectUser(user: IConnectedUser): void;
  broadcast(message: SendMessageInputData): void;
}
// Mediator in chat server
