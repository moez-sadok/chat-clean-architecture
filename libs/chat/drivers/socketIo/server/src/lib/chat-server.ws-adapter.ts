import { ChatServerSocketAdapter } from "@cca/drivers/socketIo/client";
import { IChatServerPort } from "@cca/core-features";
import { IChatClient } from "@cca/core-domain";
import { createServer } from "http";
import { Server } from "socket.io";

//set in env
const host = '*';
const port = 8080;
//optimise by using redis adapter
export class ChatServerWSAdapter implements IChatServerPort {

  wsServer :Server ;
  httpServer = createServer();

  connectedUsers: Record<number, IChatClient> = {};

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
    console.log(`SocketIo server is running on ws://${host}:${port}`);
  }

  getConnectedClient(userId: number): IChatClient {
    return this.connectedUsers[userId];
  }

  connectUser(client: IChatClient): boolean {
    const userId = client.getId();
    if (userId === null || userId === undefined) return false;
    if (!this.connectedUsers[userId]) this.connectedUsers[userId] = client;
    return true;
  }

  disconnectUser(userId: number): boolean {
    if (userId === null || userId === undefined) return false;
    if (!this.connectedUsers[userId]) return false;
    delete this.connectedUsers[userId];
    return true;
  }

}
