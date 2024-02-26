
import { IConnectClientInput } from './connectClient.feature.input';
import { IChatServerPort } from '../../components/network/abstraction/chat-server.port';
import { IChatClient } from '../../components/network/abstraction/chat-client.port';

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
