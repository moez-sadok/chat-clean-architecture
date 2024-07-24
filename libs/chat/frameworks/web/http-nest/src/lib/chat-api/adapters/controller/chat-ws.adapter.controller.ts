import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IChatController } from '@chat-clean-architecture/chat/adapters/controllers';
import { Optional, Inject } from '@nestjs/common';

// TODO use native ws : no netsjs annotations : more flexible adapter (using DI)
@WebSocketGateway(
  8080, { cors: { origin: '*' } }
)
export class ChatWsAdapterController implements  OnGatewayConnection, OnGatewayDisconnect { 

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


//Native
//TO compleate
// export class ChatServerIoAdapter implements IChatServerPort {

//   server!: Server;

//   constructor() {
//     // const httpServer = createServer();
//     // httpServer.on
//     // this.server = new Server(httpServer, {
//     //   cors: { origin: '*' }
//     // });
//     // this.server.on("connection", (socket) => {
//     //   console.log(socket.id); // Set { <socket.id> }
//     //   //socket.id = 
//     //  // socket.join("room1");
//     //   //console.log(socket.rooms); // Set { <socket.id>, "room1" }
    
//     // });
//     // httpServer.listen(8080);
//   }
  
//   getConnectedClient(userId: number): IChatClient {
//     console.log('sockets',this.server.sockets.sockets.size);
//     const socket = this.server.sockets.sockets.get(userId.toString())
//     // (). .then( re => {
//     //   console.log('re',re);
//     // })
//    // return socket;
//     throw new Error('Method not implemented.');
//   }

//   // getConnectedClient(userId: number): IChatClient;
//   // async getConnectedClient(userId: number): Promise<IChatClient>;
//   // async getConnectedClient(userId: number): Promise<IChatClient | Promise<IChatClient>> {
//   //   const connectedUser = await this.server.fetchSockets();
    
//   // }

//   // async getConnectedClient(userId: number): Promise<IChatClient> {
//   //   const connectedUser = await this.server.fetchSockets().
//   //   throw new Error('Method not implemented.');
//   // }

//   connectUser(user: IChatClient): boolean {
//     throw new Error('Method not implemented.');
//   }

//   disconnectUser(userId: number): boolean {
//     throw new Error('Method not implemented.');
//   }

// }