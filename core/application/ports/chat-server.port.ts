import { IChatClient } from "../../domain/ports/chat-client";

export interface IChatServerPort {
  connectUser(user: IChatClient): boolean;
  disconnectUser(userId: number): boolean;
  getConnectedClient(userId: number): IChatClient;
}

