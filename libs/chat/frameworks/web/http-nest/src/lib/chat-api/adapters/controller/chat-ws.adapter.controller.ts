import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IChatClient } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { ChatClientNetworkAdapter } from '../network/client.ws.network.adapter';
import { IChatApiController } from '@chat-clean-architecture/chat/adapters/controllers';
import { Optional, Inject } from '@nestjs/common';
// TODO use native ws : no netsjs annotations : more flexible adapter (using DI)
@WebSocketGateway(
  8080, { cors: { origin: '*' } }
)
export class ChatWsAdapterController implements OnGatewayConnection, OnGatewayDisconnect { 

  @WebSocketServer() public server!: Server;

  constructor(@Optional() @Inject('CHAT_CONTROLLER_PROVIDER') 
  private chatController: IChatApiController
) {}

  handleConnection(clientSocket: Socket) {
    const chatClient: IChatClient = new ChatClientNetworkAdapter(clientSocket);
    return this.chatController.connectClient(chatClient);
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.auth.userId;
    return this.chatController.disconnectClient(userId);
  }

}