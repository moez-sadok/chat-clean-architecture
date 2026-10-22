import { IChatServerPort } from "../../../../core/application";
import { IChatClient } from "../../../../core/domain";

export class ChatServerMemoryImpl implements IChatServerPort {

  //TOTO manage limits and service mesh / service discovery
  connectedUsers: Record<number, IChatClient> = {};

  getConnectedClient(userId: number): IChatClient {
    return this.connectedUsers[userId];
  }

  connectUser(client: IChatClient): boolean {
    const userId = client.getId();
    if (userId === null || userId === undefined) return false;
    if (!this.connectedUsers[userId]) {
      this.connectedUsers[userId] = client;
      return true;
    } else return false;
  }

  disconnectUser(userId: number): boolean {
    if (userId === null || userId === undefined) return false;
    if (!this.connectedUsers[userId]) return false;
    delete this.connectedUsers[userId];
    return true;
  }

}