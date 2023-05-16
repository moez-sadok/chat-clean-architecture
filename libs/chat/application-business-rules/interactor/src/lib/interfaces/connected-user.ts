/******** Abstraction of mediator pattern */
// Colleagues in IConnectedUser
import { UserDto } from '@chat-clean-architecture/chat/entreprise-business-rules/dtos';
import { MessageOutputData } from '../dtos/output.chat.data';
import { SendMessageInputData } from '../dtos/input.chat.data';
import { IChatPresenterOutputBoundary } from './chat.presenter.output.boundary';
import { IChatServer } from './chat-server';

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
