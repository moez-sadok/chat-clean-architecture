import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IChatClient, IChatServerPort, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
//import { IMessage, IChatroom } from '@chat-clean-architecture/chat/entreprise-business-rules/entities';

@WebSocketGateway(
  8080, { cors: { origin: '*' } }
)
export class ChatServerGatewayAdapter implements IChatServerPort, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() public server!: Server;

  afterInit(server: Server) {
    this.server = server;
    this.initServer([]);
  }

  @SubscribeMessage('joinRoom')
  public joinRoom(client: IChatClient /*client: Socket*/, room: number): void {
    client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: IChatClient /*client: Socket*/, room: number): void {
    client.leave(room);
  }

  connectUser(user: IChatClient | boolean): boolean {
    console.log('Client connected and regitred in the ws server');
    return true;
  }

  broadcast(message: any /* IMessage (to check dependency with entities -> to use output-dto) */): void {
    const msg : MessageOutputData = {chatRoomId: message.getchatRoom().getId(), message:message.getcontent()
    ,participantName: message.getParticipant().getUserName() }
    //@ts-ignore
     this.server.to(msg.chatRoomId).emit('msgToClient', msg);
  }

  initServer(rooms: any[]): void {
    console.log('initServer auto inited by the annotatin, to check for the bot participant');
  }

  getConnectedClients(): Record<number, IChatClient> {
    //return this.server.sockets;
    return {}
  }

  disconnectUser(user?: IChatClient): void {
    console.log('Client disconnected');
  }


  handleConnection(client: Socket /*IChatClient*/): void {
    const userId = client.handshake.auth.userId;
    if(userId) this.connectUser(true);
  }

  handleDisconnect(client: Socket): void {
    const userId = client.handshake.auth.userId;
    this.disconnectUser();
  }

}