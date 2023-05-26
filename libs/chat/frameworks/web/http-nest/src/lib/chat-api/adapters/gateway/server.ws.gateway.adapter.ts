import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IChatClient, IChatServerPort, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';

@WebSocketGateway(
  8080, { cors: { origin: '*' } }
)
export class ChatServerGatewayAdapter implements IChatServerPort, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() public server!: Server;

  afterInit(server: Server) {
    this.server = server;
  }

  broadcast(message: MessageOutputData): void {
    //@ts-ignore
    this.server.to(message.chatRoomId).emit('msgToClient', message);
  }

  @SubscribeMessage('joinRoom')
  public joinRoom(client: IChatClient /*client: Socket*/, room: number): void {
    client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: IChatClient /*client: Socket*/, room: number): void {
    client.leave(room);
  }

  connectUser(user?: IChatClient): void {
    console.log('Client connected');
  }

  disconnectUser(user?: IChatClient): void {
    console.log('Client disconnected');
  }

  //
  handleConnection(client: Socket /*IChatClient*/): void {
    //console.log(`Client connected user id: ${client.handshake.auth.userId}`);
    this.connectUser();
  }

  handleDisconnect(client: Socket): void {
    //console.log(`Client disconnected user id: ${client.handshake.auth.userId}`);
    this.disconnectUser();
  }

}