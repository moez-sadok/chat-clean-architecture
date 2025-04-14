import { IChatClient } from "../notifiyer/chat-client.port";

export interface IChatServerPort {
  connectUser(user: IChatClient): boolean;
  disconnectUser(userId: number): boolean;
  getConnectedClient(userId: number): IChatClient;
}

