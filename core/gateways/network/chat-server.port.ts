import { IChatClient } from "../../domain/chat-client";

export interface IChatServerPort {
  connectUser(user: IChatClient): boolean;
  disconnectUser(userId: number): boolean;
  getConnectedClient(userId: number): IChatClient;
}

