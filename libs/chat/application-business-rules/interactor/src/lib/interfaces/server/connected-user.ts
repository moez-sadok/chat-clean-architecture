/******** Abstraction of mediator pattern */
// Colleagues in IConnectedUser
import { UserDto } from '@chat-clean-architecture/chat/entreprise-business-rules/dtos';
import { IChatServer } from './chat-server';
import { SendMessageInputData } from '../../dtos/input.chat.data';
import { MessageOutputData } from '../../dtos/output.chat.data';
import { IChatPresenterOutputBoundary } from '../outputs/chat.presenter.output.boundary';

// Colleagues
export interface IConnectedUser {
  getUser(): UserDto;
  getPresenter(): IChatPresenterOutputBoundary;
  getChatServer(): IChatServer;

  send(message: SendMessageInputData): void;
  receive(message: MessageOutputData): void;
  connect(chatServer: IChatServer): void;
  disconnect(): void;
}
// Mediator in chat server
