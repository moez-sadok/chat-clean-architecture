
import { IChatAppFacadeControllerInput, IChatAppFacadePresenterOutput } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IChatWsController } from '../chat.controllor';
import { ChatClientPortImpl } from '@chat-clean-architecture/chat/adapters/network';
// Adapter pattern (Object) 
export class ChatServerControllerMemoryImpl implements IChatWsController {

  constructor(protected interactorInputboundry: IChatAppFacadeControllerInput,
    protected presenter: IChatAppFacadePresenterOutput) { }

  disconnectClient(userId: number): Promise<boolean> {
    return this.interactorInputboundry.disconnectClient(userId);
  }

  connectClient(userId: number): Promise<boolean> {
    if (typeof userId !== 'number') return new Promise((resolve) => resolve(false));
    const clientSocket = new ChatClientPortImpl(userId,'',this.presenter);
    return this.interactorInputboundry.connectClient(clientSocket);
  }

}
