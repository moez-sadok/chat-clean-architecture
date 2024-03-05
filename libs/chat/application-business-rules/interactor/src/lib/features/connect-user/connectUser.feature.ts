import { IChatRepository } from '../../components/chat-repository/repository-gateway';
import { IConnectUserInput } from './connectUser.feature.input';
import { IChatServerPort } from '../../components/network/abstraction/chat-server.port';
import { IChatAppFacadePresenterOutput } from '../../entry-chat-facade/entry.facade.presenter';
import { ChatClientPortImpl } from '../../components/network/chat-client.port.impl';
import { IChatClient } from '../../components/network/abstraction/chat-client.port';

export class ConnectUserFeature implements IConnectUserInput {

  constructor(
    private chatRepository: IChatRepository,
    private presenter: IChatAppFacadePresenterOutput,
    private chatServer: IChatServerPort
  ) { }

  //used only by the inmemory impl
  connectUser(userId: number): Promise<boolean> {
    if (userId === null || userId === undefined) return new Promise((resolve) => { resolve(false) });
    const existUser = this.chatRepository.getUserById(userId);
    if (!existUser) return new Promise((resolve) => { resolve(false) });
    const client: IChatClient = new ChatClientPortImpl(existUser.id, existUser.name, this.presenter);
    return new Promise((resolve) => {
      resolve(this.chatServer.connectUser(client));
    });
  }

}
