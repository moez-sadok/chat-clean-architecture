import { UserDto } from '@chat-clean-architecture/chat/entreprise-business-rules/dtos';
import { IChatServer } from '../interfaces/chat-server';
import { SendMessageInputData } from '../dtos/input.chat.data';
import { MessageOutputData } from '../dtos/output.chat.data';
import { IChatPresenterOutputBoundary } from '../interfaces/chat.presenter.output.boundary';
import { IConnectedUser } from '../interfaces/connected-user';

export class ConnectedUserImpl implements IConnectedUser {

  user: UserDto;
  chatServer?: IChatServer | null;

  constructor(user: UserDto, private chaPresenterOutputBoundary: IChatPresenterOutputBoundary) {
    this.user = user;
  }

  getPresenter(): IChatPresenterOutputBoundary {
    return this.chaPresenterOutputBoundary;
  }

  getUser(): UserDto {
    return this.user;
  }

  getChatServer(): IChatServer {
    if (!this.chatServer) throw new Error('Connected user don t have a chat Server');
    return this.chatServer;
  }

  send(message: SendMessageInputData): void {
   this.chatServer?.broadcast(message);
  }

  receive(message: MessageOutputData): void {
   this.chaPresenterOutputBoundary.receiveNewMessage(message);
  }

  connect(chatServer: IChatServer): void {
    this.chatServer = chatServer;
  }

  disconnect(): void {
    this.chatServer?.disconnectUser(this);
    this.chatServer = null;
  }
}
