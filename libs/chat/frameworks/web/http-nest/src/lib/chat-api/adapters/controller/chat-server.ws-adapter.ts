// import { IChatClient ,IChatServerPort } from '../../gateways/index';
// import { ChatServerSocketAdapter} from './socket/chat-socket-server-adapter';
import { ChatServerSocketAdapter } from "@cca/core-controllers";
import { IChatServerPort, IChatClient } from "@cca/core-gateways";
import { createServer } from "http";
import { Server } from "socket.io";

//set in env
const host = '*';
const port = 8080;

export class ChatServerWSAdapter implements IChatServerPort {

  wsServer :Server ;
  httpServer = createServer();

  connectetdUsers: Record<number, IChatClient> = {};

  constructor(){
    this.wsServer = new Server(this.httpServer,
      { cors: {origin:host} });
    this.initServer();
  }

  initServer() {
    this.wsServer.on('connection', (socket) => {
      const clientSocket = new ChatServerSocketAdapter(socket);
      this.connectUser(clientSocket);

      socket.on('disconnect', () => {
        this.disconnectUser(clientSocket.getId());
      });
    });
    this.httpServer.listen(port);
    console.log(`WebSocket server is running on ws://${host}:${port}`);
  }

  getConnectedClient(userId: number): IChatClient {
    return this.connectetdUsers[userId];
  }

  connectUser(client: IChatClient): boolean {
    const userId = client.getId();
    if (userId === null || userId === undefined) return false;
    if (!this.connectetdUsers[userId]) {
      this.connectetdUsers[userId] = client;
      return true;
    } else return false;
  }

  disconnectUser(userId: number): boolean {
    if (userId === null || userId === undefined) return false;
    if (!this.connectetdUsers[userId]) return false;
    delete this.connectetdUsers[userId];
    return true;
  }

}


/*** NestJs: SocketGateway Solution */

// import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { IChatHttpController } from '@chat-clean-architecture/chat/adapters/controllers';
// import { Optional, Inject } from '@nestjs/common';

// // TODO use native ws : no netsjs annotations : more flexible adapter (using DI)
// @WebSocketGateway(
//   8080, { cors: { origin: '*' } }
// )
// export class ChatWsAdapterController implements  OnGatewayConnection, OnGatewayDisconnect { 

//   @WebSocketServer() public server!: Server;

//   constructor(@Optional() @Inject('CHAT_CONTROLLER_PROVIDER') 
//   private chatController: IChatHttpController
// ) {}

//   async handleConnection(clientSocket: Socket) {
//     //console.log('server clients counts',(await this.server.fetchSockets()).length)
//     return this.chatController.connectClient(clientSocket);
   
//   }

//   handleDisconnect(client: Socket) {
//     const userId = client.handshake.auth.userId;
//     return this.chatController.disconnectClient(userId);
//   }

// }

// // implements IChatServerPort,
// connectUser(user: IChatClient): boolean {
//   throw new Error('Method not implemented.');
// }
// disconnectUser(userId: number): boolean {
//   throw new Error('Method not implemented.');
// }
// getConnectedClient(userId: number): IChatClient {
//   throw new Error('Method not implemented.');
// }
