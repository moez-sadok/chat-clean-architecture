
import { ChatClientSocketkAdapter } from '@chat-clean-architecture/chat/adapters/network';
import {IChatAppFacadePresenterOutput } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { Socket, io } from 'socket.io-client';
import { IChatWsController } from '../chat.controllor';
import { IChatClient } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';
// Adapter pattern (Object) 
export class ChatControllerWsClientAdapterImpl implements IChatWsController {

  constructor(private presentator: IChatAppFacadePresenterOutput, private serverUrl = '') { }

  connectClient(userId: number): Promise<boolean> {
    const socket: Socket = io('ws://localhost:8080', {
      reconnectionDelayMax: 10000,
      auth: { userId: userId },
    });
    socket.id = userId.toString();
    const clientSocket: IChatClient = new ChatClientSocketkAdapter(socket, this.presentator);
    return new Promise((resolve) => {
      if (clientSocket) resolve(true);
      resolve(false);
    });
  }

  disconnectClient(userId: number): Promise<boolean> {
    return new Promise((resolve) => { resolve(true); });
  }

}
