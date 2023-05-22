import { WebSocketGateway, SubscribeMessage, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'ws';
import { Socket } from 'socket.io';
import { Inject, Optional } from '@nestjs/common';
import { IChatApiController } from '@chat-clean-architecture/chat/adapters/controllers';
import { SendMessageInputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';

@WebSocketGateway(
  8080, { cors: { origin: '*' } }
)
export class ChatSocketApiadApterController { //implements ChatServerSideWsFacade 

  @WebSocketServer() server!: Server;

  constructor(
    @Optional() @Inject('CHAT_CONTROLLER_PROVIDER') private chatController: IChatApiController
  ) { }

  @SubscribeMessage('msgToServer')
  public async handleMessage(client: Socket, payload: SendMessageInputData): Promise<WsResponse<any>> {
    const message = await this.chatController.sendMessage(payload.roomId, payload.userId, payload.message);
    //@ts-ignore
    return await this.server.to(payload.roomId).emit('msgToClient', message);;
  }

  public handleConnection(client: Socket): void {
    console.log(`Client connected user id: ${client.handshake.auth.userId}`);
    this.chatController.initUserConnection(client.handshake.auth.userId);
  }

  public handleDisconnect(client: Socket): void {
    console.log(`Client disconnected user id: ${client.handshake.auth.userId}`);
  }

  //optional using socket rooms 
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