
import { IChatServerPort } from '../../../gateways/network/chat-server.port';
import { IChatClient } from '../../../domain/chat-client';
import { IConnectClientInput } from './connectClient.feature.input';

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
