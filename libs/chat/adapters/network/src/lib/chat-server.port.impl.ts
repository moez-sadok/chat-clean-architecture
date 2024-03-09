import {  IChatServerPort } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { IChatClient } from "@chat-clean-architecture/chat/entreprise-business-rules/notifiyer";

export class ChatServerPortImpl implements IChatServerPort {

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