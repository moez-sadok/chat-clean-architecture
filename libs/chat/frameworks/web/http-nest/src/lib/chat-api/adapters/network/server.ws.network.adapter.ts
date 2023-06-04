import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatServerPortImpl, IChatClient } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { ChatClientNetworkAdapter } from './client.ws.network.adapter';
// TODO use native ws : no netsjs annotations : more flexible adapter 
@WebSocketGateway(
  8080, { cors: { origin: '*' } }
)
export class ChatServerNetworkAdapter extends ChatServerPortImpl implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() public server!: Server;

  handleConnection(client: Socket): void {
    const chatClient: IChatClient = new ChatClientNetworkAdapter(client);
    if (chatClient) this.connectUser(chatClient);
  }

  handleDisconnect(client: Socket): void {
    const userId = client.handshake.auth.userId;
    const cuser= this.getConnectedClients()[userId];
    this.disconnectUser(cuser);
  }

}