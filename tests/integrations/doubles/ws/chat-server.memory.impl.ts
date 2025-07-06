import { IChatServerPort } from "../../../../core/application";
import { IChatClient } from "../../../../core/domain";

export class ChatServerMemoryImpl implements IChatServerPort {

  //TOTO manage limits and service mesh / service discovery
  connectetdUsers: Record<number, IChatClient> = {};

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