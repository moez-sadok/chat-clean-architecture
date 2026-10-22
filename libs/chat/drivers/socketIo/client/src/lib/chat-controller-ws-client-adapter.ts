import { Socket, io } from 'socket.io-client';

import { IChatWsController } from '@cca/core-controllers';
import { IGetMessagesByRoomPresenterOutput } from '@cca/core-features';
import { ChatClientSocketAdapter } from './chat-socket-client-adapter';

// Adapter pattern (object): opens one Socket.IO connection per connected user and hands the
// messages it receives to the get-messages presenter.
export class ChatControllerWsClientAdapterImpl implements IChatWsController {

  private sockets: Record<number, Socket> = {};

  constructor(private presenter: IGetMessagesByRoomPresenterOutput) { }

  async connectClient(userId: number): Promise<boolean> {
    if (this.sockets[userId]) return false;
    const socket: Socket = io('ws://localhost:8080', {
      reconnectionDelayMax: 10000,
      auth: { userId },
    });
    new ChatClientSocketAdapter(socket, this.presenter);
    this.sockets[userId] = socket;
    return true;
  }

  async disconnectClient(userId: number): Promise<boolean> {
    const socket = this.sockets[userId];
    if (!socket) return false;
    socket.disconnect();
    delete this.sockets[userId];
    return true;
  }

}
