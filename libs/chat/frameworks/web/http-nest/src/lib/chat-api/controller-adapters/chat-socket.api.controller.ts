import { WebSocketGateway, SubscribeMessage, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'ws';
import { Socket } from 'socket.io';
import { ChatMainApiImpl } from '../main/chat-main-api-impl';

@WebSocketGateway(
  8080,{ cors: { origin: '*' } }
)
export class  ChatSocketApiadApterController { //implements ChatServerSideWsFacade 

  @WebSocketServer() server!: Server;

  constructor(private readonly chatApiMainService: ChatMainApiImpl) { }

  @SubscribeMessage('msgToServer')
  public async handleMessage(client: Socket, payload: any): Promise<WsResponse<any>> {
    const message = await this.chatApiMainService.sendMessage(payload);
    //@ts-ignore
    return await this.server.to(payload.roomId).emit('msgToClient', message);;
  }

  public handleConnection(client: Socket): void {
    this.chatApiMainService.initUserConnection(client.handshake.auth.userId);
  }

  public handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  public joinRoom(client: Socket, room: string): void {
    //to check (out of internal bussiness )
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  public leaveRoom(client: Socket, room: string): void {
    //to check (out of internal bussiness )
    client.leave(room);
    client.emit('leftRoom', room);
  }

}