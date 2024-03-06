/******** Abstraction of mediator pattern */
import { IChatClient } from "./chat-client.port";

export interface IChatServerPort {
  connectUser(user: IChatClient): boolean;
  disconnectUser(userId: number): boolean;
  getConnectedClients():Record<number, IChatClient>;
}

