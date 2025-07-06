import { Socket, io } from 'socket.io-client';

import { IChatWsController } from '@cca/core-controllers';
import { IGetMessagesByRoomPresenterOutput } from '@cca/core-features';
import { IChatClient } from '@cca/core-domain';
import { ChatClientSocketkAdapter } from './chat-socket-client-adapter';
// Adapter pattern (Object) 
export class ChatControllerWsClientAdapterImpl implements IChatWsController {

  constructor(private presentator: IGetMessagesByRoomPresenterOutput) { }

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
