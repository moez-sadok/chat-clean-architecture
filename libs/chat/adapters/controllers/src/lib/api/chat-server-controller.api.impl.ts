
import { IChatAppFacadeControllerInput } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IChatWsController } from '../chat.controllor';
import { IChatClient } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';
import { ChatServerSocketAdapter } from '@chat-clean-architecture/chat/adapters/network';
import { Socket } from 'socket.io';
// to check using (replaced by the socket controller)
export class ChatServerControllerApiImpl implements IChatWsController {

  constructor(protected interactorInputboundry: IChatAppFacadeControllerInput) { }

  disconnectClient(userId: number): Promise<boolean> {
    return this.interactorInputboundry.disconnectClient(userId);
  }

  connectClient(client: Socket): Promise<boolean> {
    if (typeof client === 'number') return new Promise((resolve) => resolve(false));
    const chatClient: IChatClient = new ChatServerSocketAdapter(client);
    return this.interactorInputboundry.connectClient(chatClient);
  }

}
