import { IChatClient } from "@chat-clean-architecture/chat/entreprise-business-rules/notifiyer";

export interface IChatServerPort {
  connectUser(user: IChatClient): boolean;
  disconnectUser(userId: number): boolean;
  getConnectedClient(userId: number): IChatClient;
}

