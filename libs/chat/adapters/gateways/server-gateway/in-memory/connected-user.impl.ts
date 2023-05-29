import { IChatServer, IChatPresenterOutputBoundary, SendMessageInputData, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IConnectedUser } from '@chat-clean-architecture/chat/application-business-rules/interactor';

export class ConnectedUserImpl implements IConnectedUser {

  userId: number;
  chatServer?: IChatServer | null;

  constructor(userId: number, private chaPresenterOutputBoundary: IChatPresenterOutputBoundary) {
    this.userId = userId;
  }

  getUserId(): number {
    return this.userId;
  }

  getPresenter(): IChatPresenterOutputBoundary {
    return this.chaPresenterOutputBoundary;
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
