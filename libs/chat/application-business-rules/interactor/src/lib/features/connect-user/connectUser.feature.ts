import { IChatRepository } from '../../components/chat-repository/repository-gateway';
import { IConnectUserInput } from './connectUser.feature.input';
import { IChatServerPort } from '../../components/network/chat-server.port';
import { IChatAppFacadePresenterOutput } from '../../entry-chat-facade/entry.facade.presenter';

export class ConnectUserFeature implements IConnectUserInput {

  constructor(
    private chatRepository: IChatRepository,
    private presenter: IChatAppFacadePresenterOutput,
    private chatServer: IChatServerPort
  ) { }

  connectUser(userId: number,): Promise<boolean> {
    const existUser = this.chatRepository.getUserById(userId);
    if (!existUser) return new Promise((resolve) => { resolve(false) });
    return new Promise((resolve) => {
      resolve(this.chatServer.connectUserByID(userId, this.presenter));
    });
  }


}
