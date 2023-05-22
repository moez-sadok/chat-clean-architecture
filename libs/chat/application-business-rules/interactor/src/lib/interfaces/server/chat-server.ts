/******** Abstraction of mediator pattern */
// Colleagues in IConnectedUser
import { SendMessageInputData } from '../../dtos/input.chat.data';
import { IChatroom } from '@chat-clean-architecture/chat/entreprise-business-rules/entities';
import { IConnectedUser } from './connected-user';
import { UserDto } from '@chat-clean-architecture/chat/entreprise-business-rules/dtos';
import { IChatPresenterOutputBoundary } from '../outputs/chat.presenter.output.boundary';

// Mediator
export interface IChatServer {
  //getters
  getConnectetdUsers(): Record<string, IConnectedUser>;
  getRooms(): Record<string, IChatroom>;
  //methods
  initServer(): void;
  setRooms(rooms: Record<string, IChatroom>): void;
  connectUser(user: IConnectedUser): void;
  connectUserPresenter(user: UserDto,presenter: IChatPresenterOutputBoundary): boolean;
  getUserPresenter(userId: number): IChatPresenterOutputBoundary;
  disconnectUser(user: IConnectedUser): void;
  broadcast(message: SendMessageInputData): void;
}
// Mediator in chat server
