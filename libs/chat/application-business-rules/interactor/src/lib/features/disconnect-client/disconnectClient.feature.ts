import { IChatServerPort } from '../../components/network/abstraction/chat-server.port';
import { IDisconnectClientInput } from './disconnectClient.controller.input';

export class DisconnectClientFeature implements IDisconnectClientInput {

  constructor(
    private chatServer: IChatServerPort
  ) { }

  disconnectClient(userId: number): Promise<boolean> {
      return new Promise((resolve) => {
      resolve(this.chatServer.disconnectUser(userId));
    });
  }



}
