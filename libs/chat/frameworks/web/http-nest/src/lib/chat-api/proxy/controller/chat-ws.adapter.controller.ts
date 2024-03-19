import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IChatController } from '@chat-clean-architecture/chat/adapters/controllers';
import { Optional, Inject } from '@nestjs/common';

// TODO use native ws : no netsjs annotations : more flexible adapter (using DI)
@WebSocketGateway(
  8080, { cors: { origin: '*' } }
)
export class ChatWsAdapterController implements OnGatewayConnection, OnGatewayDisconnect { 

  @WebSocketServer() public server!: Server;

  constructor(@Optional() @Inject('CHAT_CONTROLLER_PROVIDER') 
  private chatController: IChatController
) {}

  async handleConnection(clientSocket: Socket) {
    //console.log('server clients counts',(await this.server.fetchSockets()).length)
    return this.chatController.connectClient(clientSocket);
   
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.auth.userId;
    return this.chatController.disconnectClient(userId);
  }

}