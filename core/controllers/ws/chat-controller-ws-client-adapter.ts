import { Socket, io } from 'socket.io-client';
import { IChatWsController } from '../chat.controllor';
import { IChatClient } from '../../gateways/notifiyer/chat-client.port';
import { ChatClientSocketkAdapter } from './socket/chat-socket-client-adapter';
import { ISendMessagePresenterOutput } from '../../features/chat';
// Adapter pattern (Object) 
export class ChatControllerWsClientAdapterImpl implements IChatWsController {

  constructor(private presentator: ISendMessagePresenterOutput, private serverUrl = '') { }

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
