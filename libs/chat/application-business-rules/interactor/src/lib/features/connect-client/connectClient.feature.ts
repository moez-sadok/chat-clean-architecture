
import { IConnectClientInput } from './connectClient.feature.input';
import { IChatServerPort } from '../../components/network/chat-server.port';
import { IChatClient } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';

export class ConnectClientFeature implements IConnectClientInput {

  constructor(
    private chatServer: IChatServerPort
  ) { }

  connectClient(client: IChatClient): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.chatServer.connectUser(client));
    });
  }

}
