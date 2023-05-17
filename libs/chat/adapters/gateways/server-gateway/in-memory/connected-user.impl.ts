import { IChatServer, IChatPresenterOutputBoundary, SendMessageInputData, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { UserDto } from '@chat-clean-architecture/chat/entreprise-business-rules/dtos';
import { IConnectedUser } from '@chat-clean-architecture/chat/application-business-rules/interactor';

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
