import { IChatClient, IChatServerPort } from "@chat-clean-architecture/chat/application-business-rules/interactor";

export class ChatServerPortImpl implements IChatServerPort {

  connectetdUsers: Record<number, IChatClient> = {};

  getConnectedClients(): Record<number, IChatClient> {
    return this.connectetdUsers;
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