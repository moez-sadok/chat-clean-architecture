import { IChatServerPort } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IChatClient } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';
import { createServer } from 'http';
import { Server } from 'socket.io';
//Adapter pattern (object)
//TO compleate
export class ChatServerIoAdapter implements IChatServerPort {

  server!: Server;

  constructor() {
    // const httpServer = createServer();
    // httpServer.on
    // this.server = new Server(httpServer, {
    //   cors: { origin: '*' }
    // });
    // this.server.on("connection", (socket) => {
    //   console.log(socket.id); // Set { <socket.id> }
    //   //socket.id = 
    //  // socket.join("room1");
    //   //console.log(socket.rooms); // Set { <socket.id>, "room1" }
    
    // });
    // httpServer.listen(8080);
  }
  
  getConnectedClient(userId: number): IChatClient {
    console.log('sockets',this.server.sockets.sockets.size);
    const socket = this.server.sockets.sockets.get(userId.toString())
    // (). .then( re => {
    //   console.log('re',re);
    // })
   // return socket;
    throw new Error('Method not implemented.');
  }

  // getConnectedClient(userId: number): IChatClient;
  // async getConnectedClient(userId: number): Promise<IChatClient>;
  // async getConnectedClient(userId: number): Promise<IChatClient | Promise<IChatClient>> {
  //   const connectedUser = await this.server.fetchSockets();
    
  // }

  // async getConnectedClient(userId: number): Promise<IChatClient> {
  //   const connectedUser = await this.server.fetchSockets().
  //   throw new Error('Method not implemented.');
  // }

  connectUser(user: IChatClient): boolean {
    throw new Error('Method not implemented.');
  }

  disconnectUser(userId: number): boolean {
    throw new Error('Method not implemented.');
  }

}