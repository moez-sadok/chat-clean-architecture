import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IChatController } from '@chat-clean-architecture/chat/adapters/controllers';
import { Optional, Inject } from '@nestjs/common';
import { IChatClient } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';
import { ChatClientServerAdapter } from '@chat-clean-architecture/chat/adapters/network';
// TODO use native ws : no netsjs annotations : more flexible adapter (using DI)
// Proxy
@WebSocketGateway(
  8080, { cors: { origin: '*' } }
)
export class ChatWsAdapterController implements OnGatewayConnection, OnGatewayDisconnect { 

  @WebSocketServer() public server!: Server;

  constructor(@Optional() @Inject('CHAT_CONTROLLER_PROVIDER') 
  private chatController: IChatController
) {}

  handleConnection(clientSocket: Socket) {
    const chatClient: IChatClient = new ChatClientServerAdapter(clientSocket);
    return this.chatController.connectClient(chatClient);
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.auth.userId;
    return this.chatController.disconnectClient(userId);
  }

}